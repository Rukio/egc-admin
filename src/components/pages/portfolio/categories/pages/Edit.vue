<template>
    <div class="constructor_scroll" v-show="isLoaded">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <div class="breadcrumbs">
                    <router-link to="/portfolio/category">{{textContent.title}}</router-link>
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
                        <p>Редактирование категории портфолио</p>
                    </div>
                    <div class="column caption">
                        <p>Редактирование категории портфолио</p>
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
                            <new-input class="hidden-on-lg" title="Название страницы <title>" name="seo_title"></new-input>
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
                            <new-input title="Название категории <h1>" name="title"></new-input>
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
                            <edit-file class="short" use-case="seo"  title="Изображение" name="image"></edit-file>
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
    import OldTextArea from '@/components/edit-form/old-items/TextArea'
    import Language from '@/components/Language'
    import LangSwitch from '@/components/LangSwitch'
    import EditFile from '@/components/edit-form/File'

    import {createNamespacedHelpers} from 'vuex'

    const {mapMutations, mapActions, mapState} = createNamespacedHelpers('editPage')

    export default {
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
            onLangChange(langId) {
                this.getFields(langId)
            },
            onSubmit() {
                this.edit({
                    language_id: this.translateTo.id,
                    title: this.newFields.title,
                    url: this.newFields.url,
                    seo_title: this.newFields.seo_title,
                    description: this.newFields.description,
                    keywords: this.newFields.keywords,
                    image: this.commonFields.image.url
                })
            }
        },
        created() {
            this.resetModule()
            this.setFileExtensions({image: ['jpg', 'jpeg', 'png', 'gif']})
            this.init({
                textContent: {
                    title: 'Категории портфолио',
                    cancelButton: 'Отмена',
                    saveButton: 'Сохранить',
                    greeting: 'Все изменения успешно сохранены',
                },
                errors: {
                    title: {message: 'Введите название категории', hasError: false},
                    url: {message: 'Введите ссылку', hasError: false, isNullable: true},
                    seo_title: {message: 'Введите название страницы', hasError: false},
                    description: {message: 'Напишите краткое описание', hasError: false},
                    keywords: {message: 'Напишите ключевые слова', hasError: false},
                    image: {message: 'Допустимые расширения: jpg, jpeg, png, gif', hasError: false}
                },
                itemId: this.$route.params.id,
                apiUrlId: 'portfolioCategories',
                commonFields: {
                    image: {name: '', url: ''},
                }
            }).then(response => {
                this.setCommonFieldFileUrl({fieldId: 'image', url: response.data.data.image})
            })
        },
        components: {
            NewTextArea,
            NewInput,
            OldInput,
            OldTextArea,
            Language,
            LangSwitch,
            EditFile
        }
    }
</script>
<style scoped>

</style>
