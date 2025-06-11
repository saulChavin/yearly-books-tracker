<script setup lang="ts">
//retrieve the user data as props

const { name, avatar } = defineProps({
	name: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
	}
});
</script>

<template>
	<div class="flex items-center text-text shrink-0 px-2 py-1 gap-2">
		<span class="text-sm font-semibold">{{ name }}</span>
		<img v-if="avatar" :src="avatar" alt="User Avatar" class="w-8 h-8 rounded-full mr-2" />
	</div>
</template>