<template>
	<Header />
	<NuxtPage />
	<Footer />
</template>

<script setup>
const config = useRuntimeConfig()
const route = useRoute()

useHead({
	meta: [{ name: 'og:title', content: ` ${config.public.G_NAME} | ${route.meta.title}` }],
})
</script>
