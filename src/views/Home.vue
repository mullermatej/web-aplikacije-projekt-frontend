<template>
	<v-main>
		<v-carousel
			cycle
			:height="carouselHeight"
			hide-delimiters
			:show-arrows="false"
		>
			<v-carousel-item
				v-for="(image, i) in images"
				:key="i"
			>
				<v-sheet height="100%">
					<v-img
						:src="image"
						height="100%"
					>
					</v-img>
				</v-sheet>
			</v-carousel-item>
		</v-carousel>
		<v-container mx-auto>
			<v-row
				justify="center"
				align="center"
				class="my-6"
			>
				<v-col
					cols="12"
					justify="center"
					align="center"
				>
					<p class="text-h2 text-uppercase text-center">
						It's great to see you, <span class="font-weight-medium accent--text">{{ username }} </span>!
					</p>
					<p class="text-subtitle-1 font-weight-medium text-uppercase text-center">
						start exploring new walks and locations
					</p>
					<v-btn
						class="text-caption white--text"
						color="primary"
						:to="{ name: 'Explore' }"
						>Take a walk</v-btn
					>
				</v-col>
				<v-col
					lg="4"
					md="6"
					sm="8"
				>
					<SearchBar :routes="routes" />
				</v-col>
			</v-row>

			<v-row
				align="center"
				justify="center"
				class="mb-10"
			>
				<v-col
					class="text-center"
					lg="4"
					md="6"
					sm="8"
				>
					<img
						src="@/assets/Hiking.jpg"
						height="250px"
					/>

					<p class="px-2">
						<i class="fa-solid fa-location-dot"></i> You will find walks
						<span class="font-weight-bold">scattered accross the map</span>, choose one or create one
						yourself and start walking. With <span class="font-weight-bold">on-route tracking</span> you
						won't go off walk trails and a highly accurate GPS signal will follow you on your walk.
					</p>
					<v-btn
						class="text-caption white--text"
						color="accent"
						:to="{ name: 'Explore' }"
						>View map</v-btn
					>
				</v-col>
				<v-col
					class="text-center"
					lg="4"
					md="6"
					sm="8"
				>
					<img
						src="@/assets/Explore.jpg"
						height="250px"
					/>
					<p class="px-2">
						<i class="fa-solid fa-signs-post"></i> Each route will contain
						<span class="font-weight-bold">tags</span> and
						<span class="font-weight-bold">community tags</span> made by you. Tags are here to give you the
						general idea of the walk. There's also
						<span class="font-weight-bold">points of interest</span> revealing interesting places on the
						walk that you can find.
					</p>
					<v-btn
						class="text-caption white--text"
						color="accent"
						:to="{ name: 'Walks' }"
						>Browse</v-btn
					>
				</v-col>
				<v-col
					class="text-center"
					lg="4"
					md="6"
					sm="8"
				>
					<img
						src="@/assets/Find.jpg"
						height="250px"
					/>
					<p class="px-2">
						<i class="fa-solid fa-map-pin"></i> You can <span class="font-weight-bold">search</span> trough
						different walks by using keywords such as "Easy" for specifing
						<span class="font-weight-bold">route difficulty</span> or searching by the
						<span class="font-weight-bold">town</span> or <span class="font-weight-bold">country name</span>
						where you wish to take a walk, for example "Pula" or "Croatia".
					</p>
					<v-btn
						class="text-caption white--text"
						color="accent"
						:to="{ name: 'Walks' }"
						>View walks</v-btn
					>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
</template>

<script>
import { Auth, Rute } from '@/services';
import SearchBar from '@/components/Layout/SearchBar.vue';
import image1 from '@/assets/Home1.jpg';
import image2 from '@/assets/Home2.jpg';
import image3 from '@/assets/Home3.jpg';

export default {
	name: 'Home',
	components: { SearchBar },
	data() {
		return {
			username: Auth.state.username,
			routes: [],
			images: [image1, image2, image3],
			carouselHeight: 500,
		};
	},
	mounted() {
		this.updateCarouselHeight();
		window.addEventListener('resize', this.updateCarouselHeight);
	},
	created() {
		this.getAllRoutes();
	},
	methods: {
		async getAllRoutes() {
			try {
				const response = await Rute.getAll();
				this.routes = response;
			} catch (err) {
				console.error(err);
			}
		},
		updateCarouselHeight() {
			if (this.$vuetify.breakpoint.smAndDown) {
				this.carouselHeight = 300;
			} else {
				this.carouselHeight = 500;
			}
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.updateCarouselHeight);
		},
	},
};
</script>

<style scoped></style>
