<script setup>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'
import { useMain } from '@/store/main.js'
// import { storeToRefs } from 'pinia'
// const { contacts } = storeToRefs(useMain())
const config = useRuntimeConfig()
const { getContactData, getСontacts, contact, sendForm } = useMain()
await useAsyncData('contacts', async () => getСontacts(config.public.PUBLIC_NAME))
await useLazyAsyncData('contact', async () => getContactData())

const showModal = shallowRef(null)

const isShow = (val) => (showModal.value = val)
const openModal = (modalRefName) => (showModal.value = modalRefName)

const state = reactive({
	name: '',
	phone: '',
	email: '',
	message: '',
})
const rules = computed(() => {
	let requiredText = 'Поле обязательно для заполнения'
	const regexPhone = helpers.regex(
		// /^((8|\+7)[\- ]?)?\(?\d{3,5}\)?[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})?[\- ]?\d{1})?$/im
		/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/im
	)
	return {
		// name: { required },
		// phone: { required },
		// email: { required },
		// message: { required },
		name: {
			required: helpers.withMessage(requiredText, required),
			minLength: helpers.withMessage(({ $params }) => `Имя должно содержать не менее ${$params.min} символов.`, minLength(2)),
			maxLength: helpers.withMessage(({ $params }) => `Имя должно содержать не более ${$params.max} символов.`, maxLength(32)),
		},
		phone: {
			regexPhone: helpers.withMessage('Проверьте правильность заполнения поля', regexPhone),
			required: helpers.withMessage(requiredText, required),
			minLength: helpers.withMessage(({ $params }) => `Номер телефона должен содержать не менее ${$params.min} символов.`, minLength(7)),
			maxLength: helpers.withMessage(({ $params }) => `Имя должно содержать не более ${$params.max} символов.`, maxLength(22)),
		},
		email: {
			required: helpers.withMessage(requiredText, required),
			email: helpers.withMessage('Проверьте правильность заполения', email),
		},
		message: {
			required: helpers.withMessage(requiredText, required),
			minLength: helpers.withMessage(({ $params }) => `Сообщение должно содержать не менее ${$params.min} символов.`, minLength(20)),
			maxLength: helpers.withMessage(({ $params }) => `Сообщение должно содержать не более ${$params.max} символов.`, maxLength(300)),
		},
	}
})
const v$ = useVuelidate(rules, state)
const isSendForm = async (name, phone, email, message) => {
	let result = await v$.value.$validate()
	result ? console.log('Form validate Ok ', result) : console.log('Form validate Failed ', result)
	if (!v$.value.$error) {
		await useAsyncData('sendForm', () =>
			sendForm(
				{
					name,
					phone,
					email,
					message,
					agreement: true,
				},
				config.public.PUBLIC_NAME
			)
		)
		state.name = ''
		state.phone = ''
		state.email = ''
		state.message = ''
		console.log('Form not error ', v$.value.$error)
	} else {
		console.log('Form error ', v$.value.$error)
	}
}
</script>
<template>
	<main class="md:py-15 py-10 container wrap">
		<ClientOnly>
			<div class="lg:col-span-3 col-span-full flex flex-col gap-4 text-dark">
				<dl class="bg-white/50 p-4">
					<dt class="mb-2">Адрес офиса:</dt>
					<dd v-text="contact.address" />
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
					<dd v-for="email in contact.mail">
						<a :href="`mailto:${email}`" v-text="email" />
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
		</ClientOnly>
		<div class="lg:col-span-5 col-span-full">
			<div class="w-[500px] h-[370px] bg-gray min-w-full min-h-full flex justify-center items-center text-dark">MAP</div>
		</div>
		<div class="gap-4 text-dark col-span-full wrap">
			<dl class="lg:col-span-3 col-span-full">
				<div class="border border-dark p-4 bg-white/50 flex flex-col">
					<dt class="mb-2">Форма обратной связи:</dt>
					<dd>
						<Btn main @click.native="openModal('callback')" class="!text-dark">Связаться</Btn>
					</dd>
				</div>
			</dl>
			<div class="lg:col-span-5 col-span-full">
				<!-- <div class="border border-dark p-4 flex justify-center items-center bg-white/50">ООО "МДЕКО"</div>
				<div class="border border-dark p-4 flex justify-center items-center bg-white/50">ИНН 7816543798</div>
				<div class="border border-dark p-4 flex justify-center items-center bg-white/50">ОГРН 1127847412220</div> -->
				<div class="border border-dark p-4 flex justify-between items-center bg-white/50 h-full">
					<span>ООО "МДЕКО"</span>
					<span>ИНН 7816543798</span>
					<span>ОГРН 1127847412220</span>
				</div>
			</div>
		</div>
		<span class="parallax" style="background-image: url(/img/bg3.webp)" />
		<Modal refName="callback" :show="showModal === 'callback'" @isClickShow="(val) => isShow(val)">
			<div>
				<div class="pb-6 relative">
					<label for="name" class="block text-sm font-medium text-main">Вашe Имя</label>
					<input
						v-model.trim="state.name"
						@change="v$.name.$touch"
						type="text"
						id="name"
						class="bg-gray/90 border border-sec text-sec-dark text-sm rounded-lg focus:ring-sec-dark focus:border-sec-dark block w-full p-2.5 outline-main"
						placeholder="Имя Фамилия"
					/>
					<small class="text-some absolute right-0 bottom-0" v-if="v$.name.$error" v-text="v$.name.$errors[0].$message" />
				</div>
				<div class="pb-6 relative">
					<label for="phone" class="block text-sm font-medium text-main">Ваш Телефон</label>
					<input
						v-model.trim="state.phone"
						@change="v$.phone.$touch"
						type="text"
						id="phone"
						class="bg-gray/90 border border-sec text-sec-dark text-sm rounded-lg focus:ring-sec-dark focus:border-sec-dark block w-full p-2.5 outline-main"
						placeholder="+7 ( ___ ) ___ - __ - __"
					/>
					<small class="text-some absolute right-0 bottom-0" v-if="v$.phone.$error" v-text="v$.phone.$errors[0].$message" />
				</div>
				<div class="pb-6 relative">
					<label for="email" class="block text-sm font-medium text-main">Ваш Email</label>
					<input
						v-model.trim="state.email"
						@change="v$.email.$touch"
						type="email"
						id="email"
						class="bg-gray/90 border border-sec text-sec-dark text-sm rounded-lg focus:ring-sec-dark focus:border-sec-dark block w-full p-2.5 outline-main"
						placeholder="email@email.com"
					/>
					<small class="text-some absolute right-0 bottom-0" v-if="v$.email.$error" v-text="v$.email.$errors[0].$message" />
				</div>
				<div class="pb-6 relative">
					<label for="message" class="block text-sm font-medium text-main">Вашe Сообщение</label>
					<textarea
						v-model.trim="state.message"
						@change="v$.message.$touch"
						id="message"
						rows="4"
						class="block p-2.5 w-full text-sm text-sec-dark bg-gray/90 rounded-lg border border-sec focus:ring-sec-dark focus:border-sec-dark"
						placeholder="Текст сообщения"
					/>
					<small class="text-some absolute right-0 bottom-0" v-if="v$.message.$error" v-text="v$.message.$errors[0].$message" />
				</div>
				<Btn
					type="submit"
					@click.native="isSendForm(state.name, state.email, state.phone, state.message), v$.$reset()"
					:disabled="v$.$invalid"
					class="!w-full bg-gradient-to-tl from-sec to-main hover:to-sec hover:from-main"
					>Отправить</Btn
				>
			</div>
		</Modal>
	</main>
</template>
