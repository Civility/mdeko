<script setup>
import { useGoods } from '@/store/goods.js'
const { getCategories } = useGoods()
const { pending: categoriesWait } = await useLazyAsyncData('setCategories', () => getCategories())
</script>
<template>
	<div>
		<Header />
		<NuxtPage />
		<Footer />
	</div>
</template>
