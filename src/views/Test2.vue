<template>
	<v-container class="mx-auto">
		<v-img
			width="100%"
			height="300"
			cover
			class="mx-auto rounded-xl"
			:src="route.imageUrl"
		></v-img>
		<p class="text-h4 text-center mt-4 mb-0">{{ route.name }}</p>
		<p class="text-subtitle-2 text-center mt-0 mb-4">{{ route.location }}</p>
		<p class="text-h5">Description</p>
		<p class="text-subtitle-1">
			{{ route.description }}
		</p>

		<p class="text-h5">Route tags</p>

		<v-item-group
			multiple
			class="mb-8"
		>
			<v-item class="ml-1 mr-1">
				<v-chip> {{ route.distance }} kilometers </v-chip>
			</v-item>
			<v-item class="ml-1 mr-1">
				<v-chip> {{ route.difficulty }} difficulty </v-chip>
			</v-item>
			<v-item class="ml-1 mr-1">
				<v-chip> {{ route.visited }} people already visited</v-chip>
			</v-item>
			<v-item class="ml-1 mr-1">
				<v-chip> takes about {{ route.duration }} minutes </v-chip>
			</v-item>
			<v-item class="ml-1 mr-1">
				<v-chip> Open all year </v-chip>
			</v-item>
		</v-item-group>

		<iframe
			:src="route.startingPosition"
			width="100%"
			height="400"
			class="rounded-xl"
			style="border: 0"
			allowfullscreen="true"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		></iframe>
	</v-container>
</template>

<script>
import { Rute } from '@/services';

export default {
	name: 'Test2',
	data() {
		return {
			route: {},
		};
	},
	created() {
		this.getRoute();
	},
	methods: {
		async getRoute() {
			try {
				const routeId = this.$route.params.routeId;
				const response = await Rute.getRouteById(routeId);
				this.route = response;
			} catch (e) {
				console.error(e);
			}
		},
	},
};
</script>
