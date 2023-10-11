<script setup>
import { storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'
import { useInfo } from '@/store/info.js'
const { getHits, geCcatalog } = useGoods()
const { getBanners } = useInfo()
const { HITS, CATALOG } = storeToRefs(useGoods())
const { BANNERS } = storeToRefs(useInfo())
const { pending: bannersWait } = await useLazyAsyncData('setBanners', () => getBanners())
const { pending: getHitsWait } = await useLazyAsyncData('setHits', () => getHits())
const { pending: geCcatalogWait } = await useLazyAsyncData('setCategories', () => geCcatalog())
</script>

<template>
	<main>
		<section class="relative h-screen w-full">
			<div class="container absolute inset-0 flex h-full w-full items-center justify-center">
				<img src="/logo.svg" width="800" height="400" alt="logo" />
			</div>
			<span class="parallax_bg" style="background-image: url(/main.webp)" />
		</section>
		<ClientOnly>
			<section class="container relative -top-20" v-if="!bannersWait && BANNERS.length">
				<Banner :data="BANNERS[0]" class="bg-gradient-to-r from-main from-30% to-main-dark to-100% p-5 text-center lg:py-20" />
			</section>
		</ClientOnly>
		<ClientOnly>
			<section class="container mb-10 py-10 lg:mb-20 lg:py-20">
				<h2 class="mb-10 text-center text-main-light">Каталог</h2>
				<div class="wrap justify-around gap-10" v-if="!geCcatalogWait">
					<CardCategory
						v-for="item in CATALOG"
						:key="item.slug"
						:data="item"
						class="col-span-full md:col-span-4 lg:col-span-2"
						ref="index"
					/>
				</div>
			</section>
		</ClientOnly>
		<ClientOnly>
			<section class="container my-10 bg-main py-10 md:my-20 lg:py-20" v-if="HITS.length && !getHitsWait">
				<h2 class="mb-10 text-center">Сезонное предложение</h2>
				<div class="wrap-full gap-10">
					<CardItem v-for="item in HITS" :key="item.url" :data="item" class="col-span-full md:col-span-4" />
				</div>
			</section>
		</ClientOnly>

		<!-- <section class="container relative -top-20" v-if="!bannersWait && BANNERS[1]">
			<Banner :data="BANNERS[1]" class="bg-gradient-to-r from-main from-30% to-main-dark to-100% p-5 text-center lg:py-20" />
		</section> -->
	</main>
</template>
