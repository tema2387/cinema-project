<template>
    <div class="select">
        <div
            :class="{ 'select-dropdown-open': select.open }"
            class="select__current flex-c"
            @click="$emit('open', select.name)"
        >
            {{ select.value !== null && select.value !== select.options[0] ? select.value : select.name }}
            <svg-icon name="arrow-next" width="10" height="10"></svg-icon>
        </div>
        <transition name="fade">
            <div v-if="select.open" class="select__dropdown">
                <div class="select__options flex">
                    <span
                        v-for="(option, index) of select.options"
                        :key="index"
                        :class="{
                            'select__option--selected':
                                select.value === option || (index === 0 && select.value === null),
                        }"
                        class="select__option flex-c"
                        @click="chooseOption(option)"
                        >{{ option }}
                        <svg-icon
                            v-if="select.value === option || (index === 0 && select.value === null)"
                            name="checkmark"
                            width="20"
                            height="20"
                    /></span>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    props: {
        select: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    methods: {
        chooseOption(option) {
            this.select.value = option
            this.select.open = false
            this.$emit('option', option, this.select.name)
        },
    },
}
</script>
<style lang="less">
.select {
    position: relative;
    &__current {
        padding: 10px 20px;
        border: 1px solid @gray;
        cursor: pointer;
        gap: 20px;
        transition: 0.3s;
        .icon {
            transition: 0.3s;
            transform: rotate(90deg);
        }
        &:hover {
            transform: scale(1.05);
        }
    }
    &__dropdown {
        position: absolute;
        top: 110%;
        background: @gray;
        min-width: 250px;
        border-radius: 10px;
        z-index: 10;
    }
    &__options {
        flex-direction: column;
    }
    &__option {
        padding: 10px;
        cursor: pointer;
        justify-content: space-between;
        border-radius: 10px;
        &--selected {
            background: @l-gray;
        }
        &:hover {
            background: @l-gray;
        }
    }
}
</style>
