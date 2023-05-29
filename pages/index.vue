<script setup>
import { storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'
import { useInfo } from '@/store/info.js'

const { getHits, CATEGORIES } = useGoods()
const { HITS } = storeToRefs(useGoods())
const { getBanners, getInfo, info } = useInfo()
const { bannerMain, bannerSecond } = storeToRefs(useInfo())
// const { pending: categoriesWait } = await useLazyAsyncData('setCategories', () => getCategories())
const { pending: bannersWait } = await useLazyAsyncData('setBanners', () => getBanners())
const { pending: hitsWait } = await useLazyAsyncData('setHits', () => getHits())
const { pending: infoWait } = await useLazyAsyncData('setInfo', () => getInfo())
</script>

<template>
	<main class="pt-[20vh]">
		<!-- bg-fixed inset-0 stretch after:bg-black/30 style="background-image: url(/img/bg_main.webp)"-->
		<!-- lg:h-screen h-auto  lg:pb-[15vh] lg:pt-[20vh] md:pt-[15vh] -->
		<section class="category w-full relative pb-15">
			<div class="wrap-full md:gap-2 gap-5 container px-0 border-14 shadow border-gray-light bg-gray-light relative">
				<ClientOnly>
					<CardCategory
						v-for="item in CATEGORIES"
						:data="item"
						:key="item.url"
						class="xl:col-span-4 md:col-span-6 col-span-full relative md:max-h-[25vh] max-h-40"
						v-if="!categoriesWait"
					/>
				</ClientOnly>
				<img src="/img/bird.webp" alt="bird" class="w-1/5 absolute -top-24 xl:-left-20 left-1/3 -z-10 origin-bottom-right -rotate-45" />
			</div>
			<span class="parallax_bg" style="background-image: url(/img/bg_main.webp)" />
		</section>
		<ClientOnly>
			<Banner class=" " :data="bannerMain" v-if="!bannersWait" />
		</ClientOnly>
		<section class="container md:py-15 py-10" v-if="HITS.length">
			<h2 class="col-span-full !mb-10 text-main">Сезонное предложение</h2>
			<div class="wrap-full" v-if="!hitsWait">
				<CardItem v-for="item in HITS" :key="item.url" :data="item" class="md:col-span-4 col-span-full" />
			</div>
		</section>
		<ClientOnly>
			<Banner class="md:py-15 py-10" right :data="bannerSecond" v-if="!bannersWait" />

			<!-- <aside class="md:mb-15 mb-10" v-if="!infoWait">
				<Info :data="item" v-for="item in infoHalf" class="md:mb-15 mb-10" />

				<Info :data="item" v-for="item in infoLast" />
			</aside> -->
			<aside class="md:mb-15 mb-10 container" v-if="!infoWait">
				<div v-for="list in info" :key="list.id" class="mb-4">
					<h3 v-if="list.title" v-text="list.title" class="text-center text-4xl capitalize" />
					<span v-if="list.subTitle" v-text="list.subTitle" class="text-center max-w-md" />
					<div v-if="list.text" v-html="list.text" class="text-center max-w-lg mx-auto" />
					<Info :data="list.list" class="max-w-4xl mx-auto" />
				</div>
			</aside>
		</ClientOnly>
		<!-- <span class="parallax" style="background-image: url(/img/bg3.webp)" /> -->
	</main>
</template>
