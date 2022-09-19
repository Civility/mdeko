<template>
	<ul class="menu">
		<li class="menu__item" v-for="item of menu" :key="item.url" @click="getMenuToggle()">
			<NuxtLink :to="item.url" class="menu__link" :target="item?.target" v-text="item.title" />
		</li>
	</ul>
</template>

<script setup>
import { mapActions } from 'pinia'
import { useMainStore } from '@/store/main.js'
const { getMenu } = useMainStore()
const { getMenuToggle } = mapActions(useMainStore, ['getMenuToggle'])
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
<style lang="postcss">
.menu {
	@apply flex justify-between items-center gap-2;
	&__link {
		@apply xl:text-lg;
	}
}
</style>
