<script setup>
defineProps({
	svg: String
})
const regName = /[0-9a-z]+$/i
</script>
<template>
	<nuxtIcon :name="svg" filled :class="`svg-${regName.exec(svg)}`" />
</template>
