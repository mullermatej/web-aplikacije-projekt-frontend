<template>
	<v-main>
		<v-dialog
			v-model="open"
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
								class="mt-2 text-white rounded-xl text-caption"
								color="primary"
								>Submit</v-btn
							></v-col
						>
						<v-col
							><v-btn
								@click="$emit('closePointDialog')"
								block
								class="mt-2 text-white rounded-xl text-caption"
								color="error"
								>Cancel</v-btn
							></v-col
						>
					</v-row>
				</v-form>
			</v-sheet>
		</v-dialog>
		<v-snackbar
			v-model="snackbar"
			:timeout="timeout"
		>
			<div class="text-center text-caption">{{ snackbarText }}</div>
		</v-snackbar>
	</v-main>
</template>

<script>
import { Rute, Korisnik, Auth } from '@/services';
import { storage } from '@/firebase';

export default {
	name: 'PointDialog',
	props: ['open'],
	components: {},
	data() {
		return {
			poiName: '',
			poiNameRules: [
				(value) => {
					if (value?.length > 2 && value?.length < 23) return true;
					return 'Please enter a name.';
				},
			],
			poiCoordinates: '',
			poiCoordinatesRules: [],
			imageReference: null,
			snackbar: false,
			snackbarText: '',
			timeout: 2000,
		};
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
			this.snackbarText = 'Adding point of interest, please wait.';
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
						if (success) {
							this.pointsOfInterest = success.pointsOfInterest;
							try {
								let newPoint = {
									routeId: this.$route.params.routeId,
									name: this.poiName,
								};
								await Korisnik.addCreatedPoint(Auth.state.username, newPoint);
							} catch (e) {
								console.error(e);
							}
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
	},
};
</script>
