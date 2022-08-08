<template>
    <header class="header">
        <div class="header__top">
            <div class="container flex-c">
                <nuxt-link to="/" class="header__top-logo text_24-bold">Cinema</nuxt-link>
                <ul class="header__top-list flex-c text_16">
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
                <div class="header__top-right flex-c">
                    <svg-icon name="search" width="30" height="30" class="header__top-search" />
                    <nuxt-link to="#" class="header__top-subscribe text_16">Подписка</nuxt-link>
                    <div class="header__top-login text_16" @click="open = true">
                        <span>Войти</span>
                    </div>
                    <UiModal :open="open" :name="'Авторизация'" @open="openModal">
                        <div class="modal-login">
                            <h1 class="modal-login__title text_28-bold">Войти</h1>
                            <form class="modal-login__form flex">
                                <UiInput :name="'Логин'" />
                                <UiInput :name="'Пароль'" />
                                <button class="modal-login__btn">Вход</button>
                            </form>
                            <div class="modal-login__registration flex-c">
                                <span class="modal-login__registration-title">Нет аккаунта?</span>
                                <button class="modal-login__registration-btn">Зарегистрироваться</button>
                            </div>
                        </div>
                    </UiModal>
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
export default {
    name: 'Header',
    data() {
        return {
            open: false,
        }
    },
    methods: {
        openModal(open) {
            this.open = open
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
        }
        &-right {
            gap: 20px;
        }
        &-search {
            .trs(all);
            &:hover {
                color: @white;
            }
        }
        &-subscribe {
            background: linear-gradient(101.67deg, #48cce0 7.24%, #505add 34.12%, #be40c0 62.93%, #fba82b 92.22%);
            color: @white;
            padding: 5px 10px;
            border-radius: 10px;
        }
    }
    &__bottom {
        height: 60px;
        background: @gray;
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
        gap: 10px;
        flex-direction: column;
        margin-bottom: 30px;
    }
    &__btn {
        margin-top: 30px;
    }
    &__registration {
        padding: 20px 0;
        border-top: solid 1px @l-gray;
        justify-content: center;
        gap: 5px;
    }
}
</style>
