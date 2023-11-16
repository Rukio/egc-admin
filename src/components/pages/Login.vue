<template>
    <div class="main_authorization">
        <div class="login-form">
            <transition name="popup" mode="out-in">
                <div class="logo" v-for="(index) in 4" :key="index"
                    v-if="currentForm == index">
                    <a href="#"><img alt="Error" src="../../assets/egc_logo_max.svg"/></a>
                </div>
            </transition>
            <transition name="popup" mode="out-in">
            <div v-if="currentForm == 1" key="1" class="authorization-form" id="authorization">
                <div class="wrapper">
                    <h1>Вход</h1>
                    <p v-if="error" class="message__error">{{ error }}</p>
                    <form>
                        <div class="field" :class="{ filled : email }">
                            <input v-model="email" class="input" :class="{error: error}" type="text" placeholder="Почта">
                            <span class="line"/>
                            <icon-envelope class="icon"/>
                        </div>
                        <div class="field" :class="{ filled : password }">
                            <input v-model="password" class="input" :class="{error: error}" type="password" placeholder="Пароль">
                            <span class="line"/>
                            <icon-lock class="icon"/>
                        </div>
                        <!-- <checkbox id="checkbox" v-model="rememberCheck" :color="'#089cd3'">Запомнить меня</checkbox> -->
                        <v-checkbox
                            v-model="rememberCheck"
                            label="Запомнить меня"
                            class="remember-check"></v-checkbox>
                    </form>
                </div>
                <div class="submit">
                    <button @click="currentForm = 2" class="forgot">Забыли пароль?</button>
                    <button class="enter" @click="loginForm">Войти <icon-arrowbold class="icon"/></button>
                </div>
            </div>
            <div v-if="currentForm == 2" key="2" class="forgot-password-form" id="forgot-password">
                <div class="wrapper">
                    <h1>Забыли пароль?</h1>
                    <p class="forgot-text">Введите Email адрес, чтобы восстановить пароль.<br> 
                        Вы получите электронное письмо с инструкциями по сбросу пароля.</p>
                    <form>
                        <div class="field" :class="{ filled : emailRecovery }">
                            <input v-model="emailRecovery" class="input" :class="{error: error}" type="text" placeholder="Email">
                            <span class="line"/>
                            <icon-envelope class="icon"/>
                        </div>
                    </form>
                    <p v-if="error" class="error-small">Ваша учетная не найдена. Проверьте правильность введенного email и попробуёте ещё раз</p>
                </div>
                <div class="submit">
                    <button @click="currentForm = 1" class="entrance"><icon-arrowbold class="icon icon-right"/>Вход</button>
                    <button @click="currentForm = 3" class="enter">Восстановить<icon-arrowbold class="icon"/></button>
                </div>
            </div>
            <div v-if="currentForm == 3" key="3" class="password-recovery" id="password-recovery">
                <div class="wrapper">
                    <h1>Восстановление пароля</h1>
                    <p class="forgot-text">Вам отправлено электронное письмо с инструкциями по созданию нового пароля на адрес test@mail.com.</p>
                </div>
                <div class="submit">
                    <button @click="currentForm = 4" class="enter">Перейти к письму<icon-arrowbold class="icon"/></button>
                </div>
            </div>
            <div v-if="currentForm == 4" key="4" class="password-newenter" id="password-newenter">
                <div class="wrapper">
                    <h1>Восстановить пароль</h1>
                    <p class="forgot-text">Введите новый пароль</p>
                    <p v-if="error" class="message__error">Введённые пароли не совпадают</p>
                    <form>
                        <div class="field" :class="{ filled : passRecovery }">
                            <input v-model="passRecovery" class="input" :class="{error: error}" type="password" placeholder="Новый пароль">
                            <span class="line"/>
                            <icon-lock class="icon"/>
                        </div>
                        <div class="field" :class="{ filled : passRecoveryRepeat }">
                            <input v-model="passRecoveryRepeat" class="input" :class="{error: error}" type="password" placeholder="Повторить пароль">
                            <span class="line"/>
                            <icon-lock class="icon"/>
                        </div>
                    </form>
                </div>
                <div class="submit">
                    <button @click="currentForm = 1" class="entrance"><icon-arrowbold class="icon icon-right"/>Вход</button>
                    <button @click="popupShow" class="enter">Сохранить <icon-arrowbold class="icon"/></button>
                </div>
            </div>
            </transition>
        </div>
        <popup-result
                v-if="popupActive"
                @close="popupHide"
                :title="'Восстановление пароля'"
                :description="'Ваш пароль успешно сохранён'"/>
    </div>
</template>

