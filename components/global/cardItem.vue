<template>
	<div class="relative flex flex-col w-full mx-auto">
		<div class="relative rounded overflow-hidden bg-dark/70 p-8 group shadow-lg flex flex-col">
			<div class="relative w-32 mx-auto p-4 flex justify-center overflow-hidden rounded">
				<img class="w-full" src="/img/item.webp" :alt="data.img.alt" />
			</div>
			<h3 class="py-6 mb-0 text-sec uppercase title-line after:bg-sec before:bg-sec text-center" v-text="data.title" />
			<div class="text-center">
				<Btn svg glue link="#" class="border-sec !w-max">
					<Svg svg="cart" class="mr-2 bg-sec group-hover:!bg-white group-hover:text-sec" />
					<span class="text-sec group-hover:text-white">В корзину</span>
				</Btn>
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
