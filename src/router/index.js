import Vue from 'vue';
import VueRouter from 'vue-router';
import Route from '../views/Route.vue';
import Routes from '../views/Routes.vue';
import Explore from '../views/Explore.vue';
import Profile from '../views/Profile.vue';
import Home from '../views/Home.vue';
import Test from '../views/Test.vue';
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
		component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
	},
	{
		path: '/register',
		name: 'Register',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
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
		path: '/routes/:route_id',
		name: 'RouteDetail',
		component: () => import(/* webpackChunkName: "route-detail" */ '../views/Route.vue'),
	},
	{
		path: '/imageUpload',
		name: 'imageUpload',
		component: () => import(/* webpackChunkName: "route-detail" */ '../views/ImageUpload.vue'),
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
	},
	{
		path: '/test',
		name: 'Test',
		component: Test,
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
	if (!loginPotreban && user) {
		// Ako je login potreban i user ne postoji u local storage-u onda ga preusmjeri na login
		next('/');
		return;
	}

	next();
});

export default router;
