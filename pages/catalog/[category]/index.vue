<script setup>
import { storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'
const { getCategory, geCcatalog } = useGoods()
const { CATEGORY, CATALOG } = storeToRefs(useGoods())
const route = useRoute().params.category
const { pending: geCcatalogWait } = await useLazyAsyncData('geCcatalog', () => geCcatalog())
const { pending: categoryWait } = await useLazyAsyncData('getCategory', () => getCategory(route))

const catalog = computed(() => CATALOG.value.find((i) => i.slug === route))
</script>
<template>
	<main v-if="!geCcatalogWait && catalog">
		<Head>
			<Title>{{ catalog?.meta_title ?? catalog?.title }}</Title>
			<Meta v-if="catalog?.meta_desc" name="description" :content="catalog.meta_desc" />
			<Meta v-if="catalog?.img" name="og:image" :content="catalog.img" />
		</Head>
		<section class="relative h-screen w-full overflow-hidden">
			<Icon :svg="regSVG(catalog.icon)" class="absolute inset-0 z-0 flex items-center justify-center text-[32rem] text-green" />
			<span style="background-image: url(/sec.webp)" class="parallax_bg" />
		</section>

		<template v-if="!categoryWait">
			<h1 class="mb-10 bg-main py-10 text-center" v-text="catalog.title" />
			<section class="container mt-20 bg-main py-10 lg:mt-20 lg:py-20">
				<div class="wrap gap-10 lg:gap-15">
					<CardItem
						v-for="item in CATEGORY[route]"
						:key="item.slug"
						:data="item"
						more
						class="col-span-full md:col-span-4 xl:col-span-2"
					/>
				</div>
			</section>
			<section class="container py-20">
				<h2 class="mb-10 text-center text-main-light">Каталог</h2>
				<div class="wrap justify-around gap-10" v-if="!geCcatalogWait">
					<CardCategory
						v-for="item in CATALOG"
						:key="item.slug"
						:data="item"
						class="col-span-full md:col-span-4 lg:col-span-2"
						ref="category"
					/>
				</div>
			</section>
		</template>
		<strong v-else class="block py-10 text-center font-display text-6xl text-sec-lighter lg:py-20">Товара нет</strong>
	</main>
</template>
