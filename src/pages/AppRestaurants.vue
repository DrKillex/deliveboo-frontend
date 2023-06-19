<!-- pagina about -->
<script>
import { store } from '../store';
import axios from 'axios';

export default {
    name: "AppRestaurants",
    data() {
        return {
            store,
            restaurants: ""
        }
    },
    methods: {
        getData() {
            axios.get(this.store.apiBaseUrl + this.store.apiUrls.restaurants)
                .then((response) => {
                    console.log(response.data.results);
                    this.restaurants = response.data.results
                })
        }
    },
    created() {
        this.getData();
    }
}
</script>


<template>
    <section class="container">
        <h1>Ristoranti</h1>
        <div class="d-flex gap-4 flex-wrap">
            <div v-for="restaurant in restaurants" class="card" style="width: 18rem;">
                <img :src="this.store.storage + restaurant.img" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{ restaurant.name }}</h5>
                    <p class="card-text">{{ restaurant.description }}</p>
                    <div>Telefono: {{ restaurant.telephone }} </div>
                    <div>P Iva: {{ restaurant.p_iva }} </div>
                    <div>Email: {{ restaurant.email }} </div>
                    <div>Orario: {{ restaurant.opening_hours }} </div>
                    <div>Indirizzo: {{ restaurant.address }} </div>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>

        </div>
    </section>
</template>


<style scoped></style>