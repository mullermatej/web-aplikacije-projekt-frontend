import Vue from 'vue';
import VueRouter from 'vue-router';
import Explore from '../views/Explore.vue';
import Profile from '../views/Profile.vue';
import Home from '../views/Home.vue';
import Walks from '../views/Walks.vue';
import Walk from '../views/Walk.vue';
import Uploads from '../views/Uploads.vue';
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
		component: Login,
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
	},
	{
		path: '/explore',
		name: 'Explore',
		component: Explore,
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
	},
	{
		path: '/walks',
		name: 'Walks',
		component: Walks,
	},
	{
		path: '/walks/:routeId',
		name: 'Walk',
		component: Walk,
	},
	{
		path: '/uploads',
		name: 'Uploads',
		component: Uploads,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	const javneStranice = ['/Login', '/Register'];
	const loginPotreban = !javneStranice.includes(to.path);
	const user = Auth.getUser();
	if (loginPotreban && !user) {
		next('/Login');
		return;
	}
	if (!loginPotreban && user) {
		next('/');
		return;
	}
	next();
});

export default router;
