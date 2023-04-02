import { defineStore } from 'pinia'
import { useGoods } from './goods'
const sortOrder = (a, b) => {
	return a.order > b.order ? -1 : 1
}

export const useCart = defineStore('cart', {
	state: () => ({
		CART: 0,
		CARTS: []
	}),
	getters: {

	},
	actions: {
		setCartPlus(url, total = 1) {
			const product = useGoods().TOVARI.find((i) => i.url === url)
			if (this.CARTS.length) {
				const result = this.CARTS.find((i) => {
					if (i.product.url === url) return ++i.total
				})
				return result ? result : this.CARTS.push({ product, total: total })
			} else {
				return this.CARTS.push({ product, total: total })
			}
			// if (this.CARTS.length) {
			// 	const result = this.CARTS.find((i) => {
			// 		if (i.url === url) {
			// 			return { ...i, total: ++i.total }
			// 		}
			// 	})
			// 	if (result) {
			// 		return result
			// 	} else {
			// 		this.setItemOrder(url)
			// 		return this.CARTS.push({ url, total })
			// 	}
			// } else {
			// 	this.setItemOrder(url)
			// 	this.CARTS.push({ url, total })
			// }
		},

		setCartMinus(url) {
			if (this.CARTS.length) {
				return this.CARTS.find((i) => {
					if (i.product.url === url) return --i.total
				})
			}
		},
		setCartDel(index) {
			// const indexItem = this.CARTS.find((i) => {
			// 	return i.product.url === url
			// })
			// const item = this.CARTS.indexOf(index)

			// if (item >= 0) {
			// 	this.CARTS.splice(item, 1)
			// }
			this.CARTS.splice(index, 1);
		}


	}
})