<template>
    <div class="search-poster">
        <nuxt-link
            :to="
                `/movie/${String(movie.name_original)
                    .toLowerCase()
                    .replace(/[^0-9a-zA-Z]/gi, '-')}`
                    .split('-')
                    .filter((f) => f)
                    .join('-')
            "
            class="flex"
        >
            <img :src="movie.small_poster" alt="poster" class="search-poster__img" />
            <div class="search-poster__title text_16-bold">{{ movie.name_russian }}</div>
        </nuxt-link>
    </div>
</template>
<script>
export default {
    props: {
        movie: {
            type: Object,
            default() {
                return {}
            },
        },
    },
}
</script>
<style lang="less">
.search-poster {
    padding: 10px;
    border-radius: 12px;
    transition: 0.3s;
    &:hover {
        background: @gray;
    }
    &__img {
        height: 120px;
        width: 100px;
        border-radius: 10px;
        border: 1px solid @gray;
        transition: 0.3s;
        margin-right: 10px;
        @media @md {
            height: 100px;
            width: 80px;
        }
        @media @sm {
            height: 90px;
            width: 60px;
        }
    }
}
</style>
