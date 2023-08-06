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
		head: {
			titleTemplate: '%pageTitle %titleSeparator %siteName',
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1'
		}
	},
	// seoKit: {
	// 	linkChecker: {
	// 		failOn404: true
	// 	}
	// },

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
