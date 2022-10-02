import { defineStore } from 'pinia'

const sortOrder = (a, b) => {
	return a.order < b.order ? -1 : 1
}
export const useInfo = defineStore('info', {
	state: () => ({
		BANNERS: [],
		INFO: [],
		BANNERMAIN: null,
		BANNERSECOND: null,
	}),
	getters: {
		info: (s) => s.INFO,
		bannerMain: (s) => s.BANNERS.find((banner) => banner.order === 0),
		bannerSecond: (s) => s.BANNERS.find((banner) => banner.order === 1),
	},
	actions: {
		async getBanners() {
			if (!this.BANNERS.length) {
				try {
					const API = await $fetch(`http://localhost:3000/api/banners.json`)
					return (this.BANNERS = API.sort(sortOrder))
				} catch (err) {
					console.log(err)
				}
			}
		},
		async getInfo() {
			if (!this.INFO.length) {
				try {
					this.INFO = await $fetch(`http://localhost:3000/api/info.json`)
				} catch (err) {
					console.log(err)
				}
			}
		},
	},
})
