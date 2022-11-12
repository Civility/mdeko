<template>
	<div class="p-2 rounded">
		<ul class="flex justify-between items-center divide-x p-2">
			<li v-for="item of menu" :key="item.url" @click="useMain().getMenuClosed">
				<NuxtLink
					:to="item.url"
					class="text-2xl md:text-lg lg:text-xl xl:text-2xl px-4 whitespace-nowrap"
					:target="item?.target"
					v-text="item.title"
				/>
			</li>
		</ul>
	</div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
// const { getMenu } = useMain()
const { getMenuClosed } = storeToRefs(useMain())
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
