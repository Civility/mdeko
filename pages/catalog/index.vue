<script setup>
import { storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'
const { geCcatalog } = useGoods()
const { CATALOG } = storeToRefs(useGoods())

const { pending: geCcatalogWait } = await useLazyAsyncData('setCategories', () => geCcatalog())
</script>
<template>
	<main v-if="!geCcatalogWait && CATALOG.length">
		<Head>
			<Title>Каталог</Title>
			<Meta name="description" content="Каталог - Минеральные удобрения от производителя" />
			<Meta name="og:image" content="/img/main.webp" />
		</Head>

		<section class="relative h-screen w-full">
			<div class="container absolute inset-0 z-10 flex h-full w-full items-center justify-start mix-blend-difference">
				<img src="/logo.svg" width="800" height="400" alt="logo" />
			</div>
			<span style="background-image: url(/sec.webp)" class="parallax_bg" />
		</section>

		<ClientOnly>
			<h1 class="mb-10 bg-main py-10 text-center">Каталог</h1>
			<section class="container my-20 bg-main py-10 lg:mb-20 lg:py-20">
				<div class="wrap justify-around gap-10" v-if="!geCcatalogWait">
					<CardCategory
						v-for="item in CATALOG"
						:key="item.slug"
						:data="item"
						class="col-span-full md:col-span-4 lg:col-span-2"
						ref="catalog"
					/>
				</div>
			</section>
		</ClientOnly>
	</main>
</template>
