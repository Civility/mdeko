import { defineStore } from 'pinia'

const sortOrder = (a, b) => {
	return a.order > b.order ? -1 : 1
}
const replaceNumber = (number) => {
	return number.replace(/[^0-9]/g, '')
}
export const useMain = defineStore('main', {
	state: () => ({
		TOGGLEMENU: false,
		MODALOPEN: false,
		MODALCLOSE: true,
		MODALTOGGLE: false,
		PHONESPB: '8 (812) 388 71 28',
		PHONEMSK: '8 (800) 505 4 345',
		PHONESOCIAL: '8 (999) 635 70 45',
		MENU: [],
		CONTACT: {
			phones: [],
			mail: 'test@test.com',
			address: {
				country: 'Россия, 196006',
				city: 'г. Санкт-Петербург',
				street: 'ул. Цветочная, д. 7, лит. Б',
				office: 'комната 9',
			},
		},
		SOCIALS: [],
		REQUISITES: { name: 'ООО "МДЕКО"', inn: '7816543798', ogrn: '1127847412220' },
		DOCS: { title: 'Пользовательское соглашение', url: '#' },
		COPYRIGHT: {
			notice: '© Все права зарегистрированы.',
			name: 'ООО "МДЕКО"',
		},
		// FULLYEAR: new Date().getFullYear(),
	}),
	getters: {
		menu: (s) => s.MENU,
		contact: (s) => s.CONTACT,
		phones(s) {
			return (s.CONTACT.phones = [
				{ tel: s.PHONESPB, number: replaceNumber(s.PHONESPB), city: 'Санкт-Петербургу' },
				{ tel: s.PHONEMSK, number: replaceNumber(s.PHONEMSK), city: 'России' },
			])
		},
		socials(s) {
			return (s.SOCIALS = [
				{
					name: 'telegram',
					title: 'telegram',
					url: '#',
					icon: 'telegram.svg',
					tel: s.PHONESOCIAL,
					number: replaceNumber(s.PHONESOCIAL),
				},
				{
					name: 'whatsapp',
					title: 'whatsapp',
					url: '#',
					icon: 'whatsapp.svg',
					tel: s.PHONESOCIAL,
					number: replaceNumber(s.PHONESOCIAL),
				},
			])
		},

		toggleMenu: (s) => s.TOGGLEMENU,
		modalOpen: (s) => (s.MODALOPEN = true),
		modalClose: (s) => (s.MODALCLOSE = false),
		modalToggle: (s) => s.MODALTOGGLE,
	},
	actions: {
		// async getMainALL({ dispatch }) {
		// 	await Promise.all([dispatch('getMenuToggle'), dispatch('getMenuToggle')])
		// },
		async getContactData() {
			await this.phones
			await this.socials
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
					const API = await $fetch(`http://localhost:3000/api/menu.json`)

					return (this.MENU = API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
			}
		},
	},
})
