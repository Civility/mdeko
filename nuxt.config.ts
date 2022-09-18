import { getModules } from './config/modules'
import { getTailwind, getGoogleFonts } from './config/modules/configModules'
const isDev = process.env.NODE_ENV !== 'production'
export default defineNuxtConfig({
	telemetry: false,
	meta: {
		title: 'Goods',
		htmlAttrs: { lang: 'ru' },
		meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			// {
			// 	rel: 'dns-prefetch',
			// 	href: 'https://fonts.gstatic.com/',
			// },
			// {
			// 	rel: 'preconnect',
			// 	href: 'https://fonts.gstatic.com',
			// },

			// {
			// 	rel: 'stylesheet',
			// 	href:
			// 		'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&family=Roboto+Flex:opsz,wght@8..144,300;8..144,500;8..144,700&display=swap',
			// },
		],
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
