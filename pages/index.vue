<template>
	<main>
		<section class="category md:py-15 py-10 container">
			<div class="wrap">
				<CardCategory
					v-for="item in category"
					:data="item"
					:key="item.url"
					class="lg:col-span-2 md:col-span-4 col-span-full"
					v-if="!categoryWait"
				/>
			</div>
		</section>

		<Banner class="md:py-15 py-10" :data="bannerMain" v-if="!bannersWait" />

		<section class="container md:py-15 py-10" v-if="!hitsWait">
			<h2 class="text-center col-span-full title-line">Сезонное предложение</h2>
			<div class="wrap">
				<CardItem v-for="item in hits" :key="item.url" :data="item" class="col-span-4" />
			</div>
		</section>
		<aside class="md:py-15 py-10 wrap md:gap-y-15" v-if="!infoWait">
			<Info :data="item" class="container bg-dark/50 col-span-full" v-for="item in infoHalf" />
		</aside>
		<Banner class="md:py-15 py-10" right :data="bannerSecond" v-if="!bannersWait" />
		<aside class="md:my-15 my-10" v-if="!infoWait">
			<Info :data="item" class="bg-dark/50" v-for="item in infoLast" />
		</aside>
		<div class="fixed inset-0 w-full h-full -z-30">
			<div class="parallax">
				<div class="parallax__mask" />
			</div>
		</div>
	</main>
</template>
<script setup>
// import { useMq } from 'vue3-mq'
import { storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'
import { useInfo } from '@/store/info.js'

const { getCategory, getHits, category, hits } = useGoods()
const { getBanners, getInfo, info } = useInfo()
const { bannerMain, bannerSecond } = storeToRefs(useInfo())
const { pending: categoryWait, data: categoryData } = await useLazyAsyncData('category', () => getCategory())
const { pending: bannersWait, data: bannersData } = await useLazyAsyncData('banners', () => getBanners())
const { pending: hitsWait, data: hitsData } = await useLazyAsyncData('hits', () => getHits())
const { pending: infoWait, data: infoData } = await useLazyAsyncData('info', () => getInfo())
const infoHalf = computed(() => info.filter((i, id) => id < 2))
const infoLast = computed(() => info.filter((i, id) => id >= 2))
</script>
<style scoped lang="postcss">
.parallax {
	@apply relative;
	@apply bg-no-repeat bg-cover bg-scroll bg-center;
	@apply bg-[url('/assets/img/bg3.webp')];
	@apply flex justify-center items-center;
	@apply bg-fixed;
	@apply h-screen;

	&__mask {
		@apply bg-black/5;
		@apply border border-solid border-white/25;
		@apply rounded-3xl;

		@apply inline-block relative;
		@apply backdrop-blur-sm;
		@apply w-full h-full;
		/* @apply w-11/12;
		@apply h-5/6; */
	}
}
</style>
