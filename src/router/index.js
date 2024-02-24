import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
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
		path: '/Login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/Register',
		name: 'Register',
		component: Register,
	},
	{
		path: '/Explore',
		name: 'Explore',
		component: Explore,
	},
	{
		path: '/Profile',
		name: 'Profile',
		component: Profile,
	},
	{
		path: '/Walks',
		name: 'Walks',
		component: Walks,
	},
	{
		path: '/Walks/:routeId',
		name: 'Walk',
		component: Walk,
	},
	{
		path: '/Uploads',
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
	window.scrollTo(0, 0);
	const javneStranice = ['/Login', '/Register'];
	const loginPotreban = !javneStranice.includes(to.path);
	const user = Auth.getUser();
	if (loginPotreban && !user) {
		next('/Login');
		return;
	}
	next();
});

export default router;
