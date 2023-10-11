<script setup>
const props = defineProps({
	data: Object
})
</script>
<template>
	<NuxtLink :to="`/catalog/${data.slug}`" class="flex flex-col items-center justify-center gap-5">
		<img v-if="data?.icon" :src="IMG() + data.icon" :alt="data?.meta_title ?? data?.title" class="w-40" />
		<h3 v-if="data?.title" class="text-main-light" v-text="data.title" />
	</NuxtLink>
</template>
