<template>
	<!-- page to search books -->

	<main class="relative flex flex-col items-center min-h-screen p-4 pt-20 sm:pt-24 text-text">

		<NuxtLink to="/"
			class="absolute top-6 left-6 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 z-10"
			aria-label="Back to home">
			<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
		</NuxtLink>
		<div class="w-full max-w-3xl p-6 sm:p-10 shadow-xl rounded-lg">
			<h1 class="text-3xl sm:text-4xl font-bold text-center mb-8">
				Search for Books
			</h1>

			<!-- Search bar -->
			<div class="flex items-center mb-4">
				<input type="text" placeholder="Search for books..."
					class="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
				<button
					class="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-200">
					Search
				</button>

			</div>
			<!-- Search results -->
			<div class="text-center">
				<p>Loading...</p>
			</div>

		</div>
	</main>
</template>