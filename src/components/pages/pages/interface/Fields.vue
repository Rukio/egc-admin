<template>
    <div>
       <!-- <div class="subtitle">
        <div class="modal_button">
            <button @click="onAddItem"><icon-add/>{{textContent.addItemText}}</button>
        </div>
    </div> -->
        <div class="edit_main" v-if="oldFields.length">
            <div class="folder radius_top">
                <language class="round-top hidden-on-sm" :flag="translateFrom.flag" :name="translateFrom.name"></language>
                <lang-switch class="round-top top-border-mobile" :languages="languages" :selected="translateTo" switch-id="dr-langs-1"></lang-switch>
            </div>
            <div class="folder" >
                <div class="column round-bottom-adapt">
                    <div class="content">
                        <old-input v-for="(oldField, key) in oldFields" v-bind:key="key" :title="oldField.title" :name="key"></old-input>
                    </div>
                </div>
                <div class="column round-bottom">
                    <div class="content">
                        <new-input v-for="(newField, key) in newFields" v-bind:key="key" :title="newField.title" :name="key"></new-input>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <button class="save" @click="onSubmit">{{textContent.saveButton}}</button>
            </div>
        </div>
        <create-modal v-if="isAdd && isAdding"></create-modal>
    </div>
</template>

<script>
    import IconUpload from '@/components/icons/IconUpload'
    import NewInput from '@/components/interface-form/new-items/Input'
    import OldInput from '@/components/interface-form/old-items/Input'
    import OldEditor from '@/components/interface-form/old-items/Editor'
    import Language from '@/components/Language'
    import LangSwitch from '@/components/LangSwitch'
    import {createNamespacedHelpers} from 'vuex'
    import CreateModal from './CreateInterface'

    const {mapMutations, mapActions, mapState} = createNamespacedHelpers('interfacePage')
    export default {
        data: function () {
            return {
                ckeditor: null,
                text: ''
            }
        },
        props: {
            isAdding: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            ...mapState([
                'textContent',
                'translateFrom',
                'languages',
                'translateTo',
                'newFields',
                'oldFields',
                'copyFields',
                'commonFields',
                'isAdd',
                'errors',
                'interfaceGroup'
            ]),
            apiUrls() {
                return this.$store.state.apiUrls
            }
        },
        methods: {
            ...mapMutations([
                'setCommonFieldFileUrl',
                'setCommonField',
                'resetModule',
                'setFileExtensions',
                'setIsAdd'
            ]),
            ...mapActions([
                'init',
                'edit',
                'getFields'
            ]),
            onAddItem() {
                this.setIsAdd(true)
            },
            // createCkeditor() {
            //     ClassicEditor
            //         .create(document.getElementById('ckeditor'), {})
            //         .then(editor => {
            //             this.ckeditor = editor
            //         })
            //         .catch(() => {
            //             this.$store.dispatch(
            //                 'notification/triggerSelfDismissingNotification',
            //                 {message: 'Возникла ошибка при загрузке текстового редактора', isError: true},
            //                 {root: true}
            //             )
            //         })
            // },
            onLangChange(langId) {
                this.getFields(langId)
                //     .then(response => {
                //     this.ckeditor.setData(response.data.data.text)
                // })
            },
            onReset() {
                // this.ckeditor.setData(this.copyFields.text)
                this.reset()
            },
            onSubmit() {
                this.edit()
            }
        },
        created() {
            this.resetModule()
            this.init({
                textContent: {
                    title: 'Групы',
                    cancelButton: 'Отмена',
                    saveButton: 'Сохранить',
                    greeting: 'Все изменения успешно сохранены',
                    addItemText: 'Добавить поле',
                    addGreeting: 'Поле успешно добавлено',
                    titleAdd: 'Добавить поле',
                    submitButton: 'Добавить поле'
                },
                error: {message: 'Заполните поле', hasError: false},
                itemId: this.$route.params.groupId,
                apiUrlId: 'interface',
                commonFields: {}
            })
        },
        components: {
            NewInput,
            OldInput,
            OldEditor,
            Language,
            LangSwitch,
            IconUpload,
            CreateModal,
        }
    }
</script>

<style lang="scss" scoped>
    .buttons {
        margin-bottom: 0;
    }
</style>
