<template>
<transition name="slide-y-transition" mode="out-in" appear>
    <v-app id="app">
        <!--<main v-if="currentUser" class="site-content" :class="{'full-width': $store.state.isHiddenMenu}">-->
        <!--</main>-->
        <router-view v-if="isErrorPage()"/>
        <template v-else-if="currentUser">
            <admin-header></admin-header>
            <admin-popup></admin-popup>
            <transition name="slide-y-transition" mode="out-in" appear>
                <router-view/>
            </transition>
            <admin-menu></admin-menu>
            <admin-footer></admin-footer>
        </template>
        <login v-else-if="$route.name != 'Registration'"></login>
        <registration v-else/>
        <greeting></greeting>
    </v-app>
</transition>
</template>

<script>
    import Modal from './components/Modal'
    import Header from './components/Header.vue'
    import Footer from './components/Footer.vue'
    import Menu from './components/Menu.vue'
    import Popup from './components/Popup.vue'
    import Login from './components/pages/Login.vue'
    import Greeting from './components/Greeting'
    import Registration from './components/pages/registration/Registration.vue'
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters} = createNamespacedHelpers('auth')

    export default {
        name: 'App',
        data() {
            return {
                isHiddenMenu: false,
                showPopup: false
            }
        },
        computed: {
            ...mapGetters({currentUser: 'currentUser'})
        },
        created() {
            this.checkCurrentLogin()
        },
        updated() {
            this.checkCurrentLogin()
        },
        methods: {
            checkCurrentLogin() {
                if (!this.currentUser && this.$route.name != 'Registration') {
                    this.$router.push('/login')
                }
            },
            isErrorPage() {
                if (this.$route.name == '404') {
                    return true
                } else {
                    return false
                }
            }
        },
        components: {
            'admin-header': Header,
            'admin-menu': Menu,
            'admin-popup': Popup,
            'login': Login,
            'registration': Registration,
            Greeting,
            Modal,
            'admin-footer': Footer
        }
    }
</script>

