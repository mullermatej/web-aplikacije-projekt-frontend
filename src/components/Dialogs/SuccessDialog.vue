<template>
	<v-dialog
		v-model="open"
		width="auto"
	>
		<v-card
			align="center"
			class="pt-5"
		>
			<v-card-text>
				<p class="text-h5">Walk created successfully!</p>
				<v-btn
					class="rounded-xl text-white text-caption"
					color="primary"
					@click="$emit('refresh')"
					>Close</v-btn
				>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'SuccessDialog',
	props: ['open'],
	data() {
		return {};
	},
};
</script>
