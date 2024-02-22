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
					@click="handleClick(data.item.id)"
					v-html="data.item.name"
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
	created() {},
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
		handleClick(id) {
			this.$router.push(`/walks/${id}`);
		},
	},
};
</script>

<style scoped></style>
