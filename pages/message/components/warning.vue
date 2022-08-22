<template>
	<view class="message">
		<u-empty icon="/static/public/no-data.png" />
	</view>
</template>

<script>
	export default {
		name: 'message',
		data() {
			return {
			}
		},
		onLoad() {},
		components: {
		},
		methods: {
			pullDown(){
				uni.stopPullDownRefresh()
			}
		}
	}
</script>
<style lang="scss">

</style>
