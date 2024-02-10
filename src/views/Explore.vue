<template>
	<v-main>
		<div style="position: relative">
			<v-btn
				class="rounded-xl"
				color="white"
				style="position: absolute; top: 10px; left: 10px; z-index: 1"
				@click="saveCoordinates()"
			>
				{{ this.flippedCoordinates }}
			</v-btn>
			<v-btn
				v-if="!creatingRoute"
				class="rounded-xl"
				color="white"
				style="position: absolute; top: 55px; left: 10px; z-index: 1"
				@click="
					routeDialog = true;
					creatingRoute = true;
				"
				>create
			</v-btn>

			<v-btn
				v-if="coordinatesMode"
				class="rounded-xl text-white"
				color="#A2B39F"
				style="position: absolute; top: 10px; left: 10px; z-index: 1"
				@click="saveRoute()"
				>Done</v-btn
			>
			<v-btn
				v-if="coordinatesMode"
				class="rounded-xl text-white"
				color="#FF6868"
				style="position: absolute; top: 10px; left: 90px; z-index: 1"
				@click="resetCoordinates()"
				>Reset</v-btn
			>
			<v-btn
				v-if="coordinatesMode"
				class="rounded-xl"
				color="white"
				style="position: absolute; top: 55px; left: 10px; z-index: 1"
				@click="getCoordinates()"
				>Add coordinates</v-btn
			>
			<v-dialog
				v-model="routeDialog"
				width="auto"
				persistent
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
							v-model="routeName"
							label="Name"
							:rules="routeNameRules"
						></v-text-field>

						<v-textarea
							v-model="routeDescription"
							label="Description"
							:rules="routeDescriptionRules"
							auto-grow
							rows="1"
						></v-textarea>

						<v-spacer></v-spacer>

						<v-row
							align="center"
							justify="center"
						>
							<v-col cols="6">
								<v-text-field
									v-model="routeDistance"
									label="Distance (kilometers)"
									:rules="routeDistanceRules"
									type="number"
								></v-text-field>
							</v-col>
							<v-col cols="6">
								<v-text-field
									v-model="routeDuration"
									label="Duration (minutes)"
									:rules="routeDurationRules"
									type="number"
								></v-text-field>
							</v-col>
						</v-row>

						<v-select
							v-model="routeDifficulty"
							:rules="routeDifficultyRules"
							:items="items"
							label="Difficulty"
						></v-select>

						<v-text-field
							v-model="routeLocation"
							:rules="routeLocationRules"
							label="Location"
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
									@click="checkForm()"
									block
									type="submit"
									class="mt-2 text-white rounded-xl"
									color="#A2B39F"
									>Add coordinates</v-btn
								></v-col
							>
							<v-col
								><v-btn
									@click="
										routeDialog = false;
										creatingRoute = false;
									"
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
			<v-dialog
				v-model="coordinatesDialog"
				width="auto"
				persistent
			>
				<v-card>
					<v-card-title>Instructions</v-card-title>
					<v-card-text>
						<p class="text-subtitle">1. After clicking "CLOSE" a red dot will appear.</p>
						<p class="text-subtitle">2. Click "ADD COORDINATES" to add the current center coordinates.</p>
						<p class="text-subtitle">3. Move the map to the next position and click again.</p>
						<p class="text-subtitle">4. When finished click "DONE".</p>
					</v-card-text>
					<v-card-actions
						justify="center"
						align="center"
					>
						<v-row>
							<v-col>
								<v-btn
									class="text-white rounded-xl"
									color="#A2B39F"
									variant="text"
									@click="
										coordinatesDialog = false;
										showDot = true;
										routeDialog = false;
										coordinatesMode = true;
									"
								>
									Close
								</v-btn>
							</v-col>
						</v-row>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-dialog
				v-model="successDialog"
				width="auto"
			>
				<v-card
					align="center"
					class="pt-5"
				>
					<v-card-text>
						<p class="text-h5">Route created successfully!</p>
					</v-card-text>
					<v-card-actions>
						<v-btn
							class="rounded-xl text-white"
							color="#A2B39F"
							block
							@click="refreshSite()"
							>Close</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<v-snackbar
				v-model="snackbar"
				:timeout="timeout"
				align="center"
				justify="center"
			>
				<v-row
					alignt="center"
					justify="center"
				>
					<v-col
						cols="12"
						align="center"
						justify="center"
					>
						{{ snackbarText }}
					</v-col>
				</v-row>
			</v-snackbar>

			<div id="map"></div>
			<div
				id="middleDot"
				v-if="showDot"
			></div>
		</div>
	</v-main>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import { Rute, Auth } from '@/services';
