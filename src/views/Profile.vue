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
				<p
					class="py-0 text-center font-size-5"
					style="font-size: 1.5rem"
				>
					favourite routes
				</p>
			</v-col>
		</v-row>
		<v-row>
			<v-col
				v-for="route in routes"
				:key="route._id"
				cols="12"
				sm="6"
				md="4"
				lg="4"
			>
				<router-link
					:to="'/test2/' + route._id"
					style="text-decoration: none"
				>
					<RouteCard :route="route" />
				</router-link>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ProfileCard from '../components/ProfileCard.vue';
import RouteCard from '@/components/Routes/RouteCard.vue';
import { Korisnik, Auth, Rute } from '@/services';

export default {
	name: 'Profile',
	components: { ProfileCard, RouteCard },
	data() {
		return {
			favourites: [],
			routes: [],
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
				this.routes.push(response);

				console.log(this.routes);
			} catch (e) {
				console.error(e);
			}
		},
	},
};
</script>

<style scoped></style>
