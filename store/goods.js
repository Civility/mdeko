import { defineStore } from 'pinia'

const sortOrder = (a, b) => {
	return a.order > b.order ? -1 : 1
}

export const useGoods = defineStore('goods', {
	state: () => ({
		CATEGORIES: [],
		HITS: [],
		TOVARI: [],
		PRODUCT: {},
		CATEGORYACTIVE: '', // активнй пункт меню в категории
	}),
	// getters: {
	// categories: (s) => s.CATEGORIES,
	// hits: (s) => s.HITS,
	// tovari: (s) => s.TOVARI,
	// product: (s) => s.PRODUCT,
	// categoryactive: (s) => s.CATEGORYACTIVE,
	// },
	actions: {

		getCategoryActive(url) {
			this.CATEGORYACTIVE = url
		},
		// /category/item
		async getProduct(category, path) {
			try {
				this.PRODUCT = await $fetch(`${useRuntimeConfig().public.API}/categories/${category}/${path}`)
			} catch (err) {
				console.log(err)
			}
		},
		async getCategories() {
			if (!this.CATEGORIES.length) {
				try {
					const API = await $fetch(`${useRuntimeConfig().public.API}/categories`)
					const maxOrder = API.map((item) => item.order)
					// const categoryURL = API.find(item => item.order === Math.max(...maxOrder)  )
					// this.CATEGORYACTIVE = categoryURL.url
					return (this.CATEGORIES = API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
			}
		},
		async getHits() {
			if (!this.HITS.length) {
				try {
					const API = await $fetch(`${useRuntimeConfig().public.API}/products/hits`)
					return (this.HITS = await API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
			}
		},

		async getTovari(categoryUrlActive) {
			if (!this.TOVARI.length) {
				try {
					const API = await $fetch(`${useRuntimeConfig().public.API}/categories/${categoryUrlActive}`)

					this.TOVARI = API.sort(sortOrder)
				} catch (err) {
					console.log(err)
				}
			}
		},
	},
})
