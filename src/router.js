import {createRouter, createWebHistory} from 'vue-router';
import AppHome from './pages/AppHome.vue';
import AppAbout from './pages/AppAbout.vue';

import AppRestaurantMenu from './pages/AppRestaurantMenu.vue';
import PageNotFound from './pages/PageNotFound.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/about',
            name: 'about',
            component: AppAbout
        },
        {
            path: '/menu/:slug',
            name: 'menu',
            component: AppRestaurantMenu
        },
        // {
        //     path: '',
        //     name: '',
        //     component: 
        // },
        // {
        //     path: '',
        //     name: '',
        //     component: 
        // },
        // {
        //     path: '',
        //     name: '',
        //     component: 
        // },
        { 
            path: '/:pathMatch(.*)*', 
            name: 'not-found',
            component: PageNotFound
        }
    ]
});

export { router };