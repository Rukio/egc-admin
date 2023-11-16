<template>
    <aside class="menu">
        <div class="navbar-container-large" v-if="menuDesktopShow">
            <div class="content">
                <!--<div class="tittle">Основные</div>-->
                <!--<div class="margin14px"></div>-->
                <ul class="menu-list">
                    <li class="col1" :class="{active: isSelected('/contact')}">
                        <router-link to="/contact">
                            <icon-contacts/>
                            <span>Контакты</span></router-link>
                    </li>
                    <li class="col2" :class="{active: isSelected('/vacancy')}">
                        <router-link to="/vacancy">
                            <icon-vacancies/>
                            <span>Вакансии</span></router-link>
                    </li>
                    <li class="col3" :class="{active: isSelected('/questionnaire')}">
                        <router-link to="/questionnaire">
                            <icon-ankets/>
                            <span>Анкеты</span>
                            <span class="unread">1</span>
                        </router-link>

                    </li>
                    <li class="col4" :class="{active: isSelected('/client')}">
                        <router-link to="/client">
                            <icon-user/>
                            <span>Клиенты</span></router-link>
                    </li>
                    <!-- <li class="col5" :class="{active: isSelected('/service')}">
                        <router-link to="/service">
                            <icon-services/>
                            <span>Услуги</span></router-link>
                    </li> -->
                    <div class="dropdown">
                        <input id="dr-7" type="checkbox"/>
                        <label for="dr-7" class="col5_d">
                            <icon-services/>
                            <span>Услуги</span>
                            <span class="triangle"></span>
                        </label>
                        <ul class="menu-dd">
                            <router-link class="dd-link" to="/services/category">
                                <li :class="{active: isSelected('/services/category')}"><span>Категории</span></li>
                            </router-link>
                            <router-link class="dd-link" to="/services/service">
                                <li :class="{active: isSelected('/services/service')}"><span>Услуги</span></li>
                            </router-link>
                        </ul>
                    </div>
                    <li class="col6" :class="{active: isSelected('/page')}">
                        <router-link to="/page">
                            <icon-file/>
                            <span>Страницы</span></router-link>
                    </li>
                    <li class="col7" :class="{active: isSelected('/interface')}">
                        <router-link to="/interface">
                            <icon-tv/>
                            <span>Интерфейс</span></router-link>
                    </li>
                </ul>
                <div class="dropdown">
                    <input id="dr-5" type="checkbox"/>
                    <label for="dr-5" class="col7_d">
                        <icon-portfolio/>
                        <span>Портфолио</span>
                        <span class="triangle"></span>
                    </label>
                    <ul>
                        <router-link to="/portfolio/category">
                            <li :class="{active: isSelected('/portfolio/category')}"><span>Категории</span></li>
                        </router-link>
                        <router-link to="/portfolio/project">
                            <li :class="{active: isSelected('/portfolio/project')}"><span>Проекты</span></li>
                        </router-link>
                    </ul>
                </div>
                <div class="dropdown">
                    <input id="dr-6" type="checkbox"/>
                    <label for="dr-6" class="col1_d">
                        <icon-blog/>
                        <span>Блог</span>
                        <span class="triangle"></span>
                    </label>
                    <ul>
                        <router-link to="/blog/author">
                            <li :class="{active: isSelected('/blog/author')}"><span>Авторы</span></li>
                        </router-link>
                        <router-link to="/blog/category">
                            <li :class="{active: isSelected('/blog/category')}"><span>Категории</span></li>
                        </router-link>
                        <router-link to="/blog/article">
                            <li :class="{active: isSelected('/blog/article')}"><span>Статьи</span></li>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
        <div class="navbar-container-little" v-else>
            <ul class="menu-list">
                <li class="col1">
                    <router-link to="/contact">
                        <icon-contacts/>
                        <span class="hint">Контакты</span></router-link>
                </li>
                <li class="col2">
                    <router-link to="/vacancy">
                        <icon-vacancies/>
                        <span class="hint">Вакансии</span></router-link>
                </li>
                <li class="col3">
                    <router-link to="/questionnaire">
                        <icon-ankets/>
                        <span class="unread">1</span>
                        <span class="hint">Анкеты</span></router-link>
                </li>
                <li class="col4">
                    <router-link to="/client">
                        <icon-user/>
                        <span class="hint">Клиенты</span></router-link>
                </li>
                <!-- <li class="col5">
                    <router-link to="/service">
                        <icon-services/>
                        <span class="hint">Услуги</span></router-link>
                </li> -->
                <li class="col5">
                    <span class="a">
                    <icon-services/>
                    <span class="hint_lg">
                        <span class="caption">Услуги</span>
                        <ul>
                            <li :class="{active: isSelected('/services/category')}"><router-link
                                    to="/services/category"><span>Категории</span></router-link></li>
                            <li :class="{active: isSelected('/services/service')}"><router-link
                                    to="/services/service"><span>Услуги</span></router-link></li>
                        </ul>
                    </span>
                </span>
                </li>
                <li class="col6">
                    <router-link to="/page">
                        <icon-file/>
                        <span class="hint">Страницы</span></router-link>
                </li>
                <li class="col7">
                    <router-link to="/interface">
                        <icon-tv/>
                        <span class="hint">Интерфейс</span></router-link>
                </li>
                <li class="col8">
                    <span class="a">
                    <icon-portfolio/>
                    <span class="hint_lg">
                        <span class="caption">Портфолио</span>
                        <ul>
                            <li :class="{active: isSelected('/portfolio/category')}"><router-link
                                    to="/portfolio/category"><span>Категории</span></router-link></li>
                            <li :class="{active: isSelected('/portfolio/project')}"><router-link
                                    to="/portfolio/project"><span>Проекты</span></router-link></li>
                        </ul>
                    </span>
                </span>
                </li>
                <li class="col1">
                    <span class="a">
                    <icon-blog/>
                    <span class="hint_lg">
                        <span class="caption">Блог</span>
                        <ul>
                            <li :class="{active: isSelected('/blog/author')}"><router-link
                                    to="/blog/author"><span>Авторы</span></router-link></li>
                            <li :class="{active: isSelected('/blog/category')}"><router-link
                                    to="/blog/category"><span>Категории</span></router-link></li>
                             <li :class="{active: isSelected('/blog/article')}"><router-link
                                     to="/blog/article"><span>Статьи</span></router-link></li>
                        </ul>
                    </span>
                </span>
                </li>
            </ul>
        </div>
        <transition name="fade">
            <div @click="$store.dispatch('showMenu', { menuType: 'mobile', flag: false })" v-if="menuMobileShow" class="menu-mobile-bg"></div>
        </transition>
        <div :class="{ 'open' : menuMobileShow }"
            class="navbar-container-large menu-mobile">
            <div class="content">
                <ul class="menu-list">
                    <li class="col1" :class="{active: isSelected('/contact')}">
                        <router-link to="/contact">
                            <icon-contacts/>
                            <span>Контакты</span></router-link>
                    </li>
                    <li class="col2" :class="{active: isSelected('/vacancy')}">
                        <router-link to="/vacancy">
                            <icon-vacancies/>
                            <span>Вакансии</span></router-link>
                    </li>
                    <li class="col3" :class="{active: isSelected('/questionnaire')}">
                        <router-link to="/questionnaire">
                            <icon-ankets/>
                            <span>Анкеты</span>
                            <span class="unread">1</span>
                        </router-link>
                    </li>
                    <li class="col4" :class="{active: isSelected('/client')}">
                        <router-link to="/client">
                            <icon-user/>
                            <span>Клиенты</span></router-link>
                    </li>
                    <!-- <li class="col5" :class="{active: isSelected('/service')}">
                        <router-link to="/service">
                            <icon-services/>
                            <span>Услуги</span></router-link>
                    </li> -->
                    <div class="dropdown">
                        <input id="dr-7" type="checkbox"/>
                        <label for="dr-7" class="col1_d">
                            <icon-services/>
                            <span>Услуги</span>
                            <span class="triangle"></span>
                        </label>
                        <ul class="menu-dd-mobile">
                            <router-link to="/services/category">
                                <li class="dd-link" :class="{active: isSelected('/services/category')}"><span>Категории</span></li>
                            </router-link>
                            <router-link to="/services/service">
                                <li class="dd-link" :class="{active: isSelected('/services/service')}"><span>Услуги</span></li>
                            </router-link>
                        </ul>
                    </div>
                    <li class="col6" :class="{active: isSelected('/page')}">
                        <router-link to="/page">
                            <icon-file/>
                            <span>Страницы</span></router-link>
                    </li>
                    <li class="col7" :class="{active: isSelected('/interface')}">
                        <router-link to="/interface">
                            <icon-tv/>
                            <span>Интерфейс</span></router-link>
                    </li>
                    <li class="col9" :class="{active: isSelected('/users')}">
                        <router-link to="/users">
                            <icon-people/>
                            <span>Component</span></router-link>
                    </li>
                </ul>
                <div class="dropdown">
                    <input id="dr-5" type="checkbox"/>
                    <label for="dr-5" class="col7_d">
                        <icon-portfolio/>
                        <span>Портфолио</span>
                        <span class="triangle"></span>
                    </label>
                    <ul>
                        <router-link to="/portfolio/category">
                            <li :class="{active: isSelected('/portfolio/category')}"><span>Категории</span></li>
                        </router-link>
                        <router-link to="/portfolio/project">
                            <li :class="{active: isSelected('/portfolio/project')}"><span>Проекты</span></li>
                        </router-link>
                    </ul>
                </div>
                <div class="dropdown">
                    <input id="dr-6" type="checkbox"/>
                    <label for="dr-6" class="col1_d">
                        <icon-blog/>
                        <span>Блог</span>
                        <span class="triangle"></span>
                    </label>
                    <ul>
                        <router-link to="/blog/author">
                            <li :class="{active: isSelected('/blog/author')}"><span>Авторы</span></li>
                        </router-link>
                        <router-link to="/blog/category">
                            <li :class="{active: isSelected('/blog/category')}"><span>Категории</span></li>
                        </router-link>
                        <router-link to="/blog/article">
                            <li :class="{active: isSelected('/blog/article')}"><span>Статьи</span></li>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
        <div :class="{'small' : !menuDesktopShow }" class="for_button">
            <button @click="$store.dispatch('toggleMenu', { menuType: 'desktop' })">
                <icon-arrowleft/>
            </button>
        </div>
    </aside>
