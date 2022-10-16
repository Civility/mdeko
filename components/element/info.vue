<template>
	<div class="relative group container">
		<h4 class="subtitle" v-text="data?.subTitle" />
		<h3 class="subtitle" v-text="data?.title" />
		<div class="text" v-html="data?.text" />
		<dl class="list" v-for="(item, id) in data?.list" :key="id">
			<dd>
				<img :src="item?.icon" :alt="item?.icon" />
			</dd>
			<dt>
				<span v-text="item?.title" />
				<p v-text="item?.text" />
			</dt>
		</dl>
	</div>
</template>

<script setup>
const props = defineProps({
	data: Object,
})
</script>
