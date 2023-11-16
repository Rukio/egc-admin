<template>
    <div class="container_error" v-show="currentTabId === fields[name].tabId" :class="{error: fields[name].errorId}">
        <div class="editor">
               <p class="tittle">{{fields[name].name}}</p>
               <textarea
                style="visibility: hidden" name="content"
                cols="30" rows="10" :id="editorId"
                v-model="text"></textarea>
        </div>
        <div class="fail_text">{{fields[name].errors[fields[name].errorId]}}</div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'

    const { mapMutations, mapState } = createNamespacedHelpers('mainPage')

    export default {
        props: ['name', 'editorId'],
        data() {
            return {
                text: ''
            }
        },
        computed: {
            ...mapState([
                'fields',
                'currentTabId'
            ])
        },
        methods: {
            ...mapMutations([
                'setField'
            ]),
            createCkeditor() {
                ClassicEditor
                    .create(document.getElementById(this.editorId), {
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
                        this.setField({fieldId: this.name, fieldPropertyId: 'editor', value: editor})
                    })
                    .catch(() => {
                        this.$store.dispatch(
                            'notification/triggerSelfDismissingNotification',
                            {message: 'Возникла ошибка при загрузке текстового редактора', isError: true},
                            {root: true}
                        )
                    })
            }
        },
        mounted() {
            this.createCkeditor()
        }
    }
</script>

<style scoped>

</style>
