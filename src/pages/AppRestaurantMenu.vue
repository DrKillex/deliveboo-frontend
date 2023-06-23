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
    <section>
        <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">name</th>
                    <th scope="col">price</th>
                    <th scope="col">quantity</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in store.cart">
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ quantity }}</td>
                    <td>
                        <ul class="list-unstyled d-flex gap-2">
                            <li><button>-</button></li>
                            <li><button>+</button></li>
                            <li><button>remove</button></li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </section>
    <section  class="d-flex gap-4 flex-wrap container">
            <AppCard v-for="product in store.products" :data="product" />
    </section>
</template>


<style scoped>

</style>