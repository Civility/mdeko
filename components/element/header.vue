<script setup>
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
import { useCart } from '@/store/cart.js'
const { getMenu, MENU } = useMain()
const { cartsLength } = storeToRefs(useCart())
const { toggleMenu } = storeToRefs(useMain())
const { pending: menuWait } = useLazyAsyncData('menu', () => getMenu())
</script>
<template>
	<header
		class="container sticky top-0 z-50 mt-10 bg-gradient-to-r from-sec-dark from-10% to-sec-light to-100% py-2 transition-colors duration-300"
		:class="{ '!fixed  h-full !bg-dark': toggleMenu }"
	>
		<nav class="flex items-center justify-between gap-4" :class="{ 'flex-wrap': toggleMenu }">
			<NuxtLink to="/" class="order-0" exact>
				<img src="/svg/logo.svg" width="200" height="100" alt="logo" />
			</NuxtLink>
			<ClientOnly>
				<Menu
					v-if="!menuWait && MENU.length"
					:menu="MENU"
					v-show="toggleMenu"
					class="order-5 flex h-full w-full flex-col items-center justify-between gap-x-4 gap-y-14 py-[25vh] text-center lg:order-3 lg:!flex lg:w-auto lg:flex-row lg:gap-x-10 lg:py-0"
					:class="{ '!hidden': !toggleMenu }"
				/>
			</ClientOnly>
			<div class="order-4 flex items-center justify-center gap-4 lg:hidden">
				<Btn clear to="/cart" class="relative">
					<Svg svg="sharp-shopping-cart" class="mr-2 text-white group-hover:!text-white" />
					<span
						v-if="cartsLength"
						v-text="cartsLength"
						class="absolute bottom-2 right-0 inline-flex h-4 w-4 items-center justify-center rounded-circle border-2 border-main-lighter bg-sec p-1 text-small shadow"
					/>
				</Btn>
				<button
					@click="useMain().getMenuToggle"
					class="nav__menu relative h-4 w-8 -translate-y-1"
					:class="{ 'nav__menu--active': toggleMenu }"
				>
					<span
						class="nav__menu-icon absolute left-0 top-0 h-1 w-full rounded-xl bg-main transition-all last:bottom-full last:top-full even:top-2/4"
						v-for="i in 3"
					/>
				</button>
			</div>
		</nav>
	</header>
</template>

<style scoped lang="postcss">
.nav__menu--active .nav__menu-icon {
	@apply first:top-3 first:rotate-45;
	@apply last:bottom-auto last:top-3 last:-rotate-45;
	@apply [&:nth-child(2)]:hidden;
}
</style>
