<template>
	<view>
		<view class="content">
			<view class="pro-title">
				员工信息
			</view>
			<view class="content-item">
				<view class="title">姓名</view>
				<view class="desc" v-text="data.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">员工编码</view>
				<view class="desc" v-text="data.sysWorkInfoDto.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">工号</view>
				<view class="desc" v-text="data.workCode"></view>
			</view>
			<view class="content-item">
				<view class="title">入职日期</view>
				<view class="desc" v-text="data.sysWorkInfoDto.inDate"></view>
			</view>
			<view class="content-item">
				<view class="title">手机号</view>
				<view class="desc" v-text="data.sysWorkInfoDto.phonenumber"></view>
			</view>
			<view class="content-item">
				<view class="title">员工类型</view>
				<view class="desc" v-text="data.sysWorkInfoDto.staffTypeDesc"></view>
			</view>
			<view class="content-item">
				<view class="title">所在部门</view>
				<view class="desc" v-text="data.sysWorkInfoDto.orgName"></view>
			</view>
			<view class="content-item">
				<view class="title">岗位</view>
				<view class="desc" v-text="data.sysWorkInfoDto.postName"></view>
			</view>
			<view class="content-item">
				<view class="title">直属主管</view>
				<view class="desc" v-text="data.sysWorkInfoDto.leaderName"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				离职信息
			</view>
			<view class="content-item">
				<view class="title">最后工作日</view>
				<view class="desc" v-text="data.outDate"></view>
			</view>
			<view class="content-item">
				<view class="title">薪资结算日期</view>
				<view class="desc" v-text="data.outPayDate"></view>
			</view>
			<view class="content-item">
				<view class="title">待处理审批交接</view>
				<view class="desc" v-text="data.outHandoverPersonName"></view>
			</view>
			<view class="content-item">
				<view class="title">离职原因</view>
				<view class="desc" v-text="data.reason"></view>
			</view>
			<view class="content-item">
				<view class="title">劳动合同开始日期</view>
				<view class="desc" v-text="data.workdate.firstStartDate"></view>
			</view>
			<view class="content-item">
				<view class="title">劳动合同结束日期</view>
				<view class="desc" v-text="data.workdate.firstEndDate"></view>
			</view>
			<view class="content-item">
				<view class="title">项目交接事项</view>
				<view class="desc" v-text="data.outHandoverProject"></view>
			</view>
			<view class="content-item">
				<view class="title">办公设备交接事项</view>
				<view class="desc" v-text="data.outHandoverEquipment"></view>
			</view>
			<view class="content-item">
				<view class="title">财务交接事项</view>
				<view class="desc" v-text="data.outHandoverFinance"></view>
			</view>
			<view class="content-item">
				<view class="title">备注</view>
				<view class="desc" v-text="data.remark"></view>
			</view>
		</view>
		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import files from './files.vue'
	import {
		outDetail,
		getReasonsForResignationEnum
	} from '@/api/hr.js'
	
	import {
		workDate
	} from '@/api/system.js'
	
	export default {
		data() {
			return {
				data:{sysWorkInfoDto:{}}
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
			let {data} = await outDetail(this.id)
			const reason = await getReasonsForResignationEnum()
			const workdate = await workDate(data.userId)
			let reasonstr = ''
			data.outReasonArray.forEach(item=>{
				let r2Data = reason.data.find(item2=>item == item2.value)
				reasonstr += r2Data.label+','
			})
			reasonstr = reasonstr.substr(0,reasonstr.length-1)
			data.reason = reasonstr
			data.workdate = workdate
			this.data = data
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	.content .content-item .title{
		min-width: 250rpx;
	}
</style>