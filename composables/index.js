export const deleteTag = (str) => {
	return str ? str.match(/(^[^>]*>)? *(.*?) *(<[\/a-z>]*)?$/)[2] : ''
}

export const regSVG = (str) => {
	return str ? str.match(/\/icon\/(.*?)\.svg/)[1] : ''
}

export const replaceNumber = (number) => {
	return number ? number.replace(/[^0-9]/g, '') : ''
}

export const IMG = () => {
	return useRuntimeConfig().public.G_IMG
}
export const API = async () => {
	const runtimeConfig = useRuntimeConfig()
	return runtimeConfig.public.API
}
