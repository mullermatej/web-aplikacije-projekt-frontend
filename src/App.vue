<template>
	<v-app>
		<v-main>
			<Navigation v-if="showNavigation" />
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import Navigation from '@/components/Layout/Navigation.vue';

export default {
	name: 'App',
	data() {
		return {
			showNavigation: true,
		};
	},
	components: {
		Navigation,
	},
	created() {
		this.checkRoute();
	},
	methods: {
		checkRoute() {
			if (this.$route.name == 'Login' || this.$route.name == 'Register') {
				this.showNavigation = false;
			}
		},
	},
};
</script>

<style></style>
