module.exports = {
	mode: 'jit',
	content: [
		'./components/**/*.{vue,js}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{vue,js}',
		'./app.vue',
		// './nuxt.config.{js,ts}',
	],
	darkMode: 'media',
	theme: {
		colors: {
			white: '#FFF',
			black: '#000',
			dark: '#0B0006',
			green: '#3AE06C',
			orange: '#D6654D',
			red: '#D91D0B',
			transparent: 'transparent',
			main: {
				lighter: '#66E08B',
				light: '#3AE06C',
				DEFAULT: '#03C03C',
				dark: '#269046',
				darker: '#017D26',
			},
			sec: {
				lighter: '#EBA698',
				light: '#EB8D7A',
				DEFAULT: '#D6654D',
				dark: '#A16153',
				darker: '#8B2D19',
			},
			some: {
				lighter: '#499892',
				light: '#2D9890',
				DEFAULT: '#03302D',
				dark: '#0B2422',
				darker: '#011F1D',
			},
		},

		fontFamily: {
			main: ['Roboto Flex', 'sans-serif'],
			header: ['Roboto Condensed', 'sans-serif'],
		},

		extend: {
			fontSize: {
				small: ['50%'],
				'3xl': ['1.625rem'], // 26px
				'4xl': ['2.5rem'], // 40px
				'5xl': ['2.875rem'], // 46px
			},
			spacing: {
				'1.5': '0.375rem', // 6px
				'7.5': '1.875rem', // 30px
				'15': '3.75rem', // 60px
			},
		},
	},
}
