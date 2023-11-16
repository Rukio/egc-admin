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
                        <transition-group name="modal-fields">
                            <div v-show="!isLastTab" class="modal-tab-section" key="1">
                                <form-input name="title"></form-input>
                                <!--<form-drop-down title="title" name="category" :url="apiUrls.articleCategories + '?use_case=for category'"></form-drop-down>-->
                                <form-file name="icon" use-case="icon"></form-file>
                            </div>
                            <div v-show="isLastTab" class="modal-tab-section" key="2">
                                <form-input name="seo_title"></form-input>
                                <form-text-area name="keywords"></form-text-area>
                                <form-text-area name="description"></form-text-area>
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
                        <button class="confirm" v-else @click="addItem">{{textContent.submitButton}}</button>
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
    // import FormDropDown from '@/components/create-form/DropDown'
    const { mapMutations, mapGetters, mapActions, mapState } = createNamespacedHelpers('mainPage')

    export default {
        data() {
            return {
                showed: false
            }
        },
        computed: {
            ...mapState([
                'textContent'
            ]),
            ...mapGetters([
                'isLastTab'
            ]),
            apiUrls() {
                return this.$store.state.apiUrls
            },
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
                'setTabs',
                'setCurrentTabId',
                'setFileExtensions'
            ]),
            closeModal() {
                this.showed = false;
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
            this.setFileExtensions({seo_image: ['jpg', 'jpeg', 'png', 'gif'], icon: ['svg']})
            this.initFields({
                title: {
                    value: '',
                    parameterName: 'title',
                    name: 'Название подкатегории',
                    errorId: null,
                    errors: {empty: 'Введите название подкатегории'},
                    tabId: 0
                },
                category: {
                    value: this.$route.params.id,
                    parameterName: 'article_category_id',
                    name: 'Выбрать категорию',
                    errorId: null,
                    errors: {empty: 'Выберите категорию'},
                    tabId: 0
                },
                icon: {
                    value: '',
                    parameterName: 'icon',
                    name: 'Иконка',
                    errorId: null,
                    errors: {empty: 'Выберите иконку', extension: 'Допустимое расширение "svg"'},
                    fileName: '',
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
                seo_image: {
                    value: '',
                    parameterName: 'seo_image',
                    name: 'Изображение',
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
            FormFile,
            Tabs,
            IconArrowbold
            // FormDropDown
        }
    }
</script>

<style scoped>

</style>