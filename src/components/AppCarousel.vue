<!-- pagina about -->
<script>
export default {
    name: "AppCarousel"

}
</script>


<template>
    <div id="carouselExampleAutoplaying-two" class="carousel slide carousel-dark" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <div class="w-100 d-flex justify-content-center gap-3">
                    <div><img src="../assets/img/rist1.jpg" alt=""></div>
                    <div><img src="../assets/img/rist2.jpg" alt=""></div>
                    <div><img src="../assets/img/rist3.jpg" alt=""></div>
                    <div><img src="../assets/img/rist4.jpg" alt=""></div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="w-100 d-flex justify-content-center gap-3">
                    <div><img src="../assets/img/rist5.jpg" alt=""></div>
                    <div><img src="../assets/img/rist6.jpg" alt=""></div>
                    <div><img src="../assets/img/rist7.jpg" alt=""></div>
                    <div><img src="../assets/img/rist8.jpg" alt=""></div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="w-100 d-flex justify-content-center gap-3">
                    <div><img src="../assets/img/rist3.jpg" alt=""></div>
                    <div><img src="../assets/img/rist3.jpg" alt=""></div>
                    <div><img src="../assets/img/rist3.jpg" alt=""></div>
                    <div><img src="../assets/img/rist3.jpg" alt=""></div>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying-two"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying-two"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/_partial/variables' as *;

img {
    width: 28rem;
    height: 15rem;
    box-shadow: 0px 1px 16px 0px #000000;
    margin-bottom: 2rem;
}
</style>