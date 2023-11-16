<template>
    <transition name="slide-y-transition" mode="out-in">
        <div class="table table_middle" v-if="items.length">
            <table>
                <thead class="group-caption">
                <tr>
                    <!--<icon-arrowup/>-->
                    <th class="caption">Название групы<span class="table_move"></span></th>
                    <th class="icons"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in items" v-bind:key="item.id">
                    <td class="caption link group-table">
                        <span @click.prevent="onEditItem(item.id)">{{item.title}}</span>
                    </td>
                    <td class="icons in-pages">
                        <a class="edit" @click.prevent="onEditItem(item.id)">
                            <icon-pencil/>
                            <span class="hint left edit">Редактировать</span>
                        </a>
                        <a class="delete-icon" @click.prevent="onDeleteItem(item.id)">
                            <icon-delete/>
                            <span class="hint left">Удалить</span>
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </transition>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import IconDelete from '@/components/icons/IconDelete'
    import IconArrowup from '@/components/icons/IconArrowup'
    import IconPencil from '@/components/icons/IconPencil'

    const {mapActions, mapState} = createNamespacedHelpers('mainPage')

    export default {
        computed: {
            faPencilAlt() {
                return faPencilAlt
            },
            faTrash() {
                return faTrash
            },
            faLink() {
                return faLink
            },
            apiDomain() {
                return this.$store.state.apiDomain
            },
            siteUrl() {
                return this.$store.state.siteUrl
            },
            ...mapState({
                currentNumber: state => state.currentNumber,
                items: state => state.items
            })
        },
        methods: {
            ...mapActions([
                'getItems',
                // 'onEditItem',
                'deleteItem',
                'testAndDeleteItem'
            ]),
            onEditItem(id) {
                this.$router.push(this.$router.currentRoute.path + '/interface-group/' + id)
            },
            onDeleteItem(id) {
                this.testAndDeleteItem({
                    url: '/api/interface?interface_group_id=' + id + '&language_id=' + this.$store.state.language.id,
                    id: id
                })
                // this.deleteItem(id)
            }
        },
        components: {
            IconDelete,
            IconPencil,
            IconArrowup
        }
    }
</script>

<style lang="scss" scoped>

$white: #fff;
$white-3: #e4e8eb;

    #app .caption.group-table {
        background-color: transparent;
    }

    .table .table_middle {
        @media screen and (max-width: 1100px) {
            border-radius: 5px;
            border: 1px solid $white-3;
        }
    }

    .group-caption > tr {
        @media screen and (max-width: 1100px) {
            border-top: none;
        }
    }

    #app .constructor_scroll .container-block .subtitle {
        @media screen and (max-width: 550px) {
            padding: 15px 0;
        }
    }

</style>