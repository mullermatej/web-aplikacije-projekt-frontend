<template>
	<v-container class="mx-auto">
		<v-row
			align="center"
			justify="center"
		>
			<v-col cols="12">
				<v-autocomplete
					:disabled="isUpdating"
					:items="routes"
					color="primary"
					label="Search by city, country, difficulty or walk name"
					item-text="name"
					item-value="name"
					class="primary--text"
					:filter="customFilter"
				>
					<template v-slot:item="data">
						<v-list-item-avatar>
							<img :src="data.item.imageUrl" />
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title
								@click="handleClick(data.item.id)"
								v-html="data.item.name"
							></v-list-item-title>
						</v-list-item-content>
					</template>
				</v-autocomplete>
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
					:to="'/test2/' + route.id"
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
			isUpdating: false,
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
		handleClick(id) {
			this.$router.push(`/Test2/${id}`);
		},
		customFilter(item, queryText, itemText) {
			const searchText = queryText.toLowerCase();
			const itemName = item.name.toLowerCase();
			const itemLocation = item.location.toLowerCase();
			const itemDifficulty = item.difficulty.toLowerCase();
			return (
				itemName.includes(searchText) ||
				itemLocation.includes(searchText) ||
				itemDifficulty.includes(searchText)
			);
		},
	},
};
</script>

<style scoped></style>
