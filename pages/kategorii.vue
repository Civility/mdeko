<template>
	<main class="wrap container">
		<nav class="md:col-span-2 col-span-full md:h-full bg-gradient-to-tl from-main-dark to-sec-dark flex flex-col gap-4 py-10 -mx-4">
			<Btn main icon v-for="nav in category" :key="nav.url" class="mx-4">
				{{ nav.title }}
				<Svg :svg="nav.icon" :alt="nav.title" />
			</Btn>
		</nav>
		<div class="col-span-6">123</div>

		<span class="parallax" style="background-image: url(/assets/img/bg2.webp);" />
	</main>
</template>
<script setup>
import { useGoods } from '@/store/goods.js'
const { getCategory, category } = useGoods()
const { pending: categoryWait, data: categoryData } = await useLazyAsyncData('category', () => getCategory())
</script>
