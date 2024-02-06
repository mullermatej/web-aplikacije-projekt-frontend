<template>
	<v-container class="mx-auto">
		<v-img
			width="100%"
			height="300"
			cover
			class="mx-auto rounded"
			:src="route.imageUrl"
		></v-img>
		<p class="text-h4 text-center mt-4 mb-0">{{ route.name }}</p>
		<p class="text-subtitle-2 text-center mt-0 mb-4">{{ route.location }}</p>
		<v-row>
			<v-col align="center">
				<v-btn
					v-if="added"
					class="my-2 rounded-pill text-white"
					color="#A3B29F"
					@click="addFavourite(), (added = false)"
				>
					add &nbsp; <i class="fa-regular fa-heart"></i>
				</v-btn>
				<v-btn
					v-else
					class="my-2 rounded-pill text-white"
					color="#A3B29F"
					@click="removeFavourite(), (added = true)"
				>
					added &nbsp; <i class="fa-solid fa-heart"></i>
				</v-btn>
			</v-col>
		</v-row>

		<p class="text-h5 mt-4">Description</p>
		<p class="text-subtitle-1">
			{{ route.description }}
		</p>

		<p class="text-h5">Route tags</p>

		<v-item-group
			multiple
			class="mb-8"
		>
			<v-item class="ml-1 mr-1">
				<v-chip> {{ route.distance }} kilometers </v-chip>
			</v-item>
			<v-item class="ml-1 mr-1">
				<v-chip> {{ route.difficulty }} difficulty </v-chip>
			</v-item>
			<v-item class="ml-1 mr-1">
				<v-chip> {{ route.visited }} people already visited</v-chip>
			</v-item>
			<v-item class="ml-1 mr-1">
				<v-chip> takes about {{ route.duration }} minutes </v-chip>
			</v-item>
			<v-item class="ml-1 mr-1">
				<v-chip> Open all year </v-chip>
			</v-item>
		</v-item-group>

		<iframe
			:src="route.startingPosition"
			width="100%"
			height="400"
			class="rounded"
			style="border: 0"
			allowfullscreen="true"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		></iframe>
	</v-container>
</template>

<script>
import { Auth, Rute, Korisnik } from '@/services';

export default {
	name: 'Test2',
	data() {
		return {
			route: {},
			favourites: [],
			added: true,
		};
	},
	created() {
		this.getRoute();
		this.getFavourites();
	},
	methods: {
		async getRoute() {
			try {
				const routeId = this.$route.params.routeId;
				const response = await Rute.getRouteById(routeId);
				this.route = response;
			} catch (e) {
				console.error(e);
			}
		},
		async addFavourite() {
			let updates = {
				routeId: this.route._id,
			};
			let success = await Korisnik.addFavourite(Auth.state.username, updates);
			if (success) {
				console.log('Route added to favourites');
			} else {
				console.log('Unable to add route to favourites');
			}
		},
		async removeFavourite() {
			// to do
			let updates = {
				routeId: this.route._id,
			};
			let success = await Korisnik.removeFavourite(Auth.state.username, updates);
			if (success) {
				console.log('Route removed from favourites');
			} else {
				console.log('Unable to remove route from favourites');
			}
		},
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
			if (this.favourites.includes(this.$route.params.routeId)) {
				this.added = false;
			}
		},
	},
};
</script>
