<template>
	<ul class="menu">
		<li class="menu__item" v-for="item of menu" :key="item.url" @click="getMenuToggle()">
			<NuxtLink :to="item.url" class="menu__link" :target="item?.target" v-text="item.title" />
		</li>
	</ul>
</template>

<script setup>
import { mapActions } from 'pinia'
import { useMain } from '@/store/main.js'
const { getMenu } = useMain()
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
<style lang="postcss">
.menu {
	@apply flex justify-between items-center gap-4;
	&__link {
		@apply text-2xl md:text-lg lg:text-xl xl:text-2xl;
		@apply whitespace-nowrap;
	}
}
</style>
