<script setup>
import { useMain } from '@/store/main.js'
const { COPYRIGHT, CONTACTS } = useMain()
</script>
<template>
	<footer class="relative flex h-full flex-wrap justify-center p-5 lg:justify-between lg:p-10">
		<span
			style="background-image: url(/pattern.svg)"
			class="absolute inset-0 -z-10 h-full w-full bg-opacity-90 bg-cover bg-left bg-no-repeat"
		/>
		<div class="flex flex-col text-main-lighter">
			<NuxtLink to="/" class="col-span-2" exact @click="useMain().getMenuClosed">
				<img src="/logo.svg" width="200" height="100" alt="logo" />
			</NuxtLink>
			<div v-text="COPYRIGHT.notice" />
			<div>{{ COPYRIGHT.name }} {{ new Date().getFullYear() + 'г.' }}</div>
		</div>
		<div class="flex flex-wrap justify-center lg:justify-start lg:gap-52 lg:p-10" v-if="CONTACTS">
			<ClientOnly>
				<Btn
					icon
					:to="`tel:${replaceNumber(city.phone)}`"
					v-for="(city, key) in CONTACTS.city"
					:key="key"
					class="flex-col !items-end !text-gray-dark"
				>
					<strong class="place-self-start" v-text="city.phone" />
					<div class="block text-left !leading-none" v-text="city.name" />
				</Btn>
			</ClientOnly>
		</div>
	</footer>
</template>
