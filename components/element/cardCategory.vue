<script setup>
const props = defineProps({
	data: Object
})
</script>
<template>
	<NuxtLink :to="`/kategorii/${data.url}`" class="flex flex-col items-center justify-center gap-5">
		<img v-if="data?.img?.mini" :src="data.img.mini" :alt="data.img?.alt" class="w-40" />
		<h3 v-if="data?.name" class="text-main-light" v-text="data.name" />
	</NuxtLink>
</template>
