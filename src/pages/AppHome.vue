<!-- pagina home -->
<script>
import { store } from '../store';
import AppCard from '../components/AppCard.vue';
import SelectCategory from '../components/SelectCategory.vue';
import SearchBar from '../components/SearchBar.vue';
import axios from 'axios';
    export default {
        name: "AppHome",
        components: {
            AppCard,
            SelectCategory,
            SearchBar
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
                    }})
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
    <div>home</div>
    <SearchBar  @searchText="search"/>
    <section>
        <div>
            <SelectCategory @search="search"/>
        </div>
        <div class="d-flex gap-4 flex-wrap">
            <AppCard v-for="restaurant in search()" :data="restaurant"/>
        </div>
    </section>
</template>


<style scoped>

</style>