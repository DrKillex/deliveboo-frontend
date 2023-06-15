<script>
import axios from 'axios';
import { store } from "../store";
export default {
    name: 'AppRestaurant',
    data() {
        return {
            store,
            restaurant: null,
            formData: {
                restaurant: '',
                address: '',
                description: '',
                telephone: '',
                email: '',
                opening_hours: '',
                p_iva: '',
                img: null,
                user_id: '',
            }
        }
    },
    methods: {
        handleFileInputChange(event) {
            this.img = event.target.files[0].name;
        },
        addRestaurant() {
            const data = {
                restaurant: this.formData.restaurant,
                address: this.formData.address,
                description: this.formData.description,
                telephone: this.formData.telephone,
                email: this.formData.email,
                opening_hours: this.formData.opening_hours,
                p_iva: this.formData.p_iva,

                user_id: this.formData.user_id
            };
            axios.post(this.store.apiBaseUrl + '/restaurants', data)
                .then((response) => {
                    if (response.status === 201) {
                        // this.restaurant.push(response.data)
                        console.log(response)
                    }

                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="row">
            <form @submit.prevent="addRestaurant">
                <div class="mb-3">
                    <label for="name" class="form-label">Nome ristorante:</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="Inserisci nome ristorante"
                        v-model="formData.restaurant">
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Indirizzo ristorante:</label>
                    <input type="text" class="form-control" id="address" name="address"
                        placeholder="Inserisci indirizzo ristorante" v-model="formData.address">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Descrizione ristorante:</label>
                    <textarea class="form-control" id="description" name="description" rows="4"
                        v-model="formData.description"></textarea>
                </div>
                <div class="mb-3">
                    <label for="telephone" class="form-label">Inserisci numero di telefono:</label>
                    <input type="text" class="form-control" id="telephone" name="telephone"
                        placeholder="Inserisci numero di telefono" v-model="formData.telephone">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email ristorante:</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="inserisci email"
                        v-model="formData.email">
                </div>
                <div class="mb-3">
                    <label for="p_iva" class="form-label">Partita Iva:</label>
                    <input type="text" class="form-control" id="p_iva" name="p_iva" placeholder="Inserisci partita Iva"
                        v-model="formData.p_iva">
                </div>
                <div class="mb-3">
                    <label for="opening_hours" class="form-label">Orario d'apertura:</label>
                    <input type="text" class="form-control" id="opening_hours" name="opening_hours"
                        placeholder="Inserisci orario d'apertura" v-model="formData.opening_hours">
                </div>
                <div class="mb-3">
                    <label for="img" class="form-label">Immagine ristorante:</label>
                    <input class="form-control" type="file" id="img" name="img" @change="handleFileInputChange">
                </div>
                <div class="mb-3">
                    <label for="user_id" class="form-label">User id:</label>
                    <input type="text" class="form-control" id="user_id" name="user_id" placeholder="Inserisci user id"
                        v-model="formData.user_id">
                </div>
                <button class="btn btn-primary">Aggiungi</button>
            </form>
        </div>
    </div>
</template>
 
<style lang="scss" scoped></style>