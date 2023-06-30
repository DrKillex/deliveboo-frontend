<!-- pagina about -->
<script>
import { store } from '../store';


export default {
    name: "SelectCategory",
    emits: ['search'],
    props: {
        restaurant: Object
    },
    data() {
        return {
            store,
        }
    },
    methods: {
        addCategory(id) {
            console.log(id)
            if (this.store.selectedCategories.includes(id)) {
                const removeCategory = this.store.selectedCategories.indexOf(id)
                this.store.selectedCategories.splice(removeCategory, 1)
            } else {
                this.store.selectedCategories.push(id)
            }
        },
        emptyCategories() {
            this.store.selectedCategories = []
        }
    }
}
</script>


<template>
    <div>
        <!-- Bottoni Categorie  -->
        <div>
            <div class="ms_text_category">Tutte le categorie</div>
            <!-- Tasto Reset -->
            <button class="ms_btn text-white mb-3" @click="emptyCategories"> Reset </button>
            <!-- Categorie -->
            <ul class="list-unstyled text-center flex-wrap d-flex position-relative">
                <li v-bind:class="{ active: store.selectedCategories.includes(category.id) }"
                    class="btn d-flex justify-content-evenly align-items-center flex-column m-sm-3 my-1 mx-3 ms_card text-white" v-for="category in store.categories"
                    @click="$emit('search'); addCategory(category.id)">
                    <div>{{ category.name }}</div>
                    <img class="text-center" :src="category.img" alt="immagine categoria">
                </li>
            </ul>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/_partial/variables' as *;

.ms_text_category {
    font-size: 20px;
}


.ms_btn {
    background-color: $primary_color;
    border-radius: 20px;
    padding: 5px 20px;
    border: none;

    &:hover {
        background-color: #faa856;
        box-shadow: 0px 0px 16px 0px #faa856;
    }
}

div ul.list-unstyled.justify-content-center li.active {
    font-weight: bold;
    background-color: #faa856;
    box-shadow: 0px 0px 26px -2px #000000;
    border: none;
}

.ms_card {
    height: 130px;
    width: 170px;
    border-radius: 30px;
    background-color: $primary_color;

    transition: all .2s ease-in-out;
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
    -ms-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;

    &:hover {
        background-color: #faa856;
        box-shadow: 0px 0px 26px -2px #000000;

        transform: scale(1.1);
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.2);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1)
    }

    img {
        width: 100px;
    }

}

@media (max-width: 768px) {
    .ms_btn {
        padding: 3px 20px;
        font-size: 14px;
    }

    .ms_text_category {
        font-size: 16px;
    }

    .ms_card {
        height: 40px;
    }

    img {
        display: none;
    }
}

@media (max-width: 540px) {
    .ms_card {
        width: 40%;
    }

}
</style>