<template>
	<main>
		<div class="banner relative h-[90vh] bg-no-repeat bg-cover bg-scroll" style="background-image: url('/assets/img/bg.webp');">
			<div class="flex flex-col justify-center items-center w-full h-full gap-12">
				<Btn class=" " :href="`tel:${PHONESPB}`">
					<img src="/assets/svg/telegram.svg" width="24" height="24" alt="phone" />

					Telegram
				</Btn>

				<Btn class=" " :href="`tel:${PHONEMSK}`">
					<img src="/assets/svg/whatsapp.svg" width="24" height="24" alt="phone" />

					Whatsapp
				</Btn>

				<!-- v-if="useMq().mdPlus" -->
			</div>
		</div>
		<div class="wrap-full lg:gap-10 container xl:py-14 md:py-10 py-8"></div>
	</main>
</template>

<script setup>
// import { useMq } from 'vue3-mq'
import { storeToRefs, mapActions } from 'pinia'
import { useMainStore } from '@/store/main.js'

const { PHONESPB, PHONEMSK } = useMainStore()
// const { pending: goodsWait, data: goods } = await useLazyAsyncData('goods', () => getGoods())
</script>
<!--style scoped lang="postcss">
 
</style-->
