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
                        <transition-group name="modal-fields" mode="out-in">
                            <div v-show="!isLastTab" class="modal-tab-section" key="1">
                                <form-input name="title"></form-input>
                                <form-drop-down title="title" name="category" :url="apiUrls.portfolioCategories"></form-drop-down>
                                <form-drop-down class="margin-top" title="name" name="author" :url="apiUrls.authors"></form-drop-down>
                                <form-text-area name="subtext"></form-text-area>
                                <form-text-editor name="left_text" editor-id="editor_left"></form-text-editor>
                                <form-text-editor name="right_text" editor-id="editor_right"></form-text-editor>
                                <form-file use-case="cover" name="image"></form-file>
                                <form-input name="alt"></form-input>
                            </div>
                            <div v-show="isLastTab" class="modal-tab-section" key="2">
                                <form-input name="seo_title"></form-input>
                                <form-text-area name="keywords"></form-text-area>
                                <form-text-area name="description"></form-text-area>
                                <form-file use-case="seo" name="seoImage"></form-file>
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
                this.setField({fieldId: 'right_text', fieldPropertyId: 'value', value: this.fields.right_text.editor.getData()})
                this.fields.right_text.editor.setData('')
                this.setField({fieldId: 'left_text', fieldPropertyId: 'value', value: this.fields.left_text.editor.getData()})
                this.fields.left_text.editor.setData('')
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
            this.checkTabAwailability()
        },
        created() {
            this.setTabs([
                { title: 'Общие настройки', isFilledIn: false, icon: 'alignleft', styleClass: 'first' },
                { title: 'SEO', isFilledIn: false, icon: 'signalbars', styleClass: 'second' }
            ])
            this.setFileExtensions({image: ['jpg', 'jpeg', 'png', 'gif'], seoImage: ['jpg', 'jpeg', 'png', 'gif']})
            this.setCurrentTabId(0)
            this.initFields({
                title: {
                    value: '',
                    parameterName: 'title',
                    name: 'Название проекта',
                    errorId: null,
                    errors: {empty: 'Введите название проекта'},
                    tabId: 0
                },
                author: {
                    value: '',
                    parameterName: 'article_author_id',
                    name: 'Выбрать автора',
                    errorId: null,
                    errors: {empty: 'Выберите автора'},
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
                category: {
                    value: '',
                    parameterName: 'portfolio_category_id',
                    name: 'Выбрать категорию',
                    errorId: null,
                    errors: {empty: 'Выберите категорию'},
                    tabId: 0
                },
                subtext: {
                    value: '',
                    parameterName: 'subtext',
                    name: 'Анонс статьи',
                    errorId: null,
                    errors: {empty: 'Напишите анонс статьи'},
                    tabId: 0
                },
                right_text: {
                    value: '',
                    editor: null,
                    parameterName: 'right_text',
                    name: 'Правая колонка статьи',
                    errorId: null,
                    errors: {empty: 'Напишите текст статьи'},
                    isNullable: true,
                    tabId: 0
                },
                left_text: {
                  value: '',
                  editor: null,
                  parameterName: 'left_text',
                  name: 'Левая колонка статьи',
                  errorId: null,
                  errors: {empty: 'Напишите текст статьи'},
                  isNullable: true,
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
                seoImage: {
                    value: '',
                    parameterName: 'seo_image',
                    name: 'Изображение для SEO',
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
