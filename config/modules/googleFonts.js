const getGoogleFonts = () => {
	return {
		prefetch: true,
		preconnect: true,
		preload: true,
		//  download: true,
		families: {
			'Roboto+Flex': [300, 500, 700],
			'Roboto+Condensed': [400, 700],
		},
		display: 'swap',
		subsets: 'cyrillic',
	}
}

export { getGoogleFonts }
