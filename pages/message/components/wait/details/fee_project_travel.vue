<template>
	<view>
		<view class="content">
			<view class="pro-title">
				申请信息
			</view>
			<view class="content-item">
				<view class="title">申请人</view>
				<view class="desc" v-text="data.createByName"></view>
			</view>
			<view class="content-item">
				<view class="title">项目名称</view>
				<view class="desc" v-text="data.projectInfoDto.name"></view>
			</view>
			<view class="content-item">
				<view class="title">项目编号</view>
				<view class="desc" v-text="data.projectInfoDto.code"></view>
			</view>
			<view class="content-item">
				<view class="title">申请时间</view>
				<view class="desc" v-text="data.createTime"></view>
			</view>
			<view class="content-item">
				<view class="title">费用合计</view>
				<view class="desc" v-text="data.totalFee"></view>
			</view>
			<view class="content-item">
				<view class="title">备注</view>
				<view class="desc" v-text="data.remark"></view>
			</view>
		</view>

		<view class="content">
			<view class="pro-title">
				报销信息
			</view>
			<table class="work-table">
				<tr>
					<td>
						金额合计：{{data.totalFee}}
					</td>
					<td>
						备用金剩余金额：{{data.leftFee}}
					</td>
				</tr>
				<tr>
					<td>
						冲销备用金：{{data.writeOffFee}}
					</td>
					<td>
						财务需支付金额：{{data.needPayFee}}
					</td>
				</tr>
				<tr>
					<td colspan="2">收款账户：{{data.payeeAccount}}</td>
				</tr>
				<tr>
					<td colspan="2">开户行：{{data.openBank}}</td>
				</tr>
				<tr>
					<td colspan="2">发票张数：{{data.invoice}}</td>
				</tr>
			</table>
		</view>

		<view class="content">
			<view class="pro-title">
				明细信息
			</view>
			<table class="work-table" v-for="(item,index) in data.trafficList">
				<tr>
					<td>报销科目：{{getType(item.typeId)}}</td>
					<td>交通工具：{{getTra(item.traffic,item.typeId)}}</td>
				</tr>
				<tr>
					<td>乘车日期：{{item.trafficDate}}</td>
					<td>到达日期：{{item.endDate}}</td>
				</tr>
				<tr>
					<td>出发地：{{item.startAddr}}</td>
					<td>目的地：{{item.endAddr}}</td>
				</tr>
				<tr>
					<td>报销金额：{{item.fee}}</td>
					<td>发票张数：{{item.invoice}}</td>
				</tr>
				<tr v-if="item.remark">
					<td colspan="2">说明：{{item.remark}}</td>
				</tr>
			</table>
			<table class="work-table" v-for="(item,index) in data.otherList">
				<tr>
					<td>报销科目：{{getType(item.typeId)}}</td>
					<td>出差地：{{item.endAddr}}</td>
				</tr>
				<tr>
					<td>报销金额：{{item.fee}}</td>
					<td>发票张数：{{item.invoice}}</td>
				</tr>
				<tr v-if="item.remark">
					<td colspan="2">说明：{{item.remark}}</td>
				</tr>
			</table>
			<table class="work-table" v-for="(item,index) in data.subsidyList">
				<tr>
					<td>报销科目：{{getType(item.typeId)}}</td>
					<td>出差地：{{item.endAddr}}</td>
				</tr>
				<tr>
					<td>开始：{{item.startDate}} {{dateList[item.startSign]}}</td>
					<td>结束：{{item.endDate}} {{dateList[item.endSign]}}</td>
				</tr>
				<tr>
					<td>工作日天数：{{item.workDays}}</td>
					<td>加班天数：{{item.workOvertimes}}</td>
				</tr>
				<tr>
					<td>补贴标准：{{item.standard}}</td>
					<td>报销金额：{{item.fee}}</td>
				</tr>
				<tr v-if="item.remark">
					<td colspan="2">说明：{{item.remark}}</td>
				</tr>
			</table>
			<table class="work-table" v-for="(item,index) in data.stayList">
				<tr>
					<td>报销科目：{{getType(item.typeId)}}</td>
					<td>出差地：{{item.endAddr}}</td>
				</tr>
				<tr>
					<td>开始：{{item.startDate}}</td>
					<td>结束：{{item.endDate}}</td>
				</tr>
				<tr>
					<td>房间单价：{{item.roomFee}}</td>
					<td>报销金额：{{item.fee}}</td>
				</tr>
				<tr>
					<td>天数：{{item.days}}</td>
					<td>发票张数：{{item.invoice}}</td>
				</tr>
				<tr v-if="item.remark">
					<td colspan="2">说明：{{item.remark}}</td>
				</tr>
			</table>
		</view>

		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		reimbursementDetail,
		getTrafficCity,
		getTraffic,
		reimbursementTypeList
	} from '@/api/fee.js'
	import files from './files.vue'
	export default {
		data() {
			return {
				data: {projectInfoDto:{}},
				tra: [],
				tracity: [],
				reimbursemen: [],
				dateList: ['全天','上午','下午'],
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		components: {
			files
		},
		async mounted() {
			let {
				data
			} = await reimbursementDetail(this.id)
			const tracity = await getTrafficCity()
			const tra = await getTraffic()
			const reimbursemen = await reimbursementTypeList();
			this.data = data
			this.tracity = tracity.data
			this.tra = tra.data
			this.reimbursemen = reimbursemen.data
		},
		methods: {
			getTra(id,type) {
				let r2Data = {label:''}
				if(type == 19){
					r2Data = this.tra.find(item => id == item.value)
				}else{ //市内
					r2Data = this.tracity.find(item => id == item.value)
				}
				return r2Data.label
			},
			getType(id){
				const r2Data = this.reimbursemen.find(item=>id  == item.id)
				if(r2Data){
					return r2Data.name
				}else{
					return ""
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
</style>
