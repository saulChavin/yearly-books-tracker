<script setup lang="ts">
definePageMeta({
	layout: 'user-layout',
	middleware: 'registered-redirect'

});
// const name = localStorage.getItem('name') || '';
</script>

<template>
	<main class="flex flex-col items-center justify-center min-h-screen p-6 text-center">
		<div class="max-w-2xl w-full">

			<MyGenresResults />

			<NuxtLink to="/about"
				class="mt-16 inline-block text-sky-600 dark:text-sky-400 hover:underline animate-fade-in-up delay-600">
				Learn more about Folium
			</NuxtLink>
		</div>
	</main>
</template>

<style scoped>
/* Simple fade-in animations */
@keyframes fadeInDown {
	from {
		opacity: 0;
		transform: translateY(-20px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-in-down {
	animation: fadeInDown 0.6s ease-out forwards;
}

.animate-fade-in-up {
	animation: fadeInUp 0.6s ease-out forwards;
}

/* Delay classes (can be generated with Tailwind if using a JIT compiler with safelisting or variants) */
.delay-200 {
	animation-delay: 0.2s;
}

.delay-400 {
	animation-delay: 0.4s;
}

.delay-600 {
	animation-delay: 0.6s;
}
</style>