import { storage } from '@/firebase';

export default {
	name: 'Explore',
	data() {
		return {
			snackbar: false,
			snackbarText: '',
			timeout: 2000,
			routes: [],
			map: null,
			centerCoordinates: null,
			flippedCoordinates: 'Latitude: 0, Longitude: 0',
			testCoordinates: [],
			routeDialog: false,
			coordinatesDialog: false,
			successDialog: false,
			showDot: true,
			imageReference: null,
			createdRoute: {},
			coordinatesMode: false,
			creatingRoute: false,
			routeName: '',
			routeNameRules: [
				(value) => {
					if (value?.length > 3) return true;
					return 'Name must be at least 4 characters.';
				},
			],
			routeDescription: '',
			routeDescriptionRules: [
				(value) => {
					if (value?.length > 15) return true;
					return 'Please write a longer description.';
				},
			],
			routeDistance: 0,
			routeDistanceRules: [
				(value) => {
					if (value > 0.0) return true;
					return 'Route must be longer.';
				},
			],
			routeDuration: 1,
			routeDurationRules: [
				(value) => {
					if (value > 0) return true;
					return 'Route must be longer.';
				},
			],
			routeDifficulty: null,
			items: ['Easy', 'Medium', 'Hard'],
			routeDifficultyRules: [
				(value) => {
					if (value !== null) return true;
					return 'Please select an option.';
				},
			],
			routeLocation: '',
			routeLocationRules: [
				(value) => {
					if (value?.length > 1) return true;
					return 'Please write the city/town.';
				},
			],
		};
	},
	created() {
		this.getAllRoutes();
	},
	mounted() {
		mapboxgl.accessToken =
			'pk.eyJ1IjoibXVsbGVybWF0ZWoxOCIsImEiOiJjbGt3ZjdqZHEwdnBvM2twbTRrZDlodWpxIn0.LwbRQW9Up-KStWz9Jp3J5A';
		this.map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mullermatej18/clkxpusvp005m01p83bzb9x0z',
			center: [13.859928, 44.860742], // početna pozicija
			zoom: 12, // početni zoom
			scrollZoom: true,
			maxZoom: 18,
		});
		this.map.on('move', () => {
			this.centerCoordinates = this.map.getCenter();
			this.flippedCoordinates = `Latitude: ${this.centerCoordinates.lat.toFixed(
				5
			)}, Longitude: ${this.centerCoordinates.lng.toFixed(5)}`;
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
	},
	methods: {
		async getAllRoutes() {
			try {
				const response = await Rute.getAll();
				this.routes = response;
			} catch (err) {
				console.error(err);
			}
			this.map.on('load', () => {
				this.routes.forEach(({ id, coordinates }) => {
					const geojson = this.createRouteGeojson(coordinates);
					this.addRoute(this.map, id, geojson);
				});
			});
		},
		createRouteGeojson(coordinates) {
			return {
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'LineString',
					coordinates: coordinates,
				},
			};
		},
		addRoute(map, routeId, geojson) {
			map.addSource(routeId, {
				type: 'geojson',
				data: geojson,
			});
			map.addLayer({
				id: routeId,
				type: 'line',
				source: routeId,
				layout: {
					'line-join': 'round',
					'line-cap': 'round',
				},
				paint: {
					'line-color': '#49A7B1',
					'line-width': ['interpolate', ['linear'], ['zoom'], 12, 1, 14, 8],
				},
			});
		},
		getCoordinates() {
			this.testCoordinates.push([this.centerCoordinates.lng, this.centerCoordinates.lat]);
			this.snackbarText = `Coordinates added (${this.centerCoordinates.lat}, ${this.centerCoordinates.lng})`;
			this.snackbar = true;
			console.log('Coordinates added!', this.testCoordinates);
		},
		resetCoordinates() {
			this.testCoordinates = [];
			this.snackbarText = 'All coordinates removed';
			this.snackbar = true;
			console.log('Coordinates reset to empty array!', this.testCoordinates);
		},
		checkForm() {
			if (
				this.routeName == '' ||
				this.routeDescription == '' ||
				this.routeDistance == 0 ||
				this.routeDuration == 1 ||
				this.routeLocation == '' ||
				this.imageReference == null
			) {
				this.snackbarText = 'Please enter valid values.';
				this.snackbar = true;
				console.log('Image:', this.imageReference);
				return false;
			}
			this.coordinatesDialog = true;
		},
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
		async saveRoute() {
			this.snackbarText = 'Route is being created ...';
			this.snackbar = true;
			try {
				this.imageReference.generateBlob(async (blobData) => {
					try {
						let imageUrl = await this.uploadImageAndGetUrl(blobData);

						this.createdRoute = {
							name: this.routeName,
							description: this.routeDescription,
							distance: this.routeDistance,
							duration: this.routeDuration,
							difficulty: this.routeDifficulty,
							location: this.routeLocation,
							imageUrl: imageUrl,
							startingPosition: `https://maps.google.com/maps?q=${this.testCoordinates[0][1]},${this.testCoordinates[0][0]}&hl=es;z=14&amp;output=embed`,
							coordinates: this.testCoordinates,
						};
						console.log('Created Route:', this.createdRoute);
						let success = await Rute.addRoute(this.createdRoute);
						if (success) {
							console.log('Route added successfully');
							this.successDialog = true;
							this.coordinatesMode = false;
						} else {
							console.log('Unable to add route');
						}
					} catch (error) {
						console.error('Error saving route:', error);
					}
				});
			} catch (error) {
				console.error('Error generating blob:', error);
			}
		},
		saveCoordinates() {
			this.snackbarText = 'Coordinates copied.';
			this.snackbar = true;
			let value = `${this.centerCoordinates.lat}, ${this.centerCoordinates.lng}`;
			navigator.clipboard.writeText(value).then(
				function () {
					console.log('Async: Copying to clipboard was successful!');
				},
				function (err) {
					console.error('Async: Could not copy text: ', err);
				}
			);
		},
		refreshSite() {
			location.reload();
		},
	},
};
</script>

