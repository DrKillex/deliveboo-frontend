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
            this.store.searchBarText = ''
        }
    }
}
</script>


<template>
    <div>
        <!-- Bottoni Categorie  -->
        <div class="category">
            <div class="header-category d-flex justify-content-center mb-3">
                <div class="mx-3 ms_text_category fs-3 fw-bold">Tutte le categorie</div>
                <!-- Tasto Reset -->
                <button class="ms_btn mt-sm-3 mb-3 reset" @click="emptyCategories"> Resetta </button>
            </div>
            <ul class="list-unstyled justify-content-start ms_overflow text-center flex-sm-wrap d-flex position-relative">
                <li v-bind:class="{ active: store.selectedCategories.includes(category.id) }"
                    class="btn d-flex justify-content-evenly align-items-center flex-column m-sm-3 my-1 mx-2 ms_card text-white"
                    v-for="category in store.categories" @click="$emit('search'); addCategory(category.id)">
                    <div>{{ category.name }}</div>
                    <img class="text-center" :src="category.img" alt="immagine categoria">
                </li>
            </ul>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/_partial/variables' as *;

.category {
    .ms_text_category {
        font-size: 20px;
    }


    .ms_btn {
        background-color: $third_color;
        border-radius: 20px;
        padding: 5px 20px;
        border: none;
        box-shadow: 0 0 1.5px rgba(0, 0, 0, 0.6);
        font-weight: bold;
        color: $fourth_color;


        &:hover {
            background-color: $secondary_color;
        }
    }


    div ul.list-unstyled.justify-content-start li.active {

        font-weight: bold;
        background-color: #faa856;
        // box-shadow: 0px 0px 26px -2px #000000;
        border: 3px solid rgb(136, 185, 136);
        font-weight: bold !important;
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
            background-color: #ffbd7c;
            box-shadow: 0px 0px 15px -2px #000000;

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

    // img {
    //     display: none;
    // }
}

@media (max-width: 575px) {
    .category {
        transform: translate(0, -73px);

        .ms_card {
            width: 40%;

            &:hover {
                box-shadow: 0px 0px 0px 0px #fdfdfd;

                transform: scale(1.0);
                -webkit-transform: scale(1.0);
                -moz-transform: scale(1.0);
                -ms-transform: scale(1.0);
                -o-transform: scale(1.0)
            }
        }

        .header-category {
            display: flex;
            align-items: center;
            margin-bottom: 1.25rem;

            .ms_text_category {
                font-size: 26px !important;
            }

            button {
                margin-bottom: 0 !important;
                font-size: 17px;
            }
        }

        ul {
            .btn {
                background-color: $primary_color;
                border-radius: 1rem;
                display: flex;
                align-items: center;
                padding: 1.9rem 2rem;
                font-size: 16px;
                margin-bottom: 20px;
                display: flex;
                justify-content: center;

            }
        }

        .ms_overflow {
            overflow-x: scroll;
        }

    }
}</style>