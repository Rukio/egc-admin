<template>
    <div class="list">
        <p>{{title}}</p>
        <textarea :class="{error: errors[name].hasError}" v-model="newFields[name]" @blur="isEmpty()" @keydown="removeError" cols="30" rows="10"></textarea>
        <div class="invalid_text" v-if="errors[name].hasError">{{errors[name].message}}</div>
    </div>
    <!--<div class="container_error" :class="{error: errors[name].hasError}">-->
        <!--<div class="list">{{title}}</div>-->
        <!--<textarea v-model="newFields[name]" @blur="isEmpty()"-->
                  <!--@keydown="removeError" cols="30" rows="10"></textarea>-->
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

<style lang="scss" scoped>
    .list {
        align-items: flex-start !important;
    }
</style>