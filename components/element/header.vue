<template>
	<header>
		<nav class="nav">
			<div class="flex sm:flex-row flex-col sm:justify-between container sm:items-center">
				<a href="/" class="mr-6 my-2">
					<img src="/assets/svg/logo.svg" height="48" width="48" alt="logo" />
				</a>
				<div class="m-2">
					<Btn class="!p-0">
						<i class="border border-main-lighter rounded-full p-2 mr-3">
							<img src="/assets/svg/call.svg" width="24" height="24" alt="phone"
						/></i>
						<span class="block">
							<a class="text-neon text-xl" :href="`tel:${phone1.replace(/\s/g, '')}`">{{ phone1 }}</a>
							<span class="block font-neon text-shadow text-md">Звоните круглосуточно</span>
						</span>
					</Btn>
				</div>
				<!-- <img src="@/assets/svgcall.svg" width="16" height="16" alt="phone" class="mr-2" /> -->
				<div class="ml-6 my-2">
					<span class="text-neon font-neon xxl:text-xxl md:text-lg"> Круглосуточно 24/7 </span>
					<!-- <button @click="istoggleMenu = !istoggleMenu" class="nav__menu" :class="{ 'nav__menu--active': istoggleMenu }">
					<span :class="'nav__menu-icon'" v-for="i in 3" />
				</button> -->
				</div>
			</div>
		</nav>
	</header>
</template>
<script setup>
import { storeToRefs, mapActions } from 'pinia'
import { useMainStore } from '@/store/main.js'
const { phone3, phone2, phone1 } = useMainStore()
</script>
<style scoped lang="postcss">
.nav {
	@apply sticky top-0 z-30 w-full;
	@apply py-2;
	@apply bg-black/30;
	@apply border-b border-main-dark;
	@apply before:content-[''] before:absolute before:w-full before:h-full before:inset-0 before:-z-20;
	@apply before:bg-gradient-to-b before:from-some-dark/50 before:to-some/70;

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
