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
		PHONESPB: '+7 (812) 333-33-41',
		PHONEMSK: '+7 (812) 333-33-42',
		MENU: [],
		SOCIALS: [
			{ title: 'telegram', url: '#', icon: 'telegram.svg' },
			{ title: 'whatsapp', url: '#', icon: 'whatsapp.svg' },
		],
		DOCS: { title: 'Пользовательское соглашение', url: '#' },
		COPYRIGHT: {
			low: '© Все права зарегистрированы.',
			inn: 'ООО "MDEKO Финанс"',
		},
		FULLYEAR: new Date().getFullYear(),
	}),
	getters: {
		menu: (s) => s.MENU,
		phoneSpb: (s) => replaceNumber(s.PHONESPB),
		phoneMsk: (s) => replaceNumber(s.PHONEMSK),
		phones: (s) =>
			(s.PHONES = [
				{ tel: s.phoneSpb, number: replaceNumber(s.PHONESPB), city: 'СПб' },
				{ tel: s.phoneMsk, number: replaceNumber(s.PHONEMSK), city: 'МСК' },
			]),
		toggleMenu: (s) => s.TOGGLEMENU,
		modalOpen: (s) => (s.MODALOPEN = true),
		modalClose: (s) => (s.MODALCLOSE = false),
		modalToggle: (s) => s.MODALTOGGLE,
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
					const API = await $fetch(`http://localhost:3000/api/menu.json`)

					return (this.MENU = API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
			}
		},
	},
})
