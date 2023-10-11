const isDev = process.env.NODE_ENV !== 'production'
import { resolve } from 'path'
// const isHost = require('os').type() !== 'Linux'
// API = 'https://api-akvamdeko.na4u.ru/wp-json/api'
// YANDEX_METRIKA_ID = '94570298'
// GTAG_ID = 'G-B6NMNPZMFG'
// recaptcha пользователей - 6Lf2uoUnAAAAAJGyPs_PHTec68tDeGRZ5pfoDOqa
// recaptcha секретный - 6Lf2uoUnAAAAAG1_Q5RDOT2lY6XuLef2hnen8RMJ
export default defineNuxtConfig({
	telemetry: false,
	...(!isDev && {
		experimental: { writeEarlyHints: false }
	}),
	runtimeConfig: {
		public: {
			G_NAME: 'Akvamdeko',
			G_IMG: `${process.env.API}/storage/app/media`,
			API: `${process.env.API}/api`,
			siteUrl: 'https://akvamdeko.ru',
			siteName: 'МДЕКО',
			siteDescription: 'АкваМДЕКО - Минеральные удобрения от производителя',
			language: 'ru',
			titleSeparator: '|',
			trailingSlash: true
		}
	},
	components: {
		dirs: ['~/components/element', '~/components/partial', '~/components/global']
	},
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
		head: {
			titleTemplate: '%pageTitle %titleSeparator %siteName',
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			meta: [{ name: 'yandex-verification', content: '31984516f1b5c499' }],
			link: [
				{ rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
				{ rel: 'icon', sizes: '32x32', type: 'image/png', href: '/favicon-32x32.png' },
				{ rel: 'icon', sizes: '16x16', type: 'image/png', href: '/favicon-16x16.png' },
				{ rel: 'shortcut icon', href: '/favicon.ico' },
				{ rel: 'manifest', href: '/site.webmanifest' }
			]
		}
	},
	// routeRules: {
	// 	'/proxy/example': { proxy: 'https://example.com' },
	// 	'/proxy/**': { proxy: '/api/**' }
	// },

	modules: [
		'@pinia/nuxt',
		'@nuxtjs/tailwindcss',
		'nuxt-swiper',
		'nuxt-icons'
		// [
		// 	'nuxt-gtag',
		// 	{
		// 		id: `${process.env.GTAG_ID}`
		// 	}
		// ],
		// [
		// 	'@artmizu/yandex-metrika-nuxt',
		// 	{
		// 		id: `${process.env.YANDEX_METRIKA_ID}`,
		// 		webvisor: false,
		// 		clickmap: true,
		// 		trackLinks: true,
		// 		accurateTrackBounce: true
		// 	}
		// ]
	],

	hooks: {
		'pages:extend'(routes) {
			routes.push({
				name: 'catalog-category-slug',
				path: '/catalog/:category/:slug',
				file: resolve('./pages/catalog/[category]/[slug]/[index].vue')
			})
		}
	},

	extends: ['nuxt-seo-kit'],
	postcss: {
		plugins: {
			'tailwindcss/nesting': {},
			autoprefixer: {},
			'postcss-responsive-type': {}
		}
	},

	tailwindcss: {
		cssPath: '~/assets/tailwind.css',
		viewer: true,
		exposeConfig: true
	}
})
