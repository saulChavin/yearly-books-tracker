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

//save book to reading list in local storage
function saveToReadingList(book: any) {
	const readingList = JSON.parse(localStorage.getItem('readingList') || '[]');
	readingList.push(book);
	localStorage.setItem('readingList', JSON.stringify(readingList));
	alert('Book added to reading list!');
}

</script>

<template>
	<div class="flex flex-col items-center justify-center h-screen text-amber-50">
		<button @click="$router.back()" class="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
			Back to Books
		</button>
		<h1>{{ book?.volumeInfo?.title }}</h1>
		<img :src="book?.volumeInfo?.imageLinks?.thumbnail" alt="Book Cover" class="mb-4" />
		<button @click="saveToReadingList(book)">
			Add to reading list
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
				stroke="currentColor" class="w-6 h-6 inline-block">
				<path stroke-linecap="round" stroke-linejoin="round"
					d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
			</svg>
		</button>
		<p>{{ book?.volumeInfo?.description }}</p>
	</div>
</template>
