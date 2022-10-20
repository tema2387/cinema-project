<template>
    <div class="input">
        <label>
            <span v-if="input.name" class="input__name text_16">{{ input.name }}</span>
            <input
                v-model="input.value"
                :class="{ 'border-error': input.border }"
                :placeholder="input.placeholder"
                class="input__field text_14"
                type="text"
                @keyup.enter="$emit('enter', input.value)"
            />
            <slot></slot>
        </label>
    </div>
</template>
<script>
export default {
    name: 'Input',
    props: {
        input: {
            type: Object,
            default() {
                return {}
            },
        },
    },
}
</script>
<style lang="less">
.input {
    &__field {
        width: 100%;
        margin-top: 5px;
        min-height: 45px;
        padding: 5px 5px 5px 10px;
        outline: none;
        border: 1px solid @primary;
        border-radius: 10px;
        &:focus {
            border: 1px solid @red;
        }
    }
}
</style>
