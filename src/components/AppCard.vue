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
            this.$router.push({ name: where, params: { slug: who.slug } })
        }
    },

}
</script>


<template>
    <div>
        <img v-if="data.img" :src="data.img" class="card-img-top" alt="...">
        <img v-if="data.image" :src="data.image" class="card-img-top" alt="...">
        <div class="card-body mt-1 p-1">
            <h5 class="card-title fw-bold mb-2">{{ data.name }}</h5>
            <div v-if="data.categories" class="overflow-x-auto mb-1">
                <span class="ir-badge me-1 " v-for="category in data.categories">{{ category.name }}</span>
            </div>
            <div v-if="data.price">{{ data.price }}$</div>
            <div v-if="data.address">{{ data.address }} </div>
            <div class="mt-3 d-flex justify-content-center">
                <button class="btn ms_btn" v-if="data.restaurant_id" @click="getIdRedirect('product', data)">product
                    detail</button>
                <button class="btn ms_btn" v-else @click="getIdRedirect('menu', data)">menu</button>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/_partial/variables' as *;



img {
    border-radius: 20px;
    width: 288px;
    height: 200px;
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


}</style>