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
		<Head v-if="PRODUCT">
			<Title>{{ PRODUCT.title }}</Title>
			<Meta name="description" :content="'Товар ' + PRODUCT.title + ' - Минеральные удобрения от производителя'" />
			<!-- <Meta v-if="PRODUCT?.slider && PRODUCT?.slider.length > 0" name="og:image" :content="PRODUCT.slider[0]" /> -->
		</Head>
		<section class="relative h-screen w-full">
			<div class="container absolute inset-0 flex h-full w-full items-center justify-start opacity-50">
				<img src="/logo.svg" width="600" height="200" alt="logo" />
			</div>
			<span :style="`background-image: url(/img/${categori.url}.webp)`" class="parallax_bg" />
		</section>

		<h1 class="mb-10 bg-main py-10 text-center" v-text="categori.name" />
		<section class="wrap container mt-20 gap-5" v-if="PRODUCT && !productWait">
			<CardCart :data="PRODUCT" class="col-span-full bg-main p-5 lg:col-span-3 lg:p-20" />
			<div class="col-span-full bg-main p-5 text-gray lg:col-span-5 lg:py-20">
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
			<div class="col-span-full bg-main p-5 text-gray lg:py-20" v-html="PRODUCT.description" />

			<Btn main class="col-span-full ml-auto" @click.once="$router.back()">назад</Btn>
		</section>
		<section class="wrap container col-span-full my-10 justify-around gap-10 lg:my-20" v-if="CATEGORIES.length">
			<CardCategory v-for="item in CATEGORIES" :data="item" :key="item.url" class="col-span-full md:col-span-4 lg:col-span-2" />
		</section>

		<div role="status" v-if="productWait" class="flex items-center justify-center">
			<!-- <Icon svg="peathumates" class="animate-spin text-9xl" /> -->
			<svg
				aria-hidden="true"
				class="mr-2 h-36 w-36 animate-spin fill-main-lighter text-gray"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
			<span class="sr-only">Loading...</span>
		</div>
	</main>
</template>
