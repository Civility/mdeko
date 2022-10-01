import { defineStore } from 'pinia'
// const localAPI = 'http://localhost:3000/api/'

const sortOrder = (a, b) => {
	return a.order < b.order ? -1 : 1
}
export const useCategoryStore = defineStore('category', {
	state: () => ({
		CATEGORY: [],
	}),
	getters: {
		category: (s) => s.CATEGORY,
	},
	actions: {
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
	},
})
