<script setup lang="ts">
import BookCard from './BookCard.vue';

const router = useRouter();
const genresCookie = useCookie('genres');
const recommendedBooks = ref<any[]>([]);

function buildGoogleBooksSubjectQuery(subjects: string[]): string {
    if (!Array.isArray(subjects) || subjects.length === 0) {
        throw new Error("You must provide a non-empty array of subjects.");
    }
    const queryParts = subjects.map(subject => `subject:"${subject.replace(/"/g, '\\"')}"`);
    return encodeURIComponent(queryParts.join(" OR "));
}

async function fetchRecommendedBooks(genres: string[]) {
    if (!genres.length) return;
    const query = buildGoogleBooksSubjectQuery(genres);
    try {
        recommendedBooks.value = await $fetch(`/api/books/recommendations?q=${query}`);
    } catch (error) {
        console.error('Error fetching book data:', error);
    }
}

onMounted(async () => {
    let genres: string[] = genresCookie.value ? genresCookie.value as unknown as string[] : [];
    if (!genres.length) {
        const storedGenres = localStorage.getItem('genres');
        if (storedGenres) {
            genres = JSON.parse(storedGenres);
            genresCookie.value = genres as unknown as string;
        }
    }
    await fetchRecommendedBooks(genres);
});

const handleNavigation = (bookId: string) => {
    router.push(`/books/${bookId}`);
};
</script>


<template>
	<div>My Genres</div>
	<ul class="flex flex-wrap gap-4">
		<li v-for="book in recommendedBooks" :key="book.id">
			<BookCard :book="book" @book-clicked="handleNavigation" />
		</li>
	</ul>
</template>