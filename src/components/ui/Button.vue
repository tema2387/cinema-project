<template>
    <component :is="componentType" :to="to" :type="type" :class="[setSize, setColor]" class="button"
        ><slot></slot
    ></component>
</template>
<script>
export default {
    name: 'Button',
    props: {
        size: {
            type: String,
            default: 'md',
        },
        to: {
            type: String,
            default: null,
        },
        type: {
            type: String,
            default: null,
        },
        color: {
            type: String,
            default: null,
        },
    },
    computed: {
        setSize() {
            return `button--${this.size}`
        },
        setColor() {
            return `button--${this.color}`
        },
        componentType() {
            if (this.to) {
                return 'nuxt-link'
            }
            return 'button'
        },
    },
}
</script>
<style lang="less">
.button {
    background: @secondary;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: @white;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    transition: 0.3s;
    &:hover {
        opacity: 0.8;
    }
    // размеры
    &--xl {
        height: 65px;
        padding: 0 20px;
    }
    &--lg {
        height: 50px;
        padding: 0 20px;
    }
    &--md {
        height: 30px;
        padding: 0 15px;
    }
    &--sm {
        height: 20px;
        padding: 0 10px;
    }
    // цвета
    &--red {
        background: @secondary;
        color: @white;
    }
    &--gray {
        background: @l-gray;
        color: @white;
    }
    &--none {
        background: transparent;
        color: @white;
    }
}
</style>
