<script setup lang="ts">
definePageMeta({
	middleware: 'registered-redirect'

});
const step = ref(0);
const selectedGenres = ref<string[]>([]);
const name = ref('');
const profileImage = ref<File | null>(null);
const genresCookie = useCookie('genres');

const profileImageUrl = computed(() => {
	// Check if profileImage has a value and if window is available (client-side)
	if (profileImage.value && typeof window !== 'undefined' && window.URL) {
		return window.URL.createObjectURL(profileImage.value);
	}
	return ''; // Return an empty string or a placeholder image URL if no image
});

const steps = [
	{
		title: 'Welcome to Folium',
		description: 'Let\'s get started with your reading journey.',
	},
	{
		title: 'Choose a Profile Image',
		description: 'Select an image that represents you.',
	},
	{
		title: 'Enter Your Name',
		description: 'What should we call you?',
	},
	{
		title: 'Select your favorite genres',
		description: 'Choose the genres you love to read.',
	}
];

const googleBooksSubjects = [
	"Fiction",
	"Nonfiction",
	"Biography & Autobiography",
	"Business & Economics",
	"Comics & Graphic Novels",
	"Computers",
	"Cooking",
	"Drama",
	"Education",
	"Family & Relationships",
	"Health & Fitness",
	"History",
	"Humor",
	"Juvenile Fiction",
	"Juvenile Nonfiction",
	"Language Arts & Disciplines",
	"Law",
	"Literary Criticism",
	"Mathematics",
	"Medical",
	"Music",
	"Nature",
	"Performing Arts",
	"Philosophy",
	"Poetry",
	"Political Science",
	"Psychology",
	"Reference",
	"Religion",
	"Science",
	"Self-Help",
	"Social Science",
	"Sports & Recreation",
	"Technology & Engineering",
	"Transportation",
	"Travel",
	"True Crime",
	"Young Adult Fiction",
	"Young Adult Nonfiction"
];

const handleFileChange = (event: Event) => {
	const target = event.target as HTMLInputElement;
	if (target.files && target.files.length > 0) {
		profileImage.value = target.files[0];
	}
};

const handleFinish = () => {
	localStorage.setItem("name", name.value);
	localStorage.setItem("genres", JSON.stringify(selectedGenres.value));
	genresCookie.value = JSON.stringify(selectedGenres.value);
	if (profileImage.value) {
		const reader = new FileReader();
		reader.onload = (e) => {
			localStorage.setItem("profileImage", e.target?.result as string);
			window.location.href = '/';
		};

		reader.onerror = (e) => {
			console.error('Error reading file:', e);
		};
		reader.readAsDataURL(profileImage.value);
	} else {
		localStorage.setItem("profileImage", "");
		window.location.href = '/';
	}
	// You can also emit an event or call a function to save this data
};

</script>
<template>
	<div class="w-full h-full flex items-center justify-center min-h-full text-text">
		<div class="w-full">
			<div class="w-full max-w-3xl p-6 sm:p-10 shadow-xl rounded-lg relative overflow-hidden">
				<h1 class="text-3xl sm:text-4xl font-bold text-center mb-8">
					{{ steps[step].title }}
				</h1>
				<p class="text-lg text-slate-600 dark:text-slate-400 mb-10">
					{{ steps[step].description }}
				</p>

				<!-- Step content goes here -->
				<Transition name="fade-slide" mode="out-in">
					<div :key="step" class="w-full">
						<div v-if="step === 0">
							<!-- Welcome step content -->
							<p>Welcome to Folium! Let's get started with your reading journey.</p>
						</div>
						<div v-else-if="step === 1">
							<!-- Profile image selection -->
							<img v-if="profileImage" :src="profileImageUrl" alt="Profile Image"
								class="w-32 h-32 rounded-full mx-auto mb-4" />
							<input type="file" accept="image/*" @change="handleFileChange"
								class="border p-2 rounded-lg w-full" />
						</div>
						<div v-else-if="step === 2">
							<!-- Name input -->
							<input v-model="name" name="name" type="text" placeholder="Enter your name"
								class="border p-2 rounded-lg w-full" />
						</div>
						<div v-else-if="step === 3">
							<!-- Genre selection -->
							<div class="flex flex-wrap gap-2">
								<div v-for="(genre, index) in googleBooksSubjects" :key="index"
									class="flex items-center">
									<input hidden type="checkbox" :id="`genre-${index}`" :name="`genre-${index}`"
										class="peer" :value="genre" v-model="selectedGenres">
									<label :for="`genre-${index}`"
										class="border p-2.5 border-violet rounded-3xl hover:border-purple peer-checked:bg-purple cursor-pointer">{{
											genre
										}}</label>
								</div>
							</div>
						</div>
					</div>
				</Transition>

				<div class="flex justify-between mt-6">
					<button @click="step--" :disabled="step === 0"
						class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg">
						Back
					</button>
					<button v-if="step !== steps.length - 1" @click="step++" :disabled="step === steps.length - 1"
						class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
						Next
					</button>
					<button v-else @click="handleFinish"
						class="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg">
						Let's Go!
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
	transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from {
	opacity: 0;
	transform: translateX(30px);
}

.fade-slide-leave-to {
	opacity: 0;
	transform: translateX(-30px);
}

/* Optional: if you want the new element to slide in from the other direction */
/*
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
*/

/* Ensure the container has a position relative and overflow hidden if elements might overlap during transition */
.w-full.max-w-3xl {
	position: relative;
	overflow-x: hidden;
	/* Prevents horizontal scrollbar during slide */
}
</style>