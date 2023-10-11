<script setup>
import { storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'
import { useCart } from '@/store/cart.js'
const { CARTS } = storeToRefs(useCart())
const route = useRoute().params
const { getItem, geCcatalog } = useGoods()
const { ITEM, CATALOG } = storeToRefs(useGoods())
const { pending: itemWait } = await useLazyAsyncData('getItem', () => getItem(route.category, route.slug))
const { pending: geCcatalogWait } = await useLazyAsyncData('geCcatalog', () => geCcatalog())

const catalog = computed(() => CATALOG.value.find((i) => i.slug === route.category))
const product = computed(() => ITEM.value[route.slug])
const isCartTotal = ref({})
const cartTotal = computed(() => CARTS.value.find((i) => i.product.url === route.slug))
computed(() => (isCartTotal.value.total ?? typeof cartTotal.value != 'undefined' ? cartTotal.value.total : 0))

watch(
	CARTS.value,
	(state) => {
		isCartTotal.value = state.find((i) => i.product.url === route.slug)
	},
	{ deep: true }
)
</script>

<template>
	<main v-if="CATALOG.length">
		<Head>
			<Title>{{ catalog?.meta_title ?? catalog?.title }}</Title>
			<Meta v-if="catalog?.meta_desc" name="description" :content="catalog.meta_desc" />
		</Head>
		<ClientOnly>
			<section class="relative h-screen w-full" v-if="!geCcatalogWait">
				<Icon :svg="regSVG(catalog.icon)" class="absolute inset-0 z-0 flex items-center justify-center text-[32rem] text-green" />
				<span style="background-image: url(/sec.webp)" class="parallax_bg" />
			</section>
		</ClientOnly>
		<h1 class="mb-10 bg-main py-10 text-center" v-text="catalog.title" />

		<section class="wrap container mt-20 gap-5" v-if="!itemWait && ITEM">
			<CardCart :data="product" class="col-span-full bg-main p-5 lg:col-span-3 lg:p-20" />
			<ClientOnly>
				<div class="col-span-full bg-main p-5 text-gray lg:col-span-5 lg:py-20">
					<p v-if="product?.mini_text" v-html="product.mini_text" />
					<dl v-if="product?.application" class="flex gap-1">
						<dt class="font-normal">Применение -</dt>
						<dd v-html="product.application" />
					</dl>
					<dl v-if="product?.storage" class="flex gap-1">
						<dt class="font-normal">Хранение -</dt>
						<dd v-html="product.storage" />
					</dl>
					<dl v-if="product?.volum" class="flex gap-1">
						<dt class="font-normal">Объём -</dt>
						<dd v-html="product.volum" />
					</dl>
					<dl v-if="product?.restriction" class="flex gap-1">
						<dt class="font-normal">Ограничение -</dt>
						<dd v-html="product.restriction" />
					</dl>
					<dl v-if="product?.action" class="flex gap-1">
						<dt class="font-normal">Действие -</dt>
						<dd v-html="product.action" />
					</dl>
					<dl v-if="product?.purpose" class="flex gap-1">
						<dt class="font-normal">Назначение -</dt>
						<dd v-html="product.purpose" />
					</dl>
					<dl class="flex gap-1">
						<dt class="font-normal">Страна производства -</dt>
						<dd>Россия</dd>
					</dl>
					<dl v-if="product?.best_before_date" class="flex gap-1">
						<dt class="font-normal">Срок годности -</dt>
						<dd v-html="product.best_before_date" />
					</dl>
					<dl v-if="product?.weight_no_box" class="flex gap-1">
						<dt class="font-normal">Вес без упаковки -</dt>
						<dd v-html="product.weight_no_box" />
					</dl>
					<dl v-if="product?.weight_box" class="flex gap-1">
						<dt class="font-normal">Вес с упаковой -</dt>
						<dd v-html="product.weight_box" />
					</dl>
					<dl v-if="product?.width_box" class="flex gap-1">
						<dt class="font-normal">Высота упаковки -</dt>
						<dd v-html="product.width_box" />
					</dl>
					<dl v-if="product?.height_box" class="flex gap-1">
						<dt class="font-normal">Ширина упаковки -</dt>
						<dd v-html="product.height_box" />
					</dl>
				</div>
				<div v-if="product?.text" class="col-span-full bg-main p-5 text-gray lg:py-20" v-html="product.text" />

				<Btn main class="col-span-full ml-auto" @click.once="$router.back()">назад</Btn>
			</ClientOnly>
		</section>
		<section class="container col-span-full my-10 justify-around gap-10 lg:my-20">
			<div class="wrap justify-around gap-10" v-if="!geCcatalogWait">
				<CardCategory
					v-for="item in CATALOG"
					:key="item.slug"
					:data="item"
					class="col-span-full md:col-span-4 lg:col-span-2"
					ref="index"
				/>
			</div>
		</section>
		<ClientOnly>
			<div v-if="itemWait" role="status" class="flex items-center justify-center">
				<Icon svg="peathumates" class="animate-spin text-9xl" />
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
			</div></ClientOnly
		>
	</main>
</template>
