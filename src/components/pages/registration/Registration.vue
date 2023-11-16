<template>
    <div class="main_authorization">
        <div class="login-form">
            <div class="logo">
                <a href="#"><img alt="Error" src="@/assets/egc_logo_max.svg"/></a>
            </div>
            <div class="registration-form" id="registration">
                <div class="wrapper">
                    <h1>Регистрация</h1>
                    <p v-if="error" class="message__error">{{ error }}</p>
                    <form>
                        <div class="field" :class="{ filled : name }">
                            <input v-model="name" class="input" :class="{error: errors.nameError}" type="text" placeholder="Имя">
                            <span class="line"/>
                            <icon-user class="icon"/>
                            <p v-if="errors.nameError" class="field-error">{{ errors.nameError }}</p>
                        </div>
                        <div class="field" :class="{ filled : password }">
                            <input v-model="password" class="input" :class="{error: errors.passwordError}" type="password" placeholder="Введите пароль">
                            <span class="line"/>
                            <icon-lock class="icon"/>
                            <p v-if="errors.passwordError" class="field-error">{{ errors.passwordError }}</p>
                        </div>
                        <div class="field" :class="{ filled : passwordRe }">
                            <input v-model="passwordRe" class="input" :class="{error: errors.passwordReError}" type="password" placeholder="Повторите пароль">
                            <span class="line"/>
                            <icon-lock class="icon"/>
                            <p v-if="errors.passwordReError" class="field-error">{{ errors.passwordReError }}</p>
                        </div>
                    </form>
                </div>
                <div class="submit">
                    <button class="enter" @click="registerForm">Зарегистрироваться <icon-arrowbold class="icon"/></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconUser from '@/components/icons/IconUser.vue'
import IconLock from '@/components/icons/IconLock.vue'
import IconArrowbold from '@/components/icons/IconArrowbold.vue'

export default {

    data() {
        return {
            name: '',
            password: '',
            passwordRe: '',
            error: '',
            errors: {
                nameError: '',
                passwordError: '',
                passwordReError: ''
            }
        }
    },
    methods: {
        registerForm() {
            if (this.name &&
                this.password &&
                this.passwordRe) {
                if (this.password == this.passwordRe) {
                    console.log('Success!')
                    this.error = ''
                    this.errors.nameError = ''
                    this.errors.passwordError = ''
                    this.errors.passwordReError = ''
                } else {
                    this.error = 'Введенные пароли не совпадают'
                }
            } else {
                this.error = 'Заполните пустые поля'
                if (!this.name) this.errors.nameError = 'Введите имя'
                    else this.errors.nameError = ''
                if (!this.password) this.errors.passwordError = 'Введите пароль'
                    else this.errors.passwordError = ''
                if (!this.passwordRe) this.errors.passwordReError = 'Введите пароль повторно'
                    else this.errors.passwordReError = ''
            }
        }
    },
    components: {
        IconUser,
        IconLock,
        IconArrowbold
    }
}
</script>

<style lang="scss" scoped>

$grey-3: #999a9d;
$grey-6: #6e7074;
$blue: #089cd3;
$white-2: #f8f9fb;
$white: #fff;
$pink: #f27777;

.field-error {
    font-family: Roboto, sans-serif;
    font-size: 12px;
    color: $pink;
    position: absolute;
    bottom: -18px;
    left: 0;
}

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

.registration-form {
    h1 {
        margin-bottom: 10px;
    }

    form {
        margin-top: 28px;
    }

    .submit .enter {
        margin-left: auto;
    }
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
        margin-top: 28px;
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
