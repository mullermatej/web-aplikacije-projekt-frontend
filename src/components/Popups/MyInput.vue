<template>
	<input
		type="text"
		placeholder="Child"
		:value="secondValue"
		@input="$emit('update:secondValue', $event.target.value)"
	/>
</template>

<script>
export default {
	props: {
		secondValue: String,
	},
};
</script>
