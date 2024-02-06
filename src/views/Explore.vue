<template>
	<v-main>
		<div style="position: relative">
			<v-btn
				v-if="!creatingRoute"
				style="position: absolute; top: 30px; left: 30px; z-index: 9999"
				@click="
					routeDialog = true;
					creatingRoute = true;
					showDot = false;
				"
				>Create route</v-btn
			>
			<v-btn
				v-if="coordinatesMode"
				style="position: absolute; top: 30px; left: 30px; z-index: 9999"
				@click="getCoordinates()"
				>Add coordinates to array</v-btn
			>
			<v-btn
				v-if="coordinatesMode"
				style="position: absolute; top: 80px; left: 30px; z-index: 9999"
				@click="saveRoute()"
				>Done</v-btn
			>
			<v-btn
				v-if="coordinatesMode"
				style="position: absolute; top: 80px; left: 120px; z-index: 9999"
				@click="resetCoordinates()"
				>Restart</v-btn
			>
			<v-dialog
				v-model="routeDialog"
				width="auto"
			>
				<v-card>
					<v-card-text>
						<v-container>
							<v-row
								align="center"
								justify="center"
							>
								<v-col cols="12">
									<v-text-field
										v-model="nameInput"
										label="Name"
										hint="Choose a unique name"
										persistent-hint
										required
									></v-text-field>
								</v-col>
							</v-row>
							<v-row
								align="center"
								justify="center"
							>
								<v-col cols="12">
									<v-textarea
										v-model="descriptionInput"
										label="Description"
										hint="Describe the best parts"
										persistent-hint
										required
										auto-grow
										rows="1"
									></v-textarea>
								</v-col>
							</v-row>
							<v-row
								align="center"
								justify="center"
							>
								<v-col cols="6">
									<v-text-field
										v-model="distanceInput"
										label="Distance"
										type="number"
										hint="Kilometers"
										persistent-hint
										required
									></v-text-field>
								</v-col>
								<v-col cols="6">
									<v-text-field
										v-model="durationInput"
										label="Duration"
										type="number"
										hint="Minutes"
										persistent-hint
										required
									></v-text-field>
								</v-col>
							</v-row>
							<v-row
								align="center"
								justify="center"
							>
								<v-col cols="12">
									<v-select
										v-model="difficultyInput"
										:items="items"
										label="Difficulty"
									></v-select>
								</v-col>
							</v-row>
							<v-row
								align="center"
								justify="center"
							>
								<v-col cols="12">
									<v-text-field
										v-model="locationInput"
										label="Location"
										hint="City/town name"
										persistent-hint
										required
									></v-text-field>
								</v-col>
							</v-row>
							<v-row
								align="center"
								justify="center"
							>
								<v-col
									cols="12"
									align="center"
									justify="center"
								>
									<croppa
										:width="300"
										:height="169"
										v-model="imageReference"
									>
									</croppa>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
					<v-card-actions
						justify="center"
						align="center"
					>
						<v-row>
							<v-col>
								<v-btn
									color="primary"
									@click="coordinatesDialog = true"
									>Add coordinates &nbsp; <i class="fa-solid fa-plus"></i
								></v-btn>
							</v-col>
						</v-row>
					</v-card-actions>
				</v-card>
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
									color="primary"
									variant="text"
									@click="
										coordinatesDialog = false;
										showDot = true;
										routeDialog = false;
										coordinatesMode = true;
										setCoordinates();
									"
								>
									Close
								</v-btn>
							</v-col>
						</v-row>
					</v-card-actions>
				</v-card>
			</v-dialog>
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
import { Rute } from '@/services';
import { db, storage } from '@/firebase';

export default {
	name: 'Explore',
	data() {
		return {
			name: '',
			routes: [],
			map: null,
			centerCoordinates: null,
			testCoordinates: [],
			routeDialog: false,
			coordinatesDialog: false,
			showDot: false,
			items: ['Easy', 'Medium', 'Hard'],
			imageReference: null,
			nameInput: '',
			descriptionInput: '',
			distanceInput: 0,
			durationInput: 0,
			difficultyInput: null,
			locationInput: '',
			createdRoute: {},
			coordinatesMode: false,
			creatingRoute: false,
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
			center: [13.859928, 44.860742], // starting position
			zoom: 12, // starting zoom,
			scrollZoom: true,
			maxZoom: 18,
		});

		this.map.on('move', () => {
			this.centerCoordinates = this.map.getCenter();
		});
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
			console.log('Coordinates added!', this.testCoordinates);
		},
		resetCoordinates() {
			this.testCoordinates = [];
			console.log('Coordinates reset to empty array!', this.testCoordinates);
		},
		async saveRoute() {
			this.createdRoute = {
				name: this.nameInput,
				description: this.descriptionInput,
				distance: this.distanceInput,
				duration: this.durationInput,
				difficulty: this.difficultyInput,
				location: this.locationInput,
				imageUrl:
					'https://firebasestorage.googleapis.com/v0/b/walk-it-4c57e.appspot.com/o/adminUploads%2FrouteImages%2Flungomare-firebase.jpeg?alt=media&token=5cd1c0d2-1dd1-46eb-969d-429675abba2b',
				startingPosition:
					'https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7128.995517444304!2d13.809396!3d44.861658!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDTCsDUxJzQyLjciTiAxM8KwNDgnMzcuOSJF!5e1!3m2!1shr!2shr!4v1706714895578!5m2!1shr!2shr',
				coordinates: this.testCoordinates,
			};

			console.log(this.createdRoute);

			let success = await Rute.addRoute(this.createdRoute);
			if (success) {
				console.log('Route added successfully');
			} else {
				console.log('Unable to add route');
			}
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
	width: 8px;
	height: 8px;
	background-color: red;
	border-radius: 50%;
	z-index: 9999; /* Ensure it's above the map */
}
</style>
