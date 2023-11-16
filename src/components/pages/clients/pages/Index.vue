<template>
    <div class="constructor_scroll">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <h1>{{textContent.titleMain}}</h1>
                <div class="drop_search">
                    <search></search>
                </div>
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
            <!--<delete-modal></delete-modal>-->
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
    // import DeleteModal from '@/components/Modal'
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
            ]),
            getFirstPage() {
                this.getItems({
                    params: [
                        {name: 'page', value: 1},
                        {name: 'number', value: this.currentNumber},
                        {name: 'method', value: 'desc'},
                        {name: 'field', value: 'id'}
                    ]
                })
            }
        },
        created() {
            this.resetModule()
            this.setUrl(this.$store.state.apiUrls.clients)
            this.setTextContent({
                titleMain: 'Клиенты',
                addItemText: 'Добавить',
                notFoundText: 'Клиентов не найдено',
                deleteGreeting: 'Клиент успешно удален',
                titleAdd: 'Добавить',
                cancelButton: 'Отмена',
                submitButton: 'Добавить',
                addGreeting: 'Клиент успешно добавлен'
            })
            this.setSharedParams([])
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
            // DeleteModal
        }
    }
</script>
<style scoped>

</style>
