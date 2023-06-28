<script>
import axios from 'axios';
import AppCard from '../components/AppCard.vue';
import { store } from '../store';
export default {
    name: "AppRestaurantMenu",
    data() {
        return {
            store,
            quantity: 1,
        }
    },
    components: {
        AppCard
    },
    methods: {
        getMenu() {
            axios.get(`${this.store.apiBaseUrl}${this.store.apiUrls.products}/${this.$route.params.slug}`)
                .then((response) => {
                    this.store.products = response.data.results
                }
                )
        },

    },
    created() {
        this.getMenu();
    }
}
</script>


<template>
    <section class="menu">
        <div class="container mt-5 d-flex gap-4 flex-wrap container">
            <AppCard v-for="product in store.products" :data="product" />
        </div>
    </section>
</template>


<style lang="scss" scoped>
.menu {
    margin-top: 85px;
}
</style>