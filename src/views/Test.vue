<template>
	<v-container class="mx-auto">
		<v-row no-gutters>
			<v-col
				v-for="route in routes"
				:key="route.id"
				cols="12"
				sm="6"
				md="4"
				lg="4"
			>
				<router-link
					:to="'#'"
					style="text-decoration: none"
				>
					<RouteCard :route="route" />
				</router-link>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import RouteCard from '@/components/Routes/RouteCard.vue';
import { Rute } from '@/services';

export default {
	name: 'Test',
	components: { RouteCard },
	data() {
		return {
			routes: [],
		};
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
	},
};
</script>

<style scoped></style>
