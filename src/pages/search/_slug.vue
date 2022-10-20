<template>
    <div class="search">
        <div class="container">
            <div class="search__top">
                <h1 class="search__title text_28-bold">Результаты поиска</h1>
            </div>
            <div class="search__content">
                <div v-if="movies.length" class="search__collections">
                    <SitePoster v-for="movie of filteredMaxLengthMovies" :key="movie.id" :movie="movie"></SitePoster>
                </div>
                <div v-if="!movies.length" class="search__warning text_24-bold">
                    Извините, по вашему запросу ничего не найдено
                </div>
                <div class="search__more text_20-bold">
                    <UiButton :disabled="maxLength >= movies.length" :size="'xl'" @click.native="maxLength += 10"
                        >Показать больше</UiButton
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

        if (route.params.slug !== undefined) {
            movies = movies.filter((f) => f.name_russian.toLowerCase().includes(route.params.slug.toLowerCase()))
        } else {
            movies = []
        }

        return { movies }
    },
    data() {
        return {
            maxLength: 10,
        }
    },
    computed: {
        filteredMaxLengthMovies() {
            return this.movies.filter((f, i) => {
                if (i + 1 <= this.maxLength) return f
            })
        },
    },
}
</script>
<style lang="less">
.search {
    padding-top: 60px;
    .poster__img {
        width: 100%;
        height: 100%;
        flex: 1;
    }
    &__top {
        margin-bottom: 60px;
    }
    &__title {
        margin-bottom: 20px;
    }
    &__collections {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 40px 20px;
        margin-bottom: 30px;
        @media @md {
            grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 580px) {
            grid-template-columns: repeat(3, 1fr);
        }
        @media @sm {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    &__warning {
        margin-bottom: 20px;
    }
}
</style>
