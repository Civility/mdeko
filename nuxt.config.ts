import { getModules } from './config/modules'
const isDev = process.env.NODE_ENV !== 'production'
const isHost = require('os').type() !== 'Linux'
export default defineNuxtConfig({
	telemetry: false,
	...(!isDev && {
		experimental: { writeEarlyHints: false },
	}),
	runtimeConfig: {
		public: {
			G_NAME: 'Akvamdeko',
			G_IMG: `${process.env.PUBLIC_NAME}/storage/app/media/`,
			PUBLIC_NAME: isHost || isDev ? process.env.DEV : process.env.PUBLIC_NAME,
		},
	},
	components: {
		dirs: ['~/components/element', '~/components/partial', '~/components/global'],
	},
	modules: getModules(),

	postcss: {
		plugins: {
			'tailwindcss/nesting': {},
			autoprefixer: {},
			'postcss-responsive-type': {}
		},
	},

	tailwindcss: {
		cssPath: '~/assets/tailwind.css',
		viewer: true,
		exposeConfig: true,
	},
})
