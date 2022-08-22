<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">申请人</view>
				<view class="desc" v-text="data.createByName"></view>
			</view>
			<view class="content-item">
				<view class="title">申请时间</view>
				<view class="desc" v-text="data.createTime"></view>
			</view>
		</view>
		<view class="content">
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">合同名称</view>
				<view class="desc" v-text="data.name"></view>
			</view>
			<view class="content-item">
				<view class="title">合同编号</view>
				<view class="desc" v-text="data.code"></view>
			</view>
			<view class="content-item">
				<view class="title">甲方</view>
				<view class="desc" v-text="data.companyName"></view>
			</view>
			<view class="content-item">
				<view class="title">乙方</view>
				<view class="desc" v-text="data.customerName"></view>
			</view>
			<view class="content-item">
				<view class="title">丙方</view>
				<view class="desc" v-text="data.thirdPart"></view>
			</view>
			<view class="content-item">
				<view class="title">合同类型</view>
				<view class="desc" v-text="data.contractType"></view>
			</view>
			<view class="content-item">
				<view class="title">合同签订日期</view>
				<view class="desc" v-text="data.createTime"></view>
			</view>
			<view class="content-item">
				<view class="title">合同金额</view>
				<view class="desc" v-text="data.amount"></view>
			</view>
			<view class="content-item">
				<view class="title">合同付款条件</view>
				<view class="desc" v-text="data.specialProvisions"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				项目信息
			</view>
			<view class="content-item">
				<view class="title">项目名称</view>
				<view class="desc" v-text="data.projectContractPaymentDetailDto.projectName"></view>
			</view>
			<view class="content-item">
				<view class="title">项目经理</view>
				<view class="desc" v-text="data.projectContractPaymentDetailDto.projectManagerName"></view>
			</view>
			<view class="content-item">
				<view class="title">项目编码</view>
				<view class="desc" v-text="data.projectContractPaymentDetailDto.projectCode"></view>
			</view>
		</view>
		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		contractPaymentInfo,
		getProjectContractTypeEnum
	} from '@/api/project.js'
	import files from './files.vue'
	export default {
		data() {
			return {
				data: {
					projectContractPaymentDetailDto:{},
				},
				showFile: false
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		components:{
		   files	
		},
		methods: {
			async contractPaymentInfo() {
				let {
					data
				} = await contractPaymentInfo(this.id)
				
				const ct = await getProjectContractTypeEnum()
				const ctData = ct.data.find(item=>data.type  == item.value)
				data.contractType = ctData.label
				//console.log(data, 1111)
				this.data = data
			}
		},
		mounted() {
			this.contractPaymentInfo()
		}

	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	.content .content-item .title{
		min-width: 210rpx;
	}
</style>
