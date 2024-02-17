<template>
	<v-main>
		<v-img
			src="@/assets/panorama-1.jpeg"
			height="350px"
		>
		</v-img>

		<v-container>
			<v-row
				justify="center"
				align="center"
			>
				<v-col cols="12">
					<p class="text-h1 text-uppercase font-weight-bold text-center primary--text">Walk it</p>
					<p class="text-subtitle-1 font-weight-medium text-uppercase text-center secondary--text">
						lets go get those daily steps in <span class="font-weight-bold">{{ username }}</span>
					</p>
				</v-col>
			</v-row>
			<v-row
				align="center"
				justify="center"
			>
				<v-col cols="6">
					<v-autocomplete
						:disabled="isUpdating"
						:items="routes"
						color="primary"
						label="Search by city, country, difficulty or route name"
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
		</v-container>
	</v-main>
</template>

<script>
import { Auth } from '@/services';
import { Rute } from '@/services';

export default {
	name: 'Home',
	data() {
		return {
			username: Auth.state.username,
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
