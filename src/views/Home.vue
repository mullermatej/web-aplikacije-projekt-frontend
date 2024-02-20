<template>
	<v-container mx-auto>
		<v-row
			justify="center"
			align="center"
			class="my-6"
		>
			<v-col
				cols="12"
				justify="center"
				align="center"
			>
				<p class="text-h2 text-uppercase text-center">
					It's great to see you, <span class="font-weight-medium accent--text">{{ username }} </span>!
				</p>
				<p class="text-subtitle-1 font-weight-medium text-uppercase text-center">
					start exploring new walks and locations
				</p>
				<v-btn
					class="text-caption white--text"
					color="primary"
					:to="{ name: 'Explore' }"
					>Take a walk</v-btn
				>
			</v-col>
			<v-col
				lg="4"
				md="6"
				sm="8"
			>
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

		<v-row
			align="center"
			justify="center"
		>
			<v-col
				class="text-center"
				lg="4"
				md="6"
				sm="8"
			>
				<img
					src="@/assets/Hiking.jpg"
					height="250px"
				/>

				<p class="px-2">
					<i class="fa-solid fa-location-dot"></i> You will find walks
					<span class="font-weight-bold">scattered accross the map</span>, choose one or create one yourself
					and start walking. With <span class="font-weight-bold">on-route tracking</span> you won't go off
					walk trails and a highly accurate GPS signal will follow you on your walk.
				</p>
				<v-btn
					class="text-caption white--text"
					color="accent"
					:to="{ name: 'Explore' }"
					>View map</v-btn
				>
			</v-col>
			<v-col
				class="text-center"
				lg="4"
				md="6"
				sm="8"
			>
				<img
					src="@/assets/Explore.jpg"
					height="250px"
				/>
				<p class="px-2">
					<i class="fa-solid fa-signs-post"></i> Each route will contain
					<span class="font-weight-bold">tags</span> and
					<span class="font-weight-bold">community tags</span> made by you. Tags are here to give you the
					general idea of the walk. There's also
					<span class="font-weight-bold">points of interest</span> revealing interesting places on the walk
					that you can find.
				</p>
				<v-btn
					class="text-caption white--text"
					color="accent"
					:to="{ name: 'Test' }"
					>Browse</v-btn
				>
			</v-col>
			<v-col
				class="text-center"
				lg="4"
				md="6"
				sm="8"
			>
				<img
					src="@/assets/Find.jpg"
					height="250px"
				/>
				<p class="px-2">
					<i class="fa-solid fa-map-pin"></i> You can <span class="font-weight-bold">search</span> trough
					different walks by using keywords such as "Easy" for specifing
					<span class="font-weight-bold">route difficulty</span> or searching by the
					<span class="font-weight-bold">town</span> or <span class="font-weight-bold">country name</span>
					where you wish to take a walk, for example "Pula" or "Croatia".
				</p>
				<v-btn
					class="text-caption white--text"
					color="accent"
					:to="{ name: 'Test' }"
					>View walks</v-btn
				>
			</v-col>
		</v-row>
	</v-container>
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
