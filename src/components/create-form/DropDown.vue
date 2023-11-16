<template>
    <!--{{fields[name].name}}-->
    <!-- <transition name="modal-fields" mode="out-in"> -->
        <div class="dropdown" v-show="currentTabId === fields[name].tabId"  v-on-click-outside="hideDropDown" :class="{invalid: fields[name].errorId}">
            <input :id="'dd-create-' + name" type="checkbox" v-model="showDropdown"/>
            <label :for="'dd-create-' + name"  class="th">
                <label class="dd-label"
                    :class="{ 'blured' : selectedItem[title] || showDropdown }">{{ fields[name].name }}</label>
                <span class="selected-item">{{selectedItem[title]}}</span>
                <span class="triangle"></span>
            </label>
            <span class="line"></span>
            <ul>
                <li  v-for="item in items" v-if="item.id !== selectedItem.id"
                    @click="onItem(item)">{{item[title]}}</li>
                <!--class="label"-->
            </ul>
            <div class="invalid_text">{{fields[name].errors[fields[name].errorId]}}</div>
        </div>
    <!-- </transition> -->
</template>

<script>
    import { mixin as onClickOutside } from 'vue-on-click-outside'
    import { createNamespacedHelpers } from 'vuex'

    const { mapMutations, mapState } = createNamespacedHelpers('mainPage')
    export default {
        mixins: [onClickOutside],
        props: ['name', 'url', 'title'],
        data() {
            return {
                showDropdown: false,
                items: [],
                selectedItem: []
            }
        },
        computed: {
            ...mapState([
                'fields',
                'currentTabId',
                'filterParams'
            ])
        },
        methods: {
            ...mapMutations([
                'setField'
            ]),
            hideDropDown() {
                this.showDropdown = false
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
                    }
                }).catch(error => {
                    this.$store.dispatch('notification/errorAxios', error.response.status, {root: true})
                })
            },
            onItem(item) {
                this.hideDropDown()
                this.setField({fieldId: this.name, fieldPropertyId: 'value', value: item.id})
                this.setField({fieldId: this.name, fieldPropertyId: 'errorId', value: null})
                this.selectedItem = item
            }
        },
        created() {
            this.getItems()
            this.selectedItem['id'] = null
            // this.selectedItem[this.title] = this.fields[this.name].name
            this.selectedItem[this.title] = ''
        }
    }
</script>

<style lang="scss" scoped>

$grey-3: #999a9d;
$grey-6: #6e7074;

.dd-label {
    color: $grey-3;
    font: 400 12px/20px 'Roboto', sans-serif;
    letter-spacing: .04em;
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 17px;
    line-height: 4px;
    transition: .3s;
    letter-spacing: .04em;
}

input:not(:checked) ~ label .selected-item {
    color: $grey-6;
}

.selected-item {
    margin-bottom: -2px;
}

.blured {
    top: -2px !important;
    font-size: 12px !important;
}

</style>
