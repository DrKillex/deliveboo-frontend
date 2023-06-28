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
    }
}
</script>


<template>
    <div>
        <div class="d-flex">
            <div class="mx-3 ms_text_category">Tutte le categorie</div>
            <!-- Tasto Reset -->
            <button class="ms_btn"> Reset </button>
        </div>
        <!-- Bottoni Categorie  -->
        <div class="mt-3">
            <ul class="list-unstyled text-center flex-wrap d-flex flex-sm-column position-relative">
                <li v-bind:class="{ active: store.selectedCategories.includes(category.id) }" class="btn m-sm-3 my-1 mx-3 ms_card"
                    v-for="category in store.categories" @click="$emit('search'); addCategory(category.id)"> 
                    <div>{{category.name }}</div>
                    <img src="../assets/img/italiano.webp" alt="asd">
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

.active {
    font-weight: bold;
    background-color: #faa856;
    box-shadow: 0px 0px 26px -2px #000000;
}

.ms_card {
    height: 130px;
    width: 170px;
    border-radius: 30px;
    background-color: $primary_color;

    &:hover {
        background-color: #faa856;
        box-shadow: 0px 0px 26px -2px #000000;
    }
}

img {
    // position: absolute;
    top: 45px;
    left: 35px;
    width: 130px;
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