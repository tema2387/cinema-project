<template>
    <header class="header">HEADER</header>
</template>
<script>
export default {
    name: 'Header',
}
</script>
<style lang="less">
.header {
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #ccc;
    padding: 20px;
    z-index: @mainZ;
}
</style>
