<script setup>
import { storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'
import { useCart } from '@/store/cart.js'
const { CARTS } = storeToRefs(useCart())
const route = useRoute()
const { getProduct } = useGoods()
const { PRODUCT } = storeToRefs(useGoods())
const { pending: productWait, refresh } = await useLazyAsyncData('setProduct', () => getProduct(route.params.list, route.params.url))

const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper) => (thumbsSwiper.value = swiper)
// useCart().$subscribe(() => {
// 	const isCartTotal = CARTS.value.find((i) => {
// 		return i.product.url == route.params.url
// 	})
// // console.log(route.params.url, isCartTotal.total)
// })

// const cartTotal = ref(isCartTotal[0])
const isCartTotal = ref({})

const cartTotal = computed(() => CARTS.value.find((i) => i.product.url === route.params.url))
const setCartTotal = computed(() => (isCartTotal.value.total ?? typeof cartTotal.value != 'undefined' ? cartTotal.value.total : 0))

watch(
	CARTS.value,
	(state) => {
		isCartTotal.value = state.find((i) => i.product.url === route.params.url)
		// console.log(route.params.url, isCartTotal.value.total)
	},
	{ deep: true }
)
</script>

<template>
	<main class="!pt-[20vh] md:py-15 py-10 container wrap">
		<div class="lg:col-span-4 col-span-full">
			<!-- <Slider
				:data="PRODUCT.slider"
				:spaceBetween="10"
				:slidesPerView="1" 	
				loop
				:effect="'fade'"
				:fadeEffect="{ crossFade: true }"
				:navigation="false"
				:grabCursor="true"
				:thumbs="{ swiper: thumbsSwiper }"
				:autoplay="{
					delay: 4000,
					disableOnInteraction: true,
				}"
				:pagination="{
					clickable: true,
				}"
			>
				<template #content="{ slider }">
 
					<img :src="`${slider}`" :alt="slider" class="object-cover mx-auto" />
				</template>
			</Slider> -->
			<!-- <Slider
				@swiper="setThumbsSwiper"
				:data="PRODUCT.slider"
				:spaceBetween="16"
				:slidesPerView="3"
				:freeMode="true"
				:watchSlidesProgress="true"
				:loop="false"
				:navigation="false"
				:grabCursor="true"
				:direction="'horizontal'"
				class="h-1/5 box-border !py-3 overflow-hidden"
			>
				<template #content="{ slider }">
					<img :src="`${slider}`" :alt="slider" class="object-cover" />
				</template>
			</Slider> -->
		</div>
		<div class="lg:col-span-4 col-span-full flex flex-col gap-6">
			<div>
				<h1 v-text="PRODUCT.title" class="!mb-2 text-2xl" />
				<strong class="text-lg">{{ PRODUCT.price }}<Svg svg="baseline-currency-ruble" class="w-5" /></strong>

				<div class="relative flex justify-center items-center col-span-2 self-center max-w-[5rem]">
					<Btn :disabled="+setCartTotal <= 1" @click="useCart().setCartMinus($route.params.url)"
						><span class="bg-main-darker w-4 h-4 flex justify-center items-center"><Svg svg="baseline-minus" /></span
					></Btn>
					<input
						type="text"
						class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700 max-w-[2rem] bg-transparent"
						:value="+setCartTotal"
					/>
					<Btn @click="useCart().setCartPlus($route.params.url, $route.params.list)"
						><span class="bg-main-darker w-4 h-4 flex justify-center items-center text-lg"><Svg svg="baseline-plus" /></span
					></Btn>
				</div>
			</div>

			<!-- <div class="flex justify-between gap-4 p-4">
				<dl>
					<dt class="text-lg">Цена:</dt>
					<dd>{{ PRODUCT.cena }} <Svg svg="baseline-currency-ruble" /></dd>
				</dl>
				<dl>
					<dt class="text-lg">Сумма:</dt>
					<dd>0 <Svg svg="baseline-currency-ruble" /></dd>
				</dl>
				<dl>
					<dt class="text-lg">Добавить:</dt>
					<dd>
						<Btn @click="addCart"><Svg svg="baseline-add-shopping-cart" /></Btn>
					</dd>
				</dl>
			</div> -->
			<!-- bg-gradient-to-tl from-dark/90 to-main-darker/70 shadow-lg -->
			<dl class="flex flex-col gap-4 p-4">
				<dt>Состав :</dt>
				<dd v-html="PRODUCT.sostav" />
				<dt>Способ применения:</dt>
				<dd v-html="PRODUCT.primeneniye" />
				<dt>Объём :</dt>
				<dd v-text="PRODUCT.obiyom" />
				<dt>Условия хранения:</dt>
				<dd v-html="PRODUCT.khraneniye" />
				<dt>Возрастные ограничения:</dt>
				<dd v-html="PRODUCT.ogranicheniye" />
			</dl>
		</div>
		<div class="col-span-full wrap">
			<dl class="lg:col-span-4 col-span-full border p-4 bg-gradient-to-tl from-main-darker/70 to-dark/90">
				<dt class="text-lg">Для Оптового Покупателя:</dt>
				<dd>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe non tempora nemo, laudantium consequuntur accusantium obcaecati
					tempore quis quod autem consequatur quibusdam vel, molestias quia accusamus atque, neque officia quisquam!
				</dd>
			</dl>
			<dl class="lg:col-span-4 col-span-full border p-4 bg-gradient-to-tr from-main-darker/70 to-dark/90">
				<dt class="text-lg">Смотреть товар в магазине:</dt>
				<dd>
					<Btn :to="PRODUCT.link_wildberries"><img src="/svg/wildberries.svg" alt="wildberries" class="w-80" /></Btn>
				</dd>
			</dl>
			<dl class="col-span-full border p-4 bg-gradient-to-br from-main-darker/70 to-dark/90">
				<dt>Описание:</dt>
				<dd v-html="PRODUCT.description" />
			</dl>
		</div>
		<!-- <span class="parallax" style="background-image: url(/img/bg2.webp)" /> -->
	</main>
</template>
