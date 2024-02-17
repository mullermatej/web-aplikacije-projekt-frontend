<template>
	<v-col>
		<v-card
			class="mx-auto rounded-xl mb-2"
			max-width="400"
			href="#"
			style="text-decoration: none"
		>
			<v-img
				:src="route.imageUrl"
				height="200px"
				width="100%"
				cover
			></v-img>
			<v-card-title class="text-h5 text-capitalize"> {{ route.name }} </v-card-title>
			<v-card-subtitle class="d-flex justify-space-between">
				<span class="text-body-2 text-capitalize">{{ route.location }}</span>
				<span class="text-body-1">{{ route.distance }}km</span></v-card-subtitle
			>
		</v-card>
	</v-col>
</template>

<script>
export default {
	name: 'RouteCard',
	props: ['route'],
};
</script>

<style scoped></style>
