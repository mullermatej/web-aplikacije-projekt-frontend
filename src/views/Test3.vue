<template>
	<v-container class="mx-auto">
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
			selectedFile: null,
			imageReference: null,
			value: '',
			secondValue: '',
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
