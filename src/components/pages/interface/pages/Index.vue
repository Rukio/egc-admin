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
                <div class="modal_button alone">
                    <button @click="onAddItem"><icon-add/>{{textContent.addItemText}}</button>
                </div>
                <div class="amount_pagination">
                    <!--<quantity></quantity>-->
                    <!--<pagination v-if="countItems"></pagination>-->
                </div>
            </div>
            <p class="no-message" v-if="emptyData">{{textContent.notFoundText}}</p>
            <main-table v-else></main-table>
            <!--<pagination :is-bottom="true" v-if="!emptyData"></pagination>-->
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

    const { mapMutations, mapGetters, mapActions, mapState } = createNamespacedHelpers('mainPage')

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
            ]),
            apiUrls() {
                return this.$store.state.apiUrls
            },
        },
        methods: {
            ...mapMutations([
                'setUrl',
                'setTextContent',
                'setFilterItems',
                'resetModule',
                'setSharedParams',
                'setSortingParams',
                'setPaginationParams'
            ]),
            ...mapActions([
                'onAddItem',
                'getItems'
            ]),
        },
        created() {
            this.resetModule()
            this.setUrl(this.$store.state.apiUrls.interfaceGroups)
            this.setTextContent({
                titleMain: 'Группы',
                addItemText: 'Добавить',
                notFoundText: 'Груп не найдено',
                deleteGreeting: 'Група успешно удалена',
                titleAdd: 'Добавить',
                cancelButton: 'Отмена',
                submitButton: 'Добавить',
                addGreeting: 'Група успешно добавлена',
                deleteError: 'Невозможно удалить групу, поскольку она имеет поля',
            })
            this.setSharedParams([{name: 'language_id', value: 1}])
            this.setSortingParams([])
            this.setPaginationParams([])
            this.getItems()
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
