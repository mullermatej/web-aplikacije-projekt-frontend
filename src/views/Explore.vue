<template>
	<v-main>
		<div style="position: relative">
			<div id="map"></div>
			<div
				id="middleDot"
				v-if="showDot"
			></div>
			<v-btn
				class="rounded text-caption"
				color="white"
				elevation="0"
				style="position: absolute; top: 70px; left: 10px; z-index: 1"
				@click="saveCoordinates()"
			>
				{{ this.flippedCoordinates }}
			</v-btn>
			<v-btn
				v-if="routeDialog == false"
				class="rounded text-caption"
				color="white"
				elevation="0"
				style="position: absolute; top: 115px; left: 10px; z-index: 1"
				@click="
					routeDialog = true;
					showDot = false;
				"
				>create
			</v-btn>
			<v-btn
				v-if="coordinatesMode"
				class="rounded text-caption text-white"
				color="primary"
				style="position: absolute; top: 145px; left: 10px; z-index: 1"
				@click="saveRoute()"
				>Done</v-btn
			>
			<v-btn
				v-if="coordinatesMode"
				class="rounded text-caption text-white"
				color="error"
				style="position: absolute; top: 145px; left: 90px; z-index: 1"
				@click="resetCoordinates()"
				>Reset</v-btn
			>
			<v-btn
				v-if="coordinatesMode"
				class="rounded text-caption"
				color="white"
				elevation="0"
				style="position: absolute; top: 100px; left: 10px; z-index: 1"
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
									class="mt-2 text-white rounded-xl text-caption"
									color="primary"
									>Add coordinates</v-btn
								></v-col
							>
							<v-col
								><v-btn
									@click="
										routeDialog = false;
										showDot = true;
									"
									block
									class="mt-2 white--text rounded-xl text-caption"
									color="error"
									>Cancel</v-btn
								></v-col
							>
						</v-row>
					</v-form>
				</v-sheet>
			</v-dialog>
			<CoordinatesDialog
				:open="coordinatesDialog"
				@handleCoordinatesDialog="handleCoordinatesDialog()"
			/>
			<SuccessDialog
				:open="successDialog"
				@refresh="refreshSite()"
			/>

			<v-snackbar
				v-model="snackbar"
				:timeout="timeout"
			>
				<div class="text-center text-caption">{{ snackbarText }}</div>
			</v-snackbar>
		</div>
	</v-main>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import { Rute, Auth, Korisnik } from '@/services';
import { storage } from '@/firebase';
import SuccessDialog from '@/components/Dialogs/SuccessDialog.vue';
import CoordinatesDialog from '@/components/Dialogs/CoordinatesDialog.vue';

