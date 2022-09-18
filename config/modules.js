const getModules = (isDev) => {
	if (isDev) {
		return ['@nuxtjs/stylelint-module', '@nuxtjs/eslint-module', '@pinia/nuxt', '@nuxtjs/tailwindcss']
	} else {
		return ['@pinia/nuxt', '@nuxtjs/tailwindcss']
	}
}

export { getModules }
