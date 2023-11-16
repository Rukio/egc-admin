<template>
        <div class="editor" v-show="currentTabId === fields[name].tabId" :class="{invalid: fields[name].errorId}">
            <p class="tittle">{{fields[name].name}}</p>
            <textarea name="" id="" cols="30" rows="10" v-model="fields[name].value"
                      @blur="isEmpty"
                      @keydown="removeError"></textarea>
            <div class="invalid_text">{{fields[name].errors[fields[name].errorId]}}</div>
        </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'

    const { mapMutations, mapState } = createNamespacedHelpers('mainPage')

    export default {
        props: ['name'],
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
            isEmpty() {
                if(!this.fields[this.name].value && !this.fields[this.name].isNullable) {
                    this.setField({fieldId: this.name, fieldPropertyId: 'errorId', value: 'empty'})
                }
            },
            removeError() {
                if(!this.fields[this.name].value) {
                    this.setField({fieldId: this.name, fieldPropertyId: 'errorId', value: null})
                }
            }
        }
    }
</script>

<style scoped>

</style>