<style>
main {
	font-family: 'Alegreya Sans SC', sans-serif;
	background-color: #fffefb;
}
/* Your component-specific styles here */
#map {
	width: 100%;
	height: 900px;
}

.marker {
	background-image: url('@/assets/CustomLogo1Walking.png');
	background-size: cover;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	cursor: pointer;
}
.marker-krajRute {
	background-image: url('@/assets/CustomLogo2WalkingEnd.png');
	background-size: cover;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	cursor: pointer;
}

.marker-klupica {
	background-image: url('@/assets/CustomLogo4Klupica.png');
	background-size: cover;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	cursor: pointer;
}
.marker-stol {
	background-image: url('@/assets/CustomLogo5Stol.png');
	background-size: cover;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	cursor: pointer;
}

.mapboxgl-popup-content {
	text-align: center;
	font-family: 'Open Sans', sans-serif;
	font-size: 20px;
	border-radius: 1rem;
	background-color: #fffefb;
	max-width: 320px;
}
.popupNaslov {
	margin: 10px 0px 0 0px;
}

.popupDescription {
	font-size: 15px;
	text-align: left;
}

.popupNaslovDescription {
	text-align: left;
	margin: 0 0 5px 0;
	text-transform: uppercase;
	font-size: 18px;
}

#cross-mark {
	position: absolute;
	top: 53%;
	left: 49.7%;
	width: 10px;
	height: 10px;
	background-color: #82b1ff;
	/* transform: translate(-20%, -20%); */
	pointer-events: none;
}
/* Add a CSS class for the smaller marker size */
.marker-small {
	width: 15px;
	height: 15px;
	transition: width 0.3s ease, height 0.3s ease;
}

/* Add a CSS class for the larger marker size */
.marker-large {
	width: 30px;
	height: 30px;
	transition: width 0.3s ease, height 0.3s ease;
}

.icon-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.icon-container p {
	margin: 0 0 0 0;
}

.icon-with-text {
	display: flex;
	align-items: center;
	margin-right: 20px;
}

.icon-with-text svg {
	margin-right: 5px;
}

#middleDot {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 6px;
	height: 6px;
	background-color: #a3b2a0;
	border-radius: 50%;
	z-index: 9999; /* Ensure it's above the map */
}
</style>
