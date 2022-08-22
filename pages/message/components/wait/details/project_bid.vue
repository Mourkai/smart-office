<template>
	<view>
		<projectInfo :id="data.projectId"></projectInfo>
		<view class="content">
			<view class="content-item">
				<view class="title">项目等级</view>
				<view class="desc" v-text="level[data.projectInfoDto.level]"></view>
			</view>
			<view class="content-item">
				<view class="title">项目类型</view>
				<view class="desc" v-text="type[data.projectInfoDto.type]"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				标书信息
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
				<view class="desc" v-text="data.customerName"></view>
			</view>
			<view class="content-item">
				<view class="title">招标标次</view>
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
				<view class="title">投标标段/包名</view>
				<view class="desc" v-text="data.section"></view>
			</view>
			<view class="content-item">
				<view class="title">标书文件获取方式</view>
				<view class="desc" v-text="methods[data.methods]"></view>
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
				<view class="title">项目组标书负责人</view>
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
				<view class="title">备注</view>
				<view class="desc" v-text="data.projectInfoDto.remark"></view>
			</view>
		</view>
		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		biddingInfo
	} from '@/api/project.js'
	import projectInfo from './projectInfo.vue'
	import files from './files.vue'
	export default {
		data() {
			return {
				data:{
					projectInfoDto:{}
				},
				methods:['','邮件','现场获取','网站下载'],//标书文件获取方式
				biddingMethod:['','公开投标','公平竞谈','邀约竞谈','询价','单一来源'],//甲方招标方式
				type:['','咨询','实施','运维','研发','硬件','集成','其他'],//项目类型
				level:['','A-战略型项目或合同金额较大','B-多个系统或技术难度高且合同金一般','C-单一系统或技术难度低且合同金额较小']//项目等级
			}
		},
		components:{
			projectInfo,
			files
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		async mounted() {
			let {data} = await biddingInfo(this.id)
			this.data = data
			//console.log(this.data);
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	/deep/.content .content-item .title{
		min-width: 250rpx;
	}
</style>
