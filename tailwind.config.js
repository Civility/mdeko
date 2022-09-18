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
			dark: '#222',
			green: '#13A463',
			orange: '#DE6B00',
			red: '#D91D0B',
			transparent: 'transparent',
			disabled: '#D5D8DE',
			main: {
				lighter: '#F385B9',
				light: '#F35CA4',
				DEFAULT: '#e82882',
				dark: '#AE4275',
				darker: '#970D4E',
			},
			sec: {
				lighter: '#C69ED2',
				light: '#C28BD2',
				DEFAULT: '#945AA4',
				dark: '#bc13fe',
				darker: '#5A1D6B',
			},
			some: {
				light: '#7086AA',
				DEFAULT: '#2E3D54',
				dark: '#0F1E37',
			},
		},

		fontFamily: {
			main: ['Rubik', 'sans-serif'],
			neon: ['Yellowtail', 'cursive'],
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
			boxShadow: {
				neon: '0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem #bc13fe, 0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe',
			},
		},
	},
}
