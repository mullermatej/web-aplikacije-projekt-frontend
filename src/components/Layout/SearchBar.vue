<template>
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
					@click="$router.push(`/walks/${data.item.id}`)"
					v-html="data.item.name"
					class="text-capitalize"
				></v-list-item-title>
			</v-list-item-content>
		</template>
	</v-autocomplete>
</template>

<script>
export default {
	name: 'SearchBar',
	components: {},
	props: ['routes'],
	data() {
		return {
			isUpdating: false,
		};
	},
	methods: {
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
