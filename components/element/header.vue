<script setup>
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
import { useCart } from '@/store/cart.js'

const { getMenu, getContactData, getСontacts, MENU } = useMain()

const { cartsLength } = storeToRefs(useCart())
const { toggleMenu, CONTACT, getMenuToggle } = storeToRefs(useMain())
const { pending: menuWait } = useLazyAsyncData('menu', () => getMenu())
const { pending: contactWait } = useLazyAsyncData('contact', () => getContactData())
await useAsyncData('contacts', async () => getСontacts())
const togglePhones = ref(true)
const isOpenPhones = () => (togglePhones.value = !togglePhones.value)
</script>
<template>
	<!--sticky bg-gradient-to-l from-main-dark to-sec-dark/80 -->
	<header
		class="fixed top-0 z-50 w-full py-2 border-b bg-dark/70 border-white duration-300 transition-colors"
		:class="{ 'h-full  !fixed !bg-dark': toggleMenu }"
	>
		<nav class="flex justify-between items-center gap-4 container" :class="{ 'flex-wrap': toggleMenu }">
			<!-- <div class="w-2/5 order-1"> -->
			<div class="order-1 flex gap-4 flex-wrap">
				<Btn
					v-for="(item, id) in CONTACT.phones"
					:key="id"
					v-if="!contactWait"
					:to="`tel:${item.number}`"
					clear
					class="!flex-col whitespace-nowrap hover:no-underline"
				>
					<span class="block text-xs !leading-none lg:text-gray text-gray self-start">{{ item.city }}</span>
					<div class="text-sm lg:text-gray !text-md hover:text-gray/70">{{ item.tel }}</div></Btn
				>
			</div>
			<!-- </div> -->
			<NuxtLink to="/" class="order-0" exact>
				<img src="/svg/logo.svg" width="200" height="100" alt="logo" />
			</NuxtLink>
			<ClientOnly>
				<Menu
					:menu="MENU"
					v-show="toggleMenu"
					class="lg:!flex flex justify-between items-center gap-x-4 gap-y-14 flex-col lg:flex-row lg:order-3 order-5 lg:text-sm text-3xl text-center w-full lg:w-auto h-full py-[25vh] lg:py-0"
					:class="{ '!hidden': !toggleMenu }"
				/>
			</ClientOnly>
			<div class="flex justify-center items-center gap-4 order-4 lg:hidden">
				<Btn clear to="/cart" class="relative">
					<Svg svg="sharp-shopping-cart" class="mr-2 text-white group-hover:!text-white" />
					<span
						v-if="cartsLength"
						v-text="cartsLength"
						class="absolute right-0 bottom-2 text-small shadow p-1 rounded-circle border-2 border-main-lighter bg-some w-4 h-4 inline-flex justify-center items-center"
					/>
				</Btn>
				<button
					@click="useMain().getMenuToggle"
					class="nav__menu -translate-y-1 w-8 h-4 relative"
					:class="{ 'nav__menu--active': toggleMenu }"
				>
					<span
						class="nav__menu-icon absolute top-0 w-full h-1 bg-main left-0 rounded-xl transition-all even:top-2/4 last:bottom-full last:top-full"
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
	@apply last:top-3 last:bottom-auto last:-rotate-45;
	@apply [&:nth-child(2)]:hidden;
}
</style>
