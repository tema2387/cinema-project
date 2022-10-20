<template>
    <div class="poster">
        <nuxt-link :to="checkPosterLink">
            <img :src="checkPosterImg" alt="poster" class="poster__img" />
            <span v-if="genres.id" class="poster__title text_20-bold">{{ genres.name_ru }}</span>
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
        genres: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    computed: {
        checkPosterLink() {
            if (this.movie.id) {
                return `/movie/${String(this.movie.name_original)
                    .toLowerCase()
                    .replace(/[^0-9a-zA-Z]/gi, '-')}`
                    .split('-')
                    .filter((f) => f)
                    .join('-')
            }
            if (this.genres.id) {
                return `/genres/${this.genres.name_eng}`
            }
            return '/'
        },
        checkPosterImg() {
            if (this.movie.id) {
                return this.movie.small_poster
            }
            if (this.genres.id) {
                return this.genres.poster
            }
            return 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'
        },
    },
}
</script>
<style lang="less">
.poster {
    flex-shrink: 0;
    position: relative;
    height: 300px;
    width: 250px;
    border-radius: 10px;
    border: 1px solid @gray;
    @media @md {
        height: 250px;
        width: 180px;
    }
    @media @sm {
        height: 210px;
        width: 160px;
    }
    &__img {
        height: 100%;
        width: 100%;
        border-radius: 10px;
    }
    &__title {
        position: absolute;
        width: 100%;
        text-align: center;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
