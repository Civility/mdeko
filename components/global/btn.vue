<template>
	<component :is="isComponent" class="btn" :class="isClass" :type="isType" :to="to">
		<slot />
	</component>
</template>

<script setup>
const NuxtTO = resolveComponent('NuxtLink')

const props = defineProps({
	to: {
		type: String,
		default: null
	},
	main: {
		type: Boolean
	},
	clear: {
		type: Boolean
	},
	glue: {
		type: Boolean
	},
	icon: {
		type: Boolean
	},
	svg: {
		type: Boolean
	}
})
const isComponent = computed(() => (props.to ? NuxtTO : 'button'))
const isType = computed(() => (isComponent != 'button' ? null : 'button'))
const isClass = computed(() => {
	return {
		btn__main: props.main,
		btn__clear: props.clear,
		btn__glue: props.glue,
		btn__icon: props.icon,
		btn__svg: props.svg
	}
})
</script>

<style scoped lang="postcss">
.btn {
	appearance: none;
	@apply flex items-center justify-center;
	@apply w-auto px-2 py-2 lg:py-3;

	@apply text-white;

	@apply align-middle not-italic;
	@apply transition-all duration-300;
	@apply !outline-none target:outline-none focus:outline-none focus:ring-0 focus-visible:outline-none active:outline-none;

	@apply disabled:pointer-events-none disabled:isolate disabled:opacity-70;
	-webkit-appearance: none;
	&__main {
		@apply hover:no-underline;
		@apply px-10 py-2;
		@apply bg-main-light hover:opacity-70;
	}
	&__clear {
		@apply rounded-none p-0;
	}
	&__glue {
		@apply after:absolute after:inset-0 after:z-10 after:content-[''];
	}
	&__icon {
		@apply gap-x-1;
	}
	&__svg {
		@apply w-min   !p-1.5 !no-underline;
	}
}
</style>
