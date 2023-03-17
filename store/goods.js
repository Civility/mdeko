import { url } from '@vuelidate/validators'
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
		CART: 0,
		CARTS: [],
		CATEGORYACTIVE: '', // активнй пункт меню в категории
	}),
	getters: {
		categories: (s) => s.CATEGORIES,
		hits: (s) => s.HITS,
		tovari: (s) => s.TOVARI,
		product: (s) => s.PRODUCT,
		categoryactive: (s) => s.CATEGORYACTIVE,
		// cartPlus: (s) => ++s.CART,
		// cartMinus: (s) => --s.CART,
	},
	actions: {
		setCartPlus(url, total) {
			if (this.CARTS.length) {
				const result = this.CARTS.find((i) => {
					if (i.url === url) {
						return { ...i, total: ++i.total }
					}
				})
				if (result) {
					return result
				} else {
					return this.CARTS.push({ url, total })
				}
			} else {
				this.CARTS.push({ url, total })
			}

			// this.CARTS.push({ url, total })
			// console.log('result ', result)

			// console.log('length ', url, total)

			// 	this.CARTS.map((item) => {
			// 		const nameItem = item.url === url
			// 		if (nameItem) {
			// 			console.log('nameItem1 ', nameItem)
			// 			return { ...item, total: item.total++ }
			// 		} else {
			// 			console.log('nameItem2 ', nameItem)
			// 			return this.CARTS.push({ url, total })
			// 		}
			// 	})
			// 	return this.CARTS

			// this.CARTS.map((i) => {
			// 	if (i.url === url) {
			// 		return { ...i, total: i.total++ }
			// 	}
			// })
			// if (!itemFind) {
			// 	this.CARTS.push({ url, total })
			// }

			// if (this.CARTS.length === 0) {
			// 	// console.log('test 1')
			// 	//
			// 	this.CARTS.push({ url, total })
			// } else {
			// 	this.CARTS.map((i) => {
			// 		console.log('test 2 ', i.url)
			// 		// return i.url == url ? { ...i, total: i.total++ } : this.CARTS.push({ url, total })
			// 		return i.url == url ? { ...i, total: i.total++ } : this.CARTS
			// 	})
			// this.CARTS.map((i) => ({
			// 	...i,
			// 	total: i.url === url ? i.total++ : this.CARTS.push({ url, total }),
			// }))
			// }
		},
		setCartMinus() {
			this.CART--
		},
		getCategoryActive(url) {
			this.CATEGORYACTIVE = url
		},
		// /category/item
		async getProduct(PUBLIC_NAME, category, path) {
			try {
				this.PRODUCT = await $fetch(`${PUBLIC_NAME}/categories/${category}/${path}`)
			} catch (err) {
				console.log(err)
			}
		},
		async getCategories(PUBLIC_NAME) {
			if (!this.CATEGORIES.length) {
				try {
					const API = await $fetch(`${PUBLIC_NAME}/categories`)
					const maxOrder = API.map((item) => item.order)
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

				this.TOVARI = API.sort(sortOrder)
			} catch (err) {
				console.log(err)
			}
		},
	},
})
