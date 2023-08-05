<script setup>
defineProps({
	data: Object
})
</script>

<template>
	<div>
		<h2 v-if="data?.title" v-text="data?.title" class="mb-10" />
		<div v-if="data?.text" v-html="data?.text" />
	</div>
</template>
