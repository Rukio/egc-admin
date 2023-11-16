<template>
    <transition name="slide-y-transition" mode="out-in">
        <div class="table table_large" v-if="items.length">
            <modal/>
            <table>
                <thead>
                <tr>
                    <!--<icon-arrowup/>-->
                    <th class="caption">Имя</th>
                    <th class="middle">Email</th>
                    <th class="middle">Телефон</th>
                    <th class="middle">Дата/время</th>
                    <th class="middle status">Источник</th>
                    <th class="icons"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in items" v-bind:key="item.id" :class="{new_message: !item.is_viewed}">
                    <!-- <td class="caption" @click.prevent="onReadItem(item.id, item.is_viewed)">{{item.name}}</td> -->
                    <td class="caption link">
                        <span @click.prevent="onReadItem(item.id, item.is_viewed)">{{item.name}}</span>
                    </td>
                    <td class="middle mail_col">{{item.email}}</td>
                    <td class="middle">{{item.phone}}</td>
                    <td class="middle">{{item.created_at}}</td>
                    <td class="middle translate status">
                        <button v-if="item.type === 'feedback'" class="invited">Обратный звонок</button>
                        <button v-if="item.type === 'message'" class="accepted">Сообщение</button>
                        <span class="flag">
                        <img :src="apiDomain + item.language.flag" alt="img">
                        <span class="hint">{{item.language.name}}</span>
                    </span>
                    </td>
                    <td class="icons">
                        <a @click.prevent="onReadItem(item.id, item.is_viewed)" class="view-icon">
                            <icon-eye/>
                            <div class="hint left edit">Смотреть</div>
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
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt'
    import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'
    import faLink from '@fortawesome/fontawesome-free-solid/faLink'
    import faEye from '@fortawesome/fontawesome-free-solid/faEye'
    import IconEye from '@/components/icons/IconEye.vue'
    import IconDelete from '@/components/icons/IconDelete.vue'
    import Modal from '@/components/Modal'
    import {createNamespacedHelpers} from 'vuex'

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
            faEye() {
                return faEye
            },
            apiDomain() {
                return this.$store.state.apiDomain
            },
            ...mapState([
                'currentNumber',
                'items',
                'url'
            ])
        },
        methods: {
            ...mapActions([
                'readItem',
                'deleteItem'
            ]),
            onDeleteItem(id, title) {
                console.log('click')
                this.$store.commit('setItemForDelete', {
                    id: id,
                    title: title,
                    action: 'deleteItem'
                })
                this.$store.commit('setShowModal', true)
            },
            updateFeedback(id) {
                this.$http.put(
                    this.url + '/' + id + '/field',
                    {
                        field: 'is_viewed',
                        value: true
                    }
                ).then(() => {
                    this.$store.commit('decreaseUnreadMessages')
                })
            },
            onReadItem(id, isViewed) {
                if (!isViewed) {
                    this.updateFeedback(id)
                }
                this.readItem(id)
            }
        },
        components: {
            Modal,
            FontAwesomeIcon,
            IconEye,
            IconDelete
        }
    }
</script>

<style lang="scss" scoped>
    .table {
        table {
            .status {
                width: 240px;
                white-space: nowrap;

                @media screen and (min-width: 1561px) {
                    width: 260px;
                }

                button {
                    width: 140px;
                }
            }
        }
    }

    // @media only screen and (max-width: 1560px) {
        .table {
            table {
                .caption {
                    width: 250px;
                    @media screen and (max-width: 1230px) {
                        width: inherit !important;
                        min-width: inherit;
                    }

                    @media screen and (max-width: 1120px) {
                        min-width: inherit;
                    }
                }
            }
        }
    // }

    .view-icon svg {
        vertical-align: middle;
    }
</style>