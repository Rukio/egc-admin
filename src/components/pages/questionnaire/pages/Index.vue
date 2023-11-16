<template>
    <div class="constructor_scroll">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <h1>{{textContent.titleMain}}</h1>
                <div class="drop_search">
                    <!--<search></search>-->
                </div>
            </div>
            <div class="subtitle">
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
    import { createNamespacedHelpers } from 'vuex'
    import IconAdd from '@/components/icons/IconAdd'

    const { mapMutations, mapGetters, mapActions, mapState } = createNamespacedHelpers('mainPage')

    export default {
        computed: {
            ...mapState([
                'textContent',
                'currentNumber',
                'filterItems',
                'isAdd',
                'emptyData'
            ]),
            ...mapGetters([
                'countItems'
            ]),
            apiUrls() {
                return this.$store.state.apiUrls
            }
        },
        methods: {
            ...mapMutations([
                'setUrl',
                'setTextContent',
                'setFilterItems',
                'resetModule',
                'setSharedParams',
                'setSortingParams',
                'setPaginationParams',
                'setFilterParams'
            ]),
            ...mapActions([
                'onAddItem',
                'getItems'
            ]),
            getFirstPage() {
                this.setPaginationParams([{name: 'page', value: 1}, {name: 'number', value: this.currentNumber}])
                this.getItems()
            },
        },
        created() {
            this.resetModule()
            this.setUrl(this.apiUrls.questionnaire)
            this.setTextContent({
                titleMain: 'Анкеты',
                addItemText: 'Добавить анкету',
                notFoundText: 'Анкет не найдено',
                addGreeting: 'Анкета успешно создана',
                deleteGreeting: 'Анкета успешно удалена',
                titleAdd: 'Добавить анкету',
                cancelButton: 'Отмена',
                submitButton: 'Добавить анкету'
            })
            this.setFilterItems({})
            this.setFilterParams({})
            this.setSharedParams([{}])
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
