import { getModules } from './config/modules'
const isDev = process.env.NODE_ENV !== 'production'
// const isHost = require('os').type() !== 'Linux'
import { resolve } from 'path'
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
			G_IMG: `${process.env.API}/storage/app/media/`,
			API: process.env.API,
			siteUrl: 'http://akvamdeko.na4u.ru/',
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
		head: {
			titleTemplate: '%pageTitle %titleSeparator %siteName',
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			link: [
				{ rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
				{ rel: 'icon', sizes: '32x32', type: 'image/png', href: '/favicon-32x32.png' },
				{ rel: 'icon', sizes: '16x16', type: 'image/png', href: '/favicon-16x16.png' },
				{ rel: 'shortcut icon', href: '/favicon.ico' },
				{ rel: 'manifest', href: '/site.webmanifest' }
			]
		}
	},
	extends: ['nuxt-seo-kit'],
	modules: getModules(),
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
