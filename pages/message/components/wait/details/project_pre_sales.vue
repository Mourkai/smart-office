<template>
	<view>
		<projectInfo :id="data.projectId" showLevel showType showContractType></projectInfo>
		<view class="content">
			<view class="content-item">
				<view class="title">申请人</view>
				<view class="desc" v-text="data.createByName"></view>
			</view>
			<view class="content-item">
				<view class="title">申请时间</view>
				<view class="desc" v-text="data.startupTime"></view>
			</view>
			<!-- <view class="content-item">
				<view class="title">售前负责人</view>
				<view class="desc" v-text="data.projectInfoDto.createByName"></view>
			</view> -->
			<view class="content-item">
				<view class="title">售前相关人</view>
				<view class="desc" v-for="(item,index) in presaleRelationName" v-text="item"></view>
			</view>
			<!-- <view class="content-item">
				<view class="title">所属部门</view>
				<view class="desc" v-text="data.projectInfoDto.orgName"></view>
			</view> -->
			<!-- <view class="content-item">
				<view class="title">部门负责人</view>
				<view class="desc" v-text="data.projectInfoDto.leaderName"></view>
			</view> -->
			<view class="content-item">
				<view class="title">建设主体</view>
				<view class="desc" v-text="data.projectInfoDto.buildMain"></view>
			</view>
			<view class="content-item">
				<view class="title">委托方</view>
				<view class="desc" v-text="data.projectInfoDto.customerName"></view>
			</view>
			<view class="content-item">
				<view class="title">委托方所属部门</view>
				<view class="desc" v-text="list.name"></view>
			</view>
			<view class="content-item">
				<view class="title">委托方联系人</view>
				<view class="desc" v-text="list.deptLeader"></view>
			</view>
			<view class="content-item">
				<view class="title">委托方联系方式</view>
				<view class="desc" v-text="list.leaderPhone"></view>
			</view>
			<view class="content-item">
				<view class="title">项目所在地</view>
				<view class="desc" v-for="(item,index) in areas" v-text="item"></view>
			</view>
			<view class="content-item">
				<view class="title">立项日期</view>
				<view class="desc" v-text="data.projectInfoDto.createDate"></view>
			</view>
			<view class="content-item">
				<view class="title">预计启动日期</view>
				<view class="desc" v-text="data.startupTime"></view>
			</view>
			<view class="content-item">
				<view class="title">预计合同金额</view>
				<view class="desc" v-text="data.projectInfoDto.price"></view>
			</view>
			<view class="content-item">
				<view class="title">总体描述</view>
				<view class="desc" v-text="data.projectInfoDto.content"></view>
			</view>
		</view>
		<files :files="data.projectInfoDto.attchmentDto" />
	</view>
</template>

<script>
	import {
		presalesProject,
		// getProjectInfo
	} from '@/api/project.js'
	import {customerDepartment} from '@/api/system.js'
	import projectInfo from './projectInfo.vue'
	import files from './files.vue'
	import localCache from '@/util/cache.js'
	export default {
		data() {
			return {
				data: {
					projectInfoDto:{
						presalesProjectDto:{}
					}
				},
				handleProjectData:{},
				list:{},
				type:['','项目','框架'],//合同类型
				areas:[],
				presaleRelationName:[]
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		components: {
			projectInfo,
			files
		},
		async mounted() {
			let {
				data
			} = await presalesProject(this.id)
			let list = await customerDepartment(data.projectInfoDto.customerDeptId)
			this.list = list.data
			this.data = data
			this.presaleRelationName = data.projectInfoDto.presalesProjectDto.presaleRelationName
			const allArea = localCache.getCache("allArea")
			data.projectInfoDto.projectAddressDtoList.forEach(item=>{
				const province = allArea.find(item2=>item2.id == item.provinceId)
				if(province){
					const city = province.children.find(item3=>item3.id == item.cityId)
					this.areas.push(province.areaName+'/'+city.areaName)
				}
			})
		},
		methods:{
			handleData(data){
				this.handleProjectData = data
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	/deep/.content .content-item .title{
		min-width: 260rpx;
	}
</style>
