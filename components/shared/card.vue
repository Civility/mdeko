<template>
	<div class="card relative rounded overflow-hidden bg-sec shadow-neon group">
		<!-- <h3 class="py-2 px-6 border-b xl:text-xl lg:text-lg"><span class="capitalize">Name:</span> {{ data.name }}</h3>
		<div class="py-2 px-6 mb-4 border-b lg:text-lg"><span class="capitalize">Address:</span> {{ data.address }}</div> -->
		<div class="grid grid-cols-2 divide-x py-2 px-6 mb-4 border-b lg:text-lg text-center">
			<div><span class="capitalize">Name:</span> {{ data.name }}</div>
			<div><span class="capitalize">Age:</span> {{ data.value.age }}</div>
		</div>
		<div class="py-2 px-6 mb-4 border-b lg:text-lg"><span class="capitalize">Address:</span> {{ data.address }}</div>
		<a :href="data.url" data-mdb-ripple="true" data-mdb-ripple-color="light" class="card__link">
			<img class="h-[26rem] mx-auto" :src="data.img.mini" alt="Sunset in the mountains" />
		</a>
		<!-- <div class="grid grid-cols-3 divide-x   mt-4 border-t text-lg text-center"> -->
		<!-- <div><span class="capitalize">age:</span> {{ data.value.age }}</div> -->
		<!-- <div><span class="capitalize">size:</span> {{ data.value.size }}</div> -->
		<!-- <div><span class="capitalize">tall:</span> {{ data.value.tall }}</div> -->
		<!-- </div> -->
		<!-- <div class="grid grid-cols-2 divide-x px-6 border-t text-lg text-center"> -->
		<!-- <div><span class="capitalize">services:</span> {{ data.services[0] }}</div> -->

		<!-- </div> -->
		<div class="border-t border-b text-lg text-center">
			<i class="border border-main-lighter rounded-full w-10 h-10"><span class="px-2">$</span></i> {{ data.price.min }}
		</div>
		<div class="grid grid-cols-1 px-6">
			<Btn class="!text-xl !py-2">More</Btn>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	data: Object,
})
</script>
