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
		ITEMSORDER: [],
		CATEGORYACTIVE: '', // активнй пункт меню в категории
	}),
	getters: {
		categories: (s) => s.CATEGORIES,
		hits: (s) => s.HITS,
		tovari: (s) => s.TOVARI,
		product: (s) => s.PRODUCT,
		categoryactive: (s) => s.CATEGORYACTIVE,
		// itemsorder(s, url) {
		// 	const item = s.TOVARI.find((i) => i.url === url)
		// 	return this.ITEMSORDER.push({ item })
		// }
	},
	actions: {
		setCartPlus(url, total) {
			if (this.CARTS.length) {
				const result = this.CARTS.find((i) => {
					if (i.url === url) {
						// console.log(1111)
						return { ...i, total: ++i.total }
					}
				})
				if (result) {
					// console.log(2222)
					return result
				} else {
					// console.log(3333)
					return this.CARTS.push({ url, total })
				}
			} else {
				// console.log('item ', item)
				this.setItemOrder(url)
				this.CARTS.push({ url, total })
			}
		},
		setItemOrder(url) {
			const item = this.TOVARI.find((i) => i.url === url)
			return this.ITEMSORDER.push({ item })
		},
		setCartMinus(url, total) {
			console.log('setCartMinus ', url)
			console.log('setCartMinus ', total)
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
