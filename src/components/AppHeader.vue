<script>
import { store } from '../store';
import AppCart from './AppCart.vue';

export default {
    name: "AppHeader",
    components: {
        AppCart,
    },
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
    <section>
        <!-- navbar -->
        <nav class="navbar container-fluid py-1">
            <div class="navbar-container container align-items-center px-0">
                <!-- hamburger menu -->
                <input type="checkbox" name="hamburger_icon" id="hamburger_icon">
                <div class="hamburger-lines mx-3">
                    <span class="line line1"></span>
                    <span class="line line2"></span>
                    <span class="line line3"></span>
                </div>
                <!-- /hamburger menu -->
                <!-- navbar collegamenti -->
                <ul class="navbar-links d-flex align-items-center">
                    <li><a href="http://127.0.0.1:8000/login">Accedi</a></li>
                    <li><a href="http://127.0.0.1:8000/register">Registrati</a></li>
                    <!-- offcanvas -->
                    <li>
                        <AppCart />
                    </li>
                    <!-- offcanvas -->
                </ul>
                <div class="logo d-flex align-items-center mx-3">
                    <router-link :to="{ name: 'home' }" class="link">
                        <img src="../assets/scss/img/logo.png" alt="Logo" width="100" class="d-inline-block align-text-top">
                    </router-link>
                    <h1 class="mb-0 fs-3 fw-bold">FOOD FOR ALL</h1>
                </div>
                <!-- /navbar collegamenti -->
            </div>
        </nav>
        <!-- /navbar -->
    </section>
</template>


<style lang="scss" scoped>
@use '../assets/scss/_partial/variables' as *;

.container {
    max-width: 1200px;
}

.navbar input[type="checkbox"],
.navbar .hamburger-lines {
    display: none;
}

.navbar {
    box-shadow: 0 2px 12px 0 rgba(146, 146, 146, 0.7);
    position: fixed;
    top: 0;
    background-color: $third_color;
    color: $primary_color;
    z-index: 99;

    .navbar-links {
        margin-bottom: 0;
        order: 2;

        li {
            list-style-type: none;
            margin-left: 1.5rem;
            font-size: 1.2rem;
            padding-right: 20px;
        }

        a {
            text-decoration: none;
            color: $fifth_color;
        }
    }

    .logo {
        font-size: .9375rem;
        font-weight: bold;
    }

}

// Media Query
@media (max-width: 768px) {
    .navbar {
        display: block;

        .navbar-links {
            width: 100%;
            padding-top: 30px;
            background: $third_color;
            height: 100vh;
            max-width: 100%;
            transform: translate(-150%);
            display: flex;
            flex-direction: column;
            // animazione comparsa menu hamburger
            transition: transform 0.5s ease-in-out;

            // /animazione comparsa menu hamburger
            li {
                margin-bottom: 2rem;
                padding-right: 60px;

                a {
                    font-size: 20px;
                }
            }
        }
    }

    .navbar-container input[type="checkbox"] {
        position: absolute;
        display: block;
        top: 20px;
        left: 20px;
        z-index: 5;
        opacity: 0;
    }

    .navbar-container {
        height: 64px;

        .hamburger-lines {
            height: 23px;
            width: 35px;
            order: 1;
            top: 17px;
            left: 20px;

            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .line {
                display: block;
                height: 4px;
                border-radius: 10px;
                background-color: $primary_color;
            }
        }

        .line1 {
            transform-origin: 0% 0%;
            transition: transform 0.4s ease-in-out;
        }

        .line2 {
            transition: transform 0.2s ease-in-out;
        }

        .line3 {
            transform-origin: 0% 100%;
            transition: transform 0.4s ease-in-out;
        }
    }

    .logo {
        order: 1;
    }


    // ANIMAZIONI AL CLICK DELL'HAMBURGER
    .navbar-container input[type="checkbox"]:checked~.navbar-links {
        transform: translateX(0);
    }

    .navbar-container input[type="checkbox"]:checked~.hamburger-lines .line1 {
        transform: rotate(35deg);
        background-color: $fifth_color;
    }

    .navbar-container input[type="checkbox"]:checked~.hamburger-lines .line2 {
        transform: scaleY(0);
    }

    .navbar-container input[type="checkbox"]:checked~.hamburger-lines .line3 {
        transform: rotate(-35deg);
        background-color: $fifth_color;
    }
}</style>