</template>

<script>
    import IconTv from './icons/IconTv.vue'
    import IconServices from './icons/IconServices.vue'
    import IconFile from './icons/IconFile.vue'
    import IconPortfolio from './icons/IconPortfolio.vue'
    import IconBlog from './icons/IconBlog.vue'
    import IconUser from './icons/IconUser.vue'
    import IconShield from './icons/IconShield.vue'
    import IconBrowse from './icons/IconBrowse.vue'
    import IconArrowleft from './icons/IconArrowleft.vue'
    import IconTablegrid from './icons/IconTablegrid.vue'
    import IconVacancies from './icons/IconVacancies.vue'
    import IconAnkets from './icons/IconAnkets.vue'
    import IconContacts from './icons/IconContacts.vue'
    import IconPeople from './icons/IconPeople.vue'
    import { mapState, mapMutations, mapActions } from 'vuex'

    export default {
        data() {
            return {
                showLargeMenu: false
            }
        },
        methods: {
            onShowLargeMenu() {
                this.showLargeMenu = true
                this.$store.commit('setIsHiddenMenu', false)
            },
            hideLargeMenu() {
                this.showLargeMenu = false
                this.$store.commit('setIsHiddenMenu', true)
            },
            toggleLargeMenu() {
                if (this.showLargeMenu == true) {
                    this.showLargeMenu = false;
                    this.$store.commit('setIsHiddenMenu', true)
                } else {
                    this.showLargeMenu = true;
                    this.$store.commit('setIsHiddenMenu', false)
                }
            },
            isSelected(url) {
                return this.$route.path === url
            }
        },
        created() {
            this.$store.dispatch('checkMenuStateOnLoad')
        },
        computed: {
            ...mapState([
                'menuMobileShow',
                'menuDesktopShow'
            ]),
            ...mapActions([
                'showMenu',
                'toggleMenu'
            ])
        },
        components: {
            IconTv,
            IconUser,
            IconShield,
            IconBrowse,
            IconTablegrid,
            IconArrowleft,
            IconServices,
            IconPortfolio,
            IconFile,
            IconBlog,
            IconAnkets,
            IconVacancies,
            IconContacts,
            IconPeople
        },
        watch: {
            $route(to, from) {
                this.$store.dispatch('showMenu', {
                    menuType: 'mobile',
                    flag: false
                });
            }
        }
    }
