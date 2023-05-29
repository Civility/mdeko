<script setup>
const props = defineProps({
	data: Object,
	right: Boolean,
	center: Boolean,
})
</script>

<template>
	<div class="relative group wrap gap-0 bg-main-darker">
		<div class="col-span-4 p-3 max-h-screen min-h-full overflow-hidden">
			<img :src="`${data.img.bg}`" :alt="data.img.alt" class="w-full h-full" />
		</div>
		<div class="col-span-4 flex flex-col justify-center items-center">
			<div class="m-12 lg:m-0 w-3/4">
				<h3 v-text="data.title" class="text-4xl" />
				<div v-html="data.text" class="uppercase" />
				<Btn main :to="data.url" class="!p-1.5 !w-min !mt-4">Подробнее</Btn>
			</div>
		</div>
	</div>
</template>
