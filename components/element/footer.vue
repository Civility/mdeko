<script setup>
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/main.js'
const { SOCIALS } = storeToRefs(useMain())
const { COPYRIGHT, DOCS, CONTACT } = useMain()

const showModal = shallowRef(null)

const isShow = (val) => (showModal.value = val)
const openModal = (modalRefName) => (showModal.value = modalRefName)
</script>

<template>
	<footer class="bg-gradient-to-tl to-sec-dark from-main-dark py-5">
		<div class="container">
			<address class="footer__top wrap items-center">
				<NuxtLink to="/" class="footer__logo logo col-span-2" exact>
					<img src="/svg/logo.svg" width="200" height="100" alt="logo" />
				</NuxtLink>

				<div class="flex flex-wrap gap-x-4 gap-y-1 md:col-span-4 col-span-6">
					<ClientOnly>
						<Btn
							icon
							:to="`tel:${phone.number}`"
							v-for="phone in CONTACT.phones"
							:key="phone.number"
							class="!grid grid-cols-[40px,_1fr] gap-x-2"
						>
							<Svg svg="baseline-local-phone" class="row-span-2" />
							<div class="text-sec-lighter" v-text="phone.tel" />
							<div class="block text-sm text-left !leading-none" v-text="phone.city" />
						</Btn>
					</ClientOnly>
				</div>
				<div class="col-span-2">
					<Btn main class="gap-2 !w-full" @click.native="openModal('map')">
						<Svg svg="twotone-place" />
						Карта
					</Btn>

					<Modal refName="map" :show="showModal === 'map'" @isClickShow="(val) => isShow(val)">
						<div class="w-[500px] h-[370px] bg-gray min-w-full min-h-full flex justify-center items-center text-dark">
							<iframe
								src="https://yandex.ru/map-widget/v1/?um=constructor%3A31e5016da115367de16aac4834ae21ab40bc2e21ced4e1305fd85e7bef6ed376&amp;source=constructor"
								width="100%"
								height="100%"
								frameborder="0"
							></iframe>
						</div>
					</Modal>
				</div>
			</address>
			<div class="footer__bottom flex flex-wrap justify-between items-end mt-4">
				<div class="footer__copyright flex gap-4">
					<div class="footer__copyright_notice text-sm" v-text="COPYRIGHT.notice" />
					<div class="footer__copyright_name text-sm">{{ COPYRIGHT.name }} {{ new Date().getFullYear() + 'г.' }}</div>
				</div>

				<div class="pay flex flex-wrap gap-4">
					<Btn icon to="#" class="!py-0">
						<img src="/svg/mastercard.svg" alt="mastercard" />
					</Btn>
					<Btn icon to="#" class="!py-0">
						<img src="/svg/visa.svg" alt="visa" />
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
