<script setup>
import { storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'

const route = useRoute()
const { getProduct } = useGoods()
const { product } = storeToRefs(useGoods())
const {
	pending: productWait,
	data: productData,
	refresh,
} = await useLazyAsyncData('product', () => getProduct(route.params.list, route.params.url))

const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper) => (thumbsSwiper.value = swiper)
const addCart = ref('#')
</script>

<template>
	<main class="md:py-15 py-10 container wrap">
		<div class="lg:col-span-4 col-span-full">
			<Slider
				:data="product.slider"
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
					<img :src="`${slider}`" :alt="slider" class="block object-cover max-h-[700px] mb-8" />
				</template>
			</Slider>
			<Slider
				@swiper="setThumbsSwiper"
				:data="product.slider"
				:spaceBetween="32"
				:slidesPerView="3"
				:freeMode="true"
				:watchSlidesProgress="true"
				:loop="false"
				:navigation="false"
				:grabCursor="true"
				:direction="'horizontal'"
			>
				<template #content="{ slider }">
					<div class="w-10"><img :src="`${slider}`" :alt="slider" class="object-cover" /></div>
				</template>
			</Slider>
		</div>
		<div class="lg:col-span-4 col-span-full flex flex-col gap-6">
			<h1 v-text="product.title" class="!mb-2" />

			<dl class="flex flex-col gap-4 p-4 bg-gradient-to-tl from-dark/90 to-main-darker/70 shadow-lg">
				<dt>Состав :</dt>
				<dd v-html="product.sostav" />
				<dt>Способ применения:</dt>
				<dd v-html="product.primeneniye" />
				<dt>Объём :</dt>
				<dd v-text="product.obiyom" />
				<dt>Условия хранения:</dt>
				<dd v-html="product.khraneniye" />
				<dt>Возрастные ограничения:</dt>
				<dd v-html="product.ogranicheniye" />
			</dl>
			<div class="flex justify-between gap-4 p-4 bg-gradient-to-tl from-main-darker/70 to-dark/90">
				<dl>
					<dt class="text-lg">Цена:</dt>
					<dd>{{ product.cena }} <Svg svg="baseline-currency-ruble" /></dd>
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
			</div>
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
					<Btn :to="product.link_wildberries"><img src="/svg/wildberries.svg" alt="wildberries" class="w-80" /></Btn>
				</dd>
			</dl>
			<dl class="col-span-full border p-4 bg-gradient-to-br from-main-darker/70 to-dark/90">
				<dt>Описание:</dt>
				<dd v-html="product.description" />
			</dl>
		</div>
		<span class="parallax" style="background-image: url(/img/bg2.webp)" />
	</main>
</template>
