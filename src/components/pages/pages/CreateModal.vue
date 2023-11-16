<template>
<transition name="modalbg">
    <div @click.self="closeModal" class="modal_container">
        <transition name="modal" v-on:before-leave="modalClose">
        <div v-if="showed" class="modal">
            <div class="caption">
                <div class="title-modal">{{textContent.titleAdd}}</div>
                <div @click="closeModal" class="close"></div>
            </div>
            <tabs @setTab="setTab"></tabs>
            <div class="modal-scroll" :class="{ 'in-last-tab' : isLastTab }">
                <div class="modal-content">
                    <form @input="checkTabAwailability()"
                        @mousedown="checkTabAwailability()" v-on:submit.prevent="addItem">
                        <transition-group name="modal-fields">
                            <div v-show="!isLastTab" class="modal-tab-section" key="1">
                                <form-input name="title"></form-input>
                                <form-input name="url"></form-input>
                            </div>
                            <div v-show="isLastTab" class="modal-tab-section" key="2">
                                <form-input name="seo_title"></form-input>
                                <form-text-area name="keywords"></form-text-area>
                                <form-text-area name="description"></form-text-area>
                                <form-file use-case="seo" name="image"></form-file>
                            </div>
                        </transition-group>
                    </form>
                </div>
            </div>
            <div class="buttons">
                <button class="back" v-if="isLastTab" @click="onPrev"><span><icon-arrowbold class="icon-arrowbold left"/></span>Назад
                </button>
                <div class="next">
                    <button @click="closeModal" class="cancel">{{textContent.cancelButton}}</button>
                    <button class="confirm" v-if="!isLastTab" @click="onNext">Перейти далее <icon-arrowbold class="icon-arrowbold right"/></button>
                    <button class="confirm" v-else @click="onAddItem">{{textContent.submitButton}}
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
    import IconArrowbold from '@/components/icons/IconArrowbold'
    import FormInput from '@/components/create-form/Input'
    import FormTextArea from '@/components/create-form/TextArea'
    import FormFile from '@/components/create-form/File'
    import FormDropDown from '@/components/create-form/DropDown'
    import FormTextEditor from '@/components/create-form/TextEditor'
    import {createNamespacedHelpers} from 'vuex'
    import Tabs from '@/components/create-form/Tabs'

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
                'onPrev',
                'checkTabAwailability'
            ]),
            ...mapMutations([
                'setField',
                'resetTextEditor',
                'setTabs',
                'setCurrentTabId',
                'setFileExtensions'
            ]),
            onAddItem() {
                // this.setField({fieldId: 'text', fieldPropertyId: 'value', value: this.fields.text.editor.getData()})
                // this.fields.text.editor.setData('')
                this.addItem()
            },
            setTab() {
                if (this.isLastTab)
                    this.$store.dispatch('mainPage/onPrev')
                else
                    this.$store.dispatch('mainPage/onNext')
            },
            closeModal() {
                this.showed = false;
            }
        },
        mounted() {
            this.showed = true;
            this.checkTabAwailability();
        },
        created() {
            this.setTabs([
                { title: 'Общие настройки', isFilledIn: false, icon: 'alignleft', styleClass: 'first' },
                { title: 'SEO', isFilledIn: false, icon: 'signalbars', styleClass: 'second' }
            ])

            this.setFileExtensions({image: ['jpg', 'jpeg', 'png', 'gif'], icon: ['svg']})

            this.setCurrentTabId(0)

            this.initFields({
                title: {
                    value: '',
                    parameterName: 'title',
                    name: 'Название страницы',
                    errorId: null,
                    errors: {empty: 'Введите название страницы'},
                    tabId: 0
                },
                url: {
                    value: '',
                    parameterName: 'url',
                    name: 'Ссылка',
                    errorId: null,
                    errors: {empty: 'Введите ссылку'},
                    tabId: 0
                },
                seo_title: {
                    value: '',
                    parameterName: 'seo_title',
                    name: 'Название страницы',
                    errorId: null,
                    errors: {empty: 'Введите название страницы'},
                    tabId: 1
                },
                keywords: {
                    value: '',
                    parameterName: 'keywords',
                    name: 'Ключевые слова',
                    errorId: null,
                    errors: {empty: 'Напишите ключевые слова'},
                    tabId: 1
                },
                description: {
                    value: '',
                    parameterName: 'description',
                    name: 'Краткое описание',
                    errorId: null,
                    errors: {empty: 'Напишите краткое описание'},
                    tabId: 1
                },
                image: {
                    value: '',
                    parameterName: 'image',
                    name: 'Изображение',
                    errorId: null,
                    errors: {empty: 'Выберите изображение', extension: 'Допустимые расширения: jpg, jpeg, png, gif'},
                    fileName: '',
                    tabId: 1
                },
            })
        },
        components: {
            IconAlignleft,
            IconSignalbars,
            FormInput,
            FormTextArea,
            FormFile,
            FormDropDown,
            FormTextEditor,
            Tabs,
            IconArrowbold
        }
    }
</script>

<style scoped>

</style>