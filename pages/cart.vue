<script setup>
import { storeToRefs } from 'pinia'
import { useCart } from '@/store/cart.js'
import { useGoods } from '@/store/goods.js'
const { getHits } = useGoods()
const { pending: getHitsWait } = await useAsyncData('setGetHits', () => getHits())
const { CARTS } = storeToRefs(useCart())
const { HITS } = storeToRefs(useGoods())
</script>
<template>
	<main class="cart container py-10 md:py-15">
		<h1 class="capitalize">Корзина</h1>
		<div v-if="!CARTS.length">
			<h3 class="mb-12 md:mb-20">Ваша корзина пуста</h3>
			<section v-if="!getHitsWait">
				<h2 class="col-span-full text-center"><span class="inline-block">Сезонное предложение</span></h2>
				<div class="wrap-full">
					<CardItem v-for="item in HITS" :key="item.url" :data="item" class="col-span-full sm:col-span-4" />
				</div>
			</section>
		</div>
		<div class="flex flex-col gap-6" v-else>
			<div class="wrap-full relative bg-main/70 p-6 text-dark" v-for="(item, index) in CARTS" :key="index">
				<Btn
					@click="useCart().setCartDel(index)"
					class="!absolute !right-0 !top-0 m-2 h-7 w-7 rounded-full border border-white !text-white hover:border-white/70 hover:!text-white/70"
				>
					<Svg svg="round-close" />
				</Btn>

				<div class="col-span-1 md:col-span-1">
					<img v-if="item.product.img.mini" class="w-full" :src="item.product.img.mini" :alt="item.product.title" />
				</div>
				<div class="wrap col-span-7 gap-4 md:col-span-11">
					<div class="col-span-3 flex flex-col">
						<!-- ${item.product.category}/ -->
						<NuxtLink :to="`/kategorii/${item.product.category}/${item.product.url}`">
							<span class="font-bold">{{ item.product.title }}</span>
						</NuxtLink>
						<span class="text-gray">{{ item.product.category }}</span>
					</div>
					<div class="col-span-2 text-lg text-dark">{{ item.product.price }}<Svg svg="baseline-currency-ruble" /></div>
					<div class="relative col-span-2 flex max-w-[5rem] items-center justify-center self-center">
						<Btn :disabled="item.total <= 1" @click="useCart().setCartMinus(item.product.url)"
							><span class="flex h-4 w-4 items-center justify-center bg-main-darker"><Svg svg="baseline-minus" /></span
						></Btn>
						<input
							type="text"
							class="bg-gray-300 text-md md:text-basecursor-default text-gray-700 flex w-full max-w-[2rem] items-center bg-transparent text-center font-semibold outline-none hover:text-black focus:text-black focus:outline-none"
							:value="item.total"
						/>
						<Btn @click="useCart().setCartPlus(item.product.url)"
							><span class="flex h-4 w-4 items-center justify-center bg-main-darker text-lg"><Svg svg="baseline-plus" /></span
						></Btn>
					</div>
				</div>
			</div>
			<Btn main to="/checkout">Перейти к оформлению</Btn>
		</div>
	</main>
</template>
<style lang="postcss" scoped></style>
