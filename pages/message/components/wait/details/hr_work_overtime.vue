<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">姓名</view>
				<view class="desc" v-text="data.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">员工编码</view>
				<view class="desc" v-text="data.userData.sysUserDto.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">工号</view>
				<view class="desc" v-text="data.userData.sysUserDto.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">手机号</view>
				<view class="desc" v-text="data.userData.sysUserDto.phonenumber"></view>
			</view>
			<view class="content-item">
				<view class="title">员工类型</view>
				<view class="desc" v-text="data.userData.sysWorkInfoDto.staffTypeDesc"></view>
			</view>
			<view class="content-item">
				<view class="title">所在部门</view>
				<view class="desc" v-text="data.userData.sysWorkInfoDto.orgName"></view>
			</view>
			<view class="content-item">
				<view class="title">岗位</view>
				<view class="desc" v-text="data.userData.sysWorkInfoDto.postName"></view>
			</view>
			<view class="content-item">
				<view class="title">直属主管</view>
				<view class="desc" v-text="data.userData.sysWorkInfoDto.leaderName"></view>
			</view>
		</view>
		<view class="content" v-for="item in data.userWorkOverDetailList">
			<view class="pro-title">
				加班信息
			</view>
			<view class="content-item">
				<view class="title">开始时间</view>
				<view class="desc" v-text="item.overDate+' '+item.overStartTime"></view>
			</view>
			<view class="content-item">
				<view class="title">结束时间</view>
				<view class="desc" v-text="item.overDate+' '+item.overEndTime"></view>
			</view>
			<view class="content-item">
				<view class="title">加班天数</view>
				<view class="desc" v-text="item.duration"></view>
			</view>
			<view class="content-item">
				<view class="title">加班原因</view>
				<view class="desc" v-text="data.reason"></view>
			</view>
			<view class="content-item">
				<view class="title">备注</view>
				<view class="desc" v-text="item.remark"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userWorkOver
	} from '@/api/hr.js'
	
	import {getUserInfo} from '@/api/system.js'
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
		async mounted() {
			let {data} = await userWorkOver(this.id)
			const userData = await getUserInfo(data.userId)
			data.userData = userData.data
			this.data = data
		} 
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
</style>
