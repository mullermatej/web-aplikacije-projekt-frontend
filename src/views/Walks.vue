<template>
	<v-container class="mx-auto">
		<v-row
			align="center"
			justify="center"
		>
			<v-col cols="12">
				<SearchBar :routes="routes" />
			</v-col>
		</v-row>
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
					:to="'/walks/' + route.id"
					style="text-decoration: none"
				>
					<WalkCard :route="route" />
				</router-link>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import WalkCard from '@/components/Cards/WalkCard.vue';
import SearchBar from '@/components/Layout/SearchBar.vue';
import { Rute } from '@/services';

export default {
	name: 'Walks',
	components: { WalkCard, SearchBar },
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
