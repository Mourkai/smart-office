<template>
	<view>
		<projectInfo :id="data.id" showLevel showType showCycle></projectInfo>
		<view class="content" v-for="item in data.deletePersonRecordDtoList">
			<view class="pro-title">
				调出信息
			</view>
			<view class="content-item">
				<view class="title">调出原因</view>
				<view class="desc" v-text="item.reason"></view>
			</view>
			<view class="content-item">
				<view class="title">员工姓名</view>
				<view class="desc" v-text="item.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">调出日期</view>
				<view class="desc" v-text="item.outDate"></view>
			</view>
			<view class="content-item">
				<view class="title">项目职责</view>
				<view class="desc" v-text="item.responsibilities"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		deletePersonRecord
	} from '@/api/project.js'
	import projectInfo from './projectInfo.vue'
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
		components:{
			projectInfo
		},
		
		async mounted() {
			let {data} = await deletePersonRecord(this.id)
			this.data = data
		} 
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
</style>
