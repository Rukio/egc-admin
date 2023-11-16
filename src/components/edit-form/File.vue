<template>
    <div class="list">
        <p>{{title}}<span>({{fileExtensions[name].join(', ')}})</span></p>
        <div class="load-image"  :class="{invalid: errors[name].hasError}">
            <input :id="name" @change="processFile($event, name)" type="file" visbility="hidden">
            <template v-if="onUpload">
                <span class="file-load-label">Загрузка...</span>
                <v-progress-linear :indeterminate="true" height="5" style="margin-bottom: 0; margin-top: -5px"></v-progress-linear>
            </template>
            <img v-if="commonFields[name].url" @load="onLoaded()" v-show="isLoaded" :src="apiDomain + '/' + commonFields[name].url" alt="img">
            <!--<div class="info" v-if="isSelected">-->
                <!--<span class="text">{{fields[name].fileName}}</span>-->
                <!--<span class="close"></span>-->
            <!--</div>-->
        </div>
        <div class="invalid_text" v-if="errors[name].hasError">{{errors[name].message}}</div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    import IconUpload from '../icons/IconUpload'

    const { mapMutations, mapState } = createNamespacedHelpers('editPage')

    export default {
        props: ['name', 'title', 'useCase'],
        data() {
            return {
                isSelected: false,
                isLoaded: false,
                onUpload: false,
                oldName: ''
            }
        },
        computed: {
            ...mapState([
                'commonFields',
                'isError',
                'errors',
                'fileExtensions'
            ]),
            apiDomain() {
                return this.$store.state.apiDomain
            }
        },
        methods: {
            ...mapMutations([
                'setCommonFieldFileUrl',
                'setCommonFieldFileName',
                'checkFile'
            ]),
            onLoaded() {
                this.isLoaded = true
            },
            uploadFile(file) {
                this.onUpload = true
                this.isLoaded = false
                let data = new FormData();
                data.append('file', file);
                this.$http.post('/api/uploadfile?use_case=' + this.useCase, data).then((response) => {
                    this.onUpload = false
                    this.setCommonFieldFileUrl({fieldId: this.name, url: response.data.url})
                }).catch(error => {
                    this.onUpload = false
                    this.isLoaded = true
                    this.setCommonFieldFileName({fieldId: this.name, name: this.oldName})
                    this.$store.dispatch('notification/errorAxios', error.response.status, {root: true})
                })
            },
            processFile(event) {
                let file = event.target.files[0]
                this.checkFile({name: this.name, fileName: file.name})
                if(!this.isError) {
                    this.setCommonFieldFileName({fieldId: this.name, name: file.name})
                    this.oldName = file.name
                    this.uploadFile(event.target.files[0])
                }
            }
        },
        components: {
            IconUpload
        }
    }
</script>

<style scoped>

</style>