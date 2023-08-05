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
	</ul>
</template>
