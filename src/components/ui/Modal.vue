<template>
    <transition name="fade">
        <div v-if="open" class="modal flex">
            <svg-icon name="close" width="30" height="30" class="modal__close" @click="$emit('open', false)" />
            <div class="modal__main">
                <div class="modal__title flex-c text_24">
                    <span class="flex">{{ name }}</span>
                    <svg-icon
                        name="close"
                        width="30"
                        height="30"
                        class="modal__close modal__close-mobile"
                        @click="$emit('open', false)"
                    />
                </div>
                <div class="modal__content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'Modal',
    props: {
        name: {
            type: String,
            default: 'Заголовок',
        },
        open: {
            type: Boolean,
            default: false,
        },
    },
}
</script>
<style lang="less">
.modal {
    left: 0;
    bottom: 0;
    z-index: 1000;
    position: absolute;
    backdrop-filter: blur(2px);
    height: 100vh;
    width: 100vw;
    justify-content: flex-end;
    &__close {
        background: @l-gray;
        border-radius: 50%;
        margin: 10px;
        width: 30px;
        padding: 5px;
        height: 30px;
        cursor: pointer;
        @media @md {
            display: none;
        }
        &-mobile {
            @media @md {
                display: block;
            }
            @media @notmd {
                display: none;
            }
        }
    }
    &__main {
        min-width: 600px;
        height: 100%;
        @media @md {
            min-width: 100%;
        }
    }
    &__title {
        background: @white;
        color: @primary;
        height: 50px;
        span {
            justify-content: center;
            flex-grow: 1;
        }
        @media @md {
            justify-content: space-between;
            span {
                justify-content: center;
                margin-left: 50px;
            }
        }
    }
    &__content {
        padding: 20px 20px 20px;
        height: calc(100vh - 50px);
        background: @bg-gray;
        overflow-y: auto;
        position: relative;
    }
}
</style>
