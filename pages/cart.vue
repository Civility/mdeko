 <script setup>
import { storeToRefs } from 'pinia'
import { useCart } from '@/store/cart.js'
import { useGoods } from '@/store/goods.js'
const { getHits } = useGoods()
const { pending: getHitsWait } = await useAsyncData('setGetHits', () => getHits())
const { CARTS } = storeToRefs(useCart())
const { HITS } = storeToRefs(useGoods())
</script>
 <template>
	<main class="cart md:py-15 py-10 container">
		<h1 class="capitalize">Корзина</h1>
		<div v-if="!CARTS.length">
			<h3 class="mb-12 md:mb-20">Ваша корзина пуста</h3>
			<section v-if="!getHitsWait">
				<h2 class="text-center col-span-full"><span class="inline-block">Сезонное предложение</span></h2>
				<div class="wrap-full">
					<CardItem v-for="item in HITS" :key="item.url" :data="item" class="sm:col-span-4 col-span-full" />
				</div>
			</section>
		</div>
		<div class="flex flex-col gap-6" v-else>
			<div class="relative p-6 wrap-full bg-main/70 text-dark" v-for="(item, index) in CARTS" :key="index">
				<Btn
					@click="useCart().setCartDel(index)"
					class="!absolute !top-0 !right-0 m-2 !text-white hover:!text-white/70 border rounded-full border-white w-7 h-7 hover:border-white/70"
				>
					<Svg svg="round-close" />
				</Btn>

				<div class="md:col-span-1 col-span-1">
					<img v-if="item.product.img.mini" class="w-full" :src="item.product.img.mini" :alt="item.product.title" />
				</div>
				<div class="md:col-span-11 col-span-7 wrap gap-4">
					<div class="col-span-3 flex flex-col">
						<!-- ${item.product.category}/ -->
						<NuxtLink :to="`/kategorii/${item.product.category}/${item.product.url}`">
							<span class="font-bold">{{ item.product.title }}</span>
						</NuxtLink>
						<span class="text-gray">{{ item.product.category }}</span>
					</div>
					<div class="text-dark col-span-2 text-lg">{{ item.product.price }}<Svg svg="baseline-currency-ruble" /></div>
					<div class="relative flex justify-center items-center col-span-2 self-center max-w-[5rem]">
						<Btn :disabled="item.total <= 1" @click="useCart().setCartMinus(item.product.url)"
							><span class="bg-main-darker w-4 h-4 flex justify-center items-center"><Svg svg="baseline-minus" /></span
						></Btn>
						<input
							type="text"
							class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700 max-w-[2rem] bg-transparent"
							:value="item.total"
						/>
						<Btn @click="useCart().setCartPlus(item.product.url)"
							><span class="bg-main-darker w-4 h-4 flex justify-center items-center text-lg"><Svg svg="baseline-plus" /></span
						></Btn>
					</div>
				</div>
			</div>
			<Btn main to="/checkout">Перейти к оформлению</Btn>
		</div>
		<span class="parallax" style="background-image: url(/img/bg3.webp)" />
	</main>
</template>
<style lang="postcss" scoped>
</style>
 