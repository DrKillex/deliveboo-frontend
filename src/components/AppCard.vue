<!-- pagina about -->
<script>
import { store } from '../store';


export default {
    name: "AppRestaurants",
    props: {
        data: Object
    },
    data() {
        return {
            store,
        }
    },
    methods: {
        getIdRedirect(where, who){
            this.store.selectedRestaurant = who
            this.$router.push({name: where, params:{slug: who.slug}})
        },
        addFood(food){
            if(!this.store.cart.includes(food)){
                const product = food
                product.quantity = 1
                this.store.cart.push(product)
            } else {
                const newCart = this.store.cart.map((product)=> {
                    if (product.id===food.id){
                        const productChange = food
                        productChange.quantity += 1
                        return productChange
                    } else {
                        return product
                    }
                })
                this.store.cart = newCart              
            }    
        },
        test(){
            this.store.cart=[],
            localStorage.clear();
            console.log(localStorage.getItem("chosenReastaurant"))
            console.log(localStorage.getItem("cart"))
        },
        addCart(product){
            if(localStorage.getItem("chosenReastaurant")===null){
                localStorage.setItem("chosenReastaurant", product.restaurant_id)
                this.addFood(product)
                localStorage.setItem("cart", JSON.stringify(this.store.cart))
                console.log(localStorage.getItem("chosenReastaurant"),localStorage.getItem("cart"))
            } else if (!localStorage.getItem("chosenReastaurant")==product.restaurant_id) {
                this.store.cartWarning=true
            } else {
                this.addFood(product)
                localStorage.setItem("cart", JSON.stringify(this.store.cart))
                console.log(localStorage.getItem("chosenReastaurant"),localStorage.getItem("cart"))
            }         
        }
    },

}
</script>


<template>
    <div class="card" style="width: 18rem;">
        <img v-if="data.img" :src="data.img" class="card-img-top" alt="...">
        <img v-if="data.image" :src="data.image" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ data.name }}</h5>
            <div v-if="data.categories">
                <span class="ir-badge me-1" v-for="category in data.categories">{{ category.name }}</span>
            </div>
            <div v-if="data.price">{{ data.price }}$</div>                 
            <div  v-if="data.address">Indirizzo: {{ data.address }} </div>
            <button v-if="data.restaurant_id" @click="addCart(data)">add cart</button>
            <button v-if="data.restaurant_id" @click="test()">test</button>
            <button v-else @click="getIdRedirect('menu', data)">menu</button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.active {
    background-color: rgb(2, 37, 26);
    font-weight: bold;
}
</style>