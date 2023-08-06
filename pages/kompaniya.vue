<script setup>
import { useMain } from '@/store/main.js'
import { storeToRefs } from 'pinia'
const { CONTACT, CONTACTS } = storeToRefs(useMain())
useSeoMeta({
	title: 'Информация покупателям',
	description: 'Информация покупателям - Минеральные удобрения от производителя'
})
</script>
<template>
	<main>
		<section class="relative h-screen w-full">
			<div class="container absolute inset-0 flex h-full w-full items-center justify-start opacity-50">
				<img src="/svg/logo.svg" width="600" height="200" alt="logo" />
			</div>
			<span style="background-image: url(/img/main.webp)" class="parallax_bg" />
		</section>
		<section
			class="container relative -top-20 bg-gradient-to-r from-main from-30% to-main-dark to-100% px-20 pb-5 pt-20 text-center lg:px-40"
		>
			<h1>Информация покупателям</h1>
			<p>Откройте двери к бесконечной красоте с нашей эксклюзивной линейкой продуктов «МДЕКО»!</p>
			<p>
				Мы предлагаем оптовые продажи нашей высококачественной косметики и удобрений, которая обеспечит вашим клиентам незабываемый
				опыт и безупречный вид.
			</p>
			<p>Разнообразие наших продуктов позволит удовлетворить запросы самых взыскательных покупателей</p>
			<p>
				Не упустите шанс расширить свой бизнес с нами и стать настоящим партнером в создании исключительной косметической коллекции!
			</p>
			<p>Вы можете связаться с нами по телефону, емейлу или оставить свои данные для обратной связи.</p>
			<div v-if="CONTACTS" class="flex w-full justify-between py-5 text-main-lighter">
				<Btn
					v-for="phone in CONTACT.phones"
					:key="phone.tel"
					v-if="CONTACT.phones"
					clear
					:to="`tel:${phone.number}`"
					class="flex-col !text-main-lighter"
				>
					<span> {{ phone.tel }}</span>
					<span v-text="phone.city" />
				</Btn>

				<span v-if="CONTACT.email" class="flex flex-col items-center">
					<Btn :to="`mailto:${CONTACT.email}`" class="flex-col !p-0 !text-main-lighter"
						><span>{{ CONTACT.email }}</span
						><span>email</span></Btn
					>
				</span>
			</div>
		</section>
		<section class="container relative mb-10 px-40 lg:mb-20">
			<FormSM />
		</section>
	</main>
</template>
