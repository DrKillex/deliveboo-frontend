import { createApp } from 'vue'
import { router } from './router';
import './assets/scss/main.scss';
import * as bootstrap from 'bootstrap';

import App from './App.vue'

createApp(App).use(router).mount('#app')
