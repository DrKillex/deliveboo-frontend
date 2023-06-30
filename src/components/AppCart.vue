<script>
import { store } from '../store';
import axios from 'axios';

export default {
    name: "AppCart",
    props: {
        data: Object
    },
    data() {
        return {
            store,
        }
    },
    methods: {
        //carrello
        moreFood(food) {
            const newCart = this.store.cart.map((product) => {
                if (product.id === food.id) {
                    const productChange = food
                    productChange.quantity += 1
                    return productChange
                } else {
                    return product
                }
            })
            this.store.cart = newCart
            localStorage.setItem("cart", JSON.stringify(this.store.cart))
            console.log(localStorage.getItem("chosenReastaurant") + '-----------', localStorage.getItem("cart") + '-----------')
        },
        lessFood(food) {
            if (food.quantity == 1) {
                this.removeFood(food)
            } else {
                const newCart = this.store.cart.map((product) => {
                    if (product.id === food.id) {
                        product.quantity -= 1 ///////////////////////fare cosi per tutti
                        return product
                    } else {
                        return product
                    }
                })
                this.store.cart = newCart
                localStorage.setItem("cart", JSON.stringify(this.store.cart))
                console.log(localStorage.getItem("chosenReastaurant") + '-----------', localStorage.getItem("cart") + '-----------')
            }

        },
        removeFood(food) {
            const index = this.store.cart.map(product => product.id).indexOf(food.id)
            console.log(index)
            this.store.cart.splice(index, 1)
            localStorage.setItem("cart", JSON.stringify(this.store.cart))
            console.log(localStorage.getItem("chosenReastaurant") + '-----------', localStorage.getItem("cart") + '-----------')
        },
        resetCart() {
            this.store.cart = [],
                localStorage.clear();
            this.store.cartWarning = false
        },
        resetWarning() {
            this.store.cartWarning = false
        },
        getFullPrice() {
            let total = 0;
            this.store.cart.forEach((food) => {
                total += parseFloat(food.price) * food.quantity;
            });
            this.store.totalPrice = total.toFixed(2)
            return total.toFixed(2);
        },
        singleFoodPrice(food) {
            if (food.quantity > 1) {
                return (parseFloat(food.price) * food.quantity).toFixed(2);
            } else {
                return food.price;
            }
        },
        svuota() {
            this.store.cart = [],
                localStorage.clear();
            console.log(localStorage.getItem("chosenReastaurant"))
            console.log(localStorage.getItem("cart"))
        },
        setCart() {
            if (JSON.parse(localStorage.getItem("cart")) == null) {
                this.store.cart = []
            } else {
                this.store.cart = JSON.parse(localStorage.getItem("cart"))
            }
            this.store.selectedRestaurant = JSON.parse(localStorage.getItem("chosenReastaurant")),
                this.store.totalPrice = JSON.parse(localStorage.getItem("totalPrice")),
                // console.log(localStorage.getItem("chosenReastaurant") + '-----------', localStorage.getItem("cart") + '-----------')
                console.log(this.store.selectedRestaurant + '-----------test', this.store.cart + '-----------')
        },

    },
    computed: {
        showFullPrice() {
            this.getFullPrice()
        },
        cartElementQuantity() {
            let total = 0
            this.store.cart.forEach(product => {
                total += product.quantity
            });
            return total
        }
    },

    created() {
        this.setCart();
    }
}
</script>


