<template>
	<view class="organization">
		<OrganizationList :selected="false"/>
	</view>
</template>

<script>
	import OrganizationList from '@/components/organization-list/index.vue'
	export default {
		data() {
			return {
			}
		},
		components:{
			OrganizationList
		},
		onLoad() {},
		methods: {
		
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
