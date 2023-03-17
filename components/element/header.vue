<script setup>
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
const config = useRuntimeConfig()
const { getMenu, getContactData, menu } = useMain()
const { toggleMenu, contact, getMenuToggle } = storeToRefs(useMain())
const { pending: menuWait, data: menuData } = await useLazyAsyncData('menu', () => getMenu(config.public.PUBLIC_NAME))
const { pending: contactWait, data: contactData } = await useLazyAsyncData('contact', () => getContactData())
const togglePhones = ref(true)
const isOpenPhones = () => (togglePhones.value = !togglePhones.value)
</script>
<template>
	<header
		class="sticky top-0 z-50 w-full py-2 bg-gradient-to-l from-main-dark to-sec-dark/80 border-b border-white transition-all"
		:class="{ 'h-screen bg-main !fixed': toggleMenu }"
	>
		<nav class="flex flex-wrap justify-between items-center gap-4 container">
			<NuxtLink to="/" class="order-1" exact>
				<img src="/svg/logo.svg" width="200" height="100" alt="logo" />
			</NuxtLink>
			<ClientOnly>
				<Menu :menu="menu" v-show="toggleMenu" class="lg:!flex hidden order-2" />
			</ClientOnly>

			<div class="sm:order-last order-2 mr-left">
				<button
					@click="useMain().getMenuToggle"
					class="nav__menu -translate-y-2 w-8 h-4 relative lg:hidden block"
					:class="{ 'nav__menu--active': toggleMenu }"
				>
					<span
						class="nav__menu-icon absolute top-0 w-full h-1 bg-sec left-0 rounded-xl transition-all even:top-2/4 last:bottom-full last:top-full"
						v-for="i in 3"
					/>
				</button>
				<Svg svg="sharp-shopping-cart" class="mr-2 text-dark group-hover:!text-white" />
			</div>

			<div class="order-3 w-auto relative" @mouseover="togglePhones = false" @mouseleave="togglePhones = true">
				<Btn class="!bg-white/50"> <Svg svg="baseline-local-phone" /><Svg svg="baseline-keyboard-arrow-down" size="32" /> </Btn>
				<div class="bg-white shadow-lg absolute -translate-x-24" :class="{ hidden: togglePhones }">
					<Btn v-for="item in contact.phones" :key="item.number" :to="`tel:${item.number}`" class="!flex-col min-w-max">
						<div class="text-sec-lighter !text-md" v-text="item.tel" />
						<span class="block text-sm !leading-none text-main-lighter" v-text="`по ${item.city}`" />
					</Btn>
				</div>
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
