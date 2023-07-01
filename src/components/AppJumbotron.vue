<script>
import { store } from '../store';
import SearchBar from './SearchBar.vue';


export default {
    name: "AppJumbotron",
    components: {
        SearchBar,
    },
    data() {
        return {
            store,
        }
    },
}
</script>


<template>
    <!-- Jumbotron -->
    <section class="jumbotron">
        <!-- Background Jumbotron -->
        <div class="wave"></div>
        <div class="plants"></div>
        <!-- /Background Jumbotron -->
        <!-- Jumbotron Content -->
        <div class="jumbotron-content">
            <!-- Carousel Autoplay -->
            <div id="carouselExampleAutoplaying" class="carousel carousel-dark slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="container">
                            <div class="row">
                                <!-- column left-->
                                <div class="col-md-6 col-sm-12">
                                    <div class="column-content">
                                        <div class="titles">
                                            <h1>Il bello è prenderci gusto</h1>
                                            <h4>Ordina online dai tuoi ristoranti preferiti</h4>
                                        </div>
                                    </div>
                                </div>
                                <!-- /column left-->
                                <!-- column right -->
                                <div class="col-md-6 col-sm-12">
                                    <div class="column-content">
                                        <img class="d-block img-jumbo" src="../assets/img/jumbotron_hamburger.png">
                                    </div>
                                </div>
                                <!-- /column right -->
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="container">
                            <div class="row">
                                <!-- column left -->
                                <div class="col-md-6 col-sm-12">
                                    <div class="column-content">
                                        <div class="titles">
                                            <h1>
                                                Prenota i migliori ristoranti per ogni occasione </h1>
                                            <h4>A casa tua con Food-For-All</h4>
                                        </div>
                                    </div>
                                </div>
                                <!-- /column left -->
                                <!-- column right -->
                                <div class="col-md-6 col-sm-12">
                                    <div class="column-content">
                                        <img class="d-block img-jumbo" src="../assets/img/sushi.png">
                                    </div>
                                </div>
                                <!-- /column right -->
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="container">
                            <div class="row">
                                <!-- column left -->
                                <div class="col-md-6 col-sm-12">
                                    <div class="column-content">
                                        <div class="titles">
                                            <h1>Il bello è prenderci gusto</h1>
                                            <h4>I più famosi, i più buoni, i preferiti. Quelli che trovi solo su Food For
                                                All.</h4>
                                        </div>
                                    </div>
                                </div>
                                <!-- /column left -->
                                <!-- column right -->
                                <div class="col-md-6 col-sm-12">
                                    <div class="column-content">
                                        <img class="d-block img-jumbo" src="../assets/img/pizza.png">
                                    </div>
                                </div>
                                <!-- /column right -->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Buttons prev next -->
                <button class="carousel-control-prev d-none" type="button" data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Precedente</span>
                </button>
                <button class="carousel-control-next d-none" type="button" data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Prossimo</span>
                </button>
                <!-- /Button prev next -->
            </div>
            <!-- Carousel Autoplay -->
        </div>
        <!-- /Jumbotron Content -->
        <!-- Searchbar -->
        <div class="container search">
            <SearchBar @searchText="search" />
        </div>
        <!-- /Searchbar -->
    </section>
    <!-- /Jumbotron -->
</template>


<style lang="scss" scoped>
@use '../assets/scss/_partial/variables' as *;

.jumbotron {
    position: relative;

    .wave {
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 100%;
        background: url(../assets/img/onda1arancione.png) right;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .plants {
        position: absolute;
        left: -2.875rem;
        bottom: -10px;
        width: 308px;
        height: 100%;
        background: url(../assets/img/basilico.png) no-repeat;
        transform: rotate(-10deg);
    }

    .jumbotron-content {
        padding: 6.25rem 0;
        position: relative;

        .column-content {
            margin: 2.6rem 0;
            padding: 2.5rem 1.25rem;

            .img-jumbo {
                object-fit: contain;
                width: 100%;
            }

            .titles {

                h1 {
                    text-transform: uppercase;
                    font-size: 3.25rem;
                    color: $fifth_color;
                }

                h4 {
                    font-size: 1.5rem;
                    color: $fourth_color;
                }
            }
        }
    }
}

// Media Query
@media screen and (max-width: 760px) {
    .jumbotron {
        .wave {
            height: 80%;
        }

        .plants {
            left: -2.875rem;
            bottom: -25.75rem;
        }

        .jumbotron-content {
            padding: 50px 0 50px 0;
            height: 35.5rem;

            .column-content {
                display: flex;
                justify-content: center;
                padding: 0;

                .img-jumbo {
                    width: 70%;
                    transform: translate(0, -65px);
                }

                .titles {
                    text-align: center;

                    h1 {
                        font-size: 38px;
                    }

                    h4 {
                        font-size: 18px;
                        color: rgb(65, 65, 65);
                    }
                }
            }
        }
    }

    .search-bar {
        width: 100%;
        transform: translate(0, -90px);

    }
}</style>

