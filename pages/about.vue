<template>
	<main class="relative flex flex-col items-center min-h-screen p-4 pt-20 sm:pt-24 text-text">
	  <!-- Assuming Header, Content, Footer are global or you'll place them as needed -->
	  <!-- <Header /> -->
	  <!-- <Content /> -->
	  <!-- <Footer /> -->
  
	  <NuxtLink
		to="/"
		class="absolute top-6 left-6 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 z-10"
		aria-label="Back to home"
	  >
		<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
		  <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
		</svg>
	  </NuxtLink>
  
	  <div class="w-full max-w-3xl p-6 sm:p-10 shadow-xl rounded-lg">
		<h1 class="text-3xl sm:text-4xl font-bold text-center mb-8">
		  About This Reading Tracker
		</h1>
  
		<section class="space-y-6 leading-relaxed">
		  <p class="text-lg">
			Welcome! This project is your personal dashboard for all things books. It's designed to help you meticulously track your reading journey, from the books you've conquered to those eagerly waiting on your list.
		  </p>
  
		  <div>
			<h2 class="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Core Features:</h2>
			<ul class="list-disc list-inside space-y-2 pl-4">
			  <li><strong>Track Your Reads:</strong> Easily manage lists for books you've read, are currently reading, or plan to read.</li>
			  <li><strong>Personal Notes & Highlights:</strong> Capture your thoughts, favorite quotes, and key insights as you read.</li>
			  <li><strong>Reading Calendar:</strong> Visualize your reading progress and plan future reading goals with an integrated calendar.</li>
			  <li><strong>Wishlists:</strong> Curate lists of books you're excited to explore in the future.</li>
			</ul>
		  </div>
  
		  <div>
			<h2 class="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Exciting Future Enhancements:</h2>
			<ul class="list-disc list-inside space-y-2 pl-4">
			  <li><strong>AI Book Recommendations:</strong> Discover new favorites with an intelligent recommendation engine tailored to your unique preferences and reading history.</li>
			  <li><strong>Smart Reading Scheduler:</strong> Optimize your reading time with a tool that helps create a reading schedule, estimates reading times, and suggests the best slots based on your availability.</li>
			</ul>
		  </div>
  
		  <p class="text-center text-gray-600 dark:text-gray-400 pt-6">
			We're passionate about making reading more organized and enjoyable. Happy reading!
		  </p>
		</section>
	  </div>
	</main>
  </template>
  
  <script setup lang="ts">
  // No script logic needed for this static page, but setup tag is good practice for Nuxt 3 pages
  </script>
  
  <style scoped>
  /* You can add page-specific styles here if needed */
  </style>