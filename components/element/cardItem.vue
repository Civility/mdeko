
<script setup>
import { useCart } from '@/store/cart.js'

const props = defineProps({
	data: Object,
})
</script>
<template>
	<div class="relative flex flex-col w-full mx-auto">
		<Btn clear glue :to="`/kategorii/${data.category}/${data.url}`" class="bg-main-lighter mb-4">
			<div class="relative w-24 px-4 py-8 mx-auto overflow-hidden">
				<img v-if="data.img.mini" :src="data.img.mini" :alt="data.img.alt" class="w-full" />
			</div>
		</Btn>
		<div class="flex gap-px flex-col items-start text-dark mb-2 lg:text-sm text-xl">
			<span v-text="data.title" class="text-dar" />
			<strong class=" ">{{ data.price }}<Svg svg="baseline-currency-ruble" /></strong>
		</div>

		<Btn
			svg
			@click="useCart().setCartPlus(data.url, data.category)"
			class="group !w-full border-dark hover:!border-sec mt-auto z-10 !text-dark hover:!text-sec"
		>
			+<Svg svg="sharp-shopping-cart" class="mr-2 text-dark group-hover:text-sec" />
			<!-- <span class="text-dark lg:text-sm text-xl">В корзину</span> -->
		</Btn>
		<!-- <pre>{{ data }}</pre> -->
	</div>
</template>

