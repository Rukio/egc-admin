<template>
    <div class="constructor_scroll" v-show="isLoaded">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <div class="breadcrumbs">
                    <router-link to="/blog/author">{{textContent.title}}</router-link>
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
                            <old-input title="Имя автора" name="name" class="last"></old-input>
                            <new-input class="hidden-on-lg" title="Имя автора" name="name"></new-input>
                        </div>
                    </div>
                    <div class="column round-bottom hidden-on-sm">
                        <div class="content">
                            <new-input title="Имя автора" name="name"></new-input>
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
                'resetModule'
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
                    name: this.newFields.name
                })
            }
        },
        created() {
            this.resetModule()
            this.init({
                textContent: {
                    title: 'Авторы',
                    subtitle: 'Редактирование автора',
                    seo: 'SEO информация',
                    options: 'Прочие настройки',
                    cancelButton: 'Отмена',
                    saveButton: 'Сохранить',
                    greeting: 'Все изменения успешно сохранены',
                },
                errors: {
                    name: {message: 'Введите имя автора', hasError: false}
                },
                itemId: this.$route.params.id,
                apiUrlId: 'authors',
                commonFields: {}
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
<style lang="scss" scoped>
    .constructor_scroll .container-block {
        background-color: transparent;
    }
</style>
