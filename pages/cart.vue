 <script setup>
import { storeToRefs } from 'pinia'
import { useCart } from '@/store/cart.js'
import { useGoods } from '@/store/goods.js'
const { CARTS } = storeToRefs(useCart())
const { getHits, hits } = useGoods()

const config = useRuntimeConfig()
const { pending: hitsWait } = await useLazyAsyncData('hits', () => getHits(config.public.PUBLIC_NAME))
</script>
 <template>
	<main class="cart md:py-15 py-10 container">
		<h1 class="capitalize title-b">Корзина</h1>
		<div v-if="!CARTS.length">
			<ClientOnly>
				<h3 class="mb-12 md:mb-20">Ваша корзина пуста</h3>
				<section v-if="hits.length">
					<h2 class="text-center col-span-full"><span class="title-b inline-block">Сезонное предложение</span></h2>
					<div class="wrap-full">
						<CardItem v-for="item in hits" :key="item.url" :data="item" class="sm:col-span-4 col-span-full" />
					</div>
				</section>
			</ClientOnly>
		</div>
		<div class="flex flex-col gap-6" v-else>
			<div class="relative p-6 wrap-full bg-white/70 text-dark" v-for="(item, index) in CARTS" :key="index">
				<Btn
					@click="useCart().setCartDel(index)"
					class="!absolute !top-0 !right-0 m-2 !text-main-dark hover:!text-main border rounded-full border-main-dark w-7 h-7 hover:border-main"
					>x</Btn
				>
				<div class="md:col-span-1 col-span-1">
					<img class="w-full" :src="item.product.img" :alt="item.product.title" />
				</div>
				<div class="md:col-span-11 col-span-7 wrap gap-4">
					<NuxtLink :to="`kategorii/${item.product.category}/${item.product.url}`" class="col-span-3">{{ item.product.title }}</NuxtLink>

					<div class="relative flex justify-center items-center border border-sec col-span-2 self-center max-w-[4rem]">
						<Btn :disabled="item.total <= 1" @click="useCart().setCartMinus(item.product.url, 1)">-</Btn>
						<input
							type="text"
							class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700 max-w-[2rem] bg-transparent"
							:value="item.total"
						/>
						<Btn @click="useCart().setCartPlus(item.product.url)">+</Btn>
					</div>
				</div>
			</div>
		</div>
		<span class="parallax" style="background-image: url(/img/bg3.webp)" />
	</main>
</template>
<style lang="postcss" scoped>
</style>
 