<!-- pagina about -->
<script>
import { store } from '../store';
import axios from 'axios';

export default {
    name: "AppRestaurants",
    data() {
        return {
            store,
            restaurants: "",
            categories: "",
        }
    },
    methods: {
        getData() {
            axios.get(this.store.apiBaseUrl + this.store.apiUrls.restaurants)
                .then((response) => {
                    console.log(response)
                    this.restaurants = response.data.results.restaurants
                    this.categories = response.data.results.categories
                    // let test=[]
                    // for (let i = 0; i < this.restaurants.length; i++) {
                    //     const category = this.restaurants[i].categories
                    //     for (let index = 0; index < category.length; index++) {
                    //         const categoryId = category[index].id
                    //         if (!test.includes(categoryId)) {
                    //             test.push(categoryId)
                    //             this.categories.push(category[index])
                    //         }
                    //     }
                    // }
                }
            )
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
        <div v-for="category in categories">{{ category.name }}</div>
        <div class="d-flex gap-4 flex-wrap">
            <div v-for="restaurant in restaurants" class="card" style="width: 18rem;">
                <img :src="restaurant.img" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{ restaurant.name }}</h5>
                    <p class="card-text">{{ restaurant.description }}</p>
                    <div>Telefono: {{ restaurant.telephone }} </div>
                    <div>P Iva: {{ restaurant.p_iva }} </div>
                    <span class="ir-badge me-1" v-for="category in restaurant.categories">{{ category.name }}</span>
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