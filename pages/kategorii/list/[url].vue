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
const isCartTotal = ref({})

const cartTotal = computed(() => CARTS.value.find((i) => i.product.url === route.params.url))
const setCartTotal = computed(() => (isCartTotal.value.total ?? typeof cartTotal.value != 'undefined' ? cartTotal.value.total : 0))

watch(
	CARTS.value,
	(state) => {
		isCartTotal.value = state.find((i) => i.product.url === route.params.url)
	},
	{ deep: true }
)

const tab = ref(0)
const isTab = (id) => {
	tab.value = id
}
const titleTab = [
	{ title: 'Состав', icon: 'baseline-spa' },
	{ title: 'Способ применения', icon: 'baseline-wash' },
	{ title: 'Условия хранения', icon: 'baseline-roofing' },
	{ title: 'Возрастные ограничения', icon: 'baseline-dangerous' },
]
</script>

<template>
	<main class="!pt-[20vh] md:py-15 py-10 container wrap">
		<div class="lg:col-span-4 col-span-full flex max-h-96">
			<Slider
				@swiper="setThumbsSwiper"
				:data="PRODUCT.slider"
				:spaceBetween="16"
				:slidesPerView="3"
				:direction="'vertical'"
				:freeMode="true"
				:watchSlidesProgress="true"
				:loop="false"
				:navigation="false"
				:grabCursor="true"
				class="w-[30%]"
			>
				<template #content="{ slider }">
					<img :src="`${slider}`" :alt="slider" class="object-cover" />
				</template>
			</Slider>

			<Slider
				:data="PRODUCT.slider"
				:spaceBetween="10"
				:slidesPerView="1"
				:mousewheel="true"
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
				class="w-auto"
			>
				<template #content="{ slider }">
					<img :src="`${slider}`" :alt="slider" class="object-cover mx-auto" />
				</template>
			</Slider>
		</div>
		<div class="lg:col-span-4 col-span-full">
			<div class="flex flex-col gap-2">
				<h1 v-text="PRODUCT.title" class="text-2xl !mb-2" />
				<div class="flex gap-6 items-end">
					<strong class="text-lg block">{{ PRODUCT.price }}<Svg svg="baseline-currency-ruble" class="w-5" /></strong>

					<div class="relative flex justify-center items-center col-span-2 self-start max-w-[5rem] border">
						<Btn :disabled="+setCartTotal <= 0" @click="useCart().setCartMinus($route.params.url)"
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
					<strong class="text-lg block">{{ PRODUCT.price * setCartTotal }}<Svg svg="baseline-currency-ruble" class="w-5" /></strong>
				</div>
				<Btn :to="PRODUCT.link_wildberries" class="!justify-start"><img src="/svg/wildberries.svg" alt="wildberries" class="w-80" /></Btn>

				<div class="wrap gap-0">
					<div class="col-span-3">
						<ul
							v-for="(item, id) in titleTab"
							:key="id"
							class="flex gap-8 odd:bg-gray-light even:bg-gray"
							:class="{ '!bg-main-lighter  ': id === tab }"
						>
							<li class="relative w-full text-left">
								<Btn glue @click="isTab(id)" class="flex gap-2 !text-dark !text-sm !text-left" :class="{ '!text-white': id === tab }"
									><Svg :svg="item.icon" v-if="item.icon" />{{ item.title }}</Btn
								>
							</li>
						</ul>
					</div>
					<div class="col-span-5 bg-main-lighter text-dark px-8 py-3">
						<span v-html="PRODUCT.sostav" v-show="0 === tab" />
						<span v-html="PRODUCT.primeneniye" v-show="1 === tab" />
						<span v-html="PRODUCT.obiyom" v-show="2 === tab" />
						<span v-html="PRODUCT.khraneniye" v-show="3 === tab" />
						<span v-html="PRODUCT.ogranicheniye" v-show="4 === tab" />
						<!-- <div v-for="(item, id) in data" :key="id">
							<span v-show="id === tab" class="flex">
								<div class="w-full max-w-xs flex items-center">
									<img v-if="item.photo" :src="item.photo" :alt="item.title" />
								</div>
								<div v-html="item.text" class="w-full py-3 px-8" />
							</span>
						</div> -->
					</div>
				</div>
			</div>
		</div>
		<div class="col-span-full wrap">
			<dl class="col-span-full mb-6">
				<dt class="text-lg">Описание:</dt>
				<dd v-html="PRODUCT.text" />
				<dd v-html="PRODUCT.description" />
			</dl>

			<dl class="col-span-full mb-6">
				<dt class="text-lg">Для Оптового Покупателя:</dt>
				<dd>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe non tempora nemo, laudantium consequuntur accusantium obcaecati
					tempore quis quod autem consequatur quibusdam vel, molestias quia accusamus atque, neque officia quisquam!
				</dd>
			</dl>
		</div>
		<!-- <span class="parallax" style="background-image: url(/img/bg2.webp)" /> -->
	</main>
</template>
