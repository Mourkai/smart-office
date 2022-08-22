<template>
	<view>
		<projectInfo :id="data.biddingInfo.projectId"></projectInfo>
		<view class="content">
			<view class="pro-title">
				保证金信息
			</view>
			<view class="content-item">
				<view class="title">投标名称</view>
				<view class="desc" v-text="data.biddingInfo.name"></view>
			</view>
			<view class="content-item">
				<view class="title">投标编码</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">投标批次</view>
				<view class="desc" v-text="data.biddingInfo.batch"></view>
			</view>
			<view class="content-item">
				<view class="title">投标文件名称</view>
				<view class="desc" v-text="data.biddingInfo.fileName"></view>
			</view>
			<view class="content-item">
				<view class="title">投标文件编号</view>
				<view class="desc" v-text="data.biddingInfo.fileCode"></view>
			</view>
			<view class="content-item">
				<view class="title">投标金金额</view>
				<view class="desc" v-text="data.bailFee"></view>
			</view>
			<view class="content-item">
				<view class="title">保证金支付日期</view>
				<view class="desc" v-text="data.payDate"></view>
			</view>
			<view class="content-item">
				<view class="title">预计收回日期</view>
				<view class="desc" v-text="data.backDate"></view>
			</view>
			<view class="content-item">
				<view class="title">收款账户名称</view>
				<view class="desc" v-text="data.backAccountName"></view>
			</view>
			<view class="content-item">
				<view class="title">收款账户</view>
				<view class="desc" v-text="data.backAccount"></view>
			</view>
			<view class="content-item">
				<view class="title">账户开户行</view>
				<view class="desc" v-text="data.openBank"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		bidBail,
	} from '@/api/fee.js'
	import {
		biddingInfo
	} from '@/api/project.js'
	import projectInfo from './projectInfo.vue'
	export default {
		data() {
			return {
				data:{
					instanceNo:'',
					biddingInfo:{}
				}
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		components:{
			projectInfo
		},
		async mounted() {
			let {data} = await bidBail(this.id)
			let biddingInfoData = await biddingInfo(data.biddingId)
			this.data = data
			this.data.biddingInfo = biddingInfoData.data
		} 
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	.content .content-item .title{
		min-width: 230rpx;
	}
	/deep/.content .content-item .title{
		min-width: 230rpx;
	}
</style>
