<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">投标编码</view>
				<view class="desc" v-text="data.code"></view>
			</view>
			<view class="content-item">
				<view class="title">投标名称</view>
				<view class="desc" v-text="data.name"></view>
			</view>
			<view class="content-item">
				<view class="title">招标人</view>
				<view class="desc" v-text="data.companyName"></view>
			</view>
			<view class="content-item">
				<view class="title">招标批次</view>
				<view class="desc" v-text="data.batch"></view>
			</view>
			<view class="content-item">
				<view class="title">招标文件名称</view>
				<view class="desc" v-text="data.fileName"></view>
			</view>
			<view class="content-item">
				<view class="title">招标文件编号</view>
				<view class="desc" v-text="data.fileCode"></view>
			</view>
			<view class="content-item">
				<view class="title">投标人</view>
				<view class="desc" v-text="data.companyName"></view>
			</view>
			<view class="content-item">
				<view class="title">投标标段/包号</view>
				<view class="desc" v-text="data.section"></view>
			</view>
			<view class="content-item">
				<view class="title">标书文件获取方式</view>
				<view class="desc" v-text="data.methodsName"></view>
			</view>
			<view class="content-item">
				<view class="title">开标日期</view>
				<view class="desc" v-text="data.openTime"></view>
			</view>
			<view class="content-item">
				<view class="title">甲方招标方式</view>
				<view class="desc" v-text="biddingMethod[data.biddingMethod]"></view>
			</view>
			<view class="content-item">
				<view class="title">开标地点</view>
				<view class="desc" v-text="data.address"></view>
			</view>
			<view class="content-item">
				<view class="title">标书负责人</view>
				<view class="desc" v-text="data.bidLeaderName"></view>
			</view>
			<view class="content-item">
				<view class="title">商务部标书负责人</view>
				<view class="desc" v-text="data.businessLeaderName"></view>
			</view>

		</view>
		<view class="content">
			<view class="pro-title">
				标书复核
			</view>
			<view class="content-item">
				<view class="title">标书一级复核人</view>
				<view class="desc" v-text="data.levelOneName"></view>
			</view>
			<view class="content-item">
				<view class="title">标书二级复核人</view>
				<view class="desc" v-text="data.levelTwoName"></view>
			</view>
			<view class="content-item">
				<view class="title">标书三级复核人</view>
				<view class="desc" v-text="data.levelThreeName"></view>
			</view>
			<view class="content-item">
				<view class="title">标书是否递交完成</view>
				<view class="desc" v-text="finished[data.finished]"></view>
			</view>
			<view class="content-item">
				<view class="title">备注</view>
				<view class="desc" v-text="data.remark"></view>
			</view>
		</view>
		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		biddingInfo
	} from '@/api/project.js'
	import files from './files.vue'
	
	export default {
		data() {
			return {
				data: {},
				finished:['','是','否'],
				biddingMethod:['','公开招标','公开竞谈','邀约竞谈','询价','单一来源']
			}
		},
		components:{
		   files	
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		async mounted() {
			let {
				data
			} = await biddingInfo(this.id)
			this.data = data
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	.content .content-item .title{
	  min-width: 300rpx;
	 }
</style>