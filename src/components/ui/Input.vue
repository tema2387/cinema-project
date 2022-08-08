<template>
    <div class="input">
        <label>
            <span class="input__name">{{ name }}</span>
            <input type="text" class="input__field" />
        </label>
    </div>
</template>
<script>
export default {
    name: 'Input',
    props: {
        name: {
            type: String,
            default: 'Поле ввода',
        },
    },
}
</script>
<style lang="less">
.input {
    &__field {
        width: 100%;
        margin-top: 5px;
    }
}
</style>
