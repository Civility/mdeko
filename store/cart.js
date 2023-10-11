import { defineStore } from 'pinia'
import { useGoods } from './goods'

// const router = useRouter();
const sortOrder = (a, b) => {
	return a.order > b.order ? -1 : 1
}
const DELIVERY_METHODS = [
	{ price: 185, text: 'Самовывоз с пункта выдачи', data: false },
	{ price: 320, text: 'Доставка до двери', data: true }
]
export const useCart = defineStore('cart', {
	state: () => ({
		CARTS: [],
		DELIVERY: false,
		DATADELIVERY: DELIVERY_METHODS
	}),
	getters: {
		cartsLength: (s) => s.CARTS.length,
		cartTotal(s) {
			const totalList = s.CARTS.map((i) => {
				return i.product.price_min * i.total
			})
			return totalList.reduce((partialSum, a) => partialSum + a, 0)
		}
	},
	actions: {
		findCartItem(slug) {
			return this.CARTS.find((item) => item.product.slug === slug)
		},
		async setCartPlus(slug) {
			// const total = 1
			const cartItem = this.findCartItem(slug)
			if (cartItem) {
				cartItem.total++
			} else {
				const product = useGoods().ITEM[slug]
				if (product) {
					this.CARTS.push({ product, total: 1 })
				}
			}
			// if (this.CARTS.length) {
			// 	const result = await this.CARTS.find((i) => {
			// 		if (i.product.slug === slug) return ++i.total
			// 	})
			// 	result ? result : this.CARTS.push({ product,   total })
			// } else {
			// 	await this.CARTS.push({ product,  total })
			// }
		},
		sendOrder(params) {
			try {
				console.log('start send')
				if (this.cartsLength) {
					$fetch(`${useRuntimeConfig().public.API}/order`, {
						method: 'POST',
						body: params
					}).then((response) => {
						if (response.success) {
							navigateTo(response.redirect, { external: true })
						} else {
							navigateTo('/')
						}
					})
				}
				console.log('finish send')
			} catch (err) {
				console.log(err)
			}
		},
		setCartMinus(slug) {
			const cartItem = this.findCartItem(slug)
			if (cartItem) {
				if (cartItem.total > 1) {
					cartItem.total--
				} else {
					this.removeCartItem(slug)
				}
			}
			// const index = this.CARTS.findIndex((item) => item.product.slug === slug)
			// if (index !== -1) {
			// 	this.CARTS[index].total--
			// }
		},
		removeCartItem(slug) {
			const index = this.CARTS.findIndex((item) => item.product.slug === slug)
			if (index !== -1) {
				this.CARTS.splice(index, 1)
			}
		},
		setCartDel(index) {
			this.CARTS.splice(index, 1)
		},
		setDelivery(data) {
			this.DELIVERY = data
		},
		resetItemTotal(index) {
			this.CARTS[index].total = 0
		}
	}
})
