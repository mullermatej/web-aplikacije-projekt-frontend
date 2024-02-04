<template>
	<v-container class="mx-auto">
		<ProfileCard />
		<v-btn @click="handleButton()">log routes</v-btn>
	</v-container>
</template>

<script>
import ProfileCard from '../components/ProfileCard.vue';
import { Korisnik, Auth, Rute } from '@/services';

export default {
	data() {
		return {
			favourites: [],
			routes: {},
		};
	},
	created() {
		this.getFavourites();
	},
	methods: {
		async getFavourites() {
			let i = 0;
			try {
				const response = await Korisnik.getFavourites(Auth.state.username);
				this.favourites = response.favourites;
			} catch (err) {
				console.error(err);
			}
			for (let favourite of this.favourites) {
				this.getRoute(this.favourites[i]);
				i = i + 1;
			}
		},
		async getRoute(favourite) {
			try {
				const routeId = favourite;
				const response = await Rute.getRouteById(routeId);
				this.routes = { ...this.routes, [routeId]: response };

				console.log(this.routes);
			} catch (e) {
				console.error(e);
			}
		},
		handleButton() {
			for (let routeId in this.routes) {
				const route = this.routes[routeId];
				console.log(route.imageUrl);
			}
		},
	},
	components: { ProfileCard },
};
</script>

<style scoped></style>
