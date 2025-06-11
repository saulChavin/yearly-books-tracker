<script setup lang="ts">
definePageMeta({
    middleware: 'registered-redirect'
});
</script>


<template>
	<!-- You can have a loading state or a blank template here,
       as the user will be redirected by the middleware. -->
	<div>
		<p>Loading...</p>
	</div>
</template>
