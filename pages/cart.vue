<script setup>
import { storeToRefs } from 'pinia'
import { useCart } from '@/store/cart.js'
import { useGoods } from '@/store/goods.js'
const { getHits } = useGoods()
const { pending: getHitsWait } = await useAsyncData('setGetHits', () => getHits())
const { CARTS } = storeToRefs(useCart())
const { HITS } = storeToRefs(useGoods())

const filteredCarts = computed(() => {
	return CARTS.value.filter((cart) => cart.total !== 0)
})
</script>
<template>
	<main class="cart">
		<Head>
			<Title>Корзина</Title>
			<Meta name="description" content="Корзина - Минеральные удобрения от производителя" />
			<!-- <Meta name="og:image" :content="'/img/main.webp'" /> -->
		</Head>
		<section class="relative h-screen w-full">
			<div class="container absolute inset-0 flex h-full w-full items-center justify-center opacity-50">
				<img src="/logo.svg" width="800" height="400" alt="logo" />
			</div>
			<span style="background-image: url(/img/main.webp)" class="parallax_bg" />
		</section>
		<h1 class="mb-10 bg-main py-10 text-center">Корзина</h1>

		<section class="wrap container my-10 gap-5 lg:my-20" v-if="CARTS.length">
			<CardCart v-for="item in filteredCarts" :data="item.product" class="col-span-full bg-main p-5 lg:col-span-3 lg:p-20" />
			<Btn v-if="filteredCarts.length" main to="/checkout" class="col-span-full ml-auto !w-full">оформить</Btn>
		</section>
		<template v-if="!filteredCarts.length">
			<h3 class="col-span-full py-10 text-center lg:py-20">Ваша корзина пуста</h3>
			<section class="container my-10 bg-main py-10 md:my-20 lg:py-20" v-if="HITS.length && !getHitsWait">
				<h2 class="mb-10 text-center">Сезонное предложение</h2>
				<div class="wrap-full gap-10">
					<CardItem v-for="item in HITS" :key="item.url" :data="item" class="col-span-full md:col-span-4" />
				</div>
			</section>
		</template>
	</main>
</template>
