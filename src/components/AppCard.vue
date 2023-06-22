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
                    <button v-if="data.restaurant_id" @click="getIdRedirect('product', data)">product detail</button>
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