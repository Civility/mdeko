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
	safelist: ['text-main', 'text-sec', 'text-sec', 'bg-main', 'bg-sec', 'bg-sec'],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem'
			},
			screens: {
				xl: '1280px'
			}
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			xxl: '1536px'
		},
		colors: {
			white: '#FFF',
			black: '#000',
			dark: '#041611',
			green: '#116646',
			orange: '#D6654D',
			red: '#D91D0B',

			transparent: 'transparent',
			gray: {
				// light: '#ebeae9',
				DEFAULT: '#A8A8A8',
				dark: '#606060'
				// darker: '#75797d',
			},
			main: {
				lighter: '#419139',
				light: '#116646',
				DEFAULT: '#09302A',
				dark: '#072421',
				darker: '#041611'
				// darked: '#A8A8A8',
			},
			sec: {
				lighter: '#A3C1A4',
				light: '#919F8E	',
				DEFAULT: '#1D9A49',
				dark: '#0D1D15'
				// darker: '#0D1D15',
			}
			// sec: {
			// lighter: '#afb8a2',
			// light: '#419139',
			// DEFAULT: '#A3C1A4',
			// dark: '#606060',
			// darker: '#606060',
			// },
		},

		fontFamily: {
			main: ['FuturaFuturisLightC', 'sans-serif'],
			sec: ['MyriadProRegular', 'sans-serif'],
			display: ['KarminaBold', 'sans-serif']
		},

		extend: {
			fontSize: {
				small: ['0.625rem'],
				'3xl': ['1.75rem'], // 28px
				'4xl': ['2.5rem'], // 40px
				'5xl': ['3.125rem'] // 50px
			},
			spacing: {
				1.5: '0.375rem', // 6px
				7.5: '1.875rem', // 30px
				15: '3.75rem' // 60px
			},
			borderRadius: {
				circle: '50%'
			},
			borderWidth: {
				10: '10px',
				12: '12px',
				14: '14px',
				16: '16px',
				18: '18px'
			}
		}
	}
}
