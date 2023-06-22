<!-- pagina about -->
<script>
import { store } from '../store';
import axios from 'axios';

export default {
    name: "AppRestaurants",
    data() {
        return {
            store,
        }
    },
    methods: {
        getData() {
            axios.get(this.store.apiBaseUrl + this.store.apiUrls.restaurants)
                .then((response) => {
                    this.store.restaurants = response.data.results.restaurants
                    this.store.categories = response.data.results.categories
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
            if (this.store.selectedCategories.includes(id)) {
                const removeCategory = this.store.selectedCategories.indexOf(id)
                this.store.selectedCategories.splice(removeCategory, 1)
            } else {
                this.store.selectedCategories.push(id)
            }
        },
        search() {
            // if (this.searchBarText.trim() !== '') {
            //     return this.restaurants.filter(res => res.name.toLowerCase().includes(this.searchBarText.toLowerCase()))
            // } else if (this.selectedCategories.length > 0) {
            //     // return this.restaurants.filter((restaurant) => {
            //     //     console.log(restaurant.name)
            //     //     let control=[]
            //     //     let categoriesId=[]
            //     //     for (let index = 0; index < restaurant.categories.length; index++) {
            //     //         categoriesId.push(restaurant.categories[index].id)
            //     //     }
            //     //     for (let index = 0; index < this.selectedCategories.length; index++) {
            //     //         if(categoriesId.includes(this.selectedCategories[index])){
            //     //             control.push(1)
            //     //         } else {
            //     //             control.push(0)
            //     //         }
            //     //     }
            //     //     if(!control.includes(0)){
            //     //         return restaurant
            //     //     }         
            //     //}
            //     // )
            //     return this.restaurants.filter((res) => {
            //         if (this.selectedCategories.every((cat) => res.categories.map(categories => categories.id).includes(cat))) {
            //             return res
            //         }
            //     }
            //     )
            // } else {
            //     return this.restaurants
            // }
            if (this.store.searchBarText.trim() !== '' && this.store.selectedCategories.length > 0) {
                return this.store.restaurants.filter((res) => {
                    if (this.store.selectedCategories.every((cat) => res.categories.map(categories => categories.id).includes(cat))) {
                        return res
                    }
                }).filter(res => res.name.toLowerCase().includes(this.store.searchBarText.toLowerCase()))
            } else if (this.store.searchBarText.trim() !== '') {
                return this.store.restaurants.filter(res => res.name.toLowerCase().includes(this.store.searchBarText.toLowerCase()))
            } else if (this.store.selectedCategories.length > 0) {
                return this.store.restaurants.filter((res) => {
                    if (this.store.selectedCategories.every((cat) => res.categories.map(categories => categories.id).includes(cat))) {
                        return res
                    }})
            } else {
                return this.store.restaurants
            }
        },
        getIdRedirect(who){
            this.store.selectedRestaurant = who
            this.$router.push({name: 'menu', params:{slug: who.slug}})
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
        <div>
            <input type="text" v-model="store.searchBarText" @change="search" list="restaurants">
            <datalist id="restaurants">
                <option v-for="restaurant in search()" :value="restaurant.name"></option>
            </datalist>
        </div>
        <div>
            <ul class="list-unstyled text-center">
                <li v-on:click="myFilter" v-bind:class="{ active: store.selectedCategories.includes(category.id) }"
                    class="btn btn-primary m-3" v-for="category in store.categories" @click="addCategory(category.id)"> {{
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
                    <button @click="getIdRedirect(restaurant)">Go somewhere</button>
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