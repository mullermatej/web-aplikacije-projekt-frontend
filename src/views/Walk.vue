<template>
	<v-container class="mx-auto">
		<v-img
			width="100%"
			height="300"
			cover
			class="mx-auto rounded"
			style="cursor: pointer"
			:src="route.imageUrl"
			@click="handleImage(route.imageUrl)"
		></v-img>

		<v-row>
			<v-col
				cols="3"
				class="d-flex align-left"
			>
				<img
					:src="route.creatorImg"
					alt=""
					width="35px"
					height="35px"
				/>
				<p class="pt-2 pl-2 text-caption text-uppercase">{{ route.createdBy }}</p>
			</v-col>
			<v-col
				align="center"
				justify="center"
				cols="6"
			>
				<p class="text-h5 text-center mt-2 mb-0">{{ route.name }}</p>
				<p class="text-subtitle-2 text-center">{{ route.location }}</p>
			</v-col>
			<v-col cols="3"
				><p class="text-caption text-right pt-2">{{ route.date }}</p></v-col
			>
		</v-row>

		<v-row>
			<v-col align="center">
				<v-btn
					v-if="added"
					class="rounded-pill text-white text-caption"
					color="accent"
					@click="addFavourite(), (added = false)"
				>
					add &nbsp; <i class="fa-regular fa-heart"></i>
				</v-btn>
				<v-btn
					v-else
					class="rounded-pill text-white text-caption"
					color="accent"
					@click="removeFavourite(), (added = true)"
				>
					added &nbsp; <i class="fa-solid fa-heart"></i>
				</v-btn>
			</v-col>
		</v-row>

		<p class="text-h5 mt-8">Description</p>
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
					color="accent"
				>
					{{ route.distance }} kilometers
				</v-chip>
			</v-item>
			<v-item class="mx-1 my-1">
				<v-chip
					class="text-white"
					color="accent"
				>
					{{ route.difficulty }} difficulty
				</v-chip>
			</v-item>

			<v-item class="mx-1 my-1">
				<v-chip
					class="text-white"
					color="accent"
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
			<v-btn
				v-if="showTag == false"
				@click="tagDialog = true"
				outlined
				class="ml-2 rounded-pill text-overline"
				>Add <i class="fa-solid fa-plus"></i
			></v-btn>
		</p>

		<v-row v-if="showTag == true">
			<v-col>
				<v-btn
					@click="tagDialog = true"
					outlined
					class="rounded-pill text-overline"
					>Add <i class="fa-solid fa-plus"></i
				></v-btn>
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
			class="text-h5 mt-6"
			justify="center"
		>
			Points of interest
			<v-btn
				v-if="showPoint == false"
				@click="poiDialog = true"
				outlined
				class="ml-2 rounded-pill text-overline"
				>Add <i class="fa-solid fa-plus"></i
			></v-btn>
		</p>

		<v-row
			v-if="showPoint == true"
			class="mb-10"
		>
			<v-col>
				<v-btn
					class="rounded-pill text-overline"
					outlined
					@click="poiDialog = true"
				>
					Add<i class="fa-solid fa-plus"></i>
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
					color="primary"
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

		<PointDialog
			:open="poiDialog"
			@closePointDialog="poiDialog = false"
		/>

		<div id="map"></div>

		<TagDialog
			:open="tagDialog"
			@closeTagDialog="tagDialog = false"
		/>
	</v-container>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import { Auth, Rute, Korisnik } from '@/services';
import TagDialog from '@/components/Dialogs/TagDialog.vue';
import PointDialog from '@/components/Dialogs/PointDialog.vue';

export default {
	name: 'Walk',
	components: { TagDialog, PointDialog },
	data() {
		return {
			flippedCoordinates: this.centerCoordinates,
			route: {},
			favourites: [],
			communityTags: [],
			pointsOfInterest: null,
			map: null,
			centerCoordinates: null,
			tagDialog: false,
			poiDialog: false,
			added: true,
			showTag: true,
			showPoint: true,
		};
	},
	created() {
		this.getFavourites();
		this.getRoute();
	},
	mounted() {
		mapboxgl.accessToken =
			'pk.eyJ1IjoibXVsbGVybWF0ZWoxOCIsImEiOiJjbGt3ZjdqZHEwdnBvM2twbTRrZDlodWpxIn0.LwbRQW9Up-KStWz9Jp3J5A';
		this.map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mullermatej18/clkxpusvp005m01p83bzb9x0z',
			center: [13.86954111349425, 45.11521330940678],
			zoom: 15,
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
	},
	computed: {
		device() {
			return this.$vuetify.breakpoint.name;
		},
	},
	methods: {
		handleTest(x) {
			console.log(x);
		},
		async getPointsOfInterest() {
			try {
				const routeId = this.$route.params.routeId;
				const response = await Rute.getPointsOfInterest(routeId);
				this.pointsOfInterest = response.pointsOfInterest;
				if (this.pointsOfInterest.length > 0) this.showPoint = false;
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
				if (this.communityTags.length > 0) this.showTag = false;
			} catch (e) {
				console.error(e);
			}
			this.map.setCenter(this.route.coordinates[0]);
			this.getPointsOfInterest();
		},
		async addFavourite() {
			let updates = {
				routeId: this.route._id,
			};
			try {
				await Korisnik.addFavourite(Auth.state.username, updates);
			} catch (e) {
				console.error(e);
			}
		},
		async removeFavourite() {
			let updates = {
				routeId: this.route._id,
			};
			try {
				await Korisnik.removeFavourite(Auth.state.username, updates);
			} catch (e) {
				console.error(e);
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
		handleImage(imageUrl) {
			window.open(imageUrl, '_blank');
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
