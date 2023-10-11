import { defineStore } from 'pinia'

export const useInfo = defineStore('info', {
	state: () => ({
		BANNERS: [],
		BANNERMAIN: null,
		BANNERSECOND: null
	}),
	getters: {
		info: (s) => s.INFO
	},
	actions: {
		async getBanners() {
			if (!this.BANNERS.length) {
				try {
					this.BANNERS = await $fetch(`${useRuntimeConfig().public.API}/banner`)
				} catch (err) {
					console.log(err)
				}
			}
		}
	}
})
