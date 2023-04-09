
<script setup>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'

const state = reactive({
	name: '',
	phone: '',
	email: '',
	message: '',
	city: '',
	street: '',
	houseNumber: '',
	online_payment: '',
})
const rules = computed(() => {
	let requiredText = 'Поле обязательно для заполнения'
	const regexPhone = helpers.regex(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/im)
	return {
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
		city: { required: helpers.withMessage(requiredText, required) },
		street: {},
		houseNumber: {
			minLength: helpers.withMessage(({ $params }) => `Сообщение должно содержать не менее ${$params.min} символов.`, minLength(1)),
			maxLength: helpers.withMessage(({ $params }) => `Сообщение должно содержать не более ${$params.max} символов.`, maxLength(5)),
		},
		online_payment: {},
	}
})
const v$ = useVuelidate(rules, state)
const isSendForm = async (name, phone, email, message, city, street, houseNumber, online_payment) => {
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
			// 		city,
			// 		street,
			// 		houseNumber,
			// 		online_payment,
			// 		agreement: true,
			// 	},
			// 	config.public.PUBLIC_NAME
			// )
		)
		state.name = ''
		state.phone = ''
		state.email = ''
		state.message = ''
		state.city = ''
		state.street = ''
		state.houseNumber = ''
		state.online_payment = ''
		console.log('Form not error ', v$.value.$error)
	} else {
		console.log('Form error ', v$.value.$error)
	}
}
</script>
<template>
	<main class="checkout md:py-15 py-10 container wrap">
		<form class="wrap col-span-full col-start-3">
			<div class="col-span-5 mb-6 relative">
				<label for="name" class="block mb-2 text-sm font-medium text-main">Вашe Имя</label>
				<input
					v-model.trim="state.name"
					@change="v$.name.$touch"
					type="text"
					id="name"
					class="bg-gray/90 border border-sec text-sec-dark text-sm rounded-lg focus:ring-sec-dark focus:border-sec-dark block w-full p-2.5 outline-main"
					placeholder="Имя Фамилия"
				/>
				<small class="text-some absolute right-0 -bottom-4.5" v-if="v$.name.$error" v-text="v$.name.$errors[0].$message" />
			</div>
			<div class="col-span-5 mb-6 relative">
				<label for="name" class="block mb-2 text-sm font-medium text-main">Ваш Телефон</label>
				<input
					v-model.trim="state.phone"
					@change="v$.phone.$touch"
					type="tel"
					id="phone"
					class="bg-gray/90 border border-sec text-sec-dark text-sm rounded-lg focus:ring-sec-dark focus:border-sec-dark block w-full p-2.5 outline-main"
					placeholder="+7 ( ___ ) ___ - __ - __"
				/>
				<small class="text-some absolute right-0 -bottom-4.5" v-if="v$.phone.$error" v-text="v$.phone.$errors[0].$message" />
			</div>
			<div class="col-span-5 mb-6 relative">
				<label for="name" class="block mb-2 text-sm font-medium text-main">Ваш Email</label>
				<input
					v-model.trim="state.email"
					@change="v$.email.$touch"
					type="email"
					id="email"
					class="bg-gray/90 border border-sec text-sec-dark text-sm rounded-lg focus:ring-sec-dark focus:border-sec-dark block w-full p-2.5 outline-main"
					placeholder="email@email.com"
				/>
				<small class="text-some absolute right-0 -bottom-4.5" v-if="v$.email.$error" v-text="v$.email.$errors[0].$message" />
			</div>

			<div class="col-span-5 mb-6 relative">
				<h6 class="text-dark">Способ получения</h6>
				<fieldset>
					<div class="flex items-center mb-4">
						<input
							id="delivery-option-1"
							type="radio"
							name="delivery"
							value="deliveryDefault"
							class="w-4 h-4 border-gray focus:ring-2 focus:ring-main"
							checked
						/>
						<label for="delivery-option-1" class="block ml-2 text-sm font-medium text-dark">Самовывоз с пункта выдачи</label>
					</div>
					<div class="flex items-center mb-4">
						<input
							id="delivery-option-2"
							type="radio"
							name="delivery"
							value="deliveryExpress"
							class="w-4 h-4 border-gray focus:ring-2 focus:ring-main"
						/>
						<label for="delivery-option-2" class="block ml-2 text-sm font-medium text-dark">Доставка до двери</label>
					</div>
				</fieldset>
			</div>
			<div class="col-span-5 mb-6 relative">
				<label for="name" class="block mb-2 text-sm font-medium text-main">Ваш Город</label>
				<input
					v-model.trim="state.city"
					@change="v$.city.$touch"
					type="text"
					id="city"
					class="bg-gray/90 border border-sec text-sec-dark text-sm rounded-lg focus:ring-sec-dark focus:border-sec-dark block w-full p-2.5 outline-main"
					placeholder="Москва"
				/>
				<small class="text-some absolute right-0 -bottom-4.5" v-if="v$.city.$error" v-text="v$.city.$errors[0].$message" />
			</div>
			<div class="col-span-4 mb-6 relative">
				<label for="name" class="block mb-2 text-sm font-medium text-main">Адрес доставки</label>
				<input
					v-model.trim="state.street"
					@change="v$.street.$touch"
					type="text"
					id="street"
					class="bg-gray/90 border border-sec text-sec-dark text-sm rounded-lg focus:ring-sec-dark focus:border-sec-dark block w-full p-2.5 outline-main"
					placeholder=""
				/>
				<small class="text-some absolute right-0 -bottom-4.5" v-if="v$.street.$error" v-text="v$.street.$errors[0].$message" />
			</div>
			<div class="col-span-1 mb-6 relative">
				<label for="name" class="block mb-2 text-sm font-medium text-main">Квартира</label>
				<input
					v-model.trim="state.street"
					@change="v$.houseNumber.$touch"
					type="text"
					id="houseNumber"
					class="bg-gray/90 border border-sec text-sec-dark text-sm rounded-lg focus:ring-sec-dark focus:border-sec-dark block w-full p-2.5 outline-main"
					placeholder=""
				/>
				<small class="text-some absolute right-0 -bottom-4.5" v-if="v$.houseNumber.$error" v-text="v$.houseNumber.$errors[0].$message" />
			</div>

			<div class="col-span-5 mb-6 relative">
				<!-- <h6 class="text-dark">Способ оплаты</h6> -->
				<label class="relative inline-flex items-center cursor-pointer">
					<input type="checkbox" value="" class="sr-only peer" />
					<div
						v-model="state.online_payment"
						class="w-11 h-6 bg-gray rounded-full peer peer-focus:ring-4 peer-focus:ring-sec-lighter peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sec-dark"
					></div>
					<span class="ml-3 text-sm font-medium text-dark">Оплата онлайн</span>
				</label>
			</div>
			<div class="col-span-5 mb-6 relative">
				<label for="name" class="block mb-2 text-sm font-medium text-main">Примечание</label>
				<textarea
					v-model.trim="state.message"
					@change="v$.message.$touch"
					id="message"
					rows="4"
					class="block p-2.5 w-full text-sm text-sec-dark bg-gray/90 rounded-lg border border-sec focus:ring-sec-dark focus:border-sec-dark"
					placeholder="Текст сообщения"
				/>
				<small class="text-some absolute right-0 -bottom-4.5" v-if="v$.message.$error" v-text="v$.message.$errors[0].$message" />
			</div>
			<Btn
				type="submit"
				@click.native="
					isSendForm(
						state.name,
						state.email,
						state.phone,
						state.message,
						state.city,
						state.street,
						state.houseNumber,
						state.online_payment
					),
						v$.$reset()
				"
				:disabled="v$.$invalid"
				class="!w-full bg-gradient-to-tl from-sec to-main hover:to-sec hover:from-main col-span-5"
				>Отправить</Btn
			>
		</form>
	</main>
</template>


 