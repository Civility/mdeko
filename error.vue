<template>
	<div class="error container py-6">
		<h3 v-if="error.statusCode === '404'" class="mb-6">Страница не найдена {{ error.statusCode }}</h3>
		<h3 v-else class="mb-6">Ошибка статус: {{ error.statusCode }}</h3>
		<Btn main @click="handleError" class="!text-red">На Главную</Btn>
	</div>
</template>
<script setup>
defineProps({
	error: Object,
})
const handleError = () => clearError({ redirect: '/' })
</script>
