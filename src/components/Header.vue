<template>
    <header ref="header" class="header">
        <div class="header__top">
            <div class="container flex-c">
                <div class="header__top-logo text_24-bold">
                    <nuxt-link to="/">Cinema</nuxt-link>
                </div>
                <ul v-if="!searchOpen" class="header__top-list flex-c text_16">
                    <li class="header__top-item">
                        <nuxt-link to="/">Кино</nuxt-link>
                    </li>
                </ul>
                <div v-if="searchOpen" class="header__top-search">
                    <div v-click-outside="closeSearch" class="header_top-search-content">
                        <div class="header__top-search-main flex-c">
                            <svg-icon name="search" width="30" height="30" />
                            <UiInput :input="inputSearch" @enter="goToSearch" />
                            <svg-icon
                                name="close"
                                width="30"
                                height="30"
                                class="header__top-search-close"
                                @click="closeSearch"
                            />
                        </div>
                        <div class="header__top-search-offers">
                            <div class="container">
                                <div v-if="inputSearch.value.length >= 2" class="header__top-search-offers-maybe">
                                    <nuxt-link
                                        :to="`/search/${inputSearch.value}`"
                                        class="header__top-search-offers-title text_24-bold"
                                        @click.native="closeSearch"
                                        >Все результаты <svg-icon name="arrow-next" height="15" width="15"
                                    /></nuxt-link>
                                    <div class="header__top-search-offers-list">
                                        <SiteSearchPoster
                                            v-for="movie of filterSearch"
                                            :key="movie.id"
                                            :movie="movie"
                                            @click.native="closeSearch"
                                        ></SiteSearchPoster>
                                    </div>
                                    <span v-if="!filterSearch.length" class="text_18"
                                        >Извините, по вашему запросу ничего не найдено</span
                                    >
                                </div>
                                <div v-if="inputSearch.value.length < 2" class="header__top-search-offers-often">
                                    <h1 class="header__top-search-offers-title text_24-bold">Часто ищут</h1>
                                    <div class="header__top-search-offers-list">
                                        <SiteSearchPoster
                                            v-for="movie of findOftenMovies"
                                            :key="movie.id"
                                            :movie="movie"
                                            @click.native="closeSearch"
                                        ></SiteSearchPoster>
                                    </div>
                                </div>
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
                        @click="openSearch"
                    />
                    <div v-if="!completeEntry" class="header__top-login">
                        <div class="header__top-login-main flex-c text_16" @click="modalLoginOpen = true">
                            <svg-icon name="user" width="30" height="30" />
                            <span>Войти</span>
                        </div>
                        <UiModal :open="modalLoginOpen" :name="titleModal" @open="openLoginModal">
                            <div v-if="pageLogin === 1" class="modal-login">
                                <h1 class="modal-login__title text_28-bold">Войти</h1>
                                <form class="modal-login__form" @keyup.enter="entry">
                                    <div class="modal-login__fields flex">
                                        <UiInput :input="inputEntryLogin" />
                                        <UiInput :input="inputEntryPass" />
                                        <span v-if="entryError" class="modal-login__error text_14"
                                            >Не правильный логин или пароль</span
                                        >
                                    </div>
                                    <UiButton
                                        :disabled="checkEntryContent || entryError === true"
                                        :class="'text_18'"
                                        :size="'lg'"
                                        :type="'button'"
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
                                <form class="modal-login__form" @keyup.enter="addUserToState">
                                    <div class="modal-login__fields flex">
                                        <UiInput :input="inputRegistrLogin">
                                            <span
                                                v-for="(err, index) of registrErrorLogin"
                                                :key="index"
                                                class="modal-login__error text_10"
                                                >{{ err }}</span
                                            >
                                        </UiInput>
                                        <UiInput :input="inputRegistrPass">
                                            <span
                                                v-for="(err, index) of registrErrorPass"
                                                :key="index"
                                                class="modal-login__error text_10"
                                                >{{ err }}</span
                                            >
                                        </UiInput>
                                    </div>
                                    <UiButton
                                        :disabled="
                                            registrErrorLogin.length || registrErrorPass.length || checkRegistrContent
                                        "
                                        :class="'text_18'"
                                        :size="'lg'"
                                        :type="'button'"
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
                                        <nuxt-link to="#">Ваши фильмы</nuxt-link>
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
                                            <span
                                                class="modal-burger-menu__item-open text_24"
                                                @click="openAdditionalList"
                                                >Кино</span
                                            >
                                            <transition name="fade">
                                                <ul
                                                    v-if="additionalListOpen"
                                                    class="modal-burger-menu__additional-list flex text_18"
                                                >
                                                    <li
                                                        @click="burgerMenuOpen = false"
                                                        class="modal-burger-menu__additional-item"
                                                    >
                                                        <nuxt-link to="/">Рекомендации</nuxt-link>
                                                    </li>
                                                    <li
                                                        @click="burgerMenuOpen = false"
                                                        class="modal-burger-menu__additional-item"
                                                    >
                                                        <nuxt-link to="/collection/new">Новинки</nuxt-link>
                                                    </li>
                                                    <li
                                                        @click="burgerMenuOpen = false"
                                                        class="modal-burger-menu__additional-item"
                                                    >
                                                        <nuxt-link to="/collection/genres">Каталог</nuxt-link>
                                                    </li>
                                                </ul>
                                            </transition>
                                        </li>
                                    </ul>
                                </div>
                            </UiModal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header__bottom">
            <div class="container flex-c">
                <ul class="header__bottom-list flex-c text_16">
                    <li :class="{ 'current-select': this.$route.path === '/' }" class="header__bottom-item">
                        <nuxt-link to="/" @click.native="burgerMenuOpen = false">Рекомендации</nuxt-link>
                    </li>
                    <li
                        :class="{ 'current-select': this.$route.path === '/collection/new' }"
                        class="header__bottom-item"
                    >
                        <nuxt-link to="/collection/new" @click.native="burgerMenuOpen = false">Новинки</nuxt-link>
                    </li>
                    <li :class="{ 'current-select': this.$route.path.includes('/genres') }" class="header__bottom-item">
                        <nuxt-link to="/collection/genres" @click.native="burgerMenuOpen = false">Каталог</nuxt-link>
                    </li>
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
            inputSearch: {
                placeholder: 'Название фильма или сериала',
                value: '',
            },
            modalLoginOpen: false,
            pageLogin: 1,
            searchOpen: false,
            registrErrorLogin: [],
            registrErrorPass: [],
            entryError: false,
            completeRegistr: false,
            completeEntry: false,
            user: null,
            userMenuOpen: false,
            burgerMenuOpen: false,
            additionalListOpen: false,
        }
    },
    computed: {
        ...mapState(['movies']),
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
        filterSearch() {
            return this.movies
                .filter((f, i) => f.name_russian.toLowerCase().includes(this.inputSearch.value.toLowerCase()))
                .slice(0, 6)
        },
        findOftenMovies() {
            return this.movies.slice(0, 6)
        },
    },
    watch: {
        'inputRegistrLogin.value'() {
            this.registrErrorLogin = []
            this.inputRegistrLogin.border = false
        },
        'inputRegistrPass.value'() {
            this.registrErrorPass = []
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
            this.entryError = false
            this.registrErrorLogin = []
            this.registrErrorPass = []
            this.inputRegistrLogin.value = null
            this.inputRegistrPass.value = null
            this.inputEntryLogin.value = null
            this.inputEntryPass.value = null
        },
        searchOpen(newVal) {
            const body = document.querySelector('body')
            if (newVal === true) {
                body.style.overflow = 'hidden'
            } else {
                body.style.overflow = null
            }
        },
    },
    mounted() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset >= 60) {
                this.$refs.header.classList.add('header-scroll')
            } else {
                this.$refs.header.classList.remove('header-scroll')
            }
        })
    },
    methods: {
        ...mapMutations('users', ['addUser']),
        openLoginModal(open) {
            this.modalLoginOpen = open
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
                    this.registrErrorLogin.push('Такой логин уже занят')
                    this.inputRegistrLogin.border = true
                    return
                }
            }

            if (login.split(' ').join('').length <= 3) {
                this.registrErrorLogin.push('Длина логина должна быть больше 3 символов')
                this.inputRegistrLogin.border = true
                return
            }

            if (login.split(' ').join('').length > 15) {
                this.registrErrorLogin.push('Длина логина не должна превышать больше 15 символов')
                this.inputRegistrLogin.border = true
                return
            }

            if (
                login !==
                String(login.match(/[0-9a-zA-Z]/gi))
                    .split(',')
                    .join('')
            ) {
                this.registrErrorLogin.push('Логин должен быть формата 0-9a-zA-Z без пробелов')
                this.inputRegistrLogin.border = true
                return
            }

            if (pass.split(' ').join('').length <= 5) {
                this.registrErrorPass.push('Пароль должен быть больше 5 символов')
                this.inputRegistrPass.border = true
                return
            }

            if (
                pass !==
                String(pass.match(/[0-9a-zA-Z]/gi))
                    .split(',')
                    .join('')
            ) {
                this.registrErrorPass.push('Пароль должен быть формата 0-9a-zA-Z без пробелов')
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
            this.modalLoginOpen = false
        },
        openBurgerMenu(open) {
            this.burgerMenuOpen = open
        },
        openAdditionalList(e) {
            e.target.parentNode.classList.toggle('additional-list-open')
            this.additionalListOpen = !this.additionalListOpen
        },
        openSearch() {
            this.searchOpen = true
        },
        closeSearch() {
            this.searchOpen = false
            this.inputSearch.value = ''
        },
        goToSearch(value) {
            if (value.length) {
                this.$router.push(`/search/${value}`)
            } else {
                this.$router.push('/search')
            }
            this.searchOpen = false
            this.inputSearch.value = ''
        },
    },
}
</script>
<style lang="less">
.header {
    color: @l-gray;
    position: fixed;
    width: 100%;
    top: 0;
    transition: 0.3s;
    z-index: 1000;
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
            margin-right: 20px;
            flex-grow: 1;
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
                flex: 1;
                gap: 10px;
                justify-content: flex-end;
                .input {
                    flex: 1;
                }
            }
            &-icon {
                cursor: pointer;
                transition: 0.3s;
                &:hover {
                    color: @white;
                }
            }
            &-close {
                cursor: pointer;
            }
            &-blur {
                position: absolute;
                backdrop-filter: blur(2px);
                height: calc(100vh - 50px);
                width: 100vw;
                left: 0;
                @media @md {
                    height: calc(100vh - 110px);
                }
            }
            &-offers {
                position: absolute;
                background: @d-gray;
                background-size: cover;
                color: @white;
                z-index: 100;
                left: 0;
                right: 0;
                padding: 20px 0;
                max-width: 100%;
                overflow-y: scroll;
                @media @md {
                    height: calc(100vh - 110px);
                }
                &-title {
                    display: inline-flex;
                    margin-bottom: 20px;
                    align-items: center;
                    gap: 20px;
                }
                &-list {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                    @media @md {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    @media @sm {
                        grid-template-columns: repeat(1, 1fr);
                    }
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
            a {
                background: linear-gradient(101.67deg, #48cce0 7.24%, #505add 34.12%, #be40c0 62.93%, #fba82b 92.22%);
                color: @white;
                padding: 5px 10px;
                border-radius: 10px;
            }
            @media @md {
                display: none;
            }
        }
        &-login {
            .modal__title {
                background: @white;
                color: @primary;
            }
            .modal__content {
                background: @bg-gray;
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
        &-user {
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
            height: 100%;
        }
        &-item {
            height: 100%;
            a {
                display: flex;
                align-items: center;
                height: 100%;
            }
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
        @media @md {
            text-align: center;
        }
    }
    &__form {
        margin-bottom: 30px;
    }
    &__fields {
        gap: 10px;
        flex-direction: column;
        margin-bottom: 30px;
    }
    &__error {
        color: @red;
    }
    &__choose {
        padding: 20px 0;
        border-top: solid 1px @l-gray;
        justify-content: center;
        gap: 10px;
        @media @md {
            flex-direction: column;
        }
        &-link {
            color: @red;
            cursor: pointer;
            transition: 0.3s;
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
            border-right: 6px solid transparent;
            border-left: 6px solid transparent;
            border-top: 8px solid @white;
            width: 0;
            height: 0;
            top: 50%;
            transform: translateY(-50%);
            right: -18px;
            transition: 0.3s;
        }
    }
    &__additional-list {
        flex-direction: column;
        margin-left: 30px;
        gap: 15px;
        margin-top: 10px;
    }
}
</style>
