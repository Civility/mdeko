<template>
	<header class="header">
		<div class="header__wrap container">
			<NuxtLink href="/" class="header__logo logo">
				<img src="/assets/svg/logo.svg" height="300" width="102" alt="logo" class="w-full" />
			</NuxtLink>
			<Menu :menu="menu" />

			<div class="flex flex-wrap gap-4">
				<Btn class="phone !p-0 !text-white">
					<img src="/assets/svg/call.svg" width="24" height="24" alt="phone" />
					<a class="text-xl" :href="`tel:${phonespb}`">{{ phonespb }}</a>
					<span class="block text-md">СПб</span>
				</Btn>
				<Btn class="phone !p-0 !text-white">
					<img src="/assets/svg/call.svg" width="24" height="24" alt="phone" />
					<a class="text-xl" :href="`tel:${phonemsk}`">{{ phonemsk }}</a>
					<span class="block text-md">МСК</span>
				</Btn>
			</div>

			<div v-if="useMq().mdMinus">
				<button @click="getMenuToggle()" class="nav__menu" :class="{ 'nav__menu--active': toggleMenu }">
					<span :class="'nav__menu-icon'" v-for="i in 3" />
				</button>
			</div>
		</div>
	</header>
</template>
<script setup>
import { useMq } from 'vue3-mq'
import { storeToRefs, mapActions } from 'pinia'
import { useMain } from '@/store/main.js'

const { getMenu, menu, phonespb, phonemsk } = useMain()
const { getMenuToggle } = mapActions(useMain, ['getMenuToggle'])
const { toggleMenu } = storeToRefs(useMain())
const { pending: menuWait, data: menuData } = await useLazyAsyncData('menu', () => getMenu())
</script>
<style scoped lang="postcss">
.header {
	@apply sticky top-0 z-30 w-full;
	@apply py-2;
	@apply bg-some/30;
	@apply text-white;
	@apply border-b border-main-dark;
	@apply before:content-[''] before:absolute before:w-full before:h-full before:inset-0 before:-z-20;
	@apply before:bg-gradient-to-b before:from-some-dark/50 before:to-some/70;
	&__wrap {
		@apply flex justify-between items-center gap-4  xl:gap-8;
	}
}

.nav {
	&__menu {
		@apply -translate-y-2;
		@apply w-8 h-4 relative;
		&-icon {
			@apply absolute top-0 w-full h-1 bg-main left-0 rounded-xl transition-all;
			@apply even:top-2/4;
			@apply last:bottom-full;
			@apply last:top-full;
		}
	}
}
.nav__menu--active {
	& .nav__menu-icon {
		&:first-child {
			@apply top-3 rotate-45;
		}
		&:nth-child(2) {
			@apply hidden;
		}
		&:last-child {
			@apply top-3 bottom-auto -rotate-45;
		}
	}
}
</style>
