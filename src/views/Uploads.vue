<template>
	<v-container class="mx-auto">
		<v-row class="mt-6">
			<p class="text-h6 ml-4 font-weight-light">Walks</p>
		</v-row>
		<v-row
			v-if="createdWalks.length > 0"
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
				lg="3"
				md="4"
				sm="5"
				><p class="text-subtitle-2 font-weight-light text-left">{{ walk.routeId }}</p></v-col
			>
			<v-col
				lg="3"
				md="4"
				sm="5"
				><p class="text-subtitle-2 font-weight-light text-left">{{ walk.name }}</p></v-col
			>
		</v-row>
		<v-row v-if="!createdWalks.length > 0">
			<v-col>
				<p class="text-subtitle-2 font-weight-light text-center">
					You haven't created any points of interest yet.
				</p>
			</v-col>
		</v-row>

		<v-row>
			<p class="text-h6 ml-4 font-weight-light">Tags</p>
		</v-row>

		<v-row
			v-if="createdTags.length > 0"
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
				lg="3"
				md="4"
				sm="5"
				><p class="text-subtitle-2 font-weight-light text-left">{{ tag.routeId }}</p></v-col
			>
			<v-col
				lg="3"
				md="4"
				sm="5"
				><p class="text-subtitle-2 font-weight-light text-left">{{ tag.value }}</p></v-col
			>
		</v-row>
		<v-row v-if="!createdTags.length > 0">
			<v-col>
				<p class="text-subtitle-2 font-weight-light text-center">You haven't created any tags yet.</p>
			</v-col>
		</v-row>

		<v-row>
			<p class="text-h6 ml-4 font-weight-light">Points of interest</p>
		</v-row>
		<v-row
			v-if="createdPoints.length > 0"
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
				lg="3"
				md="4"
				sm="5"
				><p class="text-subtitle-2 font-weight-light text-left">{{ point.routeId }}</p></v-col
			>
			<v-col
				lg="3"
				md="4"
				sm="5"
				><p class="text-subtitle-2 font-weight-light text-left">{{ point.name }}</p></v-col
			>
		</v-row>
		<v-row v-if="!createdPoints.length > 0">
			<v-col>
				<p class="text-subtitle-2 font-weight-light text-center">
					You haven't created any points of interest yet.
				</p>
			</v-col>
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
			} catch (e) {
				console.error(e);
			}
		},
		async getCreatedTags(userId) {
			try {
				let data = await Korisnik.getCreatedTags(userId);
				this.createdTags = data.createdTags;
			} catch (e) {
				console.error(e);
			}
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
