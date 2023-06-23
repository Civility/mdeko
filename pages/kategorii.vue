<script setup>
import { storeToRefs, mapActions } from 'pinia'
import { useGoods } from '@/store/goods.js'

const { getCategories } = useGoods()
const { CATEGORYACTIVE, CATEGORIES } = storeToRefs(useGoods())

const { pending: categoriesWait } = await useLazyAsyncData('setCategories', () => getCategories())
// const { pending: tovariWait } = await useAsyncData('setTovari', () => getTovari(CATEGORYACTIVE.value))
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
					class="mx-4 !justify-between"
					:to="`/kategorii/${nav.url}`"
					:class="{ '!text-main-lighter': CATEGORYACTIVE == nav.url }"
					@click="useGoods().setCategoryActive(nav.url)"
				>
					{{ nav.name }}
					<Svg :svg="nav.icon ?? 'baseline-cloud-sync'" :alt="nav.name" class="min-w-max min-h-max" />
				</Btn>
			</div>
		</nav>

		<section class="container lg:col-span-6 col-span-full my-4">
			<NuxtPage v-if="$route.path != '/kategorii'" />

			<div v-else v-for="categoryItem in CATEGORIES" :key="categoryItem.url" class="w-full wrap gap-4 mb-10 border-12 border-main relative">
				<div class="col-span-5 flex flex-col px-4 py-8">
					<Btn
						glue
						clear
						:to="`/${$route.name}/${categoryItem.url}`"
						@click="useGoods().setCategoryActive(categoryItem.url)"
						class="!justify-start"
					>
						<h3 v-text="categoryItem.name" class="text-main" />
					</Btn>
					<div v-html="categoryItem.text" />
				</div>
				<div class="col-span-3 place-self-end">
					<img :src="categoryItem.img.mini" :alt="categoryItem.img.alt" v-if="categoryItem.img.mini" class="h-80" />
				</div>
			</div>
			<!-- <pre>{{ $route }}</pre> -->
		</section>

		<!-- <span class="parallax" style="background-image: url(/img/bg2.webp)" /> -->
	</main>
</template>
