<script setup>
const props = defineProps({
	data: Object,
	more: Boolean
})
</script>
<template>
	<div class="flex flex-col">
		<NuxtLink :to="`/kategorii/${data.category}/${data.url}`" class="flex flex-col items-center justify-center gap-10 py-5">
			<div class="flex h-96 w-full justify-center">
				<img v-if="data?.img?.mini" :src="data.img.mini" :alt="data.img?.alt" class="object-fill" />
			</div>
			<span v-if="data?.title" class="grow text-center text-white" v-text="data.title" />
		</NuxtLink>
		<Btn v-if="more" main :to="`/kategorii/${data.category}/${data.url}`" class="mt-auto">Подробнее</Btn>
	</div>
</template>
