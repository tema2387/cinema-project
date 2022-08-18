<template>
    <button type="button" :class="setSize" class="button"><slot></slot></button>
</template>
<script>
export default {
    name: 'Button',
    props: {
        size: {
            type: String,
            default: 'md',
        },
    },
    computed: {
        setSize() {
            return `button--${this.size}`
        },
    },
}
</script>
<style lang="less">
.button {
    background: @secondary;
    color: @white;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    .trs(all);
    &:hover {
        opacity: 0.8;
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
}
</style>
