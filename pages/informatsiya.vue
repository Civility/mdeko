<script setup>
import { useMain } from '@/store/main.js'
const { CONTACTS } = useMain()
</script>
<template>
	<main>
		<Head>
			<Title>Информация оптовым покупателям</Title>
			<Meta name="description" content="Оптовым покупателям - Минеральные удобрения от производителя" />
		</Head>
		<section class="relative h-screen w-full">
			<div class="container absolute inset-0 z-10 flex h-full w-full items-center justify-start mix-blend-difference">
				<img src="/logo.svg" width="600" height="200" alt="logo" />
			</div>
			<span style="background-image: url(/sec.webp)" class="parallax_bg" />
		</section>
		<section
			class="container relative -top-20 bg-gradient-to-r from-main from-30% to-main-dark to-100% px-5 pb-5 pt-10 text-center lg:px-40 lg:pt-20"
		>
			<h1>Информация оптовым покупателям</h1>
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
			<div v-if="CONTACTS" class="flex w-full flex-wrap justify-center gap-5 py-5 text-main-lighter lg:justify-between">
				<ClientOnly>
					<Btn
						icon
						:to="`tel:${replaceNumber(city?.phone)}`"
						v-for="(city, key) in CONTACTS.city"
						:key="key"
						class="flex-col !text-main-lighter"
					>
						<span v-text="city?.phone" />
						<span v-text="city?.name" />
					</Btn>

					<span v-if="CONTACTS?.email" class="flex flex-col items-center">
						<Btn :to="`mailto:${CONTACTS.email}`" class="flex-col !p-0 !text-main-lighter"
							><span>{{ CONTACTS.email }}</span
							><span>email</span></Btn
						>
					</span>
				</ClientOnly>
			</div>
		</section>
		<section class="container relative mb-10 lg:mb-20 lg:px-40">
			<FormSM />
		</section>
	</main>
</template>
