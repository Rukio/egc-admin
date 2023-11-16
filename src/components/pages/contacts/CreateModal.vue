<template>
<transition name="modalbg">
    <div @click.self="closeModal" class="modal_container">
        <transition name="modal" v-on:before-leave="modalClose">
        <div v-if="showed" class="modal">
            <div ref="modalCaption" class="caption">
                <div class="title-modal">{{textContent.titleAdd}}</div>
                <div @click="closeModal" class="close"></div>
            </div>
            <div ref="modalScroll" class="modal-scroll">
                <div class="modal-content">
                    <form v-on:submit.prevent="addItem">
                        <form-input name="name"></form-input>
                        <form-input name="position"></form-input>
                        <form-input name="email"></form-input>
                        <form-input name="phone"></form-input>
                        <form-input name="skype"></form-input>
                        <form-multiple-drop-down name="languages" :url="apiUrls.languages" :element-id="'multiple-drop-down-1'"></form-multiple-drop-down>
                        <form-multiple-drop-down name="messengers" :url="apiUrls.messengers" :element-id="'multiple-drop-down-2'"></form-multiple-drop-down>
                        <form-file use-case="cover" name="image"></form-file>
                        <form-input name="alt"></form-input>
                    </form>
                    
                </div>
            </div>
            <div ref="modalButtons" class="buttons">
                <div class="next">
                    <button @click="closeModal" class="cancel">{{textContent.cancelButton}}</button>
                    <button class="confirm" @click="onAddItem">{{textContent.submitButton}}
                    </button>
                </div>
            </div>
        </div>
        </transition>
    </div>
</transition>
</template>

<script>
    import IconAlignleft from '@/components/icons/IconAlignleft'
    import IconSignalbars from '@/components/icons/IconSignalbars'
    import FormInput from '@/components/create-form/Input'
    import FormMultipleDropDown from '@/components/create-form/MultipleDropDown'
    import FormFile from '@/components/create-form/File'
    import {createNamespacedHelpers} from 'vuex'

    const {mapMutations, mapActions, mapState, mapGetters} = createNamespacedHelpers('mainPage')

    export default {
        data() {
            return {
                showed: false
            }
        },
        computed: {
            ...mapState([
                'textContent',
                'fields'
            ]),
            ...mapGetters([
                'getDataFromEditor',
                'isLastTab'
            ]),
            apiUrls() {
                return this.$store.state.apiUrls
            }
        },
        methods: {
            ...mapActions([
                'modalClose',
                'addItem',
                'initFields',
                'onNext',
                'onPrev'
            ]),
            ...mapMutations([
                'setField',
                'setTabs',
                'setCurrentTabId',
                'setFileExtensions'
            ]),
            onAddItem() {
                // this.setField({fieldId: 'text', fieldPropertyId: 'value', value: this.fields.text.editor.getData()})
                // this.fields.text.editor.setData('')
                this.addItem()
            },
            closeModal() {
                this.showed = false;
            },
        },
        mounted() {
            this.showed = true
        },
        created() {
            this.setTabs([
                { title: 'Общие настройки', isFilledIn: false, icon: 'alignleft', styleClass: 'first' },
                { title: 'SEO', isFilledIn: false, icon: 'signalbars', styleClass: 'second' }
            ])
          this.setFileExtensions({image: ['jpg', 'jpeg', 'png', 'gif']})

          this.setCurrentTabId(0)
            this.initFields({
                name: {
                    value: '',
                    parameterName: 'name',
                    name: 'Имя',
                    errorId: null,
                    errors: {empty: 'Введите имя'},
                    tabId: 0
                },
              position: {
                value: '',
                parameterName: 'position',
                name: 'Должность',
                errorId: null,
                errors: {empty: 'Введите должность'},
                tabId: 0
              },
              alt: {
                value: '',
                parameterName: 'alt',
                name: 'Альтернативный текст',
                errorId: null,
                errors: {empty: 'Введите альтернативный текст'},
                tabId: 0
              },
              email: {
                value: '',
                parameterName: 'email',
                name: 'Почта',
                errorId: null,
                errors: {empty: 'Введите почту', email: 'Введите почту в правильном формате'},
                validation: 'email',
                tabId: 0
              },
              phone: {
                value: '',
                parameterName: 'phone',
                name: 'Телефон',
                errorId: null,
                errors: {empty: 'Введите телефон', phone: 'Телефон должен содержать от 9 до 15 цифр'},
                validation: 'phone',
                tabId: 0
              },
              skype: {
                value: '',
                parameterName: 'skype',
                name: 'Skype',
                errorId: null,
                errors: {empty: 'Введите skype'},
                tabId: 0
              },
              image: {
                value: '',
                parameterName: 'image',
                name: 'Изображение',
                errorId: null,
                errors: {empty: 'Выберите изображение', extension: 'Допустимые расширения: jpg, jpeg, png, gif'},
                fileName: '',
                tabId: 0
              },
              languages: {
                value: '',
                parameterName: 'languagesId',
                name: 'Языки',
                errorId: null,
                errors: {empty: 'Выберите язык'},
                tabId: 0
              },
              messengers: {
                value: '',
                parameterName: 'messengers',
                name: 'Мессенджеры',
                errorId: null,
                errors: {empty: 'Выберите мессенджеры'},
                tabId: 0
              }

            })
        },
        components: {
            IconAlignleft,
            IconSignalbars,
            FormInput,
          FormFile,
          FormMultipleDropDown

        }
    }
</script>

<style scoped>

</style>
