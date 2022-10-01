<template>
	<div class="card relative mx-auto w-full rounded overflow-hidden bg-sec group">
		<div class="rounded bg-some p-4 shadow">
			<div class="relative flex h-80 justify-center overflow-hidden rounded-lg">
				<div class="w-full transform transition-transform duration-500 ease-in-out group-hover:mix-blend-normal mix-blend-multiply">
					<!-- <div class="absolute inset-0 bg-black bg-opacity-80"> -->
					<img class="mx-auto" :src="`/img/categories/${data.img.mini}`" :alt="data.img.alt" />
					<!-- </div> -->
				</div>
			</div>
		</div>
		<div class="absolute inset-0 h-full flex justify-center items-center flex-col text-white">
			<h2 v-text="data.title" class="text-2xl" />
			<p v-text="data.text" />
			<div class="px-6">
				<Btn :linl="data.url" glue class="!text-xl !py-2">Подробнее</Btn>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	data: Object,
})
</script>
