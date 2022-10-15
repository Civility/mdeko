<template>
	<footer class="bg-main-darker py-5">
		<div class="container">
			<div class="footer__top">
				<NuxtLink href="/" class="header__logo logo">
					<img src="/assets/svg/logo.svg" width="200" height="100" alt="logo" />
				</NuxtLink>
				<div class="footer__socials flex flex-wrap gap-x-4 gap-y-1">
					<Btn
						v-for="social in SOCIALS"
						:key="social.name"
						class="footer__docs gap-2"
						:link="
							social.name === 'telegram'
								? `//t.me/${social.number}`
								: social.name === 'whatsapp'
								? `//wa.me/${social.number}`
								: null
						"
						><img :src="`/assets/svg/${social.icon}`" :alt="social.title" />{{ social.title }}</Btn
					>
				</div>
				<div class="flex flex-wrap gap-x-4 gap-y-1">
					<Btn :link="`tel:${phone.tel}`" icon v-for="phone in CONTACT.phones">
						<img src="/assets/svg/call.svg" width="24" height="24" alt="phone" />
						{{ phone.number }}
						<div class="md:text-md text-center w-full !leading-none" v-text="phone.city" />
					</Btn>
				</div>
			</div>
			<div class="footer__bottom flex flex-wrap justify-between items-end">
				<div class="footer__copyright flex gap-4">
					<div class="footer__copyright_notice" v-text="COPYRIGHT.notice" />
					<div class="footer__copyright_name" v-text="COPYRIGHT.name" />
					<div class="footer__fullyear" v-text="new Date().getFullYear() + 'г.'" />
				</div>

				<NuxtLink class="footer__docs" :to="DOCS.url">{{ DOCS.title }}</NuxtLink>
			</div>
		</div>
	</footer>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
const { CONTACT, SOCIALS } = storeToRefs(useMain())
const { COPYRIGHT, DOCS } = useMain()
</script>
