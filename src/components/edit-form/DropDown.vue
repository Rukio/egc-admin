<template>
    <div class="list">
        <p>{{title}}</p>
        <div class="dropdown" v-on-click-outside="hideDropDown">
            <input :id="'dd-edit-' + name" type="checkbox" v-model="showList">
            <label :for="'dd-edit-' + name">
                <span :class="{ 'dd-darken' : typeCheck }">{{selectedItem[fieldName] || commonFields[name][fieldName]}}</span>
                <span class="triangle"></span>
            </label>
            <ul>
                <li v-for="item in items" v-if="item.id !== selectedItem.id"
                     @click="onItem(item)">{{item[fieldName]}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mixin as onClickOutside } from 'vue-on-click-outside'
    import { createNamespacedHelpers } from 'vuex'

    const { mapMutations, mapState } = createNamespacedHelpers('editPage')

    export default {
        mixins: [onClickOutside],
        props: ['fieldName', 'title', 'url', 'name'],
        data() {
            return {
                showList: false,
                items: [],
                selectedItem: ''
            }
        },
        computed: {
            ...mapState([
                'filterParams',
                'commonField',
                'commonFields'
            ])
        },
        methods: {
            ...mapMutations([
                'setCommonField'
            ]),
            typeCheck() {
                if (this.fieldName == 'name'
                    || this.fieldName == 'title') 
                return true
            },
            hideDropDown() {
                this.showList = false
            },
            paramsToString(params) {
                let result = '?'
                for (let i = 0; i < params.length; i++) {
                    if (params[i].value) {
                        result += params[i].name + '=' + params[i].value + '&'
                    }
                }
                return result.substring(0, result.length - 1)
            },
            getItems() {
                this.$http.get(
                    this.url + this.paramsToString(this.filterParams[this.name])
                ).then(response => {
                    if(response.data.data) {
                        this.items = response.data.data
                        for(let i = 0; i < this.items.length; i++) {
                            if(this.items[i].id === this.commonFields[this.name].id) {
                                this.setCommonField({fieldId: this.name, value: this.items[i]})
                                this.selectedItem = this.items[i]
                            }
                        }
                    }
                }).catch(error => {
                    this.$store.dispatch('notification/errorAxios', error.response.status, {root: true})
                })
            },
            onItem(item) {
                this.hideDropDown()
                this.setCommonField({fieldId: this.name, value: item})
                this.selectedItem = item
            }
        },
        mounted() {
            this.getItems()
        }
    }
</script>

<style scoped>
    
</style>
