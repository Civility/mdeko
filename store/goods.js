import { defineStore } from 'pinia'

const sortOrder = (a, b) => {
	return a.order > b.order ? -1 : 1
}

export const useGoods = defineStore('goods', {
	state: () => ({
		CATEGORIES: [],
		HITS: [],
		// TOVARI: [],
		PRODUCT: {},
		TOVARI: {},

		CATEGORYACTIVE: '' // активнй пункт меню в категории
	}),
	getters: {
		// categories: (s) => s.CATEGORIES,
		// hits: (s) => s.HITS,
		// tovari: (s) => s.TOVARI,
		// product: (s) => s.PRODUCT,
		// categoryactive: (s) => s.CATEGORYACTIVE,
		categoryItem: (s) => s.CATEGORIES.find((i) => i.url === s.CATEGORYACTIVE)
		// tovarItem: (s) => s.CATEGORIES.find(i => i.url === s.CATEGORYACTIVE)
	},
	actions: {
		setCategoryActive(url) {
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
					this.HITS = API.sort(sortOrder)
				} catch (err) {
					console.log(err)
				}
			}
		},

		async getTovari(route) {
			this.setCategoryActive(route)
			try {
				if (!this.TOVARI[route]) {
					const API = await $fetch(`${useRuntimeConfig().public.API}/categories/${route}`)
					this.TOVARI = API.sort(sortOrder)
					this.TOVARI[route] = API.sort(sortOrder)
				}
			} catch (err) {
				console.log(err)
			}
		}
	}
})
