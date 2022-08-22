<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">工时周期</view>
				<view class="desc" v-text="data.fillStartDate"></view>
			</view>
		</view>
		<view class="content">
			<view class="content-item">
				<view class="title">项目编码</view>
				<view class="desc" v-text="data.remark"></view>
			</view>
			<view class="content-item">
				<view class="title">项目名称</view>
				<view class="desc" v-text="data.remark"></view>
			</view>
			<view class="content-item">
				<view class="title">项目经理</view>
				<view class="desc" v-text="data.remark"></view>
			</view>
			<view class="content-item">
				<view style="margin: 0 auto; color: #666666;">出勤</view>
				<view style="margin: 0 auto; color: #666666;">事假</view>
			</view>
		</view>
		<view class="content">
			<view class="content-item">
				<view class="title">项目编码</view>
				<view class="desc" v-text=""></view>
			</view>
			<view class="content-item">
				<view class="title">项目名称</view>
				<view class="desc" v-text=""></view>
			</view>
			<view class="content-item">
				<view class="title">项目经理</view>
				<view class="desc" v-text="data.remark"></view>
			</view>
			<view class="content-item">
				<view style="margin: 0 auto; color: #666666;">出勤</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		workingHourRecord,
		// getProjectInfo
	} from '@/api/project.js'
	export default {
		data() {
			return {
				data: {},
			}
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
			} = await workingHourRecord(this.id)
			// const project = await getProjectInfo(data.projectId)
			this.data = data
			// this.data.projectInfo = project.data
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
</style>
