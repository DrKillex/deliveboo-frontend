<script>
import axios from 'axios';
import AppCard from '../components/AppCard.vue';
import { store } from '../store';
export default {
    name: "AppRestaurantMenu",
    data() {
        return {
            store,
            quantity: 1
        }
    },
    components: {
        AppCard
    },
    methods: {
        getImgLink(item){
            if(item.img){
                if(!item.img.startsWith('http')){
                    return 'http://127.0.0.1:8000/storage/'+item.img
                } else {
                    return item.img
                }
            }
        },
        getMenu() {
            axios.get(`${this.store.apiBaseUrl}${this.store.apiUrls.products}/${this.$route.params.slug}`)
                .then((response) => {
                    this.store.products = response.data.results
                }
                )
        },
        resetCart() {
            this.store.cart = [],
                localStorage.clear();
            this.store.cartWarning = false
        },
        resetWarning() {
            this.store.cartWarning = false
        },
    },
    created() {
        this.getMenu();
    }
}
</script>


<template>
    <section class="menu">
        <div class="container position-relative">
            <div class="text-center">
                <img class="rounded-2 mb-3" :src="getImgLink(store.products[0].restaurant)" alt="">
                <h1>{{ store.products[0].restaurant.name }}</h1>
                <div class="fs-5">{{ store.products[0].restaurant.description }}</div>
            </div>
            <!-- Info ristorante -->
            <div class="card_info rounded-2">
                <ul class="list-unstyled lh-lg">
                    <li>
                        <span>Indirizzo: </span>
                        <span>{{ store.products[0].restaurant.address }}</span>
                    </li>
                    <li>
                        <span>Email: </span>
                        <span>{{ store.products[0].restaurant.email }}</span>
                    </li>
                    <li>
                        <span>Telefono: </span>
                        <span>{{ store.products[0].restaurant.telephone }}</span>
                    </li>
                    <li>
                        <span>Orari: </span>
                        <span>{{ store.products[0].restaurant.opening_hours }}</span>
                    </li>
                </ul>
            </div>
            <!-- /Info ristorante -->
        </div>
        <h2 class="text-center mt-4">Menù</h2>
        <div class="container mt-5 d-flex gap-5 flex-wrap justify-content-center">
            <!-- Card prodotti -->
            <AppCard v-for="product in store.products" :data="product" />
            <!--/ Card prodotti -->

            <!-- Pop Up Cambia ristorante -->
            <div class="pop_up position-fixed" v-if="store.cartWarning === true">
                <h5 class="p-3">Hai cambiato ristorante, vuoi continuare su questo ristorante e svuotare l
                    ordine precedente o no?</h5>
                <div class="d-flex justify-content-center gap-2 mt-4">
                    <button class="btn" @click="resetCart">Si, voglio continuare su questo ristorante.</button>
                    <button class="btn" @click="resetWarning">No, sto solo guardando.</button>
                </div>
            </div>
            <!-- /Pop Up Cambia ristorante -->
        </div>
    </section>
</template>


<style lang="scss" scoped>
@use '../assets/scss/_partial/variables' as *;

.card_info {
    background-color: $primary_color;
    box-shadow: 0px 0px 16px 0px black;
    position: absolute;
    top: 120px;
    right: 10px;
    color: $third_color;
    font-weight: bold;
    padding: 30px;
}

.menu {
    margin-top: 85px;
}

img {
    height: 400px;
    max-width: 800px;
    object-fit: cover;
    box-shadow: 0px 0px 16px 0px black;
    border: 1px solid $third_color;
}

.pop_up {
    border: 5px solid $primary_color;
    box-shadow: 0px 0px 16px 0px black;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    top: 40%;
    left: 25%;
    right: 25%;
    height: 200px;
}

button {
    background-color: $primary_color;
    border-radius: 20px;
    color: $third_color;

    &:hover {
        background-color: #faa856;
        box-shadow: 0px 0px 16px 0px #faa856;
        color: $third_color;
    }
}

@media (max-width: 768px) {
    .card_info {
        position: static;
        padding: 15px;
        margin-top: 10px;

    }
    img {
    height: 30%;
    max-width: 80%;
}
.pop_up {
    height: 250px;
    left: 10%;
    right: 10%;
}

}
@media (max-width: 540px) {
    .pop_up {
    height: 280px;
    left: 5%;
    right: 5%;
    
}

}
</style>