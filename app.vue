<script setup>
import { useMain } from '@/store/main.js'
const { getMenu, getСontacts } = useMain()
await useAsyncData('contacts', async () => getСontacts())
await useLazyAsyncData('menu', () => getMenu())
</script>
<template>
		<Header />
		<!-- <SeoKit /> -->
		<NuxtPage class="-mt-32" />
		<Footer />
</template>
<style>
.page-enter-active,
.page-leave-active {
	@apply transition-all  duration-300 ease-in-out;
}
.page-enter-from,
.page-leave-to {
	@apply opacity-0 blur-lg;
}
</style>
