<script setup>
import { mapActions, storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'
const route = useRoute()
const config = useRuntimeConfig()
const { getTovari } = useGoods()
const { categoryactive, tovari } = storeToRefs(useGoods())
const { getCategoryActive } = mapActions(useGoods(), ['getCategoryActive'])
// const {
// 	pending: tovariWait,
// 	data: tovariData,
// 	refresh,
// } = await useLazyAsyncData('tovari', () => getTovari(config.public.PUBLIC_NAME, categoryactive.value))

watchEffect(() => getTovari(config.public.PUBLIC_NAME, categoryactive.value))
</script>

<template>
	<LazyCardItem v-for="item in tovari" :key="item.url" :data="item" class="sm:col-span-4 col-span-full" />
</template>
	