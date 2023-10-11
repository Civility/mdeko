<script setup>
const props = defineProps({
	data: Object,
	more: Boolean
})
</script>
<template>
	<div class="flex flex-col" v-if="data">
		<NuxtLink
			:to="`/catalog/${data?.category_slug}/${data?.slug}`"
			class="flex h-full flex-col items-center justify-center gap-10 py-5"
		>
			<div class="flex h-full w-full items-center justify-center">
				<img v-if="data?.img" :src="IMG() + data.img" :alt="data?.meta_title ?? data?.title" class="h-60 lg:h-auto" />
				<!-- <Icon v-else svg="logo" filled class="text-9xl" /> -->
				<img v-else src="/logo.svg" alt="logo" width="200" height="100" class="w-2/3" />
			</div>
			<span v-if="data?.title" class="mt-auto h-24 grow text-center text-white" v-text="data.title" />
		</NuxtLink>
		<Btn v-if="more" main :to="`/catalog/${data?.category_slug}/${data?.slug}`" class="mx-auto mt-auto !w-full">Подробнее</Btn>
	</div>
</template>
