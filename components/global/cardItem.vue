<template>
	<div class="relative flex flex-col w-full mx-auto">
		<div
			class="
				relative
				rounded
				overflow-hidden
				bg-gradient-to-r
				even:from-main-dark/70
				from-main-light/50
				odd:to-main-light/50
				70
				group
				shadow-lg
				flex flex-col
				py-8
				h-full
			"
		>
			<div class="relative w-32 p-8 mx-auto flex justify-center overflow-hidden rounded">
				<img class="w-full" src="/img/item.webp" :alt="data.img.alt" />
			</div>
			<h3
				class="
					my-3
					py-3
					text-dark
					uppercase
					after:bg-dark
					before:bg-dark
					text-center
					box-decoration-clone
					bg-gradient-to-r
					from-main
					to-sec
				"
				v-text="data.title"
			/>
			<div class="text-center mt-auto">
				<Btn svg glue :to="`/${data.category}/${data.url}`" class="border-dark group-hover:!border-white !w-max">
					<Svg svg="sharp-shopping-cart" class="mr-2 text-dark group-hover:!text-white" />
					<span class="text-dark group-hover:text-white">В корзину</span>
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
