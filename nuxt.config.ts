import { getModules } from './config/modules'
import { getTailwind, getGoogleFonts } from './config/modules/configModules'
const isDev = process.env.NODE_ENV !== 'production'
export default defineNuxtConfig({
	telemetry: false,
	meta: {
		title: 'MDeko',
		htmlAttrs: { lang: 'ru' },
		meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
		// link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
	components: {
		dirs: ['~/components/element', '~/components/partial', '~/components/shared'],
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
