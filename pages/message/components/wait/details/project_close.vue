<template>
	<view>
		<projectInfo :id="data.projectId" v-bind="bindState"></projectInfo>
		<view class="content">
			<view class="pro-title">
				项目成员
			</view>
			<view class="content-item" v-for="item in data.projectPersonsDtoList" :key="item.id">
				<view class="title" v-text="item.userName"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				项目总结
			</view>
			<view class="content-item">
				<view class="title">项目交付成果</view>
				<view class="desc" v-text="data.deliverables"></view>
			</view>
			<view class="content-item">
				<view class="title">计划与实际情况对比</view>
				<view class="desc" v-text="data.comparison"></view>
			</view>
			<view class="content-item">
				<view class="title">经验和教训</view>
				<view class="desc" v-text="data.learned"></view>
			</view>
			<view class="content-item">
				<view class="title">项目后期维护建议</view>
				<view class="desc" v-text="data.suggestions"></view>
			</view>
			<view class="content-item">
				<view class="title">结项理由</view>
				<view class="desc" v-text="data.reason"></view>
			</view>
		</view>
		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		getProjectClose
	} from '@/api/project.js'
	import projectInfo from './projectInfo.vue'
	import files from './files.vue'
	export default {
		data() {
			return {
				data:{},
				dataInfo:{},
				bindState:{
					showLevel:true,
					showType:true, 
					showPrice:true, 
					showCycle:true, 
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
			projectInfo,
			files
		},
		async mounted() {
			let {data} = await getProjectClose(this.id)
			this.data = data
		} 
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	/deep/.content .content-item .title{
		min-width: 280rpx;
	}
</style>
