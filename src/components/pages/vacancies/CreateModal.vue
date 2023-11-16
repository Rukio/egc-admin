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
                        <form-input name="name"></form-input>
                        <form-text-editor name="text" editor-id="editor"></form-text-editor>
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
    import FormTextEditor from '@/components/create-form/TextEditor'
    import {createNamespacedHelpers} from 'vuex'

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
                this.setField({fieldId: 'text', fieldPropertyId: 'value', value: this.fields.text.editor.getData()})
                this.fields.text.editor.setData('')
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
            this.setTabs([
                { title: 'Общие настройки', isFilledIn: false, icon: 'alignleft', styleClass: 'first' },
                { title: 'SEO', isFilledIn: false, icon: 'signalbars', styleClass: 'second' }
            ])
            this.setFileExtensions({})
            this.setCurrentTabId(0)
            this.initFields({
                name: {
                    value: '',
                    parameterName: 'name',
                    name: 'Название вакансии',
                    errorId: null,
                    errors: {empty: 'Введите название вакансии'},
                    tabId: 0
                },
                text: {
                    value: '',
                    editor: null,
                    parameterName: 'text',
                    name: 'Текст вакансии',
                    errorId: null,
                    errors: {empty: 'Напишите текст вакансии'},
                    isNullable: true,
                    tabId: 0
                },
            })
        },
        components: {
            IconAlignleft,
            IconSignalbars,
            FormInput,
            FormTextEditor
        }
    }
</script>

<style scoped>

</style>