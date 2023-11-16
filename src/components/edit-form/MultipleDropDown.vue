<template>

  <div class="dropdown multiple"  v-on-click-outside="hideDropDown">
    <input :id="elementId" type="checkbox" v-model="showDropdown"/>
    <label :for="elementId"  class="th">
      <span class="capture" :class="{focus: showDropdown, visited: selectedItems.length}">{{title}}</span>
      <div class="selected-list">
                <span class="item" v-for="itemIndex of selectedItems">
                    <img :class="{
                        'bordered' : elementId == 'languages',
                        'messengers-img': elementId == 'messengers'
                      }" :src="$store.state.apiDomain + items[itemIndex].flag" alt="">
                    <span>{{items[itemIndex].name}}</span>
                </span>
      </div>
      <span class="triangle"></span>
    </label>
    <ul class="dropdown-list">
      <li v-for="(item, index) of items" :key="item.id">
        <v-checkbox
          v-model="selectedItems"
          :id="elementId + '-item-' + item.id"
          :value="index"></v-checkbox>
        <label :for="elementId + '-item-' + item.id">
          <img :class="{ 'messengers-img': elementId == 'messengers' }" :src="$store.state.apiDomain + item.flag" alt="">
          <span>{{item.name}}</span>
        </label>
      </li>
    </ul>
    <!--<div class="invalid_text">{{fields[name].errors[fields[name].errorId]}}</div>-->
  </div>
</template>

<script>
  import { mixin as onClickOutside } from 'vue-on-click-outside'
  import { createNamespacedHelpers } from 'vuex'

  const { mapMutations, mapState } = createNamespacedHelpers('editPage')
  export default {
    mixins: [onClickOutside],
    props: ['name', 'items', 'elementId', 'title'],
    data() {
      return {
        showDropdown: false,
        selectedItems: [],
        oldSelectedItems: []
      }
    },
    computed: {
      ...mapState([
        'commonFields',
      ])
    },
    methods: {
      ...mapMutations([
        'setCommonField'
      ]),
      hideDropDown() {
        this.showDropdown = false
      },

    },
    watch: {
      selectedItems: function () {
        let addedItemsId = []
        let removedItemsIndex = JSON.parse(JSON.stringify(this.oldSelectedItems))

        for (let i = 0; i < this.selectedItems.length; i++) {

          let itemIndex = this.selectedItems[i]
          if(this.oldSelectedItems.indexOf(itemIndex) === -1) {
            addedItemsId.push(this.items[itemIndex].id)
          } else {
            removedItemsIndex.splice(removedItemsIndex.indexOf(itemIndex), 1);
          }
        }

        let removedItemsId = []

        for (let i = 0; i < removedItemsIndex.length; i++) {
            removedItemsId.push(this.items[removedItemsIndex[i]].id)
        }

        this.setCommonField({fieldId: this.name, value: { added: addedItemsId, removed: removedItemsId }})

        // this.setField({fieldId: this.name, fieldPropertyId: 'errorId', value: null})
      }
    },
    created() {
      let selectedImemsIndex = []
      for(let i = 0; i < this.items.length; i++) {
        if(this.commonFields[this.name].indexOf(this.items[i].id) !== -1) {
          selectedImemsIndex.push(i)
        }
      }
      this.oldSelectedItems = JSON.parse(JSON.stringify(selectedImemsIndex))
      this.selectedItems = selectedImemsIndex
    }
  }
</script>

<style lang="scss" scoped>

$white-3: #e4e8eb;

/deep/ .v-input--checkbox .v-input--selection-controls__input {
  margin-right: 0;
  margin-left: 15px; 
}

</style>
