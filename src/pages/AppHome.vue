<!-- pagina home -->
<script>
import { store } from '../store';
import AppCard from '../components/AppCard.vue';
import SelectCategory from '../components/SelectCategory.vue';
import SearchBar from '../components/SearchBar.vue';

import AppJumbotron from '../components/AppJumbotron.vue';
import AppCarousel from '../components/AppCarousel.vue';
import axios from 'axios';
    export default {
        name: "AppHome",
        components: {
            AppCard,
            AppJumbotron,
            SelectCategory,
            SearchBar,
            AppCarousel
        },
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
                }
                )
        },
        search() {
            console.log('ciao')
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
                    }
                })
            } else {
                return this.store.restaurants
            }
        },
    },
    created() {
        this.getData();
    }
}   
</script>


<template>

    <AppJumbotron></AppJumbotron>

    <!-- Carosello Immagini
        <div class="appCarousel">        
            <AppCarousel /> 
        </div>
     -->

    <main>
       <section class="pb-4 d-flex flex-column flex-sm-row mt-2 container-md container-fluid mx-auto">
            <!-- Ricerca Categorie -->
            <div class="category col-sm-4 col-md-3 d-md-fle">
                <SelectCategory @search="search" />
            </div>
            <!--Card Ristoranti -->
            <div class="ms_cards mt-4 d-flex gap-5 flex-wrap col-sm-8 col-md-9 justify-content-center align-content-start">
                <AppCard v-for="restaurant in search()" :data="restaurant" />
            </div>
        </section>
        <!--/Sezione Ristoranti -->

    </main>
</template>

<style  lang="scss" scoped>
.ms_cards{
    padding-top: 92px;
}
@media (max-width: 768px) {
    .appCarousel{
        display: none;
    }
}


@media (max-width: 540px) {

    .ms_cards {
        justify-content: center;
        transform: translate(0, -65px);
        padding-top: 0;

    }
    .category{
    padding-right: 0;
}
}

</style>