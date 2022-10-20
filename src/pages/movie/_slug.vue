<template>
    <div class="movie">
        <div class="container">
            <div class="movie__main flex">
                <div class="movie__background">
                    <img :src="movie.big_poster" class="movie__background-img" />
                </div>
                <img class="movie__poster" :src="movie.small_poster" alt="movie-poster" />
                <div class="movie__content">
                    <div class="movie__content-top flex-c text_18">
                        <div :style="{ background: checkColorRating }" class="movie__content-rating">
                            {{ checkMovieRating }}
                        </div>
                        <div class="movie__content-year">{{ movie.year }}</div>
                        <div class="movie__content-country">{{ movie.country_ru }}</div>
                        <div class="movie__content-time">
                            {{ movie.time.split(':')[0] }} ч {{ movie.time.split(':')[1] }} мин
                        </div>
                        <div class="movie__content-age">
                            {{ movie.age_restriction ? movie.age_restriction + '+' : '' }}
                        </div>
                    </div>
                    <h1 class="movie__name text_28-bold">{{ movie.name_russian }}</h1>
                    <div class="movie__content-desc text_16">
                        <p>{{ movie.description.split(' ').slice(0, 15).join(' ') }}...</p>
                        <div v-scroll-to="'#info'" class="movie__content-desc-show" @click="currentTab = 1">
                            Посмотреть полностью<svg-icon name="arrow-next" width="10" height="10" />
                        </div>
                    </div>
                    <div class="movie__content-persons text_18 flex-c">
                        Актеры:
                        <span v-for="person of movie.persons.slice(0, 3)" :key="person.id" class="movie__content-person"
                            >{{ person.name_russian
                            }}<span v-if="person !== movie.persons[movie.persons.slice(0, 3).length - 1]">,</span></span
                        >
                        <span v-if="movie.persons.length > 3">и другие</span>
                    </div>
                    <div class="movie__watch text_20-bold flex-c">
                        <div class="movie__watch-main flex-c">
                            <UiButton :size="'xl'" @click.native="playerOpen = true"
                                ><svg-icon name="play" width="20" height="20"></svg-icon>Смотреть</UiButton
                            >
                            <UiButton :size="'xl'">Трейлер</UiButton>
                        </div>
                        <div class="movie__watch-additionally">
                            <UiButton :color="'gray'" :size="'xl'"
                                ><svg-icon name="bookmark" width="40" height="40"
                            /></UiButton>
                        </div>
                        <UiModal :name="movie.name_russian" :open="playerOpen" @open="openModalPlayer">
                            <div id="yohoho" :data-kinopoisk="movie.kinopoisk_id"></div>
                            <script src="//yohoho.cc/yo.js"></script>
                            <!-- <div id="yohoho" :data-player="movie.trailer" data-title="Стекло"></div>
                            <script src="//yohoho.cc/yo.js"></script> -->
                        </UiModal>
                    </div>
                </div>
            </div>
            <div id="info" class="movie__info">
                <div class="movie__info-tabs text_18 flex-c">
                    <div
                        :class="{ 'current-select': currentTab === 1 }"
                        class="movie__info-tab flex-c"
                        @click="currentTab = 1"
                    >
                        Описание
                    </div>
                    <div
                        :class="{ 'current-select': currentTab === 2 }"
                        class="movie__info-tab flex-c"
                        @click="currentTab = 2"
                    >
                        Информация
                    </div>
                </div>
                <div v-if="currentTab === 1" class="movie__info-content">
                    <div class="movie__info-chapter">
                        <h1 class="movie__info-title text_24-bold">Описание</h1>
                        <p class="movie__info-desc text_16">{{ movie.description }}</p>
                    </div>
                </div>
                <div v-if="currentTab === 2" class="movie__info-content flex">
                    <div class="movie__info-chapter">
                        <h1 class="movie__info-title text_24-bold">Информация</h1>
                        <ul class="movie__info-list text_16 flex">
                            <li class="movie__info-item">
                                <span class="movie__info-item-title">Страна</span>
                                <div class="movie__info-item-content">{{ movie.country_ru }}</div>
                            </li>
                            <li class="movie__info-item">
                                <span class="movie__info-item-title">Жанр</span>
                                <div class="movie__info-item-content flex-c">
                                    <nuxt-link
                                        v-for="genre of checkGenres"
                                        :key="genre.id"
                                        :to="`/genres/${genre.name_eng}`"
                                    >
                                        {{ genre.name_ru }}</nuxt-link
                                    >
                                </div>
                            </li>
                            <li class="movie__info-item">
                                <div class="movie__info-item-title">Оригинальное название</div>
                                <div class="movie__info-item-content">{{ movie.name_original }}</div>
                            </li>
                            <li class="movie__info-item">
                                <div class="movie__info-item-title">Время</div>
                                <div class="movie__info-item-content">
                                    {{ movie.time.split(':')[0] }} ч {{ movie.time.split(':')[1] }} мин
                                </div>
                            </li>
                            <li class="movie__info-item">
                                <div class="movie__info-item-title">Возрастные ограничения</div>
                                <div class="movie__info-item-content">
                                    {{
                                        movie.age_restriction
                                            ? movie.age_restriction + ''
                                            : 'Нет возрастных ограничений'
                                    }}+
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="movie__info-chapter">
                        <h1 class="movie__info-title text_24-bold">Cъёмочная группа</h1>
                        <ul class="movie__info-list text_16 flex">
                            <li class="movie__info-item">
                                <div class="movie__info-item-title">Актеры</div>
                                <div class="movie__info-item-content flex-c">
                                    <span v-for="person of movie.persons" :key="person.id">
                                        {{ person.name_russian
                                        }}<span v-if="person !== movie.persons[movie.persons.length - 1]">,</span></span
                                    >
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="movie__user-rating">
                <div class="movie__user-rating-title text_20-bold">Как вам фильм?</div>
                <p v-if="userRating === 0" class="movie__user-rating-desc">Оцените фильм</p>
                <p v-if="userRating !== 0" class="movie__user-rating-desc">
                    Ваша оценка:
                    <span class="text_20">{{ userRating }}</span>
                </p>
                <div class="movie__user-rating-wrapper flex">
                    <div class="movie__user-rating-select" @click="setUserRating">
                        <input id="radio-10" name="rating" type="radio" value="10" />
                        <label for="radio-10" class="text_28"></label>
                        <input id="radio-9" name="rating" type="radio" value="9" />
                        <label for="radio-9" class="text_28"></label>
                        <input id="radio-8" name="rating" type="radio" value="8" />
                        <label for="radio-8" class="text_28"></label>
                        <input id="radio-7" name="rating" type="radio" value="7" />
                        <label for="radio-7" class="text_28"></label>
                        <input id="radio-6" name="rating" type="radio" value="6" />
                        <label for="radio-6" class="text_28"></label>
                        <input id="radio-5" name="rating" type="radio" value="5" />
                        <label for="radio-5" class="text_28"></label>
                        <input id="radio-4" name="rating" type="radio" value="4" />
                        <label for="radio-4" class="text_28"></label>
                        <input id="radio-3" name="rating" type="radio" value="3" />
                        <label for="radio-3" class="text_28"></label>
                        <input id="radio-2" name="rating" type="radio" value="2" />
                        <label for="radio-2" class="text_28"></label>
                        <input id="radio-1" name="rating" type="radio" value="1" />
                        <label for="radio-1" class="text_28"></label>
                    </div>
                </div>
            </div>
            <div class="movie__similar">
                <SiteChapter :title="'Похожие'">
                    <SitePoster v-for="similar of similarMovies" :key="similar.id" :movie="similar"></SitePoster>
                </SiteChapter>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    asyncData({ route, store }) {
        const movies = store.state.movies
        const genres = store.state.genres

        const movie = movies.find(
            (f) =>
                String(f.name_original)
                    .toLowerCase()
                    .replace(/[^0-9a-zA-Z]/gi, '-')
                    .split('-')
                    .filter((f) => f)
                    .join('-') === route.params.slug
        )

        if (movie) {
            const similarMovies = movies.filter((f) => f.genres[0].id === movie.genres[0].id && f !== movie)
            return { movie, similarMovies, genres }
        }
    },
    data() {
        return {
            currentTab: 1,
            playerOpen: false,
            userRating: 0,
        }
    },
    computed: {
        checkColorRating() {
            if (this.movie.rating_kp >= 8) {
                return 'rgb(126, 198, 86)'
            }
            if (this.movie.rating_kp < 8) {
                return 'rgb(240, 133, 37)'
            }
            return 'transparent'
        },
        checkGenres() {
            return this.genres.filter((f) => this.movie.genres.find((a) => a.id === f.id))
        },
        checkMovieRating() {
            return String(this.movie.rating_kp).length === 1 ? this.movie.rating_kp + '.0' : this.movie.rating_kp
        },
    },
    methods: {
        openModalPlayer(open) {
            this.playerOpen = open
        },
        setUserRating() {
            const stars = document.querySelectorAll('input[name="rating"]')
            for (const select of stars) {
                if (select.checked && this.userRating !== select.value) {
                    this.userRating = select.value
                }
            }
        },
    },
}
</script>
<style lang="less">
.movie {
    padding-top: 50px;
    position: relative;
    &__main {
        gap: 40px;
        padding-top: 180px;
        align-items: flex-end;
        margin-bottom: 80px;
        z-index: 10;
        @media @md {
            padding-top: 0;
            flex-direction: column;
            align-items: center;
        }
    }
    &__background {
        position: absolute;
        right: 0;
        top: 0;
        z-index: -1;
        &-img {
            height: 100%;
        }
        @media @md {
            display: none;
        }
        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            background: linear-gradient(
                90deg,
                #000 3.31%,
                rgba(0, 0, 0, 0.99) 7.71%,
                rgba(0, 0, 0, 0.96) 12.11%,
                rgba(0, 0, 0, 0.91) 16.51%,
                rgba(0, 0, 0, 0.85) 20.91%,
                rgba(0, 0, 0, 0.76) 25.31%,
                rgba(0, 0, 0, 0.67) 29.71%,
                rgba(0, 0, 0, 0.55) 34.11%,
                rgba(0, 0, 0, 0.44) 38.52%,
                rgba(0, 0, 0, 0.33) 42.92%,
                rgba(0, 0, 0, 0.23) 47.32%,
                rgba(0, 0, 0, 0.15) 51.72%,
                rgba(0, 0, 0, 0.08) 56.12%,
                rgba(0, 0, 0, 0.03) 60.52%,
                rgba(0, 0, 0, 0.01) 64.92%,
                transparent 69.32%
            );
        }
        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            bottom: 0;
            background: linear-gradient(
                180deg,
                transparent 50%,
                transparent 52.63%,
                rgba(0, 0, 0, 0.03) 55.25%,
                rgba(0, 0, 0, 0.08) 57.88%,
                rgba(0, 0, 0, 0.14) 60.51%,
                rgba(0, 0, 0, 0.23) 63.13%,
                rgba(0, 0, 0, 0.33) 65.76%,
                rgba(0, 0, 0, 0.44) 68.39%,
                rgba(0, 0, 0, 0.55) 71.01%,
                rgba(0, 0, 0, 0.66) 73.64%,
                rgba(0, 0, 0, 0.77) 76.27%,
                rgba(0, 0, 0, 0.85) 78.89%,
                rgba(0, 0, 0, 0.92) 81.52%,
                rgba(0, 0, 0, 0.96) 84.15%,
                rgba(0, 0, 0, 0.99) 86.77%,
                #000 89.4%
            );
        }
    }
    &__poster {
        width: 300px;
        height: 400px;
        border-radius: 12px;
        @media @notmd {
            display: none;
        }
    }
    &__name {
        margin-bottom: 20px;
    }
    &__content {
        width: 600px;
        @media @md {
            width: 100%;
        }
        &-top {
            gap: 20px;
            color: @l-gray;
            margin-bottom: 15px;
            flex-wrap: wrap;
            @media @sm {
                gap: 10px 15px;
            }
        }
        &-rating {
            color: @white;
            padding: 5px 10px;
            border-radius: 12px;
        }
        &-desc {
            margin-bottom: 15px;
            max-width: 400px;
            @media @md {
                max-width: 100%;
            }
            &-show {
                color: @red;
                cursor: pointer;
                gap: 10px;
                display: inline-flex;
                align-items: center;
            }
        }
        &-persons {
            color: @l-gray;
            gap: 10px;
            margin-bottom: 25px;
            flex-wrap: wrap;
            @media (max-width: 580px) {
                flex-direction: column;
                align-items: flex-start;
            }
        }
        &-person {
            color: @white;
        }
    }
    &__watch {
        gap: 20px;
        &-main {
            flex-grow: 1;
            gap: 20px;
            width: 100%;
            .icon {
                margin-right: 10px;
            }
            @media (max-width: 580px) {
                flex-direction: column;
            }
        }
        &-additionally {
            color: @white;
            @media (max-width: 580px) {
                width: 100%;
            }
        }
        @media (max-width: 580px) {
            flex-direction: column;
        }
    }
    &__info {
        margin-bottom: 80px;
        &-tabs {
            gap: 30px;
            border-bottom: 1px solid @gray;
            margin-bottom: 20px;
        }
        &-tab {
            color: @l-gray;
            height: 50px;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
                color: @white;
            }
        }
        &-content {
            gap: 50px;
            @media (max-width: 900px) {
                flex-direction: column;
            }
        }
        &-title {
            margin-bottom: 20px;
        }
        &-list {
            flex-direction: column;
            gap: 10px;
        }
        &-item {
            &-title {
                color: @l-gray;
                margin-bottom: 5px;
            }
            &-content {
                gap: 10px;
                flex-wrap: wrap;
                a {
                    position: relative;
                    color: @white;
                    transition: 0.3s;
                    &::after {
                        content: '';
                        position: absolute;
                        width: 100%;
                        left: 0;
                        bottom: 0;
                        height: 1px;
                        background: @white;
                    }
                    &:hover {
                        opacity: 0.8;
                    }
                }
            }
        }
    }
    &__user-rating {
        padding: 30px 20px;
        background: @d-gray;
        color: @white;
        margin-bottom: 50px;
        width: 50%;
        border-radius: 12px;
        @media @md {
            width: 100%;
        }
        &-title {
            margin-bottom: 10px;
        }
        &-desc {
            color: @l-gray;
            margin-bottom: 10px;
            span {
                color: @white;
            }
        }
        &-select {
            overflow: hidden;
            input {
                display: none;
            }
            label {
                color: @l-gray;
                cursor: pointer;
                float: right;
            }
            label::before {
                content: '★';
            }
            label:hover,
            label:hover ~ label,
            input:checked ~ label {
                color: @white;
            }
        }
    }
    &__similar {
        .chapter__title {
            svg {
                display: none;
            }
        }
    }
}
</style>
