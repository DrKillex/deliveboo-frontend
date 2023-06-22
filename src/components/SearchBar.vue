<!-- pagina about -->
<script>
import { store } from '../store';


export default {
    name: "SelectCategory",
    data() {
        return {
            store,
        }
    },
}
</script>


<template>
    <div>
        <input type="text" v-model="store.searchBarText" @change="$emit('searchText')" list="restaurants">
    </div>
</template>


<style lang="scss" scoped>
.active {
    background-color: rgb(2, 37, 26);
    font-weight: bold;
}
</style>