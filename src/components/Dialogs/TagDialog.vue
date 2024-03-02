<template>
	<v-dialog
		v-model="open"
		width="auto"
	>
		<v-sheet
			width="400"
			class="mx-auto"
		>
			<v-form
				@submit.prevent
				class="py-4 px-4"
			>
				<v-text-field
					v-model="newTag"
					label="New tag"
					type="text"
					:rules="newTagRules"
					class="mx-4"
				>
				</v-text-field>

				<v-row>
					<v-col>
						<v-btn
							class="rounded-xl text-white text-caption"
							color="primary"
							block
							@click="addTag()"
							>Submit</v-btn
						>
					</v-col>
					<v-col>
						<v-btn
							class="rounded-xl text-white text-caption"
							color="error"
							block
							@click="$emit('closeTagDialog')"
							>Close</v-btn
						>
					</v-col>
				</v-row>
			</v-form>
		</v-sheet>
	</v-dialog>
</template>

<script>
import { Rute, Korisnik, Auth } from '@/services';

export default {
	name: 'TagDialog',
	props: ['open'],
	data() {
		return {
			newTag: '',
			newTagRules: [
				(value) => {
					if (value?.length > 2 && value?.length < 23) return true;
					return 'Please enter a valid tag.';
				},
			],
		};
	},
	methods: {
		async addTag() {
			if (this.newTag == '' || this.newTag.length < 3 || this.newTag.length > 22) return false;
			try {
				let success = await Rute.addTag(this.$route.params.routeId, this.newTag);
				if (success) {
					console.log('New tag added');
					let newTag = {
						routeId: this.$route.params.routeId,
						value: this.newTag,
					};
					try {
						await Korisnik.addCreatedTag(Auth.state.username, newTag);
						console.log('Tag added to createdTags.');
					} catch (e) {
						console.error(e);
					}
				} else {
					console.log('Unable to add new tag');
				}
			} catch (e) {
				console.error(e);
			}
			location.reload();
		},
	},
};
</script>
