<script setup>
import { storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'

const { getCategories, getTovari } = useGoods()
const { CATEGORIES, TOVARI } = storeToRefs(useGoods())

const route = useRoute().params.list
const { pending: categoriesWait } = await useLazyAsyncData('setCategories', () => getCategories())
const { pending: tovariWait } = await useAsyncData('setTovari', () => getTovari(route))

const categori = computed(() => CATEGORIES.value.find((i) => i.url === route))
const tovars = computed(() => TOVARI.value[route])
</script>
<template>
	<main v-if="categori">
		<Head>
			<Title>{{ categori.name }}</Title>
			<Meta name="description" :content="'Товары ' + categori.name + ' - Минеральные удобрения от производителя'" />
			<!-- <Meta v-if="categori?.img?.mini" name="og:image" :content="categori?.img?.mini" /> -->
		</Head>
		<section class="relative h-screen w-full overflow-hidden">
			<!-- <div class="container absolute inset-0 z-10 flex h-full w-full items-center justify-start mix-blend-difference">
				<img src="/logo.svg" width="600" height="200" alt="logo" />
			</div> -->
			<Icon
				:svg="categori.url"
				class="absolute inset-0 z-0 flex items-center justify-center text-[32rem] text-main-light mix-blend-multiply"
			/>
			<span style="background-image: url(/sec.webp)" class="parallax_bg" />
		</section>

		<template v-if="CATEGORIES.length && TOVARI.length">
			<h1 class="mb-10 bg-main py-10 text-center" v-text="categori.name" />
			<section class="container mt-20 bg-main py-10 lg:mt-20 lg:py-20">
				<div class="wrap gap-10 lg:gap-15" v-if="!tovariWait && tovars.length">
					<CardItem v-for="item in tovars" :key="item.url" :data="item" more class="col-span-full md:col-span-4 xl:col-span-2" />
				</div>
			</section>
			<section class="container py-20" v-if="!categoriesWait">
				<h2 class="mb-10 text-center text-main-light">Каталог</h2>
				<div class="wrap justify-around gap-10">
					<CardCategory
						v-for="item in CATEGORIES"
						:data="item"
						:key="item.url"
						class="col-span-full md:col-span-4 lg:col-span-2"
					/>
				</div>
			</section>
		</template>
		<strong v-else class="block py-10 text-center font-display text-6xl text-sec-lighter lg:py-20">Товара нет</strong>
	</main>
</template>
