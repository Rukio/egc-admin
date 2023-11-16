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
                            </div>
                            <div v-show="isLastTab" class="modal-tab-section" key="2">
                                <form-input name="seoTitle"></form-input>
                                <form-text-area name="keywords"></form-text-area>
                                <form-text-area name="description"></form-text-area>
                                <form-file name="image" use-case="seo"></form-file>
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
            this.setFileExtensions({image: ['jpg', 'jpeg', 'png', 'gif']})
            this.initFields({
                title: {
                    value: '',
                    parameterName: 'title',
                    name: 'Название категории',
                    errorId: null,
                    errors: {empty: 'Введите название категории'},
                    tabId: 0
                },
                seoTitle: {
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
            FormInput,
            FormTextArea,
            FormFile,
            Tabs,
            IconArrowbold
        }
    }
</script>

<style scoped>

</style>