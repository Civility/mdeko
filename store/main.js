import { defineStore } from 'pinia'

const sortOrder = (a, b) => {
	return a.order > b.order ? -1 : 1
}
const replaceNumber = (number) => {
	return number.replace(/[^0-9]/g, '')
}
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
		CONTACTS: [],
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
		contacts(s) {
			s.CONTACTS.forEach((item) => {
				if (item.address.indexOf('Санкт-Петербург') !== -1) {
					// const spbPhone = { tel: item.phone, number: replaceNumber(item.phone), city: item.address }
					if (!s.CONTACT.phones.some((phone) => phone.tel === item.phone)) {
						s.CONTACT.phones.push({
							tel: item.phone,
							number: replaceNumber(item.phone),
							city: item.title
						})
					}
					s.CONTACT.address = item.address
				} else {
					// const mskPhone = { tel: item.phone, number: replaceNumber(item.phone), city: item.address }
					// s.CONTACT.phones.push(mskPhone)
					if (!s.CONTACT.phones.some((phone) => phone.tel === item.phone)) {
						s.CONTACT.phones.push({
							tel: item.phone,
							number: replaceNumber(item.phone),
							city: item.title
						})
					}
					s.CONTACT.email = item.email
				}
			})
		},

		socials: (s) => s.SOCIALS,

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
					const API = await $fetch(`${useRuntimeConfig().public.API}/menu`)
					return (this.MENU = API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
			}
		},

		async getСontacts() {
			if (!this.CONTACTS.length) {
				try {
					this.CONTACTS = await $fetch(`${useRuntimeConfig().public.API}/contacts`)
					await this.contacts
				} catch (err) {
					console.log(err)
				}
			}
		},
		async getSocials() {
			if (!this.SOCIALS.length) {
				try {
					this.SOCIALS = await $fetch(`${useRuntimeConfig().public.API}/socials`)
				} catch (err) {
					console.log(err)
				}
			}
		},
		async sendForm(params) {
			try {
				console.log('start send')
				await $fetch(`${useRuntimeConfig().public.API}/feedback`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(params)
				})
				console.log('finish send')
			} catch (err) {
				console.log(err)
			}
		}
	}
})
