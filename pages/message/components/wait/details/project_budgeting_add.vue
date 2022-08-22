<template>
	<view>
		<projectInfo :id="data.projectId" showType></projectInfo>
		<view class="content">
			<view class="pro-title">
				原预算金额
			</view>
			<view class="content-item" v-if="data.originContractPrice">
				<view class="title">原预估合同金额</view>
				<view class="desc" v-text="data.originContractPrice+' 元'"></view>
			</view>
			<view class="content-item" v-if="data.originWithoutTax">
				<view class="title">原不含税金额</view>
				<view class="desc" v-text="data.originWithoutTax+' 元'"></view>
			</view>
			<view class="content-item">
				<view class="title">原预估项目总成本</view>
				<view class="desc" v-text="data.originProjectCost+' 元'"></view>
			</view>
			<view class="content-item" v-if="data.originProjectProfit">
				<view class="title">原项目预算毛利率</view>
				<view class="desc" v-text="data.originProjectProfit+' %'"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				修改后预算金额
			</view>
			<view class="content-item" v-if="data.nowContractPrice">
				<view class="title">现预估合同金额</view>
				<view class="desc" v-text="data.nowContractPrice+' 元'"></view>
			</view>
			<view class="content-item" v-if="data.nowWithoutTax">
				<view class="title">现不含税金额</view>
				<view class="desc" v-text="data.nowWithoutTax+' 元'"></view>
			</view>
			<view class="content-item">
				<view class="title">现预估项目总成本</view>
				<view class="desc" v-text="data.nowProjectCost+' 元'"></view>
			</view>
			<view class="content-item" v-if="data.nowProjectProfit">
				<view class="title">现项目预算毛利率</view>
				<view class="desc" v-text="data.nowProjectProfit+' %'"></view>
			</view>
		</view>
		<view class="content" v-for="item in data.projectAddBudgetDetailDtoList">
			<view class="pro-title">
				预算调整项
			</view>
			<view class="content-item">
				<view class="title">预算调整项</view>
				<view class="desc" v-text="item.typeString"></view>
			</view>
			<view class="content-item">
				<view class="title">原金额</view>
				<view class="desc" v-text="item.originPrice+' 元'"></view>
			</view>
			<view class="content-item">
				<view class="title">调整后金额</view>
				<view class="desc" v-text="item.nowPrice+' 元'"></view>
			</view>
		</view>
		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		projectAddBudget
	} from '@/api/project.js'
	import projectInfo from './projectInfo.vue'
	import files from './files.vue'
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
			projectInfo,
			files
		},
		async mounted() {
			let {data} = await projectAddBudget(this.id)
			this.data = data
		} 
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	.content .content-item .title{
		min-width: 150px;
	}
</style>
