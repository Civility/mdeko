<script setup>
const props = defineProps({
	data: Object
})
</script>

<template>
	<div class="bg-gradient-to-r from-main from-30% to-main-dark to-100% py-16 text-center">
		<h2 v-if="data?.title" v-text="data?.title" class="mb-10" />
		<div v-if="data?.text" v-html="data?.text" />
	</div>
</template>
