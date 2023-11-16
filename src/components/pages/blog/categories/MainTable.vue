<template>
    <transition name="slide-y-transition" mode="out-in">
        <div class="table table_middle" v-if="items.length">
            <modal></modal>
            <table>
                <thead>
                <tr>
                    <!--<icon-arrowup/>-->
                    <th class="caption">Название категории<span class="table_move"></span></th>
                    <th class="middle translate little">Перевод</th>
                    <th class="middle little">Видимость</th>
                    <!--<th class="middle little">Порядок записей</th>-->
                    <th class="middle little"></th>
                    <th class="icons"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in items" v-bind:key="item.id">
                    <td class="caption link">
                        <span @click.prevent="onEditItem(item.id)">{{item.title}}</span>
                    </td>
                    <td class="middle translate little">
                        <div class="flag" v-for="lang in item.languages">
                            <img :src="apiDomain + lang.flag" alt="">
                            <span class="hint">{{ lang.name }}</span>
                        </div>
                    </td>
                    <td class="middle little">
                        <v-switch
                                v-model="item.is_active" :color="'#089cd3'"
                                @click.capture.stop="toggleItem({id: item.id, isActive: !item.is_active})"
                        ></v-switch>
                    </td>
                    <td class="middle little">
                        <router-link :to="'/blog/category/' + item.id + '/subcategory'">Подкатегории</router-link>
                    </td>
                    <td class="icons">
                        <a class="edit" @click.prevent="onEditItem(item.id)">
                            <icon-pencil/>
                            <div class="hint left edit">Редактировать</div>
                        </a>
                        <a class="delete-icon" @click.prevent="onDeleteItem(item.id, item.title)">
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
            ...mapState([
                'currentNumber',
                'items',
                'textContent',
                'url'
            ])
        },
        methods: {
            ...mapActions([
                'toggleItem',
                'onEditItem',
                'testAndDeleteItem',
                'deleteItem'
            ]),
            onDeleteItem(id, title) {
                this.$store.commit('setItemForDelete', {
                    id: id,
                    title: title,
                    action: 'request',
                    url: this.url,
                    api: this.apiDomain
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