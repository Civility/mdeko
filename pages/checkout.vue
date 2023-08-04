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

// onMounted(() => {
// 	var url = new URL(window.location.href)
// 	var isOnline_payment = url.searchParams.get('online_payment')
// 	if (isOnline_payment === 'on') {
// 		console.log('online_payment ', isOnline_payment)
// 		// 'http://api-akvamdeko.na4u.ru/checkout/order-pay/138/?key=wc_order_ARjMhilvq83bK&order=138'
// 	}
// })

definePageMeta({
	middleware: ['cartroute']
})
// store.$subscribe(() => {
// 	console.log(' RESPONSDELIVERY ', RESPONSDELIVERY.value)
// })
// useCart().$subscribe((mutation) => {
// 	// react to store changes
// 	console.log(`[🍍 ${mutation}]`)
// })
const state = reactive({
	name: 'Oleg',
	phone: '+7 (950)-030-78-34',
	email: 'civilitys@gmail.com',
	message: 'message message message',
	city: 'Санкт-Петербург',
	street: 'Сырная',
	houseNumber: '123в',
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
			// minLength: helpers.withMessage(({ $params }) => `Сообщение должно содержать не менее ${$params.min} символов.`, minLength(20)),
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
	<main class="checkout wrap container py-10 text-dark md:py-15">
		<form class="wrap col-span-full col-start-3">
			<div class="relative col-span-5 mb-6">
				<label for="name" class="mb-2 block text-sm font-medium text-main">Вашe Имя</label>
				<input
					v-model.trim="state.name"
					@change="v$.name.$touch"
					type="text"
					id="name"
					class="block w-full rounded-lg border border-sec bg-gray/90 p-2.5 text-sm text-sec-dark outline-main focus:border-sec-dark focus:ring-sec-dark"
					placeholder="Имя Фамилия"
				/>
				<small class="text-sec -bottom-4.5 absolute right-0" v-if="v$.name.$error" v-text="v$.name.$errors[0].$message" />
			</div>
			<div class="relative col-span-5 mb-6">
				<label for="name" class="mb-2 block text-sm font-medium text-main">Ваш Телефон</label>
				<input
					v-model.trim="state.phone"
					@change="v$.phone.$touch"
					type="tel"
					id="phone"
					class="block w-full rounded-lg border border-sec bg-gray/90 p-2.5 text-sm text-sec-dark outline-main focus:border-sec-dark focus:ring-sec-dark"
					placeholder="+7 ( ___ ) ___ - __ - __"
				/>
				<small class="text-sec -bottom-4.5 absolute right-0" v-if="v$.phone.$error" v-text="v$.phone.$errors[0].$message" />
			</div>
			<div class="relative col-span-5 mb-6">
				<label for="name" class="mb-2 block text-sm font-medium text-main">Ваш Email</label>
				<input
					v-model.trim="state.email"
					@change="v$.email.$touch"
					type="email"
					id="email"
					class="block w-full rounded-lg border border-sec bg-gray/90 p-2.5 text-sm text-sec-dark outline-main focus:border-sec-dark focus:ring-sec-dark"
					placeholder="email@email.com"
				/>
				<small class="text-sec -bottom-4.5 absolute right-0" v-if="v$.email.$error" v-text="v$.email.$errors[0].$message" />
			</div>

			<div class="relative col-span-5 mb-6">
				<label for="name" class="mb-2 block text-sm font-medium text-main">Ваш Город</label>
				<input
					v-model.trim="state.city"
					@change="v$.city.$touch"
					type="text"
					id="city"
					class="block w-full rounded-lg border border-sec bg-gray/90 p-2.5 text-sm text-sec-dark outline-main focus:border-sec-dark focus:ring-sec-dark"
					placeholder="Москва"
				/>
				<small class="text-sec -bottom-4.5 absolute right-0" v-if="v$.city.$error" v-text="v$.city.$errors[0].$message" />
			</div>
			<div class="relative col-span-4 mb-6">
				<label for="name" class="mb-2 block text-sm font-medium text-main">Адрес Доставки</label>
				<input
					v-model.trim="state.street"
					@change="v$.street.$touch"
					type="text"
					id="street"
					class="block w-full rounded-lg border border-sec bg-gray/90 p-2.5 text-sm text-sec-dark outline-main focus:border-sec-dark focus:ring-sec-dark"
					placeholder=""
				/>
				<small class="text-sec -bottom-4.5 absolute right-0" v-if="v$.street.$error" v-text="v$.street.$errors[0].$message" />
			</div>
			<div class="relative col-span-1 mb-6">
				<label for="name" class="mb-2 block text-sm font-medium text-main">Квартира</label>
				<input
					v-model.trim="state.houseNumber"
					@change="v$.houseNumber.$touch"
					type="text"
					id="houseNumber"
					class="block w-full rounded-lg border border-sec bg-gray/90 p-2.5 text-sm text-sec-dark outline-main focus:border-sec-dark focus:ring-sec-dark"
					placeholder=""
				/>
				<small
					class="text-sec -bottom-4.5 absolute right-0"
					v-if="v$.houseNumber.$error"
					v-text="v$.houseNumber.$errors[0].$message"
				/>
			</div>

			<div class="relative col-span-5 mb-6">
				<label for="name" class="mb-2 block text-sm font-medium text-main">Примечание</label>
				<textarea
					v-model.trim="state.message"
					@change="v$.message.$touch"
					id="message"
					rows="4"
					class="block w-full rounded-lg border border-sec bg-gray/90 p-2.5 text-sm text-sec-dark focus:border-sec-dark focus:ring-sec-dark"
					placeholder="Текст сообщения"
				/>
				<small class="text-sec -bottom-4.5 absolute right-0" v-if="v$.message.$error" v-text="v$.message.$errors[0].$message" />
			</div>
			<div class="relative col-span-5 mb-6">
				<h6 class="">Способ получения</h6>
				<fieldset>
					<div class="mb-4 flex items-center" v-for="(deliveryItem, id) in DATADELIVERY" :key="id">
						<input
							:id="`delivery-option-${id}`"
							type="radio"
							name="delivery"
							:value="deliveryItem.data"
							v-model="state.delivery"
							@click.passive="useCart().setDelivery(deliveryItem.data), (deliveryDATA = deliveryItem.price)"
							class="h-4 w-4 border-gray accent-main focus:ring-2 focus:ring-main"
							:checked="state.delivery === deliveryItem.data"
						/>
						<label :for="`delivery-option-${id}`" class="ml-2 block text-sm font-medium text-dark"
							>от {{ deliveryItem.price }}<Svg svg="baseline-currency-ruble" size="18" />
						</label>
						<span class="ml-2 border px-2 py-1 text-sm"> {{ deliveryItem.text }}</span>
					</div>
				</fieldset>
			</div>
			<div class="relative col-span-5 mb-6">
				<span class="mb-2 block text-sm text-main">Способ оплаты</span>
				<!-- <label class="relative inline-flex items-center cursor-pointer">
					<input type="checkbox" value="" class="sr-only peer" />
					<div
						class="w-11 h-6 bg-gray rounded-full peer peer-focus:ring-4 peer-focus:ring-sec-lighter peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sec-dark"
					></div>
					<span class="ml-3 text-sm font-medium ">Оплата онлайн</span>
				</label> -->

				<!-- <label class="">
					<input type="checkbox" class="w-4 h-4 border-main-lighter rounded bg-dark focus:ring-3 focus:ring-main" /> Browser default
				</label> -->

				<div class="flex items-start">
					<div class="flex h-5 items-center">
						<input
							id="online_payment"
							aria-describedby="online_payment"
							v-model="state.online_payment"
							name="online_payment"
							type="checkbox"
							class="focus:ring-3 h-4 w-4 cursor-pointer rounded border-main-lighter bg-dark accent-main focus:ring-main"
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for="online_payment" class="cursor-pointer font-medium">Оплата онлайн </label>
					</div>
				</div>
			</div>
			<div class="col-span-5">
				<dl>
					<dt>Всего</dt>
					<dd>{{ cartTotal }}<Svg svg="baseline-currency-ruble" /></dd>
					<dt>Доставка</dt>
					<dd>{{ deliveryDATA }}<Svg svg="baseline-currency-ruble" /></dd>
				</dl>
			</div>
			<Btn
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
				class="col-span-5 !w-full bg-gradient-to-tl from-sec to-main hover:from-main hover:to-sec"
				>Отправить</Btn
			>
		</form>
	</main>
</template>
