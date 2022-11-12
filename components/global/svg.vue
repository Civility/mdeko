<template>
	<!-- <i class="border-b-2 border-r-2 w-10 border-white h-10 flex items-center justify-center shadow-[3px_3px]"> -->
	<Icon :name="`ic:${svg}`" size="24" />
	<!-- </i> -->
</template>
<script setup>
definePageMeta({
	keepalive: true,
})
defineProps({
	svg: String,
})
</script>
