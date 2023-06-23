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
        moreFood(food) {
            const newCart = this.store.cart.map((product) => {
                if (product.id === food.id) {
                    const productChange = food
                    productChange.quantity += 1
                    return productChange
                } else {
                    return product
                }
            })
            this.store.cart = newCart
            localStorage.setItem("cart", JSON.stringify(this.store.cart))
            console.log(localStorage.getItem("chosenReastaurant") + '-----------', localStorage.getItem("cart") + '-----------')
        },
        lessFood(food) {   
            // da fixare
            const newCart = this.store.cart.map((product) => {
                if (product.id === food.id) {
                    if (product.quantity==1){
                        this.store.cart = this.store.cart.filter(product => product.id !== food.id)
                    } else {
                        const productChange = food
                        productChange.quantity -= 1                  
                        return productChange  
                    }                                    
                } else {
                    return product
                }
            })
            this.store.cart = newCart
            localStorage.setItem("cart", JSON.stringify(this.store.cart))
            console.log(localStorage.getItem("chosenReastaurant") + '-----------', localStorage.getItem("cart") + '-----------')
        },
        removeFood(food) {
            const index = this.store.cart.map(product => product.id).indexOf(food.id)
            console.log(index)
            this.store.cart.splice(index, 1)
            localStorage.setItem("cart", JSON.stringify(this.store.cart))
            console.log(localStorage.getItem("chosenReastaurant") + '-----------', localStorage.getItem("cart") + '-----------')
        },
        resetCart() {
            this.store.cart = [],
                localStorage.clear();
            this.store.cartWarning = false
        },
        resetWarning() {
            this.store.cartWarning = false
        },
        getFullPrice() {
            let total = 0;
            this.store.cart.forEach((food) => {
                total += parseFloat(food.price) * food.quantity;
            });
            return total.toFixed(2);
        },
        singleFoodPrice(food) {
            if (food.quantity > 1) {
                return (parseFloat(food.price) * food.quantity).toFixed(2);
            } else {
                return food.price;
            }
        },
    },
    computed: {
        showFullPrice() {
            this.getFullPrice()
        }
    },
    created() {
        this.getMenu();
    }
}
</script>


<template>
    <section>
        <div class="container">
            <table class="table" v-if="store.cart.length>0">
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
                        <td>{{ singleFoodPrice(product) }}</td>
                        <td>{{ product.quantity }}</td>
                        <td>
                            <ul class="list-unstyled d-flex gap-2">
                                <li><button @click="lessFood(product)">-</button></li>
                                <li><button @click="moreFood(product)">+</button></li>
                                <li><button @click="removeFood(product)">remove</button></li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>totale: {{ getFullPrice() }}</div>
            <div v-if="store.cartWarning === true">
                <div>sei stronzo? hai cambiato ristorante, vuoi continuare su questo ristorante e svuotare l ordine
                    precedente o no? deciditi e crepa</div>
                <div>
                    <button>si sono stronzo</button>
                    <button @click="resetCart">si voglio continuare su questo ristorante</button>
                    <button @click="resetWarning">no sto solo cazzeggiando</button>
                </div>
            </div>
        </div>
    </section>
    <section class="d-flex gap-4 flex-wrap container">
        <AppCard v-for="product in store.products" :data="product" />
    </section>
</template>


<style scoped></style>