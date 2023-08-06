import { useCart } from '@/store/cart.js'
const router = useRouter()
export default defineNuxtRouteMiddleware((to, from) => {
	const cart = useCart()
	if (cart.cartsLength === 0) {
		// return navigateTo('/');
		// return redirect('/');
		return router.go(-1)
	}
})
