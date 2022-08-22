<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">姓名</view>
				<view class="desc" v-text="data.sysWorkInfoDto.name"></view>
			</view>
			<view class="content-item">
				<view class="title">员工编码</view>
				<view class="desc" v-text=""></view>
			</view>
			<view class="content-item">
				<view class="title">工号</view>
				<view class="desc" v-text="data.sysWorkInfoDto.workCode"></view>
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
				转正信息
			</view>
			<view class="content-item">
				<view class="title">转正日期</view>
				<view class="desc" v-text="data.regularDate"></view>
			</view>
			<view class="content-item">
				<view class="title">个人优势与不足</view>
				<view class="desc" v-text="data.regularIntroduce"></view>
			</view>
			<view class="content-item">
				<view class="title">未来方向与目标</view>
				<view class="desc" v-text="data.regularTarget"></view>
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
	import {
		regularDetail
	} from '@/api/hr.js'
	import files from './files.vue'
	export default {
		data() {
			return {
				data:{sysWorkInfoDto:{}},
				showFile:false
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
			let {data} = await regularDetail(this.id)
			this.data = data
		}
	}
</script>

<style lang="scss">
	@import "../config/details.scss";
	.content .content-item .title{
		min-width: 230rpx;
	}
</style>
