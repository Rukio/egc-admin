<template>
    <div class="constructor_scroll" v-show="isLoaded">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <div class="breadcrumbs">
                    <router-link to="/services/category">{{textContent.title}}</router-link>
                    <span></span>
                    <h1>{{oldFields.title}}</h1>
                </div>
            </div>
            <div class="edit_main">
                <div class="folder radius_top">
                    <language class="round-top hidden-on-sm" :flag="translateFrom.flag" :name="translateFrom.name"></language>
                    <lang-switch class="round-top top-border-mobile" :languages="languages" :selected="translateTo"></lang-switch>
                </div>
                <div class="folder">
                    <div class="column caption">
                        <p>Редактирование услуги</p>
                    </div>
                    <div class="column caption">
                        <p>Редактирование услуги</p>
                    </div>
                </div>
                <div class="folder">
                    <div class="column">
                        <div class="content">
                            <old-input title="Ссылка" name="url" class="last"></old-input>
                            <new-input class="hidden-on-lg" title="Ссылка" name="url"></new-input>
                        </div>
                    </div>
                    <div class="column hidden-on-sm">
                        <div class="content">
                            <new-input title="Ссылка" name="url"></new-input>
                        </div>
                    </div>
                </div>
                <div class="folder">
                    <div class="column caption">
                        <p>Статья услуги</p>
                    </div>
                    <div class="column caption">
                        <p>Статья услуги</p>
                    </div>
                </div>
                <div class="folder">
                    <div class="column">
                        <div class="content old_editor">
                            <old-editor name="text"></old-editor>
                        </div>
                    </div>
                    <div class="column">
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
                <div class="folder">
                    <div class="column caption">
                        <p>SEO информация</p>
                    </div>
                    <div class="column caption">
                        <p>SEO информация</p>
                    </div>
                </div>
                <div class="folder radius_bottom">
                    <div class="column round-bottom">
                        <div class="content">
                            <old-input title="Название услуги <h1>" name="title"></old-input>
                            <new-input class="hidden-on-lg" title="Название услуги <h1>" name="title"></new-input>
                            <old-input title="Название страницы <title>" name="seo_title"></old-input>
                            <new-input class="hidden-on-lg" title="Название страницы <title>" name="seo_title"></new-input>
                            <old-input title="Альтернативный текст для изображения" name="alt"></old-input>
                            <new-input class="hidden-on-lg" title="Альтернативный текст для изображения" name="alt"></new-input>
                            <old-text-area title="Анонс" name="subtext"></old-text-area>
                            <new-text-area class="hidden-on-lg" title="Анонс" name="subtext"></new-text-area>
                            <old-text-area title="Ключевые слова" name="keywords"></old-text-area>
                            <new-text-area class="hidden-on-lg" title="Ключевые слова" name="keywords"></new-text-area>
                            <old-text-area title="Краткое описание" name="description" class="last"></old-text-area>
                            <new-text-area class="hidden-on-lg" title="Краткое описание" name="description"></new-text-area>
                        </div>
                    </div>
                    <div class="column round-bottom hidden-on-sm">
                        <div class="content">
                            <new-input title="Название услуги <h1>" name="title"></new-input>
                            <new-input title="Название страницы <title>" name="seo_title"></new-input>
                            <new-input title="Альтернативный текст для изображения" name="alt"></new-input>
                            <new-text-area title="Анонс" name="subtext"></new-text-area>
                            <new-text-area title="Ключевые слова" name="keywords"></new-text-area>
                            <new-text-area title="Краткое описание" name="description"></new-text-area>
                        </div>
                    </div>
                </div>
                <div class="folder radius">
                    <div class="column caption round-top">
                        <p>Прочие настройки</p>
                    </div>
                    <div class="column round-bottom">
                        <div class="content">
                            <edit-file class="short" use-case="icon"  title="Иконка" name="image"></edit-file>
                            <edit-file class="short" use-case="seo"  title="Изображение для SEO" name="seo_image"></edit-file>
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
    import NewTextArea from '@/components/edit-form/new-items/TextArea'
    import NewInput from '@/components/edit-form/new-items/Input'
    import OldInput from '@/components/edit-form/old-items/Input'
    import OldEditor from '@/components/edit-form/old-items/Editor'
    import OldTextArea from '@/components/edit-form/old-items/TextArea'
    import Language from '@/components/Language'
    import LangSwitch from '@/components/LangSwitch'
    import EditFile from '@/components/edit-form/File'

    import {createNamespacedHelpers} from 'vuex'

    const {mapMutations, mapActions, mapState} = createNamespacedHelpers('editPage')

    export default {
        data() {
            return {
                ckeditor: null,
                text: ''
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
                'commonFields',
                'isLoaded'
            ])
        },
        methods: {
            ...mapMutations([
                'setCommonFieldFileUrl',
                'resetModule',
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
                    text: editorText,
                    subtext: this.newFields.subtext,
                    title: this.newFields.title,
                    url: this.newFields.url,
                    seo_title: this.newFields.seo_title,
                    description: this.newFields.description,
                    keywords: this.newFields.keywords,
                    seo_image: this.commonFields.seo_image.url,
                    image: this.commonFields.image.url,
                    alt: this.newFields.alt
                })
            }
        },
        mounted() {
            this.createCkeditor()
        },
        created() {
            this.resetModule()
            this.setFileExtensions({image: ['svg'], seo_image: ['jpg', 'jpeg', 'png', 'gif']})
            this.init({
                textContent: {
                    title: 'Услуги',
                    cancelButton: 'Отмена',
                    saveButton: 'Сохранить',
                    greeting: 'Все изменения успешно сохранены',
                },
                errors: {
                    title: {message: 'Введите название услуги', hasError: false},
                    subtext: {message: 'Введите анонс', hasError: false},
                    url: {message: 'Введите ссылку', hasError: false, isNullable: true},
                    seo_title: {message: 'Введите название страницы', hasError: false},
                    description: {message: 'Напишите краткое описание', hasError: false},
                    keywords: {message: 'Напишите ключевые слова', hasError: false},
                    image: {message: 'Допустимые расширения: svg', hasError: false},
                    seo_image: {message: 'Допустимые расширения: jpg, jpeg, png, gif', hasError: false},
                    alt: {message: 'Введите альтернативный текст', hasError: false},
                },
                itemId: this.$route.params.id,
                apiUrlId: 'servicesCategories',
                commonFields: {
                    image: {name: '', url: ''},
                    seo_image: {name: '', url: ''},
                }
            }).then(response => {
                this.ckeditor.setData(response.data.data.text)
                this.setCommonFieldFileUrl({fieldId: 'image', url: response.data.data.image})
                this.setCommonFieldFileUrl({fieldId: 'seo_image', url: response.data.data.seo_image})
            })
        },
        components: {
            NewTextArea,
            NewInput,
            OldInput,
            OldEditor,
            OldTextArea,
            Language,
            LangSwitch,
            EditFile
        }
    }
</script>
<style scoped>

</style>
