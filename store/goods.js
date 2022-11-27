import { defineStore } from 'pinia'

const sortOrder = (a, b) => {
	return a.order > b.order ? -1 : 1
}
export const useGoods = defineStore('goods', {
	state: () => ({
		CATEGORY: [],
		HITS: [],
		TOVARI: [],
		PRODUCT: {},
	}),
	getters: {
		category: (s) => s.CATEGORY,
		hits: (s) => s.HITS,
		tovari: (s) => s.TOVARI,
		product: (s) => s.PRODUCT,
	},
	actions: {
		async getProduct(PUBLIC_NAME, path) {
			if (!this.PRODUCT.length) {
				try {
					 this.PRODUCT = await $fetch(`${PUBLIC_NAME}/${path}.json`)
				} catch (err) {
					console.log(err)
				}
			}
		},
		async getCategory(PUBLIC_NAME) {
			if (!this.CATEGORY.length) {
				try {
					const API = await $fetch(`${PUBLIC_NAME}/category.json`)

					return (this.CATEGORY = API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
			}
		},
		async getHits(PUBLIC_NAME) {
			if (!this.HITS.length) {
				try {
					const API = await $fetch(`${PUBLIC_NAME}/hits.json`)
					return (this.HITS = await API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
			}
		},
		async getTovari(PUBLIC_NAME) {
			if (!this.TOVARI.length) {
				try {
					const API = await $fetch(`${PUBLIC_NAME}/tovari.json`)
					return (this.TOVARI = API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
			}
		},
	},
})
