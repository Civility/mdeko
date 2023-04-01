 <script setup>
import { storeToRefs } from 'pinia'
import { useGoods } from '@/store/goods.js'
const { ITEMSORDER } = storeToRefs(useGoods())
</script>
 <template>
	<div class="text-main">
		<pre>{{ ITEMSORDER }}</pre>
	</div>
</template>
<style lang="postcss" scoped>
</style>
 