<template>
    <div class="constructor_scroll">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <div class="breadcrumbs">
                    <router-link to="/blog/category">{{textContent.titleBack}}</router-link>
                    <span></span>
                    <h1>{{textContent.titleMain}}</h1>
                </div>
                <!--<search></search>-->
            </div>
            <div class="subtitle">
                <div class="modal_button">
                    <button @click="onAddItem"><icon-add/>{{textContent.addItemText}}</button>
                </div>
                <div class="amount_pagination">
                    <quantity></quantity>
                    <pagination></pagination>
                </div>
            </div>
            <p class="no-message" v-if="emptyData">{{textContent.notFoundText}}</p>
            <main-table v-else></main-table>
            <pagination :is-bottom="true" v-if="!emptyData"></pagination>
            <create-modal v-if="isAdd"></create-modal>
        </div>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import Search from '@/components/Search'
    import Quantity from '@/components/filters/Quantity'
    import CreateModal from '../CreateModal'
    import MainTable from '../MainTable'
    import IconAdd from '@/components/icons/IconAdd'
    import { createNamespacedHelpers } from 'vuex'
    import TableFilter from '@/components/filters/Name'

    const { mapMutations, mapActions, mapState, mapGetters } = createNamespacedHelpers('mainPage')

    export default {
        computed: {
            ...mapState([
                'isAdd',
                'textContent',
                'currentNumber',
                'emptyData',
            ]),
            ...mapGetters([
                'countItems'
            ]),
            apiUrls() {
                return this.$store.state.apiUrls
            },
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
            this.setUrl(this.$store.state.apiUrls.articleCategories)
            this.setTextContent({
                titleMain: 'Подкатегории блога',
                titleBack: 'Категории блога',
                addItemText: 'Категории',
                notFoundText: 'Подкатегорий не найдено',
                addGreeting: 'Подкатегория успешно создана',
                deleteGreeting: 'Подкатегория успешно удалена',
                titleAdd: 'Категории',
                cancelButton: 'Отмена',
                submitButton: 'Категории',
                deleteError: 'Невозможно удалить категорию, поскольку она имеет статьи',
            })
            this.setSharedParams([{name: 'article_category_id', value: this.$route.params.id}])
            this.setSortingParams([{name: 'method', value: 'desc'}, {name: 'field', value: 'id'}])
            this.setPaginationParams([{name: 'page', value: 1}, {name: 'number', value: this.currentNumber}])
        },
        components: {
            Pagination,
            Search,
            CreateModal,
            MainTable,
            Quantity,
            IconAdd,
            TableFilter
        }
    }
</script>
<style scoped>

</style>