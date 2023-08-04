<script setup>
defineEmits(['isClickShow'])

const props = defineProps({
	bgclass: String,
	show: {
		type: Boolean,
		default: false
	},
	refName: {
		type: String,
		required: true
	}
})
const showModal = ref(false)

watch(
	() => props.show,
	(show) => {
		showModal.value = show
	}
)
const closeModal = () => (showModal.value = false)

useHead({
	bodyAttrs: {
		class: showModal.value ? 'over-hidden' : false
	}
})
</script>

<template>
	<ClientOnly>
		<Teleport to="body">
			<div class="fixed inset-0 z-30 overflow-y-auto" :ref="refName" v-if="showModal">
				<transition
					enter-active-class="transition ease-out duration-200 transform"
					enter-from-class="opacity-0"
					enter-to-class="opacity-100"
					leave-active-class="transition ease-in duration-200 transform"
					leave-from-class="opacity-100"
					leave-to-class="opacity-0"
				>
					<div class="flex items-center justify-center pt-24 text-center">
						<div class="z-20 w-1/2 overflow-hidden rounded-lg bg-white p-4 text-left shadow-dark" :class="bgclass">
							<div class="relative flex justify-end">
								<Btn clean class="group relative !p-0" @click="$emit('isClickShow', false)">
									<div
										class="relative flex h-7 w-7 items-center justify-center rounded-full border border-main text-main group-hover:bg-main group-hover:text-white"
									>
										<Svg svg="round-close" />
									</div>
								</Btn>
							</div>
							<div>
								<slot />
							</div>
						</div>
						<div @click="$emit('isClickShow', false)" class="absolute inset-0 z-10 bg-sec/70 bg-opacity-50" />
					</div>
				</transition>
			</div>
		</Teleport>
	</ClientOnly>
</template>
