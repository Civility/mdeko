
<script setup>
import { useCart } from '@/store/cart.js'

const props = defineProps({
	data: Object,
})
</script>
<template>
	<div class="relative flex flex-col w-full mx-auto">
		<div
			class="relative rounded overflow-hidden bg-gradient-to-r even:from-main-dark/70 from-main-light/50 odd:to-main-light/50 70 shadow-lg flex flex-col py-8 h-full"
		>
			<div class="relative w-32 p-8 mx-auto flex justify-center overflow-hidden rounded">
				<!-- <img class="w-full" src="/img/item.webp" :alt="data.title" /> -->
				<img v-if="data.img.mini" class="w-full" :src="data.img.mini" :alt="data.img.alt" />
				<!-- <img v-if="data.img" class="w-full" :src="data.img" :alt="data.title" /> -->
			</div>

			<Btn
				clear
				:to="`/kategorii/${data.category}/${data.url}`"
				class="my-3 !py-3 px-2 text-base md:text-lg xl:text-xl text-dark uppercase after:bg-dark before:bg-dark text-center box-decoration-clone bg-gradient-to-r from-main to-sec hover:!text-dark"
				>{{ data.title }}</Btn
			>

			<div class="mt-auto flex justify-between mx-6">
				<span class="text-xl self-center">{{ data.price }}<Svg svg="baseline-currency-ruble" /></span>
				<Btn svg @click="useCart().setCartPlus(data.url, data.category)" class="group border-dark hover:!border-white !w-max">
					<Svg svg="sharp-shopping-cart" class="mr-2 text-dark group-hover:!text-white" />
					<span class="text-dark group-hover:text-white">В корзину</span>
				</Btn>
			</div>
		</div>
	</div>
</template>

