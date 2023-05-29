<script setup>
import { storeToRefs, mapActions } from 'pinia'
import { useGoods } from '@/store/goods.js'
const { getCategoryActive } = storeToRefs(useGoods())

const props = defineProps({
	data: Object,
})
</script>
<template>
	<!-- hover:rotateY-180  -->
	<div class="flex flex-col justify-center items-center group">
		<div class="relative flex justify-center overflow-hidden w-full h-full bg-main">
			<img :src="data.img.mini" :alt="data.img.alt" class="w-full h-full group-hover:scale-110 transition duration-700 bg-main-lighter" />
		</div>
		<!-- group-hover:rotateY-180 -->
		<Btn
			glue
			:to="`/kategorii/${data.url}`"
			@click="useGoods().getCategoryActive(data.url)"
			class="absolute inset-0 flex justify-center items-center px-2 py-4 !text-xl lg:!text-base"
		>
			{{ data.name }}
		</Btn>
	</div>
</template>

