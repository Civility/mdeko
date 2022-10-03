<template>
	<footer class="footer bg-main-darker">
		<div class="container">
			<div class="wrap">
				<NuxtLink href="/" class="header__logo logo">
					<img src="/assets/svg/logo.svg" width="200" height="100" alt="logo" />
				</NuxtLink>
				<div class="flex flex-wrap gap-x-4 gap-y-1 justify-end">
					<div icon class="phone relative text-white w-44 flex justify-center items-center" v-for="phone in phones">
						<img src="/assets/svg/call.svg" width="24" height="24" alt="phone" />
						<Btn glue class="md:text-xl !p-1 !leading-none" :link="`tel:${phone.tel}`">{{ phone.number }}</Btn>

						<span class="block md:text-md text-center w-full !leading-none" v-text="phone.city" />
					</div>
				</div>
				<div class="footer__copyright">
					<div class="footer__copyright_low" v-text="COPYRIGHT.low" />
					<div class="footer__copyright_inn" v-text="COPYRIGHT.inn" />
				</div>
				<div class="footer__fullyear" v-text="FULLYEAR" />
				<div class="footer__socials relative">
					<template v-for="social in SOCIALS">
						<Btn glue class="footer__docs" :link="social.url"
							><img :src="`/assets/svg/${social.icon}`" :alt="social.title"
						/></Btn>
					</template>
				</div>

				<NuxtLink class="footer__docs" :to="DOCS.url" v-text="DOCS.title" />
			</div>
		</div>
	</footer>
</template>
<script setup>
import { useMain } from '@/store/main.js'
const { phones, COPYRIGHT, FULLYEAR, SOCIALS, DOCS } = useMain()
</script>
<!--style lang="postcss" scoped>
<style-->
