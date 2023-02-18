import { getModules } from './config/modules'
const isDev = process.env.NODE_ENV !== 'production'
const isHost = require('os').type() !== 'Linux'
import { resolve } from 'path'
export default defineNuxtConfig({
	telemetry: false,
	...(!isDev && {
		experimental: { writeEarlyHints: false },
	}),
	runtimeConfig: {
		public: {
			G_NAME: 'Akvamdeko',
			G_IMG: `${process.env.PUBLIC_NAME}/storage/app/media/`,
			PUBLIC_NAME:  isDev ? process.env.DEV : isHost ? process.env.DEV : process.env.PUBLIC_NAME,
		},
	},
	components: {
		dirs: ['~/components/element', '~/components/partial', '~/components/global'],
	},
	hooks: {
		'pages:extend'(routes) {
			routes.push({
				name: 'kategorii-list-url',
				path: '/kategorii/:list/:url',
				file: resolve('./pages/kategorii/[list]/[url].vue'),
			})
		},
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
