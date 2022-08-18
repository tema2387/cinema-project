<template>
    <header class="header">
        <div class="header__top">
            <div class="container flex-c">
                <div class="header__top-logo text_24-bold">
                    <nuxt-link to="/">Cinema</nuxt-link>
                </div>
                <ul v-if="!searchOpen" class="header__top-list flex-c text_16">
                    <li class="header__top-item">
                        <nuxt-link to="#">Кино</nuxt-link>
                    </li>
                    <li class="header__top-item">
                        <nuxt-link to="#">Сериалы</nuxt-link>
                    </li>
                    <li class="header__top-item">
                        <nuxt-link to="#">Спорт</nuxt-link>
                    </li>
                    <li class="header__top-item">
                        <nuxt-link to="#">Детям</nuxt-link>
                    </li>
                </ul>
                <div v-if="searchOpen" class="header__top-search">
                    <div class="header__top-search-main flex-c">
                        <svg-icon name="search" width="30" height="30" />
                        <UiInput :input="{ placeholder: 'Название фильма или сериала' }" />
                        <svg-icon
                            name="close"
                            width="30"
                            height="30"
                            class="header__top-search-close"
                            @click="searchOpen = false"
                        />
                    </div>
                    <div class="header__top-search-offers">
                        <div class="container">
                            <div class="header__top-search-offers-maybe">
                                <h1 class="header__top-search-offers-title text_24-bold">Возможно вы имели в виду:</h1>
                                <ul class="header__top-search-offers-list">
                                    <li class="header__top-search-offers-item">s</li>
                                    <li class="header__top-search-offers-item">s</li>
                                    <li class="header__top-search-offers-item">s</li>
                                    <li class="header__top-search-offers-item">s</li>
                                    <li class="header__top-search-offers-item">s</li>
                                    <li class="header__top-search-offers-item">s</li>
                                    <li class="header__top-search-offers-item">s</li>
                                    <li class="header__top-search-offers-item">s</li>
                                </ul>
                            </div>
                            <div class="header__top-search-offers-often">
                                <h1 class="header__top-search-offers-title text_24-bold">Часто ищут:</h1>
                                <ul class="header__top-search-offers-list">
                                    <li class="header__top-search-offers-item">s</li>
                                    <li class="header__top-search-offers-item">s</li>
                                    <li class="header__top-search-offers-item">s</li>
                                    <li class="header__top-search-offers-item">s</li>
                                    <li class="header__top-search-offers-item">s</li>
                                    <li class="header__top-search-offers-item">s</li>
                                    <li class="header__top-search-offers-item">s</li>
                                    <li class="header__top-search-offers-item">s</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="header__top-search-blur"></div>
                </div>
                <div class="header__top-right flex-c">
                    <svg-icon
                        v-if="!searchOpen"
                        name="search"
                        width="30"
                        height="30"
                        class="header__top-search-icon"
                        @click="searchOpen = true"
                    />
                    <nuxt-link to="#" class="header__top-subscribe text_16">Подписка</nuxt-link>
                    <div v-if="!completeEntry" class="header__top-login flex-c text_16" @click="modalOpen = true">
                        <svg-icon name="user" width="30" height="30" />
                        <span>Войти</span>
                    </div>
                    <div v-if="completeEntry" class="header__top-user text_16">
                        <div class="header__top-user-main flex-c" @click="userMenuOpen = true">
                            <svg-icon name="user" width="30" height="30" />
                            <span>{{ user }}</span>
                        </div>
                        <UiModal :open="userMenuOpen" :name="'Meню'" @open="openUserMenu">
                            <div class="modal-user-menu">
                                <div class="modal-user-menu__title text_28-bold">Привет, {{ user }}!</div>
                                <ul class="modal-user-menu__list text_18 flex">
                                    <li class="modal-user-menu__item">
                                        <nuxt-link to="#">Избранные фильмы</nuxt-link>
                                    </li>
                                    <li class="modal-user-menu__item"><nuxt-link to="#">Подписка</nuxt-link></li>
                                    <li class="modal-user-menu__item">
                                        <nuxt-link to="#">Подборка для меня</nuxt-link>
                                    </li>
                                </ul>
                                <span class="modal-user-menu__exit text_18" @click="exitUserMenu">Выход</span>
                            </div>
                        </UiModal>
                    </div>
                    <div class="header__top-menu">
                        <div class="header__top-menu-burger flex" @click="burgerMenuOpen = true">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="header__top-menu-content">
                            <UiModal :open="burgerMenuOpen" :name="'Meню'" @open="openBurgerMenu">
                                <div class="modal-burger-menu">
                                    <ul class="modal-burger-menu__list text_18 flex">
                                        <li class="modal-burger-menu__item">
                                            <span class="modal-burger-menu__item-open" @click="openAdditionalList"
                                                >Кино</span
                                            >
                                            <ul class="modal-burger-menu__additional-list flex text_16">
                                                <li class="modal-burger-menu__additional-item">
                                                    <nuxt-link to="#">Рекомендации</nuxt-link>
                                                </li>
                                                <li class="modal-burger-menu__additional-item">
                                                    <nuxt-link to="#">Новинки</nuxt-link>
                                                </li>
                                                <li class="modal-burger-menu__additional-item">
                                                    <nuxt-link to="#">Каталог</nuxt-link>
                                                </li>
                                                <li class="modal-burger-menu__additional-item">
                                                    <nuxt-link to="#">По подписке</nuxt-link>
                                                </li>
                                                <li class="modal-burger-menu__additional-item">
                                                    <nuxt-link to="#">Бесплатно</nuxt-link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="modal-burger-menu__item">
                                            <span class="modal-burger-menu__item-open" @click="openAdditionalList"
                                                >Сериалы</span
                                            >
                                            <ul class="modal-burger-menu__additional-list flex text_16">
                                                <li class="modal-burger-menu__additional-item">
                                                    <nuxt-link to="#">Рекомендации</nuxt-link>
                                                </li>
                                                <li class="modal-burger-menu__additional-item">
                                                    <nuxt-link to="#">Новинки</nuxt-link>
                                                </li>
                                                <li class="modal-burger-menu__additional-item">
                                                    <nuxt-link to="#">Каталог</nuxt-link>
                                                </li>
                                                <li class="modal-burger-menu__additional-item">
                                                    <nuxt-link to="#">По подписке</nuxt-link>
                                                </li>
                                                <li class="modal-burger-menu__additional-item">
                                                    <nuxt-link to="#">Бесплатно</nuxt-link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="modal-burger-menu__item">
                                            <nuxt-link to="#">Спорт</nuxt-link>
                                        </li>
                                        <li class="modal-burger-menu__item">
                                            <nuxt-link to="#">Детям</nuxt-link>
                                        </li>
                                    </ul>
                                </div>
                            </UiModal>
                        </div>
                    </div>
                    <template v-if="!completeEntry">
                        <UiModal :open="modalOpen" :name="titleModal" @open="openModal">
                            <div v-if="pageLogin === 1" class="modal-login">
                                <h1 class="modal-login__title text_28-bold">Войти</h1>
                                <form class="modal-login__form">
                                    <div class="modal-login__fields flex">
                                        <UiInput :input="inputEntryLogin" />
                                        <UiInput :input="inputEntryPass" />
                                        <div v-if="entryError" class="modal-login__errors text_14">
                                            <span>Не правильный логин или пароль</span>
                                        </div>
                                    </div>
                                    <UiButton
                                        :disabled="checkEntryContent"
                                        :class="'text_18'"
                                        :size="'lg'"
                                        @click.native="entry"
                                        >Вход</UiButton
                                    >
                                </form>
                                <div class="modal-login__choose flex-c">
                                    <span class="modal-login__choose-title">Нет аккаунта?</span>
                                    <span class="modal-login__choose-link" @click="pageLogin = 2"
                                        >Зарегистрироваться</span
                                    >
                                </div>
                            </div>
                            <div v-if="pageLogin === 2" class="modal-login">
                                <h1 class="modal-login__title text_28-bold">Регистрация</h1>
                                <form class="modal-login__form">
                                    <div class="modal-login__fields flex">
                                        <UiInput :input="inputRegistrLogin">
                                            <div class="modal-login__errors text_10">
                                                <span v-if="registrError.login.format"
                                                    >Логин должен быть формата a-z</span
                                                >
                                                <span v-if="registrError.login.alreadyRegistr"
                                                    >Такой логин уже занят</span
                                                >
                                                <span v-if="registrError.login.lengthLogin"
                                                    >Для логина должна быть больше 3 символов</span
                                                >
                                            </div>
                                        </UiInput>
                                        <UiInput :input="inputRegistrPass">
                                            <div class="modal-login__errors text_10">
                                                <span v-if="registrError.pass.format"
                                                    >Пароль должен быть формата 0-9 a-z A-Z</span
                                                >
                                                <span v-if="registrError.pass.lengthPass"
                                                    >Длина пароля должна быть больше 5 символов</span
                                                >
                                            </div>
                                        </UiInput>
                                    </div>
                                    <UiButton
                                        :disabled="checkRegistrContent"
                                        :class="'text_18'"
                                        :size="'lg'"
                                        @click.native="addUserToState"
                                        >Зарегистрироваться</UiButton
                                    >
                                </form>
                                <div class="modal-login__choose flex-c">
                                    <span class="modal-login__choose-title">Уже есть аккаунт?</span>
                                    <span class="modal-login__choose-link" @click="pageLogin = 1">Войти</span>
                                </div>
                                <div v-if="completeRegistr" class="modal-login__complete flex">
                                    <h1 class="modal-login__complete-title">Успешная регистрация!</h1>
                                    <img class="modal-login__complete-img" src="../assets/img/modal/ok.jpg" alt="ok" />
                                    <div class="modal-login__complete-entry flex-c">
                                        <span class="modal-login__complete-text"
                                            >Теперь можете войти в ваш аккаунт</span
                                        >
                                        <span class="modal-login__complete-link text_18" @click="pageLogin = 1"
                                            >Войти</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </UiModal>
                    </template>
                </div>
            </div>
        </div>
        <div class="header__bottom">
            <div class="container flex-c">
                <ul class="header__bottom-list flex-c text_16">
                    <li class="header__bottom-item"><nuxt-link to="#">Рекомендации</nuxt-link></li>
                    <li class="header__bottom-item"><nuxt-link to="#">Новинки</nuxt-link></li>
                    <li class="header__bottom-item"><nuxt-link to="#">Каталог</nuxt-link></li>
                    <li class="header__bottom-item"><nuxt-link to="#">По подписке</nuxt-link></li>
                    <li class="header__bottom-item"><nuxt-link to="#">Бесплатно</nuxt-link></li>
                </ul>
            </div>
        </div>
    </header>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name: 'Header',
    data() {
        return {
            inputRegistrLogin: {
                name: 'Логин',
                placeholder: 'Придумайте логин',
                value: null,
                border: false,
            },
            inputRegistrPass: {
                name: 'Пароль',
                placeholder: 'Придумайте пароль',
                value: null,
                border: false,
            },
            inputEntryLogin: {
                name: 'Логин',
                placeholder: 'Введите логин',
                value: null,
                border: false,
            },
            inputEntryPass: {
                name: 'Пароль',
                placeholder: 'Введите пароль',
                value: null,
                border: false,
            },
            modalOpen: false,
            pageLogin: 1,
            searchOpen: false,
            registrError: {
                login: {
                    format: false,
                    alreadyRegistr: false,
                    lengthLogin: false,
                },
                pass: {
                    format: false,
                    lengthPass: false,
                },
            },
            entryError: false,
            completeRegistr: false,
            completeEntry: false,
            user: null,
            userMenuOpen: false,
            burgerMenuOpen: false,
        }
    },
    computed: {
        ...mapState('users', ['users']),
        titleModal() {
            return this.pageLogin === 1 ? 'Авторизация' : 'Регистрация'
        },
        checkRegistrContent() {
            return (
                this.inputRegistrLogin.value === null ||
                this.inputRegistrLogin.value.length === 0 ||
                this.inputRegistrPass.value === null ||
                this.inputRegistrPass.value.length === 0
            )
        },
        checkEntryContent() {
            return (
                this.inputEntryLogin.value === null ||
                this.inputEntryLogin.value.length === 0 ||
                this.inputEntryPass.value === null ||
                this.inputEntryPass.value.length === 0
            )
        },
    },
    watch: {
        modalOpen(newVal) {
            const body = document.querySelector('body')
            if (newVal === true) {
                body.style.overflow = 'hidden'
            } else {
                body.style.overflow = null
            }
        },
        searchOpen(newVal) {
            const body = document.querySelector('body')
            if (newVal === true) {
                body.style.overflow = 'hidden'
            } else {
                body.style.overflow = null
            }
        },
        'inputRegistrLogin.value'() {
            this.registrError.login.format = false
            this.registrError.login.alreadyRegistr = false
            this.registrError.login.lengthLogin = false
            this.inputRegistrLogin.border = false
        },
        'inputRegistrPass.value'() {
            this.registrError.pass.format = false
            this.registrError.pass.lengthPass = false
            this.inputRegistrPass.border = false
        },
        'inputEntryLogin.value'() {
            this.entryError = false
            this.inputEntryLogin.border = false
            this.inputEntryPass.border = false
        },
        'inputEntryPass.value'() {
            this.entryError = false
            this.inputEntryLogin.border = false
            this.inputEntryPass.border = false
        },
        pageLogin() {
            this.completeRegistr = false
        },
    },
    mounted() {
        if (document.cookie.length) {
            const user = document.cookie
                .replace(/\s/g, '')
                .split(';')
                .filter((f) => f.startsWith('user'))
                .join('')
                .split('=')[1]
            const pass = document.cookie
                .replace(/\s/g, '')
                .split(';')
                .filter((f) => f.startsWith('pass'))
                .join('')
                .split('=')[1]

            if (user.length && pass.length) {
                this.inputEntryLogin.value = user
                this.inputEntryPass.value = pass
                this.entry()
            }
        }
    },
    methods: {
        ...mapMutations('users', ['addUser']),
        openModal(open) {
            this.modalOpen = open
            this.pageLogin = 1
            this.completeRegistr = false
            this.inputRegistrLogin.value = null
            this.inputRegistrPass.value = null
            this.inputEntryLogin.value = null
            this.inputEntryPass.value = null
        },
        addUserToState() {
            const login = this.inputRegistrLogin.value
            const pass = this.inputRegistrPass.value

            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].login === login) {
                    this.registrError.login.alreadyRegistr = true
                    this.inputRegistrLogin.border = true
                    return
                }
            }

            if (login.length <= 3) {
                this.registrError.login.lengthLogin = true
                this.inputRegistrLogin.border = true
                return
            }

            if (login.length !== login.match(/[a-zA-Z]/gi).length) {
                this.registrError.login.format = true
                this.inputRegistrLogin.border = true
                return
            }

            if (pass.length <= 5) {
                this.registrError.pass.lengthPass = true
                this.inputRegistrPass.border = true
                return
            }

            if (pass.length !== pass.match(/[0-9a-zA-Z]/gi).length) {
                this.registrError.pass.format = true
                this.inputRegistrPass.border = true
                return
            }

            this.addUser(Object.assign({}, { login, pass }))
            this.inputRegistrLogin.value = null
            this.inputRegistrPass.value = null

            this.completeRegistr = true
        },
        entry() {
            for (let i = 0; i < this.users.length; i++) {
                if (
                    this.users[i].login === this.inputEntryLogin.value &&
                    this.users[i].pass === this.inputEntryPass.value
                ) {
                    this.user = this.users[i].login
                    document.cookie = `user = ${this.users[i].login}`
                    document.cookie = `pass = ${this.users[i].pass}`
                    this.completeEntry = true
                    return
                }
            }
            this.entryError = true
            this.inputEntryLogin.border = true
            this.inputEntryPass.border = true
        },
        openUserMenu(open) {
            this.userMenuOpen = open
        },
        exitUserMenu() {
            this.userMenuOpen = false
            this.inputEntryLogin.value = null
            this.inputEntryPass.value = null
            document.cookie = 'user=a;max-age=-1'
            document.cookie = 'pass=a;max-age=-1'
            this.completeEntry = false
            this.modalOpen = false
        },
        openBurgerMenu(open) {
            this.burgerMenuOpen = open
        },
        openAdditionalList(e) {
            e.target.parentNode.classList.toggle('additional-list-open')
        },
    },
}
</script>
<style lang="less">
.header {
    color: @l-gray;
    .container {
        height: 100%;
    }
    &__top {
        background: @d-gray;
        height: 60px;
        &-logo {
            margin-right: 20px;
            color: @white;
        }
        &-list {
            gap: 20px;
            flex-grow: 1;
            @media @md {
                display: none;
            }
        }
        &-search {
            flex-grow: 1;
            margin-right: 20px;
            .container {
                height: max-content;
            }
            @media @md {
                position: absolute;
                width: 100%;
                left: 0;
                padding: 0 30px;
                top: 60px;
                background: @d-gray;
            }
            &-main {
                gap: 10px;
            }
            &-icon {
                cursor: pointer;
                .trs(all);
                &:hover {
                    color: @white;
                }
            }
            &-close {
                cursor: pointer;
            }
            &-offers {
                position: absolute;
                background: @d-gray;
                z-index: 1000;
                color: @white;
                width: 100%;
                left: 0;
                padding: 20px 0;
                overflow-y: scroll;
                @media @md {
                    height: calc(100vh - 110px);
                }
                &-maybe {
                    margin-bottom: 20px;
                }
            }
            &-blur {
                position: absolute;
                backdrop-filter: blur(2px);
                height: calc(100vh - 50px);
                width: 100%;
                left: 0;
                @media @md {
                    height: calc(100vh - 110px);
                }
            }
        }
        &-right {
            gap: 20px;
            @media @md {
                flex: 1;
                justify-content: flex-end;
            }
        }
        &-subscribe {
            background: linear-gradient(101.67deg, #48cce0 7.24%, #505add 34.12%, #be40c0 62.93%, #fba82b 92.22%);
            color: @white;
            padding: 5px 10px;
            border-radius: 10px;
            @media @md {
                display: none;
            }
        }
        &-login {
            cursor: pointer;
            gap: 10px;
            span {
                @media @md {
                    display: none;
                }
            }
        }
        &-user {
            .modal__title {
                background: @primary;
                color: @white;
            }
            .modal__content {
                background: @gray;
                color: @white;
            }
            &-main {
                cursor: pointer;
                gap: 10px;
                span {
                    @media @md {
                        display: none;
                    }
                }
            }
        }
        &-menu {
            &-burger {
                flex-direction: column;
                justify-content: space-around;
                height: 30px;
                width: 30px;
                cursor: pointer;
                span {
                    background: @l-gray;
                    border-radius: 10px;
                    height: 5px;
                    width: 100%;
                }
                @media @notmd {
                    display: none;
                }
            }
            &-content {
                .modal__title {
                    background: @primary;
                    color: @white;
                }
                .modal__content {
                    background: @gray;
                    color: @white;
                }
            }
        }
    }
    &__bottom {
        height: 60px;
        background: @gray;
        @media @md {
            display: none;
        }
        &-list {
            gap: 20px;
            margin-left: 30px;
        }
    }
}

.modal-login {
    background: @white;
    padding: 20px;
    border-radius: 10px;
    color: @primary;
    &__title {
        margin-bottom: 40px;
    }
    &__form {
        margin-bottom: 30px;
        .button {
            width: 100%;
        }
    }
    &__fields {
        gap: 10px;
        flex-direction: column;
        margin-bottom: 30px;
    }
    &__errors {
        color: @red;
    }
    &__choose {
        padding: 20px 0;
        border-top: solid 1px @l-gray;
        justify-content: center;
        gap: 10px;
        &-link {
            color: @red;
            cursor: pointer;
            .trs(all);
            &:hover {
                opacity: 0.8;
            }
        }
    }
    &__complete {
        position: absolute;
        top: 0;
        left: 0;
        background: @white;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &-title {
            text-align: center;
        }
        &-img {
            width: 150px;
            height: 150px;
            margin: 30px 0;
        }
        &-entry {
            gap: 10px;
            flex-direction: column;
        }
        &-link {
            color: @red;
            cursor: pointer;
        }
    }
}

.modal-user-menu {
    &__title {
        margin-bottom: 30px;
    }
    &__list {
        margin-bottom: 30px;
        flex-direction: column;
        gap: 10px;
    }
    &__exit {
        cursor: pointer;
    }
}

.modal-burger-menu {
    &__list {
        flex-direction: column;
        gap: 10px;
    }
    &__item-open {
        position: relative;
        cursor: pointer;
        &::after {
            content: '';
            position: absolute;
            border-right: 8px solid transparent;
            border-left: 8px solid transparent;
            border-top: 10px solid @white;
            width: 0;
            height: 0;
            top: 50%;
            transform: translateY(-50%);
            right: -25px;
            .trs(all);
        }
    }
    &__additional-list {
        flex-direction: column;
        margin-left: 30px;
        gap: 10px;
        max-height: 0;
        opacity: 0;
        transition: opacity 0.3s;
    }
}
</style>
