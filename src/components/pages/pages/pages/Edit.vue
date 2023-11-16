<template>
    <div v-show="isLoaded" class="constructor_scroll">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <div class="breadcrumbs">
                    <router-link to="/page">{{textContent.title}}</router-link>
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
                        <p>Редактирование страницы</p>
                    </div>
                    <div class="column caption">
                        <p>Редактирование страницы</p>
                    </div>
                </div>
                <div class="folder">
                    <div class="column">
                        <div class="content">
                            <old-input title="ID страницы" name="name"></old-input>
                            <new-input class="hidden-on-lg" title="ID страницы" name="name"></new-input>
                            <old-input title="Ссылка" name="url" class="last"></old-input>
                            <new-input class="hidden-on-lg" title="Ссылка" name="url"></new-input>
                        </div>
                    </div>
                    <div class="column hidden-on-sm">
                        <div class="content">
                            <new-input title="ID страницы" name="name"></new-input>
                            <new-input title="Ссылка" name="url"></new-input>
                        </div>
                    </div>
                </div>
                <!--<div class="folder">-->
                    <!--<div class="column caption">-->
                        <!--<p>Статья</p>-->
                    <!--</div>-->
                    <!--<div class="column caption">-->
                        <!--<p>Статья</p>-->
                    <!--</div>-->
                <!--</div>-->
                 <!--<div class="folder">-->
                    <!--<div class="column">-->
                        <!--<div class="content old_editor">-->
                            <!--<old-editor name="text"></old-editor>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="column">-->
                        <!--<div class="content">-->
                            <!--<div>-->
                                <!--<div class="editor"><textarea-->
                                        <!--style="visibility: hidden" name="content"-->
                                        <!--cols="30" rows="10" id="ckeditor"-->
                                        <!--v-model="text"></textarea>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
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
                            <old-input title="Название страницы <h1>" name="title"></old-input>
                            <new-input class="hidden-on-lg" title="Название страницы <h1>" name="title"></new-input>
                            <old-input title="Название страницы <title>" name="seo_title"></old-input>
                            <new-input class="hidden-on-lg" title="Название страницы <title>" name="seo_title"></new-input>
                            <old-text-area title="Ключевые слова" name="keywords"></old-text-area>
                            <new-text-area class="hidden-on-lg" title="Ключевые слова" name="keywords"></new-text-area>
                            <old-text-area title="Краткое описание" name="description" class="last"></old-text-area>
                            <new-text-area class="hidden-on-lg" title="Краткое описание" name="description"></new-text-area>
                        </div>
                    </div>
                    <div class="column round-bottom hidden-on-sm">
                        <div class="content">
                            <new-input title="Название страницы <h1>" name="title"></new-input>
                            <new-input title="Название страницы <title>" name="seo_title"></new-input>
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
                            <edit-file class="short" use-case="seo" v-if="isLoaded" title="Изображение" name="image"></edit-file>
                        </div>
                    </div>
                </div>
                <div class="folder radius table">
                    <div class="column caption round-top">
                        <p>Контент</p>
                    </div>
                    <div class="column round-bottom">
                            <interface-groups></interface-groups>
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
    import {createNamespacedHelpers} from 'vuex'

    import InterfaceGroups from '../interface/pages/Groups'

    const {mapMutations, mapActions, mapState} = createNamespacedHelpers('editPage')

    export default {
        data: function () {
            return {
                ckeditor: null,
                text: '',
                interfaceGroups: []
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
                'setFileExtensions'
            ]),
            ...mapActions([
                'init',
                'reset',
                'edit',
                'getFields'
            ]),
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
                this.edit({
                    language_id: this.translateTo.id,
                    image: this.commonFields.image.url,
                    title: this.newFields.title,
                    seo_title: this.newFields.seo_title,
                    url: this.newFields.url,
                    name: this.newFields.name,
                    keywords: this.newFields.keywords,
                    description: this.newFields.description,
                    // text: this.ckeditor.getData(),
                })
            }
        },
        // mounted() {
        //     this.createCkeditor()
        // },
        created() {
            this.resetModule()
            this.setFileExtensions({image: ['jpg', 'jpeg', 'png', 'gif']})
            this.init({
                textContent: {
                    title: 'Страницы',
                    cancelButton: 'Отмена',
                    saveButton: 'Сохранить',
                    greeting: 'Все изменения успешно сохранены',
                    addGroup: 'Добавить'
                },
                errors: {
                    name: {message: 'Введите ID страницы', hasError: false},
                    title: {message: 'Введите название страницы', hasError: false},
                    seo_title: {message: 'Введите название страницы', hasError: false},
                    url: {message: 'Введите ссылку', hasError: false, isNullable: true},
                    description: {message: 'Напишите краткое описание', hasError: false},
                    keywords: {message: 'Напишите ключевые слова', hasError: false},
                    image: {message: 'Допустимые расширения: jpg, jpeg, png, gif', hasError: false}
                },
                itemId: this.$route.params.id,
                apiUrlId: 'pages',
                commonFields: {
                    image: {name: '', url: ''}
                }
            }).then(response => {
                // this.ckeditor.setData(response.data.data.text)
                this.setCommonFieldFileUrl({fieldId: 'image', url: response.data.data.image})
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
            InterfaceGroups
        }
    }
</script>
<style scoped>

</style>
