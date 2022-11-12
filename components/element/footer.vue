<template>
	<footer class="bg-gradient-to-tl to-sec-dark from-main-dark py-5">
		<div class="container">
			<address class="footer__top wrap items-center">
				<NuxtLink to="/" class="footer__logo logo col-span-2" exact>
					<img src="/assets/svg/logo.svg" width="200" height="100" alt="logo" />
				</NuxtLink>

				<div class="flex flex-wrap gap-x-4 gap-y-1 md:col-span-4 col-span-6">
					<Btn icon :to="`tel:${phone.number}`" v-for="phone in CONTACT.phones" class="!grid grid-cols-[40px,_1fr] gap-x-2">
						<Svg svg="baseline-local-phone" class="row-span-2" />
						<div class="text-sec-lighter" v-text="phone.tel" />
						<div class="block text-sm text-left !leading-none" v-text="phone.city" />
					</Btn>
				</div>
				<div class="col-span-2">
					<Btn main class="gap-2 !w-full" @click="openModal('map')">
						<Svg svg="twotone-place" />
						Карта
					</Btn>
					<Modal refName="map" :show="showModal === 'map'" @isClickShow="(val) => isShow(val)">
						<template #body> <img src="~/assets/img/bg.webp" alt="map" /> </template>
					</Modal>
				</div>

				<div class="footer__socials flex flex-wrap gap-x-4 gap-y-1 col-auto">
					<Btn
						v-for="social in SOCIALS"
						:key="social.name"
						class="footer__docs gap-2"
						:to="
							social.name === 'telegram'
								? `//t.me/${social.number}`
								: social.name === 'whatsapp'
								? `//wa.me/${social.number}`
								: null
						"
					>
						<Svg :svg="social.icon" :alt="social.title" />
					</Btn>
				</div>

				<NuxtLink :to="`mailto:${CONTACT.mail}`" class="col-span-5 w-fit">
					<Svg svg="baseline-mail" alt="mail" />
					{{ CONTACT.mail }}
				</NuxtLink>
				<div class="col-span-2">
					<Btn main class="gap-2 !w-full" @click="openModal('feedback')">
						<Svg svg="round-feedback" />
						Обратная связь
					</Btn>
					<Modal refName="map" :show="showModal === 'feedback'" @isClickShow="(val) => isShow(val)">
						<template #body> <h3>Feedback</h3> </template>
					</Modal>
				</div>
			</address>
			<div class="footer__bottom flex flex-wrap justify-between items-end mt-4">
				<div class="footer__copyright flex gap-4">
					<div class="footer__copyright_notice text-sm" v-text="COPYRIGHT.notice" />
					<div class="footer__copyright_name text-sm" v-text="COPYRIGHT.name" />
					<div class="footer__fullyear text-sm" v-text="new Date().getFullYear() + 'г.'" />
				</div>

				<div class="pay flex flex-wrap gap-4">
					<Btn icon to="#" class="!py-0">
						<img src="/assets/svg/mastercard.svg" alt="mastercard" />
					</Btn>
					<Btn icon to="#" class="!py-0">
						<img src="/assets/svg/visa.svg" alt="visa" />
					</Btn>
					<Btn icon to="#" class="!py-0">
						<Svg svg="baseline-account-balance-wallet" alt="wallet" />
					</Btn>
				</div>
				<NuxtLink class="footer__docs text-sm" :to="DOCS.url">{{ DOCS.title }}</NuxtLink>
			</div>
		</div>
	</footer>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
const { CONTACT, SOCIALS } = storeToRefs(useMain())
const { COPYRIGHT, DOCS } = useMain()

const showModal = shallowRef(null)

const isShow = (val) => (showModal.value = val)
const openModal = (modalRefName) => (showModal.value = modalRefName)
</script>
