import { getScreens } from './../screens'
const getTailwind = () => {
	return {
		cssPath: '~/assets/tailwind.css',
		viewer: true,
		// exposeConfig: true,
		config: {
			theme: {
				container: {
					center: true,
					padding: {
						DEFAULT: '1rem',
					},
					screens: {
						xl: getScreens().xl + 'px',
					},
				},
				screens: {
					xs: getScreens().xs + 'px',
					sm: getScreens().sm + 'px',
					md: getScreens().md + 'px',
					lg: getScreens().lg + 'px',
					xl: getScreens().xl + 'px',
					xxl: getScreens().xxl + 'px',
				},
			},
		},
	}
}

export { getTailwind }
