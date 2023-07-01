<script>
export default {
    name: "AppFooter"
}
</script>


<template>
    <section class="footer py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-3 col-sm-6 col-6">
                    <h5 class="fw-bold">Scarica l'app</h5>
                    <ul>
                        <li><a href=""><img src="../assets/img/google-play-download.png" alt="google-play-download"></a>
                        </li>
                        <li class="mt-1"><a href=""><img src="../assets/img/app-store-d.png" alt="app-store-download"></a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-3 col-sm-6 col-6">
                    <h5 class="fw-bold">Servizi</h5>
                    <ul>
                        <li><a href="">Chi Siamo</a></li>
                        <li><a href="">Contatti</a></li>
                        <li><a href="">Sei un ristorante</a></li>
                        <li><a href="">Domande frequenti</a></li>
                        <li><a href="">Lavora con noi</a></li>
                        <li><a href="">Design</a></li>
                    </ul>
                </div>
                <div class="col-md-3 col-sm-6 col-6">
                    <h5 class="fw-bold">Termini</h5>
                    <ul>
                        <li><a href="">Termini di utilizzo</a></li>
                        <li><a href="">Normativa sulla privacy e sui cookie</a></li>
                        <li><a href="">Consenti i cookie</a></li>
                        <li><a href="">Blog</a></li>
                        <li><a href="">Food For All Gift Card</a></li>
                    </ul>
                </div>
                <div class="col-md-3 col-sm-6 col-6">
                    <h5 class="fw-bold">Social</h5>
                    <p>Seguici su tutti i nostri canali Social</p>
                    <ul class="social d-flex">
                        <li class="me-2"><font-awesome-icon icon="fa-brands fa-facebook-f" /></li>
                        <li class="me-2"><font-awesome-icon icon="fa-brands fa-instagram" /></li>
                        <li><font-awesome-icon icon="fa-brands fa-twitter" /></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
@use '../assets/scss/_partial/variables' as *;

.footer {
    background-color: $secondary_color;
    color: $fifth_color;

    .logo {
        img {
            width: 140px;
        }
    }

    p{
            margin-bottom: .3125rem;
        }
    .social {
        li {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: $primary_color;
            color: $third_color;
        }
        li:hover {
            cursor: pointer;
            color: $secondary_color;
        }

    }

    ul {
        padding: 0;

        li {
            list-style-type: none;
            margin-top: 5px;

            a:hover {
                text-decoration: underline;
            }

            a {
                text-decoration: none;
                color: rgb(71, 71, 71);

                img {
                    width: 150px;
                }
            }
        }
    }
}
</style>