<template>

    <div class="dropdown multiple" v-show="currentTabId === fields[name].tabId"  v-on-click-outside="hideDropDown" :class="{invalid: fields[name].errorId}">
        <input :id="elementId" type="checkbox" v-model="showDropdown"/>
        <label :for="elementId"  class="th">
            <span class="capture" :class="{focus: showDropdown, visited: selectedItems.length}">{{fields[name].name}}</span>
            <div class="selected-list">
                <span class="item" v-for="itemIndex of selectedItems">
                    <img :class="{
                        'bordered-in-modal' : name == 'languages',
                        'messengers-img': name == 'messengers'
                        }"
                        :src="$store.state.apiDomain + items[itemIndex].flag" alt="">
                    <span>{{items[itemIndex].name}}</span>
                </span>
            </div>
            <span class="triangle"></span>
        </label>
        <span class="line"/>
        <ul class="dropdown-list">
            <li v-for="(item, index) of items" :key="item.id">
                <v-checkbox
                    v-model="selectedItems"
                    :id="elementId + '-item-' + item.id"
                    :value="index"></v-checkbox>
                <label :for="elementId + '-item-' + item.id">
                    <img :class="{ 'messengers-img': name == 'messengers' }" :src="$store.state.apiDomain + item.flag" alt="">
                    <span>{{item.name}}</span>
                </label>
                <!-- <input type="checkbox" :id="elementId + '-item-' + item.id" :value="index" v-model="selectedItems">
                <label :for="elementId + '-item-' + item.id">
                    <span class="marker"></span>
                    <img class="list-item"
                        :src="$store.state.apiDomain + item.flag" alt="">
                    <span>{{item.name}}</span>
                </label> -->
            </li>
        </ul>
        <div class="invalid_text">{{fields[name].errors[fields[name].errorId]}}</div>
    </div>
</template>

<script>
    import { mixin as onClickOutside } from 'vue-on-click-outside'
    import { createNamespacedHelpers } from 'vuex'

    const { mapMutations, mapState } = createNamespacedHelpers('mainPage')
    export default {
        mixins: [onClickOutside],
        props: ['name', 'url', 'elementId'],
        data() {
            return {
                showDropdown: false,
                items: [],
                selectedItems: []
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
            getItems() {
                this.$http.get(
                    this.url
                ).then(response => {
                    if(response.data) {
                        this.items = response.data
                    }
                }).catch(error => {
                    this.$store.dispatch('notification/errorAxios', error.response.status, {root: true})
                })
            }
        },
      watch: {
        selectedItems: function () {
          let selectedItemsId = []

          for(let i = 0; i < this.selectedItems.length; i++) {
            selectedItemsId.push(this.items[this.selectedItems[i]].id)
          }

          this.setField({fieldId: this.name, fieldPropertyId: 'value', value: selectedItemsId})
          this.setField({fieldId: this.name, fieldPropertyId: 'errorId', value: null})
        }
      },
        created() {
            this.getItems()
        }
    }
</script>

<style lang="scss" scoped>
    $white-3: #e4e8eb;

    
</style>
