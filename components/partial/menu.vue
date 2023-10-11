<script setup>
// import { useCart } from '@/store/cart.js'
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
// const { cartsLength } = storeToRefs(useCart())
const { getMenuClosed } = storeToRefs(useMain())

defineProps({
	data: {
		type: Array,
		required: true
	}
})
</script>

<template>
	<ul>
		<li v-for="item of data" :key="item.slug" @click="useMain().getMenuClosed">
			<NuxtLink :to="`/${item.slug}`" class="whitespace-nowrap !font-sec text-white hover:text-main" v-text="item.title" />
		</li>
	</ul>
</template>
