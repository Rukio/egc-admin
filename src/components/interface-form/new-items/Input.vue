<template>
    <div class="list">
        <p>{{title}}</p>
        <input :class="{error: errors[name].hasError}" type="text" v-model="newFields[name].value" @blur="isEmpty()" @keydown="onKeyDown">
        <div class="invalid_text" v-if="errors[name].hasError">{{errors[name].message}}</div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'

    const { mapMutations, mapState } = createNamespacedHelpers('interfacePage')

    export default {
        props: ['title', 'name'],
        computed: {
            ...mapState([
                'newFields',
                'errors'
            ])
        },
        methods: {
            ...mapMutations([
                'setError',
                'addChangedFieldId'
            ]),
            onKeyDown() {
                this.removeError()
                this.addChangedFieldId(this.newFields[this.name].id)
            },
            isEmpty() {
                if(! this.newFields[this.name].value && !this.errors[this.name].isNullable) {
                    this.setError({fieldId: this.name, flag: true})
                }
            },
            removeError() {
                if(! this.newFields[this.name].value) this.setError({fieldId: this.name, flag: false})
            }
        }
    }
</script>

<style scoped>

</style>