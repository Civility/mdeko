<script setup>
import { useMain } from '@/store/main.js'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'
import { useReCaptcha } from 'vue-recaptcha-v3'
const { sendForm } = useMain()
const recaptchaInstance = useReCaptcha()
const recaptcha = async () => {
	// optional you can await for the reCaptcha load
	await recaptchaInstance?.recaptchaLoaded()
	// get the token, a custom action could be added as argument to the method
	const token = await recaptchaInstance?.executeRecaptcha('yourActionHere')

	return token
}
const state = reactive({
	name: '',
	phone: '',
	email: '',
	message: ''
})
const rules = computed(() => {
	let requiredText = 'Поле обязательно для заполнения'
	const regexPhone = helpers.regex(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/im)
	return {
		name: {
			required: helpers.withMessage(requiredText, required),
			minLength: helpers.withMessage(({ $params }) => `Имя должно содержать не менее ${$params.min} символов.`, minLength(2)),
			maxLength: helpers.withMessage(({ $params }) => `Имя должно содержать не более ${$params.max} символов.`, maxLength(32))
		},
		phone: {
			regexPhone: helpers.withMessage('Проверьте правильность заполнения поля', regexPhone),
			required: helpers.withMessage(requiredText, required),
			minLength: helpers.withMessage(
				({ $params }) => `Номер телефона должен содержать не менее ${$params.min} символов.`,
				minLength(7)
			),
			maxLength: helpers.withMessage(({ $params }) => `Имя должно содержать не более ${$params.max} символов.`, maxLength(22))
		},
		email: {
			required: helpers.withMessage(requiredText, required),
			email: helpers.withMessage('Проверьте правильность заполения', email)
		},
		message: {
			required: helpers.withMessage(requiredText, required),
			minLength: helpers.withMessage(({ $params }) => `Сообщение должно содержать не менее ${$params.min} символов.`, minLength(20)),
			maxLength: helpers.withMessage(({ $params }) => `Сообщение должно содержать не более ${$params.max} символов.`, maxLength(300))
		}
	}
})
const v$ = useVuelidate(rules, state)
const isSendForm = async (name, phone, email, message) => {
	let result = await v$.value.$validate()
	result ? console.log('Form validate Ok ', result) : console.log('Form validate Failed ', result)
	const token = await this.recaptcha()
	if (!v$.value.$error && token) {
		await useAsyncData('sendForm', () =>
			sendForm({
				name,
				phone,
				email,
				message,
				agreement: true
			})
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
	<div class="bg-gradient-to-r from-main from-30% to-main-dark to-100% p-5 shadow-2xl lg:p-20">
		<div class="wrap relative mb-8 items-center gap-0 lg:mb-6 lg:gap-4">
			<label for="name" class="col-span-full block text-xl font-medium text-white lg:col-span-3 lg:ml-auto">ФИО</label>
			<input
				v-model.trim="state.name"
				@change="v$.name.$touch"
				type="text"
				id="name"
				class="col-span-full block w-full rounded-lg border border-sec bg-sec-light p-2.5 text-xl text-sec-dark outline-main placeholder:text-gray-dark focus:border-sec-dark focus:ring-sec-dark lg:col-span-5"
				placeholder=""
			/>
			<span class="absolute bottom-0 right-0 leading-4 text-red" v-if="v$.name.$error" v-text="v$.name.$errors[0].$message" />
		</div>
		<div class="wrap relative mb-8 items-center gap-0 lg:mb-6 lg:gap-4">
			<label for="phone" class="col-span-full block text-xl font-medium text-white lg:col-span-3 lg:ml-auto">Телефон</label>
			<input
				v-model.trim="state.phone"
				@change="v$.phone.$touch"
				type="text"
				id="phone"
				class="col-span-full block w-full rounded-lg border border-sec bg-sec-light p-2.5 text-xl text-sec-dark outline-main placeholder:text-gray-dark focus:border-sec-dark focus:ring-sec-dark lg:col-span-5"
				placeholder=""
			/>
			<span class="absolute bottom-0 right-0 leading-4 text-red" v-if="v$.phone.$error" v-text="v$.phone.$errors[0].$message" />
		</div>
		<div class="wrap relative mb-8 items-center gap-0 lg:mb-6 lg:gap-4">
			<label for="email" class="col-span-full block text-xl font-medium text-white lg:col-span-3 lg:ml-auto">Email</label>
			<input
				v-model.trim="state.email"
				@change="v$.email.$touch"
				type="email"
				id="email"
				class="col-span-full block w-full rounded-lg border border-sec bg-sec-light p-2.5 text-xl text-sec-dark outline-main placeholder:text-gray-dark focus:border-sec-dark focus:ring-sec-dark lg:col-span-5"
				placeholder=""
			/>
			<span class="absolute bottom-0 right-0 leading-4 text-red" v-if="v$.email.$error" v-text="v$.email.$errors[0].$message" />
		</div>
		<div class="wrap relative mb-8 items-center gap-0 lg:mb-6 lg:gap-4">
			<label for="message" class="col-span-full block text-xl font-medium text-white lg:col-span-3 lg:ml-auto">Сообщение</label>
			<textarea
				v-model.trim="state.message"
				@change="v$.message.$touch"
				id="message"
				rows="4"
				class="col-span-full block w-full rounded-lg border border-sec bg-sec-light p-2.5 text-xl text-sec-dark outline-main placeholder:text-gray-dark focus:border-sec-dark focus:ring-sec-dark lg:col-span-5"
				placeholder=""
			/>
			<span class="absolute bottom-0 right-0 leading-4 text-red" v-if="v$.message.$error" v-text="v$.message.$errors[0].$message" />
		</div>

		<Btn
			class="!ml-auto"
			main
			type="submit"
			@click.native="isSendForm(state.name, state.email, state.phone, state.message), v$.$reset()"
			:disabled="v$.$invalid"
			>Отправить</Btn
		>
	</div>
</template>
