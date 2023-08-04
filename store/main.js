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
		PHONESPB: '', // 8 (812) 388-71-28
		PHONEMSK: '', // 8 (800) 505-4-345
		PHONESOCIAL: '8 (999) 635-70-45',
		MENU: [],
		CONTACTS: [],
		CONTACT: {
			phones: [],
			mail: [], // info@akvamdeko.ru
			address: ''
		},
		SOCIALS: [],
		REQUISITES: { name: 'ООО "МДЕКО"', inn: '7816543798', ogrn: '1127847412220' },
		DOCS: { title: 'Пользовательское соглашение', url: '#' },
		COPYRIGHT: {
			notice: '© Все права зарегистрированы.',
			name: 'ООО "МДЕКО"'
		}
		// FULLYEAR: new Date().getFullYear(),
	}),
	getters: {
		// menu: (s) => s.MENU,
		// contact: (s) => s.CONTACT,
		contacts(s) {
			s.CONTACTS.map((item) => {
				if (item.address == '') {
					s.PHONEMSK = item.phone
				}
				if (item.address.indexOf('Цветочная')) {
					s.PHONESPB = item.phone
					s.CONTACT.address = item.address
				}
				s.CONTACT.mail.push(item.email)
			})
		},
		phones(s) {
			return (s.CONTACT.phones = [
				{ tel: s.PHONESPB, number: replaceNumber(s.PHONESPB), city: 'Санкт-Петербургу' },
				{ tel: s.PHONEMSK, number: replaceNumber(s.PHONEMSK), city: 'России' }
			])
		},
		socials: (s) => s.SOCIALS,
		// socials(s) {
		// 	return (s.SOCIALS = [
		// 		{
		// 			name: 'telegram',
		// 			title: 'telegram',
		// 			url: '#',
		// 			icon: 'baseline-telegram',
		// 			tel: s.PHONESOCIAL,
		// 			number: replaceNumber(s.PHONESOCIAL),
		// 		},
		// 		{
		// 			name: 'whatsapp',
		// 			title: 'whatsapp',
		// 			url: '#',
		// 			icon: 'baseline-whatsapp',
		// 			tel: s.PHONESOCIAL,
		// 			number: replaceNumber(s.PHONESOCIAL),
		// 		},
		// 	])
		// },

		toggleMenu: (s) => s.TOGGLEMENU,
		modalOpen: (s) => (s.MODALOPEN = true),
		modalClose: (s) => (s.MODALCLOSE = false),
		modalToggle: (s) => s.MODALTOGGLE
	},
	actions: {
		// async getMainALL({ dispatch }) {
		// 	await Promise.all([dispatch('getMenuToggle'), dispatch('getMenuToggle')])
		// },
		async getContactData() {
			await this.phones
			// await this.socials
		},
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
					// headers: { 'Content-Type': 'multipart/form-data' },
					body: JSON.stringify(params)
				})
				console.log('finish send')
			} catch (err) {
				console.log(err)
			}
		}
	}
})
