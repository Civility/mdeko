<script setup>
defineEmits(['isClickShow'])

const props = defineProps({
	bgclass: String,
	show: {
		type: Boolean,
		default: false,
	},
	refName: {
		type: String,
		required: true,
	},
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
		class: showModal.value ? 'over-hidden' : false,
	},
})
</script>

<template>
	<Teleport to="body">
		<div
			:class="`modal-${refName}`"
			class="fixed z-30 inset-0 overflow-y-auto bg-main/70 bg-opacity-50"
			:ref="refName"
			v-if="showModal"
			aria-modal="true"
			aria-labelledby="modal-headline"
			@click="$emit('isClickShow', false)"
		>
			<transition
				enter-active-class="transition ease-out duration-200 transform"
				enter-from-class="opacity-0"
				enter-to-class="opacity-100"
				leave-active-class="transition ease-in duration-200 transform"
				leave-from-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<div class="flex items-center justify-center pt-24 text-center">
					<div class="modal__content w-1/2 bg-white rounded-lg text-left overflow-hidden p-4 shadow-neon" :class="bgclass">
						<div class="modal__header relative">
							<Btn clean class="modal__btn__close group absolute right-0 top-0" @click="$emit('isClickShow', false)">
								<i
									class="border border-main-lighter rounded-full w-10 h-10 flex items-center justify-center relative group-hover:bg-main group-hover:text-white group-hover:shadow-neon"
								>
									X
								</i>
							</Btn>
						</div>
						<div class="modal__body">
							<slot name="body" />
						</div>
					</div>
				</div>
			</transition>
		</div>
	</Teleport>
</template>
