<template>
    <div class="constructor_scroll">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <div class="breadcrumbs">
                    <router-link to="/questionnaire">Анкеты</router-link>
                    <span></span>
                    <h1>{{questionnaire.name}}</h1>
                </div>
            </div>
            <div class="edit_main edit_feed">
                <div class="folder">
                    <div class="view_message column">
                        <h2 class="round-top">Просмотр анкеты</h2>
                        <div class="list align-top">
                            <span class="caption">Фото</span>
                            <div class="load-image">
                                <img v-if="displayPage" :src="apiDomain + '/' + questionnaire.photo" alt="">
                            </div>
                        </div>
                        <p class="list">
                            <span class="caption">Имя</span>
                            <input type="text" class="text" :value="questionnaire.name"/>
                        </p>
                        <p class="list">
                            <span class="caption">Дата рождения</span>
                            <input type="text" class="text" :value="questionnaire.date_of_birth"/>
                        </p>
                        <p class="list">
                            <span class="caption">Семейное положение</span>
                            <input type="text" class="text" :value="questionnaire.family_status"/>
                        </p>
                        <p class="list">
                            <span class="caption">Дети</span>
                            <input type="text" class="text" :value="questionnaire.children"/>
                        </p>
                        <p class="list">
                            <span class="caption">Откуда родом</span>
                            <input type="text" class="text" :value="questionnaire.where_come_from"/>
                        </p>
                        <p class="list">
                            <span class="caption">Место проживания</span>
                            <input type="text" class="text" :value="questionnaire.place_of_residence"/>
                        </p>
                        <p class="list">
                            <span class="caption">Телефон</span>
                            <input type="text" class="text" :value="questionnaire.phone"/>
                        </p>
                        <p class="list">
                            <span class="caption">Email</span>
                            <input type="text" class="text" :value="questionnaire.email"/>
                        </p>
                        <p class="list align-top">
                            <span class="caption">Ссылки на соцсети</span>
                            <span class="text textarea-old">{{questionnaire.social_networks}}</span>
                        </p>
                        <p class="list">
                            <span class="caption">Отец</span>
                            <input type="text" class="text" :value="questionnaire.father"/>
                        </p>
                        <p class="list">
                            <span class="caption">Мать</span>
                            <input type="text" class="text" :value="questionnaire.mother"/>
                        </p>
                        <p class="list align-top">
                            <span class="caption">Братья, сестры</span>
                            <span class="text textarea-old">{{questionnaire.brothers_and_sisters}}</span>
                        </p>
                        <p class="list align-top">
                            <span class="caption">Образование</span>
                            <span class="text textarea-old">{{questionnaire.education}}</span>
                        </p>
                        <p class="list align-top">
                            <span class="caption">Опыт работы</span>
                            <span class="text textarea-old">{{questionnaire.experience}}</span>
                        </p>
                        <p class="list align-top">
                            <span class="caption">Знание технологий</span>
                            <span class="text textarea-old">{{questionnaire.technologies}}</span>
                        </p>
                        <p class="list align-top">
                            <span class="caption">Какие технологии желаете освоить?</span>
                            <span class="text textarea-old">{{questionnaire.technologies_want_to_learn}}</span>
                        </p>
                        <p class="list">
                            <span class="caption">Планы карьерного роста</span>
                            <input type="text" class="text" :value="questionnaire.career_plans"/>
                        </p>
                        <p class="list">
                            <span class="caption">Знания иностранных языков</span>
                            <input type="text" class="text" :value="questionnaire.languages"/>
                        </p>
                        <p class="list">
                            <span class="caption">Текущая должность</span>
                            <input type="text" class="text" :value="questionnaire.current_position"/>
                        </p>
                        <p class="list">
                            <span class="caption">Текущий уровень подготовки</span>
                            <input type="text" class="text" :value="questionnaire.current_level_of_training"/>
                        </p>
                        <p class="list align-top">
                            <span class="caption">Личные качества</span>
                            <span class="text textarea-old">{{questionnaire.personal_qualities}}</span>
                        </p>
                        <p class="list align-top">
                            <span class="caption">Увлечения</span>
                            <span class="text textarea-old">{{questionnaire.hobbies}}</span>
                        </p>
                        <p class="list round-bottom">
                            <span class="caption">Отправлено</span>
                            <input type="text" class="text" :value="questionnaire.created_at"/>
                        </p>
                    </div>
                    <div class="comment column" :class="{ 'empty' : !questionnaire.comment }">
                        <h2 class="round-top">Комментарии</h2>
                        <div class="list" v-if="questionnaire.comment">
                            <span class="text message">{{questionnaire.comment}}</span>
                            <!--<div class="date">12.01.2018, 12:00</div>-->
                        </div>
                        <div class="list round-bottom">
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
                questionnaire: [],
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
                    this.url + '/' + this.questionnaire.id + '/field',
                    {
                        field: 'comment',
                        value: this.adminComment
                    }
                ).then(() => {
                    this.questionnaire.comment = this.adminComment
                    this.adminComment = ''
                })
            }
        },
        mounted() {
            this.$http.get(
                this.url + '/' + this.$route.params.id
            ).then(response => {
                this.displayPage = true
                this.questionnaire = response.data.data
                console.log(response.data.data)
            })
        },
        created() {
            this.setUrl(this.apiUrls.questionnaire)
        }
    }
</script>
<style scoped lang="scss">
    .edit_feed .folder .column .list .text {
        overflow: auto;
        &:not(.textarea-old) {
            white-space: nowrap;
        }
    }
    .load-image {
        &:hover {
            border: 1px solid #E4E8EB;
            color: #999A9D;
            background: #F8F9FB;
            cursor: default;
        }
    }
    .edit_feed .folder .column.comment textarea {
        background-color: #fff;
    }
    .edit_main .folder .column:last-child {
        align-self: flex-start;
    }
    .comment .list:last-child button {
        margin-right: auto;
        margin-left: 0;
        
        @media screen and (max-width: 500px) {
            margin-top: 15px;
        }
    }
    .edit_feed {
        margin-bottom: 0;
        padding-bottom: 22px;
    }
    .edit_feed .folder .column h2 {
        padding: 20px;
        font-weight: 400;
    }
    .folder .view_message .list:last-child {
        border-top: none;
        // margin-top: 0;
        padding-top: 0;
    }
</style>
