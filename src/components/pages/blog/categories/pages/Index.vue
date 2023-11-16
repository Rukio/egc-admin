<template>
    <div class="constructor_scroll">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <h1>{{textContent.titleMain}}</h1>
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

    const { mapMutations, mapActions, mapState, mapGetters } = createNamespacedHelpers('mainPage')

    export default {
        computed: {
            ...mapState([
                'isAdd',
                'currentNumber',
                'textContent',
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
                'getItems',
                'onAddItem'
            ]),
        },
        created() {
            this.resetModule()
            this.setUrl(this.$store.state.apiUrls.articleCategories)
            this.setTextContent({
                titleMain: 'Категории блога',
                addItemText: 'Добавить',
                notFoundText: 'Категорий не найдено',
                addGreeting: 'Категория успешно добавлена',
                deleteGreeting: 'Категория успешно удалена',
                titleAdd: 'Добавить',
                cancelButton: 'Отмена',
                deleteError: 'Невозможно удалить категорию, поскольку она имеет подкатегории или статьи',
                submitButton: 'Добавить',
            })
            this.setSharedParams([{name: 'use_case', value: 'main categories'}])
            this.setSortingParams([{name: 'method', value: 'desc'}, {name: 'field', value: 'id'}])
            this.setPaginationParams([{name: 'page', value: 1}, {name: 'number', value: this.currentNumber}])
        },
        components: {
            Pagination,
            Search,
            CreateModal,
            MainTable,
            Quantity,
            IconAdd
        }
    }
</script>
<style scoped>

</style>