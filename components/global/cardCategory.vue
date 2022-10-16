<template>
	<div class="relative mx-auto lg:w-full w-auto min-w-[300px] rounded overflow-hidden bg-white p-2 group shadow-lg">
		<div class="relative h-96 flex justify-center overflow-hidden rounded">
			<img class="md:w-full h-full" :src="`/img/categories/${data.img.mini}`" :alt="data.img.alt" />
			<!-- <div
				class="w-full h-full bg-fixed bg-origin-border bg-center bg-no-repeat bg-cover"
				:style="`background-image: url(/img/categories/${data.img.mini})`"
			/> -->
		</div>
		<div class="absolute inset-0 p-10 bg-dark/30">
			<div class="lg:group-hover:border-2 lg:group-hover:border-dashed p-4 h-full transition-all relative">
				<Btn
					glue
					:link="`kategorii/${data.url}`"
					class="flex flex-col justify-center items-center !h-full !w-full lg:group-hover:bg-sec-dark py-10 px-4 transition-all !no-underline"
				>
					<h2 v-text="data.title" class="text-2xl lg:translate-y-8 lg:group-hover:translate-y-0 transition-all title-b h-6" />
					<p v-text="data.text" class="lg:opacity-0 lg:group-hover:opacity-100 transition-all h-10" />
					<!-- <Btn
						:link="`kategorii/${data.url}`"
						glue
						class="lg:!hidden group-hover:!flex border-2 border-dashed !rounded-full !p-1.5 !transition-all mt-4"
					>
						<span class="inline-block bg-white py-2 px-3 text-dark rounded-full">Подробнее</span>
					</Btn> -->
				</Btn>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	data: Object,
})
</script>
