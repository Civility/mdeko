<script setup>
import { useGoods } from '@/store/goods.js'
const { getCategories } = useGoods()
const { pending: categoriesWait } = await useLazyAsyncData('setCategories', () => getCategories())
</script>
<template>
	<Header />
	<SeoKit />
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
	@apply blur-lg opacity-0;
}
</style>