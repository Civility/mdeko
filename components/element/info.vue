<template>
	<div class="relative group container">
		<div class="wrap border border-white bg-sec rounded p-5">
			<div class="left lg:col-span-2 col-span-full flex flex-col gap-5 items-center" v-if="data.box1">
				<h3 v-text="data.box1?.title" class="py-5 mb-0 self-start capitalize" />
				<!-- <img :src="data.box1.img.mini" :alt="data.box1.img.alt"> -->
				<img v-if="data.box1?.img?.mini" src="https://picsum.photos/id/10/300/340.webp" :alt="data.box1.img.alt" />
			</div>
			<div class="center lg:col-span-2 md:col-span-4 col-span-full flex flex-col gap-5" v-if="data.box2">
				<span v-text="data.box2?.title" class="text-3xl py-5 mb-0 capitalize" />
				<ul class="flex flex-col gap-5">
					<li v-for="item in data.box2.list" class="flex gap-5 items-center bg-main rounded py-3 px-1">
						<img :src="item.icon" alt="icon" class="h-15" />
						<div v-html="item.text" />
					</li>
				</ul>
			</div>
			<div class="right md:col-span-4 col-span-full flex flex-col gap-5" v-if="data.box3">
				<span v-text="data.box3?.title" class="text-3xl py-5 mb-0 capitalize" />
				<div v-html="data.box3?.text" v-if="data.box3?.text" />
				<img v-if="data.box3?.img?.mini" src="https://picsum.photos/id/10/300/200.webp" :alt="data.box3.img.alt" />
				<ul class="flex flex-col gap-5 list-disc list-inside" v-if="data.box3.list">
					<li v-for="item in data.box3.list">
						<span class="text-3xl capitalize" v-text="item.title" v-if="item.title" />
						<span v-html="item?.text" />
					</li>
				</ul>
				<Btn main :link="data.box3?.url">Подробнее</Btn>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	data: Object,
})
</script>
