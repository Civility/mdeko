<template>
	<main>
		<section class="category">
			<div class="category__wrap"></div>
		</section>
		<section class="wrap-full lg:gap-10 container xl:py-14 md:py-10 py-8"></section>
	</main>
</template>

<script setup>
import { storeToRefs, mapActions } from 'pinia'
import { useMainStore } from '@/store/main.js'

const { PHONESPB, PHONEMSK } = useMainStore()
// const { pending: goodsWait, data: goods } = await useLazyAsyncData('goods', () => getGoods())

definePageMeta({
	title: 'Some Page',
})
</script>
<style scoped lang="postcss">
.category {
	@apply relative;
	@apply bg-no-repeat bg-cover bg-scroll bg-center;
	@apply bg-[url('/assets/img/bg.webp')];
	@apply flex justify-center items-center;
	@apply h-[90vh];
	&__wrap {
		@apply bg-black/5;
		@apply border border-solid border-black/25;
		@apply rounded-3xl;

		@apply inline-block relative;
		@apply backdrop-blur;
		@apply w-11/12;
		@apply h-5/6;
	}
}
</style>
