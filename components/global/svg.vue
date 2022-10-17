<template>
	<i class="border-2 rounded-full w-10 h-10 flex items-center justify-center shadow">
		<!-- <img :src="`/assets/svg/${svg}.svg`" width="24" height="24" :alt="svg" /> -->
		<Icon :name="`mdi:${svg}`" size="24" />
	</i>
</template>
<script setup>
definePageMeta({
	keepalive: true,
})
defineProps({
	svg: String,
})
</script>
