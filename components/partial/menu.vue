<script setup>
import { useCart } from '@/store/cart.js'
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
const { cartsLength } = storeToRefs(useCart())
const { getMenuClosed } = storeToRefs(useMain())

defineProps({
	menu: {
		type: Array,
		required: true,
	},
})
</script>


<template>
	<ul class="">
		<li v-for="item of menu" :key="item.url" @click="useMain().getMenuClosed">
			<NuxtLink
				:to="`/${item.url}`"
				class="whitespace-nowrap text-white hover:text-main-lighter"
				:target="item?.target"
				v-text="item.title"
			/>
		</li>
		<li class="lg:block hidden">
			<Btn clear to="/cart" class="relative">
				<Svg svg="sharp-shopping-cart" class="mr-2 text-white group-hover:!text-white" />
				<span
					v-if="cartsLength"
					v-text="cartsLength"
					class="absolute right-0 bottom-2 text-small shadow p-1 rounded-circle border-2 border-main-lighter bg-some w-4 h-4 inline-flex justify-center items-center"
				/>
			</Btn>
		</li>
	</ul>
</template>
