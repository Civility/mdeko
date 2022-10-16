<template>
	<div class="relative flex flex-col w-full mx-auto">
		<div class="relative rounded overflow-hidden bg-sec p-2 group shadow-lg">
			<h3 class="py-6 mb-0 border-b border-dark text-white text-center uppercase" v-text="data.title" />

			<div class="relative w-32 mx-auto p-4 flex justify-center overflow-hidden rounded">
				<img class="w-full" src="/img/item.webp" :alt="data.img.alt" />
			</div>

			<div class="flex flex-col gap-3 py-3 text-gray-600 w-full">
				<Btn main glue>В корзину</Btn>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	data: Object,
})

// const href = shallowRef()
const isHref = computed(() => `kategorii/${props.data.category}/${props.data.url}`)
</script>
