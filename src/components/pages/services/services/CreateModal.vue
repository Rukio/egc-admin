<template>
<transition name="modalbg">
    <div @click.self="closeModal" class="modal_container">
        <transition name="modal" v-on:before-leave="modalClose">
        <div v-if="showed" class="modal">
            <div class="modal-content">
                <div class="caption">
                    <div class="title-modal">{{textContent.titleAdd}}</div>
                    <div @click="closeModal" class="close"></div>
                </div>
                <tabs @setTab="setTab"></tabs>
                <div class="modal-scroll" :class="{ 'in-last-tab' : isLastTab }">
                    <form @input="checkTabAwailability()"
                        @mousedown="checkTabAwailability()" v-on:submit.prevent="addItem">
                        <transition-group name="modal-fields" mode="out-in">
                            <div v-show="!isLastTab" class="modal-tab-section" key="1">
                                <form-input name="title"></form-input>
                                <form-text-area name="subtext"></form-text-area>
                                <form-text-editor name="text" editor-id="editor"></form-text-editor>
                            </div>
                            <div v-show="isLastTab" class="modal-tab-section" key="2">
                                <form-input name="seo_title"></form-input>
                                <form-input name="alt"></form-input>
                                <form-text-area name="keywords"></form-text-area>
                                <form-text-area name="description"></form-text-area>
                                <!-- <form-file name="image" use-case="cover"></form-file> -->
                                <form-file name="image" use-case="icon"></form-file>
                                <form-file name="seo_image" use-case="seo"></form-file>
                            </div>
                        </transition-group>
                    </form>
                </div>
                <div class="buttons">
                    <button class="back" v-if="isLastTab" @click="onPrev"><span><icon-arrowbold class="icon-arrowbold left"/></span>Назад</button>
                    <div class="next">
                        <button @click="closeModal" class="cancel">{{textContent.cancelButton}}</button>
                        <button class="confirm" v-if="!isLastTab" @click="onNext">Перейти далее <icon-arrowbold class="icon-arrowbold right"/></button>
                        <button class="confirm" v-else @click="onAddItem">{{textContent.submitButton}}</button>
                    </div>
                </div>
            </div>
        </div>
        </transition>
    </div>
</transition>
</template>

<script>
    import FormInput from '@/components/create-form/Input'
    import IconArrowbold from '@/components/icons/IconArrowbold'
    import { createNamespacedHelpers } from 'vuex'
    import FormTextArea from '@/components/create-form/TextArea'
    import FormFile from '@/components/create-form/File'
    import Tabs from '@/components/create-form/Tabs'
    import FormTextEditor from '@/components/create-form/TextEditor'

    const { mapMutations, mapGetters, mapActions, mapState } = createNamespacedHelpers('mainPage')

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
            ])
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
            closeModal() {
                this.showed = false;
            },
            onAddItem() {
                this.setField({fieldId: 'text', fieldPropertyId: 'value', value: this.fields.text.editor.getData()})
                this.fields.text.editor.setData('')
                this.addItem()
            },
            setTab() {
                if (this.isLastTab)
                    this.$store.dispatch('mainPage/onPrev')
                else
                    this.$store.dispatch('mainPage/onNext')
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
            this.setCurrentTabId(0)
            this.setFileExtensions({image: ['svg'], seo_image: ['jpg', 'jpeg', 'png', 'gif']})
            this.initFields({
                title: {
                    value: '',
                    parameterName: 'title',
                    name: 'Название услуги',
                    errorId: null,
                    errors: {empty: 'Введите название услуги'},
                    tabId: 0
                },
                subtext: {
                    value: '',
                    parameterName: 'subtext',
                    name: 'Анонс',
                    errorId: null,
                    errors: {empty: 'Напишите текст предпросмотра'},
                    tabId: 0
                },
                text: {
                    value: '',
                    editor: null,
                    parameterName: 'text',
                    name: 'Текст статьи',
                    errorId: null,
                    errors: {empty: 'Напишите текст статьи'},
                    isNullable: true,
                    tabId: 0
                },
                seo_title: {
                    value: '',
                    parameterName: 'seo_title',
                    name: 'Название страницы',
                    errorId: null,
                    errors: {empty: 'Напишите название страницы'},
                    tabId: 1
                },
                alt: {
                    value: '',
                    parameterName: 'alt',
                    name: 'Альтернативный текст для изображения',
                    errorId: null,
                    errors: {empty: 'Напишите альтернативный текст'},
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
                    name: 'Иконка',
                    errorId: null,
                    errors: {empty: 'Выберите иконку', extension: 'Допустимое расширение: svg'},
                    fileName: '',
                    tabId: 1
                },
                seo_image: {
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
            FormInput,
            FormTextArea,
            FormTextEditor,
            FormFile,
            Tabs,
            IconArrowbold
        }
    }
</script>

<style scoped>

</style>