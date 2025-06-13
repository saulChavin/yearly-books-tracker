<script setup lang="ts">
const route = useRoute()
const book: any = ref(null);
$fetch(`/api/books/${route.params.id}`)
	.then((data: any) => {
		book.value = data;
	})
	.catch((error) => {
		console.error('Error fetching book data:', error);
	});

</script>

<template>
	<div class="flex flex-col items-center justify-center h-screen text-amber-50">
		<button @click="$router.back()" class="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
			Back to Books
		</button>
		<h1>{{ book?.volumeInfo?.title }}</h1>
		<img :src="book?.volumeInfo?.imageLinks?.thumbnail" alt="Book Cover" class="mb-4" />
		<p>{{ book?.volumeInfo?.description }}</p>
	</div>
</template>
