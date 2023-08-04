<script setup>
import { useMain } from '@/store/main.js'
const { COPYRIGHT, CONTACT } = useMain()
const { getContactData, getСontacts } = useMain()
const { pending: contactWait } = useLazyAsyncData('contact', () => getContactData())
await useAsyncData('contacts', async () => getСontacts())
</script>

<template>
	<footer class="relative flex h-full justify-between p-10">
		<span
			style="background-image: url(/svg/pattern/pattern.svg)"
			class="absolute inset-0 -z-10 h-full w-full bg-opacity-90 bg-cover bg-left bg-no-repeat"
		/>

		<div class="flex flex-col text-main-lighter">
			<NuxtLink to="/" class="footer__logo logo col-span-2" exact>
				<img src="/svg/logo.svg" width="200" height="100" alt="logo" />
			</NuxtLink>
			<div class=" " v-text="COPYRIGHT.notice" />
			<div class=" ">{{ COPYRIGHT.name }} {{ new Date().getFullYear() + 'г.' }}</div>
		</div>
		<div class="flex lg:gap-52" v-if="!contactWait && CONTACT">
			<ClientOnly>
				<Btn
					icon
					:to="`tel:${phone.number}`"
					v-for="phone in CONTACT.phones"
					:key="phone.number"
					class="flex-col !items-end !text-gray-dark"
				>
					<strong v-text="phone.tel" />
					<div class="block text-left !leading-none" v-text="phone.city" />
				</Btn>
			</ClientOnly>
		</div>
	</footer>
</template>
