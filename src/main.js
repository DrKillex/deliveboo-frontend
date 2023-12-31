import { createApp } from 'vue'
import { router } from './router';
import './assets/scss/main.scss';
import "@fontsource/montserrat"; // Defaults to weight 400
import * as bootstrap from 'bootstrap';
// /* import the fontawesome core /
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons - inserire qui le icone */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; 
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
/* add icons to the library - inserire qui le icone */
library.add(faUserSecret, faCartShopping,faTrash,faMagnifyingGlass, faFacebookF, faInstagram, faTwitter)

import App from './App.vue'


createApp(App).use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')

