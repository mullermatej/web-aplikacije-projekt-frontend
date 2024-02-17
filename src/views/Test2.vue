<template>
	<v-container class="mx-auto">
		<v-img
			width="100%"
			height="300"
			cover
			class="mx-auto rounded"
			:src="route.imageUrl"
		></v-img>

		<v-row>
			<v-col
				cols="3"
				class="d-flex align-left"
			>
				<img
					:src="route.creatorImg"
					alt=""
					width="40px"
					height="40px"
				/>
				<p class="pt-2 pl-2 text-body">{{ route.createdBy }}</p>
			</v-col>
			<v-col
				align="center"
				justify="center"
				cols="6"
			>
				<p class="text-h4 text-center mt-2 mb-0">{{ route.name }}</p>
				<p class="text-subtitle-2 text-center">{{ route.location }}</p>
			</v-col>
			<v-col cols="3"
				><p class="text-body text-right pt-2">{{ route.date }}</p></v-col
			>
		</v-row>

		<v-row>
			<v-col align="center">
				<v-btn
					v-if="added"
					class="rounded-pill text-white text-caption"
					color="secondary"
					@click="addFavourite(), (added = false)"
				>
					add &nbsp; <i class="fa-regular fa-heart"></i>
				</v-btn>
				<v-btn
					v-else
					class="rounded-pill text-white text-caption"
					color="secondary"
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

		<p class="text-h5 mt-10">Route tags</p>

		<v-item-group
			multiple
			class="mb-4 text-capitalize text-caption"
		>
			<v-item class="mx-1 my-1">
				<v-chip
					class="text-white"
					color="#A2B29F"
				>
					{{ route.distance }} kilometers
				</v-chip>
			</v-item>
			<v-item class="mx-1 my-1">
				<v-chip
					class="text-white"
					color="#A2B29F"
				>
					{{ route.difficulty }} difficulty
				</v-chip>
			</v-item>

			<v-item class="mx-1 my-1">
				<v-chip
					class="text-white"
					color="#A2B29F"
				>
					takes about {{ route.duration }} minutes
				</v-chip>
			</v-item>
		</v-item-group>

		<p
			class="text-h5 mt-10"
			justify="center"
		>
			Community tags
			<span
				style="cursor: pointer"
				@click="tagDialog = true"
				>+</span
			>
		</p>

		<v-row v-if="route.communityTags < 1">
			<v-col>
				<v-btn
					class="rounded-pill text-overline"
					@click="tagDialog = true"
				>
					New <i class="fa-solid fa-plus"></i>
				</v-btn>
			</v-col>
		</v-row>
		<v-row v-else>
			<v-item-group
				multiple
				class="mb-5 text-capitalize text-caption"
			>
				<v-item
					v-for="tag in route.communityTags"
					:key="tag"
				>
					<v-item class="mx-1 my-1">
						<v-chip
							class="text-white"
							color="primary"
						>
							{{ tag }}
						</v-chip>
					</v-item>
				</v-item>
			</v-item-group>
		</v-row>

		<p
			class="text-h5 mt-10"
			justify="center"
		>
			Points of interest
			<span
				style="cursor: pointer"
				@click="poiDialog = true"
				>+</span
			>
		</p>

		<v-row
			v-if="this.pointsOfInterest < 1"
			class="mb-10"
		>
			<v-col>
				<v-btn
					class="rounded-pill text-overline"
					@click="poiDialog = true"
				>
					New <i class="fa-solid fa-plus"></i>
				</v-btn>
			</v-col>
		</v-row>
		<v-row
			v-else
			class="mb-10"
		>
			<v-col
				v-for="point in this.pointsOfInterest"
				:key="point.id"
				cols="auto"
			>
				<v-card
					class="mx-2 my-2 rounded-xl"
					:href="`https://www.google.com/maps/place/${point.coordinates}`"
					target="_blank"
					max-width="350"
					color="#99a897"
					style="text-decoration: none"
				>
					<v-card-text>
						<div class="text-white">
							<v-card-title class="text-h5"> {{ point.name }} </v-card-title>
							<v-card-subtitle>
								<span class="text-body-2">{{ point.coordinates }}</span>
							</v-card-subtitle>
						</div>
					</v-card-text>
					<v-img
						:src="point.imageUrl"
						width="100%"
						height="200"
						cover
					></v-img>
				</v-card>
			</v-col>
		</v-row>

		<v-dialog
			v-model="poiDialog"
			width="auto"
		>
			<v-sheet
				width="400"
				class="mx-auto"
			>
				<v-form
					fast-fail
					@submit.prevent
					class="py-8 px-8"
				>
					<v-text-field
						v-model="poiName"
						label="Point of interest"
						:rules="poiNameRules"
					></v-text-field>
					<v-text-field
						v-model="poiCoordinates"
						label="Coordinates"
						:rules="poiCoordinatesRules"
					></v-text-field>

					<v-row
						align="center"
						justify="center"
						class="mt-2"
					>
						<v-col
							cols="12"
							align="center"
							justify="center"
						>
							<croppa
								v-model="imageReference"
								:width="300"
								:height="169"
								:accept="'image/*'"
								:quality="8"
							>
							</croppa>
						</v-col>
					</v-row>

					<v-row>
						<v-col
							><v-btn
								@click="addPointOfInterest()"
								block
								type="submit"
								class="mt-2 text-white rounded-xl"
								color="#A2B39F"
								>Submit</v-btn
							></v-col
						>
						<v-col
							><v-btn
								@click="poiDialog = false"
								block
								class="mt-2 text-white rounded-xl"
								color="#FF6868"
								>Cancel</v-btn
							></v-col
						>
					</v-row>
				</v-form>
			</v-sheet>
		</v-dialog>

		<div id="map"></div>

		<v-dialog
			v-model="tagDialog"
			width="auto"
		>
			<v-sheet
				width="400"
				class="mx-auto"
			>
				<v-form
					@submit.prevent
					class="py-4 px-4"
				>
					<v-text-field
						v-model="newTag"
						label="New tag"
						type="text"
						:rules="newTagRules"
						class="mx-4"
					>
					</v-text-field>

					<v-row>
						<v-col>
							<v-btn
								class="rounded-xl text-white"
								color="#A2B39F"
								block
								@click="addTag()"
								>Submit</v-btn
							>
						</v-col>
						<v-col>
							<v-btn
								class="rounded-xl text-white"
								color="#FF6868"
								block
								@click="tagDialog = false"
								>Close</v-btn
							>
						</v-col>
					</v-row>
				</v-form>
			</v-sheet>
		</v-dialog>

		<v-snackbar
			v-model="snackbar"
			timeout="2000"
			color="primary"
		>
			<div class="text-center text-caption">{{ snackbarText }}</div>
		</v-snackbar>
	</v-container>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import { Auth, Rute, Korisnik } from '@/services';
