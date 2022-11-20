<script setup>
import { storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'
const { getCategory, getTovari } = useGoods()
const { category, tovari } = storeToRefs(useGoods())
const { pending: categoryWait, data: categoryData } = await useLazyAsyncData('category', () => getCategory())
const { pending: tovariWait, data: tovariData } = await useLazyAsyncData('tovari', () => getTovari())
// watchEffect(() => refresh(), getTovari())
const arrTovari = ref(tovari.value)

const typeActiveCategory = shallowRef(null)

const isTovari = (url) => {
	typeActiveCategory.value = url

	arrTovari.value = tovariData.value.filter((item) => item.category === url)
}
</script>
<template>
	<main class="wrap container gap-x-12">
		<nav class="md:col-span-2 col-span-full md:h-full bg-gradient-to-tl from-main-dark to-sec-dark flex flex-col gap-4 py-10 -mx-4">
			<div class="sticky top-1/4 flex flex-col gap-4">
				<Btn
					main
					icon
					v-for="nav in category"
					:key="nav.url"
					class="mx-4"
					@click.native="isTovari(nav.url)"
					:class="{ '!to-sec !from-main': typeActiveCategory === nav.url }"
				>
					{{ nav.title }}
					<Svg :svg="nav.icon" :alt="nav.title" />
				</Btn>
			</div>
		</nav>
		<section	 class="col-span-6 wrap-full my-4">
			<LazyCardItem
				v-for="item in tovariData"
				:key="item.url"
				:data="item"
				class="sm:col-span-4 col-span-full"
				v-if="arrTovari.length === 0"
			/>
			<LazyCardItem v-for="item in arrTovari" :key="item.url" :data="item" class="sm:col-span-4 col-span-full" v-else />
		</section>
		<span class="parallax" style="background-image: url(/img/bg2.webp);" />
	</main>
</template>
