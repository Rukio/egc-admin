<template>
    <div v-show="isLoaded" class="constructor_scroll">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <div class="breadcrumbs">
                    <router-link to="/vacancy">{{textContent.title}}</router-link>
                    <span></span>
                    <h1>{{oldFields.name}}</h1>
                </div>
            </div>
            <div class="edit_main">
                <div class="folder radius_top">
                    <language class="round-top hidden-on-sm" :flag="translateFrom.flag" :name="translateFrom.name"></language>
                    <lang-switch class="round-top top-border-mobile" :languages="languages" :selected="translateTo"></lang-switch>
                </div>
                <div class="folder">
                    <div class="column caption">
                        <p>Редактирование вакансии</p>
                    </div>
                    <div class="column caption">
                        <p>Редактирование вакансии</p>
                    </div>
                </div>
                <div class="folder">
                    <div class="column">
                        <div class="content">
                            <old-input title="Ссылка" name="url"></old-input>
                            <new-input class="hidden-on-lg" title="Ссылка" name="url"></new-input>
                            <old-input title="Название вакансии" name="name" class="last"></old-input>
                            <new-input class="hidden-on-lg" title="Название вакансии" name="name"></new-input>
                        </div>
                    </div>
                    <div class="column hidden-on-sm">
                        <div class="content">
                            <new-input title="Ссылка" name="url"></new-input>
                            <new-input title="Название вакансии" name="name"></new-input>
                        </div>
                    </div>
                </div>
                <div class="folder">
                    <div class="column caption">
                        <p>Текст</p>
                    </div>
                    <div class="column caption">
                        <p>Текст</p>
                    </div>
                </div>
                <div class="folder">
                    <div class="column round-bottom-adapt">
                        <div class="content old_editor">
                            <old-editor name="text"></old-editor>
                        </div>
                    </div>
                    <div class="column round-bottom">
                        <div class="content">
                            <div>
                                <div class="editor"><textarea
                                        style="visibility: hidden" name="content"
                                        cols="30" rows="10" id="ckeditor"
                                        v-model="text"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="buttons">
                    <button class="save" @click="onSubmit">{{textContent.saveButton}}</button>
                    <button class="cancel" @click="reset">{{textContent.cancelButton}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import NewInput from '@/components/edit-form/new-items/Input'
    import OldInput from '@/components/edit-form/old-items/Input'
    import OldEditor from '@/components/edit-form/old-items/Editor'
    import Language from '@/components/Language'
    import LangSwitch from '@/components/LangSwitch'
    import {createNamespacedHelpers} from 'vuex'

    const {mapMutations, mapActions, mapState} = createNamespacedHelpers('editPage')

    export default {
        data: function () {
            return {
                ckeditor: null,
                text: ''
            }
        },
        computed: {
            ...mapState([
                'isLoaded',
                'textContent',
                'translateFrom',
                'languages',
                'translateTo',
                'newFields',
                'oldFields',
                'copyFields',
                'commonFields'
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
                'setFilterParams',
                'setFileExtensions'
            ]),
            ...mapActions([
                'init',
                'reset',
                'edit',
                'getFields'
            ]),
            createCkeditor() {
                ClassicEditor
                    .create(document.getElementById('ckeditor'), {
                        heading: {
                            options: [
                                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
                            ]
                        },
                        ckfinder: {
                            uploadUrl: this.$store.state.apiDomain + this.$store.state.ckfinderUrl,
                            token: localStorage.token
                        }
                    })
                    .then(editor => {
                        this.ckeditor = editor
                    })
                    .catch(() => {
                        this.$store.dispatch(
                            'notification/triggerSelfDismissingNotification',
                            {message: 'Возникла ошибка при загрузке текстового редактора', isError: true},
                            {root: true}
                        )
                    })
            },
            onLangChange(langId) {
                this.getFields(langId).then(response => {
                    this.ckeditor.setData(response.data.data.text)
                })
            },
            onReset() {
                this.ckeditor.setData(this.copyFields.text)
                this.reset()
            },
            onSubmit() {
                let editorText = this.ckeditor.getData()
                editorText = editorText.replace(/&nbsp;/g, '')
                this.edit({
                    language_id: this.translateTo.id,
                    name: this.newFields.name,
                    text: editorText,
                })
            }
        },
        mounted() {
            this.createCkeditor()
        },
        created() {
            this.resetModule()
            this.setFileExtensions({})
            this.setFilterParams({})
            this.init({
                textContent: {
                    title: 'Вакансии',
                    cancelButton: 'Отмена',
                    saveButton: 'Сохранить',
                    greeting: 'Все изменения успешно сохранены',
                    seo: 'SEO'
                },
                errors: {
                    name: {message: 'Введите название вакансии', hasError: false},
                    url: {message: 'Введите ссылку', hasError: false, isNullable: true},
                },
                itemId: this.$route.params.id,
                apiUrlId: 'vacancies',
                commonFields: {}
            }).then(response => {
                this.ckeditor.setData(response.data.data.text)
            })
        },
        components: {
            NewInput,
            OldInput,
            OldEditor,
            Language,
            LangSwitch,
        }
    }
</script>
<style scoped>

</style>
