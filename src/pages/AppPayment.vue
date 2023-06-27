<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-6 mb-4">
                <div class="card">
                    <h4 class="card-header titleOrder" style="color:#555">Riepilogo dell'ordine</h4>
                    <ul class="card-body mb-0">
                        <li class="card-text" v-for="food in store.cart">
                            {{ food.name }} x {{ food.quantity }}
                        </li>
                    </ul>
                    <span class="ps-3 mb-3">Totale: {{ this.store.totalPrice }}€</span>
                </div>
            </div>
            <div class="col-12 col-md-6 container-cc-info m-0">
                <div class="card color-sal">
                    <h4 class="card-header titlepayment">Informazioni consegna</h4>
                    <div class="card-body">
                        <div class="alert alert-success" v-if="nonce">
                            Successfully generated nonce.
                        </div>
                        <div class="alert alert-danger" v-if="error">
                            {{ error }}
                        </div>
                        <form @submit="HandlePayPostRedirectOrder" class="d-flex flex-column">
                            <div class="form-group">
                                <label>Nome</label>
                                <input type="text" v-model="name" class="form-control" placeholder="Inserisci Nome">
                            </div>
                            <div class="form-group">
                                <label>surname</label>
                                <input type="text" v-model="surname" class="form-control" placeholder="Inserisci cognome">
                            </div>
                            <div class="form-group">
                                <label>Indirizzo di consegna</label>
                                <input type="text" v-model="address" class="form-control"
                                    placeholder="Inserisci l'indirizzo di consegna">
                            </div>
                            <div class="form-group">
                                <label>email</label>
                                <input type="email" v-model="email" class="form-control" placeholder="Inserisci email">
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-6">
                                        <label>Numero di telefono</label>
                                        <input type="text" v-model="phone_number" class="form-control"
                                            placeholder="numero di telefono">
                                    </div>
                                    <div class="col-6 d-flex flex-column justify-content-between d-none">
                                        <label>Totale</label>
                                        <input type="text" v-model="store.totalPrice" class="form-control"
                                            placeholder="Totale" readonly>
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <h4 class="titlepayment">Informazioni pagamento</h4>
                            <hr />
                            <div class="form-group">
                                <label>Credit Card Number</label>
                                <div id="creditCardNumber" class="form-control"></div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-6">
                                        <label>Expire Date</label>
                                        <div id="expireDate" class="form-control"></div>
                                    </div>
                                    <div class="col-6">
                                        <label>CVV</label>
                                        <div id="cvv" class="form-control"></div>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-primary btn-block" @click.prevent="payWithCreditCard">paga</button>

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
import { store } from '../store';

export default {
    name: "AppPayment",
    data() {
        return {
            store,
            hostedFieldInstance: false,
            nonce: null,
            phone_number: '',
            name: '',
            address: '',
            error: '',
            surname:'',
            email:'',
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

    },


    methods: {
        setCart(){
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
                    .then(()=>{
                        this.paymentResponse()
                    })
            }
        },
        paymentResponse(){
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
                    
                }
                )
        }
    },



    mounted() {

    },

};
</script>

<style lang="scss" scoped></style>