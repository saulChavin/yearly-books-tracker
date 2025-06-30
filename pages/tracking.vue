<script setup lang="ts">
const readingList = ref<any[]>([]);

//load local storage reading list
onMounted(() => {
	const storedList = localStorage.getItem('readingList');
	if (storedList) {
		readingList.value = JSON.parse(storedList);
	} else {
		readingList.value = [];
	}
});
</script>


<template>
	<div class="reading-list">
		<h1 class="text-2xl font-bold mb-4">My Reading List</h1>
		<ul class="flex flex-wrap gap-4">
			<li v-for="book in readingList" :key="book.id">
				<BookCard :book="book" />
			</li>
		</ul>
	</div>
	<div v-if="readingList.length === 0" class="text-center text-gray-500">
		<p>Your reading list is empty. Start adding books!</p>
	</div>
</template>