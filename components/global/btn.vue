<template>
	<component :is="isComponent" class="btn" :class="isClass" :type="isType" :to="to">
		<slot />
	</component>
</template>

<script setup>
const NuxtLink = resolveComponent('NuxtLink')

const props = defineProps({
	to: {
		type: String,
		default: null,
	},
	main: {
		type: Boolean,
	},
	clear: {
		type: Boolean,
	},
	glue: {
		type: Boolean,
	},
	icon: {
		type: Boolean,
	},
	svg: {
		type: Boolean,
	},
})
const isComponent = computed(() => (props.to ? NuxtLink : 'button'))
const isType = computed(() => (isComponent != 'button' ? null : 'button'))
const isClass = computed(() => {
	return {
		btn__main: props.main,
		btn__clear: props.clear,
		btn__glue: props.glue,
		btn__icon: props.icon,
		btn__svg: props.svg,
	}
})
</script>

<style scoped lang="postcss">
.btn {
	appearance: none;
	@apply inline-flex items-center justify-center;
	@apply py-2 lg:py-3 px-2 w-auto;

	@apply text-white;
	@apply text-sm xl:text-lg md:text-base;
	@apply align-middle not-italic;
	@apply transition-all duration-300;
	@apply !outline-none target:outline-none focus:outline-none focus:ring-0 focus-visible:outline-none active:outline-none;
	@apply disabled:pointer-events-none disabled:isolate disabled:opacity-70;
	-webkit-appearance: none;
	&__main {
		/* @apply border-b-2 border-r-2 border-main-light  hover:border-main-lighter rounded-lg; */
		/* @apply shadow-[3px_3px] shadow-main-light; */
		@apply !no-underline;
		@apply rounded-md !px-10 !py-2;
		@apply bg-gradient-to-tl from-main-light/70 to-sec-light/90 hover:to-main hover:from-sec;
		/* @apply border-main-lighter border-2 rounded-md;	 */
	}
	&__clear {
		@apply rounded-none p-0;
	}
	&__glue {
		@apply after:absolute after:inset-0 after:content-[''] after:z-10;
	}
	&__icon {
		@apply gap-x-1;
	}
	&__svg {
		@apply border-2 !p-1.5 w-min !no-underline hover:border-white;
	}
}
</style>
