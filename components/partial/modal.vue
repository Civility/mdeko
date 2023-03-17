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
	<ClientOnly>
		<Teleport to="body">
			<div class="fixed z-30 inset-0 overflow-y-auto" :ref="refName" v-if="showModal">
				<transition
					enter-active-class="transition ease-out duration-200 transform"
					enter-from-class="opacity-0"
					enter-to-class="opacity-100"
					leave-active-class="transition ease-in duration-200 transform"
					leave-from-class="opacity-100"
					leave-to-class="opacity-0"
				>
					<div class="flex items-center justify-center pt-24 text-center">
						<div class="w-1/2 bg-white rounded-lg text-left overflow-hidden p-4 shadow-dark z-20" :class="bgclass">
							<div class="relative flex justify-end">
								<Btn clean class="relative group !p-0" @click="$emit('isClickShow', false)">
									<div
										class="border border-main rounded-full w-7 h-7 flex items-center justify-center relative group-hover:bg-main group-hover:text-white text-main"
									>
										x
									</div>
								</Btn>
							</div>
							<div>
								<slot />
							</div>
						</div>
						<div @click="$emit('isClickShow', false)" class="bg-sec/70 bg-opacity-50 absolute inset-0 z-10" />
					</div>
				</transition>
			</div>
		</Teleport>
	</ClientOnly>
</template>
