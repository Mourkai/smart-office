<template>
	<view>
		<projectInfo :id="data.projectId" showType @handleData="handleData"></projectInfo>
		<view class="content">
			<view class="pro-title">
				预算金额
			</view>
			<!-- <view class="content-item">
				<view class="title">预估合同金额</view>
				<view class="desc" v-text="data.contractAmount+' 元'"></view>
			</view> -->
			<!-- <view class="content-item">
				<view class="title">不含税金额</view>
				<view class="desc" v-text="data.withoutTaxAmount+' 元'"></view>
			</view> -->
			
			<view class="content-item">
				<view class="title">预估项目总成本</view>
				<view class="desc" v-text="data.costAmount+' 元'"></view>
			</view>
			<!-- <view class="content-item">
				<view class="title">预估项目毛利率</view>
				<view class="desc" v-text="data.profitAmount+' %'"></view>
			</view> -->
			<!-- <view class="content-item">
				<view class="title">项目预提奖金</view>
				<view class="desc" v-text="data.accruedAmount+' 元'"></view>
			</view> -->
			<!-- <view class="content-item">
				<view class="title">售前成本</view>
				<view class="desc" v-text="data.presaleAmount+' 元'"></view>
			</view> -->
			<!-- <view class="content-item">
				<view class="title">中标服务费预算</view>
				<view class="desc" v-text="data.biddingCostAmount+' 元'"></view>
			</view> -->
			<view class="content-item">
				<view class="title">人员成本预算</view>
				<view class="desc" v-text="data.personCostAmount+' 元'"></view>
			</view>
			<view class="content-item">
				<view class="title">外协成本预算</view>
				<view class="desc" v-text="data.outsourcingAmount+' 元'"></view>
			</view>
			<!-- <view class="content-item">
				<view class="title">质保成本预算</view>
				<view class="desc" v-text="data.qualityAmount+' 元'"></view>
			</view> -->
			<view class="content-item">
				<view class="title">出差补贴预算</view>
				<view class="desc" v-text="data.travelAllowanceAmount+' 元'"></view>
			</view>
			<view class="content-item">
				<view class="title">差旅费预算</view>
				<view class="desc" v-text="data.travelAmount+' 元'"></view>
			</view>
			<view class="content-item">
				<view class="title">flyback费用预算</view>
				<view class="desc" v-text="data.flybackAmount+' 元'"></view>
			</view>
			<!-- <view class="content-item">
				<view class="title">业务招待成本预算</view>
				<view class="desc" v-text="data.receptionAmount+' 元'"></view>
			</view> -->
			<view class="content-item">
				<view class="title">团建成本预算</view>
				<view class="desc" v-text="data.groupAmount+' 元'"></view>
			</view>
			<view class="content-item">
				<view class="title">物资采购预算</view>
				<view class="desc" v-text="data.procurementAmount+' 元'"></view>
			</view>
			<view class="content-item">
				<view class="title">第三方测试预算</view>
				<view class="desc" v-text="data.testAmount+' 元'"></view>
			</view>
			<view class="content-item">
				<view class="title">其他成本预算</view>
				<view class="desc" v-text="data.otherAmount+' 元'"></view>
			</view>
			<!-- 正式项目字段多一些 -->
			<template v-if="proData.normal == 1">
				<view class="content-item">
					<view class="title">项目预提奖金</view>
					<view class="desc" v-text="data.accruedAmount+' 元'"></view>
				</view>
				<view class="content-item">
					<view class="title">业务招待费预算</view>
					<view class="desc" v-text="data.receptionAmount+' 元'"></view>
				</view>
				<view class="content-item">
					<view class="title">质保期成本</view>
					<view class="desc" v-text="data.qualityAmount+' 元'"></view>
				</view>
				<view class="content-item">
					<view class="title">中标服务费预算</view>
					<view class="desc" v-text="data.biddingCostAmount+' 元'"></view>
				</view>
				<view class="content-item">
					<view class="title">售前成本</view>
					<view class="desc" v-text="data.presaleAmount+' 元'"></view>
				</view>
				<view class="content-item">
					<view class="title">预估预算毛利率</view>
					<view class="desc" v-text="data.profitAmount+' 元'"></view>
				</view>
				<view class="content-item">
					<view class="title">不含税金额</view>
					<view class="desc" v-text="data.withoutTaxAmount+' 元'"></view>
				</view>
				<view class="content-item">
					<view class="title">预估合同金额</view>
					<view class="desc" v-text="data.contractAmount+' 元'"></view>
				</view>
			</template>
		</view>
		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		projectBudget
	} from '@/api/project.js'
	import projectInfo from './projectInfo.vue'
	import files from './files.vue'
	export default {
		data() {
			return {
				data:{},
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
			projectInfo,
			files
		},
		async mounted() {
			let {data} = await projectBudget(this.id)
			this.data = data
			//console.log(this.data);
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
		min-width: 240rpx;
	}
</style>
