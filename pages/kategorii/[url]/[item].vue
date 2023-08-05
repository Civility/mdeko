<script setup>
import { storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'
import { useCart } from '@/store/cart.js'
const { CARTS } = storeToRefs(useCart())
const route = useRoute()
const { getProduct } = useGoods()
const { PRODUCT, CATEGORIES } = storeToRefs(useGoods())
const { pending: productWait, refresh } = await useLazyAsyncData('getProduct', () => getProduct(route.params.url, route.params.item))
const { pending: categoriesWait } = await useLazyAsyncData('setCategories', () => getCategories())

const categori = computed(() => CATEGORIES.value.find((i) => i.url === route.params.url))
const isCartTotal = ref({})

const cartTotal = computed(() => CARTS.value.find((i) => i.product.url === route.params.item))

const setCartTotal = computed(() => (isCartTotal.value.total ?? typeof cartTotal.value != 'undefined' ? cartTotal.value.total : 0))

watch(
	CARTS.value,
	(state) => {
		isCartTotal.value = state.find((i) => i.product.url === route.params.item)
	},
	{ deep: true }
)
</script>

<template>
	<main v-if="categori">
		<section class="relative h-screen w-full">
			<div class="container absolute inset-0 flex h-full w-full items-center justify-start opacity-50">
				<img src="/svg/logo.svg" width="600" height="200" alt="logo" />
			</div>
			<span style="background-image: url(/img/face.webp)" class="parallax_bg" />
		</section>
		<h1 class="mb-10 bg-main py-10 text-center text-5xl uppercase" v-text="categori.name" />
		<section class="wrap container mt-20 gap-5" v-if="PRODUCT && !productWait">
			<CardCart :data="PRODUCT" class="col-span-3 bg-main p-10 lg:p-20" />
			<div class="col-span-5 bg-main p-10 text-gray lg:py-20">
				<p v-html="PRODUCT.text" />
				<dl v-if="PRODUCT?.primeneniye" class="flex gap-1">
					<dt class="font-normal">Применение -</dt>
					<dd v-html="PRODUCT.primeneniye" />
				</dl>
				<dl v-if="PRODUCT?.khraneniye" class="flex gap-1">
					<dt class="font-normal">Хранение -</dt>
					<dd v-html="PRODUCT.khraneniye" />
				</dl>
				<dl v-if="PRODUCT?.obiyom" class="flex gap-1">
					<dt class="font-normal">Объём -</dt>
					<dd v-html="PRODUCT.obiyom" />
				</dl>
				<dl v-if="PRODUCT?.ogranicheniye" class="flex gap-1">
					<dt class="font-normal">Ограничение -</dt>
					<dd v-html="PRODUCT.ogranicheniye" />
				</dl>
				<dl class="flex gap-1">
					<dt class="font-normal">Страна производства -</dt>
					<dd>Россия</dd>
				</dl>
			</div>
			<div class="col-span-full bg-main p-10 text-gray lg:py-20" v-html="PRODUCT.description" />

			<Btn main class="col-span-full ml-auto" @click.once="$router.back()">назад</Btn>
			<section class="wrap col-span-full my-10 justify-around gap-10 lg:my-20" v-if="CATEGORIES.length">
				<CardCategory v-for="item in CATEGORIES" :data="item" :key="item.url" class="col-span-full md:col-span-4 lg:col-span-2" />
			</section>
		</section>
	</main>
</template>
