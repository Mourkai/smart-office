<template>
	<view>
		<view class="content">
			<!-- 			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view> -->
			<view class="content-item">
				<view class="title">姓名</view>
				<view class="desc" v-text="user.employeeBaseDto.name"></view>
			</view>
			<view class="content-item">
				<view class="title">员工编码</view>
				<view class="desc" v-text="user.sysUserDto.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">工号</view>
				<view class="desc" v-text="user.sysUserDto.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">手机号</view>
				<view class="desc" v-text="user.sysUserDto.phonenumber"></view>
			</view>
			<view class="content-item">
				<view class="title">入职类型</view>
				<view class="desc" v-text="user.sysWorkInfoDto.staffTypeDesc"></view>
			</view>
			<!-- 			<view class="content-item">
				<view class="title">员工类型</view>
				<view class="desc" v-text="data.sysWorkInfoDto.staffTypeDesc"></view>
			</view> -->
			<view class="content-item">
				<view class="title">所在部门</view>
				<view class="desc" v-text="user.sysWorkInfoDto.orgName"></view>
			</view>
			<view class="content-item">
				<view class="title">岗位</view>
				<view class="desc" v-text="user.sysWorkInfoDto.postName"></view>
			</view>
			<view class="content-item">
				<view class="title">身份证号</view>
				<view class="desc" v-text="user.sysUserDto.idNumber"></view>
			</view>
			<view class="content-item">
				<view class="title">银行卡号</view>
				<view class="desc" v-text="user.sysWorkInfoDto.bankCard"></view>
			</view>
			<view class="content-item">
				<view class="title">开户行</view>
				<view class="desc" v-text="user.sysWorkInfoDto.openBank"></view>
			</view>
			<view class="content-item">
				<view class="title">合同公司</view>
				<view class="desc" v-text="user.sysWorkInfoDto.registCompanyDesc"></view>
			</view>
		</view>
		<view class="content" v-for="item in data">
			<view class="pro-title">
				薪资调整项
			</view>
			<view class="content-item">
				<view class="title">薪资调整申请</view>
				<view class="desc" v-text="type[item.type]"></view>
			</view>
			<view class="content-item">
				<view class="title">原金额</view>
				<view class="desc" v-text="item.oldPrice"></view>
			</view>
			<view class="content-item">
				<view class="title">调整后金额</view>
				<view class="desc" v-text="item.nowPrice"></view>
			</view>
			<view class="content-item">
				<view class="title">生效时间</view>
				<view class="desc" v-text="item.effectDate"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		changeSalary
	} from '@/api/hr.js'
	import {
		getUserInfo
	} from '@/api/system.js'
	export default {
		data() {
			return {
				data: [],
				type:['','公积金补贴','租房补贴','综合补贴','其他补贴','基本薪资','岗位薪资','绩效薪资','保底年薪金额','社保缴纳基数','公积金缴纳基数'],
				user: {
					employeeBaseDto: {},
					sysUserDto: {},
					sysWorkInfoDto: {}
				}
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		async mounted() {
			let {
				data
			} = await changeSalary(this.id)
			let userData = await getUserInfo(data[0].userId)
			this.data = data
			this.user = userData.data
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";

	.content .content-item .title {
		min-width: 200rpx;
	}
</style>
