<template>
	<view>
		<view class="content">
			<view class="pro-title">
				申请信息
			</view>
			<view class="content-item" v-for="item in fieldArr[currentIndex]">
				<view class="title" v-text="item.title"></view>
				<view class="desc" v-text="data[item.field]"></view>
			</view>
		</view>

		<view class="content">
			<view class="pro-title">
				付款信息
			</view>
			<view class="content-item">
				<view class="title">金额合计</view>
				<view class="desc" v-text="data.payAmount"></view>
			</view>
			<view class="content-item">
				<view class="title">款项性质</view>
				<view class="desc" v-if="data.nature == 1">合同预付款</view>
				<view class="desc" v-else>押金/保证金</view>
			</view>
			<view class="content-item">
				<view class="title">收款人</view>
				<view class="desc" v-text="data.accountName"></view>
			</view>
			<view class="content-item">
				<view class="title">收款账户</view>
				<view class="desc" v-text="data.account"></view>
			</view>
			<view class="content-item">
				<view class="title">开户行</view>
				<view class="desc" v-text="data.openBank"></view>
			</view>
		</view>
		<view class="topc p20">
			明细信息请在PC端查看
		</view>
		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		paymentDetail,
		reimbursementTypeList
	} from '@/api/fee.js'
	
	import {
		selectListByType
	} from '@/api/administration.js'
	
	import files from './files.vue'
	export default {
		data() {
			return {
				data: {},
				currentIndex:0,
				fieldArr:[
					[
						{title:'申请人',field:'createByName'},
						{title:'申请时间',field:'createTime'},
						{title:'预计付款时间',field:'payDate'},
						{title:'付款科目',field:'typeId'},
						{title:'采购/事项申请',field:''},
						{title:'项目名称',field:'projectName'},
						{title:'项目编号',field:'projectCode'},
						{title:'采购/事项申请流程编号',field:'instanceNo'}
					],
					[
						{title:'申请人',field:'createByName'},
						{title:'申请时间',field:'createTime'},
						{title:'预计付款时间',field:'payDate'},
						{title:'付款科目',field:'typeId'},
						{title:'项目名称',field:'projectName'},
						{title:'项目编号',field:'projectCode'}
					],
					[
						{title:'申请人',field:'createByName'},
						{title:'申请时间',field:'createTime'},
						{title:'预计付款时间',field:'payDate'},
						{title:'付款科目',field:'typeId'}
					]
				]
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
		async mounted() {
			let {
				data
			} = await paymentDetail(this.id)
			const reimbursemen = await reimbursementTypeList({payment:1});
			const r2Data = reimbursemen.data.find(item=>data.typeId  == item.id)
			
			if(['15','16','17','36'].indexOf(data.typeId) !== -1){
				this.currentIndex = 1
			}else if(['25','27','28','29','30','31','33','34','35','37'].indexOf(data.typeId) !== -1){
				this.currentIndex = 0
			}else{
				this.currentIndex = 2
			}
			data.typeId = r2Data.name
			data.payDate = data.payDate && data.payDate.substr(0,10)
			const selectList = await selectListByType();
			this.data = data
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	.topc{
		line-height:70rpx;
		font-size: 30rpx;
		color:#3196FA;
	}
</style>
