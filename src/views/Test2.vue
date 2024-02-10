<template>
	<v-container class="mx-auto">
		<v-img
			width="100%"
			height="300"
			cover
			class="mx-auto rounded"
			:src="route.imageUrl"
		></v-img>
		<p class="text-h4 text-center mt-4 mb-0">{{ route.name }}</p>
		<p class="text-subtitle-2 text-center mt-0 mb-4">{{ route.location }}</p>
		<v-row>
			<v-col align="center">
				<v-btn
					v-if="added"
					class="my-2 rounded-pill text-white"
					color="#A3B29F"
					@click="addFavourite(), (added = false)"
				>
					add &nbsp; <i class="fa-regular fa-heart"></i>
				</v-btn>
				<v-btn
					v-else
					class="my-2 rounded-pill text-white"
					color="#A3B29F"
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
			class="mb-4"
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

		<v-item-group
			v-if="route.communityTags"
			multiple
			class="mb-5"
		>
			<v-item
				v-for="tag in route.communityTags"
				:key="tag"
			>
				<v-item class="mx-1 my-1">
					<v-chip
						class="text-white"
						color="#798777"
					>
						{{ tag }}
					</v-chip>
				</v-item>
			</v-item>
		</v-item-group>
		<v-item-group
			v-else
			multiple
			class="mb-5"
		>
			<v-item class="mx-1 my-1">
				<v-chip
					class="text-white"
					color="#798777"
					@click="tagDialog = true"
				>
					<i
						class="fa-solid fa-plus"
						style="cursor: pointer; font-size: 10px"
					></i>
					&nbsp; to add
				</v-chip>
			</v-item>
		</v-item-group>

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

		<v-row>
			<v-col
				v-for="point in pointsOfInterest"
				:key="point.id"
				cols="auto"
			>
				<v-card
					class="mr-10 my-2"
					color="#99a897"
				>
					<v-card-text>
						<div class="text-white">
							<div class="text-h6 mb-1">
								{{ point.name }}
							</div>
							<div class="text-caption">{{ point.coordinates }}</div>
							<v-img
								class="mt-4 bg-white rounded-xl"
								style="border: 3px solid white"
								width="250"
								height="180"
								src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
							></v-img>
						</div>
					</v-card-text>
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
								@click="addPoi()"
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

		<iframe
			:src="route.startingPosition"
			width="100%"
			height="400"
			class="rounded mt-10"
			style="border: 0"
			allowfullscreen="true"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		></iframe>

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
	</v-container>
</template>

<script>
import { Auth, Rute, Korisnik } from '@/services';

export default {
	name: 'Test2',
	data() {
		return {
			pointsOfInterest: [
				{
					id: '347347547',
					name: 'Free parking spot',
					coordinates: '44.87372259448554, 13.851071978057035',
				},
				{
					id: '347347227',
					name: 'Public table',
					coordinates: '44.87372259448554, 13.851071978057035',
				},
				{
					id: '347347227',
					name: 'Public table',
					coordinates: '44.87372259448554, 13.851071978057035',
				},
				{
					id: '347347227',
					name: 'Public table',
					coordinates: '44.87372259448554, 13.851071978057035',
				},
				{
					id: '347347227',
					name: 'Public table',
					coordinates: '44.87372259448554, 13.851071978057035',
				},
			],
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
	methods: {
		async getRoute() {
			try {
				const routeId = this.$route.params.routeId;
				const response = await Rute.getRouteById(routeId);
				this.route = response;
				this.communityTags = this.route.communityTags;
			} catch (e) {
				console.error(e);
			}
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
