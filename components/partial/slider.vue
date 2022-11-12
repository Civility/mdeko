<template>
	<Swiper :modules="modules" :speed="700">
		<SwiperSlide v-for="(slider, id) of data" :key="id">
			<slot name="content" :slider="slider" />
		</SwiperSlide>
	</Swiper>
</template>
<script setup>
definePageMeta({
	keepalive: true,
})
defineProps({
	data: {
		type: Array,
		required: true,
	},
})
const modules = [SwiperAutoplay, SwiperFreeMode, SwiperNavigation, SwiperPagination, SwiperMousewheel, SwiperThumbs, SwiperEffectFade]
</script>
<style lang="postcss">
.swiper-slide-prev {
	@apply !opacity-0;
}
.secbullets {
	.swiper-pagination-bullet {
		@apply before:border-sec;
		&-active {
			@apply border-sec;
			@apply before:bg-sec;
		}
	}
}
.swiper-pagination {
	@apply flex justify-center items-center w-full my-4 mx-auto;
	&-bullet {
		@apply relative z-10;
		@apply border border-solid rounded-circle border-transparent;
		@apply flex justify-center items-center;
		@apply before:content-[''] before:w-2 before:h-2 before:opacity-60 before:border before:border-solid before:border-main    before:rounded-circle;
		@apply w-4 h-4;
		@apply mx-3;
		@apply cursor-pointer;
		&-active {
			@apply border-sec;
			@apply before:bg-main  before:opacity-100;
		}
	}
}
</style>