<template>
    <!-- Offcanvas -->
    <div class="d-flex">
        <button class="btn border-0 fs-6 p-0 border-dark-subtle mx-2" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><font-awesome-icon
                icon="fa-solid fa-cart-shopping" /></button>
        <!-- quantità -->
        <div>{{ cartElementQuantity }}</div>
        <!-- /quantità -->
    </div>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel">
        <div class="offcanvas-header">
            <div class="row">
                <!-- Parte superiore  Offcanvas -->
                <div class="d-flex">
                    <h5 class="offcanvas-title fw-bold flex-grow-1" id="offcanvasWithBothOptionsLabel">Il tuo ordine
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
            </div>
        </div>
        <!-- Card dentro Offcanvas -->
        <div class="offcanvas-body" id="offcanvas" data-bs-scroll="true">
            <form class="row g-3">
                <div class="col-12">
                    <div class="container d-flex flex-column">
                        <!-- CARD -->
                        <div class="mb-3" v-if="store.cart.length > 0">
                            <div class="card" v-for="product in store.cart">
                                <div class="row  g-0">
                                    <!-- immagine prodotto -->
                                    <div class="img-box col-sm-12 col-md-4">
                                        <img :src="product.image" alt="">
                                    </div>
                                    <!-- /immagine prodotto -->
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <div class="name-price d-flex justify-content-between">
                                                <h5 class="card-title fw-bold">{{ product.name }}</h5>
                                                <p class="card-text fw-bold ">{{ singleFoodPrice(product) }} €
                                                </p>
                                            </div>
                                            <p class="card-text"><small class="text-body-secondary">Quantità: {{
                                                product.quantity }}
                                                    <ul class="list-unstyled d-flex gap-2 mt-3">
                                                        <li><button class="btn orange"
                                                                @click.prevent="lessFood(product)">-</button>
                                                        </li>
                                                        <li><button class="btn orange"
                                                                @click.prevent="moreFood(product)">+</button>
                                                        </li>
                                                        <li><button class="btn  orange"
                                                                @click.prevent="removeFood(product)"><font-awesome-icon
                                                                    icon="fa-solid fa-trash" /> Rimuovi</button></li>
                                                    </ul>
                                                </small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="fw-bold zero-article row"> Non hai nessun articolo nel carrello
                        </div>
                        <!-- /CARD -->

                        <!-- Tabella -->
                        <!-- <table class="table" v-if="store.cart.length > 0">
                                <thead>
                                    <tr>
                                        <th scope="col">Nome Prodotto</th>
                                        <th scope="col">Prezzo</th>
                                        <th scope="col">Quantità</th>
                                        <th scope="col">Azioni</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="product in store.cart">
                                        <td>{{ product.name }}</td>
                                        <td>{{ singleFoodPrice(product) }}</td>
                                        <td class="text-center">{{ product.quantity }}</td>
                                        <td>
                                            <ul class="list-unstyled d-flex gap-2">
                                                <li><button class="btn orange" @click.prevent="lessFood(product)">-</button>
                                                </li>
                                                <li><button class="btn orange" @click.prevent="moreFood(product)">+</button>
                                                </li>
                                                <li><button class="btn  orange"
                                                        @click.prevent="removeFood(product)"><font-awesome-icon
                                                            icon="fa-solid fa-trash" /> Rimuovi</button></li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table> -->
                        <!-- /Tabella -->

                    </div>
                </div>
            </form>
        </div>
        <!-- Parte Inferiore -->
        <div class="header-cart-resume p-2 row ms-0" v-if="store.cart.length > 0">
            <div class="col-sm-2 col-md-3 fw-bold total d-flex align-items-center">Totale: {{ getFullPrice() }} €</div>
            <div class="col-sm-10 col-md-9 buttons">
                <div class="header-cart-buttons d-flex justify-content-around align-items-center">
                    <div class="button-left col-md-7 d-flex justify-content-center">
                        <router-link :to="{ name: 'payment' }">
                            <button v-if="store.cart.length > 1" class="fw-bold payment-btn btn">Procedi
                                all'ordine ({{
                                    cartElementQuantity }}
                                articoli)</button>
                            <button v-else class="fw-bold payment-btn btn">Procedi all'ordine ({{
                                cartElementQuantity }}
                                articolo)</button>
                        </router-link>
                    </div>
                    <div class="button-right col-md-5 d-flex justify-content-center ms-3">
                        <button class="fw-bold align-items-center btn deleteproducts-btn"
                            @click.prevent="svuota()"><font-awesome-icon icon="fa-solid fa-trash" /> Svuota
                            Carrello</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Parte Inferiore -->
        <!-- Form dentro Offcanvas -->
    </div>
    <!-- /Offcanvas -->
</template>


<style lang="scss" scoped>
@use '../assets/scss/_partial/variables' as *;


.offcanvas {
    width: 600px !important;

    .header-cart-resume {
        box-shadow: 1px -3px 2px 1px rgba(221, 221, 221, 0.7);
        z-index: 999;
        padding-top: 20px;

        .total {
            font-size: 16px;
        }
    }

    .offcanvas-header {
        position: relative;

        .btn-close {
            position: absolute;
            top: 1.25rem;
            right: 1.25rem;
            background-color: $primary_color;
        }

        .btn-close::before {
            content: 'Chiudi Carrello';
            position: absolute;
            bottom: 0;
            left: -150px;
        }
    }

    .offcanvas-title {
        margin-bottom: 20px;
    }

    .card:not(:first-child) {
        margin-top: 50px;
    }

    .card {
        border: none;
        // border-radius: 3rem;

        img {
            width: 100%;
            height: 170px;
            object-fit: cover;
            border-radius: 50%;
        }
    }

    .zero-article {
        color: $primary_color;
        text-transform: uppercase;

        .btn-restaurant {
            background-color: $fourth_color;
            color: $third_color;
            ;
        }

    }
}

.orange {
    border-radius: 3rem;
    background-color: $primary_color;
    color: white;
    padding: 0.1rem 0.5rem;
}

.buttons {
    .payment-btn {
        background-color: $primary_color;
        color: $third_color;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        font-size: 14px;
    }

    .deleteproducts-btn {
        background-color: $fourth_color;
        color: $third_color;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        font-size: 14px;
    }
}



@media screen and (max-width: 540px) {
    .offcanvas {
        .buttons {
            .btn {
                margin: 10px 0 0 0;
            }
        }
    }
}

// Media Query
@media screen and (max-width: 760px) {
    .offcanvas {
        padding-bottom: 80px;

        .offcanvas-header {
            font-size: 15px;
            padding: 10px;

            .btn-close {
                top: .625rem;
                right: .625rem;
            }

            .header-cart-resume {
                .header-cart-buttons {
                    justify-content: space-around !important;
                }

                .total {
                    font-size: 18px;
                }
            }

            .btn-close::before {
                bottom: 0;
                left: -120px;
            }

            .offcanvas-title {
                font-size: 20px;
            }

            .btn {
                font-size: 12px;
                margin: 0;
            }
        }

        .card {
            img {
                border-radius: 4%;
            }

            .card-body {
                .img-box {
                    display: flex;
                    justify-content: center;

                    img {
                        width: 40%;
                        height: 100%;
                    }
                }
            }
        }

        .buttons {
            .btn {
                margin: 10px 0 0 0;
                padding: 0.5rem 1rem;
                font-size: 15px;
            }
        }

    }

}
</style>