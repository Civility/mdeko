<script setup>
import { storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'
const { getCategories } = useGoods()
const { CATEGORIES } = storeToRefs(useGoods())
useSeoMeta({
	title: 'Каталог',
	description: 'Каталог - Минеральные удобрения от производителя',
	ogImage: '/img/main.webp'
})
const { pending: categoriesWait } = await useLazyAsyncData('setCategories', () => getCategories())
</script>
<template>
	<main>
		<section class="relative h-screen w-full">
			<div class="container absolute inset-0 flex h-full w-full items-center justify-start opacity-50">
				<img src="/svg/logo.svg" width="800" height="400" alt="logo" />
			</div>
			<span style="background-image: url(/img/main.webp)" class="parallax_bg" />
		</section>

		<h1 class="mb-10 bg-main py-10 text-center">Каталог</h1>
		<section class="container my-20 bg-main py-10 lg:mb-20 lg:py-20" v-if="CATEGORIES.length && !categoriesWait">
			<div class="wrap justify-around gap-10">
				<CardCategory v-for="item in CATEGORIES" :data="item" :key="item.url" class="col-span-full md:col-span-4 lg:col-span-2" />
			</div>
		</section>
	</main>
</template>
