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
				<i
					class="fa-solid fa-trash"
					style="cursor: pointer"
					@click="deleteWalk(walk.routeId)"
				></i>
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
		<v-row
			v-for="tag of createdTags"
			:key="tag.value"
			class="text-center"
			justify="center"
		>
			<v-col cols="1">
				<i
					class="fa-solid fa-trash"
					style="cursor: pointer"
					@click="deleteTag(tag.routeId, tag.value)"
				></i>
			</v-col>
			<v-col
				lg="2"
				md="4"
				sm="6"
				><p class="text-subtitle-2 font-weight-light text-left">{{ tag.routeId }}</p></v-col
			>
			<v-col
				lg="2"
				md="4"
				sm="6"
				><p class="text-subtitle-2 font-weight-light text-left">{{ tag.value }}</p></v-col
			>
		</v-row>

		<v-row>
			<p class="text-h6 font-weight-medium">Points of interest</p>
		</v-row>
		<v-row
			v-for="point of createdPoints"
			:key="point.name"
			class="text-center"
			justify="center"
		>
			<v-col cols="1">
				<i
					class="fa-solid fa-trash"
					style="cursor: pointer"
					@click="deletePoint(point.routeId, point.name)"
				></i>
			</v-col>
			<v-col
				lg="2"
				md="4"
				sm="6"
				><p class="text-subtitle-2 font-weight-light text-left">{{ point.routeId }}</p></v-col
			>
			<v-col
				lg="2"
				md="4"
				sm="6"
				><p class="text-subtitle-2 font-weight-light text-left">{{ point.name }}</p></v-col
			>
		</v-row>
	</v-container>
</template>

<script>
import { Korisnik, Auth, Rute } from '@/services';

export default {
	name: 'Uploads',
	data() {
		return {
			createdWalks: [],
			createdTags: [],
			createdPoints: [],
		};
	},
	created() {
		this.getUser();
	},
	methods: {
		async deletePoint(walkId, pointName) {
			try {
				let pointObject = {
					name: pointName,
				};
				let success = await Rute.deletePoint(walkId, pointObject);
				if (success) {
					try {
						await Korisnik.deleteCreatedPoint(Auth.state.username, pointObject);
					} catch (e) {
						console.error(e);
					}
				} else {
					console.log('Error while deleting route.');
				}
			} catch (e) {
				console.error(e);
			}
			location.reload();
		},
		async deleteTag(walkId, tagValue) {
			try {
				let tagObject = {
					value: tagValue,
				};
				let success = await Rute.deleteTag(walkId, tagObject); // Nastaviti na services napravit deleteTag, pronaci rutu sa walkId, i pronaći point sa tagValue imenom
				if (success) {
					try {
						await Korisnik.deleteCreatedTag(Auth.state.username, tagObject);
					} catch (e) {
						console.error(e);
					}
				} else {
					console.log('Error while deleting route.');
				}
			} catch (e) {
				console.error(e);
			}
			location.reload();
		},
		async deleteWalk(walkId) {
			try {
				let success = await Rute.deleteWalk(walkId);
				if (success) {
					try {
						await Korisnik.deleteCreatedWalk(Auth.state.username, walkId);
					} catch (e) {
						console.error(e);
					}
				} else {
					console.log('Error while deleting route.');
				}
			} catch (e) {
				console.error(e);
			}
			location.reload();
		},
		async getUser() {
			const username = Auth.state.username;
			Korisnik.getUser(username)
				.then((response) => {
					this.getCreatedWalks(response._id);
					this.getCreatedTags(response._id);
					this.getCreatedPoints(response._id);
				})
				.catch((error) => {
					console.error(error);
				});
		},
		async getCreatedPoints(userId) {
			try {
				let data = await Korisnik.getCreatedPoints(userId);
				this.createdPoints = data.createdPoints;
				console.log(this.createdPoints);
			} catch (e) {
				console.error(e);
			}
		},
		async getCreatedTags(userId) {
			try {
				let data = await Korisnik.getCreatedTags(userId);
				this.createdTags = data.createdTags;
				console.log(this.createdTags);
			} catch (e) {
				console.error(e);
			}
		},
		async getCreatedWalks(userId) {
			try {
				let data = await Korisnik.getCreatedWalks(userId);
				this.createdWalks = data.createdWalks;
				console.log(this.createdWalks);
			} catch (e) {
				console.error(e);
			}
		},
	},
};
</script>
