
<script setup>
import { useCart } from '@/store/cart.js'

const props = defineProps({
	data: Object,
})
</script>
<template>
	<div class="relative flex flex-col w-full mx-auto">
		<div
			class="relative rounded overflow-hidden bg-gradient-to-r even:from-main-dark/70 from-main-light/50 odd:to-main-light/50 70 group shadow-lg flex flex-col py-8 h-full"
		>
			<div class="relative w-32 p-8 mx-auto flex justify-center overflow-hidden rounded">
				<img class="w-full" src="/img/item.webp" :alt="data.title" />
			</div>
			<Btn
				clear
				:to="`/kategorii/${data.category}/${data.url}`"
				class="my-3 !py-3 px-2 text-base md:text-lg xl:text-xl text-dark uppercase after:bg-dark before:bg-dark text-center box-decoration-clone bg-gradient-to-r from-main to-sec"
				v-text="data.title"
			/>
			<div class="text-center mt-auto">
				<!-- <pre>{{ useCart().CARTS }}</pre> -->
				<Btn svg @click="useCart().setCartPlus(data.url, 1)" class="border-dark group-hover:!border-white !w-max">
					<Svg svg="sharp-shopping-cart" class="mr-2 text-dark group-hover:!text-white" />
					<span class="text-dark group-hover:text-white">В корзину</span>
				</Btn>
			</div>
		</div>
	</div>
</template>

