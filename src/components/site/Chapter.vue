<template>
    <div class="chapter">
        <div class="chapter__title text_24-bold">
            <nuxt-link :to="`${to}`">{{ title }}<svg-icon name="arrow-next" height="15" width="15" /></nuxt-link>
        </div>
        <div ref="chapterList" class="chapter__list flex-c" @scroll="setScrollValue">
            <transition name="fade">
                <div v-if="scrollValue !== 0" class="chapter__list-arrow-prev flex-c" @click="moveLeft">
                    <svg-icon name="arrow-prev" width="20" height="20"></svg-icon>
                </div>
            </transition>
            <slot></slot>
            <transition name="fade">
                <div v-if="scrollValue !== maxScrollValue" class="chapter__list-arrow-next flex-c" @click="moveRight">
                    <svg-icon name="arrow-next" width="20" height="20"></svg-icon>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Название',
        },
        to: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            scrollValue: 0,
            maxScrollValue: 0,
        }
    },
    watch: {
        scrollValue() {
            this.maxScrollValue = this.$refs.chapterList.scrollWidth - this.$refs.chapterList.clientWidth
        },
    },
    mounted() {
        this.maxScrollValue = this.$refs.chapterList.scrollWidth - this.$refs.chapterList.clientWidth
    },
    methods: {
        setScrollValue(e) {
            this.scrollValue = e.target.scrollLeft
        },
        moveLeft() {
            const scrollLeftValue = this.scrollValue - 800
            this.$refs.chapterList.scrollTo({
                left: scrollLeftValue,
                behavior: 'smooth',
            })
        },
        moveRight() {
            const scrollRightValue = this.scrollValue + 800
            this.$refs.chapterList.scrollTo({
                left: scrollRightValue,
                behavior: 'smooth',
            })
        },
    },
}
</script>
<style lang="less">
.chapter {
    position: relative;
    &__title {
        margin-bottom: 10px;
        .icon {
            transition: 0.3s;
            opacity: 0;
        }
        a {
            display: inline-flex;
            align-items: center;
            gap: 20px;
        }
    }
    &__list {
        overflow-x: auto;
        gap: 20px;
        transition: 0.3s;
        &::-webkit-scrollbar {
            width: 0;
        }
        &-arrow-prev {
            backdrop-filter: blur(13px);
            width: 50px;
            cursor: pointer;
            justify-content: center;
            background-color: @bg-d-gray;
            height: 80px;
            opacity: 0;
            position: absolute;
            left: 20px;
            transition: 0.3s;
            z-index: 10;
            color: @white;
            &:hover {
                transform: scale(1.15);
            }
            @media @md {
                display: none;
            }
        }
        &-arrow-next {
            width: 50px;
            backdrop-filter: blur(13px);
            justify-content: center;
            background-color: @bg-d-gray;
            cursor: pointer;
            height: 80px;
            opacity: 0;
            position: absolute;
            right: 20px;
            transition: 0.3s;
            z-index: 10;
            color: @white;
            &:hover {
                transform: scale(1.15);
            }
            @media @md {
                display: none;
            }
        }
        &:hover {
            .chapter__list-arrow-prev {
                opacity: 1;
            }
            .chapter__list-arrow-next {
                opacity: 1;
            }
        }
    }
    &:hover {
        .chapter__title {
            .icon {
                opacity: 1;
            }
        }
    }
}
</style>
