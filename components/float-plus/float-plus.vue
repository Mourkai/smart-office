<template>
	<view class="float-plus" @click="plusClick">
		<u-icon name="plus-circle-fill" size="50" color="#3196FA"></u-icon>
	</view>
</template>

<script>
	export default {
		name: 'float-push',
		data() {
			return {}
		},
		methods: {
			plusClick() {
				this.$emit('click')
			},
		}
	}
</script>
<style lang="scss" scoped>
	.float-plus {
		position: fixed;
		right: 50rpx;
		bottom: 100rpx;
		border-radius: 50%;
		background-color: #fff;
	}
</style>
