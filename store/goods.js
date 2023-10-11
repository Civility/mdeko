import { defineStore } from 'pinia'

const sortOrder = (a, b) => {
	return a.order > b.order ? -1 : 1
}
export const useGoods = defineStore('goods', {
	state: () => ({
		CATALOG: [],
		CATEGORY: {},
		HITS: [],
		ITEM: {}
		// TOVARI: {}
	}),

	actions: {
		async getHits() {
			if (!this.HITS.length) {
				try {
					this.HITS = await $fetch(`${useRuntimeConfig().public.API}/hit`)
				} catch (err) {
					console.log(err)
				}
			}
		},
		// /category
		async geCcatalog() {
			if (!this.CATALOG.length) {
				try {
					this.CATALOG = await $fetch(`${useRuntimeConfig().public.API}/catalog`)
				} catch (err) {
					console.log(err)
				}
			}
		},
		// /category/category_slug
		async getCategory(category) {
			if (!this.CATEGORY[category]) {
				try {
					this.CATEGORY[category] = await $fetch(`${useRuntimeConfig().public.API}/catalog/${category}`)
				} catch (err) {
					console.log(err)
				}
			}
		},
		// /category/category_slug/slug
		async getItem(category, slug) {
			if (!this.ITEM[slug]) {
				try {
					this.ITEM[slug] = await $fetch(`${useRuntimeConfig().public.API}/catalog/${category}/${slug}`)
				} catch (err) {
					console.log(err)
				}
			}
		}

		// async getTovari(route) {
		// 	this.setCategoryActive(route)
		// 	try {
		// 		if (!this.TOVARI[route]) {
		// 			const API = await $fetch(`${useRuntimeConfig().public.API}/category/${route}`)
		// 			this.TOVARI = API.sort(sortOrder)
		// 			this.TOVARI[route] = API.sort(sortOrder)
		// 		}
		// 	} catch (err) {
		// 		console.log(err)
		// 	}
		// }
	}
})
