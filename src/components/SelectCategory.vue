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
        <ul class="list-unstyled text-center">
                <li v-bind:class="{ active: store.selectedCategories.includes(category.id) }"
                    class="btn btn-primary m-3" v-for="category in store.categories" @click="$emit('search'); addCategory(category.id)"> {{
                        category.name }}</li>
            </ul>
    </div>
</template>


<style lang="scss" scoped>
.active {
    background-color: rgb(2, 37, 26);
    font-weight: bold;
}
</style>