<template>
    <div class="collection">
        <div class="container">
            <div class="collection__top">
                <h1 class="collection__title text_28-bold">{{ title }}</h1>
                <p class="collection__text text_18">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptatibus corrupti quas nam
                    repellendus quaerat libero at sapiente necessitatibus quis, architecto sequi esse iure voluptatum
                    nesciunt. Rerum, qui? Itaque, quisquam?
                </p>
            </div>
            <div class="collection__content">
                <div class="collection__collections">
                    <template v-if="$route.params.slug === 'genres'">
                        <SitePoster v-for="c of filteredMaxLengthCollection" :key="c.id" :genres="c"></SitePoster>
                    </template>
                    <template v-if="$route.params.slug === 'new'">
                        <SitePoster v-for="c of filteredMaxLengthCollection" :key="c.id" :movie="c"></SitePoster>
                    </template>
                </div>
                <div class="collection__more-collections text_20-bold">
                    <UiButton
                        :disabled="maxLengthCollection >= collection.length"
                        :size="'xl'"
                        @click.native="maxLengthCollection += 10"
                        >Больше подборок</UiButton
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    asyncData({ route, store }) {
        const movies = store.state.movies
        const genres = store.state.genres

        let newMovies = null
        let title = null
        let collection = null

        // динамические страницы
        if (route.params.slug === 'genres') {
            title = 'Жанры'
            collection = genres
        }
        if (route.params.slug === 'new') {
            newMovies = movies.filter((f) => f.year > 2000)
            title = 'Новинки'
            collection = newMovies
        }

        return { collection, title }
    },
    data() {
        return {
            maxLengthCollection: 10,
        }
    },
    computed: {
        filteredMaxLengthCollection() {
            return this.collection.filter((f, i) => {
                if (i + 1 <= this.maxLengthCollection) return f
            })
        },
    },
}
</script>
<style lang="less">
.collection {
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
}
</style>
