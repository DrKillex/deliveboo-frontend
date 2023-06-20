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
            categoriesId: "",
            selectedCategories: []
        }
    },
    methods: {
        getData() {
            axios.get(this.store.apiBaseUrl + this.store.apiUrls.restaurants)
                .then((response) => {
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
        },
        addCategory(id) {
            if (this.selectedCategories.includes(id)) {
                const removeCategory = this.selectedCategories.indexOf(id)
                this.selectedCategories.splice(removeCategory, 1)
            } else {
                this.selectedCategories.push(id)
            }           
        },
        search(){            
            if(this.selectedCategories.length>0){
                return this.restaurants.filter((restaurant) => {
                    console.log(restaurant.name)
                    let control=[]
                    let categoriesId=[]
                    for (let index = 0; index < restaurant.categories.length; index++) {
                        categoriesId.push(restaurant.categories[index].id)
                    }
                    for (let index = 0; index < this.selectedCategories.length; index++) {
                        if(categoriesId.includes(this.selectedCategories[index])){
                            control.push(1)
                        } else {
                            control.push(0)
                        }
                    }
                    if(!control.includes(0)){
                        return restaurant
                    }         
                })
            } else {
                return this.restaurants
            }
        },
    },
    created() {
        this.getData();
    }
}
</script>


<template>
    <section class="container">
        <h1>Ristoranti</h1>
        <div>
            <ul class="list-unstyled text-center">
                <li v-on:click="myFilter" v-bind:class="{ active: selectedCategories.includes(category.id) }"
                    class="btn btn-primary m-3" v-for="category in categories" @click="addCategory(category.id)"> {{
                        category.name }}</li>
            </ul>
        </div>
        <div class="d-flex gap-4 flex-wrap">
            <div v-for="restaurant in search()" class="card" style="width: 18rem;">
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


<style lang="scss" scoped>
.active {
    background-color: rgb(2, 37, 26);
    font-weight: bold;
}
</style>