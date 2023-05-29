<script setup>
import { mapActions, storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'
const route = useRoute()

const { getTovari } = useGoods()
const { CATEGORYACTIVE, getCategoryActive, TOVARI } = storeToRefs(useGoods())

watchEffect(() => getTovari(CATEGORYACTIVE.value))
</script>

<template>
	<CardItem v-for="item in TOVARI" :key="item.url" :data="item" class="sm:col-span-4 col-span-full" />
</template>
	