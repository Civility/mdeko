import { Vue3Mq } from 'vue3-mq'
import { getScreens } from '@/config/screens'
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(Vue3Mq, {
		// preset: 'tailwind',
		breakpoints: {
			xs: getScreens().xs,
			sm: getScreens().sm,
			md: getScreens().md,
			lg: getScreens().lg,
			xl: getScreens().xl,
			xxl: getScreens().xxl,
		},
		defaultBreakpoint: 'xl',
	})
})
