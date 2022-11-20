<script setup>
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
const { getMenu, getContactData, menu } = useMain()
const { toggleMenu, contact, getMenuToggle } = storeToRefs(useMain())
const { pending: menuWait, data: menuData } = await useLazyAsyncData('menu', () => getMenu())
const { pending: contactWait, data: contactData } = await useLazyAsyncData('contact', () => getContactData())
</script>
<template>
	<header
		class="sticky top-0 z-50 w-full py-2 bg-gradient-to-l from-main-dark to-sec-dark/80 border-b border-white transition-all"
		:class="{ 'h-screen bg-main !fixed': toggleMenu }"
	>
		<nav class="flex md:flex-nowrap flex-wrap justify-between items-center gap-4 container">
			<NuxtLink to="/" class="order-1" exact>
				<img src="/svg/logo.svg" width="200" height="100" alt="logo" />
			</NuxtLink>

			<Menu :menu="menu" v-show="toggleMenu" class="lg:!flex hidden order-2" />

			<div class="justify-self-end self-center sm:order-last order-2 mr-left">
				<button
					@click="useMain().getMenuToggle"
					class="nav__menu -translate-y-2 w-8 h-4 relative"
					:class="{ 'nav__menu--active': toggleMenu }"
				>
					<span
						class="nav__menu-icon absolute top-0 w-full h-1 bg-sec left-0 rounded-xl transition-all even:top-2/4 last:bottom-full last:top-full"
						v-for="i in 3"
					/>
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

<style scoped lang="postcss">
.nav__menu--active .nav__menu-icon {
	@apply first:top-3 first:rotate-45;
	@apply last:top-3 last:bottom-auto last:-rotate-45;
	@apply [&:nth-child(2)]:hidden;
}
</style>
