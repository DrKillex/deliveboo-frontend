<template>
    <div class="container pb-4">
        <div class="row section-payment">
            <!-- riepilogo carrello  -->
            <div class="col-12 col-md-6 mb-4">
                <div class="card">
                    <h4 class="card-header titleOrder">Riepilogo dell'ordine</h4>
                    <ul class="card-body mb-0 list-unstyled">
                        <li class="card-text" v-for="food in store.cart">
                            {{ food.name }} x {{ food.quantity }} - {{ singleFoodPrice(food) }}€
                        </li>
                    </ul>
                    <div class="px-2">
                        <button class="btn btn-warning text-start" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Apri carrello</button>
                    </div>
                    <span class="ps-3 my-3">Totale: {{ this.store.totalPrice }}€</span>
                </div>
            </div>
            <!-- informazioni consegna ordine -->
            <div class="col-12 col-md-6 container-cc-info m-0">
                <div class="card color-sal">
                    <h4 class="card-header titlepayment">Informazioni di consegna</h4>
                    <div class="card-body">
                        <!-- <div class="alert alert-success" v-if="nonce">
                            Successfully generated nonce.
                        </div>
                        <div class="alert alert-danger" v-if="error">
                            {{ error }}
                        </div> -->
                        <form @submit="HandlePayPostRedirectOrder" class="d-flex flex-column">
                            <div class="form-group my-2">
                                <label>Nome</label>
                                <input type="text" v-model="name" class="form-control" placeholder="Inserisci Nome"
                                    required>
                            </div>
                            <div class="form-group my-2">
                                <label>Cognome</label>
                                <input type="text" v-model="surname" class="form-control" placeholder="Inserisci Cognome"
                                    required>
                            </div>
                            <div class="form-group my-2">
                                <label>Indirizzo di consegna</label>
                                <input type="text" v-model="address" class="form-control"
                                    placeholder="Inserisci l'indirizzo di consegna" required>
                            </div>
                            <div class="form-group my-2">
                                <label>email</label>
                                <input type="email" v-model="email" class="form-control" placeholder="Inserisci email"
                                    required>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-6 my-2">
                                        <label>Numero di telefono</label>
                                        <input type="text" v-model="phone_number" class="form-control"
                                            placeholder="Numero di telefono">
                                    </div>
                                    <!-- <div class="col-6 d-flex flex-column justify-content-between d-none">
                                        <label>Totale</label>
                                        <input type="text" v-model="store.totalPrice" class="form-control"
                                            placeholder="Totale" readonly>
                                    </div> -->
                                </div>
                            </div>
                            <!-- form in cui inserisci dati pagamento  -->
                            <hr />
                            <h4 class="titlepayment">Informazioni di pagamento</h4>
                            <hr />
                            <div class="form-group">
                                <label>Numero della carta</label>
                                <div id="creditCardNumber" class="form-control input-pay my-1"></div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-6">
                                        <label>Data di scadenza</label>
                                        <div id="expireDate" class="form-control input-pay my-1"></div>
                                    </div>
                                    <div class="col-6">
                                        <label>CVV</label>
                                        <div id="cvv" class="form-control input-pay my-1 mb-3"></div>
                                    </div>
                                </div>
                            </div>
                            <button class="border-0 btn-paga btn-block" @click.prevent="payWithCreditCard">Paga</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import braintree from 'braintree-web';
import AppCart from '../components/AppCart.vue';
import { store } from '../store';
import swal from 'sweetalert';
export default {
    name: "AppPayment",
    components: {
        AppCart,
    },
    data() {
        return {
            store,
            hostedFieldInstance: false,
            nonce: null,
            phone_number: '',
            name: '',
            address: '',
            error: '',
            surname: '',
            email: '',
        };
    },

    computed: {

    },
    created() {
        this.setCart();
        braintree.client.create({
            authorization: "sandbox_24xdbcxt_4w8xz848m4xxcn8f"
        })
            .then(clientInstance => {
                let options = {
                    client: clientInstance,
                    styles: {
                        input: {
                            'font-size': '14px',
                            'font-family': 'Open Sans'
                        }
                    },
                    fields: {
                        number: {
                            selector: '#creditCardNumber',
                            placeholder: 'Enter Credit Card'
                        },
                        cvv: {
                            selector: '#cvv',
                            placeholder: 'Enter CVV'
                        },
                        expirationDate: {
                            selector: '#expireDate',
                            placeholder: '00 / 0000'
                        }
                    }
                }
                return braintree.hostedFields.create(options)
            })
            .then(hostedFieldInstance => {
                this.hostedFieldInstance = hostedFieldInstance;
            })
            .catch(err => {
            });
        this.refreshPage()
    },


    methods: {
        singleFoodPrice(food) {
            if (food.quantity > 1) {
                return (parseFloat(food.price) * food.quantity).toFixed(2);
            } else {
                return food.price;
            }
        },
        setCart() {
            this.store.selectedRestaurant = JSON.parse(localStorage.getItem("chosenReastaurant")),
                this.store.totalPrice = JSON.parse(localStorage.getItem("totalPrice")),
                this.store.cart = JSON.parse(localStorage.getItem("cart"))
            // console.log(localStorage.getItem("chosenReastaurant") + '-----------', localStorage.getItem("cart") + '-----------')
            console.log(this.store.selectedRestaurant + '-----------test', this.store.cart + '-----------')
        },
        payWithCreditCard() {
            if (this.hostedFieldInstance) {
                this.error = "";
                this.nonce = "";
                this.hostedFieldInstance.tokenize().then(payload => {
                    console.log(payload);
                    this.nonce = payload.nonce
                    console.log(this.nonce);
                })
                    .catch(err => {
                        console.error(err);
                        this.error = err.message;
                    })
                    .then(() => {
                        this.paymentResponse()
                    })
            }
        },
        refreshPage() {
            if (JSON.parse(localStorage.getItem("pageReloaded") === null)) {
                localStorage.setItem("pageReloaded", 1)
                this.$router.go(0);
            } else {
                localStorage.removeItem("pageReloaded")
            }
        },
        paymentResponse() {
            const data = {
                cart: this.store.cart,
                nonce: this.nonce,
                totalPrice: this.store.totalPrice,
                name: this.name,
                surname: this.surname,
                email: this.email,
                telephone: this.phone_number,
                address: this.address,
            }
            console.log(data)
            axios.post(this.store.apiBaseUrl + this.store.apiUrls.payment, data)
                .then((response) => {
                    console.log(response)
                    if (response.data.success === true) {
                        this.store.cart = [],
                            localStorage.clear();
                        this.store.cartWarning = false
                        swal("Pagamento effettuato", "Il tuo ordine arriverà a breve", "success");
                        this.$router.push({ name: 'home' });
                    }
                }
                )
                .catch(err => {
                        swal("Pagamento rifiutato", "Il tuo ordine non è stato effetuato", "error");
                    })
        }
    },
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_partial/variables' as *;

.section-payment {
    margin-top: 100px;
    .card{
        .card-header{
            border-radius: 10px 10px 0 0;
        }
        border-radius: 10px;
    }

    .card-header{
        background-color: $primary_color;
        color: $third_color;
    }

    input, .input-pay{
        border: 1px solid rgb(189, 189, 189);
        box-shadow: none !important;
    }
    .input-pay {
        height: 40px;
    }
}
.btn-paga{
    background-color: $primary_color;
    color: $third_color;
    padding: 10px 0;
}

.btn-paga:hover{
    background-color: $primary_color;
    color: $third_color;
    font-weight: bold;
}
</style>