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
		CATEGORYACTIVE: useRoute().params.url, // активнй пункт меню в категории
	}),
	getters: {
		categories: (s) => s.CATEGORIES,
		hits: (s) => s.HITS,
		tovari: (s) => s.TOVARI,
		product: (s) => s.PRODUCT,
		categoryactive: (s) => s.CATEGORYACTIVE,
	},
	actions: {
		getCategoryActive(url) {
			this.CATEGORYACTIVE = url
		},
		// /category/item
		async getProduct(PUBLIC_NAME, path) {
			try {
				this.PRODUCT = await $fetch(`${PUBLIC_NAME}/categories/${path}`)
			} catch (err) {
				console.log(err)
			}
		},
		async getCategories(PUBLIC_NAME) {

			if (!this.CATEGORIES.length) {
				try {
					const API = await $fetch(`${PUBLIC_NAME}/categories`)
					const maxOrder = API.map((item) =>  item.order )
					// const categoryURL = API.find(item => item.order === Math.max(...maxOrder)  )
					// this.CATEGORYACTIVE = categoryURL.url
					return (this.CATEGORIES = API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
			}
		},
		async getHits(PUBLIC_NAME) {
			if (!this.HITS.length) {
				try {
					const API = await $fetch(`${PUBLIC_NAME}/products/hits`)
					return (this.HITS = await API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
			}
		},
 
		async getTovari(PUBLIC_NAME, categoryUrlActive) {
				try {
					const API = await $fetch(`${PUBLIC_NAME}/categories/${categoryUrlActive}`)
					return (this.TOVARI = API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
 
		},
	},
})
