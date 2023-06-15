<script>
import HelloApp from './components/HelloApp.vue';
import AppRestaurant from './components/AppRestaurant.vue';
import axios from 'axios';
export default {
  name:'App',
  components: {
    HelloApp,
    AppRestaurant
  }
}
</script>

<template>
  <HelloApp />
  <AppRestaurant />
</template>


<style lang="scss">
//versione 1 - inclusione via app.vue
// @use './assets/scss/main.scss' as *;
</style>
