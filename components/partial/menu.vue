<template>
	<ul class="menu">
		<li class="menu__item" v-for="(item, id) of menu" :key="id" @click="getMenuToggle()">
			<NuxtLink :to="item.url" class="menu__link" :target="item?.target">{{ item.title }} </NuxtLink>
		</li>
	</ul>
</template>

<script setup>
import { storeToRefs, mapActions } from 'pinia'
import { useMainStore } from '@/store/main.js'
const { getMenu } = useMainStore()
const { getMenuToggle } = mapActions(useMainStore, ['getMenuToggle'])
// const { toggleMenu } = storeToRefs(useMainStore())

defineProps({
	menu: {
		type: Array,
		required: true,
	},
})
</script>
<style lang="postcss">
.menu {
	@apply flex;
}
</style>
