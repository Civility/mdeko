<template>
	<component :is="isComponent" class="btn" :class="isClass" :type="isType" :to="link">
		<span v-if="main" class="inline-block bg-white hover:!bg-main-lighter py-2 px-3 text-dark rounded-full"><slot /></span>
		<slot v-else />
	</component>
</template>

<script setup>
const NuxtLink = resolveComponent('NuxtLink')
definePageMeta({
	keepalive: true,
})
const props = defineProps({
	link: {
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
const isComponent = computed(() => (props.link ? NuxtLink : 'button'))
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
	@apply inline-flex items-center justify-center;
	@apply py-2 lg:py-3 px-2 w-auto;
	@apply rounded;
	@apply text-white;
	@apply text-sm xl:text-lg md:text-base;
	@apply align-middle not-italic;
	@apply transition-all duration-300;
	@apply focus:ring-0 focus:outline-none;
	@apply disabled:isolate disabled:pointer-events-none;
	-webkit-appearance: none;
	&__main {
		@apply border-2 border-dashed !p-1.5 !w-min !rounded-full !no-underline hover:border-main-lighter;
	}
	&__clear {
		@apply rounded-none;
	}
	&__glue {
		@apply after:absolute after:inset-0 after:content-[''] after:z-10;
	}
	&__icon {
		@apply gap-x-1;
	}
	&__svg {
		@apply border-2 border-dashed !p-1.5  w-min !rounded-full !no-underline hover:border-white;
	}
}
</style>
