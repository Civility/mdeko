<template>
	<main>
		<section class="category">
			<div class="wrap-full container md:py-15 py-10">
				<CardCategory v-for="item in category" :data="item" :key="item.url" class="col-span-3" />
			</div>
		</section>
		<section class="wrap-full lg:gap-10 container xl:py-14 md:py-10 py-8"></section>
		<div class="absolute inset-0 w-full h-full -z-10">
			<div class="parallax">
				<div class="parallax__mask" />
			</div>
		</div>
	</main>
</template>
<script setup>
// import { useMq } from 'vue3-mq'
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/store/category.js'

const { getCategory, category } = useCategoryStore()

const { pending: categoryWait, data: categoryData } = await useLazyAsyncData('category', () => getCategory())
</script>
<style scoped lang="postcss">
.parallax {
	@apply relative;
	@apply bg-no-repeat bg-cover bg-scroll bg-center;
	@apply bg-[url('/assets/img/bg.webp')];
	@apply flex justify-center items-center;
	@apply bg-fixed;
	@apply h-screen;

	&__mask {
		@apply bg-black/5;
		@apply border border-solid border-white/25;
		@apply rounded-3xl;

		@apply inline-block relative;
		@apply backdrop-blur-sm;
		@apply w-11/12;
		@apply h-5/6;
	}
}
</style>