export default {
	name: 'Explore',
	components: { SuccessDialog, CoordinatesDialog },
	data() {
		return {
			createdRoute: {},
			routes: [],
			testCoordinates: [],
			flippedCoordinates: 'Latitude: 0, Longitude: 0',
			creatorImg: '',
			snackbarText: '',
			snackbar: false,
			timeout: 2000,
			map: null,
			centerCoordinates: null,
			showDot: true,
			imageReference: null,
			coordinatesMode: false,
			creatingRoute: false,
			coordinatesDialog: false,
			successDialog: false,
			routeDialog: false,
			routeName: '',
			routeNameRules: [
				(value) => {
					if (value?.length > 3 && value?.length < 30) return true;
					return 'Enter a valid name.';
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
			center: [13.86954111349425, 45.11521330940678], // početna pozicija
			zoom: 9, // početni zoom
			scrollZoom: true,
			maxZoom: 18,
			minZoom: 9,
		});
		this.map.on('move', () => {
			this.centerCoordinates = this.map.getCenter();
			this.flippedCoordinates = `Lat: ${this.centerCoordinates.lat.toFixed(
				5
			)}, Lng: ${this.centerCoordinates.lng.toFixed(5)}`;
		});
		this.map.addControl(
			new MapboxGeocoder({
				accessToken: mapboxgl.accessToken,
				mapboxgl: mapboxgl,
			}),
			'top-left'
		);
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
				this.routes.forEach(({ id, coordinates, name, location }) => {
					const geojson = this.createRouteGeojson(coordinates);
					const geojsonMarkers = this.createMarkerGeojson(coordinates[0]);
					this.addRoute(this.map, id, geojson);
					for (const feature of geojsonMarkers.features) {
						const el = document.createElement('div');
						el.className = 'marker';
						const marker = new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(this.map);
						this.map.setLayoutProperty(id, 'visibility', 'none');
						marker.getElement().addEventListener('click', () => {
							this.toggleRouteVisibility(id);
						});
						marker.getElement().addEventListener('mouseenter', () => {
							if (this.map.getZoom() > 11) {
								new mapboxgl.Popup({ offset: 25, closeButton: false })
									.setLngLat(feature.geometry.coordinates)
									.setHTML(
										`<h2 class="text-h6"><a href="/Walks/${id}" class="text-decoration-none">${name}</a></h2><p class="text-subtitle-1">${location}</p>`
									)
									.addTo(this.map);
							}
						});
						marker.getElement().addEventListener('mouseleave', () => {
							if (!document.getElementsByClassName('mapboxgl-popup')[0]) {
								return false;
							}
							setTimeout(() => {
								// Remove popup after delay
								document.getElementsByClassName('mapboxgl-popup')[0].remove();
							}, 1200);
						});
					}
				});
			});
		},
		toggleRouteVisibility(routeId) {
			const layer = this.map.getLayer(routeId);
			if (layer) {
				const visibility = this.map.getLayoutProperty(routeId, 'visibility');
				if (visibility === 'visible') {
					this.map.setLayoutProperty(routeId, 'visibility', 'none'); // Hide the route paint
				} else {
					this.map.setLayoutProperty(routeId, 'visibility', 'visible'); // Show the route paint
				}
			}
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
		createMarkerGeojson(coordinates) {
			return {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: {
							type: 'Point',
							coordinates: coordinates,
						},
						properties: {
							title: 'Mapbox',
							description: 'Washington, D.C.',
						},
					},
				],
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
					'line-color': '#85B7FF',
					'line-width': ['interpolate', ['linear'], ['zoom'], 12, 1, 14, 4],
				},
			});
		},
		getCoordinates() {
			this.testCoordinates.push([this.centerCoordinates.lng, this.centerCoordinates.lat]);
			this.snackbarText = `Coordinates added!`;
			this.snackbar = true;
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
				return false;
			}
			this.coordinatesDialog = true;
			this.showDot = true;
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
		async getUserImageUrl() {
			const username = Auth.state.username;
			Korisnik.getUser(username)
				.then((response) => {
					this.creatorImg = response.imageUrl;
				})
				.catch((error) => {
					console.error(error);
				});
		},
		async saveRoute() {
			this.timeout = 7000;
			this.snackbarText = 'Route is being created ...';
			this.snackbar = true;
			this.getUserImageUrl();
			const currentDate = new Date();
			const year = currentDate.getFullYear();
			const month = String(currentDate.getMonth() + 1).padStart(2, '0');
			const day = String(currentDate.getDate()).padStart(2, '0');
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
							date: `${day}/${month}/${year}`,
							createdBy: Auth.state.username,
							creatorImg: this.creatorImg,
							imageUrl: imageUrl,
							startingPosition: `https://maps.google.com/maps?q=${this.testCoordinates[0][1]},${this.testCoordinates[0][0]}&hl=es;z=14&amp;output=embed`,
							coordinates: this.testCoordinates,
							communityTags: [],
							pointsOfInterest: [],
						};
						let data = await Rute.addRoute(this.createdRoute);
						if (data) {
							try {
								let newRoute = {
									routeId: data.data.newRoute._id,
									name: data.data.newRoute.name,
								};
								await Korisnik.addCreatedWalk(Auth.state.username, newRoute);
							} catch (e) {
								console.error(e);
							}
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
			let value = `${this.centerCoordinates.lat.toFixed(8)}, ${this.centerCoordinates.lng.toFixed(8)}`;
			navigator.clipboard.writeText(value).then(
				function () {
					console.log('Async: Copying to clipboard was successful!');
				},
				function (err) {
					console.error('Async: Could not copy text: ', err);
				}
			);
		},
		handleCoordinatesDialog() {
			this.coordinatesDialog = false;
			this.showDot = true;
			this.routeDialog = false;
			this.coordinatesMode = true;
		},
		refreshSite() {
			location.reload();
		},
	},
};
</script>

<style>
#map {
	width: 100%;
	height: 900px;
}

.marker {
	background-image: url('@/assets/BlueTree.png');
	background-size: cover;
	width: 35px;
	height: 35px;
	border-radius: 50%;
	cursor: pointer;
}

.mapboxgl-popup {
	max-width: 200px;
}

.mapboxgl-popup-content {
	text-align: center;
}

#middleDot {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 7px;
	height: 7px;
	background-color: black;
	border-radius: 50%;
	z-index: 9999;
}
</style>
