<script>
export default {
    name: "AppCart"
}
</script>


<template>
    <div class="order-sm-1 order-md-3 col-sm-12 col-md-4 col-lg-3">
        <!-- Offcanvas -->
        <button class="btn border-0 fs-6 p-0 border-dark-subtle mx-2" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><font-awesome-icon
                icon="fa-solid fa-cart-shopping" /></button>

        <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">I Miei Ordini</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <!-- Form dentro Offcanvas -->
            <div class="offcanvas-body" id="offcanvas">
                <form class="row g-3">
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Ordina</button>
                        <button type="submit" class="btn btn-warning">Svuota Carrello</button>
                    </div>
                </form>
            </div>
            <!-- Form dentro Offcanvas -->
        </div>
        <!-- /Offcanvas -->
    </div>
</template>


<style scoped></style>