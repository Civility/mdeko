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
				async getProduct(path) {
			if (!this.PRODUCT.length) {
				try {
					 this.PRODUCT = await $fetch(`http://localhost:3000/api${path}.json`)
				} catch (err) {
					console.log(err)
				}
			}
		},
		async getCategory() {
			if (!this.CATEGORY.length) {
				try {
					const API = await $fetch(`http://localhost:3000/api/category.json`)

					return (this.CATEGORY = API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
			}
		},
		async getHits() {
			if (!this.HITS.length) {
				try {
					const API = await $fetch(`http://localhost:3000/api/hits.json`)
					return (this.HITS = await API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
			}
		},
		async getTovari() {
			if (!this.TOVARI.length) {
				try {
					const API = await $fetch(`http://localhost:3000/api/tovari.json`)
					return (this.TOVARI = API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
			}
		},
	},
})
