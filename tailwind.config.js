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
				lighter: '#C6CE99',
				light: '#C3CE85',
				DEFAULT: '#929C53',
				dark: '#6F754C',
				darker: '#5B651B',
			},
			sec: {
				lighter: '#A9B288',
				light: '#A5B278	',
				DEFAULT: '#5B6439',
				dark: '#464B33',
				darker: '#374113',
			},
			some: {
				lighter: '#85936F',
				light: '#809362',
				DEFAULT: '#212816',
				dark: '#1A1E14',
				darker: '#131A07',
			},
		},

		fontFamily: {
			main: ['Roboto Flex', 'sans-serif'],
			display: ['Roboto Condensed', 'sans-serif'],
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
