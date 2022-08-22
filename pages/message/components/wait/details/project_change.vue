<template>
	<view>
		<projectInfo :id="data.projectId" v-bind="bindState"  @handleData="handleData"></projectInfo>
		<view class="content">
			<view class="pro-title">
				变更信息
			</view>
			<view class="content-item">
				<view class="title">变更原因</view>
				<view class="desc" v-text="data.modifyReason"></view>
			</view>
			<view class="content-item">
				<view class="title">变更内容</view>
				<view class="desc" v-text="data.modifyContent"></view>
			</view>
			<view class="content-item">
				<view class="title">责任人</view>
				<view class="desc" v-text="data.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">影响级别</view>
				<view class="desc" v-text="data.influenceLevel"></view>
			</view>
			<view class="content-item">
				<view class="title">影响内容</view>
				<view class="desc" v-text="data.influenceReason"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				方案及进展
			</view>
			<view class="content-item">
				<view class="title">状态</view>
				<view class="desc" v-text="data.status"></view>
			</view>
			<view class="content-item">
				<view class="title">计划完成日期</view>
				<view class="desc" v-text="data.planFinishedDate"></view>
			</view>
			<view class="content-item">
				<view class="title">实际完成日期</view>
				<view class="desc" v-text="data.actualFinishedDate"></view>
			</view>
			<view class="content-item">
				<view class="title">解决方案</view>
				<view class="desc" v-text="data.solution"></view>
			</view>
			<view class="content-item">
				<view class="title">当前进展</view>
				<view class="desc" v-text="data.currentProgress"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		projectModify,
		getProjectModifyStatusEnumMap,
		getInfluenceLevelEnumEnumMap
	} from '@/api/project.js'
	import projectInfo from './projectInfo.vue'
	export default {
		data() {
			return {
				data: {},
				proData:{},
				bindState:{
					showLevel:true,
					showType:true, 
					showPrice:true, 
					showCreateDate:true, 
					showContractType:true, 
					showCustomer:true
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
			let {
				data
			} = await projectModify(this.id)
			const level = await getInfluenceLevelEnumEnumMap()
			const status = await getProjectModifyStatusEnumMap()
			const levelData = level.data.find(item=>item.value == data.influenceLevel)
			const statusData = status.data.find(item=>item.value == data.status)
			data.influenceLevel = levelData.label
			data.status = statusData.label
			this.data = data
		},
		methods:{
			handleData(data){
				this.proData = data
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	/deep/.content .content-item .title{
		min-width: 210rpx;
	}
</style>