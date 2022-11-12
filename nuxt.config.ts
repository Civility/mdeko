import { getModules } from './config/modules'
import { getTailwind, getGoogleFonts } from './config/modules/configModules'
const isDev = process.env.NODE_ENV !== 'production'

export default defineNuxtConfig({
	telemetry: false,
	// ...(!isDev && {
	// 	experimental: { writeEarlyHints: false },
	// }),
	runtimeConfig: {
		public: {
			G_NAME: 'Akvamdeko',
			G_IMG: `${process.env.PUBLIC_NAME}/storage/app/media/`,
			PUBLIC_NAME: `${process.env.PUBLIC_NAME}`,
		},
	},

	meta: {
		htmlAttrs: { lang: 'ru' },
		viewport: 'width=device-width, initial-scale=1',
		title: 'MDeko',
		meta: [{ name: 'description', content: 'My amazing site.' }],
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
