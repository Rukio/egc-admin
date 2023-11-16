<template>
    <div class="add_img" v-show="currentTabId === fields[name].tabId" :class="{invalid: fields[name].errorId}">
        <p class="tittle">{{fields[name].name}} ({{fileExtensions[name].join(', ')}})</p>
        <div class="load-image">
            <input :id="name" @change="processFile($event, name)" type="file" visbility="hidden"
                   :class="{error: fields[name].errorId}">
            <template v-if="!isSelected">
                <icon-upload/>
                <span>Выбрать файл</span>
            </template>

            <template v-if="onUpload">
                <span class="file-load-label">Загрузка...</span>
                <v-progress-linear :indeterminate="true" height="5" style="margin-bottom: 0; margin-top: -5px"></v-progress-linear>
            </template>

            <img v-if="isLoaded" :src="apiDomain + '/' + fields[name].value" alt="img">

            <div class="info-file" v-if="isLoaded">
                <span class="text">{{fields[name].fileName}}</span>
                <!--<span class="close"></span>-->
            </div>
         </div>
        <div class="invalid_text">{{fields[name].errors[fields[name].errorId]}}</div>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import IconUpload from '../icons/IconUpload'

    const {mapMutations, mapState} = createNamespacedHelpers('mainPage')

    export default {
        props: ['name', 'types', 'useCase'],
        data() {
            return {
                selectFile: 'Выбрать файл',
                isLoaded: false,
                isSelected: false,
                onUpload: false
            }
        },
        computed: {
            ...mapState([
                'fields',
                'currentTabId',
                'isError',
                'fileExtensions'
            ]),
            apiDomain() {
                return this.$store.state.apiDomain
            }
        },
        methods: {
            ...mapMutations([
                'setField',
                'checkFile'
            ]),
            onLoaded() {
                this.isLoaded = true
            },
            uploadFile(file) {
                this.isLoaded = false
                this.onUpload = true
                this.isSelected = true
                let data = new FormData();
                data.append('file', file);
                this.$http.post('/api/uploadfile?use_case=' + this.useCase, data).then((response) => {
                    this.onUpload = false
                    this.isLoaded = true
                    this.setField({fieldId: this.name, fieldPropertyId: 'value', value: response.data.url})
                    this.setField({fieldId: this.name, fieldPropertyId: 'errorId', value: null})
                    document.getElementById(this.name).value = "";
                }).catch(error => {
                    document.getElementById(this.name).value = "";
                    this.onUpload = false
                    this.isLoaded = true
                    this.setField({fieldId: this.name, fieldPropertyId: 'fileName', value: ''})
                    this.$store.dispatch('notification/errorAxios', error.response.status, {root: true})
                })
            },
            processFile(event) {
                let file = event.target.files[0]
                this.checkFile({name: this.name, fileName: file.name})
                if(!this.isError) {
                    this.setField({fieldId: this.name, fieldPropertyId: 'fileName', value: file.name})
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