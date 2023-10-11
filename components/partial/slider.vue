<script setup>
defineProps({
	data: {
		type: Array,
		required: true
	}
})
const modules = [SwiperAutoplay, SwiperFreeMode, SwiperNavigation, SwiperPagination, SwiperMousewheel, SwiperThumbs, SwiperEffectFade]
</script>
<template>
	<Swiper :modules="modules" :speed="700">
		<SwiperSlide v-for="(slider, id) of data" :key="id">
			<slot name="content" :slider="slider" />
		</SwiperSlide>
	</Swiper>
</template>

<style lang="postcss">
.swiper-slide-prev {
	@apply !opacity-0;
}
.secbullets {
	.swiper-pagination-bullet {
		@apply before:border-gray;
		&-active {
			@apply border-gray;
			@apply before:bg-gray;
		}
	}
}
.swiper-pagination {
	@apply mx-auto my-4 flex w-full items-center justify-center;
	&-bullet {
		@apply relative z-10;
		@apply rounded-circle border border-solid border-transparent;
		@apply flex items-center justify-center;
		@apply before:h-2 before:w-2 before:rounded-circle before:border before:border-solid before:border-main before:opacity-60 before:content-[''];
		@apply h-4 w-4;
		@apply mx-3;
		@apply cursor-pointer;
		&-active {
			@apply border-gray bg-main-lighter;
			@apply before:bg-main  before:opacity-100;
		}
	}
}
</style>
