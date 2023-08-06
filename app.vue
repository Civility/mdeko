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
