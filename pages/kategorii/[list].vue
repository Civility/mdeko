<script setup>
import { storeToRefs, mapActions } from 'pinia'
import { useGoods } from '@/store/goods.js'

const { getCategories, getTovari } = useGoods()
const { CATEGORIES, TOVARI, categoryItem } = storeToRefs(useGoods())

const { setCategoryActive } = mapActions(useGoods(), ['setCategoryActive'])
const route = useRoute().params.list
const { pending: categoriesWait } = await useLazyAsyncData('setCategories', () => getCategories())
const { pending: tovariWait } = await useAsyncData('setTovari', () => getTovari(route))

definePageMeta({
	key: (route) => route.fullPath,
})
</script>
<template>
	<main class="wrap gap-x-12">
		<nav class="lg:col-span-2 col-span-full md:h-full bg-gradient-to-tl from-dark to-gray-darker flex flex-col gap-4 py-10">
			<div class="sticky top-1/4 flex flex-col gap-4">
				<Btn
					v-if="!categoriesWait"
					main
					icon
					v-for="nav in CATEGORIES"
					:key="nav.url"
					class="mx-4"
					:to="`/kategorii/${nav.url}`"
					:class="{ '!text-main-lighter': categoryItem.url == nav.url }"
					@click="useGoods().setCategoryActive(nav.url)"
				>
					{{ nav.name }}
					<Svg :svg="nav.icon ?? 'baseline-cloud-sync'" :alt="nav.name" />
				</Btn>
			</div>
		</nav>

		<section class="container lg:col-span-6 col-span-full my-4">
			<div class="wrap-full">
				<CardItem v-if="!tovariWait" v-for="item in TOVARI" :key="item.url" :data="item" class="sm:col-span-4 col-span-full" />

				<div class="w-full wrap gap-4 mb-10 border-12 border-main relative col-span-full">
					<div class="col-span-5 flex flex-col px-4 py-8">
						<h3 v-text="categoryItem.name" class="text-main" />
						<div v-html="categoryItem.text" />
					</div>
					<div class="col-span-3 place-self-end">
						<img :src="categoryItem.img.mini" :alt="categoryItem.img.alt" v-if="categoryItem.img.mini" class="h-80" />
					</div>
				</div>
			</div>
		</section>
	</main>
</template>
