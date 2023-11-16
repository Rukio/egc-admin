<template>
<transition name="modalbg">
    <div @click.self="hide" class="popup-bg">
        <transition name="modal" v-on:before-leave="$emit('close')">
            <div v-if="show" class="popup">
                <div class="popup-top">
                    <p class="popup-text">{{ title }}</p>
                    <div @click="hide" class="close"></div>
                </div>
                <div class="popup-main">
                    <icon-check class="icon-check"/>
                    <p class="popup-text">{{ description }}</p>
                </div>
            </div>
        </transition>
    </div>
</transition>
</template>

<script>
import IconCheck from '@/components/icons/IconCheck.vue'

export default {
    data() {
        return {
            show: false
        }
    },
    components: {
        IconCheck
    },
    props: {
        title: {
            type: String,
            default: 'Title'
        },
        description: {
            type: String,
            default: 'Popup description'
        }
    },
    mounted() {
        this.show = true;
        this.popupTimeout = setTimeout(() => {
            this.show = false;
        }, 6000)
    },
    methods: {
        hide() {
            this.show = false;
        }
    }
}
</script>

<style lang="scss" scoped>

.popup-bg {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 999999;
    background-color: rgba(0, 0, 0, .3);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
}

.popup {
    border-radius: 6px;
    overflow: hidden;
    width: 347px;
    max-width: 347px;
    box-shadow: 0px 0px 39px 7px rgba(0, 0, 0, .1);

    &-top {
        background-color: #f8f9fb;
        border-bottom: 1px solid #e7ebed;
        padding: 18px 21px 17px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .popup-text {
            color: #46484c;
        }
    }

    &-main {
        background-color: #fff;
        padding: 22px 21px 32px;
        display: flex;
        align-items: center;

        .popup-text {
            margin-left: 17px;
        }
    }

    &-text {
        color: #6e7074;
        font-weight: normal;
        font-size: 15px;
        margin: 0;
    }
}

</style>
