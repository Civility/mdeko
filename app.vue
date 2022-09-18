<template>
	<Header />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<Footer />
</template>
<script setup>
const route = useRoute()

useHead({
	meta: [{ name: 'og:title', content: `akvamdeko | ${route.meta.title}` }],
})
</script>