<style lang="scss">
    .slide-y-transition-enter-active,
    .slide-y-transition-leave-active {
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }
    .slide-y-transition-move {
        transition: -webkit-transform 0.6s;
        transition: transform 0.6s;
        transition: transform 0.6s, -webkit-transform 0.6s;
    }
    .slide-y-transition-enter,
    .slide-y-transition-leave-to {
        opacity: 0;
        -webkit-transform: translateY(-15px);
        transform: translateY(-15px);
    }
    $white: #fff;
    $main-bg-color: #f1f2f7;
    $white-4: #ddd;
    $white-3: #e4e8eb;
    $white-2: #f8f9fb;
    $grey-4: #d8d9d9;

    $grey-5: #55575c;
    $grey-3: #999a9d;
    $grey-6: #6e7074;
    $grey-2: #46484c;

    $blue: #089cd3;

    $pink: #f27777;

    $green: #61cc40;
    $green-2: #376d27;

    $grey-7: rgba(70, 72, 77, .9);
    $grey-1: #46484c;

    [v-cloak] {
        display: none;
    }

    .greeting {
        z-index: 9999;
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        letter-spacing: .03em;
    }

    html {
        background-color: $main-bg-color;
    }

    html, body {
        padding: 0;
    }

    * {
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
        font-family: Roboto, sans-serif;
    }

    h1 {
        font-weight: 400;
    }

    a {
        text-decoration: none;
    }

    #app p {
        margin-bottom: 0;
    }

    #app .caption {
        font-size: 14px !important;
    }

    .subtitle .modal_button.alone {
        margin-bottom: 0;
    }

    input, textarea {
        box-shadow: none;
        font-size: 14px;
        height: 40px;
        max-width: 100%;
        width: 100%;
        font-family: 'Roboto', sans-serif;
        letter-spacing: .04em;
    }

    input:-webkit-autofill {
        -webkit-box-shadow: inset 0 0 0 50px #fff !important;
        -webkit-text-fill-color: $grey-6 !important;
        color: $grey-6 !important;

        & ~ .icon {
            fill: $grey-6 !important;
        }
    }

    img {
        max-height: 100%;
        max-width: 100%;
    }

    button {
        cursor: pointer;
    }

    .p {
        font-size: 14px;
        line-height: 24px;
        letter-spacing: .04em;
    }

    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .calendar-label, .pdf-label {
        @media screen and (max-width: 1200px) {
            width: 100%;
            margin-bottom: 2px;
        }
    }

    #app .v-input--switch {
        .theme--light.v-input--switch__track {
            color: $grey-4;
        }

        input:checked ~ .theme--light.v-input--switch__track {
            color: rgba($blue, .2) !important;
        }

        .v-input--selection-controls__ripple {
            top: calc(50% - 24px);

            &:before {
                transform: scale(0.01, 0.2);
            }
        }
    }

    #app .v-input--switch.v-input--is-dirty .v-input--switch__thumb {
        transform: translate(22px)
    }

    #app .v-input--switch__thumb {
        width: 16px;
        height: 16px;
        top: calc(50% - 8px);
        box-shadow: 0 1px 3px 0px rgba(0,0,0,.2), 0 2px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
    }

    #app .v-input--switch {
        .v-input--selection-controls__ripple {
            height: 34px;
            width: 58px;
        }
        .v-input--selection-controls__ripple {
            left: -28px;
        }

        .v-input--selection-controls__ripple .v-ripple__container {
            transform: scale(.7, 1.2);
        }

        .v-input--selection-controls.v-input--is-focused .v-input--selection-controls__ripple:before,
        .v-input--selection-controls .v-radio--is-focused .v-input--selection-controls__ripple:before {
            -webkit-transform: scale(0.2, 0.2);
            transform: scale(0.2, 0.2);
        }

        input:checked ~ .v-input--selection-controls__ripple {
            left: -22px;
        }
    }

    #app .v-input--selection-controls {
        margin-top: 0;
        padding-top: 0;
    }

    #app .v-input--selection-controls:not(.v-input--hide-details) .v-input__slot {
        margin-bottom: 0;
    }

    #app .v-messages {
        display: none;
    }

    #app .v-input--checkbox {
        .accent--text {
            background-color: $blue;
            border-color: transparent !important;

            &:after {
                opacity: 1 !important;
            }
        }

        .v-input--selection-controls__ripple .v-ripple__container {
            -webkit-transform: scale(1.9);
            transform: scale(1.9);
        }

        .v-input__control {
            &:hover .v-icon {
                border-color: $blue !important;
            }
        }

        .v-input--selection-controls {
            margin-top: 34px;
            padding-top: 0;
        }

        .v-input--selection-controls:not(.v-input--hide-details) .v-input__slot {
            margin-bottom: 0;
        }

        .v-input--selection-controls__input {
            margin-right: 10px;
            height: 18px;
            width: 18px;
        }

        .v-input--selection-controls__ripple {
            height: 18px;
            margin: 0;
            width: 18px;
            top: 0;
            left: 0;
        }

        .theme--light.v-label {
            color: $grey-3;
            font-weight: normal;
            font-size: 14px;
            top: 1px;
        }

        .theme--light.v-icon {
            color: transparent;
            border: 1px solid $white-4;
            border-radius: 4px;
            width: 18px;
            height: 18px;
        }

        .v-icon {
            font-size: 18px;
            position: relative;
            pointer-events: none;

            &:after {
                content: '';
                position: absolute;
                top: calc(50% - 7px);
                left: calc(50% - 3px);
                width: 6px;
                height: 11px;
                border: solid #fff;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
                z-index: 1;
                pointer-events: none;
                opacity: 0;
                transition: .3s;
            }
        }
    }

    .triangle {
        position: relative;
        width: 8px;
        height: 8px;
        display: inline-block;
        &:before {
            content: '';
            position: absolute;
            transform: rotate(90deg) translate(-50%, 0);
            border-left: 6px solid;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            left: 0;
            top: 0;
            transition: .3s;
            transform-origin: 15% 50%;
        }
    }

    .hint {
        position: absolute;
        color: $white !important;
        margin: 0 !important;
        white-space: nowrap;
        background: $grey-7;
        border-radius: 3px;
        opacity: 0;
        transition: .2s;
        top: 28px;
        padding: 4px 10px;
        font-size: 13px;
        left: 50%;
        transform: translate(-50%, -100%);
        z-index: 100;
        pointer-events: none;
        cursor: default;
        &:before {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent $grey-7 transparent;
        }
    }

    .hint.left {
        left: -13px;

        &.edit {
            left: -26px;
        }

        &::before {
            left: 77%;
        }
    }

    .view-icon {
        .hint {
            &.edit {
                left: -16px;
            }
        }
    }

    .table table {
        table-layout: auto !important;
    }

    .table table .translate {
        width: 1% !important;
        white-space: nowrap;
    }

    .table table .icons .view-icon ~ .delete-icon {
        margin-right: 0;
    }

    ::-webkit-input-placeholder {
        color: $grey-3;
    }

    ::-moz-placeholder {
        color: $grey-3;
    }

    :-ms-input-placeholder {
        color: $grey-3;
    }

    :-moz-placeholder {
        color: $grey-3;
    }

    ::-moz-placeholder, :-moz-placeholder {
        opacity: 1;
    }

    input:focus::-webkit-input-placeholder {
        transition: all 0.3s ease;
        opacity: 0;
    }

    input:focus::-moz-placeholder {
        transition: all 0.3s ease;
        opacity: 0;
    }

    input:focus:-moz-placeholder {
        transition: all 0.3s ease;
        opacity: 0;
    }

    input:focus:-ms-input-placeholder {
        transition: all 0.3s ease;
        opacity: 0;
    }

    ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
        background: rgba(70, 72, 76, .3);
        border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb {
        background: rgba(70, 72, 76, .6);
        border-radius: 3px;
    }

    .amount_pagination .amount.dropdown {
        ul {
            display: flex;
            flex-direction: column;
            width: auto;
            align-items: flex-start;

            li {
                margin-top: 0;
                margin-bottom: 0;
                transition: color .3s;

                &:hover {
                    color: $blue;
                }
            }
        }
    }

    .menu .dropdown input:checked ~ label span {
        color: $green-2 !important;
        font-weight: 600;
    }

    .dropdown.user-section ul {
        min-width: 154px;
        left: initial;
        right: 0;
        cursor: default;

        li {
            padding: 0;

            a {
                padding: 8px 14px;
            }
        }
    }

    .modal_container .modal .buttons {
        margin: 2px 0 0;
    }

    .title-modal {
        font-weight: 400;
        font-size: 18px;
        line-height: 1;
        letter-spacing: .02em;
        font-family: Roboto, sans-serif;
    }

    .modal .dropdown label,
    .modal .dropdown li {
        font-size: 14px;
    }

    .modal .dropdown input:checked ~ ul {
        animation: dropdown-modal 1.2s;
    }

    .modal .dropdown input:checked ~ ul {
        max-height: 272px;
    }

    .dropdown.margin-top {
        margin-top: 24px;
    }

    .dropdown {
        &.user-section input:checked + label {
            text-shadow: 0px 0px .1px currentColor, 0px 0px .1px currentColor;

        }
        label {
            cursor: pointer;
            display: flex;
            align-items: center;
            width: 100%;
            transition: .2s;
            color: $grey-3;

            &:hover {
                color: $blue;
            }
        }
        input {
            display: none;
        }
        input:checked + label {
            color: $green-2;
        }
        input:checked + label .triangle::before{
            transform: rotate(-90deg);
        }

        ul {
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
            overflow-y: hidden;
            max-height: 0px;
            min-width: 100%;
            position: absolute;
            background: $white;
            list-style-type: none;
            border-radius: 7px;
            box-shadow: 3px 7px 40px rgba(0, 0, 0, .08);
            top: calc(100% + 7px);
            left: 0;
            white-space: nowrap;
            padding: 0;
            z-index: 2;
            color: $grey-6;
            visibility: hidden;
            li {
                padding: 8px 16px;
                margin-right: auto;
                cursor: pointer;
                transition: .3s;

                &:hover .v-icon {
                    border-color: $blue !important;
                    color: transparent !important;
                }
                &.active {
                    color: $green-2;
                    font-weight: 600;
                }
            }
        }
        input:checked ~ ul {
            max-height: 288px;
            overflow-y: auto;
            animation: dropdown 1.2s;
            visibility: visible;
        }
    }

    .amount .triangle::before {
        top: -1px;
    }

    .user-section .triangle::before {
        top: 0;
    }

    .flag .triangle::before {
        top: 0;
    }

    .multiple .triangle::before {
        top: 1px;
    }

    .modal .multiple .triangle::before {
        top: 5px;
    }

    .list .triangle::before {
        top: 0;
    }

    .multiple input:checked {
        & ~ .th {
            border-color: $green-2 !important;
        }
    }

    input:checked ~ label {
        border-color: $green-2 !important;
    }

    .list label:hover {
        border-color: $blue !important;
    }

    .list input {

        &:checked {
            & ~ label {
                border-color: $green-2 !important;
            }
        }
    }

    @keyframes dropdown {
        from {
            max-height: 0;
            overflow-y: hidden;
        }
        99% {
            overflow-y: hidden;
        }
        to {
            max-height: 288px;
            overflow-y: auto;
        }
    }

    @keyframes dropdown-edit {
        from {
            max-height: 0;
            overflow-y: hidden;
        }
        99% {
            overflow-y: hidden;
        }
        to {
            max-height: 273px;
            overflow-y: auto;
        }
    }

    @keyframes dropdown-modal {
        from {
            max-height: 0;
            overflow-y: hidden;
        }
        99% {
            overflow-y: hidden;
        }
        to {
            max-height: 271px;
            overflow-y: auto;
        }
    }

    .check {
        position: relative;
        width: 30px;
        height: 30px;
        &:before {
            content: '';
            position: absolute;
            width: 11px;
            height: 4px;
            transform: rotate(45deg);
            background: $green;
            top: 12px;
        }
        &:after {
            content: '';
            position: absolute;
            width: 20px;
            height: 4px;
            transform: rotate(-45deg);
            left: 5px;
            top: 10px;
            background: #61cc40;
        }
    }

    svg {
        display: inline-block;
        width: 1em;
        height: 1em;
        stroke: currentColor;
        fill: currentColor;
        stroke-width: 0;
    }

    .align-top {
        align-items: flex-start !important;
    }

    .short .load-image {
        width: calc(100% - 220px);
    }

    .load-image {
        width: calc(100% - 200px);
        height: 98px;
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: .3s;
        border: 1px solid $white-3;
        color: $grey-3;
        font-size: 14px;
        position: relative;
        cursor: pointer;
        background: $white-2;
        &:hover {
            border: 1px solid $blue;
            color: $blue;
            background: rgba($blue, .2);
        }
        input[type=file] {
            position: absolute;
            top: 0;
            left: 0;
            width: 100% !important;
            height: 100% !important;
            opacity: 0;
            cursor: pointer;
        }
        .info-file {
            background: rgba($white, .8);
            width: 100%;
            position: absolute;
            bottom: 0;
            padding: 5px;
            border-top: 1px solid $white-3;
            .text {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: block;
                padding-right: 15px;
                color: $grey-6;
            }
            .close {
                right: 0;
                position: absolute;
                top: 7px;
                &:before, &:after {
                    height: 14px;
                    width: 2px;
                }
            }
        }
        svg {
            margin-bottom: 10px;
        }
        .load {
            height: 5px;
            width: 90%;
            border-radius: 5px;
            border: rgba($blue, .3);
            background-color: rgba($blue, .3);
            margin: 8px 0 15px;
            span {
                border: none;
                background-color: $blue;
                margin: 0;
                border-radius: 2px 0 0 2px;
                width: 40%;
                display: block;
                height: 100%;
            }
        }
    }

    .container_large {
        margin-left: 50px !important;

        @media screen and (max-width: 1023px) {
            margin-left: 0 !important;
        }
    }

    .close {
        width: 12px;
        height: 12px;
        opacity: .4;
        cursor: pointer;
        transition: .2s;
        &:before, &:after {
            position: absolute;
            content: " ";
            height: 12px;
            width: 2px;
            background-color: $grey-1;
            transition: .2s;
        }
        &:before {
            transform: rotate(45deg);
        }
        &:after {
            transform: rotate(-45deg);
        }
        &:hover {
            opacity: 1;
        }
        &:hover:before, &:hover:after {
            background-color: $blue;
        }
    }

    .invalid_text {
        font-size: 12px;
        color: $pink;
        position: absolute;
        top: 100%;
    }

    .error-small {
        color: $pink;
        font-size: 12px;
        line-height: 18px;
    }

    .no-message {
        color: #55575c;
        position: absolute;
        top: 58%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .subtitle .modal_button {
        @media screen and (max-width: 550px) {
            margin-bottom: 15px;
        }

        @media screen and (min-width: 480px) and (max-width: 550px) {
            text-align: center;
        }
    }

     .constructor_scroll .container .subtitle .amount_pagination {
        @media screen and (min-width: 480px) and (max-width: 619px) {
            justify-content: center;
        }
    }

    .tittle, .subtitle {
        .drop_search {
            .dropdown {
                margin: 0 0 15px 0;
            }
        }
        .modal_button {
            width: 100%;
            button {
                width: 100%;
            }
        }
        /*.amount_pagination {
            .amount {
            margin-bottom: 10px;
            }
        }*/
    }

    /***************** AUTHORIZATION FORM + FORGOT PASSWORD *********************/
    .main_authorization {
        div.authorization-form,
        div.registration-form,
        div.forgot-password-form,
        div.password-recovery,
        div.password-newenter {
            margin-bottom: 6vh;

            @media screen and (max-width: 500px) {
                padding: 38px 0 16px;
            }
        }
    }

    .login-form, .error-wrap {
        width: 100%;
        margin: auto;
        max-width: 520px;
    }

    .enter {
        svg {
            margin-left: 5px;
        }
    }

    .forgot-password-form .enter {
        svg {
            margin-left: 10px;
        }
    }

    .main_authorization {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        padding: 0 15px;
        background-color: $white-2;

        @media screen and (min-height: 658px) {
            justify-content: center;
        }
        .logo {
            width: 100%;
            height: 46px;
            margin-top: 6vh;
            margin-bottom: 6vh;
            text-align: center;
        }
        .authorization-form,
        .registration-form,
        .forgot-password-form,
        .password-recovery,
        .password-newenter  {
            padding: 58px 0 24px;
            max-width: 520px;
            width: 100%;
            background-color: $white;
            box-shadow: 0 4px 15px rgba(0, 0, 0, .07);
            border-radius: 5px;
            h1 {
                color: $grey-5;
                font-size: 32px;
                letter-spacing: .04em;
                margin-bottom: 8px;
                font-weight: 300;
                line-height: 42px;

                @media screen and (max-width: 500px) {
                    font-size: 28px;
                    line-height: 38px;
                }
            }
            .message__error {
                line-height: 22px;
                font-size: 14px;
                letter-spacing: .03em;
                color: $pink;
            }
            form {
                .field {
                    margin: 0 auto 15px;
                    width: 100%;
                    position: relative;
                    .input {
                        border: none;
                        padding-left: 30px;
                        transition: .3s;
                        color: $grey-6;
                        position: relative;

                        
                    }
                    & :hover ~ .icon {
                        color: $blue;
                    }
                    & :focus ~ .icon {
                        fill: $green-2 !important;
                    }
                    .input.error {
                        background-color: transparent !important;
                        & ~ .icon {
                            fill: $pink;
                        }
                    }
                    .icon {
                        pointer-events: none;
                        position: absolute;
                        top: 12px;
                        left: 1px;
                        color: $grey-3;
                        transition: .2s;
                    }
                }
                .checkbox-container .checkbox-group {
                    border-width: 1px;
                    border-color: $white-4;
                    height: 16px;
                    width: 16px;
                    min-width: 16px;

                    &:hover {
                        border-color: $blue;
                    }

                    &:after {
                        top: 1px;
                        left: 4px;
                        width: 6px;
                        height: 10px;
                    }
                }
                .checkbox-container {
                    margin: 19px 0 0;
                    height: 20px;
                    width: initial;
                    user-select: none;

                    &:hover .checkbox-group {
                        border-color: $blue;
                    }

                    .checkbox_label {
                        font-weight: normal;
                        font-size: 14px;
                        color: $grey-3;
                        padding-left: 10px;
                        margin-top: -1px;
                    }
                }
                .checkbox-ripple-container {
                    width: 35px;
                    height: 35px;
                }
                .__ripple__container,
                .__ripple__animation {
                    background-color: rgba(12, 177, 236, .2);
                }
                .__ripple__animation--visible {
                    opacity: 1;
                    background-color: rgba(12, 177, 236, .2);
                }
            }
            .submit {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 60px;
                border-top: 1px solid $white-3;
                padding: 24px 60px 0;

                @media screen and (max-width: 369px) {
                    flex-wrap: wrap;
                }

                @media screen and (max-width: 500px) {
                    margin-top: 44px;
                    padding: 16px 32px 0;
                }
                button {
                    @media screen and (max-width: 369px) {
                        width: 100%;

                        &:first-child {
                            margin-top: 14px;
                        }
                    }
                }
                .forgot {
                    color: $grey-3;
                    font-size: 15px;
                    background: transparent;
                    border: none;
                    transition: .2s;
                    font-weight: 400;
                    letter-spacing: .8px;

                    @media screen and (max-width: 369px) {
                        order: 2;
                    }
                    &:hover {
                        color: $blue;
                    }
                }
                .enter {
                    background: $blue;
                    border-radius: 30px;
                    color: $white;
                    transition: .3s;
                    border: 1px solid $blue;
                    padding: 12px 35px;
                    font-size: 15px;
                    transition: .2s;
                    font-weight: 400;
                    letter-spacing: .8px;

                    @media screen and (max-width: 369px) {
                        order: 1;
                    }
                    &:hover {
                        color: $blue;
                        background: transparent;
                    }
                    & svg {
                        width: 10px;
                        height: 12px;
                        margin-bottom: -1px;
                    }
                }
            }
        }
        .forgot_password {
            .text {
                color: $grey-3;
                @extend .p;
            }
            .margin45 {
                height: 45px;
            }
            .recovery {
                color: $grey-3;
                font-size: 14px;
                background: transparent;
                border: none;
                transition: .2s;
                &:hover {
                    color: $blue;
                }
                & svg {
                    width: 11px;
                    height: 11px;
                    margin-right: 10px;
                }
            }
            .enter_back {
                width: 188px;
                background: $blue;
                border-radius: 30px;
                color: $white;
                transition: .3s;
                border: 1px solid $blue;
                padding: 15px 0 13px;
                font-size: 15px;
                transition: .2s;
                &:hover {
                    color: $blue;
                    background: transparent;
                }
                & svg {
                    width: 11px;
                    height: 11px;
                    margin-left: 10px;
                }
            }
        }
    }

    .line {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: $white-4;
        z-index: 1;

        &::after {
            background-color: $blue;
            z-index: 2;
        }
        &::before {
            background-color: $green-2;
            z-index: 3;
        }
        &::after, &::before {
            content: '';
            left: 0;
            bottom: 0;
            width: 0%;
            position: absolute;
            height: 2px;
            transition: width .4s ease;
        }
    }

    .form-group.invalid .line::after {
        width: 100%;
        background-color: $pink;
    }

    input.error ~ .line::after {
        width: 100%;
        background-color: $pink;
    }

    input {
        &:hover ~ .line {
            height: 2px;
        }

        &:hover ~ .line::after,
        &:focus ~ .line::before,
        &:checked ~ .line::before, {
            width: 100%;
        }

        &:focus ~ .line::after,
        &:checked ~ .line::after {
            width: 0% !important;
        }
    }

    .constructor_scroll .container .subtitle .amount_pagination.no-button {
        @media screen and (max-width: 639px) {
            margin-top: 0;
        }

        @media screen and (max-width: 479px) {
            flex-direction: row;
            justify-content: center;

            .amount {
                margin-bottom: 0;
                margin-right: 18px;
            }

            .pagination p {
                margin-bottom: 0;
            }
        }
    }

    /****************** MODALS ***************************************************/

    .modal .dropdown ul li {
        &:hover {
            color: $blue;
        }
    }

    .modal_container .modal .tabs ~ .modal-scroll {
        max-height: calc(100vh - 219px);

        @media screen and (max-width: 479px) {
            max-height: calc(100vh - 309px);
        }

        @media screen and (min-width: 480px) and (max-width: 500px) {
            max-height: calc(100vh - 274px);
        }

        &.in-last-tab {
            max-height: calc(100vh - 219px);

            @media screen and (max-width: 479px) {
                max-height: calc(100vh - 371px);
            }

            @media screen and (min-width: 480px) and (max-width: 500px) {
                max-height: calc(100vh - 274px);
            }
        }
    }

    #app .modal_container .modal form .dropdown.multiple .dropdown-list label img.messengers-img,
    #app .modal_container .modal form .dropdown.multiple .selected-list img {
        border: none;
        width: 16px;
        height: 16px;
        border-radius: 0;
    }

    .modal_container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(70, 72, 76, .3);
        z-index: 1000;

        .modal {
            width: 800px;
            max-width: calc(100% - 30px);
            background: $white;
            box-shadow: 3px 7px 40px rgba(0, 0, 0, .1);
            border-radius: 5px;
            z-index: 100;
            .caption {
                color: $grey-1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 18px;
                padding: 15px 22px;
                border-bottom: 1px solid $white-3;
                .close {
                    width: 16px;
                    height: 16px;
                    cursor: pointer;
                    position: relative;
                    transition: .2s;
                    &:before, &:after {
                        height: 16px;
                        width: 2px;
                        background-color: #a8a9ac;
                        left: 7px;
                    }
                    &:hover:before, &:hover:after {
                        background-color: $blue;
                    }
                }
            }
            .modal-scroll {
                overflow-x: hidden;
                overflow-y: auto;
                max-height: calc(100vh - 166px);
                padding: 0 22px 22px;

                @media screen and (max-width: 479px) {
                    max-height: calc(100vh - 200px)
                }
            }
            .tabs {
                display: flex;
                background: $white-2;
                margin: 0;
                border-bottom: 1px solid $white-3;
                transition: .3s;
                div {
                    padding: 15px 0;
                    width: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 15px;
                    color: $grey-6;
                    transition: .3s;
                    border-bottom: 2px solid transparent;
                    span {
                        transition: .3s
                    }
                    &.first {
                        margin: 0 0 -1px 22px;

                        &:not(.active):hover {
                            border-color: $blue;
                        }

                        &:not(.active):hover span {
                            background: $blue;
                        }

                        svg {
                            color: $blue;
                        }
                    }
                    &.second {
                        margin: 0 22px -1px 0;

                        &:not(.active):hover {
                            border-color: #ab6fef;
                        }

                        svg {
                            color: #ab6fef;
                        }
                    }
                    &.disabled {
                        opacity: .5;
                        pointer-events: none;
                    }
                    svg {
                        margin-right: 15px;
                        transition: .3s;
                    }
                    // &:not(.active):hover {
                    //     border-color: $blue !important;

                    //     span { background: $blue !important; }
                    //     svg { color: $blue !important; }
                    // }
                    &.first.active {
                        color: $blue;
                        border-color: $blue;
                    }
                    &.second.active {
                        color: #ab6fef;
                        border-color: #ab6fef;
                    }
                    &.checked {
                        color: $green;
                        border-color: $green;
                        .check {
                            background: $green;
                            width: 20px;
                            height: 20px;
                            margin-right: 10px;
                            border-radius: 50%;
                            &:before {
                                width: 5px;
                                height: 2px;
                                background: $white;
                                top: 11px;
                                left: 4px;
                            }
                            &:after {
                                width: 12px;
                                height: 2px;
                                left: 6px;
                                top: 10px;
                                background: $white;
                            }
                        }
                    }
                }

            }
            form {
                .form-group {
                    position: relative;
                    input {
                        height: 36px;
                        border: none;
                        width: 100%;
                        transition: .2s;
                        color: $grey-6;
                        font-size: 14px;
                        padding-top: 2px;

                        &.error {
                            & ~ .line::after {
                                width: 100%;
                                background-color: $pink;
                            }
                        }
                        &:focus ~ label, & ~ label.filled {
                            top: -2px;
                            opacity: 1;
                            visibility: visible;
                        }
                    }
                    label {
                        color: $grey-3;
                        font: 400 12px/20px 'Roboto', sans-serif;
                        letter-spacing: .04em;
                        position: absolute;
                        pointer-events: none;
                        left: 0;
                        top: 41px;
                        line-height: 4px;
                        transition: .3s;
                        opacity: 0;
                        visibility: hidden;
                    }
                }
                .drop_two {
                    display: flex;
                }
                .dropdown {
                    width: 100%;
                    height: 36px;
                    position: relative;
                    display: flex;
                    &:first-child {
                        margin-right: 11px;
                    }
                    &:last-child {
                        margin-left: 11px;
                    }
                    label {
                        justify-content: space-between;
                        // margin-top: 10px;
                        transition: .3s;

                        &:hover input:not(:checked) span {
                            color: $blue;
                        }
                    }
                    &.multiple {
                        height: 42px;
                        margin-top: 28px;

                        input:checked ~ label .selected-list .item span {
                            text-shadow: 0px 0px .1px currentColor, 0px 0px .1px currentColor;
                            color: $green-2;
                        }

                        .capture {
                            color: #999a9d;
                            font-family: Roboto;
                            font-size: 14px;
                            font-weight: 400;
                            position: absolute;
                            top: calc(100% - 26px);
                            transition: 0.3s;
                            &.focus {
                                font-size: 12px;
                                top: calc(100% - 47px);
                                transition: 0.3s;
                            }
                            &.visited {
                                font-size: 12px;
                                top: calc(100% - 47px);
                                transition: 0.3s;
                            }
                        }
                        .selected-list {
                            color: #6e7074;
                            padding-top: 6px;
                            font-size: 14px;
                            font-weight: 400;
                            width: 100%;
                            overflow: hidden;
                            display: flex;
                            align-items: center;
                            .item {
                                display: flex;
                                align-items: center;
                                margin-right: 10px;

                                span {
                                    transition: .3s;
                                }
                            }
                            img {
                                width: 18px;
                                height: 18px;
                                border-radius: 50%;
                                margin-right: 5px;

                                &.bordered {
                                    border: 1px solid $white-3;
                                    width: 19px;
                                    height: 19px;
                                }
                            }
                        }
                        .dropdown-list {
                            li {
                                padding: 0 0 0 19px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                input:checked {
                                    & + label {
                                        .marker {
                                            border: none;
                                        }
                                        .marker:after {
                                            display: block;
                                            top: 0;
                                            left: 0;
                                            content: "";
                                            transition: 0.3s;
                                        }
                                    }
                                }
                            }
                            label {
                                border-bottom: none;
                                justify-content: flex-start;
                                align-items: center;
                                color: #6e7074;
                                font-size: 14px;
                                font-weight: 400;
                                margin-top: 0;
                                padding: 8px 9px;
                                .marker {
                                    width: 18px;
                                    height: 18px;
                                    background-color: white;
                                    border: 1px solid #ddd;
                                    border-radius: 4px;
                                    margin-right: 15px;
                                    position: relative;
                                    overflow: hidden;
                                    &:after {
                                        position: absolute;
                                        display: none;
                                        background: url(assets/checked.svg) no-repeat 50%;
                                        background-size: 70% 70%;
                                        background-color: $blue;
                                        width: 100%;
                                        height: 100%;
                                        top: -4px;
                                        left: -4px;
                                        content: "";
                                        transition: 0.3s;
                                    }
                                }
                                span {
                                    color: #6e7074;
                                    font-size: 14px;
                                    font-weight: 400;
                                    transition: .3s;
                                }
                                &:hover {
                                    span {
                                        color: #089cd3;
                                    }
                                    .marker {
                                        border-color: #089cd3;
                                    }
                                }
                                img {
                                    width: 20px;
                                    height: 20px;
                                    border: 1px solid $white-3;
                                    margin-right: 9px;
                                    border-radius: 50%;
                                }
                            }

                        }
                    }
                }
                .dropdown.invalid {
                    & > label {
                        border-bottom: 2px solid $pink;
                        .triangle::before {
                            border-left-color: $pink;
                        }
                    }
                }
                .field-container p {
                    font-size: 12px;
                    line-height: 18px;
                    color: $grey-3;
                }
            }
            .editor, .add_img, .form-group {
                margin: 30px 0 24px;
                position: relative;
                .tittle {
                    font-size: 12px;
                    line-height: 18px;
                    color: $grey-3;
                    background: transparent !important;
                    border: none !important;
                    padding: 4px 0 !important;
                }
                textarea {
                    width: 100%;
                    height: 120px;
                    resize: none;
                    padding: 10px 15px;
                    border-color: $white-3;
                    border-radius: 3px;
                    transition: .3s ease;
                    border-style: solid;
                    color: $grey-6;
                    line-height: 22px;

                    &:hover {
                        border-color: $blue !important;
                    }

                    &:focus {
                        border-color: $green-2 !important;
                    }
                }
                &.invalid {
                    textarea {
                        border-color: $pink;
                        &:hover {
                            border-color: $pink;
                        }
                    }
                    .invalid_text {
                        display: block;
                    }
                    .load-image {
                        border-color: $pink;
                        color: $pink;
                    }
                }
            }
            .add_img {
                .load-image {
                    width: 240px;
                }
            }
            .buttons {
                position: relative;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;

                @media screen and (max-width: 479px) {
                    justify-content: center;
                }

                &:before {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 1px;
                        background-color: $white-3;
                        box-sizing: content-box;
                        top: 0;
                        left: 0;
                    }

                .next {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    position: relative;
                    margin: 0 22px 22px auto;
                    padding: 22px 0 0;

                    @media screen and (max-width: 479px) {
                        flex-wrap: wrap;
                        width: 100%;
                        margin-left: 22px;
                        margin-right: 22px;
                        margin-bottom: 12px;
                    }
                }
                button {
                    width: 200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 8px;
                    min-height: 40px;
                    font-size: 15px;
                    transition: .2s;

                    @media screen and (max-width: 479px) {
                        padding: 22px 8px 8px;
                    }
                    &.cancel, &.confirm {
                        letter-spacing: .04em;
                    }
                    &.cancel {
                        background: transparent;
                        border: none;
                        color: $grey-6;
                        width: auto;
                        margin-right: 31px;

                        @media screen and (max-width: 479px) {
                            width: 100%;
                            order: 2;
                            margin-right: 0;
                            padding-top: 15px;
                        }

                        &:hover {
                            color: $blue;
                        }
                    }
                    &.confirm {
                        background: $blue;
                        border: 1px solid $blue;
                        color: $white;
                        border-radius: 30px;
                        padding: 0 34px;
                        width: initial;

                        @media screen and (max-width: 479px) {
                            width: 100%;
                            order: 1;
                        }

                        span {
                            margin: -1px 0 0 8px;
                        }
                        &:hover {
                            background: transparent;
                            color: $blue;
                        }
                    }
                    &.disabled {
                        opacity: .5;
                        cursor: default;
                    }
                    &.back {
                        border: 1px solid $white-3;
                        background: transparent;
                        border-radius: 30px;
                        height: 100%;
                        width: inherit;
                        padding: 0 34px;
                        margin: auto 0 auto 22px;

                        @media screen and (max-width: 479px) {
                            margin: 22px 22px 0;
                            width: 100%;
                        }

                        span {
                        }
                        color: $grey-6;
                        &:hover {
                            color: $blue;
                            border-color: $blue;
                        }
                    }
                }
            }
            .content {
                padding: 20px;
                color: $grey-6;
                display: flex;
                align-items: center;
                .check {
                    margin-right: 17px;
                }
                .tick {
                    color: #61cc40;
                    margin-right: 14px;
                    svg {
                        width: 22px;
                        height: 22px;
                    }
                }
            }
        }
    }

    .modal_container .modal .form-group {
        margin-bottom: 30px;
    }

    .modal_container_little {
        .modal {
            width: 348px;
            padding: 0;
            .caption {
                background: $white-2;
                padding: 20px;
                border-bottom: 1px solid $white-3;
            }
        }
    }

    /***************** CONTENT ****************************************************/
    .drop_search {
        .dd-filter-category {
            text-overflow: clip;
            white-space: nowrap;
            overflow: hidden;
        }

        .triangle {
            width: 39px;
            height: 100%;
            background-color: #f8f9fb;
            opacity: .9;
            position: absolute;
            right: 0;
            border-radius: 0 100vh 100vh 0;

            &::before {
                top: calc(50% - 3px);
                left: inherit;
                right: 25px;
            }
        }
    }

    .constructor_scroll .container-block .modal_button.fields {
        padding: 20px 20px 20px 22px;
        border-bottom: 1px solid $white-3;

        button {
            width: initial;
            background: $blue;
            border: 1px solid $blue;
            border-radius: 30px;
            color: $white;
            font-size: 15px;
            padding: 10px 24px 10px;
            transition: .2s;
            letter-spacing: .04em;

            @media screen and (max-width: 550px) {
                width: 100%;

                &:not(:first-child) {
                    margin-top: 15px;
                }
            }

            &:not(:first-child) {
                margin-left: 11px;

                @media screen and (max-width: 550px) {
                    margin-left: 0;
                }
            }

            svg {
                margin: 0px 10px -1px 0;
                font-size: 12px;
            }
            &:hover {
                background: transparent;
                color: $blue;
            }
        }
    }

    .constructor_scroll {
        min-height: 500px;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        .container-block {
            background: $white;
            margin-left: 240px;
            text-align: left;
            min-height: calc(100vh - 116px);
            margin-top: 60px;
            flex: 1 0 auto;
            transition: all .4s ease;
            .tittle {
                @extend .flex;
                padding: 15px 22px;
                background: $white-2;
                border-bottom: 1px solid $white-3;
                flex-direction: row !important;
                h1 {
                    color: $grey-5;
                    font-size: 18px;
                }

                .drop_search {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    @media screen and (max-width: 479px) {
                        flex-direction: column;
                    }
                    .period {
                        transition: .2s;
                        color: $grey-6;
                        margin: 0 7.5px;
                        ul{
                            display: flex;
                            align-items: center;
                            flex-direction: row;
                            flex-wrap: wrap;
                            padding-left: 0;
                            .datesList.active {
                                color: $green-2 !important;
                                transition: .3s ease;
                                font-weight: 600;
                            }
                            .datesList.edgeFirst {
                                border-bottom-left-radius: 100vh;
                                border-top-left-radius: 100vh;
                            }
                            .datesList.edgeLast {
                                border-bottom-right-radius: 100vh;
                                border-top-right-radius: 100vh;
                            }
                            .datesList {
                                border: 1px solid $white-3;
                                height: 38px;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                overflow: hidden;
                                cursor: pointer;
                                width: 90px;
                                justify-content: center;
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                transition: color .3s ease;
                                &:hover:not(.active) {
                                    color: $blue;
                                    transition: .3s ease;
                                }
                            }
                        }
                    }
                    .dropdown {
                        width: 200px;
                        border-radius: 30px;
                        transition: .2s;
                        margin: 0 7.5px;
                        position: relative;
                        color: $grey-6;

                        ul {
                            li {
                                transition: color .3s;
                                &:hover {
                                    color: $blue;
                                }
                            }
                        }

                        @media screen and (max-width: 479px) {
                            margin: 7.5px 0;
                        }

                        &:last-child {
                            margin-right: 0;
                        }

                        &:first-child {
                            @media screen and (max-width: 619px) {
                                margin-left: 0;
                            }
                        }
                        &:hover {
                            border-color: $blue;
                        }
                        input:checked ~ label {
                            font-weight: 600;
                        }
                        label {
                            height: 38px;
                            padding: 0 16px 0 47px;
                            justify-content: space-between;
                            border: 1px solid $white-3;
                            border-radius: 100vh;
                            position: relative;

                            & ~ svg {
                                position: absolute;
                                top: 50%;
                                left: 23px;
                                transform: translateY(-50%);
                                transition: .3s;
                                pointer-events: none;
                            }

                            &:hover ~ svg {
                                fill: $blue;
                            }

                            &:hover {
                                border-color: $blue;
                            }
                        }
                        input:checked ~ svg {
                            fill: $green-2;
                        }
                    }

                    .search {
                        @extend .flex;
                        width: 200px;
                        position: relative;
                        color: $grey-6;
                        margin-left: 14px;

                        a {
                            color: $grey-6;
                        }

                        &:hover {
                            svg {
                                fill: $blue;
                            }
                        }
                        input {
                            width: 100%;
                            background: transparent;
                            border: 1px solid $white-3;
                            border-radius: 30px;
                            padding: 5px 40px 5px 16px;
                            transition: .2s;
                            color: $grey-6;
                            letter-spacing: .03em;
                            &:hover {
                                border-color: $blue;
                            }
                            &:focus {
                                border-color: $green-2;
                            }
                            &:focus ~ .button svg {
                                fill: $green-2 !important;
                            }
                        }
                        svg {
                            position: absolute;
                            right: 18px;
                            top: 12px;
                            cursor: pointer;
                        }
                    }
                }
            }
            .subtitle {
                @extend .flex;
                padding: 15px 22px;
                background-color: $white;
                &.with-pagination {
                    @media screen and (max-width: 659px) {
                        flex-direction: column;
                    }

                    .modal_button {
                        @media screen and (max-width: 659px) {
                            text-align: center;
                            margin-bottom: 15px;
                        }
                    }
                }

                button {
                    width: initial;
                    background: $blue;
                    border: 1px solid $blue;
                    border-radius: 30px;
                    color: $white;
                    font-size: 15px;
                    padding: 10px 24px 10px;
                    transition: .2s;
                    letter-spacing: .04em;

                    @media screen and (max-width: 550px) {
                        width: 100%;
                    }

                    svg {
                        margin: 0px 10px -1px 0;
                        font-size: 12px;
                    }
                    &:hover {
                        background: transparent;
                        color: $blue;
                    }
                }
                .amount_pagination {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        @media screen and (min-width: 480px) and (max-width: 619px) {
                            justify-content: center;
                        }

                        &.no-button {
                            margin-left: auto;

                            @media screen and (max-width: 550px) {
                                margin-left: inherit;
                            }
                        }
                    .amount {
                        position: relative;
                        margin-right: 18px;
                        width: 60px;
                        text-align: center;
                        color: $grey-3;
                        margin-top: 1px;

                        // @media screen and (max-width: 479px) {
                        //     margin-right: 0;
                        //     margin-bottom: 15px;
                        // }
                        input:checked ~ label span {
                            font-weight: 600;
                        }

                        label {
                            justify-content: center;
                            span {
                                margin: 0 6px 0;
                                font-size: 14px;
                                transform-origin: 35% 50%;
                                &.active {
                                    color: $green-2;
                                    font-weight: 600;
                                }
                            }
                        }
                    }
                }
            }
            .subtitle1 {
                padding: 0 22px 15px;
            }
            .breadcrumbs {
                h1 {
                    color: $green-2;
                    display: inline-block;
                    font-weight: bold;
                }
                a {
                    color: $grey-5;
                    font-size: 18px;
                    transition: .3s;
                    &:hover {
                        color: $blue;
                    }
                }
                span {
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    margin: 0 8px 0 6px;
                    color: $grey-5;
                    transition: .3s;
                    position: relative;
                    &:before {
                        content: "";
                        top: 1px;
                        display: block;
                        width: 6px;
                        height: 6px;
                        border: 0 solid;
                        border-width: 1px 1px 0 0;
                        position: absolute;
                        transform: rotate(45deg);
                    }
                }
            }
            &.edit {
                background: $white-2;
            }
        }
        .container1 {
            background: #fafcfb;
            text-align: left;
            min-height: calc(100vh - 116px);
            margin-top: 60px;
            flex: 1 0 auto;
        }
    }

    /***************** TABLE ****************************************************/

    .table table .icons.in-pages {
        width: initial !important;
    }

    .caption.link {
        span {
            cursor: pointer;
        }
    }

    .table tbody tr {
        &:nth-child(even) {
            background: #fafcfb;
        }
        &:nth-child(odd) {
            background: $white;
        }
    }
    .table thead {
        background: $white-2;
    }
    .table {
        height: auto;
        overflow-y: hidden;
        position: relative;
        table {
            direction: ltr;
            table-layout: fixed;
            width: 100%;
            font-size: 14.4px;
            border-collapse: collapse;
            margin: 0;
            color: $grey-6;
            th, td {
                min-height: 48px;
                height: 48px;

                &:first-child {
                    padding-left: 22px;
                }
                &:last-child {
                    padding-right: 21px;
                }
            }
            tr {
                border: 1px solid $white-3;
                border-width: 1px 0 1px 0;
                &:hover {
                    background-color: #eef4fd;
                }
                &:hover td {
                    color: $blue;
                }
                &.drop_list {
                    background: #fafcfb;
                    border: none;
                }
                &.new_message {
                    color: $blue;
                }
                &.active .icons .triangle, &.active .caption {
                    color: $green-2;
                    font-weight: 600;
                }
            }
            thead {
                // background: $white-2;
                th {
                    font-weight: 500;
                }
                tr:hover {
                    color: inherit;
                    background: inherit;
                }
            }
            .hint {
                bottom: calc(100% + 8px);
                top: auto;
                &:before {
                    top: 100%;
                    border-color: rgba(70, 72, 77, 0.9) transparent transparent transparent;
                }
            }
            .caption {
                min-width: 200px;
                padding: 8px 22px 8px 0;
                color: $grey-6;
                font-size: inherit !important;
                word-break: break-word;
                svg {
                    font-size: 11px;
                    margin-left: 7px;
                    margin-bottom: -1px;
                }
                .table_move {
                    cursor: pointer;
                }
                .table_move.down {
                    svg {
                        transform: rotate(180deg);
                    }
                }
            }
            .middle {
                width: 1%;
                padding-right: 24px;
                padding-left: 24px;
                
                a {
                    color: $blue;
                    text-decoration: none;
                    position: relative;
                    transition: all .6s;

                    &:before {
                        content: "";
                        width: 0;
                        height: 1px;
                        position: absolute;
                        bottom: -2px;
                        right: 0;
                        background: currentColor;
                        transition: all .3s;
                    }
                    &:hover {
                        &:before {
                            width: 100%;
                            left: 0;
                        }
                    }
                }
            }
            .status {
                width: 120px;
                button {
                    cursor: initial;
                    background: transparent;
                    text-transform: uppercase;
                    height: 26px;
                    padding: 5px 16px;
                    border: 1px solid;
                    border-radius: 30px;
                    width: 100px;
                    text-align: center;
                    font-family: Roboto, sans-serif;
                    font-size: 11px;
                    font-weight: normal;
                    &.invited {
                        color: #ab6fef;
                    }
                    &.rejected {
                        color: $pink;
                    }
                    &.accepted {
                        color: #61cc40;
                    }
                }
            }
            .translate {
                .flag {
                    width: 22px;
                    display: inline-block;
                    margin-right: 5px;
                    margin-left: 10px;
                    position: relative;

                    &:first-child {
                        margin-left: 0;
                    }

                    &:hover .hint {
                        opacity: 1;
                        transition-delay: .3s;
                        transform: translate(-50%, 0);
                    }
                    img {
                        border: 1px solid $white-3;
                        border-radius: 50%;
                        overflow: hidden;
                        height: 22px;
                        width: 22px;
                        object-fit: cover;
                        vertical-align: middle;
                    }
                }
            }
            .icons {
                width: 67px;
                text-align: right;
                padding-right: 21px;
                a {
                    color: $grey-1;
                    margin: 0 4px;
                    cursor: pointer;
                    transition: .2s;
                    position: relative;

                    svg {
                        vertical-align: middle;
                    }

                    &:hover {
                        color: $blue;
                    }

                    &:hover .hint {
                        opacity: 1;
                        transition-delay: .3s;
                        transform: translate(-50%, 0);
                    }
                }
                &.more {
                    width: 103px;
                    padding-left: 10px;
                }
                &.drop {
                    width: 80px;
                    .triangle {
                        display: inline;
                        color: $grey-1;
                        transition: .1s;
                        &:before {
                            left: 6px;
                            top: 4px;
                        }
                    }
                }
                .triangle:hover {
                    color: $blue;
                }
                .delete-icon:hover {
                    color: $pink;
                }
            }
            .mail_col {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-right: 20px;
            }
            .switch {
                position: relative;
                display: block;
                width: 32px;
                height: 14px;
                input {
                    display: none;
                    &:checked + .slider {
                        background-color: rgba($blue, .2);
                    }
                    &:checked + .slider:before {
                        transform: translateX(18px);
                        background-color: $blue;
                    }
                }
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: $grey-4;
                    transition: .4s;
                    border-radius: 11px;
                    max-height: 22px;
                    max-width: 36px;
                    &:before {
                        position: absolute;
                        content: "";
                        height: 16px;
                        width: 16px;
                        top: -1px;
                        left: -1px;
                        background-color: $white;
                        transition: .4s;
                        border-radius: 50%;
                        box-shadow: 0 0 5px rgba(0, 0, 0, .2);
                    }
                }
            }
            .up_down {
                display: inline-block;
                position: relative;
                button {
                    background: transparent;
                    border: 1px solid $white-3;
                    border-radius: 5px;
                    padding: 2.5px 3.4px;
                    color: $grey-2;
                    transition: .3s;
                    svg {
                        height: 10px;
                    }
                    &:hover {
                        background: $blue;
                        color: $white;
                        border-color: $blue;
                    }
                }
                &.down button {
                    transform: rotate(180deg);
                }
                &:hover .hint {
                    opacity: 1;
                }
            }
        }
        &.table_large table {
            min-width: 950px;
        }
        &.table_middle table {
            min-width: 800px;
        }
        &.table_max_large table {
            min-width: 1050px;
        }
    }

    /***************** EDIT PAGE ************************************************/

    .dd-label {
        color: #6e7074;
        font-size: 14px;
        line-height: 38px;
        margin-bottom: 15px;
        max-width: 220px;

        @media screen and (max-width: 1100px) {
            line-height: inherit;
            margin-bottom: 1px;
        }
    }

    .file-load-label {
        margin: auto;
    }

    .dd {
        width: calc(100% - 220px);
        @media screen and (max-width: 1100px) {
            width: 100%;
        }
    }

    .dropd {
        width: 100%;
        display: flex;
        justify-content: space-between;

        @media screen and (max-width: 1100px) {
            flex-wrap: wrap;
        }
    }

    .dropdowns {
        display: flex;
        flex-wrap: wrap;
    }

    .dropdown input:checked ~ label .dd-darken {
        color: $green-2 !important;
    }

    .dropdown label:hover .dd-darken {
        color: $blue;
    }

    .dd-darken {
        color: $grey-6;
        transition: .2s;
    }

    .folder .column.caption {
        &:last-child {
            @media screen and (max-width: 1100px) {
                display: none;
            }
        }
    }
    
    .edit_feed .folder .column .list .text.textarea-old {
        height: 124px;
        word-break: break-word;
    }

    .application--wrap .edit_feed .comment.column.empty {
        h2 {
            margin-bottom: 0;
        }

        .list {
            margin-top: 0;
            border-top: none;
        }
    }

    #dr-langs ~ label,
    #dr-langs-1 ~ label {
        height: 39px;
    }

    .list.last {
        @media screen and (min-width: 1100px) {
            margin-bottom: 0 !important;
        }
    }

    .edit_main .dropdown,
    .drop_search .dropdown {
        ul {
            
        }
        input:checked {
            & ~ label {
                font-weight: 600;
            }
            & ~ ul {
                max-height: 273px;
                animation: dropdown-edit 1.2s !important;
                padding: 4px 0;

                li {
                    font-size: 14px;
                    transition: color .3s;

                    &:hover {
                        color: $blue;
                    }
                }
            }
        }
    }

    #app .edit_main .folder .column .content .list p {
        margin-bottom: 2px;

        @media screen and (min-width: 1201px) {
            width: 220px;
        }
    }

    .content.old_editor .article a {
        position: relative;
        transition: all .6s;
        border-bottom: 1px solid transparent;
        
        &:hover {
            border-color: currentColor;
        }
    }

    .edit_main .dropdown.multiple .selected-list img.bordered {
        width: 19px;
        height: 19px;
        border: 1px solid $white-3;
    }

    #app .modal_container .modal form .dropdown.multiple .selected-list img.bordered-in-modal {
        border-radius: 50%;
        width: 20px;
        height: 20px;
        border: 1px solid $white-3;
    }

    .edit_main .dropdown.multiple .selected-list img.messengers-img,
    .edit_main .dropdown.multiple .dropdown-list label img.messengers-img {
        border: none;
        width: 16px;
        height: 16px;
        border-radius: 0;
    }

    // .edit_main .dropdown.multiple .dropdown-list label img.messengers-img {
    //     border: none;
    //     width: 16px;
    //     height: 16px;
    //     border-radius: 0;
    // }

    .edit_main {
        position: relative;
        background: #fafcfb;
        padding: 22px 0 1px;
        .dropdown.multiple {
            height: 60px;
            width: 100%;
            height: 60px;
            position: relative;
            display: flex;
            input:checked ~ label .selected-list .item span {
                text-shadow: 0px 0px .1px currentColor, 0px 0px .1px currentColor;
                color: $green-2;
            }
            label {
                justify-content: space-between;
                margin-bottom: 22px;
                margin-top: 5px;
                border: 1px solid $white-3;
                position: relative;
                height: 40px;
                border-radius: 3px;
                padding: 0 16px;

                &:hover {
                    border-color: $blue;
                }
            }
            .capture {
                color: #999a9d;
                font-family: Roboto;
                font-size: 14px;
                font-weight: 400;
                position: absolute;
                top: 10px;
                transition: 0.3s;
                &.visited {
                    opacity: 0;
                    pointer-events: none;
                }
            }
            .selected-list {
                color: #6e7074;
                font-size: 14px;
                font-weight: 400;
                width: calc(100% - 29px);
                overflow: hidden;
                display: inline-block;
                white-space: nowrap;
                align-items: center;
                .item {
                    display: inline-flex;
                    white-space: nowrap;
                    vertical-align: middle;
                    align-items: center;
                    margin-right: 10px;

                    span {
                        transition: .3s;
                    }
                }
                img {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    margin-right: 5px;
                }
            }
            .dropdown-list {
                top: calc(100% - 15px);
                li {
                    padding: 0;
                    display: flex;
                    align-items: center;

                    &:hover .v-input--checkbox .theme--light.v-icon {
                        color: $blue;
                    }
                }
                label {
                    border: none;
                    justify-content: flex-start;
                    align-items: center;
                    color: #6e7074;
                    font-size: 14px;
                    font-weight: 400;
                    margin-top: 0;
                    margin-bottom: 0;
                    padding: 8px 17px 8px 9px;
                    .marker {
                        width: 18px;
                        height: 18px;
                        background-color: white;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        margin-right: 15px;
                        position: relative;
                        overflow: hidden;
                        &:after {
                            position: absolute;
                            display: none;
                            background: url(assets/checked.svg) no-repeat 50%;
                            background-size: 70% 70%;
                            background-color: $blue;
                            width: 100%;
                            height: 100%;
                            top: -4px;
                            left: -4px;
                            content: "";
                            transition: 0.3s;
                        }
                    }
                    span {
                        color: #6e7074;
                        font-size: 14px;
                        font-weight: 400;
                        transition: .3s;
                    }
                    &:hover {
                        span {
                            color: #089cd3;
                        }
                        .marker {
                            border-color: #089cd3;
                        }
                    }
                    img {
                        width: 20px;
                        height: 20px;
                        border: 1px solid rgba(228, 232, 235, 0.6);
                        margin-right: 9px;
                        border-radius: 50%;
                    }
                }

            }
        }
        .folder {
            display: flex;
            margin: 0 22px;

            @media screen and (max-width: 500px) {
                margin: 0;
            }
            .column {
                width: calc(50% - 9px);
                padding: 18px;
                border-width: 1px;
                background: $white;
                border: 1px solid $white-3;
                border-width: 0 1px 1px 1px;

                @media screen and (max-width: 500px) {
                    padding: 18px 22px;
                }
                &:first-child {
                    margin-right: 9px;
                }
                &:last-child {
                    margin-left: 9px;
                }
                .flag {
                    display: flex;
                    align-items: center;
                    height: 100%;
                    img {
                        border: 1px solid #eff1f3;
                        border-radius: 50%;
                        overflow: hidden;
                        width: 22px;
                        height: 22px;
                        object-fit: cover;
                    }
                    span {
                        margin: 0 0 0 8px;
                        font-size: 15px;
                        color: $grey-6;
                    }
                    .dropdown {
                        width: 200px;
                        position: relative;

                        @media screen and (max-width: 479px) {
                            width: 100%;
                        }

                        label {
                            display: flex;
                            align-items: center;
                            position: relative;
                            padding: 6px 9px;
                            border: 1px solid $white-3;
                            border-radius: 30px;
                            transition: .3s;
                            &:hover {
                                border-color: $blue;
                            }
                            &:hover span {
                                color: $blue;
                            }
                            .triangle {
                                position: absolute;
                                right: 19px;
                                margin: 0;
                            }
                        }
                        input:checked + label {
                            border-color: $green-2;

                            span {
                                color: $green-2;
                            }
                        }
                        ul {
                            li {
                                display: flex;
                                align-items: center;
                                span {
                                    transition: .3s;
                                }
                                &:hover span {
                                    color: $blue;
                                }
                            }
                        }
                    }
                }
                .content {
                    .list {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 15px;
                        position: relative;
                        width: 100%;

                        &:last-child {
                            margin-bottom: 0;
                        }

                        @media screen and (max-width: 1200px) {
                            align-items: flex-start;
                        }

                        &:last-child {
                            margin-bottom: 0;
                        }
                        p {
                            color: $grey-6;
                            font-size: 14px;
                            padding-right: 15px;
                            margin-bottom: 4px;
                            span {
                                display: inline;
                                margin-left: 7px;
                                margin-top: 3px;
                            }
                        }
                        input, textarea {
                            &:not(:disabled) {
                                transition: .3s ease;
                                &:hover {
                                    border-color: $blue;
                                }
                                &:focus {
                                    border-color: $green-2;
                                }
                            }
                        }
                        input {
                            width: calc(100% - 220px);
                            height: 38px;
                            border: 1px solid $white-3;
                            border-radius: 3px;
                            padding: 15px;
                            color: $grey-6;
                            font-size: 14px;
                            flex-shrink: 0;
                            &.error {
                                border-color: $pink;
                            }
                        }
                        textarea {
                            width: calc(100% - 220px);
                            height: 124px;
                            border: 1px solid $white-3;
                            border-radius: 3px;
                            padding: 7px 15px;
                            line-height: 22px;
                            flex-shrink: 0;
                            color: $grey-6;
                            resize: none;
                            font-size: 14px;
                            &.error {
                                border-color: $pink;
                                background-color: transparent;
                            }
                        }
                        .invalid_text {
                            margin-left: 220px;
                        }
                        input:disabled, textarea:disabled {
                            background: $white-2;
                        }
                        .date {
                            width: calc(100% - 220px);
                            height: 38px;
                            border: 1px solid $white-3;
                            border-radius: 3px;
                            padding: 10px 15px;
                            color: $grey-6;
                            font-size: 14px;
                            display: flex;
                            justify-content: space-between;
                        }
                        .dropdown {
                            width: calc(100% - 220px);
                            position: relative;
                            label {
                                width: 100%;
                                justify-content: space-between;
                                border: 1px solid $white-3;
                                border-radius: 3px;
                                padding: 10px 15px;
                                font-size: 14px;
                            }
                            ul {
                                li.active {
                                    color: $grey-6;
                                }
                            }
                        }
                        .switch {
                            width: calc(100% - 220px);
                        }
                    }
                    .article p {
                        color: $grey-6;
                        font-size: 14px;
                        line-height: 24px;
                        margin: 14px 0;
                        word-break: break-word;
                        ul, ol {
                            padding-left: 18px;
                            margin: 14px 0;

                            li {
                                word-break: break-word;
                            }
                        }
                    }
                    &.old_editor {
                        height: 100%;
                        border: 1px solid $white-3;
                        border-radius: 3px;
                        padding: 10px 15px;
                        background: $white-2;
                    }
                }
            }
            .caption {
                background: $white-2;
                p {
                    color: $grey-5;
                    font-size: 15px;
                }
            }
            h2 {
                color: $grey-5;
                font-size: 18px;
                line-height: 28px;
            }
            h3 {
                margin-top: 14px;
            }
        }
        .radius_top {
            margin: 0 22px;

            @media screen and (max-width: 500px) {
                margin: 0;
            }
            .column:first-child, .column:last-child {
                border-width: 1px;
                border-radius: 5px 5px 0 0;
            }
        }
        .radius_bottom {
            margin: 0 22px 22px;

            @media screen and (max-width: 500px) {
                margin: 0 0 22px;
            }
            .column:first-child, .column:last-child {
                border-width: 0 1px 1px 1px;
                border-radius: 0 0 5px 5px;
            }
        }
        .radius {
            flex-direction: column;
            margin: 22px;

            @media screen and (max-width: 500px) {
                margin: 22px 0;
            }
            .column:first-child {
                border-width: 1px;
                border-radius: 5px 5px 0 0;
            }
            .column:last-child {
                margin: 0;
                border-width: 0 1px 1px;
                border-radius: 0 0 5px 5px;
            }
        }
        .table {
            .column {
                width: 100%;
                padding: 0;
                &.caption {
                    padding: 18px;
                }
                .table table tr {
                    border-width: 1px 0 0 0;
                }
            }
        }
        .buttons {
            margin: 22px;
            .save {
                color: $white;
                background: $blue;
                border-radius: 30px;
                border: 1px solid $blue;
                padding: 10px;
                width: 130px;
                margin-right: 40px;
                font-size: 15px;
                transition: .3s;
                letter-spacing: .04em;
                &:hover {
                    background: transparent;
                    color: $blue;
                }
            }
            .cancel {
                font-size: 15px;
                color: $grey-6;
                background: transparent;
                border: none;
                transition: .3s;
                &:hover {
                    color: $blue;
                }
            }
        }
    }

    .round-bottom {
        border-radius: 0 0 5px 5px !important;

        @media screen and (max-width: 1100px) {
            padding-bottom: 22px !important;
        }

        &-sm {
            @media screen and (max-width: 1100px) {
                border-radius: 0 0 5px 5px !important;
            }
        }

        &-adapt {
            border-radius: 0 0 5px 5px !important;
            @media screen and (max-width: 1100px) {
                border-radius: 0 !important;
            }
        }
    }

    .hidden-on-lg {
        @media screen and (min-width: 1100px) {
            display: none !important;
        }

        @media screen and (max-width: 1100px) {

            & > p {
                display: none;
            }

            .editor {
                margin-top: 15px;
            }
        }
    }

    .round-top {
        border-radius: 5px 5px 0 0 !important;
    }

    .dropdowns .list p {
        align-self: flex-start;
    }

    .edit_main.edit_feed .folder .column .list {
        &:last-child {
            padding-bottom: 18px;
        }
    }

    .border-top {
        border-top: 1px solid $white-3 !important;
    }

    .top-border-mobile {
        @media screen and (max-width: 1100px) {
            border-top-width: 1px !important;
        }
    }

    .hidden-on-sm {
        @media screen and (max-width: 1100px) {
            display: none;
        }
    }

    .edit_feed {
        padding-bottom: 22px;
        .folder {
            .column {
                width: calc(50% - 9px);
                padding: 0;
                border-radius: 5px;
                h2 {
                    border-radius: 5px 5px 0 0;
                    border-top: 1px solid $white-3;
                    border-bottom: 1px solid $white-3;
                    padding: 20px;
                    margin-bottom: 10.5px;
                    background: $white-2;
                    color: $grey-5;
                    font-weight: 400;
                }
                .list {
                    padding: 7.5px 18px;
                    border-width: 1px;
                    background: $white;
                    display: flex;
                    align-items: center;

                    @media screen and (max-width: 1100px) {
                        align-items: flex-start;
                    }
                    &:last-child {
                        border-top: 1px solid $white-3;
                        border-radius: 0 0 5px 5px;
                        padding-top: 18px;
                        margin-top: 10.5px;
                    }
                    .caption {
                        color: $grey-6;
                        font-size: 14px;
                        line-height: 20px;
                        width: 200px;
                        @media screen and (max-width: 1100px) {
                            width: inherit;
                        }
                    }
                    .text {
                        width: calc(100% - 200px);
                        height: 38px;
                        border: 1px solid $white-3;
                        border-radius: 3px;
                        padding: 7.5px 15px;
                        color: $grey-6;
                        font-size: 14px;
                        background: $white-2;
                        overflow-x: auto !important;
                        overflow-y: auto !important;
                        // white-space: nowrap;
                        &.message {
                            word-wrap: break-word;
                            height: 125px;
                            line-height: 22px;
                            padding: 8px 15px;
                        }
                    }
                    .source {
                        display: flex;
                        button {
                            background: transparent;
                            text-transform: uppercase;
                            padding: 5px 15px;
                            height: 26px;
                            border: 1px solid;
                            border-radius: 30px;
                            text-align: center;
                            margin-right: 10px;
                            font-family: Roboto, sans-serif;
                            font-weight: normal;
                            font-size: 11px;
                            cursor: default;

                            @media screen and (max-width: 500px) {
                                margin-top: 0;
                                width: inherit;
                            }

                            &.invited {
                                color: #ab6fef;
                            }
                            &.rejected {
                                color: $pink;
                            }
                            &.accepted {
                                color: #61cc40;
                            }
                        }
                        .flag {
                            position: relative;
                            &:hover .hint {
                                opacity: 1;
                                transform: translate(-50%, 0);
                            }
                        }
                    }
                    .inline {
                        width: calc(100% - 200px);
                        display: flex;
                        a {
                            padding: 9.5px 14px;
                            border: 1px solid $blue;
                            border-radius: 30px;
                            text-align: center;
                            margin-left: 10px;
                            background: $blue;
                            color: $white;
                            transition: .3s;
                            font-size: 14px;
                            &:hover {
                                background: transparent;
                                color: $blue;
                            }
                        }
                        .text {
                            width: calc(100% - 98px);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            padding-right: 10px;
                        }
                    }
                }
                &.comment {
                    .text {
                        width: 100%;
                        height: 73px;
                        border: 1px solid $white-3;
                        border-radius: 3px;
                        padding: 10px 15px;
                        color: $grey-6;
                        font-size: 14px;
                        background: $white-2;
                        word-break: break-word;

                        &.message {
                            word-wrap: break-word;
                            height: 100%;
                            max-height: 125px;
                        }
                    }
                    .date {
                        font-size: 12px;
                        color: $grey-3;
                        margin-top: 8px;
                        line-height: 11px;
                    }
                    .list {
                        flex-direction: column;
                    }
                    textarea {
                        word-wrap: break-word;
                        height: 125px;
                        width: 100%;
                        border: 1px solid $white-3;
                        border-radius: 3px;
                        padding: 10px 15px;
                        color: $grey-6;
                        font-size: 14px;
                        transition: .3s ease;
                        resize: none;
                        line-height: 24px;

                        &:hover {
                            border-color: $blue;
                        }
                        &:focus {
                            border-color: $green-2;
                        }

                        &:focus::placeholder {
                            color: transparent;
                        }
                    }
                    button {
                        padding: 9.5px 10px;
                        border: 1px solid $blue;
                        border-radius: 30px;
                        text-align: center;
                        margin-left: 10px;
                        background: $blue;
                        color: $white;
                        transition: .3s;
                        font-size: 14px;
                        letter-spacing: .04em;
                        margin-top: 15px;
                        width: 216px;
                        &:hover {
                            background: transparent;
                            color: $blue;
                        }
                        &.disabled {
                            opacity: .5;
                        }
                    }
                }
            }
        }
    }

    .edit_main .folder .list .caption {
        background-color: transparent;
    }

    /***************** EDIT0R ***************************************************/

    #app .ck.ck-editor__editable_inline>:last-child {
        margin-bottom: var(--ck-spacing-large);
    }

    #app .ck.ck-editor__editable_inline {
        padding: 0 15px;
    }

    #app .modal .ck.ck-toolbar {
        border-radius: 5px 5px 0 0;
    }

    #app .edit_main .ck.ck-toolbar {
        border-radius: 3px 3px 0 0; 
    }

    .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
        border-color: $white-3;
        border-radius: 0 0 5px 5px;
        padding: 0 15px;
        transition: .3s ease;

        &:hover {
            border-color: $blue;
        }
    }

    .ck .ck-link_selected, .editor .ck-editor__editable a {
        position: relative;
        transition: all .6s;
        border-bottom: 1px solid transparent;

        // &:before {
        //     content: "";
        //     width: 0;
        //     height: 1px;
        //     position: absolute;
        //     bottom: -2px;
        //     right: 0;
        //     background: currentColor;
        //     transition: all .3s;
        // }
        &:hover {
            // &:before {
            //     width: 100%;
            //     left: 0;
            // }
            border-color: currentColor;
        }
    }

    .ck.ck-toolbar {
        border: 1px solid $white-3;
        border-radius: 5px 5px 0 0;
        line-height: 22px;
    }

    .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
        border: 1px solid $green-2;
    }

    .ck.ck-reset_all, .ck.ck-reset_all * {
        color: $grey-6;
    }

    .ck.ck-reset, .ck.ck-reset_all, .ck.ck-reset_all * {
        color: $grey-6;
    }

    .ck.ck-toolbar {
        padding-right: 30px;
    }

    .ck.ck-editor__editable_inline ol, .ck.ck-editor__editable_inline ul {
        padding-left: 20px;
    }

    .ck.ck-editor__editable_inline p,
    .ck.ck-editor__editable_inline ul,
    .ck.ck-editor__editable_inline ol {
        line-height: 26px;
        margin: 14px 0;
        letter-spacing: .04em;
    }

    .ck.ck-editor__editable_inline {
        h2, h3 {
            margin-top: 14px;
        }
    }

    /***************** MEDIA *****************/
    @media screen and (max-width: 1400px) {
        .table {
            table {
                .middle {
                    // width: 200px;
                }
                .little {
                    width: 140px;
                }
            }
        }
    }

    @media screen and (max-width: 1515px) {
        .table table .middle {
            // width: 178px;
        }
    }

    @media screen and (max-width: 1200px) {
        .edit_main {
            .folder {
                .column {
                    .content {
                        .list {
                            flex-direction: column;
                            input, textarea, .date, .dropdown, .switch {
                                width: 100%;
                            }
                            p {
                                // margin-bottom: 5px;
                            }
                            .invalid_text {
                                margin-left: 0;
                            }
                        }
                    }
                    .list {
                        flex-direction: column;
                        .caption {
                            margin: 0 0 5px 0;
                        }
                        .text, .inline {
                            width: 100%;
                        }
                    }
                }
            }
        }
        .load-image {
            width: 100%;
        }
    }

    @media screen and (max-width: 1100px) {
        .edit_main {
            .folder {
                flex-direction: column;
                .column {
                    width: 100%;
                    &:first-child {
                        margin-right: 0;
                    }
                    &:last-child {
                        margin-left: 0;
                        border-width: 0 1px 1px 1px;
                        padding: 16px 22px;
                    }
                    .flag {
                        .dropdown label {
                            padding: 2px 9px;
                        }
                    }
                    .content {
                        .list {
                            flex-direction: column;
                            input, textarea, .date, .dropdown, .switch, .load-image {
                                width: 100%;
                            }
                            p {
                                // margin-bottom: 5px;
                            }
                        }
                    }
                }
                &.radius_bottom {
                    .column:first-child {
                        border-radius: 0;
                    }
                }
                &.radius_top {
                    .column:last-child {
                        border-radius: 0;
                    }
                }
            }
            &.edit_feed {
                .folder {
                    .column:last-child {
                        padding: 0;
                        margin-top: 22px;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1023px) {
        .table {
            table {
                .caption {
                    min-width: inherit;
                }
                .middle {
                    width: 1%;
                }
            }
        }
    }

    @media screen and (max-width: 850px) {
        .edit_main {
            .folder {
                flex-direction: column;
                .column {
                    width: 100%;
                    .content {
                        .list {
                            flex-direction: column;
                            input, textarea, .date, .dropdown, .switch, .load-image {
                                width: 100%;
                            }
                            p {
                                // margin-bottom: 5px;
                            }
                        }
                    }
                }
            }
        }
    }

    @media only screen and (max-width: 619px) {
        .constructor_scroll {
            .container {
                .tittle, .subtitle {
                    flex-direction: column;
                    align-items: flex-start;
                    .drop_search {
                        margin-top: 15px;
                        width: 100%;
                        .dropdown, .search {
                            width: 100%;
                        }
                    }
                    .amount_pagination {
                        width: 100%;
                        margin-top: 15px;
                    }
                }
            }
        }
    }

    @media only screen and (max-width: 550px) {
        .header {
            .mobile-nav {
                .dropdown {
                    margin-left: 20px;
                    ul {
                        min-width: 140px;
                        left: auto;
                        right: 0;
                    }
                    label {
                        .mail {
                            display: none;
                        }
                    }
                }
            }
        }
        .flex {
            flex-direction: column;
        }
        .constructor_scroll {
            .container {
                margin-left: 0;
            }
        }
    }

    @media only screen and (max-width: 500px) {
        .main_authorization {
            .authorization-form, .registration-form {
                padding: 58px 15px 24px;
                .hr {
                    margin: 0 -32px;
                }
            }
        }
        .modal_container {
            .modal {
                .tabs {
                    flex-direction: column;
                    div {
                        width: 100%;
                        &.first, &.second {
                            margin: 0;
                        }
                    }
                }
                .add_img {
                    .load-image {
                        width: 100%;
                    }
                }
            }
        }
        .edit_main {
            .folder {
                .column {
                    .list {
                        .inline {
                            flex-direction: column;
                            .text {
                                width: 100%;
                            }
                            a {
                                margin: 10px 0 0 0;
                            }
                        }
                        button {
                            margin: 10px 0 0 0;
                            width: 100%;
                        }
                    }
                }
            }
        }
    }

    /**************** GLOBAL ICONS ****************/

    .icon-check {
        fill: $green;
        width: 22px;
        height: 22px;
    }

    .icon-arrowbold {
        margin-bottom: -1px;
        width: 10px;
        height: 12px;

        &.left {
            margin-right: 10px;
            transform: rotate(180deg);
        }

        &.right {
            margin-left: 10px;
        }
    }

    /**************** TRANSITIONS ****************/

    .popup-enter-active {
        transition: opacity 1s;
    }

    .popup-leave-active {
        transition: opacity .5s;
    }
    .popup-enter, .popup-leave-to {
        opacity: 0;
    }

//--//

    .modal-enter-active {
        animation: modal-animation .4s;
    }

    .modal-leave-active {
        animation: modal-leave-animation .3s;
    }

    @keyframes modal-animation {
        0% {
            transform: translateY(50px);
        }
        70% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0%);
        }
    }

    @keyframes modal-leave-animation {
        0% {
            transform: translateY(0%);
        }
        100% {
            transform: translateY(100px);
        }
    }

    //--//

    .greeting-enter-active {
        animation: greeting-animation .4s;
    }

    .greeting-leave-active {
        animation: greeting-leave-animation .3s;
    }

    @keyframes greeting-animation {
        0% {
            opacity: 0;
            transform: translateY(50px);
        }
        70% {
            opacity: .7;
            transform: translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0%);
        }
    }

    @keyframes greeting-leave-animation {
        0% {
            opacity: 0;
            transform: translateY(0%);
        }
        100% {
            opacity: 1;
            transform: translateY(100px);
        }
    }

    //--//

    .modalbg-enter-active {
        transition: opacity .4s ease;
    }

    .modalbg-leave-active {
        transition: opacity .3s ease;
    }

    .modalbg-enter, .modalbg-leave-to {
        opacity: 0;
    }

    //--//

    .modal-fields-enter-active,
    .modal-fields-leave-active {
        animation: modal-fields .5s
    }

    @keyframes modal-fields {
        0% {
            transform: translateX(-100%)
        }
        60% {
            transform: translateX(5%)
        }
        100% {
            transform: translateX(0)
        }
    }

</style>
