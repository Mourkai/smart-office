<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">姓名</view>
				<view class="desc" v-text="data.nickName"></view>
			</view>
			<view class="content-item">
				<view class="title">员工编码</view>
				<view class="desc" v-text="data.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">工号</view>
				<view class="desc" v-text="data.workCode"></view>
			</view>
			<view class="content-item">
				<view class="title">手机号</view>
				<view class="desc" v-text="data.phonenumber"></view>
			</view>
			<view class="content-item">
				<view class="title">员工类型</view>
				<view class="desc" v-text="data.staffType"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				调动信息
			</view>
			<view class="content-item">
				<view class="title">原部门</view>
				<view class="desc" v-text="data.orgName"></view>
			</view>
			<view class="content-item">
				<view class="title">原岗位</view>
				<view class="desc" v-text="data.postName"></view>
			</view>
			<view class="content-item">
				<view class="title">原直属主管</view>
				<view class="desc" v-text="data.leaderName"></view>
			</view>
			<view class="content-item">
				<view class="title">转入部门</view>
				<view class="desc" v-text="data.nowDeptName"></view>
			</view>
			<view class="content-item">
				<view class="title">转入岗位</view>
				<view class="desc" v-text="data.nowPostName"></view>
			</view>
			<view class="content-item">
				<view class="title">变更日期</view>
				<view class="desc" v-text="data.updateTime"></view>
			</view>
			<view class="content-item">
				<view class="title">转入直属主管</view>
				<view class="desc" v-text="data.nowLeaderName"></view>
			</view>
			<view class="content-item">
				<view class="title">调动原因</view>
				<view class="desc" v-text="data.reasonsForTransfer"></view>
			</view>
			<view class="content-item">
				<view class="title">备注</view>
				<view class="desc" v-text="data.remark"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		tranAndTurnByid,
		getUserEmployeeTypeEnum
	} from '@/api/hr.js'
	export default {
		data() {
			return {
				data: {}
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
			} = await tranAndTurnByid(this.id)
			
			const ut = await getUserEmployeeTypeEnum()
			this.data = data
			const st = ut.data.find(item=>this.data.staffType === item.value)
			this.data.staffType = st.label
		}
	}
</script>
<style lang="scss" scoped>
	@import "../config/details.scss";
	.content .content-item .title{
		min-width: 210rpx;
	}
</style>
