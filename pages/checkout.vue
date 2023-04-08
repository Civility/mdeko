
<script setup>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'

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
		await useAsyncData(
			'sendFormChekout',
			() => console.log('TRUE')
			// sendFormChekout(
			// 	{
			// 		name,
			// 		phone,
			// 		email,
			// 		message,
			// 		agreement: true,
			// 	},
			// 	config.public.PUBLIC_NAME
			// )
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
		<form>
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
		</form>
	</main>
</template>


 