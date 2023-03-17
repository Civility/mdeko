
<script setup>
const props = defineProps({
	data: Object,
})
</script>
<template>
	<div class="relative group wrap bg-gradient-to-l from-main/60 to-sec-dark/70" :class="{ '!bg-gradient-to-r': data.order === 2 }">
		<div
			style="background-image: url(/img/pattern/pattern2-down.webp)"
			class="row-span-full col-span-full -z-10 mix-blend-overlay bg-local bg-center bg-no-repeat bg-cover transform group-even:-scale-x-[1]"
		/>
		<div class="container md:py-15 py-10 row-span-full col-span-full wrap">
			<h3 class="subtitle text-center title-line before:bg-sec after:bg-sec col-span-full" v-text="data.subTitle" v-if="data.subTitle" />
			<h2 class="subtitle text-center col-span-full" v-text="data.title" v-if="data.title" />
			<div class="col-span-full">
				<div class="py-4" v-html="data.text" v-if="data.text" />
				<div class="lg:col-span-5 col-span-full wrap gap-10" v-if="data.list">
					<dl v-for="(item, id) in data.list" :key="id" class="lg:col-span-2 col-span-4 wrap">
						<dd class="w-max col-span-1">
							<Svg svg="baseline-grass" class="text-white" v-if="item.icon" />
						</dd>
						<dt class="col-span-7">
							<span class="text-xl" v-text="item?.title" />
							<p class="text-xl" v-text="item?.text" />
						</dt>
					</dl>
				</div>
			</div>
		</div>
	</div>
</template>
