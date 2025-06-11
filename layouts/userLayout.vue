<script setup lang="ts">

import { ref, computed } from 'vue';

const name = ref('');
const avatar = ref(''); // Default avatar URL

onMounted(() => {
	// Fetch user data from local storage or API
	name.value = localStorage.getItem('name') || '';
	avatar.value = localStorage.getItem('profileImage') || ''; // Default avatar URL
});
</script>

<template>
	<nav
		class="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white dark:bg-gray-800/50 shadow-md z-10">
		<h1 class="text-2xl font-bold text-text">Fo<span class="text-violet">lium</span></h1>
		<!-- <UserTag :name="name" :avatar="avatar" /> -->
	</nav>
	<main class="relative flex flex-col items-center text-text">
		<slot />
	</main>
</template>