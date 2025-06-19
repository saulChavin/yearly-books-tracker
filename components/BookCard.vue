<script setup lang="ts">
//props book
const props = defineProps<{
	book: {
		id: string;
		title: string;
		authors: string[];
		cover: string;
		description: string;
	};
}>();

// Emits an event when the book card is clicked
const emit = defineEmits<{
	(e: 'book-clicked', bookId: string): void;
}>();

function handleClick() {
	emit('book-clicked', props.book.id);
}

//save book to reading list in local storage
function saveToReadingList(book: any) {
	const readingList = JSON.parse(localStorage.getItem('readingList') || '[]');
	readingList.push(book);
	localStorage.setItem('readingList', JSON.stringify(readingList));
	alert('Book added to reading list!');
}

</script>
<template>
	<div @click="handleClick" v-if="props.book"
		class="book-card shadow-sm  shadow-fuchsia-700 p-4 rounded-lg hover:shadow-xl transition-shadow duration-300">
		<div class="`book-header flex items-center justify-between mb-2"
			:style="{ backgroundImage: `url(${props.book.cover})` }">
			<img :src="props.book?.cover" alt="Book Cover" class="book-cover h-14" height="52px" />
		</div>
		<h3 class="book-title">{{ props.book.title }}</h3>
		<p class="book-authors">{{ props.book.authors.join(', ') }}</p>
		<p class="book-description">{{ props.book.description }}</p>
		<button @click="saveToReadingList(props.book)">
			Add to reading list
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
				stroke="currentColor" class="w-6 h-6 inline-block">
				<path stroke-linecap="round" stroke-linejoin="round"
					d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
			</svg>
		</button>
	</div>
</template>

<style scoped>
.book-header {
	background-size: cover;
	background-position: center;
	border-radius: 4px;
	width: 100%;
	height: 52px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 8px;
	filter: blur(2px);
}

.book-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 8px;
	width: 200px;
}

.book-cover {
	width: 100%;
	height: auto;
	border-radius: 4px;
}

.book-title {
	font-size: 1.2em;
	font-weight: bold;
	margin: 8px 0;
}

.book-authors {
	font-size: 0.9em;
	color: #555;
	margin: 4px 0;
}

.book-description {
	font-size: 0.8em;
	color: #777;
	text-align: center;
}

.book-card:hover {
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transform: translateY(-2px);
	transition: transform 0.2s, box-shadow 0.2s;
}

.book-card:hover .book-cover {
	transform: scale(1.05);
	transition: transform 0.2s;
}

.book-card:hover .book-title {
	color: #007bff;
	transition: color 0.2s;
}

.book-card:hover .book-authors,
.book-card:hover .book-description {
	color: #555;
	transition: color 0.2s;
}
</style>