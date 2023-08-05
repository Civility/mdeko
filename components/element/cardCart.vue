<script setup>
import { storeToRefs } from 'pinia'
import { useCart } from '@/store/cart.js'
const { CARTS } = storeToRefs(useCart())
const route = useRoute()
const props = defineProps({
	data: Object
})

const isCartTotal = computed(() => {
	const foundCartItem = CARTS.value.find((i) => i.product.url === props.data.url)
	return foundCartItem ? foundCartItem.total : 0
})
const setCartTotal = ref(isCartTotal.value)
watch(isCartTotal, (newVal) => {
	setCartTotal.value = newVal
})
const resetCartTotal = (url) => {
	const index = CARTS.value.findIndex((cart) => cart.product.url === url)
	if (index !== -1) {
		useCart().resetItemTotal(index)
	}
}
const ifCart = computed(() => route.name === 'cart')
</script>

<template>
	<div v-if="data" class="relative" :class="{ 'flex flex-col': ifCart }">
		<template v-if="!data?.img">
			<Slider
				v-if="data?.slider && data?.slider.length"
				:data="data.slider"
				:slidesPerView="1"
				:loop="true"
				:navigation="false"
				:grabCursor="true"
				class="mb-5"
			>
				<template #content="{ slider }">
					<div class="flex w-full items-center justify-center">
						<img :src="`${slider}`" :alt="slider" class="object-contain" />
					</div>
				</template>
			</Slider>
			<span v-else class="mb-5 flex h-fit w-full items-center justify-center">
				<img src="/svg/logo.svg" width="200" height="100" alt="logo" />
			</span>
		</template>
		<div v-else class="mb-5 flex items-center justify-center">
			<img v-if="data?.img?.mini" :src="data?.img?.mini" :alt="data?.img?.alt ?? data.title" />
			<span v-else class="mb-5 flex h-fit w-full items-center justify-center">
				<img src="/svg/logo.svg" width="200" height="100" alt="logo" />
			</span>
		</div>

		<div class="flex flex-col text-center" :class="{ 'h-full': ifCart }">
			<div class="mb-5">
				<span v-if="data?.title" class="text-white" v-text="data.title" />
				<span v-if="data?.sostav" class="text-gray" v-html="data.sostav" />
			</div>
			<div class="mt-auto flex flex-col gap-2">
				<div class="w-full bg-main-light px-2 py-3 text-white">{{ data?.price }} р</div>
				<div class="relative flex gap-3" v-if="CARTS">
					<div class="flex w-full">
						<Btn :disabled="+setCartTotal <= 0" @click="useCart().setCartMinus(data.url)" class="!w-12 bg-main-light">-</Btn>
						<input
							type="text"
							class="md:text-basecursor-default flex w-12 items-center bg-transparent text-center font-semibold outline-none focus:text-black focus:outline-none"
							:value="+setCartTotal"
						/>

						<Btn clear @click="useCart().setCartPlus(data.category, data.url)" class="!w-12 bg-main-light">+</Btn>
					</div>
					<Btn v-if="ifCart" main @click="resetCartTotal(data.url)" class="!w-full whitespace-nowrap !px-5">убрать</Btn>
					<Btn v-else main to="/cart" class="!w-full whitespace-nowrap !px-5">в корзину</Btn>
				</div>
			</div>
		</div>
	</div>
</template>
