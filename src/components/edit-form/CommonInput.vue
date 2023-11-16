<template>
  <div class="list">
    <p>{{title}}</p>
    <input :class="{error: errors[name].hasError}" type="text" v-model="commonFields[name]">
    <div class="invalid_text" v-if="errors[name].hasError">{{errors[name].message}}</div>
  </div>
</template>

<script>
  import { mixin as onClickOutside } from 'vue-on-click-outside'
  import { createNamespacedHelpers } from 'vuex'

  const { mapMutations, mapState } = createNamespacedHelpers('editPage')

  export default {
    mixins: [onClickOutside],
    props: [ 'title', 'url', 'name'],
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
        'commonFields',
        'errors',
      ])
    },
    methods: {
      ...mapMutations([
        'setCommonField'
      ]),
      // removeError() {
      //   if(!this.commonFields[this.name].value) {
      //     this.setCommonField({fieldId: this.name, value: item})
      //     this.setField({fieldId: this.name, fieldPropertyId: 'hasError', value: false})
      //   }
      // },


      // onItem(item) {
      //   this.hideDropDown()
      //   this.setCommonField({fieldId: this.name, value: item})
      //   this.selectedItem = item
      // }
    },
    created() {
      // console.log(this.commonFields)
    }
  }
</script>

<style scoped>

</style>
