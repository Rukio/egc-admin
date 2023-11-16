<template>
    <div class="list">
        <p>{{title}}</p>
        <input :class="{error: errors[name].hasError}" type="text" v-model="newFields[name]" @blur="isEmpty()" @keydown="removeError">
        <div class="invalid_text" v-if="errors[name].hasError">{{errors[name].message}}</div>
    </div>
    <!--<div class="container_error" :class="{error: errors[name].hasError}">-->
        <!--<div class="list">{{title}}</div>-->
        <!--<input type="text" v-model="newFields[name]" @blur="isEmpty()"-->
               <!--@keydown="removeError">-->
        <!--<div class="fail_text" v-if="errors[name].hasError">{{errors[name].message}}</div>-->
    <!--</div>-->
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'

    const { mapMutations, mapState } = createNamespacedHelpers('editPage')
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
                'setError'
            ]),
            isEmpty() {
                if(! this.newFields[this.name] && !this.errors[this.name].isNullable) {
                    this.setError({fieldId: this.name, flag: true})
                }
            },
            removeError() {
                if(! this.newFields[this.name]) this.setError({fieldId: this.name, flag: false})
            }
        }
    }
</script>

<style scoped>

</style>