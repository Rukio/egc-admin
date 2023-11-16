<template>
    <transition name="slide-y-transition" mode="out-in">
        <div class="table table_middle" v-if="items.length">
            <modal></modal>
            <table>
                <thead>
                <tr>
                    <!--<icon-arrowup/>-->
                    <th class="caption">Имя<span class="table_move"></span></th>
                    <th class="caption">Телефон<span class="table_move"></span></th>
                    <th class="caption">Email<span class="table_move"></span></th>
                    <th class="caption">Отправлено<span class="table_move"></span></th>
                    <th class="middle translate little">Перевод</th>
                    <!--<th class="middle little">Видимость</th>-->
                    <!--<th class="middle little">Порядок записей</th>-->
                    <th class="icons"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in items" v-bind:key="item.id">
                    <td class="caption link">
                        <span @click.prevent="onEditItem(item.id)">{{item.name}}</span>
                    </td>
                    <td class="caption">
                        {{item.phone}}
                    </td>
                    <td class="caption">
                        {{item.email}}
                    </td>
                    <td class="caption">
                        {{item.created_at}}
                    </td>
                    <td class="middle translate little">
                        <div class="flag">
                            <img :src="apiDomain + item.language.flag" alt="img">
                            <span class="hint">{{item.language.name}}</span>
                        </div>
                    </td>
                    <!--<td class="middle little">-->
                    <!--<label class="switch">-->
                    <!--<input type="checkbox" v-model="item.is_active" :color="'#089cd3'"-->
                    <!--@click="toggleItem({id: item.id, isActive: item.is_active})">-->
                    <!--<span class="slider"></span>-->
                    <!--</label>-->
                    <!--</td>-->
                    <td class="icons">
                        <a class="edit" @click.prevent="onEditItem(item.id)">
                            <icon-pencil/>
                            <div class="hint left edit">Редактировать</div>
                        </a>
                        <a class="delete-icon" @click.prevent="onDeleteItem(item.id, item.name)">
                            <icon-delete/>
                            <div class="hint left">Удалить</div>
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
    import Modal from '@/components/Modal'

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
                'toggleItem',
                'onEditItem',
                'deleteItem'
            ]),
            onDeleteItem(id, title) {
                this.$store.commit('setItemForDelete', {
                    id: id,
                    title: title,
                    action: 'deleteItem'
                })
                this.$store.commit('setShowModal', true)
            }
        },
        components: {
            IconDelete,
            IconPencil,
            IconArrowup,
            Modal
        }
    }
</script>

<style scoped>

</style>