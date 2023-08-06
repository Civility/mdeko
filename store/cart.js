import { defineStore } from 'pinia'
import { useGoods } from './goods'

// const router = useRouter();
const sortOrder = (a, b) => {
	return a.order > b.order ? -1 : 1
}

export const useCart = defineStore('cart', {
	state: () => ({
		CARTS: [],
		DELIVERY: false,
		DATADELIVERY: [
			{ price: 185, text: 'Самовывоз с пункта выдачи', data: false },
			{ price: 320, text: 'Доставка до двери', data: true }
		]
		// RESPONSDELIVERY: {}
	}),
	getters: {
		cartsLength: (s) => s.CARTS.length,
		cartTotal(s) {
			const totalList = s.CARTS.map((i) => {
				return i.product.price * i.total
			})
			return totalList.reduce((partialSum, a) => partialSum + a, 0)
		}
	},
	actions: {
		async setCartPlus(category, url) {
			await useGoods().getTovari(category)
			const total = 1
			const product = await useGoods().TOVARI[category].find((i) => i.url === url)
			if (this.CARTS.length) {
				const result = await this.CARTS.find((i) => {
					if (i.product.url === url) return ++i.total
				})
				result ? result : this.CARTS.push({ product, total: total })
			} else {
				await this.CARTS.push({ product, total: total })
			}
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
		setCartMinus(url) {
			if (this.CARTS.length) {
				this.CARTS.find((i) => {
					if (i.product.url === url) --i.total
					if (i.product.url === url) this.CARTITEMTOTAL = i.total
				})
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
