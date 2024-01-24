<template>
    <div class="card">
        <!-- <img class="card__image" :src="getImagePath(slikaPath)" alt="" /> -->

        <!-- <img
            class="card__image"
            src="../assets/route_thumbnails/lungomare.jpeg"
            alt=""
        /> -->

        <!-- <img class="card__image" :src="`${slikaRuta}`" alt="" /> -->
        <!-- <v-img class="card__image" :src="getRouteImage(route.image)" alt="">
        </v-img> -->
        <!-- <v-img
            v-for="image in images"
            :key="image._id"
            :src="getFullImageUrl(image.filePath)"
            :alt="image._id"
        ></v-img> -->
        <!-- <v-img class="card__image" :src="image" alt=""></v-img> -->

        <img
            src="http://localhost:3000/images/edc8452c-b694-4e93-95e2-4198430e51c7.jpeg"
            alt=""
        />
        <!-- <div class="images"></div> -->

        <div class="card__content">
            <!-- Display route name -->
            <div
                style="
                    display: flex;
                    align-items: center;
                    justify-content: left;
                    gap: 1rem;
                "
            >
                <h3>{{ route.name }}</h3>

                <p style="margin: 0">
                    <i class="fas fa-location"></i>
                    {{ route.location }}
                </p>
            </div>

            <!-- Display route description -->
            <p>{{ route.description }}</p>

            <div
                class="icon-container"
                style="
                    display: flex;
                    justify-content: space-around;
                    margin-top: 1rem;
                "
            >
                <!-- Display route distance -->
                <div class="icon-with-text">
                    <p>
                        <i
                            class="fa-solid fa-shoe-prints"
                            style="color: #000000"
                        ></i
                        >&nbsp; {{ route.distance }}km
                    </p>
                </div>

                <!-- Display route duration -->
                <div class="icon-with-text">
                    <p>
                        <i
                            class="fa-regular fa-clock"
                            style="color: #000000"
                        ></i>
                        &nbsp;
                        {{ route.duration }}min
                    </p>
                </div>

                <!-- Display route difficulty -->
                <div class="icon-with-text">
                    <p>
                        <i
                            class="fa-solid fa-triangle-exclamation"
                            style="color: #000000"
                        ></i>
                        &nbsp;
                        {{ route.difficulty }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['route', 'images'],
    data() {
        return {
            isHeartRed: false,
            slikaPath: '',
        };
    },
    created() {
        // Save route.name into the routeName variable when the component is created        this.routeName = this.route.name;
        // this.slikaPath = this.route.slika;
        // console.log('Slika path:', this.slikaPath);
    },
    mounted() {
        // this.loadImage();
    },
    methods: {
        toggleHeartColor() {
            this.isHeartRed = !this.isHeartRed;
        },
        // getImagePath(path) {
        //     // Assuming that `path` is something like "@/assets/route_thumbnails/galebove_stijene.jpeg"
        //     // Use dynamic import to load the image path
        //     return require(`../${path}`);
        // },

        // getRouteImage(imageId) {
        //     const image = this.images.find((img) => img._id === imageId);
        //     console.log(
        //         'Image IDs:',
        //         this.images.map((img) => img._id)
        //     );

        //     if (image && image.filePath) {
        //         return this.getFullImageUrl(image.filePath);
        //     } else {
        //         console.log('Nema slike');
        //         // Return a default image URL or handle the case where image.filePath is missing
        //     }
        // },
        // getFullImageUrl(filePath) {
        //     // Replace with the actual base URL of your backend server
        //     const baseUrl = 'http://localhost:3000'; // Update with your server's URL
        //     return `${baseUrl}/${filePath}`;
        // },
        // async loadImage() {
        //     const imageUrl =
        //         'http://localhost:3000/images/edc8452c-b694-4e93-95e2-4198430e51c7.jpeg';

        //     try {
        //         // Fetch the image as binary data
        //         const response = await fetch(imageUrl);

        //         if (response.ok) {
        //             // Create an img element and set its src attribute
        //             const imgElement = document.createElement('img');
        //             imgElement.src = imageUrl;
        //             imgElement.alt = ''; // Set alt text as needed

        //             // Append the img element to a container in your HTML
        //             const imagesElement = document.querySelector('.images');
        //             imagesElement.appendChild(imgElement);
        //         } else {
        //             console.error(
        //                 'Failed to fetch image:',
        //                 response.statusText
        //             );
        //         }
        //     } catch (error) {
        //         console.error('Error fetching image:', error);
        //     }
        // },
    },
};
</script>

<style>
.card {
    --bs-card-border-width: 0; /* Remove any border */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Initial shadow */
    transition: box-shadow 0.3s ease, cursor 0.3s ease; /* Add a transition for a smoother effect */
    /* ... other card styles ... */

    /* Set cursor to pointer on hover */
    cursor: pointer;
}

.card:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4); /* Increased shadow on hover */
}

.card__image {
    width: 100%;
    object-fit: cover;
    display: block;
}

.card__content {
    font-size: 0.9em;
    padding: 15px;
    background: #fafafa;
}

.card__content > p:first-of-type {
    margin-top: 0;
}

.card__content > p:last-of-type {
    margin-bottom: 0;
}

.card__info {
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    background: #bdd2b6;
    font-size: 0.8em;
}

.card__info i {
    font-size: 0.9em;
    margin-right: 8px;
}

.card__link {
    color: #64968c;
    text-decoration: none;
}

.card__link:hover {
    text-decoration: underline;
}

.icon-with-text {
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.favorite-icon-red {
    color: #dc1c13;
}
</style>
