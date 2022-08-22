<template>
	<view>
		<projectInfo :id="data.projectId"></projectInfo>
		<view class="content">
			<view class="pro-title">
				报销信息
			</view>
			<view class="content-item">
				<view class="title">报销金额合计</view>
				<view class="desc" v-text="data.totalFee"></view>
			</view>
			<view class="content-item">
				<view class="title">备用金剩余金额</view>
				<view class="desc" v-text="data.leftFee"></view>
			</view>
			<view class="content-item">
				<view class="title">冲消备用金金额</view>
				<view class="desc" v-text="data.writeOffFee"></view>
			</view>
			<view class="content-item">
				<view class="title">财务需支付金额</view>
				<view class="desc" v-text="data.needPayFee"></view>
			</view>
			<view class="content-item">
				<view class="title">收款人</view>
				<view class="desc" v-text="data.payee"></view>
			</view>
			<view class="content-item">
				<view class="title">收款账户</view>
				<view class="desc" v-text="data.payeeAccount"></view>
			</view>
			<view class="content-item">
				<view class="title">账户开户行</view>
				<view class="desc" v-text="data.openBank"></view>
			</view>
		</view>
		<view class="content" v-for="item in data.projectReimbursementRecordDtoList">
			<view class="pro-title">
				报销明细
			</view>
			<view class="content-item">
				<view class="title">报销人员</view>
				<view class="desc" v-text="item.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">报销科目</view>
				<view class="desc" v-text="getType(item.type)"></view>
			</view>
			<view class="content-item">
				<view class="title">报销金额</view>
				<view class="desc" v-text="item.fee"></view>
			</view>
			<view class="content-item">
				<view class="title">说明</view>
				<view class="desc" v-text="item.remark"></view>
			</view>
		</view>
		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		projectReimbursement,
		getReimbursementTypeEnum
	} from '@/api/fee.js'
	import projectInfo from './projectInfo.vue'
	import files from './files.vue'
	export default {
		data() {
			return {
				data: {},
				type:[]
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
			let {
				data
			} = await projectReimbursement(this.id)
			const r1 = await getReimbursementTypeEnum()
			this.type = r1.data
			this.data = data
		},
		methods:{
			getType(type){
				let str = ''
				this.type.map(item=>{
					if(item.value == type){
						str = item.label
					}
				})
				return str
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	.content .content-item .title{
		min-width: 220rpx;
	}
	/deep/.content .content-item .title{
		min-width: 220rpx;
	}
</style>
