<script setup>
import { useMain } from '@/store/main.js'
import { storeToRefs } from 'pinia'
const { CONTACT, CONTACTS } = storeToRefs(useMain())
useSeoMeta({
	title: 'Контакты',
	description: 'Контакты - Минеральные удобрения от производителя'
})
const showModal = shallowRef(null)
const isShow = (val) => (showModal.value = val)
const openModal = (modalRefName) => (showModal.value = modalRefName)
</script>
<template>
	<main>
		<section class="relative h-screen w-full">
			<div class="container absolute inset-0 flex h-full w-full items-center justify-center">
				<img src="/svg/logo.svg" width="800" height="400" alt="logo" />
			</div>
			<span class="parallax_bg" style="background-image: url(/img/main.webp)" />
		</section>
		<section class="container relative -top-20 bg-main px-10 py-10 lg:px-20 lg:py-20" v-if="CONTACTS && CONTACT">
			<h1 class="mb-10 text-center lg:mb-20">Контакты</h1>

			<div class="mb-10 flex flex-col gap-1">
				<dl v-if="CONTACT.address" class="flex items-center gap-5">
					<dt>
						<Icon svg="location" class="text-7xl" />
					</dt>
					<dd v-text="CONTACT.address" />
				</dl>
				<dl v-for="phone in CONTACT.phones" :key="phone.tel" v-if="CONTACT.phones" class="flex items-center gap-5">
					<dt v-if="phone.city === 'по России'"><Icon svg="smartphone" class="text-7xl" /></dt>
					<dt v-if="phone.city === 'по Санкт-Петербургу'"><Icon svg="phone" class="text-7xl" /></dt>
					<dd>
						<Btn clear :to="`tel:${phone.number}`" class="gap-2">{{ phone.tel }}<span v-text="phone.city" /></Btn>
					</dd>
				</dl>
				<dl class="flex items-center gap-5">
					<dt><Icon svg="mail" class="text-7xl" /></dt>
					<dd>
						<a :href="`mailto:${CONTACT.email}`" v-text="CONTACT.email" />
					</dd>
				</dl>
				<dl class="flex items-center gap-5">
					<dt><Icon svg="people" class="text-7xl" /></dt>
					<dd>Наши реквизиты: ООО "МДЕКО" / ИНН 7816543798 / ОГРН 1127847412220</dd>
				</dl>
			</div>

			<div class="mb-10 flex h-[370px] max-h-[370px] min-h-full w-full items-center justify-center bg-gray text-dark lg:mb-20">
				<iframe
					src="https://yandex.ru/map-widget/v1/?um=constructor%3A31e5016da115367de16aac4834ae21ab40bc2e21ced4e1305fd85e7bef6ed376&amp;source=constructor"
					width="100%"
					height="100%"
					frameborder="0"
				></iframe>
			</div>
			<div class="mb-10 flex w-full justify-center">
				<Btn main @click.native="openModal('callback')">обратный звонок</Btn>
			</div>
		</section>

		<Modal refName="callback" :show="showModal === 'callback'" @isClickShow="(val) => isShow(val)">
			<FormSM />
		</Modal>
	</main>
</template>