<script>
    import IconEnvelope from '@/components/icons/IconEnvelope.vue'
    import IconLock from '@/components/icons/IconLock.vue'
    import IconArrowleft from '@/components/icons/IconArrowleft.vue'
    import IconArrowbold from '@/components/icons/IconArrowbold.vue'
    import IconCheck from '@/components/icons/IconCheck.vue'
    import PopupResult from '@/components/PopupResult.vue'
    import {createNamespacedHelpers} from 'vuex'

    const {mapGetters, mapActions} = createNamespacedHelpers('auth')

    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                emailRecovery: '',
                password: '',
                error: '',
                rememberCheck: '',
                passRecovery: '',
                passRecoveryRepeat: '',
                popupActive: false,
                popupTimeout: undefined,
                currentForm: 1
            }
        },
        computed: {
            ...mapGetters({currentUser: 'currentUser'}),
        },
        components: {
            IconEnvelope,
            IconLock,
            IconArrowleft,
            IconArrowbold,
            IconCheck,
            PopupResult
        },
        created() {
            this.checkCurrentLogin()
        },
        updated() {
            this.checkCurrentLogin()
        },
        methods: {
            ...mapActions([
                'login',
                'logout'
            ]),
            checkCurrentLogin() {
                if (this.currentUser) {
                    this.currentForm = 0
                    this.$router.replace(this.$route.query.redirect || '/')
                }
            },
            loginForm() {
                this.$http.post('/oauth/token', {
                    username: this.email,
                    password: this.password,
                    client_id: 1,
                    client_secret: 'kAUsFYysaEEi82JrFgzgYcU8SJzx8ubRkf7NJj8l',
                    grant_type: 'password'
                })
                    .then(request => this.loginSuccessful(request))
                    .catch(() =>
                        this.loginFailed()
                    )
            },
            loginSuccessful(req) {
                if (!req.data.access_token) {
                    this.loginFailed()
                    return
                }
                // console.log('login')
                //   console.log(req.data.access_token)
                this.error = false
                localStorage.token = req.data.access_token
                this.login()
                window.location.href = '/'
                // this.$router.replace('/translate')
            },
            loginFailed() {
                this.password = ''
                this.error = 'Неправильный email или пароль, попробуйте еще раз'
                this.logout()
                delete localStorage.token
            },
            popupShow() {
                if (!this.popupActive) this.popupActive = true;
            },
            popupHide() {
                if (this.popupActive) {
                    this.popupActive = false;
                    // clearTimeout(this.popupTimeout);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

$grey-3: #999a9d;
$grey-6: #6e7074;
$blue: #089cd3;
$white-2: #f8f9fb;
$white-4: #ddd;
$white: #fff;



.wrapper {
    padding: 0 60px;

    @media screen and (max-width: 500px) {
        padding: 0 32px;
    }
}

.forgot-password-form,
.password-recovery,
.password-newenter  {
    .forgot-text {
        font-size: 14px;
        color: $grey-3;
        letter-spacing: .8px;
        line-height: 24px;
        margin-bottom: 28px;
    }

    .entrance {
        color: $grey-3;
        font-size: 14px;
        background: transparent;
        border: none;
        transition: .2s;

        @media screen and (max-width: 369px) {
            order: 2;
        }
        &:hover {
            color: $blue;
        }
    }
}

// .remember-check {
//     &:hover {
//         /deep/ .theme--light.v-icon {
//             color: $blue;
//         }
//     }
// }

.authorization-form {
    h1 {
        margin-bottom: 10px;
    }

    form {
        margin-top: 28px;
    }
}

#app .main_authorization /deep/ .v-input--checkbox {
    margin-top: 33px;
}

#app .forgot-password-form .forgot-text {
    margin-bottom: 2px;
}

.password-recovery {
    h1 {
        margin-bottom: 18px;
    }

    .forgot-text {
        margin-bottom: 53px;
    }

    .submit {
        justify-content: flex-end;
    }
}

.main_authorization .password-recovery .submit button {
    @media screen and (max-width: 369px) {
        margin-top: 0;
    }
    @media screen and (max-width: 500px) {
        margin-bottom: 0;
        padding: 12px 32px;
    }
}

.password-newenter {
    h1 {
        margin-bottom: 18px;
    }

    form {
        margin-top: 2px;
    }
}

.entrance {
    & .icon {
        margin-bottom: -1px;
        margin-right: 10px;
        width: 10px;
        height: 12px;
    }
}

.forgot-password-form {
    h1 {
        margin-bottom: 18px;
    }

    .hr {
        margin-top: 60px;
    }

    form .field {
        margin-bottom: 8px;
    }
}

.field.filled {
    color: $grey-6;

    svg {
        fill: $grey-6;
    }
}

.icon-right {
    transform: rotate(180deg);
}


</style>
