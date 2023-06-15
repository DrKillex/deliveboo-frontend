import {createRouter, createWebHistory} from 'vue-router';
import AppHome from './pages/AppHome.vue';
import AppAbout from './pages/AppAbout.vue';
import AppRestaurants from './pages/AppRestaurants.vue';
import FormRestaurant from './pages/FormRestaurant.vue';
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
            component: AppRestaurants
        },
        {
            path: '/formrestaurant',
            name: 'formrestaurant',
            component: FormRestaurant
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