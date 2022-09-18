import { defineStore } from 'pinia'

const sortOrder = (a, b) => {
  return a.order > b.order ? -1 : 1
}
export const useMainStore = defineStore('main', {
  state: () => ({
    toggleMenu: false,
    modalOpen: false,
    modalClose: true,
    modalToggle: false,
    phoneSPb: '+7 (812) 333-33-41',
    phoneMSK: '+7 (812) 333-33-42',
    goods: [],
    routeurl: {},
    socials: [
      { title: 'vk', url: '#', icon: 'socials/vk' },
      { title: 'whatsapp', url: '#', icon: 'socials/whatsapp' },
    ],
    docs: [{ title: 'Пользовательское соглашение', url: '#' }],
    copyright: {
      low: '© Все права зарегистрированы.',
      inn: 'ООО "goods Финанс"',
    },
    fullYear: {
      date: new Date().getFullYear(),
    },
  }),
  getters: {
    PHONESPB: (s) => s.phoneSPb.replace(/[^0-9]/g, ''),
    PHONEMSK: (s) => s.phoneMSK.replace(/[^0-9]/g, ''),
    TOGGLEMENU: (s) => s.toggleMenu,
    GOODS: (s) => s.goods,
    MODALOPEN: (s) => (s.modalOpen = true),
    MODALCLOSE: (s) => (s.modalClose = false),
    MODALTOGGLE: (s) => s.modalToggle,
  },
  actions: {
    getMenuToggle() {
      this.toggleMenu = !this.toggleMenu
    },
    getModalToggle(val) {
      this.modalToggle = val
    },
    getMenuClosed() {
      this.toggleMenu = false
    },
    // async getGoods() {
    // 	if (!this.GOODS.length) {
    // 		try {
    // 			const API = await $fetch(`http://localhost:3000/api/goods.json`)
    // 			return (this.goods = API.sort(sortOrder))
    // 		} catch (err) {
    // 			console.log(err)
    // 		}
    // 	}
    // },
  },
})
