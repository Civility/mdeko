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
// const closeModal = () => (showModal.value = false)

useHead({
	bodyAttrs: {
		class: showModal.value ? 'over-hidden' : false
	}
})
</script>

<template>
	<ClientOnly>
		<Teleport to="body">
			<div class="fixed inset-0 z-50 overflow-y-auto" :ref="refName" v-if="showModal">
				<transition
					enter-active-class="transition ease-out duration-200 transform"
					enter-from-class="opacity-0"
					enter-to-class="opacity-100"
					leave-active-class="transition ease-in duration-200 transform"
					leave-from-class="opacity-100"
					leave-to-class="opacity-0"
				>
					<div class="flex items-center justify-center pt-[20vh] text-center">
						<div
							class="relative z-20 mx-20 w-full overflow-hidden rounded-lg text-left shadow-dark lg:mx-0 lg:w-3/6"
							:class="bgclass"
						>
							<Btn class="group absolute right-0 top-0 !p-1" @click="$emit('isClickShow', false)">
								<div
									class="relative flex h-5 w-20 items-center justify-center rounded-full border border-white p-4 text-white group-hover:border-sec-lighter group-hover:text-sec-lighter"
								>
									x
								</div>
							</Btn>

							<slot />
						</div>
						<div @click="$emit('isClickShow', false)" class="absolute inset-0 z-10 bg-main/70 bg-opacity-50" />
					</div>
				</transition>
			</div>
		</Teleport>
	</ClientOnly>
</template>
