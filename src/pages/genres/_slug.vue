<template>
    <div class="genres">
        <div class="container">
            <div class="genres__top">
                <h1 class="genres__title text_28-bold">{{ title }}</h1>
                <p class="genres__text text_18">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptatibus corrupti quas nam
                    repellendus quaerat libero at sapiente necessitatibus quis, architecto sequi esse iure voluptatum
                    nesciunt. Rerum, qui? Itaque, quisquam?
                </p>
            </div>
            <div class="genres__content">
                <div class="genres__filters flex-c">
                    <div class="genres__filters-left flex-c">
                        <UiSelect :select="ratingSelect" @open="showCurrentFilter" @option="addFilter"></UiSelect>
                        <UiSelect :select="yearSelect" @open="showCurrentFilter" @option="addFilter"></UiSelect>
                    </div>
                    <div class="genres__filters-right">
                        <UiSelect :select="defaultSelect" @open="showCurrentFilter" @option="addFilter"></UiSelect>
                    </div>
                </div>
                <div class="genres__open-filters">
                    <div class="genres__open-filters-main text_20-bold">
                        <UiButton :size="'lg'" @click.native="filtersMenuOpen = true"
                            ><svg-icon name="filter" width="15" height="15"></svg-icon>Фильтры</UiButton
                        >
                    </div>
                    <UiModal :open="filtersMenuOpen" :name="'Фильтры'" @open="openFiltersMenu">
                        <div class="modal-filters">
                            <ul class="modal-filters__list">
                                <li class="modal-filters__item">
                                    <UiSelect
                                        :select="ratingSelect"
                                        @open="showCurrentFilter"
                                        @option="addFilter"
                                    ></UiSelect>
                                </li>
                                <li class="modal-filters__item">
                                    <UiSelect
                                        :select="yearSelect"
                                        @open="showCurrentFilter"
                                        @option="addFilter"
                                    ></UiSelect>
                                </li>
                                <li class="modal-filters__item">
                                    <UiSelect
                                        :select="defaultSelect"
                                        @open="showCurrentFilter"
                                        @option="addFilter"
                                    ></UiSelect>
                                </li>
                            </ul>
                            <div class="modal-filters__show text_20-bold">
                                <UiButton :size="'xl'" @click.native="filtersMenuOpen = false"
                                    >Показать результаты | {{ filterMovies.length }}</UiButton
                                >
                            </div>
                        </div>
                    </UiModal>
                </div>
                <template v-if="filterMovies.length">
                    <div class="genres__movies">
                        <SitePoster
                            v-for="movie of checkMaxLengthFilteredMovies"
                            :key="movie.id"
                            :movie="movie"
                        ></SitePoster>
                    </div>
                </template>
                <div v-if="!filterMovies.length" class="genres__warning text_24-bold">
                    Извините, по вашему запросу ничего не найдено
                </div>
                <div class="genres__more-movies text_20-bold">
                    <UiButton
                        :disabled="maxMoviesLength >= filterMovies.length"
                        :size="'xl'"
                        @click.native="maxMoviesLength += 10"
                        >Больше фильмов</UiButton
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    asyncData({ route, store }) {
        let movies = store.state.movies
        let title = ''

        // динамические страницы
        if (route.params.slug === 'action') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'боевик'))
            title = 'Боевик'
        }
        if (route.params.slug === 'thriller') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'триллер'))
            title = 'Триллер'
        }
        if (route.params.slug === 'fantasy') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'фэнтези'))
            title = 'Фэнтези'
        }

        if (route.params.slug === 'adventure') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'приключения'))
            title = 'Приключения'
        }

        if (route.params.slug === 'comedy') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'комедия'))
            title = 'Комедия'
        }
        if (route.params.slug === 'drama') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'драма'))
            title = 'Драма'
        }
        if (route.params.slug === 'melodrama') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'мелодрама'))
            title = 'Мелодрама'
        }
        if (route.params.slug === 'cartoon') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'мультфильм'))
            title = 'Мультфильм'
        }

        if (route.params.slug === 'detective') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'детектив'))
            title = 'Детектив'
        }
        if (route.params.slug === 'anime') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'аниме'))
            title = 'Аниме'
        }
        if (route.params.slug === 'crime') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'криминал'))
            title = 'Криминал'
        }
        if (route.params.slug === 'biography') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'биография'))
            title = 'Биография'
        }

        if (route.params.slug === 'history') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'история'))
            title = 'История'
        }
        if (route.params.slug === 'horror') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'ужасы'))
            title = 'Ужасы'
        }
        if (route.params.slug === 'sport') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'спорт'))
            title = 'Спорт'
        }
        if (route.params.slug === 'military') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'военный'))
            title = 'Военный'
        }

        if (route.params.slug === 'music') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'музыка'))
            title = 'Музыка'
        }
        if (route.params.slug === 'western') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'вестерн'))
            title = 'Вестерн'
        }
        if (route.params.slug === 'fantasy-2') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'фантастика'))
            title = 'Фантастика'
        }
        if (route.params.slug === 'family') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'семейный'))
            title = 'Семейный'
        }

        if (route.params.slug === 'musical') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'мюзикл'))
            title = 'Мюзикл'
        }
        if (route.params.slug === 'noir') {
            movies = movies.filter((f) => f.genres.find((f) => f.name_ru === 'фильм-нуар'))
            title = 'Фильм-нуар'
        }

        return { movies, title }
    },
    data() {
        return {
            ratingSelect: {
                name: 'Рейтинг',
                options: ['Любой', 'От 6.0', 'От 7.0', 'От 8.0', 'От 9.0'],
                open: false,
                value: null,
            },
            defaultSelect: {
                name: 'Сортировка',
                options: ['По умолчанию', 'По рейтингу', 'По дате выхода'],
                open: false,
                value: null,
            },
            yearSelect: {
                name: 'Годы выхода',
                options: ['Любые', '2000-2009', '1990-1999', '1980-1989', '1970-1979'],
                open: false,
                value: null,
            },
            maxMoviesLength: 10,
            filters: [],
            filtersMenuOpen: false,
        }
    },
    computed: {
        filterMovies() {
            let filteredMovies = this.movies

            // Фильтр по Рейтингу
            if (this.filters.filter((f) => f.currentFilter === 'Любой').length) {
                filteredMovies = filteredMovies.filter((f) => f.rating_kp <= 10)
            }
            if (this.filters.filter((f) => f.currentFilter === 'От 6.0').length) {
                filteredMovies = filteredMovies.filter((f) => f.rating_kp >= 6)
            }
            if (this.filters.filter((f) => f.currentFilter === 'От 7.0').length) {
                filteredMovies = filteredMovies.filter((f) => f.rating_kp >= 7)
            }
            if (this.filters.filter((f) => f.currentFilter === 'От 8.0').length) {
                filteredMovies = filteredMovies.filter((f) => f.rating_kp >= 8)
            }
            if (this.filters.filter((f) => f.currentFilter === 'От 9.0').length) {
                filteredMovies = filteredMovies.filter((f) => f.rating_kp >= 9)
            }

            // Фильтр по Годам выхода
            if (this.filters.filter((f) => f.currentFilter === 'Любые').length) {
                filteredMovies = filteredMovies.filter((f) => f.year <= 2022)
            }
            if (this.filters.filter((f) => f.currentFilter === '1970-1979').length) {
                filteredMovies = filteredMovies.filter((f) => f.year >= 1970 && f.year <= 1979)
            }
            if (this.filters.filter((f) => f.currentFilter === '1980-1989').length) {
                filteredMovies = filteredMovies.filter((f) => f.year >= 1980 && f.year <= 1989)
            }
            if (this.filters.filter((f) => f.currentFilter === '1990-1999').length) {
                filteredMovies = filteredMovies.filter((f) => f.year >= 1990 && f.year <= 1999)
            }
            if (this.filters.filter((f) => f.currentFilter === '2000-2009').length) {
                filteredMovies = filteredMovies.filter((f) => f.year >= 2000 && f.year <= 2009)
            }

            //  Фильтр сортировки
            if (this.filters.filter((f) => f.currentFilter === 'По умолчанию').length) {
                filteredMovies = filteredMovies.sort()
            }
            if (this.filters.filter((f) => f.currentFilter === 'По рейтингу').length) {
                filteredMovies = filteredMovies.sort((a, b) => b.rating_kp - a.rating_kp)
            }
            if (this.filters.filter((f) => f.currentFilter === 'По дате выхода').length) {
                filteredMovies = filteredMovies.sort((a, b) => b.year - a.year)
            }

            return filteredMovies
        },
        checkMaxLengthFilteredMovies() {
            return this.filterMovies.filter((f, i) => {
                if (i + 1 <= this.maxMoviesLength) return f
            })
        },
    },
    watch: {
        filterMovies() {
            this.maxMoviesLength = 10
        },
    },
    methods: {
        addFilter(currentFilter, currentSelect) {
            this.filters = this.filters.filter((f) => f.select !== currentSelect)
            this.filters.push({ currentFilter, select: currentSelect })
        },
        openFiltersMenu(open) {
            this.filtersMenuOpen = open
        },
        showCurrentFilter(currentSelect) {
            if (currentSelect === 'Рейтинг') {
                this.defaultSelect.open = false
                this.yearSelect.open = false
                this.ratingSelect.open = true
            }
            if (currentSelect === 'Сортировка') {
                this.yearSelect.open = false
                this.ratingSelect.open = false
                this.defaultSelect.open = true
            }
            if (currentSelect === 'Годы выхода') {
                this.defaultSelect.open = false
                this.ratingSelect.open = false
                this.yearSelect.open = true
            }
        },
    },
}
</script>
<style lang="less">
.genres {
    padding-top: 60px;
    .poster {
        width: 100%;
        height: 100%;
    }
    &__top {
        margin-bottom: 60px;
    }
    &__title {
        margin-bottom: 20px;
    }
    &__filters {
        margin-bottom: 40px;
        @media @md {
            display: none;
        }
        &-left {
            gap: 20px;
            flex-grow: 1;
        }
        &-right {
            .select__dropdown {
                right: 0;
            }
        }
    }
    &__open-filters {
        margin-bottom: 40px;
        &-main {
            .button {
                gap: 10px;
            }
        }
        @media @notmd {
            display: none;
        }
    }
    &__movies {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 40px 20px;
        margin-bottom: 30px;
        @media @md {
            grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 580px) {
            grid-template-columns: repeat(3, 1fr);
        }
        @media @sm {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    &__warning {
        text-align: center;
        margin-bottom: 20px;
    }
}

.modal-filters {
    &__list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;
    }
    &__item {
        .select {
            position: static;
        }
        .select__current {
            justify-content: space-between;
            background: @primary;
            border-radius: 10px;
            padding: 20px;
            &:hover {
                transform: scale(1);
            }
        }
        .select__dropdown {
            width: 100vw;
            padding: 20px;
            height: max-content;
            top: 0;
            left: 0;
            bottom: 0;
            margin-top: auto;
            background: @d-gray;
        }
    }
}
</style>
