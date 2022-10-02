<template>
	<div class="relative mx-auto w-full rounded overflow-hidden bg-white p-2 group shadow-lg shadow-sec">
		<div class="relative h-80 flex justify-center overflow-hidden rounded">
			<img class="w-full" :src="`/img/categories/${data.img.mini}`" :alt="data.img.alt" />
		</div>
		<div class="absolute inset-0 flex flex-col bg-dark/50 group-hover:bg-dark/0 transition ease-linear delay-150">
			<div class="flex flex-col justify-center items-center h-full w-full">
				<h2 v-text="data.title" class="text-2xl transition-all translate-y-8 group-hover:translate-y-0" />
				<p v-text="data.text" class="opacity-0 transition-all group-hover:opacity-100 mb-0" />
			</div>
			<div class="text-center py-4 hidden group-hover:block">
				<Btn :link="`kategorii/${data.url}`" glue class="!text-xl">Подробнее</Btn>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	data: Object,
})
</script>
