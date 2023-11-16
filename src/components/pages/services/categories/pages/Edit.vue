<template>
    <div v-show="isLoaded" class="constructor_scroll">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <div class="breadcrumbs">
                    <router-link to="/services/service">{{textContent.title}}</router-link>
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
                        <p>Редактирование категории</p>
                    </div>
                    <div class="column caption">
                        <p>Редактирование категории</p>
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
                <!-- <div class="folder">
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
                </div> -->
              <div class="folder">
                    <div class="column caption">
                        <p>Статья</p>
                    </div>
                    <div class="column caption">
                        <p>Статья</p>
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
                            <old-input title="Название категории <h1>" name="title"></old-input>
                            <new-input class="hidden-on-lg" title="Название категории <h1>" name="title"></new-input>
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
                            <new-input title="Название категории <h1>" name="title"></new-input>
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
                            <!-- <edit-drop-down field-name="name" title="Автор" :url="apiUrls.authors" name="author"></edit-drop-down> -->
                            <edit-drop-down field-name="name" title="Услуга" v-if="isLoaded" :url="apiUrls.servicesCategories" name="category"></edit-drop-down>
                            <edit-file class="short" use-case="cover" v-if="isLoaded" title="Изображение" name="image"></edit-file>
                            <!-- <edit-file class="short" use-case="icon" v-if="isLoaded" title="Иконка" name="icon"></edit-file> -->
                            <edit-file class="short" use-case="seo" name="seo_image" v-if="isLoaded" title="Изображение для SEO"></edit-file>
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
                ckeditor: null,
                text: '',
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
                    service_category_id: this.commonFields.category.id,
                    image: this.commonFields.image.url,
                    seo_image: this.commonFields.seo_image.url,
                    title: this.newFields.title,
                    seo_title: this.newFields.seo_title,
                    url: this.newFields.url,
                    keywords: this.newFields.keywords,
                    description: this.newFields.description,
                    text: editorText,
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
            this.setFileExtensions({image: ['jpg', 'jpeg', 'png', 'gif'], seo_image: ['jpg', 'jpeg', 'png', 'gif']})
            this.setFilterParams({
                category: []
            })
            this.init({
                textContent: {
                    title: 'Категории',
                    cancelButton: 'Отмена',
                    saveButton: 'Сохранить',
                    greeting: 'Все изменения успешно сохранены',
                    seo: 'SEO'
                },
                errors: {
                    title: {message: 'Введите название категории', hasError: false},
                    url: {message: 'Введите ссылку', hasError: false, isNullable: true},
                    seo_title: {message: 'Введите название страницы', hasError: false},
                    description: {message: 'Напишите краткое описание', hasError: false},
                    alt: {message: 'Введите альтернативный текст', hasError: false},
                    keywords: {message: 'Напишите ключевые слова', hasError: false},
                    text: {message: 'Напишите текст категории', hasError: false},
                    subtext: {message: 'Введите анонс статьи', hasError: false},
                    image: {message: 'Допустимые расширения: jpg, jpeg, png, gif', hasError: false},
                    seo_image: {message: 'Допустимые расширения: jpg, jpeg, png, gif', hasError: false},
                    // service_category_id: {message: 'Выберите категорию', hasError: false, isNullable: true}
                },
                itemId: this.$route.params.id,
                apiUrlId: 'servicesServices',
                commonFields: {
                    image: {name: '', url: ''},
                    seo_image: {name: '', url: ''},
                    category: {}
                }
            }).then(response => {
                this.ckeditor.setData(response.data.data.text)
                this.setCommonField({fieldId: 'category', value: response.data.service_category})
                this.setCommonFieldFileUrl({fieldId: 'image', url: response.data.data.image})
                this.setCommonFieldFileUrl({fieldId: 'seo_image', url: response.data.data.seo_image})
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
