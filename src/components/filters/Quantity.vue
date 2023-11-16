<template>
    <div class="amount dropdown" v-on-click-outside="hideDropDown" v-if="items.length">
        <input id="dr-2" type="checkbox" v-model="showDropDown"/>
        <label for="dr-2">
            <span>{{ currentNumber }}</span>
            <span class="triangle"></span>
        </label>
        <ul>
            <li v-for="(item, index) in dropDown" v-if="item !== currentNumber" @click="dropDownClick(index)"
                v-bind:key="index">{{ item }}</li>
        </ul>
    </div>
</template>

<script>
    import { mixin as onClickOutside } from 'vue-on-click-outside'
    import { createNamespacedHelpers } from 'vuex'

    const { mapMutations, mapActions, mapState } = createNamespacedHelpers('mainPage')

    export default {
        name: "Quantity",
        mixins: [onClickOutside],
        data() {
            return {
                showDropDown: false,
                dropDown: [ 5, 10, 20, 50]
            }
        },
        computed: {
            ...mapState({
                currentNumber: state => state.currentNumber,
                items: state => state.items
            })
        },
        methods: {
            ...mapActions([
                'getItems'
            ]),
            ...mapMutations([
                'setCurrentNumber',
                'setPaginationParams'
            ]),
            hideDropDown() {
                this.showDropDown = false
            },
            dropDownClick(index) {
                this.hideDropDown()
                this.setCurrentNumber(this.dropDown[index])
                this.saveToLocalStorage(this.dropDown[index])
                this.setPaginationParams([{name: 'page', value: 1}, {name: 'number', value: this.currentNumber}])
                this.getItems()
            },
            saveToLocalStorage(index) {
                let currentPage = this.$route.path;
                localStorage[currentPage] = index;
            }
        },
        mounted() {
            let currentPage = this.$route.path;
            if (localStorage[currentPage]) {
                let number = parseInt(localStorage[currentPage]);
                this.setCurrentNumber(number)
                this.setPaginationParams([{name: 'page', value: 1}, {name: 'number', value: this.currentNumber}])
            }
            this.getItems()
        }
    }
</script>

<style scoped>

</style>