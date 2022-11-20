<script setup>
const props = defineProps({
	data: Object,
	right: Boolean,
	center: Boolean,
})
</script>

<template>
	<div class="relative group wrap">
		<div
			class="row-span-full col-span-full -z-10 mix-blend-overlay bg-dark/30 bg-local bg-center bg-no-repeat bg-cover"
			:style="`background-image: url(/img/pattern/${data.img.bg})`"
		/>

		<div class="container row-span-full col-span-full wrap">
			<div
				class="lg:col-span-5 col-span-full bg-gradient-to-tl from-main-darker/70 to-sec/90 wrap"
				:class="({ 'lg:col-start-2': center }, { 'lg:col-start-4': right })"
			>
				<div class="w-full py-10 px-5 flex flex-col col-span-5">
					<div class="py-10 px-4">
						<h3 v-text="data.title" class="!mb-12 md:text-4xl capitalize title-b w-min" />
						<div v-html="data.text" class="text-gray md:ml-6 lg:ml-10" />
					</div>
					<Btn main :to="`kategorii/${data.url}`" class="!p-1.5 !w-min !mt-4">Подробнее</Btn>
				</div>
				<div class="col-span-3 place-self-center">
					<img :src="`/img/${data.img.mini}`" :alt="data.img.alt" class="py-10 px-5" />
				</div>
			</div>
		</div>
	</div>
</template>
