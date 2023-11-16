<template>
    <div>
        <div class="editor" @click="addChangedFieldId(newFields[name].id)">
            <p class="tittle">{{title}}</p>
            <textarea
                    style="visibility: hidden" name="content"
                    cols="30" rows="10" :id="'editor' + newFields[name].id"
                    v-model="text"></textarea>
        </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'

    const { mapMutations, mapState } = createNamespacedHelpers('interfaceText')

    export default {
        props: ['name', 'title'],
        data() {
            return {
                text: ''
            }
        },
        computed: {
            ...mapState([
                'newFields',
                'errors'
            ])
        },
        methods: {
            ...mapMutations([
                'setError',
                'addChangedFieldId',
                'setEditor'
            ]),
            createCkeditor() {
                ClassicEditor
                    .create(document.getElementById('editor' + this.newFields[this.name].id), {
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
                        this.setEditor({name: this.name, editor: editor})
                        this.newFields[this.name].editor.setData(this.newFields[this.name].value)
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
        },
        // components: {
        //     ClassicEditor
        // }
    }
</script>

<style scoped>

</style>
