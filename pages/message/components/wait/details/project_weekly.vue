<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">周报日期</view>
				<view class="desc" v-text="data.fillStartDate"></view>
			</view>
			<view class="content-item">
				<view class="title">项目名称</view>
				<view class="desc" v-text="data.projectInfo.name"></view>
			</view>
			<view class="content-item">
				<view class="title">项目编码</view>
				<view class="desc" v-text="data.projectInfo.code"></view>
			</view>
			<view class="content-item">
				<view class="title">项目经理</view>
				<view class="desc" v-text="data.projectInfo.leaderName"></view>
			</view>
			<view class="content-item">
				<view class="title">计划开始日期</view>
				<view class="desc" v-text="data.projectInfo.planStartDate"></view>
			</view>
			<view class="content-item">
				<view class="title">计划完成日期</view>
				<view class="desc" v-text="data.projectInfo.planEndDate"></view>
			</view>
			<view class="content-item">
				<view class="title">项目当前状态</view>
				<view class="desc" v-text="data.projectInfo.finishedStatusString"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				周进度描述
			</view>
			<view class="content-item">
				<view class="title">整体描述</view>
				<view class="desc" v-text="data.detail"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				周进度详情
			</view>
			<table class="work-table" v-for="(item,index) in data.weekReportTaskDtoList">
				<tr>
					<td colspan="2">任务名称：{{item.name}}</td>
				</tr>
				<tr>
					<td colspan="2">责任人：{{item.userName}}</td>
				</tr>
				<tr>
					<td>所属阶段：{{item.milepostName}}</td>
					<td>进度：{{item.actualProgress}}%</td>
				</tr>
				<tr>
					<td>
						计划开始日期：{{item.planStartDate}}
					</td>
					<td>
						计划完成日期：{{item.planEndDate}}
					</td>
				</tr>
				<tr>
					<td>
						实际开始日期：{{item.actualStartDate}}
					</td>
					<td>
						实际完成日期：{{item.actualEndDate}}
					</td>
				</tr>
			</table>
		</view>
	</view>
</template>

<script>
	import {
		weekReport,
		getProjectInfo
	} from '@/api/project.js'
	export default {
		data() {
			return {
				data:{
					projectInfo:{}
				},
				status:['','未开始','正常','超前','滞后'],//商机状态
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		async mounted() {
			let {data} = await weekReport(this.id)
			const project = await getProjectInfo(data.projectId)
			this.data = data
			this.data.projectInfo = project.data
		} 
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	.content .content-item .title{
		min-width: 210rpx;
	}
</style>