<template>
	<header class="header" :class="{ 'header-show': toggleMenu }">
		<nav class="header__wrap container">
			<NuxtLink href="/" class="header__logo logo">
				<img src="/assets/svg/logo.svg" width="200" height="100" alt="logo" />
			</NuxtLink>

			<Menu :menu="menu" v-show="toggleMenu" class="lg:!flex hidden" />
			<div v-if="useMq().mdMinus" class="order-1 justify-self-end self-center">
				<button @click="getMenuToggle()" class="nav__menu" :class="{ 'nav__menu--active': toggleMenu }">
					<span :class="'nav__menu-icon'" v-for="i in 3" />
				</button>
			</div>

			<div class="flex flex-wrap gap-x-4 gap-y-1 justify-end">
				<div icon class="phone relative text-white w-44 flex justify-center items-center" v-for="phone in phones">
					<img src="/assets/svg/call.svg" width="24" height="24" alt="phone" />
					<Btn glue class="md:text-xl !p-1 !leading-none" :link="`tel:${phone.tel}`">{{ phone.number }}</Btn>

					<span class="block md:text-md text-center w-full !leading-none" v-text="phone.city" />
				</div>
			</div>
		</nav>
	</header>
</template>
<script setup>
import { useMq } from 'vue3-mq'
import { storeToRefs, mapActions } from 'pinia'
import { useMain } from '@/store/main.js'

const { getMenu, menu, phones } = useMain()
const { getMenuToggle } = mapActions(useMain, ['getMenuToggle'])
const { toggleMenu } = storeToRefs(useMain())
const { pending: menuWait, data: menuData } = await useLazyAsyncData('menu', () => getMenu())
</script>
<style scoped lang="postcss">
.header {
	@apply sticky top-0 z-50 w-full;
	@apply bg-some/30;
	@apply before:content-[''] before:absolute before:w-full before:h-full before:inset-0 before:-z-20;
	@apply before:bg-gradient-to-b before:from-some-dark/50 before:to-some/70;
	@apply border-b border-white;
	@apply transition-all;
	&__wrap {
		@apply flex justify-between items-center gap-4  xl:gap-8;
	}
	&-show {
		@apply h-screen;

		.menu {
			@apply absolute inset-0 justify-center items-center flex-col;
		}
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
