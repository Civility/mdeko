<script setup>
import { storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'
const { getCategories } = useGoods()
const { CATEGORIES } = storeToRefs(useGoods())

const { pending: categoriesWait } = await useLazyAsyncData('setCategories', () => getCategories())
</script>
<template>
	<main>
		<Head>
			<Title>Каталог</Title>
			<Meta name="description" content="Каталог - Минеральные удобрения от производителя" />
			<!-- <Meta name="og:image" content="/img/main.webp" /> -->
		</Head>
		<section class="relative h-screen w-full">
			<div class="container absolute inset-0 z-10 flex h-full w-full items-center justify-start mix-blend-difference">
				<img src="/logo.svg" width="800" height="400" alt="logo" />
			</div>
			<span style="background-image: url(/sec.webp)" class="parallax_bg" />
		</section>

		<h1 class="mb-10 bg-main py-10 text-center">Каталог</h1>
		<section class="container my-20 bg-main py-10 lg:mb-20 lg:py-20" v-if="CATEGORIES.length && !categoriesWait">
			<div class="wrap justify-around gap-10">
				<CardCategory v-for="item in CATEGORIES" :data="item" :key="item.url" class="col-span-full md:col-span-4 lg:col-span-2" />
			</div>
		</section>
	</main>
</template>
