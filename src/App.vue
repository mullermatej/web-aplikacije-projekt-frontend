<template>
	<v-app>
		<v-main>
			<Navigation v-if="exists" />
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Navigation from '@/components/Navigation.vue';
import { Auth } from '@/services';

export default {
	name: 'App',
	data() {
		return {
			exists: Auth.getUser(),
		};
	},
	components: {
		Footer,
		Navigation,
	},
	methods: {},
};
</script>

<style></style>
