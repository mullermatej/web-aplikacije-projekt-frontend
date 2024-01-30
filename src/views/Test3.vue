<template>
	<v-container class="mx-auto">
		<h1>file input</h1>
		<v-file-input
			label="File input"
			@change="onFileSelected"
		></v-file-input>
		<button @click="onUpload">Upload</button>
	</v-container>
</template>

<script>
export default {
	name: 'Test3',
	data() {
		return {
			selectedFile: null,
		};
	},
	methods: {
		onFileSelected(event) {
			this.selectedFile = event;
		},
		onUpload() {
			console.log(this.selectedFile);
		},
	},
};
</script>
