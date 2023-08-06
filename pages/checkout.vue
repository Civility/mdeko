<script setup>
import useVuelidate from '@vuelidate/core'

import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'
import { storeToRefs } from 'pinia'
import { useCart } from '@/store/cart.js'

const { DATADELIVERY } = useCart()
const { cartTotal, DELIVERY, cartsLength, CARTS, RESPONSDELIVERY } = storeToRefs(useCart())
const { sendOrder } = useCart()

const searchDELIVERY = DATADELIVERY.find((i) => i.data == false)
const deliveryDATA = ref(searchDELIVERY.price)

definePageMeta({
	middleware: ['cartroute']
})

const state = reactive({
	name: '',
	phone: '',
	email: '',
	message: '',
	city: '',
	street: '',
	houseNumber: '',
	online_payment: false,
	delivery: DELIVERY.value
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
			// required: helpers.withMessage(requiredText, required),
			minLength: helpers.withMessage(({ $params }) => `Сообщение должно содержать не менее ${$params.min} символов.`, minLength(5)),
			maxLength: helpers.withMessage(({ $params }) => `Сообщение должно содержать не более ${$params.max} символов.`, maxLength(300))
		},
		city: { required: helpers.withMessage(requiredText, required) },
		street: {},
		houseNumber: {
			minLength: helpers.withMessage(({ $params }) => `Сообщение должно содержать не менее ${$params.min} символов.`, minLength(1)),
			maxLength: helpers.withMessage(({ $params }) => `Сообщение должно содержать не более ${$params.max} символов.`, maxLength(5))
		},
		online_payment: { required }
	}
})
const v$ = useVuelidate(rules, state)
const isSendOrder = async (name, phone, email, message, city, street, houseNumber, online_payment, delivery) => {
	let result = await v$.value.$validate()
	result ? console.log('Form validate Ok ', result) : console.log('Form validate Failed ', result)
	if (!v$.value.$error) {
		await useLazyAsyncData('setHits', () => getHits())
		const mainObjCarts = computed(() =>
			CARTS.value.map((item) => {
				const id = item.product.id
				const count = item.total
				return { id, count }
			})
		)
		// console.log('mainObjCarts.value ', mainObjCarts.value)
		await useAsyncData('sendOrder', () =>
			sendOrder({
				name,
				phone,
				email,
				message,
				city,
				street,
				houseNumber,
				online_payment,
				delivery,
				cart: mainObjCarts.value
			})
		)
		state.name = ''
		state.phone = ''
		state.email = ''
		state.message = ''
		state.city = ''
		state.street = ''
		state.houseNumber = ''
		state.online_payment = false
		state.delivery = DELIVERY.value
		console.log('Form not error ', v$.value.$error)
	} else {
		console.log('Form error ', v$.value.$error)
	}
}
</script>
<template>
	<main class="checkout">
		<Head>
			<Title>Оформление Заказа</Title>
			<Meta name="description" content="Оформление Заказа - Минеральные удобрения от производителя" />
		</Head>
		<section class="relative h-screen w-full">
			<div class="container absolute inset-0 flex h-full w-full items-center justify-center opacity-50">
				<img src="/logo.svg" width="800" height="400" alt="logo" />
			</div>
			<span style="background-image: url(/img/main.webp)" class="parallax_bg" />
		</section>

		<form class="container relative -top-20 bg-gradient-to-r from-main from-30% to-main-dark to-100% py-20 text-center">
			<div class="wrap relative items-center pb-6">
				<label for="name" class="col-span-3 ml-auto block text-xl font-medium">ФИО</label>
				<input
					v-model.trim="state.name"
					@change="v$.name.$touch"
					type="text"
					id="name"
					class="text-red-dark col-span-5 block w-full rounded-lg border border-sec bg-sec-light p-2.5 text-xl outline-main placeholder:text-gray-dark focus:border-sec-dark focus:ring-sec-dark"
					placeholder=""
				/>
				<strong class="-bottom-4.5 absolute right-2 text-red" v-if="v$.name.$error" v-text="v$.name.$errors[0].$message" />
			</div>
			<div class="wrap relative items-center pb-6">
				<label for="name" class="col-span-3 ml-auto block text-xl font-medium">Ваш Телефон</label>
				<input
					v-model.trim="state.phone"
					@change="v$.phone.$touch"
					type="tel"
					id="phone"
					class="text-red-dark col-span-5 block w-full rounded-lg border border-sec bg-sec-light p-2.5 text-xl outline-main placeholder:text-gray-dark focus:border-sec-dark focus:ring-sec-dark"
					placeholder=""
				/>
				<strong class="-bottom-4.5 absolute right-2 text-red" v-if="v$.phone.$error" v-text="v$.phone.$errors[0].$message" />
			</div>
			<div class="wrap relative items-center pb-6">
				<label for="name" class="col-span-3 ml-auto block text-xl font-medium">Ваш Email</label>
				<input
					v-model.trim="state.email"
					@change="v$.email.$touch"
					type="email"
					id="email"
					class="text-red-dark col-span-5 block w-full rounded-lg border border-sec bg-sec-light p-2.5 text-xl outline-main placeholder:text-gray-dark focus:border-sec-dark focus:ring-sec-dark"
					placeholder=""
				/>
				<strong class="-bottom-4.5 absolute right-2 text-red" v-if="v$.email.$error" v-text="v$.email.$errors[0].$message" />
			</div>

			<div class="wrap relative items-center pb-6">
				<label for="name" class="col-span-3 ml-auto block text-xl font-medium">Ваш Город</label>
				<input
					v-model.trim="state.city"
					@change="v$.city.$touch"
					type="text"
					id="city"
					class="text-red-dark col-span-5 block w-full rounded-lg border border-sec bg-sec-light p-2.5 text-xl outline-main placeholder:text-gray-dark focus:border-sec-dark focus:ring-sec-dark"
					placeholder=""
				/>
				<strong class="-bottom-4.5 absolute right-2 text-red" v-if="v$.city.$error" v-text="v$.city.$errors[0].$message" />
			</div>
			<div class="wrap relative items-center pb-6">
				<label for="name" class="col-span-3 ml-auto block text-xl font-medium">Адрес Доставки</label>
				<input
					v-model.trim="state.street"
					@change="v$.street.$touch"
					type="text"
					id="street"
					class="text-red-dark col-span-5 block w-full rounded-lg border border-sec bg-sec-light p-2.5 text-xl outline-main placeholder:text-gray-dark focus:border-sec-dark focus:ring-sec-dark"
					placeholder=""
				/>
				<strong class="-bottom-4.5 absolute right-2 text-red" v-if="v$.street.$error" v-text="v$.street.$errors[0].$message" />
			</div>
			<div class="wrap relative items-center pb-6">
				<label for="name" class="col-span-3 ml-auto block text-xl font-medium">Квартира</label>
				<input
					v-model.trim="state.houseNumber"
					@change="v$.houseNumber.$touch"
					type="text"
					id="houseNumber"
					class="text-red-dark col-span-5 block w-full rounded-lg border border-sec bg-sec-light p-2.5 text-xl outline-main placeholder:text-gray-dark focus:border-sec-dark focus:ring-sec-dark"
					placeholder=""
				/>
				<strong
					class="-bottom-4.5 absolute right-2 text-red"
					v-if="v$.houseNumber.$error"
					v-text="v$.houseNumber.$errors[0].$message"
				/>
			</div>

			<div class="wrap relative items-center pb-6">
				<label for="name" class="col-span-3 ml-auto block text-xl font-medium">Примечание</label>
				<textarea
					v-model.trim="state.message"
					@change="v$.message.$touch"
					id="message"
					rows="4"
					class="text-red-dark col-span-5 block w-full rounded-lg border border-sec bg-sec-light p-2.5 text-xl outline-main placeholder:text-gray-dark focus:border-sec-dark focus:ring-sec-dark"
					placeholder=""
				/>
				<strong class="-bottom-4.5 absolute right-0 text-red" v-if="v$.message.$error" v-text="v$.message.$errors[0].$message" />
			</div>
			<div class="wrap relative items-center pb-6">
				<strong class="col-span-3 ml-auto block text-xl font-medium">Способ получения</strong>
				<fieldset class="col-span-5 flex flex-wrap items-center gap-6">
					<div class="relative flex items-center" v-for="(deliveryItem, id) in DATADELIVERY" :key="id">
						<input
							:id="`delivery-option-${id}`"
							type="radio"
							name="delivery"
							:value="deliveryItem.data"
							v-model="state.delivery"
							@click.passive="useCart().setDelivery(deliveryItem.data), (deliveryDATA = deliveryItem.price)"
							class="h-5 w-5 border-gray accent-main focus:ring-2 focus:ring-main"
							:checked="state.delivery === deliveryItem.data"
						/>
						<label :for="`delivery-option-${id}`" class="ml-2 flex cursor-pointer items-center font-medium">
							<span>от {{ deliveryItem.price }}</span>
							<span class="ml-2 border px-2 py-1"> {{ deliveryItem.text }}</span>
						</label>
					</div>
				</fieldset>
			</div>
			<div class="wrap relative items-center pb-6">
				<span class="col-span-3 ml-auto block text-xl font-medium">Способ оплаты</span>

				<div class="col-span-5 flex items-center">
					<input
						id="online_payment"
						aria-describedby="online_payment"
						v-model="state.online_payment"
						name="online_payment"
						type="checkbox"
						class="focus:ring-3 h-5 w-5 cursor-pointer items-center rounded border-main-lighter bg-dark accent-main focus:ring-main"
					/>

					<div class="ml-3">
						<label for="online_payment" class="cursor-pointer font-medium">Оплата онлайн </label>
					</div>
				</div>
			</div>

			<dl class="wrap relative items-center pb-6">
				<dt class="col-span-3 ml-auto block text-xl font-bold text-sec">Всего</dt>
				<dd class="col-span-5 justify-self-start font-bold">
					{{ cartTotal }}
				</dd>
				<dt class="col-span-3 ml-auto block text-xl font-bold text-sec">Доставка</dt>
				<dd class="col-span-5 justify-self-start font-bold">
					{{ deliveryDATA }}
				</dd>
			</dl>

			<Btn
				main
				type="submit"
				@click.native="
					isSendOrder(
						state.name,
						state.phone,
						state.email,
						state.message,
						state.city,
						state.street,
						state.houseNumber,
						state.online_payment,
						state.delivery
					),
						v$.$reset()
				"
				:disabled="v$.$invalid"
				class="!ml-auto"
				>Отправить</Btn
			>
		</form>
	</main>
</template>
