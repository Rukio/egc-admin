<template>
    <div v-show="isLoaded" class="constructor_scroll">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <div class="breadcrumbs">
                    <router-link to="/contact">{{textContent.title}}</router-link>
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
                        <p>Редактирование контакта</p>
                    </div>
                    <div class="column caption">
                        <p>Редактирование контакта</p>
                    </div>
                </div>
                <div class="folder">
                    <div class="column round-bottom">
                        <div class="content">
                            <old-input title="Имя" name="name"></old-input>
                            <new-input class="hidden-on-lg" title="Имя" name="name"></new-input>
                            <old-input title="Должность" name="position"></old-input>
                            <new-input class="hidden-on-lg" title="Должность" name="position"></new-input>
                            <old-input title="Альтернативный текст для изображения" name="alt" class="last"></old-input>
                            <new-input class="hidden-on-lg"  title="Альтернативный текст для изображения" name="alt"></new-input>
                        </div>
                    </div>
                    <div class="column round-bottom hidden-on-sm">
                        <div class="content">
                            <new-input title="Имя" name="name"></new-input>
                            <new-input title="Должность" name="position"></new-input>
                            <new-input title="Альтернативный текст для изображения" name="alt"></new-input>
                        </div>
                    </div>
                </div>
              <div class="folder radius">
                <div class="column caption">
                  <p>Прочие настройки</p>
                </div>
                <div class="column">
                  <div class="content">
                    <common-input title="Почта" name="email"></common-input>
                    <common-input title="Телефон" name="phone"></common-input>
                    <common-input title="Skype" name="skype"></common-input>
                    <div class="dropdowns">
                        <div class="dropd">
                            <div class="dd-label">
                                <p>Языки</p>
                            </div>
                            <div class="dd">
                                <edit-multiple-drop-down v-if="isLoadedCommonFields" title="Языки" :items="allLanguages" name="languages" element-id="languages"></edit-multiple-drop-down>
                            </div>
                        </div>
                        <div class="dropd">
                            <div class="dd-label">
                                <p>Мессенджеры</p>
                            </div>
                            <div class="dd">
                                <edit-multiple-drop-down v-if="isLoadedCommonFields" title="Мессенджеры" :items="allMessengers" name="messengers" element-id="messengers"></edit-multiple-drop-down>
                            </div>
                        </div>
                        <edit-file class="short" use-case="cover" v-if="isLoaded" title="Изображение" name="image"></edit-file>
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
    import Language from '@/components/Language'
    import LangSwitch from '@/components/LangSwitch'
    import EditFile from '@/components/edit-form/File'
    import EditMultipleDropDown from '@/components/edit-form/MultipleDropDown'
    import CommonInput from '@/components/edit-form/CommonInput'

    import {createNamespacedHelpers} from 'vuex'

    const {mapMutations, mapActions, mapState} = createNamespacedHelpers('editPage')

    export default {
      data() {
        return {
          allLanguages: {},
          allMessengers: {},
          isLoadedCommonFields: false
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
            getIds(items, keyName) {
              let ids = []
              for(let i = 0; i < items.length; i++) {
                ids.push(items[i][keyName])
              }
              return ids
            },
            onLangChange(langId) {
              this.getFields(langId)
            },
            onReset() {
                this.reset()
            },
            onSubmit() {
              this.edit({
                language_id: this.translateTo.id,
                image: this.commonFields.image.url,
                name: this.newFields.name,
                position: this.newFields.position,
                alt: this.newFields.alt,
                messengers: this.commonFields.messengers,
                languagesId: this.commonFields.languages,
                skype: this.commonFields.skype,
                phone: this.commonFields.phone,
                email: this.commonFields.email,
              })
            }
        },
        created() {
            this.resetModule()
            this.setFileExtensions({image: ['jpg', 'jpeg', 'png', 'gif']})
            this.setFilterParams({})
            this.init({
                textContent: {
                    title: 'Контакты',
                    cancelButton: 'Отмена',
                    saveButton: 'Сохранить',
                    greeting: 'Все изменения успешно сохранены'
                },
                errors: {
                    name: {message: 'Введите имя', hasError: false},
                    position: {message: 'Введите должность', hasError: false},
                    alt: {message: 'Альтернативный текст', hasError: false},
                    email: {message: 'Введите почту', hasError: false},
                    phone: {message: 'Введите телефон', hasError: false},
                    skype: {message: 'Введите skype', hasError: false},
                    image: {message: 'Выберите изображение', hasError: false},
                    languages: {message: 'Выберите язык', hasError: false},
                    messengers: {message: 'Выберите мессенджеры', hasError: false},
                },

                itemId: this.$route.params.id,
                apiUrlId: 'contacts',
                commonFields: {
                  image: {name: '', url: ''},
                  email: {},
                  phone: {},
                  skype: {},
                  languages: {},
                  messengers: {}
                }
            }).then(response => {
              this.setCommonField({fieldId: 'email', value: response.data.data.email})
              this.setCommonField({fieldId: 'phone', value: response.data.data.phone})
              this.setCommonField({fieldId: 'skype', value: response.data.data.skype})
              this.setCommonFieldFileUrl({fieldId: 'image', url: response.data.data.image})
              this.setCommonField({fieldId: 'languages', value: this.getIds(response.data.selected_languages, 'language_id')})
              this.setCommonField({fieldId: 'messengers', value: this.getIds(response.data.selected_messengers, 'messenger_id')})

              this.allMessengers = response.data.messengers
              this.allLanguages = response.data.languages
              this.isLoadedCommonFields = true



            })
        },
        components: {
            NewInput,
            OldInput,
            Language,
            LangSwitch,
            EditFile,
          CommonInput,
          EditMultipleDropDown
        }
    }
</script>
<style lang="scss" scoped>
    
</style>
