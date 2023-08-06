<script setup>
defineProps({
	svg: String
})
const regName = /[0-9a-z]+$/i
</script>
<template>
	<!-- filled -->
	<nuxtIcon :name="svg" :class="`svg-${regName.exec(svg)}`" />
</template>
<style lang="postcss">
.nuxt-icon svg {
	@apply !mb-0;
}
</style>
