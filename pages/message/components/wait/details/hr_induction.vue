<template>
	<view>
		<view class="content">
			<view class="pro-title">
				员工信息
			</view>
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">姓名</view>
				<view class="desc" v-text="data.name"></view>
			</view>
			<view class="content-item">
				<view class="title">员工编码</view>
				<view class="desc" v-text="data.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">手机号</view>
				<view class="desc" v-text="data.phonenumber"></view>
			</view>
			<view class="content-item">
				<view class="title">工号</view>
				<view class="desc" v-text="data.userName"></view>
			</view>
		</view>
		<view class="content">
			<view class="pro-title">
				入职信息
			</view>
			<view class="content-item">
				<view class="title">入职日期</view>
				<view class="desc" v-text="data.inDate"></view>
			</view>
			<view class="content-item">
				<view class="title">员工类型</view>
				<view class="desc" v-text="data.staffTypeString"></view>
			</view>
			<view class="content-item">
				<view class="title">BASE地</view>
				<view class="desc" v-text="data.baseAddressName"></view>
			</view>
			<view class="content-item">
				<view class="title">岗位</view>
				<view class="desc" v-text="data.postName"></view>
			</view>
			<view class="content-item">
				<view class="title">入职部门</view>
				<view class="desc" v-text="data.orgName"></view>
			</view>
			<view class="content-item">
				<view class="title">直属主管</view>
				<view class="desc" v-text="data.leaderName"></view>
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
		getInduction
	} from '@/api/hr.js'
	import {
		areaCommon
	} from '@/api/system.js'
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
			let {data} = await getInduction(this.id)
			this.data = data
			let city = ''
			const area = await areaCommon()
			area.data.rows && area.data.rows.map(item => {
				if (this.data.baseAddress == item.id) {
					city = item.commonName
				}
			})
			this.city = city
		} 
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
</style>