import { storage } from '@/firebase';

export default {
	name: 'Test2',
	data() {
		return {
			snackbar: false,
			map: null,
			snackbarText: '',
			pointsOfInterest: null,
			flippedCoordinates: this.centerCoordiant,
			imageReference: null,
			poiCoordinates: '',
			poiCoordinatesRules: [],
			poiName: '',
			poiNameRules: [
				(value) => {
					if (value?.length > 2 && value?.length < 23) return true;
					return 'Please enter a name.';
				},
			],
			map: null,
			centerCoordinates: null,
			route: {},
			favourites: [],
			added: true,
			communityTags: [],
			tagDialog: false,
			poiDialog: false,
			newTag: '',
			newTagRules: [
				(value) => {
					if (value?.length > 2 && value?.length < 23) return true;
					return 'Please enter a valid tag.';
				},
			],
		};
	},
	created() {
		this.getRoute();
		this.getFavourites();
	},
	mounted() {
		mapboxgl.accessToken =
			'pk.eyJ1IjoibXVsbGVybWF0ZWoxOCIsImEiOiJjbGt3ZjdqZHEwdnBvM2twbTRrZDlodWpxIn0.LwbRQW9Up-KStWz9Jp3J5A';
	},
	computed: {
		device() {
			return this.$vuetify.breakpoint.name;
		},
	},
	methods: {
		async uploadImageAndGetUrl(blobData) {
			try {
				let imageName = 'userUploads/' + Auth.state.username + '/' + Date.now() + '.png';
				const uploadTask = storage.ref(imageName).put(blobData);
				return new Promise((resolve, reject) => {
					uploadTask.on(
						'state_changed',
						(snapshot) => {},
						(error) => {
							console.error(error);
							reject(error);
						},
						() => {
							uploadTask.snapshot.ref
								.getDownloadURL()
								.then((url) => {
									console.log('Uploaded image URL:', url);
									resolve(url);
								})
								.catch((error) => {
									console.error('Error getting download URL:', error);
									reject(error);
								});
						}
					);
				});
			} catch (error) {
				console.error('Error uploading image:', error);
				throw error;
			}
		},
		async addPointOfInterest() {
			this.snackbarText = 'Adding point of interest, please wait';
			this.snackbar = true;
			try {
				this.imageReference.generateBlob(async (blobData) => {
					try {
						let imageUrl = await this.uploadImageAndGetUrl(blobData);
						let newPointOfInterest = {
							name: this.poiName,
							coordinates: this.poiCoordinates,
							imageUrl: imageUrl,
						};

						let success = await Rute.addPointOfInterest(this.$route.params.routeId, newPointOfInterest);
						// (username, routeId, pointName)
						// u userov createdPoints array spremi novi objekt sa routeId i pointName ključevima
						// treba patch za korisnika auth.state.username, u ključ createdPoints pushaj novi objekt
						if (success) {
							this.pointsOfInterest = success.pointsOfInterest;
							location.reload();
						} else {
							console.log('Unable to add POI');
						}
					} catch (error) {
						console.error('Error saving POI:', error);
					}
				});
			} catch (error) {
				console.error('Error generating blob:', error);
			}
		},
		async getPointsOfInterest() {
			try {
				const routeId = this.$route.params.routeId;
				const response = await Rute.getPointsOfInterest(routeId);
				this.pointsOfInterest = response.pointsOfInterest;
			} catch (e) {
				console.error(e);
			}
		},
		async getRoute() {
			try {
				const routeId = this.$route.params.routeId;
				const response = await Rute.getRouteById(routeId);
				this.route = response;
				this.communityTags = this.route.communityTags;
			} catch (e) {
				console.error(e);
			}
			this.map = new mapboxgl.Map({
				container: 'map',
				style: 'mapbox://styles/mullermatej18/clkxpusvp005m01p83bzb9x0z',
				center: this.route.coordinates[0], // početna pozicija
				zoom: 15, // početni zoom
				scrollZoom: true,
				maxZoom: 18,
				minZoom: 9,
			});
			this.map.on('load', () => {
				const el = document.createElement('div');
				el.className = 'marker';

				const marker = new mapboxgl.Marker(el).setLngLat(this.route.coordinates[0]).addTo(this.map);

				marker.getElement().addEventListener('click', () => {
					window.open(
						`https://www.google.com/maps/place/${this.route.coordinates[0][1]},${this.route.coordinates[0][0]}`
					);
				});
			});
			this.map.addControl(new mapboxgl.NavigationControl());
			this.map.addControl(
				new mapboxgl.GeolocateControl({
					positionOptions: {
						enableHighAccuracy: true,
					},
					trackUserLocation: true,
					showUserHeading: true,
				})
			);
			this.getPointsOfInterest();
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
		async addTag() {
			if (this.newTag == '' || this.newTag.length < 3 || this.newTag.length > 22) return false;
			try {
				const routeId = this.$route.params.routeId;
				let updates = {
					newTag: this.newTag,
				};
				let success = await Rute.addTag(routeId, updates);
				if (success) {
					console.log('New tag added');
				} else {
					console.log('Unable to add new tag');
				}
			} catch (e) {
				console.error(e);
			}
			location.reload();
		},
	},
};
</script>

<style scoped>
#map {
	width: 100%;
	height: 400px;
}
</style>
