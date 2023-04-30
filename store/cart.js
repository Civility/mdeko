import { defineStore } from 'pinia'
import { useGoods } from './goods'
const sortOrder = (a, b) => {
	return a.order > b.order ? -1 : 1
}

export const useCart = defineStore('cart', {
	state: () => ({
		CART: 0,
		CARTS: [],
		DELIVERY: 185,
		DATADELIVERY: [
			{ price: 185, text: 'Самовывоз с пункта выдачи' },
			{ price: 320, text: 'Доставка до двери' }
		]
	}),
	getters: {
		cartsLength: (s) => s.CARTS.length,
		cartTotal(s) {
			const totalList = s.CARTS.map(i => {
				return i.product.price * i.total
			})
			return totalList.reduce((partialSum, a) => partialSum + a, 0);
		},
		// delivery: (s, data) => s.DELIVERY = data
	},
	actions: {

		async setCartPlus(url, category) {
			await useGoods().getTovari(category)
			const total = 1
			const product = await useGoods().TOVARI.find((i) => i.url === url)

			if (this.CARTS.length) {
				const result = await this.CARTS.find((i) => {
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
			this.CARTS.splice(index, 1);
		},
		setDelivery(data) {
			this.DELIVERY = data
		}
	}
})