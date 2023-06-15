<script>
export default {
    name: 'FormProduct',
    data(){
        return {
            formData: {
                name: '',
                description: '',
                price: '',
                image: '',
                glutenFree: '',
                vegan: ''
            }
        }

    }
}
</script>

<template>
    <div class="container mt-4">
        <form action="">
            <div class="mb-3">
                <label for="name" class="form-label">Nome prodotto</label>
                <input type="text" class="form-control" id="name" v-model="formData.name">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Descrizione prodotto</label>
                <textarea class="form-control" id="description" rows="3" v-model="formData.description"></textarea>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Prezzo</label>
                <input type="number" class="form-control" id="price" v-model="formData.price">
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Immagine</label>
                <input class="form-control" type="file" id="image">
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gluten-free">
                <label class="form-check-label" for="gluten-free">
                    Gluten Free
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="vegan">
                <label class="form-check-label" for="vegan">
                    Vegan
                </label>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Invia</button>

        </form>
    </div>
</template>

<style lang="scss" scoped>
h1 {
    color: red;

    span {
        color: blue;
    }
}
</style>