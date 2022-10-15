<template>
	<ul class="flex justify-between items-center divide-x">
		<li v-for="item of menu" :key="item.url" @click="getMenuToggle()">
			<NuxtLink
				:to="item.url"
				class="text-2xl md:text-lg lg:text-xl xl:text-2xl px-4 whitespace-nowrap"
				:target="item?.target"
				v-text="item.title"
			/>
		</li>
	</ul>
</template>
<script setup>
import { mapActions } from 'pinia'
import { useMain } from '@/store/main.js'
// const { getMenu } = useMain()
const { getMenuToggle } = mapActions(useMain, ['getMenuToggle'])
definePageMeta({
	keepalive: true,
})
defineProps({
	menu: {
		type: Array,
		required: true,
	},
})
</script>
