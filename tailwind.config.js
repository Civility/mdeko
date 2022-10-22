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
	safelist: ['text-main', 'text-sec', 'text-some', 'bg-main', 'bg-sec', 'bg-some'],
	darkMode: 'media',
	theme: {
		colors: {
			white: '#FFF',
			black: '#000',
			dark: '#0B0006',
			green: '#3AE06C',
			orange: '#D6654D',
			red: '#D91D0B',
			gray: '#e3e3e3',
			transparent: 'transparent',
			main: {
				// lighter: '#9CB4A5',
				// light: '#94B4A0',
				// // DEFAULT: '#929C53',
				// DEFAULT: '#506959',
				// dark: '#414F46',
				// darker: '#1A442A',
				lighter: '#77C88F',
				light: '#59C87B',
				DEFAULT: '#269046',
				dark: '#306C42',
				darker: '#0C5E25',
			},
			sec: {
				lighter: '#C6CE99',
				light: '#C3CE85	',
				DEFAULT: '#929C53',
				dark: '#6F754C',
				darker: '#5B651B',
			},
			some: {
				lighter: '#E89489',
				light: '#E87667',
				DEFAULT: '#D14836',
				dark: '#9D5046',
				darker: '#881F12',
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
