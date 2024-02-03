<template>
	<v-app>
		<v-main>
			<Navigation />

			<router-view />
			<!-- <v-app-bar app color="white" dark> </v-app-bar> -->

			<!-- <Footer /> -->
		</v-main>
	</v-app>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Navigation from '@/components/Navigation.vue';

export default {
	name: 'App',
	data() {
		return {};
	},
	components: {
		Footer,
		Navigation,
	},
};
</script>
