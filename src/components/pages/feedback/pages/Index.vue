<template>
    <div class="constructor_scroll">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <h1>{{textContent.titleMain}}</h1>
                <!--<search></search>-->
            </div>
            <div class="subtitle">
                <!-- <div class="modal_button">
                </div> -->
                <div class="amount_pagination no-button">
                    <quantity></quantity>
                    <pagination></pagination>
                </div>
            </div>
            <p class="no-message" v-if="emptyData">{{textContent.notFoundText}}</p>
            <main-table v-else></main-table>
            <pagination :is-bottom="true" v-if="!emptyData"></pagination>
        </div>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import Search from '@/components/Search'
    import Quantity from '@/components/filters/Quantity'
    import MainTable from '../MainTable'
    import IconAdd from '@/components/icons/IconAdd'
    import { createNamespacedHelpers } from 'vuex'

    const { mapMutations, mapActions, mapState, mapGetters } = createNamespacedHelpers('mainPage')

    export default {
        computed: {
            ...mapState([
                'isAdd',
                'textContent',
                'currentNumber',
                'emptyData'
            ]),
            ...mapGetters([
                'countItems'
            ])
        },
        methods: {
            ...mapMutations([
                'setUrl',
                'setTextContent',
                'resetModule',
                'setSharedParams',
                'setSortingParams',
                'setPaginationParams'
            ]),
            ...mapActions([
                'onAddItem',
                'getItems'
            ])
        },
        created() {
            this.resetModule()
            this.setUrl(this.$store.state.apiUrls.feedback)
            this.setTextContent({
                titleMain: 'Обратная связь',
                notFoundText: 'Cообщений не найдено',
                deleteGreeting: 'Сообщение удалено',
            })
            this.setSharedParams([])
            this.setSortingParams([{name: 'method', value: 'desc'}, {name: 'field', value: 'id'}])
            this.setPaginationParams([{name: 'page', value: 1}, {name: 'number', value: this.currentNumber}])
        },
        components: {
            Pagination,
            Search,
            MainTable,
            Quantity,
            IconAdd
        }
    }
</script>
<style scoped>

</style>