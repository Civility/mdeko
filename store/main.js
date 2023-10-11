import { defineStore } from 'pinia'
export const useMain = defineStore('main', {
	state: () => ({
		PUBLIC_NAME: '',
		TOGGLEMENU: false,
		MODALOPEN: false,
		MODALCLOSE: true,
		MODALTOGGLE: false,
		PHONESPB: '',
		PHONEMSK: '',
		MENU: [],
		CONTACTS: {},
		CONTACT: {
			phones: [],
			email: {},
			address: ''
		},
		SOCIALS: [],
		COPYRIGHT: {
			notice: '© Все права зарегистрированы.',
			name: 'ООО "МДЕКО"'
		}
	}),
	getters: {
		toggleMenu: (s) => s.TOGGLEMENU,
		modalOpen: (s) => (s.MODALOPEN = true),
		modalClose: (s) => (s.MODALCLOSE = false),
		modalToggle: (s) => s.MODALTOGGLE
	},
	actions: {
		getMenuToggle() {
			this.TOGGLEMENU = !this.TOGGLEMENU
		},
		getModalToggle(val) {
			this.MODALTOGGLE = val
		},
		getMenuClosed() {
			this.TOGGLEMENU = false
		},
		async getMenu() {
			if (!this.MENU.length) {
				try {
					this.MENU = await $fetch(`${useRuntimeConfig().public.API}/menu`)
				} catch (err) {
					console.log(err)
				}
			}
		},

		async getСontacts() {
			if (!Object.keys(this.CONTACTS).length) {
				try {
					this.CONTACTS = await $fetch(`${useRuntimeConfig().public.API}/contact`)
				} catch (err) {
					console.log(err)
				}
			}
		},
		async sendForm(data) {
			try {
				console.log('start send')

				await $fetch(`${useRuntimeConfig().public.API}/callback`, {
					mode: !import.meta.env.PROD ? 'no-cors' : null,
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					// body: JSON.stringify(data)
					body: data
				}).then((response) => {
					console.log('res', response)
				})

				// .then((response) => {
				// 	if (!response.ok) {
				// 		return response.json().then((errorData) => {
				// 			console.error('Server error:', errorData)
				// 			throw new Error('Server error')
				// 		})
				// 	}
				// 	return response.json()
				// })
				// .then((responseData) => {
				// 	console.log('Success:', responseData)
				// })
				// .catch((error) => {
				// 	console.error('Fetch error:', error)
				// })
				console.log('finish send')
			} catch (err) {
				console.log(err)
			}
		}
	}
})
