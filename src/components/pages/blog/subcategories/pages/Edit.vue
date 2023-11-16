<template>
    <div class="constructor_scroll" v-show="isLoaded">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <div class="breadcrumbs">
                    <router-link to="/blog/category">{{textContent.titleBackToCategory}}</router-link>
                    <span></span>
                    <router-link :to="'/blog/category/' + $route.params.categoryId + '/subcategory'">{{textContent.titleBackToSubcategory}}</router-link>
                    <span></span>
                    <h1>{{oldFields.title}}</h1>
                </div>
            </div>
            <div class="edit_main">
                <div class="folder radius_top">
                    <language :flag="translateFrom.flag" :name="translateFrom.name"></language>
                    <lang-switch :languages="languages" :selected="translateTo"></lang-switch>
                </div>
                <div class="folder">
                    <div class="column caption">
                        <p>{{textContent.subtitle}}</p>
                    </div>
                    <div class="column caption">
                        <p>{{textContent.subtitle}}</p>
                    </div>
                </div>
                <div class="folder">
                    <div class="column">
                        <div class="content">
                            <old-input title="Название подкатегории" name="title"></old-input>
                            <old-input title="Ссылка" name="url"></old-input>
                        </div>
                    </div>
                    <div class="column">
                        <div class="content">
                            <new-input title="Название подкатегории" name="title"></new-input>
                            <new-input title="Ссылка" name="url"></new-input>
                        </div>
                    </div>
                </div>
                <div class="folder">
                    <div class="column caption">
                        <p>{{textContent.seo}}</p>
                    </div>
                    <div class="column caption">
                        <p>{{textContent.seo}}</p>
                    </div>
                </div>
                <div class="folder radius_bottom">
                    <div class="column">
                        <div class="content">
                            <old-input title="Название страницы" name="seo_title"></old-input>
                            <old-text-area title="Ключевые слова" name="keywords"></old-text-area>
                            <old-text-area title="Краткое описание" name="description"></old-text-area>
                        </div>
                    </div>
                    <div class="column">
                        <div class="content">
                            <new-input title="Название страницы" name="seo_title"></new-input>
                            <new-text-area title="Ключевые слова" name="keywords"></new-text-area>
                            <new-text-area title="Краткое описание" name="description"></new-text-area>
                        </div>
                    </div>
                </div>
                <div class="folder radius">
                    <div class="column caption">
                        <p>{{textContent.options}}</p>
                    </div>
                    <div class="column">
                        <div class="content">
                            <edit-file title="Изображение" use-case="seo"  name="seo_image"></edit-file>
                            <edit-file title="Иконка" use-case="icon" name="icon"></edit-file>
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
                    description: this.newFields.description,
                    url: this.newFields.url,
                    seo_title: this.newFields.seo_title,
                    keywords: this.newFields.keywords,
                    seo_image: this.commonFields.seo_image.url,
                    icon: this.commonFields.icon.url
                })
            }
        },
        created() {
            this.resetModule()
            this.setFileExtensions({seo_image: ['jpg', 'jpeg', 'png', 'gif'], icon: ['svg']})
            this.init({
                textContent: {
                    title: 'Подкатегории блога',
                    titleBackToCategory: 'Категории блога',
                    titleBackToSubcategory: 'Подкатегории блога',
                    cancelButton: 'Отмена',
                    saveButton: 'Сохранить',
                    greeting: 'Все изменения успешно сохранены',
                    subtitle: 'Редактирование подкатегории блога',
                    seo: 'SEO информация',
                    options: 'Прочие настройки',
                },
                errors: {
                    title: {message: 'Введите название категории', hasError: false},
                    description: {message: 'Напишите краткое описание', hasError: false},
                    url: {message: 'Введите ссылку', hasError: false, isNullable: true},
                    seo_title: {message: 'Введите название страницы', hasError: false},
                    keywords: {message: 'Напишите ключевые слова', hasError: false},
                    icon: {message: 'Допустимое расширение "svg"', hasError: false},
                    seo_image: {message: 'Допустимые расширения: jpg, jpeg, png, gif', hasError: false}
                },
                itemId: this.$route.params.subcategoryId,
                apiUrlId: 'articleCategories',
                commonFields: {
                    seo_image: {name: '', url: ''},
                    icon: {name: '', url: ''},
                }
            }).then(response => {
                this.setCommonFieldFileUrl({fieldId: 'seo_image', url: response.data.data.seo_image})
                this.setCommonFieldFileUrl({fieldId: 'icon', url: response.data.data.icon})
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
