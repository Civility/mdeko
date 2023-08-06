<script setup>
import { useGoods } from '@/store/goods.js'
const { getCategories } = useGoods()
const { pending: categoriesWait } = await useLazyAsyncData('setCategories', () => getCategories())
</script>
<template>
	<div>
		<Header />
		<SeoKit />
		<!-- a. Generates browser screenshots for every page -->
		<OgImageScreenshot />
		<!-- b. Generate satori images for every page (uses the default template) -->
		<OgImageStatic />
		<NuxtPage class="-mt-32" />
		<Footer />
	</div>
</template>
