<template>
    <div class="constructor_scroll" v-show="isLoaded">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <div class="breadcrumbs">
                    <router-link to="/client">{{textContent.title}}</router-link>
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
                        <p>{{textContent.subtitle}}</p>
                    </div>
                    <div class="column caption">
                        <p>{{textContent.subtitle}}</p>
                    </div>
                </div>
                <div class="folder">
                    <div class="column round-bottom">
                        <div class="content">
                            <old-input title="Название компании" name="name"></old-input>
                            <new-input class="hidden-on-lg" title="Название компании" name="name"></new-input>
                            <old-input title="Альтернативный текст для изображения" name="alt" class="last"></old-input>
                            <new-input class="hidden-on-lg" title="Альтернативный текст для изображения" name="alt"></new-input>
                        </div>
                    </div>
                    <div class="column round-bottom hidden-on-sm">
                        <div class="content">
                            <new-input title="Название компании" name="name"></new-input>
                            <new-input title="Альтернативный текст для изображения" name="alt"></new-input>
                        </div>
                    </div>
                </div>
                <div class="folder radius">
                    <div class="column caption round-top">
                        <p>{{textContent.options}}</p>
                    </div>
                    <div class="column round-bottom">
                        <div class="content">
                            <edit-file class="short" title="Изображение" use-case="cover" name="icon"></edit-file>
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
                    name: this.newFields.name,
                    icon: this.commonFields.icon.url,
                    alt: this.newFields.alt
                })
            }
        },
        created() {
            this.resetModule()
            this.setFileExtensions({icon: ['jpg', 'jpeg', 'png', 'gif']})
            this.init({
                textContent: {
                    title: 'Клиенты',
                    cancelButton: 'Отмена',
                    saveButton: 'Сохранить',
                    greeting: 'Все изменения успешно сохранены',
                    subtitle: 'Редактирование клиента',
                    seo: 'SEO информация',
                    options: 'Прочие настройки',
                },
                errors: {
                    name: {message: 'Введите название компании', hasError: false},
                    alt: {message: 'Введите альтернативный текст', hasError: false},
                    icon: {message: 'Допустимые расширения: jpg, jpeg, png, gif', hasError: false}
                },
                itemId: this.$route.params.id,
                apiUrlId: 'clients',
                commonFields: {
                    icon: {name: '', url: ''},
                }
            }).then(response => {
                this.setCommonFieldFileUrl({fieldId: 'icon', url: response.data.data.icon})
            })
        },
        components: {
            NewInput,
            OldInput,
            Language,
            LangSwitch,
            EditFile
        }
    }
</script>
<style lang="scss" scoped>

.edit_main .folder .column .content .short {
    align-items: flex-start;
}

</style>
