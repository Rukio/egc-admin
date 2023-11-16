<template>
        <div class="search">
            <input @keyup="findItems($event.keyCode)" class="input" type="text" v-model="search" placeholder="Поиск">
            <a class="button"><icon-search/></a>
        </div>
</template>

<script>
    import IconSearch from './icons/IconSearch.vue'
    import { createNamespacedHelpers } from 'vuex'
    const { mapMutations, mapState, mapActions } = createNamespacedHelpers('mainPage')

    export default {
        name: "Search",
        data() {
            return {
                timeoutID: null,
                search: ''
            }
        },
        computed: {
            ...mapState([
                'url',
                'currentNumber'
            ]),
            faSearch() {
                return faSearch
            }
        },
        methods: {
            ...mapMutations([
                'setItems',
                'setMeta',
                'setLinks'
            ]),
            ...mapActions([
                'onSearch'
            ]),
            findItems() {
                    if(this.timeoutID) {
                        clearTimeout(this.timeoutID);
                    }
                    this.timeoutID = setTimeout(() => {
                        this.onSearch(this.search)
                    }, 500)
            },
        },
        components: {
            IconSearch
        }
    }
</script>

<style scoped>

</style>