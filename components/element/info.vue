<template>
	<div class="relative group wrap md:py-15 py-10">
		<h3 class="subtitle text-center title-line before:bg-sec after:bg-sec col-span-full" v-text="data.subTitle" v-if="data.subTitle" />
		<h2 class="subtitle text-center col-span-full" v-text="data.title" v-if="data.title" />
		<div class="py-4 lg:col-span-5 col-span-full" v-html="data.text" v-if="data.text" />
		<div class="lg:col-span-5 col-span-full wrap gap-10" v-if="data.list">
			<dl v-for="(item, id) in data.list" :key="id" class="col-span-4 wrap">
				<dd class="w-max col-span-1">
					<Svg svg="tree" class="text-white bg-sec" v-if="item.icon" />
				</dd>
				<dt class="col-span-7">
					<span class="text-xl" v-text="item?.title" />
					<p class="text-xl" v-text="item?.text" />
				</dt>
			</dl>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	data: Object,
})
</script>
