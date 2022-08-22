<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">借款日期</view>
				<view class="desc" v-text="data.borrowDate"></view>
			</view>
			<view class="content-item">
				<view class="title">借款金额</view>
				<view class="desc" v-text="data.borrowFee"></view>
			</view>
			<view class="content-item">
				<view class="title">收款人</view>
				<view class="desc" v-text="data.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">收款账户</view>
				<view class="desc" v-text="data.openBank"></view>
			</view>
			<view class="content-item">
				<view class="title">账户开户行</view>
				<view class="desc" v-text="data.getAccount"></view>
			</view>
			<view class="content-item">
				<view class="title">借款事由</view>
				<view class="desc" v-text="data.remark"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		projectImprest
	} from '@/api/fee.js'
	export default {
		data() {
			return {
				data:{}
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		async mounted() {
			let {data} = await projectImprest(this.id)
			this.data = data
		} 
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
</style>