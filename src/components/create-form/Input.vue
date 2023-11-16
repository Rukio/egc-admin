<template>
        <form v-show="currentTabId === fields[name].tabId">
            <div class="form-group" :class="{invalid: fields[name].errorId}">
                <input type="text"
                    :class="{ 'filled' : fields[name].value }"
                    :placeholder="fields[name].name" 
                    v-model="fields[name].value"
                    @blur="isEmpty"
                    @keydown="removeError">
                <label>{{fields[name].name}}</label>
                <span class="line"/>
                <div class="invalid_text">{{fields[name].errors[fields[name].errorId]}}</div>
            </div>
        </form>
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

<style lang="scss" scoped>

.filled {
    & ~ label {
        top: -2px !important;
        opacity: 1 !important;
        visibility: visible !important;
    }
}

</style>