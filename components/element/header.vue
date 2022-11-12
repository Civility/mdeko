<template>
	<header class="header" :class="{ 'h-screen bg-main !fixed': toggleMenu }">
		<nav class="flex md:flex-nowrap flex-wrap justify-between items-center gap-4 container">
			<NuxtLink to="/" class="order-1" exact>
				<img src="/assets/svg/logo.svg" width="200" height="100" alt="logo" />
			</NuxtLink>

			<Menu :menu="menu" v-show="toggleMenu" class="lg:!flex hidden order-2" />

			<div v-if="useMq().mdMinus" class="justify-self-end self-center sm:order-last order-2 mr-left">
				<button @click="useMain().getMenuToggle" class="nav__menu" :class="{ 'nav__menu--active': toggleMenu }">
					<span :class="'nav__menu-icon'" v-for="i in 3" />
				</button>
			</div>

			<div class="flex flex-wrap gap-x-2 gap-y-1 justify-start m-auto order-3">
				<Btn
					v-for="item in contact.phones"
					:key="item.number"
					:to="`tel:${item.number}`"
					class="!grid grid-cols-[40px,_1fr] gap-x-2 !py-0"
				>
					<Svg svg="baseline-local-phone" class="row-span-2" />

					<div class="text-sec-lighter" v-text="item.tel" />
					<span class="block text-sm text-left !leading-none" v-text="`по ${item.city}`" />
				</Btn>
			</div>
		</nav>
	</header>
</template>
<script setup>
import { useMq } from 'vue3-mq'
import { storeToRefs, mapActions } from 'pinia'
import { useMain } from '@/store/main.js'

// const { getMenuToggle } = mapActions(useMain, ['getMenuToggle'])

const { getMenu, getContactData, menu } = useMain()
const { toggleMenu, contact, getMenuToggle } = storeToRefs(useMain())
const { pending: menuWait, data: menuData } = await useLazyAsyncData('menu', () => getMenu())
const { pending: contactWait, data: contactData } = await useLazyAsyncData('contact', () => getContactData())
</script>
<style scoped lang="postcss">
.header {
	@apply sticky top-0 z-50 w-full py-2;
	@apply bg-gradient-to-l from-main-dark  to-sec-dark/80;
	/* @apply before:content-[''] before:absolute before:w-full before:h-full before:inset-0 before:-z-20;
	@apply before:bg-gradient-to-b before:from-main-dark/50 before:to-main/70; */
	@apply border-b border-white;
	@apply transition-all;
	&-show {
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
			@apply absolute top-0 w-full h-1 bg-sec left-0 rounded-xl transition-all;
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
