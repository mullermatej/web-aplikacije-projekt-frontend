<template>
	<v-app>
		<v-main>
			<Navigation v-if="exists" />
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import Navigation from '@/components/Layout/Navigation.vue';
import { Auth } from '@/services';

export default {
	name: 'App',
	data() {
		return {
			exists: Auth.getUser(),
		};
	},
	components: {
		Navigation,
	},
};
</script>

<style></style>
