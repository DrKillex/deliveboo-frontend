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
    <div class="order-sm-1 order-md-3 col-sm-12 col-md-4 col-lg-3">
        <!-- Offcanvas -->
        <div class="d-flex">
            <button class="btn border-0 fs-6 p-0 border-dark-subtle mx-2" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><font-awesome-icon
                    icon="fa-solid fa-cart-shopping" /></button>
            <!-- quantità -->
            <div>{{ cartElementQuantity }}</div>
            <!-- /quantità -->
        </div>

        <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title fw-bold" id="offcanvasWithBothOptionsLabel">Il tuo ordine</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <!-- Form dentro Offcanvas -->
            <div class="offcanvas-body" id="offcanvas">
                <form class="row g-3">
                    <div class="col-12">
                        <div class="container mt-5 d-flex flex-column">
                            <!-- cart -->

                            <!-- CARD -->
                            <div class="card mb-3" v-if="store.cart.length > 0">
                                <div class="row g-0 " v-for="product in store.cart">
                                    <div class="img-box col-sm-12 col-md-4">
                                        <img :src="product.image" alt="">
                                    </div>
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
                            <!-- /CARD -->

                            <!-- Tabella -->

                            <table class="table" v-if="store.cart.length > 0">

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
                            <div class="fw-bold">Totale: {{ getFullPrice() }} €</div>
                        </div>
                        <!-- Ordina -->
                        <div class="buttons mt-4 row">
                            <div class="button-left col-md-8 col-sm-12">
                                <router-link :to="{ name: 'payment' }">
                                    <button class="fw-bold w-100 payment-btn btn">Vai al pagamento</button>
                                </router-link>
                            </div>
                            <div class="button-right col-md-4 col-sm-12">
                                <button class="fw-bold w-100 btn deleteproducts-btn" @click.prevent="svuota()">Svuota
                                    Carrello</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <!-- Form dentro Offcanvas -->
        </div>
        <!-- /Offcanvas -->
    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/_partial/variables' as *;


.offcanvas {
    width: 700px;
    padding-bottom: 100px;

    .card {
        border: none;

        img {
            width: 100%;
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
        border-radius: 3rem;
        padding: 0.5rem 1rem;
    }

    .deleteproducts-btn {
        background-color: $fourth_color;
        color: $third_color;
        border-radius: 3rem;
        padding: 0.5rem 1rem;
    }
}




// Media Query
@media screen and (max-width: 760px) {
    .offcanvas {
        .card {
            .card-body {
                .img-box {
                    display: flex;
                    justify-content: center;

                    img {
                        width: 40%;
                    }
                }
            }
        }

    }

}</style>