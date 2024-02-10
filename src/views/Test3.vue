<template>
	<v-container class="mx-auto">
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
						color="primary"
						block
						@click="successDialog = false"
						>Close</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<h1>Route dialog</h1>
		<v-btn @click="routeDialog = true"> Open route dialog </v-btn>
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
								:width="300"
								:height="169"
								v-model="imageReference"
								:quality="8"
							>
							</croppa>
						</v-col>
					</v-row>

					<v-row>
						<v-col
							><v-btn
								@click="coordinatesDialog = true"
								block
								class="mt-2 text-white"
								color="#A2B39F"
								>Add coordinates</v-btn
							></v-col
						>
						<v-col
							><v-btn
								@click="routeDialog = false"
								block
								class="mt-2 text-white"
								color="#FF6868"
								>Cancel</v-btn
							></v-col
						>
					</v-row>
				</v-form>
			</v-sheet>
		</v-dialog>

		<h1>file input</h1>
		<v-file-input
			label="File input"
			@change="onFileSelected"
		></v-file-input>
		<v-btn @click="onUpload">Upload</v-btn>

		<h1>croppa</h1>
		<croppa
			:width="400"
			:height="400"
			v-model="imageReference"
		>
		</croppa>
		<v-btn
			@click="postNewImage"
			class="d-block"
		>
			Post image
		</v-btn>
		<iframe
			src="https://maps.google.com/maps?q=44.84586271319418,13.840496489317161&hl=es;z=14&amp;output=embed"
		></iframe>
		<iframe
			src="https://maps.google.com/maps?q=44.8670132669844,13.853985657357043&hl=es;z=14&amp;output=embed"
			width="100%"
			height="400"
			class="rounded"
			style="border: 0"
			allowfullscreen="true"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		></iframe>
	</v-container>
</template>

<script>
import { Auth } from '@/services';
import { db, storage } from '@/firebase';
import MyInput from '@/components/Popups/MyInput.vue';

export default {
	name: 'Test3',
	components: { MyInput },
	data() {
		return {
			successDialog: false,
			selectedFile: null,
			imageReference: null,
			value: '',
			secondValue: '',
			routeDialog: false,
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
					return 'Route must be longer';
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
	methods: {
		handleChange() {
			this.value = 'Hello there!';
		},
		onFileSelected(event) {
			this.selectedFile = event;
		},
		onUpload() {
			console.log(this.selectedFile);
		},
		postNewImage() {
			this.imageReference.generateBlob((blobData) => {
				let imageName = 'userUploads/' + Auth.state.username + '/' + Date.now() + '.png';
				storage
					.ref(imageName)
					.put(blobData)
					.then((result) => {
						// ref = referenca na sliku koja je spremljena u trenutku
						result.ref.getDownloadURL().then((url) => {
							console.log('Javni link: ', url);
						});
					})
					.catch((error) => {
						console.error(error);
					});
			});
			this.imageReference.remove();
		},
	},
};
</script>
