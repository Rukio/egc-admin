<template>
    <transition name="modalbg">
        <div @click.self="closeModal" class="modal_container">
            <transition name="modal" v-on:before-leave="modalClose">
            <div v-if="showed" class="modal">
                <div class="modal-content">
                    <div class="caption">
                        <div class="title-modal">{{textContent.titleAdd}}</div>
                        <div @click="closeModal" class="close"></div>
                    </div>
                    <div class="modal-scroll">
                        <form v-on:submit.prevent="addItem">
                            <form-input name="name"></form-input>
                        </form>
                    </div>
                    <div class="buttons">
                        <div class="next">
                            <button @click="closeModal" class="cancel">{{textContent.cancelButton}}</button>
                            <button class="confirm" @click="addItem">{{textContent.submitButton}}</button>
                        </div>
                    </div>
                </div>
            </div>
            </transition>
        </div>
    </transition>
</template>

<script>
    import FormInput from '@/components/create-form/Input'
    import { createNamespacedHelpers } from 'vuex'
    import FormTextArea from '@/components/create-form/TextArea'
    import FormFile from '@/components/create-form/File'
    import Tabs from '@/components/create-form/Tabs'

    const { mapMutations, mapGetters, mapActions, mapState } = createNamespacedHelpers('mainPage')

    export default {
        data() {
            return {
                showed: false
            }
        },
        computed: {
            ...mapState([
                'textContent'
            ]),
            ...mapGetters([
                'isLastTab'
            ])
        },
        methods: {
            ...mapActions([
                'modalClose',
                'addItem',
                'initFields',
                'onNext',
                'onPrev'
            ]),
            ...mapMutations([
                'setTabs',
                'setCurrentTabId'
            ]),
            closeModal() {
                this.showed = false;
            }
        },
        mounted() {
            this.showed = true;
        },
        created() {
            this.setCurrentTabId(0)
            this.initFields({
                name: {
                    value: '',
                    parameterName: 'name',
                    name: 'Имя автора',
                    errorId: null,
                    errors: {empty: 'Введите имя автора'},
                    tabId: 0
                }
            })
        },
        components: {
            FormInput,
            FormTextArea,
            FormFile,
            Tabs
        }
    }
</script>

<style scoped>

</style>