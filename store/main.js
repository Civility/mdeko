import { defineStore } from 'pinia'

const sortOrder = (a, b) => {
	return a.order > b.order ? -1 : 1
}
export const useMainStore = defineStore('main', {
	state: () => ({
		TOGGLEMENU: false,
		MODALOPEN: false,
		MODALCLOSE: true,
		MODALTOGGLE: false,
		PHONESPB: '+7 (812) 333-33-41',
		PHONEMSK: '+7 (812) 333-33-42',
		MENU: [],
		SOCIALS: [
			{ title: 'vk', url: '#', icon: 'socials/vk' },
			{ title: 'whatsapp', url: '#', icon: 'socials/whatsapp' },
		],
		DOCS: [{ title: 'Пользовательское соглашение', url: '#' }],
		COPYRIGHT: {
			low: '© Все права зарегистрированы.',
			inn: 'ООО "MDEKO Финанс"',
		},
		FULLYEAR: {
			date: new Date().getFullYear(),
		},
	}),
	getters: {
		menu: (s) => s.MENU,
		phonespb: (s) => s.PHONESPB.replace(/[^0-9]/g, ''),
		phonemsk: (s) => s.PHONEMSK.replace(/[^0-9]/g, ''),
		togglemenu: (s) => s.TOGGLEMENU,
		modalopen: (s) => (s.MODALOPEN = true),
		modalclose: (s) => (s.MODALCLOSE = false),
		modaltoggle: (s) => s.MODALTOGGLE,
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
