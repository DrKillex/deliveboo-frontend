import {createRouter, createWebHistory} from 'vue-router';
import AppHome from './pages/AppHome.vue';
import AppAbout from './pages/AppAbout.vue';
import AppRestaurant from './pages/AppRestaurants.vue';
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
            path: '/restaurants',
            name: 'restaurants',
            component: AppRestaurant
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