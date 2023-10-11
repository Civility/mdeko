<script setup>
import { storeToRefs } from 'pinia'
import { useCart } from '@/store/cart.js'

const { CARTS } = storeToRefs(useCart())
const route = useRoute()
const props = defineProps({
	data: Object
})

const isCartTotal = computed(() => {
	const foundCartItem = CARTS.value.find((i) => i.product.slug === props.data.slug)

	return foundCartItem ? foundCartItem.total : 0
})
const setCartTotal = ref(isCartTotal.value)
watch(isCartTotal, (newVal) => {
	setCartTotal.value = newVal
})
// const resetCartTotal = (slug) => {
// 	const index = CARTS.value.findIndex((cart) => cart.product.slug === slug)
// 	if (index !== -1) {
// 		useCart().resetItemTotal(index)
// 	}
// }
const ifCart = computed(() => route.name === 'cart')
</script>

<template>
	<div v-if="data" class="relative flex h-full flex-col">
		<div v-if="data?.img ?? data?.slider.length" class="relative">
			<Slider
				v-if="data?.slider.length && !ifCart"
				:data="data?.slider"
				:slidesPerView="1"
				:loop="true"
				:navigation="false"
				:grabCursor="true"
				class="mb-5"
			>
				<template #content="{ slider }">
					<div class="flex w-full items-center justify-center">
						<img :src="IMG() + slider.img" :alt="slider.alt" class="h-60 object-contain lg:h-auto" />
					</div>
				</template>
			</Slider>
			<span v-else class="mb-5 flex h-fit w-full items-center justify-center">
				<img v-if="data?.img" :src="IMG() + data.img" :alt="data.title" />
				<img v-else src="/logo.svg" width="200" height="100" alt="logo" />
			</span>
		</div>

		<div class="flex h-full flex-col text-center">
			<div class="mb-5 flex h-full flex-col place-content-center">
				<NuxtLink v-if="ifCart" :to="`/catalog/${data?.category_slug}/${data?.slug}`"
					><span v-if="data?.title" class="text-white" v-text="data.title" />
				</NuxtLink>
				<span v-else v-if="data?.title" class="text-white" v-text="data.title" />
				<p v-if="data?.composition" class="text-gray" v-html="data.composition" />
			</div>
			<div class="mt-auto flex flex-col gap-2">
				<div v-if="data?.price_min" class="w-full bg-main-light px-2 py-3 text-white">{{ data.price_min }} р</div>
				<div class="relative flex gap-3" v-if="CARTS">
					<div class="flex w-full">
						<Btn :disabled="+setCartTotal <= 0" @click="useCart().setCartMinus(data.slug)" class="!w-12 bg-main-light">-</Btn>
						<input
							type="text"
							class="md:text-basecursor-default flex w-12 items-center bg-transparent text-center font-semibold outline-none focus:text-black focus:outline-none"
							:value="+setCartTotal"
						/>

						<Btn clear @click="useCart().setCartPlus(data.slug)" class="!w-12 bg-main-light">+</Btn>
					</div>
					<Btn v-if="ifCart" main @click="useCart().removeCartItem(data.slug)" class="!w-full whitespace-nowrap !px-5"
						>убрать</Btn
					>
					<Btn v-else main to="/cart" class="!w-full whitespace-nowrap !px-5">в корзину</Btn>
				</div>
			</div>
		</div>
	</div>
</template>
