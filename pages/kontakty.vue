<script setup>
import { useMain } from '@/store/main.js'
const { getContactData, contact } = useMain()
const { pending: contactWait, data: contactData } = await useLazyAsyncData('contact', () => getContactData())
</script>
<template>
	<main class="md:py-15 py-10 container wrap">
		<div class="lg:col-span-3 col-span-full flex flex-col gap-4 text-dark">
			<dl class="bg-white/50 p-4">
				<dt class="mb-2">Адрес офиса:</dt>
				<dd>Россия, 196006, г. Санкт-Петербург, ул. Цветочная, д. 7, лит. Б, КОМНАТА 9</dd>
			</dl>
			<dl class="bg-white/50 p-4">
				<dt class="mb-2">Телефоны:</dt>
				<dd>
					<Btn v-for="item in contact.phones" :key="item.number" :to="`tel:${item.number}`" class="flex gap-2 !text-dark !p-0">
						<Svg svg="baseline-local-phone" class="row-span-2" />
						{{ item.tel }}
						<span v-text="`по ${item.city}`" class="text-sm" />
					</Btn>
				</dd>
			</dl>
			<dl class="bg-white/50 p-4">
				<dt class="mb-2">E-mail:</dt>
				<dd>
					<a :href="`mailto:${contact.mail}`">{{ contact.mail }} </a>
				</dd>
			</dl>
			<dl class="bg-white/50 p-4">
				<dt class="mb-2">Социальные сети:</dt>
				<dd>
					<Btn to="#"> <Svg svg="twotone-whatsapp" color="#68ad57" size="32" /></Btn>
					<Btn to="#"> <Svg svg="baseline-telegram" color="#609cd3" size="32" /></Btn>
				</dd>
			</dl>
		</div>
		<div class="lg:col-span-5 col-span-full">
			<div class="w-[500px] h-[370px] bg-gray min-w-full min-h-full flex justify-center items-center text-dark">MAP</div>
		</div>
		<div class="gap-4 text-dark col-span-full wrap">
			<dl class="lg:col-span-3 col-span-full">
				<div class="border border-dark p-4 bg-white/50 flex flex-col">
					<dt class="mb-2">Форма обратной связи:</dt>
					<dd>
						<Btn main @click.native="openCallBack" class="!text-dark">Связаться</Btn>
					</dd>
				</div>
			</dl>
			<div class="lg:col-span-5 col-span-full flex flex-wrap justify-between">
				<div class="border border-dark p-4 flex justify-center items-center bg-white/50">ООО "МДЕКО"</div>
				<div class="border border-dark p-4 flex justify-center items-center bg-white/50">ИНН 7816543798</div>
				<div class="border border-dark p-4 flex justify-center items-center bg-white/50">ОГРН 1127847412220</div>
			</div>
		</div>
		<span class="parallax" style="background-image: url(/img/bg3.webp)" />
	</main>
</template>
