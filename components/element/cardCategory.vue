<template>
	<div class="relative mx-auto lg:w-full w-auto min-w-[300px] rounded overflow-hidden group shadow-lg">
		<div class="relative h-96 flex justify-center overflow-hidden rounded">
			<img class="md:w-full h-full" :src="data.img.mini" :alt="data.img.alt" />
		</div>

		<div class="absolute inset-0 p-6 bg-dark/30">
			<div
				class="
					flex flex-col
					justify-center
					items-center
					h-full
					w-full
					group-hover:bg-gradient-to-l
					from-main/70
					to-main-dark/90
					p-6
					transition-all
				"
			>
				<!-- $route.params.slug -->

				<h2 v-text="data.name" class="text-2xl lg:translate-y-8 lg:group-hover:translate-y-0 transition-all h-6 mb-auto title-b" />
				<p v-text="data.text" class="lg:opacity-0 lg:group-hover:opacity-100 transition-all mb-4" />
				<Btn
					glue
					:to="`/kategorii/${data.url}`"
					class="lg:opacity-0 lg:group-hover:opacity-100"
					@click="useGoods().getCategoryActive(data.url)"
				>
					Подробнее
				</Btn>
			</div>
		</div>
	</div>
</template>

<script setup>
import { storeToRefs, mapActions } from 'pinia'
import { useGoods } from '@/store/goods.js'
const props = defineProps({
	data: Object,
})

const { getCategoryActive } = mapActions(useGoods(), ['getCategoryActive'])
</script>
