<template>
    <div class="main">
        <section class="slider-main">
            <splide :options="sliderOptions">
                <splide-slide v-for="slide of filterSlide" :key="slide.id">
                    <nuxt-link
                        :to="
                            `/movie/${String(slide.name_original)
                                .toLowerCase()
                                .replace(/[^0-9a-zA-Z]/gi, '-')}`
                                .split('-')
                                .filter((f) => f)
                                .join('-')
                        "
                    >
                        <div class="slide">
                            <img :src="slide.big_poster" alt="Слайд" class="slide__img" />
                            <div class="slide__content text_16 flex-c">
                                <span class="slide__rating">{{
                                    String(slide.rating_kp).length === 1 ? slide.rating_kp + '.0' : slide.rating_kp
                                }}</span>
                                <span class="slide__year">{{ slide.year }}</span>
                                <span class="slide__genre">{{ slide.genres[0].name_ru }}</span>
                                <span class="slide__age">{{ slide.age_restriction }}+</span>
                            </div>
                        </div>
                    </nuxt-link>
                </splide-slide>
            </splide>
        </section>
        <section class="section-genres">
            <div class="container">
                <SiteChapter :title="'Жанры'" :to="'/collection/genres'">
                    <SitePoster v-for="genre of genres" :key="genre.id" :genres="genre"></SitePoster>
                </SiteChapter>
            </div>
        </section>
        <section class="action">
            <div class="container">
                <SiteChapter :title="'Боевики'" :to="'/genres/action'">
                    <SitePoster v-for="movie of filterActionMovie" :key="movie.id" :movie="movie" />
                </SiteChapter>
            </div>
        </section>
        <section class="detective">
            <div class="container">
                <SiteChapter :title="'Детектив'" :to="'/genres/detective'">
                    <SitePoster v-for="movie of filterDetective" :key="movie.id" :movie="movie" />
                </SiteChapter>
            </div>
        </section>
        <section class="fantasy">
            <div class="container">
                <SiteChapter :title="'Фэнтези'" :to="'/genres/fantasy'">
                    <SitePoster v-for="movie of filterFantasy" :key="movie.id" :movie="movie" />
                </SiteChapter>
            </div>
        </section>
        <section class="drama">
            <div class="container">
                <SiteChapter :title="'Драма'" :to="'/genres/drama'">
                    <SitePoster v-for="movie of filterDrama" :key="movie.id" :movie="movie" />
                </SiteChapter>
            </div>
        </section>
        <section class="adventures">
            <div class="container">
                <SiteChapter :title="'Приключения'" :to="'/genres/adventures'">
                    <SitePoster v-for="movie of filterAdventures" :key="movie.id" :movie="movie" />
                </SiteChapter>
            </div>
        </section>
        <section class="comedy">
            <div class="container">
                <SiteChapter :title="'Комедия'" :to="'/genres/comedy'">
                    <SitePoster v-for="movie of filterComedy" :key="movie.id" :movie="movie" />
                </SiteChapter>
            </div>
        </section>
        <section class="military">
            <div class="container">
                <SiteChapter :title="'Военный'" :to="'/genres/military'">
                    <SitePoster v-for="movie of filterMilitary" :key="movie.id" :movie="movie" />
                </SiteChapter>
            </div>
        </section>
        <section class="more-movie text_20-bold">
            <div class="container">
                <UiButton :to="'/collection/genres'" :size="'xl'">Больше жанров</UiButton>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    name: 'Index',
    asyncData({ store }) {
        const movies = store.state.movies
        const genres = store.state.genres

        return { movies, genres }
    },
    data() {
        return {
            sliderOptions: {
                type: 'loop',
                gap: 20,
                pagination: false,
                updateOnMove: true,
                speed: 1000,
                autoplay: true,
                perPage: 1,
                padding: { left: '25%', right: '25%' },
                breakpoints: {
                    768: {
                        padding: { left: '20%', right: '20%' },
                    },
                    480: {
                        arrows: false,
                        gap: 10,
                        padding: { left: '15%', right: '15%' },
                    },
                },
            },
        }
    },
    computed: {
        filterActionMovie() {
            return this.movies.filter((f) => f.genres.find((f) => f.name_ru === 'боевик')).slice(0, 20)
        },
        filterDetective() {
            return this.movies.filter((f) => f.genres.find((f) => f.name_ru === 'детектив')).slice(0, 20)
        },
        filterFantasy() {
            return this.movies.filter((f) => f.genres.find((f) => f.name_ru === 'фэнтези')).slice(0, 20)
        },
        filterDrama() {
            return this.movies.filter((f) => f.genres.find((f) => f.name_ru === 'драма')).slice(0, 20)
        },
        filterAdventures() {
            return this.movies.filter((f) => f.genres.find((f) => f.name_ru === 'приключения')).slice(0, 20)
        },
        filterComedy() {
            return this.movies.filter((f) => f.genres.find((f) => f.name_ru === 'комедия')).slice(0, 20)
        },
        filterMilitary() {
            return this.movies.filter((f) => f.genres.find((f) => f.name_ru === 'военный')).slice(0, 20)
        },
        filterSlide() {
            return this.movies.slice(0, 10)
        },
        checkColorRating(slide) {
            if (this.movie.rating_kp >= 8) {
                return 'rgb(126, 198, 86)'
            }
            if (this.movie.rating_kp < 8) {
                return 'rgb(240, 133, 37)'
            }
            return 'transparent'
        },
    },
    mounted() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-animation')
                }
            })
        })
        document.querySelectorAll('section').forEach((section) => observer.observe(section))
    },
}
</script>
<style lang="less">
.main {
    padding-top: 60px;
}

