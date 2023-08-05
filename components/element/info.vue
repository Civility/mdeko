<script setup>
const props = defineProps({
	data: Object
})
const tab = ref(0)
const isTab = (id) => {
	tab.value = id
}
</script>
<template>
	<div class="wrap gap-0">
		<div class="col-span-2">
			<ul
				v-for="(item, id) in data"
				:key="id"
				class="flex gap-8 odd:bg-gray even:bg-gray"
				:class="{ '!bg-main-lighter  ': id === tab }"
			>
				<li class="relative w-full text-left">
					<Btn glue :title="item.title" @click="isTab(id)" class="flex gap-2 !text-dark" :class="{ '!text-white': id === tab }">
					</Btn>
				</li>
			</ul>
		</div>
		<div class="col-span-6 bg-main-lighter text-dark">
			<div v-for="(item, id) in data" :key="id">
				<span v-show="id === tab" class="flex">
					<div class="flex w-full max-w-xs items-center">
						<img v-if="item.photo" :src="item.photo" :alt="item.title" />
					</div>
					<div v-html="item.text" class="w-full px-8 py-3" />
				</span>
			</div>
		</div>
	</div>
</template>
