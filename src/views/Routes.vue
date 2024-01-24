<template>
	<v-main>
		<header>
			<div class="container">
				<h1>
					<a
						href="/"
						style="text-decoration: none; color: #453227"
						>Home</a
					>
					/ Routes
				</h1>
			</div>
			<!-- <h1>Route library</h1> -->
			<!-- display images from mongo here -->
			<!-- <form @submit.prevent="postNewImage">
                <div class="form-group">
                    <croppa
                        :width="400"
                        :height="400"
                        placeholder="Ucitaj sliku..."
                        v-model="imageReference"
                    >
                    </croppa>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form> -->

			<!-- <h3 style="letter-spacing: 3px; margin: -15px 0 40px 0">Easily choose a route and start walking</h3> -->

			<!-- <div
				class="d-flex justify-content-center"
				style="margin: 0 0 65px 0"
			>
				<div
					class="input-group mb-3"
					style="max-width: 500px"
				>
					<input
						type="text"
						class="form-control"
						placeholder="Search routes"
						aria-label="Search routes"
						aria-describedby="basic-addon2"
					/>
					<div
						class="input-group-append"
						style="cursor: pointer"
					>
						<span
							class="input-group-text"
							id="basic-addon2"
							><i
								class="fas fa-search"
								style="color: #798777; font-size: 1.5rem"
							></i
						></span>
					</div>
				</div>
			</div> -->
		</header>
		<!-- <img
            v-if="selectedImage"
            :src="selectedImage.fullPath"
            alt="Selected Image"
        />
        {{ selectedImage }} -->

		<section class="cards">
			<div
				v-for="route in routes"
				:key="route.id"
			>
				<router-link
					:to="'/routes/' + route.id"
					style="text-decoration: none"
				>
					<!-- Your route card component here -->
					<!-- <route-card :route="route"></route-card> -->
					<!-- <route-card :route="route" :images="images"></route-card> -->
					<route-card :route="route"></route-card>
				</router-link>
			</div>
		</section>

		<router-view></router-view>
	</v-main>
</template>

<script>
import { Rute, Auth, Korisnik } from '@/services';
import routeCard from '../components/routeCard.vue';

export default {
	data() {
		return {
			routes: [], // Store the list of routes
			images: [],
			// selectedImageId: '651c5109346b4023b0ec4276',
			imageReference: null,
		};
	},
	created() {
		this.fetchRute();

		// this.fetchImage();
	},
	name: 'Rute',
	methods: {
		async fetchRute() {
			try {
				// Make an API request to fetch the list of routes from your backend
				const response = await Rute.getAll(); // Adjust the API endpoint as needed

				// Update the routes data property with the fetched route data
				console.log('U rute.vue sam: ', response);

				this.routes = response;
			} catch (error) {
				console.error(error);
			}
		},
		postNewImage() {
			let userEmail = localStorage.getItem('userEmail');

			this.imageReference.generateBlob((blobData) => {
				console.log(blobData);

				let imageName = userEmail + '_' + Date.now() + '.png'; // Croppa vraca png
			});
		},

		// getFullImageUrl(filePath) {
		//     // Replace with the actual base URL of your backend server
		//     const baseUrl = 'http://localhost:3000'; // Update with your server's URL
		//     return `${baseUrl}/${filePath}`;
		// },
		// getRouteImage(imageId) {
		//     // Assuming you have the list of images in this.images
		//     const image = this.images.find((img) => img._id === imageId);
		//     if (image) {
		//         return this.getFullImageUrl(image.filePath);
		//     } else {
		//         // Return a default image URL if the image is not found
		//         return '../assets/pulaRuta1.jpeg'; // Update with your default image URL
		//     }
		// },

		// getImageForRoute(routeId) {
		//     const route = this.routes.find((r) => r.id === routeId);
		//     // console.log('ovdje sam:', route.image);
		//     if (route && route.image) {
		//         return this.getFullImageUrl(route.image);
		//     } else {
		//         console.log('Route has no image');
		//         // Return a default image URL or handle the case where route.image is missing
		//     }
		// },
		// async fetchImage() {
		//     try {
		//         // Make an API request to fetch the list of images from your backend
		//         const response = await Rute.getImage(); // Adjust the API endpoint as needed

		//         // Update the images data property with the fetched image data
		//         console.log('Na routes.vue sam 3.10.23: ', response);
		//         this.images = response;
		//     } catch (error) {
		//         console.error(error);
		//     }
		// },
		// getSelectedImage() {
		//     // Find the selected image based on the selectedImageId

		//     return this.images.find(
		//         (image) => image._id === this.selectedImageId
		//     );
		// },
	},
	computed: {
		// selectedImage() {
		//     // Get the selected image based on the selectedImageId
		//     return this.getSelectedImage();
		// },
	},
	components: { routeCard },
};
</script>

<style scoped>
main {
	font-family: 'Alegreya Sans SC', sans-serif;
	background-color: #fffefb;
}

header h1 {
	font-size: 2.5rem;
	font-weight: 700;
	/* margin: 0; */
	/* padding: 4.5rem 0 4.5rem 0; */
	color: #453227;
}

.container {
	max-width: 60%;
}

header {
	background-color: #eaded7;
	text-align: left;
	min-height: 20vh;
	display: flex;
}

.form-control:focus {
	border-color: none;
	box-shadow: none;
	border: 1px solid #dee2e6ff;
}

.cards {
	margin: 0 auto;
	max-width: 70%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(370px, 1fr));
	grid-auto-rows: auto;
	gap: 60px;
	row-gap: 100px;
}
</style>
