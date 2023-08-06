import { VueReCaptcha } from 'vue-recaptcha-v3'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(VueReCaptcha, {
		siteKey: '6Lf2uoUnAAAAAJGyPs_PHTec68tDeGRZ5pfoDOqa',
		loaderOptions: {
			autoHideBadge: true
			// explicitRenderParameters: {
			// 	badge: 'bottomleft',
			// },
		}
	})
})
