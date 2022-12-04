// import { fileURLToPath } from 'node:url'
// const srcDir = fileURLToPath(new URL('../', import.meta.url))
module.exports = {
	// content: [
	// 	`${srcDir}/components/**/*.{vue,js,ts}`,
	// 	`${srcDir}/layouts/**/*.vue`,
	// 	`${srcDir}/pages/**/*.vue`,
	// 	`${srcDir}/composables/**/*.{js,ts}`,
	// 	`${srcDir}/plugins/**/*.{js,ts}`,
	// 	`${srcDir}/App.{js,ts,vue}`,
	// 	`${srcDir}/app.{js,ts,vue}`,
	// 	`${srcDir}/Error.{js,ts,vue}`,
	// 	`${srcDir}/error.{js,ts,vue}`,
	// ],
	safelist: ['text-main', 'text-sec', 'text-some', 'bg-main', 'bg-sec', 'bg-some'],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
			},
			screens: {
				xl: '1536px',
			},
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			xxl: '1536px',
		},
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
				1.5: '0.375rem', // 6px
				7.5: '1.875rem', // 30px
				15: '3.75rem', // 60px
			},
			borderRadius: {
				circle: '50%',
			},
		},
	},
}
