<script>
import FormProduct from './FormProduct.vue';
export default {
    name: 'Hello',
    components: {
        FormProduct
    }
}
</script>

<template>
    <div>
        <h1 class="container">Hello <span>Classe 89</span></h1>
        <FormProduct/>
    </div>
</template>

<style lang="scss" scoped>
    h1 {
        color: red;

        span {
            color: blue;
        }
    }
</style>