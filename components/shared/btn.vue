<template>
	<component :is="component" class="btn" :class="className" :type="type != 'button' ? type : 'button'" :href="href">
		<slot />
	</component>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
	href: {
		type: String,
		default: null,
		required: false,
	},
	type: {
		type: String,
		default: 'button',
	},
	clear: {
		type: Boolean,
	},
	clip: {
		type: Boolean,
	},
})

const className = computed(() => {
	return {
		btn__clear: props.clear,
		btn__clip: props.clip,
	}
})
const component = computed(() => (props.href ? 'a' : 'button'))
</script>

<style scoped lang="postcss">
.btn {
	@apply inline-flex items-center justify-center;
	@apply py-2 lg:py-3 px-2  w-auto;
	@apply rounded;


	@apply text-white;
	@apply text-sm xl:text-lg md:text-base;

	@apply align-middle not-italic;
	@apply transition duration-300;

	@apply focus:ring-0 focus:outline-none;

	@apply disabled:bg-disabled disabled:cursor-not-allowed disabled:shadow-none;
	@apply disabled:isolate disabled:pointer-events-none;
	-webkit-appearance: none;

	&__clear {
		@apply rounded-none;
	}
	&__clip {
		@apply after:absolute after:inset-0 after:content-[''] after:z-10;
	}
}
</style>
