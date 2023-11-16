<template>
    <div v-show="isLoaded" class="constructor_scroll">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <div class="breadcrumbs">
                    <router-link to="/portfolio/project">{{textContent.title}}</router-link>
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
                        <p>Редактирование проекта портфолио</p>
                    </div>
                    <div class="column caption">
                        <p>Редактирование проекта портфолио</p>
                    </div>
                </div>
                <div class="folder">
                    <div class="column">
                        <div class="content">
                            <old-input title="Ссылка" name="url"></old-input>
                            <new-input class="hidden-on-lg" title="Ссылка" name="url"></new-input>
                            <old-text-area title="Анонс" name="subtext" class="last"></old-text-area>
                            <new-text-area class="hidden-on-lg" title="Анонс" name="subtext"></new-text-area>
                        </div>
                    </div>
                    <div class="column hidden-on-sm">
                        <div class="content">
                            <new-input title="Ссылка" name="url"></new-input>
                            <new-text-area title="Анонс" name="subtext"></new-text-area>
                        </div>
                    </div>
                </div>
                <div class="folder">
                    <div class="column caption">
                        <p>Левая колонка статьи</p>
                    </div>
                    <div class="column caption">
                        <p>Левая колонка статьи</p>
                    </div>
                </div>
                 <div class="folder">
                    <div class="column">
                        <div class="content old_editor">
                            <old-editor name="left_text"></old-editor>
                        </div>
                    </div>
                    <div class="column">
                        <div class="content">
                            <div>
                                <div class="editor"><textarea
                                        style="visibility: hidden" name="content"
                                        cols="30" rows="10" id="ckeditor_left"
                                        v-model="left_text"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              <div class="folder">
                <div class="column caption">
                  <p>Правая колонка статьи</p>
                </div>
                <div class="column caption">
                  <p>Правая колонка статьи</p>
                </div>
              </div>
              <div class="folder">
                <div class="column">
                  <div class="content old_editor">
                    <old-editor name="right_text"></old-editor>
                  </div>
                </div>
                <div class="column">
                  <div class="content">
                    <div>
                      <div class="editor"><textarea
                        style="visibility: hidden" name="content"
                        cols="30" rows="10" id="ckeditor_right"
                        v-model="right_text"></textarea>
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
                            <old-input title="Название проекта <h1>" name="title"></old-input>
                            <new-input class="hidden-on-lg" title="Название проекта <h1>" name="title"></new-input>
                            <old-input title="Название страницы <title>" name="seo_title"></old-input>
                            <new-input class="hidden-on-lg" title="Название страницы <title>" name="seo_title"></new-input>
                            <old-input title="Альтернативный текст для изображения" name="alt"></old-input>
                            <new-input class="hidden-on-lg" title="Альтернативный текст для изображения" name="alt"></new-input>
                            <old-text-area title="Ключевые слова" name="keywords"></old-text-area>
                            <new-text-area class="hidden-on-lg" title="Ключевые слова" name="keywords"></new-text-area>
                            <old-text-area title="Краткое описание" name="description" class="last"></old-text-area>
                            <new-text-area class="hidden-on-lg" title="Краткое описание" name="description"></new-text-area>
                        </div>
                    </div>
                    <div class="column round-bottom hidden-on-sm">
                        <div class="content">
                            <new-input title="Название проекта <h1>" name="title"></new-input>
                            <new-input title="Название страницы <title>" name="seo_title"></new-input>
                            <new-input title="Альтернативный текст для изображения" name="alt"></new-input>
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
                            <edit-drop-down field-name="name" title="Автор" :url="apiUrls.authors" name="author"></edit-drop-down>
                            <edit-drop-down field-name="title" title="Категория" :url="apiUrls.portfolioCategories" name="category"></edit-drop-down>
                            <edit-file class="short" use-case="cover" v-if="isLoaded" title="Изображение" name="image"></edit-file>
                            <edit-file class="short" use-case="seo" name="seoImage" v-if="isLoaded" title="Изображение для SEO"></edit-file>
                        </div>
                    </div>
                </div>
                <div class="buttons">
                    <button class="save" @click="onSubmit">{{textContent.saveButton}}</button>
                    <button class="cancel" @click="reset">{{textContent.cancelButton}}</button>
                </div>
            </div>
        </div>
        <popup-result
            v-if="popupActive"
            @close="popupActive = false"
            :title="'Пригласить в аккаунт'"
            :description="'Приглашение отправлено'"/>
    </div>
</template>

