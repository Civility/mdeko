const getModules = (isDev) => {
	if (isDev) {
		return ['@nuxtjs/stylelint-module', '@nuxtjs/eslint-module', '@pinia/nuxt', '@nuxtjs/tailwindcss', 'nuxt-icon', 'nuxt-swiper']
	} else {
		return ['@pinia/nuxt', '@nuxtjs/tailwindcss', 'nuxt-icon', 'nuxt-swiper']
	}
}

export { getModules }