</script>

<style lang="scss">
    $white: #fff;
    $main-bg-color: #f1f2f7;
    $white-3: #e4e8eb;
    $white-2: #f8f9fb;
    $grey-4: #d8d9d9;

    $grey-5: #55575c;
    $grey-3: #999a9d;
    $grey-6: #6e7074;
    $grey-2: #46484c;

    $blue: #089cd3;

    $pink: #f27777;

    $green-2: #376d27;

    $grey-7: rgba(70, 72, 77, .9);
    $grey-1: #46484c;

    #app .dropdown label ~ ul.menu-dd-mobile a li.dd-link {
        padding-left: 16px;
        padding-top: 8px;
        padding-top: 8px;
    }

    .fade-enter-active {
        transition: opacity 1s;
    }

    .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .menu-mobile-bg {
        position: fixed;
        top: 60px;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .3);
        z-index: 2;
    }
    .menu .navbar-container-large.menu-mobile {
        position: fixed;
        top: 60px;
        left: 0;
        height: calc(100vh - 60px);
        transform: translateX(-100%);
        transition: transform .4s ease;
        z-index: 3;
        &.open {
            transform: translateX(0);
        }
    }
    .navbar-container-large:not(.menu-mobile),
    .navbar-container-little {
        @media screen and (max-width: 1023px) {
            display: none;
        }
    }
    .menu {
        position: fixed;
        top: 60px;
        z-index: 2;
        .navbar-container-little {
            min-height: calc(100vh - 60px);
            width: 53px;
            border-right: 1px solid $white-3;
            background: $white;
            position: relative;
            transition: width .4s ease;
            .menu-list {
                padding-top: 24px;
                padding-left: 0;
                list-style: none;
                li {
                    margin: 7px 0;
                    position: relative;
                    padding: 4px 0;
                    width: 60px;

                    &:last-child {
                        .a:hover {
                            padding-bottom: 140px;
                        }
                    }

                    &:first-child {
                        margin-top: 0;
                    }
                    a, .a {
                        cursor: pointer;
                        padding: 5px 18px;
                        display: flex;
                        width: 58px;
                        &:after {
                            content: '';
                            position: absolute;
                            left: 0;
                            top: 2px;
                            height: 30px;
                            width: 7px;
                            border-radius: 0 7px 7px 0;
                            transition: .3s;
                        }
                        .unread {
                            width: 20px;
                            height: 20px;
                            background-color: #f27777;
                            border-radius: 50%;
                            position: absolute;
                            color: white;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 9px;
                            font-weight: 400;
                            border: 2px solid white;
                            top: 3px;
                            right: 15px;
                        }
                        .hint {
                            top: 8px;
                            left: calc(100% - 2px);
                            transform: translate(0, -100%);
                            &:before {
                                left: -5px;
                                top: 50%;
                                transform: rotate(-180deg) translateY(50%);
                                border-color: transparent transparent transparent rgba(70, 72, 77, 0.9);
                            }
                        }
                        .hint_lg {
                            position: absolute;
                            color: $white;
                            white-space: nowrap;
                            background: $white;
                            border-radius: 7px;
                            opacity: 0;
                            transform: scale(.7);
                            transition: .3s;
                            pointer-events: none;

                            top: 3px;
                            left: calc(100% - 8px);
                            font-size: 15px;
                            z-index: 101;
                            min-width: 200px;
                            color: $grey-2;
                            box-shadow: 3px 7px 40px rgba(0, 0, 0, 0.14);
                            &:before {
                                content: '';
                                position: absolute;
                                border-left: 6px solid $white-2;
                                border-top: 5px solid transparent;
                                border-bottom: 5px solid transparent;
                                left: -5px;
                                top: 15px;
                                transform: rotate(-180deg);
                            }
                            .caption {
                                border-bottom: 1px solid #e7ebed;
                                background: $white-2;
                                font-weight: 500;
                                display: block;
                                padding: 14px 20px;
                                position: relative;
                                border-radius: 7px 7px 0 0;
                                font-size: 15px !important;

                                &:before {
                                    content: '';
                                    position: absolute;
                                    bottom: 100%;
                                    left: 50%;
                                    margin-left: -5px;
                                    border-width: 5px;
                                    border-style: solid;
                                    left: -5px;
                                    top: 50%;
                                    transform: rotate(-180deg) translateY(50%);
                                    border-color: transparent transparent transparent $white-2;
                                }
                            }
                            ul {
                                padding: 12px 38px 18px;
                                list-style-type: disc;
                                color: $blue;
                                li {
                                    padding: 4px 0 0;
                                    margin: 0;
                                    a {
                                        padding: 8px;
                                        &:after {
                                            display: none;
                                        }
                                    }
                                    span {
                                        color: $grey-6;
                                    }
                                    &:hover span {
                                        color: $blue;
                                    }
                                    &.active {
                                        font-weight: 600;
                                        a span {
                                            color: $green-2;
                                        }
                                    }
                                }
                            }
                        }
                        &:hover .hint_lg {
                            transform: scale(1);
                            opacity: 1;
                            pointer-events: all;
                        }
                        &:hover .hint {
                            transition-delay: .3s;
                            transform: translate(0, -25%);
                            opacity: 1;
                        }
                    }
                }

            }
            button {
                position: absolute;
                bottom: 13px;
                left: 13px;
                width: 25px;
                height: 25px;
                background: #7c7e82;
                border-radius: 3px;
                border: none;
                transition: .2s;
                transform: rotate(180deg);
                & svg {
                    color: $white;
                    margin-top: 3px;
                }
                &:hover {
                    background: $blue;
                }
            }
        }
        .navbar-container-large {
            padding-bottom: 15px;
            height: calc(100vh - 116px);
            width: 240px;
            border-right: 1px solid $white-3;
            background: $white;
            position: relative;
            overflow-y: auto;
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
            transition: width .4s ease;
            .content {
                flex: 1 0 auto;
            }
            .tittle {
                padding: 30px 0 11px 20px;
                color: $grey-3;
                text-transform: uppercase;
            }
            .margin14px {
                height: 14px;
                border-bottom: 1px solid $white-3;
                margin: 0 10px;
            }
            .menu-list {
                list-style: none;
                padding-left: 0;
                padding-top: 20px;
                .dropdown label.col5_d ~ .menu-dd li::before {
                    background-color: #65d3da
                }
                .dropdown input {
                        &:checked ~ label.col5_d::after {
                            background-color: #65d3da
                        }
                        & ~ label.col5_d {
                                svg {
                                    color: #65d3da;
                                }
                                &:hover::after {
                                    background-color: #65d3da;
                                }
                            }
                        & ~ ul.menu-dd {
                            padding-left: 41px;
                            & li::before {
                                left: -36px;
                            }
                            a.dd-link {
                                padding: 7px 20px 7px 22px;
                            }
                        }
                }
                li {
                    position: relative;
                    padding: 4px 0;

                    &:last-child {
                        padding: 4px 0 2px;
                    }
                    a {
                        padding: 7px 20px 7px 22px;
                        display: flex;
                        position: relative;
                        &:after {
                            content: '';
                            position: absolute;
                            left: 0;
                            top: 1px;
                            height: 30px;
                            width: 7px;
                            border-radius: 0 7px 7px 0;
                            transition: .3s;
                        }
                        .unread {
                            margin-left: auto;
                            height: 18px;
                            padding: 1px 10px 0;;
                            background-color: #f27777;
                            color: white !important;
                            font-size: 11px;
                            font-weight: 400 !important;
                            border-radius: 5px;
                            display: flex;
                            align-items: center;
                        }
                        span {
                            color: $grey-6;
                            transition: .2s;
                            margin-left: 20px;
                            font-size: 15px;
                        }
                        svg {
                            height: 19px;
                        }
                        &:hover span {
                            color: $blue;
                        }
                    }
                }
                .active {
                    a {
                        span {
                            color: $green-2;
                            font-weight: 600;
                        }
                        &:hover span {
                            color: $green-2;
                        }
                    }
                }
            }
            .dropdown {
                position: relative;
                padding: 5px 0 4px;
                label {
                    padding: 7px 30px 7px 22px;
                    display: flex;
                    &:after {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 9px;
                        height: 30px;
                        width: 7px;
                        border-radius: 0 7px 7px 0;
                        background: transparent;
                        transition: .3s;
                    }
                    &:hover {
                        span {
                            color: $blue;
                        }

                        .triangle {
                            color: $blue;
                        }
                    }
                    span {
                        margin-left: 20px;
                        color: $grey-6;
                        transition: .3s;
                        font-size: 15px;
                    }
                    .triangle {
                        position: absolute;
                        right: 22px;
                        transition: .3s;
                    }
                    &.col7_d {
                        &:hover:after {
                            background: #65daa2;
                        }
                        & svg {
                            color: #65daa2;
                        }
                        & ~ ul li::before {
                            background-color: #65daa2;
                        }
                    }
                    &.col1_d {
                        &:hover:after {
                            background: #089cd3;
                        }
                        & svg {
                            color: #089cd3;
                        }
                        & ~ ul li::before {
                            background-color: #089cd3;
                        }
                    }
                }
                input:checked + .сolumns:after {
                    background: #65daa2;
                }
                input:checked + .col1_d:after {
                    background: #089cd3;
                }
                input:checked + .col7_d:after {
                    background: #65daa2;
                }
                input:checked + label:after {
                    height: calc(100% - 11px);
                }
                ul {
                    overflow: hidden;
                    max-height: 0px;
                    position: relative;
                    background: transparent;
                    list-style-type: none;
                    box-shadow: none;
                    padding-left: 40px;
                    transition: max-height .3s;
                    li {
                        font-size: 22px;
                        color: $blue;
                        position: relative;

                        &::before {
                            content: '';
                            position: absolute;
                            width: 7px;
                            height: 7px;
                            left: -20px;
                            top: calc(50% - 2px);
                            border-radius: 50%;
                        }
                        span {
                            font-size: 16px;
                            color: $grey-6;
                        }
                        &:hover span {
                            color: $blue;
                        }
                        &.active span {
                            color: $green-2;
                        }
                    }
                }
                input:checked ~ ul {
                    max-height: 3000px;
                    padding: 1px 0 0 47px;
                    transition: max-height .3s;
                }
                input:not(:checked) ~ ul {
                    padding: 0;
                }
            }
        }
    }

    @keyframes hint-lg {
        0% {
            opacity: 0;
            transform: scale(.7);
        }

        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    .for_button {
        width: 100%;
        height: 56px;
        text-align: right;
        position: fixed;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-top: 1px solid $white-3;
        border-right: 1px solid $white-3;
        left: 0;
        bottom: 0;
        max-width: 240px;
        background-color: $white;
        transition: max-width .4s ease;

        @media screen and (max-width: 1023px) {
            display: none;
        }
        z-index: 1;
        button {
            width: 25px;
            height: 25px;
            background: #7c7e82;
            border-radius: 3px;
            border: none;
            transition: .2s;
            flex: 0 0 auto;
            margin-right: 13px;
            transition: transform .4s ease;
            & svg {
                color: $white;
                display: block;
                margin: 0 auto;
                margin-bottom: 1px;
            }
            &:hover {
                background: $blue;
            }
        }

        &.small {
            max-width: 53px;
            button {
                transform: rotate(180deg);

                svg {
                    margin-bottom: 0;
                }
            }
        }
    }

    .navbar-container-large .menu-list {
        margin-bottom: 2px;
    }

    .col1 {
        a, .a, a.router-link-active {
            color: #089cd3;
            &:hover:after {
                background: #089cd3;
            }
        }
        &.active a:after, .router-link-active:after {
            background: #089cd3;
        }
        .hint_lg ul li {
            color: #089cd3;
        }
    }

    .col2 {
        a, .a, a.router-link-active {
            color: #ab6fef;
            &:hover:after {
                background: #ab6fef;
            }
        }
        &.active a:after, .router-link-active:after {
            background: #ab6fef;
        }
    }

    .col3 {
        a, .a, a.router-link-active {
            color: #61cc40;
            &:hover:after {
                background: #61cc40;
            }
        }
        &.active a:after, .router-link-active:after {
            background: #61cc40;
        }
    }

    .col4 {
        a, .a, a.router-link-active {
            color: #fe8b4c;
            &:hover:after {
                background: #fe8b4c;
            }
        }
        &.active a:after, .router-link-active:after {
            background: #fe8b4c;
        }
    }

    .col5 {
        a, .a, a.router-link-active {
            color: #65d3da;
            &:hover:after {
                background: #65d3da;
            }
        }
        &.active a:after, .router-link-active:after {
            background: #65d3da;
        }
    }

    .col6 {
        a, .a, a.router-link-active {
            color: #f27777;
            &:hover:after {
                background: #f27777;
            }
        }
        &.active a:after, .router-link-active:after {
            background: #f27777;
        }
    }

    .col7 {
        a, .a, a.router-link-active {
            color: #9591c2;
            &:hover:after {
                background: #9591c2;
            }
        }
        &.active a:after, .router-link-active:after {
            background: #9591c2;
        }
    }

    .col8 {
        a, .a, a.router-link-active {
            color: #65daa2;
            &:hover:after {
                background: #65daa2;
            }
        }
        &.active a:after, .router-link-active:after {
            background: #65daa2;
        }
        .hint_lg ul li {
            color: #65daa2;
        }
    }

    .col9 {
        a, .a, a.router-link-active {
            color: #fe8b4c;
            &:hover:after {
                background: #fe8b4c;
            }
        }
        &.active a:after, .router-link-active:after {
            background: #fe8b4c;
        }
    }

    .navbar-container-large::-webkit-scrollbar {
        width: 4px;
        background-color: #e2e2e4;
    }

    .navbar-container-large::-webkit-scrollbar-thumb {
        background: $grey-1;
    }

    @media screen and (max-height: 550px) {
        .menu .navbar-container-little button {
            position: static;
            margin: 20px 0 14px 14px;
        }
    }
</style>
