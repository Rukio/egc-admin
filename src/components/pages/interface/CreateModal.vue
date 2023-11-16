<template>
<transition name="modalbg">
    <div @click.self="closeModal" class="modal_container">
        <transition name="modal" v-on:before-leave="modalClose">
        <div v-if="showed" class="modal">
            <div class="caption">
                <div class="title-modal">{{textContent.titleAdd}}</div>
                <div @click="closeModal" class="close"></div>
            </div>
            <div class="modal-scroll">
                <div class="modal-content">
                    <form v-on:submit.prevent="addItem">
                        <form-input name="title"></form-input>
                    </form>
                </div>
            </div>
            <div class="buttons">
                <div class="next">
                    <button @click="closeModal" class="cancel">{{textContent.cancelButton}}</button>
                    <button class="confirm" @click="onAddItem">{{textContent.submitButton}}
                    </button>
                </div>
            </div>
        </div>
        </transition>
    </div>
</transition>
</template>

<script>
    import IconAlignleft from '@/components/icons/IconAlignleft'
    import IconSignalbars from '@/components/icons/IconSignalbars'
    import FormInput from '@/components/create-form/Input'
    import FormTextArea from '@/components/create-form/TextArea'
    import FormFile from '@/components/create-form/File'
    import FormDropDown from '@/components/create-form/DropDown'
    import FormTextEditor from '@/components/create-form/TextEditor'
    import {createNamespacedHelpers} from 'vuex'
    import Tabs from '@/components/create-form/Tabs'

    const {mapMutations, mapActions, mapState, mapGetters} = createNamespacedHelpers('mainPage')

    export default {
        data() {
            return {
                showed: false
            }
        },
        computed: {
            ...mapState([
                'textContent',
                'fields'
            ]),
            ...mapGetters([
                'getDataFromEditor',
                'isLastTab'
            ]),
            apiUrls() {
                return this.$store.state.apiUrls
            }
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
                'setField',
                'resetTextEditor',
                'setTabs',
                'setCurrentTabId',
                'setFileExtensions'
            ]),
            onAddItem() {
                this.addItem()
            },
            closeModal() {
                this.showed = false;
            }
        },
        mounted() {
            this.showed = true;
        },
        created() {
            // this.setTabs([
            //     { title: 'Общие настройки', isFilledIn: false, icon: 'alignleft', styleClass: 'first' },
            //     { title: 'SEO', isFilledIn: false, icon: 'signalbars', styleClass: 'second' }
            // ])

            this.setCurrentTabId(0)

            this.initFields({
                title: {
                    value: '',
                    parameterName: 'title',
                    name: 'Название групы',
                    errorId: null,
                    errors: {empty: 'Введите название групы'},
                    tabId: 0
                },
            })
        },
        components: {
            IconAlignleft,
            IconSignalbars,
            FormInput,
            FormTextArea,
            FormFile,
            FormDropDown,
            FormTextEditor,
            Tabs
        }
    }
</script>

<style scoped>

</style>