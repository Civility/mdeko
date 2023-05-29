
<script setup>
const props = defineProps({
	data: Object,
})
const tab = ref(0)
const isTab = (id) => {
	tab.value = id
}
</script>
<template>
	<div class="grid grid-cols-10">
		<div class="col-span-3">
			<ul v-for="(item, id) in data" :key="id" class="flex gap-8 odd:bg-sec-lighter even:bg-gray" :class="{ '!bg-main  ': id === tab }">
				<li class="relative w-full text-left">
					<Btn glue :title="item.title" @click="isTab(id)" class="flex gap-2 !text-dark" :class="{ '!text-white': id === tab }">
						<Svg :svg="item.icon" v-if="item.icon" />{{ item.title }}
					</Btn>
				</li>
			</ul>
		</div>
		<div class="col-span-7 py-3 px-8 bg-gray/70 text-dark">
			<div v-for="(item, id) in data" :key="id">
				<span v-show="id === tab">{{ item.text }}</span>
			</div>
		</div>
	</div>
</template>
