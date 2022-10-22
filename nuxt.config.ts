import { getModules } from './config/modules'
import { getTailwind, getGoogleFonts } from './config/modules/configModules'
const isDev = process.env.NODE_ENV !== 'production'
export default defineNuxtConfig({
	telemetry: false,
	runtimeConfig: {
		public: {
			G_NAME: 'Akvamdeko',
			G_BASEURL: process.env.NUXT_PUBLIC_API_BASE_URL,
			// browserBaseURL
		},
	},

	meta: {
		title: 'MDeko',
		htmlAttrs: { lang: 'ru' },
		meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
		// link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
	components: {
		dirs: ['~/components/element', '~/components/partial', '~/components/global'],
	},

	modules: getModules(isDev),
	googleFonts: getGoogleFonts(),

	_tailwindcss: getTailwind(),
	get tailwindcss() {
		return this._tailwindcss
	},
	set tailwindcss(value) {
		this._tailwindcss = value
	},

	postcss: {
		plugins: {
			'tailwindcss/nesting': {},
		},
	},
})
