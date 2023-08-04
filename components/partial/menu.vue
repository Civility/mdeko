<script setup>
// import { useCart } from '@/store/cart.js'
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
// const { cartsLength } = storeToRefs(useCart())
const { getMenuClosed } = storeToRefs(useMain())

defineProps({
	menu: {
		type: Array,
		required: true
	}
})
</script>

<template>
	<ul>
		<li v-for="item of menu" :key="item.url" @click="useMain().getMenuClosed">
			<NuxtLink
				:to="`/${item.url}`"
				class="whitespace-nowrap !font-sec text-white hover:text-main"
				:target="item?.target"
				v-text="item.title"
			/>
		</li>
		<!-- <li class="hidden lg:block">
			<Btn clear to="/cart" class="relative">
				<Svg svg="sharp-shopping-cart" class="mr-2 text-white group-hover:!text-white" />
				<span
					v-if="cartsLength"
					v-text="cartsLength"
					class="absolute bottom-2 right-0 inline-flex h-4 w-4 items-center justify-center rounded-circle border-2 border-main-lighter bg-sec p-1 text-small shadow"
				/>
			</Btn>
		</li> -->
	</ul>
</template>
