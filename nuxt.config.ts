import { getModules } from './config/modules'
import { getTailwind } from './config/modules/configModules'
const isDev = process.env.NODE_ENV !== 'production'
export default defineNuxtConfig({
	telemetry: false,
	meta: {
		title: 'Goods',
		htmlAttrs: { lang: 'ru' },
		meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&family=Roboto:wght@100;300;400&display=swap',
			},
		],
	},
	components: {
		dirs: ['~/components/element', '~/components/partial', '~/components/shared'],
	},

	modules: getModules(isDev),

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
			// 'postcss-nesting': {},
		},
	},
})
