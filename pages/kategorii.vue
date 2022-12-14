<script setup>
import { storeToRefs, mapActions } from 'pinia'
import { useGoods } from '@/store/goods.js'
const config = useRuntimeConfig()
const { getCategories, getTovari } = useGoods()
const { categories, categoryactive, tovari } = storeToRefs(useGoods())

const { getCategoryActive } = mapActions(useGoods(), ['getCategoryActive'])

const { pending: categoriesWait, data: categoriesData } = await useLazyAsyncData('categories', () =>
	getCategories(config.public.PUBLIC_NAME)
)
const {
	pending: tovariWait,
	data: tovariData,
	refresh,
} = await useLazyAsyncData('tovari', () => getTovari(config.public.PUBLIC_NAME, categoryactive.value))
watchEffect(() => refresh(categoryactive.value))

// watch(
// 	() => categoryactive.value,
// 	() => refresh()
// )

// useGoods().$subscribe(() => {
// 	getTovari()
// })
// function isCategory() {
// 	return computed(() => categories.value.find((item) => item.url === categoryactive.value))
// }

// const isCategory = computed(() => categories.value.find((item) => item.url === categoryactive.value))

// const isCategory = () => {
// 	categories.value.find((item) => item.url === categoryactive.value)
// }
</script>
<template>
	<main class="wrap container gap-x-12 -ml-0">
		<nav class="lg:col-span-2 col-span-full md:h-full bg-gradient-to-tl from-main-dark to-sec-dark flex flex-col gap-4 py-10 -mx-4">
			<div class="sticky top-1/4 flex flex-col gap-4">
				<Btn
					main
					icon
					v-for="nav in categories"
					:key="nav.url"
					class="mx-4"
					:to="`/kategorii/${nav.url}`"
					:class="{ '!to-sec !from-main': categoryactive === nav.url }"
					@click="useGoods().getCategoryActive(nav.url)"
				>
					{{ nav.name }}
					<Svg :svg="nav.icon ?? 'baseline-cloud-sync'" :alt="nav.name" />
				</Btn>
			</div>
		</nav>
		<section class="lg:col-span-6 col-span-full wrap-full my-4">
			<article
				v-if="useRoute().name === 'kategorii'"
				v-for="category in categories"
				class="col-span-full md:col-span-6 bg-local bg-center bg-no-repeat bg-cover relative"
				style="background-image: url(/img/pattern/pattern3-down.webp)"
			>
				<div class="flex justify-between gap-4 py-10 px-5 bg-gradient-to-tl from-main-darker/70 to-sec/90">
					<div class="flex flex-col w-full">
						<Btn clear glue :to="`/kategorii/${category.url}`" @click="useGoods().getCategoryActive(category.url)" class="!p-0">
							<h4 v-text="category.name"
						/></Btn>

						<div v-html="category.text" />
					</div>

					<img :src="category.img.mini" :alt="category.img.alt" v-if="category.img.mini" class="h-64" />
				</div>
			</article>
			<NuxtPage v-else />
		</section>
		<span class="parallax" style="background-image: url(/img/bg2.webp)" />
	</main>
</template>
