<script>
import axios from 'axios';
import AppCard from '../components/AppCard.vue';
import { store } from '../store';
    export default {
        name: "AppRestaurantMenu",
        data() {
            return {
                store,
            }
        },
        components: {
            AppCard
        },
        methods: {
        getMenu() {
            console.log(this.store.selectedRestaurant)
            const data = {
                id: this.store.selectedRestaurant.id,
            };
            axios.post(this.store.apiBaseUrl + this.store.apiUrls.products, data)
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
    <section  class="d-flex gap-4 flex-wrap container">
            <AppCard v-for="product in store.products" :data="product" />
    </section>
</template>


<style scoped>

</style>