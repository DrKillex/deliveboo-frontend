<script>
import { store } from '../store';
    export default {
        name: "AppHeader",
        data() {
            return {
                store,
            }
        },
        methods: {

    },
    }
    
</script>


<template>
    <section class="d-flex container">
        <div class="me-auto">
            <router-link :to="{ name: 'home' }" class="nav-link">
                home
            </router-link>
        </div>
        
        <ul class="ms-auto list-unstyled d-flex gap-2">
            <li>
                <a href="http://127.0.0.1:8000/login">hai gia un ristorante? Login</a>
            </li>
            <li>
                <a href="http://127.0.0.1:8000/register">registrati</a>
            </li>
            <!-- <li>
                <a href=""></a>
            </li> -->
        </ul>
    </section>
</template>


<style scoped>

</style>