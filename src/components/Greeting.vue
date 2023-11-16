<template>
<transition name="greeting">
    <div v-show="showGreeting" :class="{error_message: isError, success: !isError}" class="saved">
        <icon-warning v-if="isError" class="warning"></icon-warning>
        <icon-circle-check class="check" v-else></icon-circle-check>
        <span class="text">{{message}}</span>
        <span class="close" @click="close"></span>
    </div>
</transition>
    
    <!--<div class="modal_container modal_container_little">
        <div class="modal">
            <div class="caption">
                <p>Добавить категорию проекта</p>
                <div class="close"></div>
            </div>
            <div class="content">
                <p class="tick"><icon-tick/></p>
                <p>Новая категория добавлена</p>
            </div>
        </div>   
    </div>-->
</template>

<script>
    import IconTick from './icons/IconTick.vue'
    import IconWarning from '@/components/icons/IconWarning.vue'
    import IconCircleCheck from '@/components/icons/IconCircleCheck.vue'
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import faExclamationTriangle from '@fortawesome/fontawesome-free-solid/faExclamationTriangle'
    import { createNamespacedHelpers } from 'vuex'

    const { mapState, mapMutations } = createNamespacedHelpers('notification')

    export default {
        name: "Greeting",
        computed: {
            ...mapState([
                'showGreeting',
                'isError',
                'message'
            ])
        },
        methods: {
            ...mapMutations([
                'setShowGreeting'
            ]),
            close() {
                this.setShowGreeting(false)
            }
        },
        components: {
            FontAwesomeIcon,
            IconTick,
            IconWarning,
            IconCircleCheck
        }
    }
</script>

<style lang="scss" scoped>
    $pink: #f27777;
    $grey-6: #6e7074;
    $green: #61cc40;

    .saved {
        position: fixed;
        bottom: 15px;
        right: 15px;
        /*background: #51a351;*/
        padding: 22px;
        background-color: #fff;
        display: flex;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, .1);
        border-radius: 5px;

        @media screen and (max-width: 849px) {
            right: calc(50% - 155px);
        }

        &.success {
            background-color: #fff !important;
            border-color: inherit !important;
        }

        .warning {
            background-color: transparent !important;
            border-color: inherit !important;
        }
    }
    .saved .check {
        width: 22px;
        height: 22px;
        fill: $green;
        margin-right: 15px;
        position: relative;
    }
    .saved .check:before {
        width: 9px;
        height: 3px;
        left: 3px;
    }
    .saved .check:after {
        width: 15px;
        height: 3px;
        left: 6px;
    }
    .saved .warning {
        width: 22px;
        height: 22px;
        margin-right: 15px;
        fill: $pink;
    }
    .saved .text {
        width: 200px;
        line-height: 22px;
        letter-spacing: .03em;
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: 15px;
        color: $grey-6;
        margin-right: 30px;
    }
    .saved .close {
        position: absolute;
        right: 12px;
        top: 14px;
        width: 10px;
        height: 10px;
        cursor: pointer;
    }
    .saved .close:before, .saved .close:after {
        position: absolute;
        content: ' ';
        height: 16px;
        width: 2px;
        background-color: $grey-6;
    }
    .saved .close:before {
        transform: rotate(45deg);
    }
    .saved .close:after {
        transform: rotate(-45deg);
    }
    .saved.error_message .text {
        width: 222px;
        padding-left: 18px;
        margin-top: -4px;
    }
</style>