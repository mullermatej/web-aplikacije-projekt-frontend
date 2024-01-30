import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import VueGeolocation from 'vue-browser-geolocation';
import Croppa from 'vue-croppa';
import 'vue-croppa/dist/vue-croppa.css';

import { initializeApp } from 'firebase/app';

Vue.config.productionTip = false;
Vue.use(VueGeolocation);
Vue.use(Croppa);

new Vue({
	router,
	vuetify,
	render: (h) => h(App),
}).$mount('#app');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAgnNt4A5c2GpvH04M9flyuq86zHYCT3OA',
	authDomain: 'walk-it-4c57e.firebaseapp.com',
	projectId: 'walk-it-4c57e',
	storageBucket: 'walk-it-4c57e.appspot.com',
	messagingSenderId: '736053495666',
	appId: '1:736053495666:web:667db2f9c5fb2c430e7feb',
	measurementId: 'G-4CH6H2E6KK',
};

initializeApp(firebaseConfig);
