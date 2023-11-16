<template>
    <div class="constructor_scroll">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <div class="breadcrumbs">
                    <router-link to="/">Обратная связь</router-link>
                    <span></span>
                    <h1>{{ feedback.name }}</h1>
                </div>
            </div>
             <div class="edit_main edit_feed">
             <div class="folder">
                <div class="view_message column">
                    <h2>Просмотр сообщения</h2>
                    <p class="list first">
                        <span class="caption">Имя</span>
                        <span class="text">{{feedback.name}}</span>
                    </p>
                    <p class="list" v-if="feedback.email">
                        <span class="caption">Email</span>
                        <span class="text">{{feedback.email}}</span>
                    </p>
                    <p class="list" v-if="feedback.service">
                        <span class="caption">Категория запроса</span>
                        <span class="text">{{feedback.service.title}}</span>
                    </p>
                    <p class="list" v-if="feedback.phone">
                        <span class="caption">Телефон</span>
                        <span class="text">{{feedback.phone}}</span>
                    </p>
                    <p class="list" v-if="feedback.file">
                        <span class="caption">Файл</span>
                        <span class="inline">
                           <span class="text">web_design_stiva_kruga.pdf</span>
                           <a :href="apiDomain + '/' + feedback.file" target="_blank">Открыть</a> 
                        </span>
                    </p>
                    <p class="list">
                        <span class="caption">Дата/время</span>
                        <span class="text">{{feedback.created_at}}</span>
                    </p>
                    <p class="list">
                        <span class="caption">Источник</span>
                        <span class="source">
                            <button v-if="feedback.type === 'feedback'" class="invited">Обратный звонок</button>
                            <button v-if="feedback.type === 'message'" class="accepted">Сообщение</button>
                            <span class="flag">
                                <img :src="apiDomain + feedback.language.flag" alt="img">
                                <span class="hint">{{feedback.language.name}}</span>
                            </span>
                        </span>
                    </p>
                    <p class="list message-edit">
                        <span class="caption">Сообщение</span>
                        <span class="text message">{{feedback.message}}</span>
                    </p>
            </div>
                <div class="comment column">
                    <h2>Комментарии</h2>
                    <div class="list">
                         <span class="text message" v-if="feedback.comment">{{feedback.comment}}</span>
                        <p class="no-comments" v-else="">Комментариев нет</p>
                    </div>
                   <div class="list">
                    <textarea v-model="adminComment" placeholder="Комментарий"></textarea>
                    <button @click="addComment()">Добавить комментарий</button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'

    const {mapState, mapMutations} = createNamespacedHelpers('mainPage')

    export default {
        data() {
            return {
                feedback: [],
                adminComment: '',
                displayPage: false
            }
        },
        computed: {
            ...mapState([
                'url',
                'isLoaded'
            ]),
            apiDomain() {
                return this.$store.state.apiDomain
            },
            apiUrls() {
                return this.$store.state.apiUrls
            }
        },
        methods: {
            ...mapMutations([
                'setUrl'
            ]),
            addComment() {
                this.$http.put(
                    this.url + '/' + this.feedback.id + '/field',
                    {
                        field: 'comment',
                        value: this.adminComment
                    }
                ).then(() => {
                    this.feedback.comment = this.adminComment
                    this.adminComment = ''
                })
            }
        },
        mounted() {
            this.$http.get(
                this.url + '/' + this.$route.params.id + '/edit'
            ).then(response => {
                this.displayPage = true
                this.feedback = response.data.data
                console.log(response.data.data)
            })
        },
        created() {
            this.setUrl(this.apiUrls.feedback)
        }
    }
</script>

<style lang="scss" scoped>
    $grey-6: #6e7074;

    .container {
        background: #fafcfb;
    }
    .edit_main .folder .column .message-edit {
        border-top: none;
        margin-top: 0;
        padding: 7.5px 18px;
        align-items: flex-start;

        & .caption {
            // margin-top: 11px;
        }
    }

    .edit_main .folder h2 {
        font-size: 15px;
    }

    .edit_main .folder .column.comment .list {
        align-items: flex-start;
    }

    .edit_main .folder .view_message h2,
    .edit_main .folder .comment h2 {
        margin-bottom: 10.5px;
    }

    .no-comments {
        margin-bottom: 0;
        text-align: center;
        width: 100%;
        color: $grey-6;
    }

    .comment.column {
        align-self: flex-start;
    }
</style>
