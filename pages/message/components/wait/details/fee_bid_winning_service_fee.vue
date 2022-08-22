<template>
	<view>
		<projectInfo :id="data.projectId"></projectInfo>
		<view class="content">
			<view class="pro-title">
				服务费信息
			</view>
			<view class="content-item">
				<view class="title">投标名称</view>
				<view class="desc" v-text="data.biddingInfo.name"></view>
			</view>
			<view class="content-item">
				<view class="title">投标编码</view>
				<view class="desc" v-text="data.biddingInfo.code"></view>
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
				<view class="title">中标通知书编号</view>
				<view class="desc" v-if="data.biddingInfo.noticeAwardDto" v-text="data.biddingInfo.noticeAwardDto.noticeCode"></view>
			</view>
			<view class="content-item">
				<view class="title">中标额度</view>
				<view class="desc" v-if="data.biddingInfo.noticeAwardDto" v-text="data.biddingInfo.noticeAwardDto.biddingPrice"></view>
			</view>
			<view class="content-item">
				<view class="title">服务费金额</view>
				<view class="desc" v-text="data.serviceFee"></view>
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
			<view class="content-item">
				<view class="title">打款备注</view>
				<view class="desc" v-text="data.remark"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		bidService
	} from '@/api/fee.js'
	import {
		//biddingInfo,
		winbidderDetail
	} from '@/api/project.js'
	import projectInfo from './projectInfo.vue'
	export default {
		data() {
			return {
				data:{biddingInfo:{}}
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
			let {data} = await bidService(this.id)
			//let biddingInfoData = await biddingInfo(data.biddingId)
			let wdata = await winbidderDetail(data.biddingId)
			this.data = data
			this.data.biddingInfo = wdata.data
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	.content .content-item .title{
		min-width: 240rpx;
	}
</style>