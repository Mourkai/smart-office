<template>
	<view>
		<projectInfo :id="data.projectId" showLevel showContractType showType @handleData="handleData"></projectInfo>
		<view class="content">
			<view class="content-item">
				<view class="title">委托方</view>
				<view class="desc" v-text="proData.customerName"></view>
			</view>
			<view class="content-item">
				<view class="title">立项日期</view>
				<view class="desc" v-text="proData.createDate"></view>
			</view>
			<view class="content-item">
				<view class="title">项目验收日期</view>
				<view class="desc" v-text="proData.finishedDate"></view>
			</view>
			<view class="content-item">
				<view class="title">合同金额</view>
				<view class="desc" v-text="data.contractPrice"></view>
			</view>
			<view class="content-item">
				<view class="title">开票金额</view>
				<view class="desc" v-text="data.ticketPrice"></view>
			</view>
			<view class="content-item">
				<view class="title">收款金额</view>
				<view class="desc" v-text="data.getPrice"></view>
			</view>
			<view class="content-item">
				<view class="title">项目总成本</view>
				<view class="desc" v-text="data.totalCost"></view>
			</view>
			<view class="content-item">
				<view class="title">项目毛利率</view>
				<view class="desc" v-text="data.contractPrice"></view>
			</view>
			<view class="content-item">
				<view class="title">项目交付成果</view>
				<view class="desc" v-text="data.deliverables"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		projectAcceptance
	} from '@/api/project.js'
	import projectInfo from './projectInfo.vue'
	export default {
		name: 'projce_check',
		data() {
			return {
				data:{
					formalProjectDto:{}
				},
				proData:{}
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
			let {data} = await projectAcceptance(this.id)
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
		min-width: 230rpx;
	}
</style>