.section-genres,
.action,
.detective,
.fantasy,
.drama,
.adventures,
.comedy,
.military,
.slider-main {
    margin-bottom: 50px;
    transition: 0.3s;
    opacity: 0;
    transform: translateY(30%);
    @media (max-width: 1280px) {
        .container {
            padding-right: 0;
            @media @md {
                padding-right: 0;
            }
            @media @sm {
                padding-right: 0;
            }
        }
    }
}

.slider-main {
    .splide__list {
        height: 600px;
        @media @md {
            height: 400px;
        }
        @media @sm {
            height: 250px;
        }
    }
    .slide {
        position: relative;
        height: 100%;
        width: 100%;
        border-radius: 12px;
        border: 1px solid @gray;
        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            bottom: 0;
            background: linear-gradient(
                180deg,
                transparent 60%,
                transparent 62%,
                rgba(0, 0, 0, 0.14),
                rgba(0, 0, 0, 0.18),
                rgba(0, 0, 0, 0.22),
                rgba(0, 0, 0, 0.26),
                rgba(0, 0, 0, 0.3),
                rgba(0, 0, 0, 0.44),
                rgba(0, 0, 0, 0.48),
                rgba(0, 0, 0, 0.52),
                rgba(0, 0, 0, 0.56),
                rgba(0, 0, 0, 0.6),
                rgba(0, 0, 0, 0.64),
                rgba(0, 0, 0, 0.68),
                rgba(0, 0, 0, 0.72)
            );
            z-index: 5;
        }
        &__img {
            border-radius: 12px;
            height: 100%;
            width: 100%;
        }
        &__content {
            position: absolute;
            bottom: 20px;
            left: 20px;
            gap: 20px;
            z-index: 10;
            flex-wrap: wrap;
            @media @md {
                gap: 15px;
            }
            @media @sm {
                gap: 10px;
                left: 10px;
                bottom: 10px;
            }
        }
        &__rating {
            background: @gray;
            padding: 10px 15px;
            border-radius: 12px;
            @media @sm {
                padding: 5px 10px;
            }
        }
    }
}

.section-genres {
    .poster {
        width: 200px;
        height: 100px;
        @media @md {
            width: 180px;
            height: 80px;
        }
        @media @sm {
            width: 140px;
            height: 60;
        }
    }
}
</style>
