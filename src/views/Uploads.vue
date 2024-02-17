<template>
	<v-container justify-center>
		<v-row>
			<p class="text-h6 font-weight-medium">Walks</p>
		</v-row>
		<v-row
			class="text-center"
			justify="center"
		>
			<v-col cols="1"></v-col>
			<v-col
				lg="2"
				md="4"
				sm="6"
				><p class="mb-0 text-decoration-underline text-left">Identification number</p></v-col
			>
			<v-col
				lg="2"
				md="4"
				sm="6"
				><p class="mb-0 text-decoration-underline text-left">Name</p></v-col
			>
		</v-row>
		<v-row
			v-for="walk of createdWalks"
			:key="walk.routeId"
			class="text-center"
			justify="center"
		>
			<v-col cols="1">
				<i class="fa-solid fa-trash"></i>
			</v-col>
			<v-col
				lg="2"
				md="4"
				sm="6"
				><p class="text-subtitle-2 font-weight-light text-left">{{ walk.routeId }}</p></v-col
			>
			<v-col
				lg="2"
				md="4"
				sm="6"
				><p class="text-subtitle-2 font-weight-light text-left">{{ walk.name }}</p></v-col
			>
		</v-row>

		<v-row>
			<p class="text-h6 font-weight-medium">Tags</p>
		</v-row>
	</v-container>
</template>

<script>
import { Korisnik, Auth } from '@/services';

export default {
	name: 'Uploads',
	data() {
		return {
			createdWalks: [],
			createdTags: [
				{
					routeId: '64fdd11ff214902bee2f2291',
					value: 'Great for families',
				},
			],
			createdPoints: [
				{
					routeId: '64fdd11ff214902bee2f2291',
					name: 'Parking Spot',
				},
			],
		};
	},
	created() {
		this.getUser();
	},
	methods: {
		async getUser() {
			const username = Auth.state.username;
			Korisnik.getUser(username)
				.then((response) => {
					this.getCreatedWalks(response._id);
				})
				.catch((error) => {
					console.error(error);
				});
		},
		async getCreatedWalks(userId) {
			try {
				let data = await Korisnik.getCreatedWalks(userId);
				this.createdWalks = data.createdWalks;
			} catch (e) {
				console.error(e);
			}
		},
	},
};
</script>
