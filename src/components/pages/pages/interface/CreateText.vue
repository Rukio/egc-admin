<template>
<transition name="modalbg">
    <div @click.self="closeModal" class="modal_container">
        <transition name="modal" v-on:before-leave="modalClose">
        <div v-if="showed" class="modal">
            <div class="caption">
                <div class="title-modal">{{textContent.titleAdd}}</div>
                <div @click="closeModal" class="close"></div>
            </div>
            <div class="modal-scroll">
                <div class="modal-content">
                    <form v-on:submit.prevent="onAddItem">
                        <form>
                            <div class="form-group" :class="{invalid: fields.title.errorId}">
                                <input type="text" :placeholder="fields.title.name"  v-model="fields.title.value" @blur="isEmpty('title')"
                                       @keydown="removeError('title')">
                                <label :class="{ 'filled' : fields.title.value }">{{fields.title.name}}</label>
                                <div class="invalid_text">{{fields.title.errors[fields.title.errorId]}}</div>
                                <span class="line"></span>
                            </div>
                        </form>
                        <div>
                            <div class="editor">
                                <p class="tittle">{{fields.value.name}}</p>
                                <textarea name="content"
                                        cols="30" rows="10" id="editor"
                                        v-model="text"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="buttons">
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
    import {createNamespacedHelpers} from 'vuex'
    const {mapMutations, mapActions, mapState} = createNamespacedHelpers('interfaceText')

    export default {
        data() {
            return {
                fields: [],
                isError: false,
                text: '',
                showed: false
            }
        },
        computed: {
            ...mapState([
                'textContent',
                'url'
            ]),
            apiUrls() {
                return this.$store.state.apiUrls
            }
        },
        methods: {
            ...mapMutations([
                'setIsAdd'
            ]),
            ...mapActions([
                'getFields',
                'addItem'
            ]),
            createCkeditor() {
                ClassicEditor
                    .create(document.getElementById('editor'), {
                        heading: {
                            options: [
                                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
                            ]
                        },
                        ckfinder: {
                            uploadUrl: this.$store.state.apiDomain + this.$store.state.ckfinderUrl,
                            token: localStorage.token
                        }
                    })
                    .then(editor => {
                        this.fields.value.editor = editor
                    })
                    .catch(() => {
                        this.$store.dispatch(
                            'notification/triggerSelfDismissingNotification',
                            {message: 'Возникла ошибка при загрузке текстового редактора', isError: true},
                            {root: true}
                        )
                    })
            },
            removeError(name) {
                if(!this.fields[name].value) {
                    this.fields[name].errorId = null
                }
            },
            isEmpty(name) {
                if(!this.fields[name].value && !this.fields[name].isNullable) {
                    this.fields[name].errorId = 'empty'
                }
            },
            modalClose() {
                this.setIsAdd(false)
            },
            closeModal() {
                this.showed = false
            },
            checkFieldFilling() {
                let isError = false
                for (let key in this.fields) {
                    if (this.fields.hasOwnProperty(key)) {
                        if (this.fields[key].value) {
                            this.fields[key].errorId = null
                        } else {
                            if (!this.fields[key].isNullable) {
                                this.fields[key].errorId = 'empty'
                                isError = true
                            }
                        }
                    }
                }
                this.isError = isError
            },
            onAddItem() {
                this.checkFieldFilling()
                if (!this.isError) {
                    this.addItem({
                        value: this.fields.value.editor.getData(),
                        title: this.fields.title.value,
                        interface_group_id: this.$route.params.groupId,
                        language_id: this.$store.state.language.id
                    })
                    this.fields.value.editor.setData('')
                }
            }
        },
        mounted() {
            this.createCkeditor()
            this.showed = true
        },
        created() {
            this.fields = {
                title: {
                    value: '',
                    parameterName: 'title',
                    name: 'Название текстового поля',
                    errorId: null,
                    errors: {empty: 'Введите название поля'},
                    tabId: 0
                },
                value: {
                    value: '',
                    editor: null,
                    parameterName: 'value',
                    name: 'Текст',
                    errorId: null,
                    errors: {empty: 'Напишите текст'},
                    isNullable: true,
                    tabId: 0
                },
            }
        },
        components: {
            IconAlignleft,
            IconSignalbars,
        }
    }
</script>

<style scoped>

</style>
