<template>
	<div class="relative group wrap">
		<!-- <div class="w-full -z-10 flex overflow-hidden bg-fixed"> -->
		<div class="bg row-span-full col-span-full bg-dark/30">
			<!-- <img :src="`/img/banners/${data.img.bg}`" :alt="data.img.alt" class="w-full h-full" /> -->
		</div>
		<div class="container info row-span-full col-span-full wrap">
			<div
				class="md:col-span-5 col-span-full bg-gradient-to-tl from-main-darker/70 to-sec/90 wrap"
				:class="({ 'md:col-start-2': center }, { 'md:col-start-5': right })"
			>
				<div class="info w-full py-10 px-5 flex flex-col col-span-5 lg:col-span-4">
					<!-- <div class="border-2 border-main-lighter mb-auto p-4 rounded"> -->
					<!-- <div class="bg-gradient-to-tl from-main-darker to-sec  rounded">. -->
					<div class="py-10 px-4">
						<h3 v-text="data.title" class="!mb-12 md:text-4xl capitalize title-b w-min" />
						<div v-html="data.text" class="text-gray ml-6 lg:ml-12" />
					</div>
					<!-- </div> -->
					<Btn main :link="`kategorii/${data.url}`" class="!p-1.5 !w-min !mt-4">Подробнее</Btn>
				</div>
				<div class="col-span-3 place-self-center">
					<img :src="`/img/${data.img.mini}`" :alt="data.img.alt" class="py-10 px-5" />
				</div>
			</div>
		</div>
		<!-- <div class="absolute inset-0 w-full h-full overflow-hidden bg-dark/30"> -->
		<!-- <div class="container wrap h-full"> -->
		<!-- <div class="col-span-5 px-10 py-20 bg-dark/70 wrap">
					<div class="col-span-5">
						<h3 v-text="data.title" class="!mb-12 md:text-4xl capitalize" />
						<div v-html="data.text" />
						<Btn :link="`kategorii/${data.url}`" class="!justify-start !px-0">Подробнее</Btn>
					</div>
					<div class="col-span-3 inline-flex">
						<img :src="`${data.img.mini}`" :alt="data.img.alt" class=" " />
					</div>
				</div> -->
		<!-- <div
					class="md:col-span-5 col-span-full relative flex justify-start w-full h-full px-4 py-6 bg-dark/70"
					:class="({ 'md:col-start-2': center }, { 'md:col-start-5': right })"
				> -->
		<!-- </div> -->
		<!-- </div> -->
	</div>
</template>

<script setup>
const props = defineProps({
	data: Object,
	right: Boolean,
	center: Boolean,
})
</script>
