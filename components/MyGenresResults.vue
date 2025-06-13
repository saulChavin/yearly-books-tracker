<script setup lang="ts">
import BookCard from './BookCard.vue';

const genresCookie = useCookie('genres');

console.log('Genres Cookie:', typeof genresCookie.value);
const genres: string[] = genresCookie.value ? genresCookie.value as unknown as string[] : [];
const query = buildGoogleBooksSubjectQuery(genres);
const recomendedBooks = ref<any[]>([]);
$fetch(`/api/books/recommendations?q=${query}`)
	.then((books: any) => {
		console.log('Books:', books);
		recomendedBooks.value = books;
	})
	.catch((error) => {
		console.error('Error fetching book data:', error);
	});

function buildGoogleBooksSubjectQuery(subjects: string[]): string {
	if (!Array.isArray(subjects) || subjects.length === 0) {
		throw new Error("You must provide a non-empty array of subjects.");
	}

	// Create query string like: subject:Science OR subject:Fiction
	const queryParts = subjects.map(subject => `subject:"${subject.replace(/"/g, '\\"')}""`);
	const query = queryParts.join(" OR ");

	return encodeURIComponent(query);
}

const handleNavigation = (bookId: string) => {
	// Navigate to the book details page
	useRouter().push(`/books/${bookId}`);
};

</script>


<template>
	<div>My Genres</div>
	<ul class="flex flex-wrap gap-4">
		<li v-for="book in recomendedBooks" :key="book.id">
			<BookCard :book="book" @book-clicked="handleNavigation" />
		</li>
	</ul>
</template>