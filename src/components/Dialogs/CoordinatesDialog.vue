<template>
	<v-dialog
		v-model="open"
		width="auto"
		persistent
	>
		<v-card>
			<v-card-title>Instructions</v-card-title>
			<v-card-text>
				<p class="text-subtitle">1. Position the dot to the walks starting position.</p>
				<p class="text-subtitle">2. Click "ADD COORDINATES" to add the current center coordinates.</p>
				<p class="text-subtitle">3. Move the map to the next position and click again.</p>
				<p class="text-subtitle">4. When finished click "DONE".</p>
			</v-card-text>
			<v-card-actions
				justify="center"
				align="center"
			>
				<v-row>
					<v-col>
						<v-btn
							class="text-white rounded-xl text-caption"
							color="primary"
							variant="text"
							@click="$emit('handleCoordinatesDialog')"
						>
							Close
						</v-btn>
					</v-col>
				</v-row>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
export default {
	name: 'CoordinatesDialog',
	props: ['open'],
	data() {
		return {};
	},
};
</script>
