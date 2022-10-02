<template>
	<div class="relative group">
		<div class="h-80 w-full -z-10 flex overflow-hidden">
			<img :src="`/img/banners/${data.img.mini}`" :alt="data.img.alt" class="w-full" />
		</div>
		<div class="absolute inset-0 bg-fixed w-full h-full overflow-hidden bg-dark/30">
			<div class="container wrap w-full h-full">
				<div
					class="md:col-span-5 col-span-full relative flex flex-col justify-center w-full h-full px-4 bg-dark/70"
					:class="({ 'md:col-start-2': center }, { 'md:col-start-4': right })"
				>
					<h3 v-text="data.title" class="!mb-12 md:text-4xl capitalize" />
					<div v-html="data.text" />
					<Btn glue :link="`kategorii/${data.url}`" class="!justify-start !px-0">Подробнее</Btn>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	data: Object,
	right: Boolean,
	center: Boolean,
})
</script>
