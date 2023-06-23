<script setup>
import { storeToRefs, mapActions } from 'pinia'
import { useGoods } from '@/store/goods.js'

const { getCategories, getTovari } = useGoods()
const { CATEGORIES, categoryItem, TOVARI } = storeToRefs(useGoods())

const { setCategoryActive } = mapActions(useGoods(), ['setCategoryActive'])
const route = useRoute().params.list
const { pending: categoriesWait } = await useLazyAsyncData('setCategories', () => getCategories())
const { pending: tovariWait } = await useAsyncData('setTovari', () => getTovari(route))

const tovars = computed(() => TOVARI.value[route])
definePageMeta({
	key: (route) => route.fullPath,
})
</script>
<template>
	<div class="wrap-full">
		<CardItem v-if="!tovariWait" v-for="item in tovars" :key="item.url" :data="item" class="sm:col-span-4 col-span-full" />

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
</template>
