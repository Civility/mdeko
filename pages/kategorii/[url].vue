<script setup>
// const route = useRoute()
// import { mapActions, storeToRefs } from 'pinia'
// const config = useRuntimeConfig()
// import { useGoods } from '@/store/goods.js'
// const { getTovari } = useGoods()
// const { categoryactive, tovari } = storeToRefs(useGoods())
// const { getCategoryActive } = mapActions(useGoods(), ['getCategoryActive'])
// const {
// 	pending: tovariWait,
// 	data: tovariData,
// 	refresh,
// } = await useLazyAsyncData('tovari', () => getTovari(config.public.PUBLIC_NAME, categoryactive.value))
// watchEffect(() => refresh(categoryactive.value))

const props = defineProps({
	data: Array,
})
</script>

<template>
	<LazyCardItem v-for="item in data" :key="item.url" :data="item" class="sm:col-span-4 col-span-full" />
</template>
	