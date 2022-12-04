<script setup>
import { storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'
import { useInfo } from '@/store/info.js'
const config = useRuntimeConfig()
const { getCategories, getHits, categories, hits, HITS } = useGoods()
const { getBanners, getInfo, info } = useInfo()
const { bannerMain, bannerSecond } = storeToRefs(useInfo())
const { pending: categoriesWait, data: categoriesData } = await useLazyAsyncData('categories', () =>
	getCategories(config.public.PUBLIC_NAME)
)
const { pending: bannersWait, data: bannersData } = await useLazyAsyncData('banners', () => getBanners(config.public.PUBLIC_NAME))
const { pending: hitsWait, data: hitsData } = await useLazyAsyncData('hits', () => getHits(config.public.PUBLIC_NAME))
const { pending: infoWait, data: infoData } = await useLazyAsyncData('info', () => getInfo(config.public.PUBLIC_NAME))
const infoHalf = computed(() => info.filter((i, id) => id < 2))
const infoLast = computed(() => info.filter((i, id) => id >= 2))
</script>

<template>
	<main>
		<section class="category md:py-15 py-10 container flex justify-center items-center">
			<div class="wrap">
				<CardCategory
					v-for="item in categories"
					:data="item"
					:key="item.url"
					class="xl:col-span-2 md:col-span-4 col-span-full"
					v-if="!categoriesWait"
				/>
			</div>
		</section>

		<Banner class="md:pb-15 pb-10" :data="bannerMain" v-if="!bannersWait" />

		<section class="container md:py-15 py-10" v-if="!hitsWait && hits.length">
			<h2 class="text-center col-span-full"><span class="title-b inline-block">Сезонное предложение</span></h2>

			<div class="wrap-full">
				<ClientOnly>
					<CardItem v-for="item in hits.splice(0, 3)" :key="item.url" :data="item" class="sm:col-span-4 col-span-full" />
				</ClientOnly>
			</div>
		</section>

		<Banner class="md:py-15 py-10" right :data="bannerSecond" v-if="!bannersWait" />

		<aside class="md:mb-15 mb-10" v-if="!infoWait">
			<Info :data="item" v-for="item in infoHalf" class="md:mb-15 mb-10" />

			<Info :data="item" v-for="item in infoLast" />
		</aside>
		<span class="parallax" style="background-image: url(/img/bg3.webp)" />
	</main>
</template>
