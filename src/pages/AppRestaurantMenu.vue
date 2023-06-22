<script>
import axios from 'axios';
import { store } from '../store';
    export default {
        name: "AppRestaurantMenu",
        data() {
            return {
                store,
            }
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
    <section>
        <div v-for="product in store.products">
            {{ product.name }}
        </div>
    </section>
</template>


<style scoped>

</style>