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
        getIdRedirect(where, who) {
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
        addCart(product){
            if(localStorage.getItem("chosenReastaurant")===null){
                localStorage.setItem("chosenReastaurant", product.restaurant_id)
                this.addFood(product)
                localStorage.setItem("cart", JSON.stringify(this.store.cart))
                console.log(localStorage.getItem("chosenReastaurant"),localStorage.getItem("cart"))
            } else if (localStorage.getItem("chosenReastaurant")!=product.restaurant_id) {
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
    <div class="ms_card text-center">
        <img v-if="data.img" :src="data.img" class="card-img-top" alt="...">
        <img v-if="data.image" :src="data.image" class="card-img-top" alt="...">
        <div class="card-body mt-1 p-1">
            <h5 class="card-title fw-bold mb-2">{{ data.name }}</h5>
            <div v-if="data.categories" class="overflow-x-auto mb-1">
                <span class="ir-badge me-1 " v-for="category in data.categories">{{ category.name }}</span>
            </div>
            <div v-if="data.price">{{ data.price }}€</div>
            <div v-if="data.address">{{ data.address }} </div>
            <div class="mt-3 d-flex justify-content-center">
                <button class="btn ms_btn text-white" v-if="data.restaurant_id" @click="addCart(data)">Add cart</button>
                <button class="btn ms_btn text-white" v-else @click="getIdRedirect('menu', data)">Menu</button>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/_partial/variables' as *;

.ms_card{
    width: 288px;

    transition: all .2s ease-in-out;
        -webkit-transition: all .2s ease-in-out;
        -moz-transition: all .2s ease-in-out;
        -ms-transition: all .2s ease-in-out;
        -o-transition: all .2s ease-in-out;

        &:hover{
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
            -ms-transform: scale(1.1);
            -o-transform: scale(1.1)
        }
}

img {
    border-radius: 20px;
    width: 288px;
    height: 200px;
    box-shadow: 0px 0px 16px 0px black;
    border: 1px solid $third_color;
}

.ms_btn {
    background-color: $primary_color;
    border-radius: 20px;

    &:hover {
        background-color: #faa856;
        box-shadow: 0px 0px 16px 0px #faa856;
    }
}

@media (max-width: 768px) {
    img {
    border-radius: 20px;
    width: 210px;
    height: 130px;
}

}

@media (max-width: 540px) {
    img {
    border-radius: 20px;
    width: 288px;
    height: 200px;
}


}
</style>