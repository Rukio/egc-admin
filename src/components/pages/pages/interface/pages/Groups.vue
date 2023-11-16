<template>
    <div class="content">
            <div class="subtitle">
                <div class="modal_button">
                    <button @click="onAddItem"><icon-add/>{{textContent.addItemText}}</button>
                </div>
                <div class="amount_pagination">
                    <!--<quantity></quantity>-->
                    <!--<pagination v-if="countItems"></pagination>-->
                </div>
            </div>
            <p  v-if="!countItems">{{textContent.notFoundText}}</p>
            <main-table v-else></main-table>
            <!--<pagination :is-bottom="true" v-if="!emptyData"></pagination>-->
            <create-modal v-if="isAdd"></create-modal>
    </div>
</template>

<script>
    import CreateModal from '../CreateGroup'
    import MainTable from '../GroupTable'
    import IconAdd from '@/components/icons/IconAdd'
    import { createNamespacedHelpers } from 'vuex'

    const { mapMutations, mapGetters, mapActions, mapState } = createNamespacedHelpers('mainPage')

    export default {
        computed: {
            ...mapState([
                'isAdd',
                'textContent',
                'currentNumber',
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
                titleMain: 'Групы',
                addItemText: 'Добавить',
                notFoundText: 'Груп не найдено',
                deleteGreeting: 'Група успешно удалена',
                titleAdd: 'Добавить',
                cancelButton: 'Отмена',
                submitButton: 'Добавить',
                addGreeting: 'Група успешно добавлена',
                deleteError: 'Невозможно удалить групу, поскольку она имеет поля',
            })
            this.setSharedParams([{name: 'language_id', value: 1}, {name: 'page_id', value: this.$route.params.id}])
            this.setSortingParams([])
            this.setPaginationParams([])
            this.getItems()
        },
        components: {
            CreateModal,
            MainTable,
            IconAdd
        }
    }
</script>
<style lang="scss" scoped>
    .constructor_scroll .container-block .subtitle {
        @media screen and (max-width: 550px) {
            padding: 15px 0;
        }
    }
</style>
