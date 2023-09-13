import Vue from 'vue';
import VueRouter from 'vue-router';
import Route from '../views/Route.vue';
import Routes from '../views/Routes.vue';
import Explore from '../views/Explore.vue';
import Profile from '../views/Profile.vue';
import ProfilePublic from '../views/ProfilePublic.vue';
import Home from '../views/Home.vue';
import { Auth } from '@/services';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    },
    {
        path: '/profile/my_id',
        name: 'Profile',
        component: Profile,
    },

    {
        path: '/explore',
        name: 'Explore',
        component: Explore,
    },
    {
        path: '/routes',
        component: Routes,
        children: [],
    },
    {
        path: '/routes/route_id',
        component: Route,
        children: [],
    },
    {
        path: '/profile/user_id',
        name: 'ProfilePublic',
        component: ProfilePublic,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const javneStranice = ['/Login', '/Register'];
    const loginPotreban = !javneStranice.includes(to.path); // Login je potreban kada stranica na koju zelis doci nije u javneStranice
    const user = Auth.getUser(); // Provjeriti da li user postoji u local storage-u

    if (loginPotreban && !user) {
        // Ako je login potreban i user ne postoji u local storage-u onda ga preusmjeri na login
        next('/Login');
        return;
    }

    next();
});

export default router;
