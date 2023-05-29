<script setup>
import { storeToRefs, mapActions } from 'pinia'
import { useGoods } from '@/store/goods.js'

const { getCategories, getTovari } = useGoods()
const { CATEGORYACTIVE, CATEGORIES, TOVARI } = storeToRefs(useGoods())

const { getCategoryActive } = mapActions(useGoods(), ['getCategoryActive'])

const { pending: categoriesWait } = await useLazyAsyncData('setCategories', () => getCategories())
const { pending: tovariWait, refresh } = await useAsyncData('setTovari', () => getTovari(CATEGORYACTIVE.value))
watchEffect(() => refresh(CATEGORYACTIVE.value))
</script>
<template>
	<main class="wrap gap-x-12">
		<ClientOnly>
			<nav class="lg:col-span-2 col-span-full md:h-full bg-gradient-to-tl from-main-dark to-sec-dark flex flex-col gap-4 py-10">
				<div class="sticky top-1/4 flex flex-col gap-4">
					<Btn
						main
						icon
						v-for="nav in CATEGORIES"
						:key="nav.url"
						class="mx-4"
						:to="`/kategorii/${nav.url}`"
						:class="{ '!to-sec !from-main': CATEGORYACTIVE === nav.url }"
						@click="useGoods().getCategoryActive(nav.url)"
					>
						{{ nav.name }}
						<Svg :svg="nav.icon ?? 'baseline-cloud-sync'" :alt="nav.name" />
					</Btn>
				</div>
			</nav>
		</ClientOnly>
		<section
			class="container lg:col-span-6 col-span-full wrap-full my-4"
			v-if="$route.name === 'kategorii' || $route.name === 'kategorii-list' || $route?.params?.list === CATEGORYACTIVE"
		>
			<!-- <pre v-if="$route?.params?.list === CATEGORYACTIVE">{{ $route?.params?.list }}</pre> -->
			<!-- <NuxtPage /> -->
			<CardItem
				v-if="$route?.params?.list === CATEGORYACTIVE"
				v-for="item in TOVARI"
				:key="item.url"
				:data="item"
				class="sm:col-span-4 col-span-full"
			/>
			<ClientOnly>
				<template v-for="category in CATEGORIES" :key="category.url">
					<!-- bg-local bg-center bg-no-repeat bg-cover  -->
					<!-- style="background-image: url(/img/pattern/pattern3-down.webp)" -->
					<!-- :class="{ 'md:col-span-6': $route.name === 'kategorii' }" -->
					<article v-if="$route.name === 'kategorii' || $route.params.list === category.url" class="col-span-full relative">
						<!-- bg-gradient-to-tl from-main-darker/70 to-sec/90 -->
						<div class="flex justify-between gap-4 py-10 px-5 border border-main">
							<div class="flex flex-col w-full">
								<Btn
									v-if="$route.params.list != category.url"
									clear
									glue
									:to="`/kategorii/${category.url}`"
									@click="useGoods().getCategoryActive(category.url)"
									class="!p-0"
								>
									<h4 v-text="category.name"
								/></Btn>
								<h4 v-else v-text="category.name" class="mx-auto" />
								<div v-html="category.text" />
							</div>

							<img :src="category.img.mini" :alt="category.img.alt" v-if="category.img.mini" class="h-64" />
						</div>
					</article>
				</template>
			</ClientOnly>
		</section>

		<span class="parallax" style="background-image: url(/img/bg2.webp)" />
	</main>
</template>