<script>
    import IconUpload from '@/components/icons/IconUpload'
    import NewTextArea from '@/components/edit-form/new-items/TextArea'
    import NewInput from '@/components/edit-form/new-items/Input'
    import OldInput from '@/components/edit-form/old-items/Input'
    import OldTextArea from '@/components/edit-form/old-items/TextArea'
    import OldEditor from '@/components/edit-form/old-items/Editor'
    import Language from '@/components/Language'
    import LangSwitch from '@/components/LangSwitch'
    import EditDropDown from '@/components/edit-form/DropDown'
    import EditFile from '@/components/edit-form/File'
    import PopupResult from '@/components/PopupResult.vue'
    import {createNamespacedHelpers} from 'vuex'

    const {mapMutations, mapActions, mapState} = createNamespacedHelpers('editPage')

    export default {
        data: function () {
            return {
                ckeditor_right: null,
                ckeditor_left: null,
                left_text: '',
                right_text: '',
                popupActive: false
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
            triggerNotification() {
                this.$store.dispatch('notification/triggerSelfDismissingNotification', {
                    message: 'Все изменения успешно сохранены',
                    isError: false
                })
            },
            createCkeditor() {
                ClassicEditor
                    .create(document.getElementById('ckeditor_left'), {
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
                        this.ckeditor_left = editor
                    })
                    .catch(() => {
                        this.$store.dispatch(
                            'notification/triggerSelfDismissingNotification',
                            {message: 'Возникла ошибка при загрузке текстового редактора', isError: true},
                            {root: true}
                        )
                    })

              ClassicEditor
                .create(document.getElementById('ckeditor_right'), {
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
                  this.ckeditor_right = editor
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
                    this.ckeditor_right.setData(response.data.data.right_text)
                    this.ckeditor_left.setData(response.data.data.left_text)
                })
            },
            onReset() {
                this.ckeditor_right.setData(this.copyFields.right_text)
                this.ckeditor_left.setData(this.copyFields.left_text)
                this.reset()
            },
            onSubmit() {
                let editorTextRight = this.ckeditor_right.getData()
                editorTextRight = editorTextRight.replace(/&nbsp;/g, '')
                let editorTextLeft = this.ckeditor_left.getData()
                editorTextLeft = editorTextLeft.replace(/&nbsp;/g, '')
                this.edit({
                    language_id: this.translateTo.id,
                    portfolio_category_id: this.commonFields.category.id,
                    article_author_id: this.commonFields.author.id,
                    image: this.commonFields.image.url,
                    seoImage: this.commonFields.seoImage.url,
                    title: this.newFields.title,
                    seo_title: this.newFields.seo_title,
                    url: this.newFields.url,
                    keywords: this.newFields.keywords,
                    description: this.newFields.description,
                    right_text: editorTextRight,
                    left_text: editorTextLeft,
                    subtext: this.newFields.subtext,
                    alt: this.newFields.alt
                })
            }
        },
        mounted() {
            this.createCkeditor()
        },
        created() {
            this.resetModule()
            this.setFileExtensions({image: ['jpg', 'jpeg', 'png', 'gif'], seoImage: ['jpg', 'jpeg', 'png', 'gif']})
            this.setFilterParams({
                category: [],
                author: []
            })
            this.init({
                textContent: {
                    title: 'Проекты',
                    cancelButton: 'Отмена',
                    saveButton: 'Сохранить',
                    greeting: 'Все изменения успешно сохранены',
                    seo: 'SEO'
                },
                errors: {
                    title: {message: 'Введите название проекта', hasError: false},
                    url: {message: 'Введите ссылку', hasError: false, isNullable: true},
                    seo_title: {message: 'Введите название страницы', hasError: false},
                    description: {message: 'Напишите краткое описание', hasError: false},
                    alt: {message: 'Введите альтернативный текст', hasError: false},
                    keywords: {message: 'Напишите ключевые слова', hasError: false},
                    subtext: {message: 'Введите анонс статьи', hasError: false},
                    image: {message: 'Допустимые расширения: jpg, jpeg, png, gif', hasError: false},
                    seoImage: {message: 'Допустимые расширения: jpg, jpeg, png, gif', hasError: false}
                },
                itemId: this.$route.params.id,
                apiUrlId: 'portfolioProjects',
                commonFields: {
                    image: {name: '', url: ''},
                    seoImage: {name: '', url: ''},
                    category: {},
                    author: {}
                }
            }).then(response => {
                this.ckeditor_left.setData(response.data.data.left_text)
                this.ckeditor_right.setData(response.data.data.right_text)
                this.setCommonField({fieldId: 'author', value: response.data.article_author})
                this.setCommonField({fieldId: 'category', value: response.data.portfolio_category})
                this.setCommonFieldFileUrl({fieldId: 'image', url: response.data.data.image})
                this.setCommonFieldFileUrl({fieldId: 'seoImage', url: response.data.data.seo_image})
            })
        },
        components: {
            NewTextArea,
            NewInput,
            OldInput,
            OldTextArea,
            OldEditor,
            Language,
            LangSwitch,
            EditDropDown,
            EditFile,
            IconUpload,
            PopupResult
        }
    }
</script>
<style scoped>

</style>
