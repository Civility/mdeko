<template>
  <main>
    <div
      class="banner relative h-[90vh] bg-no-repeat bg-cover bg-scroll"
      style="background-image: url('/img/bg.webp');"
    >
      <div
        class="flex flex-col justify-center items-center w-full h-full gap-12"
      >
        <Btn
          class="shadow-neon z-10 min-w-[14rem] uppercase"
          :href="`tel:${PHONESPB}`"
        >
          <i class="border border-main-lighter rounded-full w-10 h-10">
            <img
              src="/assets/svg/telegram.svg"
              width="24"
              height="24"
              alt="phone"
            />
          </i>
          Telegram
        </Btn>

        <Btn
          class="shadow-neon z-10 min-w-[14rem] uppercase"
          :href="`tel:${phoneMSK}`"
        >
          <i class="border border-main-lighter rounded-full w-10 h-10">
            <img
              src="/assets/svg/whatsapp.svg"
              width="24"
              height="24"
              alt="phone"
            />
          </i>
          Whatsapp
        </Btn>
        <div
          class="absolute w-[90vw] h-[80vh] bg-white bg-opacity-20 backdrop-blur rounded-md shadow-neon"
        />
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
