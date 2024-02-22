<template>
	<v-container class="mx-auto">
		<v-row>
			<ProfileCard />
		</v-row>
		<v-row
			align="center"
			justify="center"
		>
			<v-col
				cols="12"
				sm="6"
				md="4"
				lg="4"
				class="py-0"
			>
				<p class="text-uppercase mt-8 text-center">Favourite walks</p>
			</v-col>
		</v-row>
		<v-row v-if="routes.length > 0">
			<v-col
				v-for="route in routes"
				:key="route._id"
				cols="12"
				sm="6"
				md="4"
				lg="4"
			>
				<router-link
					:to="'/walks/' + route._id"
					style="text-decoration: none"
				>
					<WalkCard :route="route" />
				</router-link>
			</v-col>
		</v-row>
		<v-row v-if="showBrowse">
			<v-col
				align="center"
				justify="center"
			>
				<router-link
					:to="'/walks'"
					style="text-decoration: none"
				>
					<v-btn
						class="mt-3 text-white text-caption"
						color="accent"
					>
						browse <i class="fa-solid fa-plus"></i>
					</v-btn>
				</router-link>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ProfileCard from '../components/Cards/ProfileCard.vue';
import WalkCard from '@/components/Cards/WalkCard.vue';
import { Korisnik, Auth, Rute } from '@/services';

export default {
	name: 'Profile',
	components: { ProfileCard, WalkCard },
	data() {
		return {
			favourites: [],
			routes: [],
			showBrowse: false,
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
			if (this.favourites.length == 0) this.showBrowse = true;
		},
		async getRoute(favourite) {
			try {
				const routeId = favourite;
				const response = await Rute.getRouteById(routeId);
				this.routes.push(response);
			} catch (e) {
				console.error(e);
			}
		},
	},
};
</script>

<style scoped></style>
