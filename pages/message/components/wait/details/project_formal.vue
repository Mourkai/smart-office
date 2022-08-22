<template>
	<view>
		<projectInfo :id="data.projectId"></projectInfo>
		<view class="content">
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
				<view class="title">项目等级</view>
				<view class="desc" v-text="level[data.projectInfoDto.level]"></view>
			</view>
			<view class="content-item">
				<view class="title">项目类型</view>
				<view class="desc" v-text="type[data.projectInfoDto.type]"></view>
			</view>
			<view class="content-item">
				<view class="title">项目起止日期</view>
				<view class="desc">{{data.startDate}} ~ {{data.endDate}}</view>
			</view>
			<view class="content-item" v-for="(item,index) in data.projectInfoDto.projectAddressDtoList">
				<view class="title">项目所在地</view>
				<view class="desc" v-for="(item,index) in areas" v-text="item"></view>
			</view>
			<view class="content-item">
				<view class="title">合同类型</view>
				<view class="desc" v-text="data.contractType"></view>
			</view>
			<view class="content-item">
				<view class="title">预估合同金额</view>
				<view class="desc" v-text="data.projectInfoDto.price"></view>
			</view>
			<view class="content-item">
				<view class="title">总体概述</view>
				<view class="desc" v-text="data.projectInfoDto.content"></view>
			</view>
			<view class="content-item">
				<view class="title">执行重要信息</view>
				<view class="desc" v-text="data.importantContent"></view>
			</view>
			<view class="content-item">
				<view class="title">项目协作</view>
				<view class="desc" v-text="data.projectInfoDto.formalProjectDto.collaboration"></view>
			</view>
			<view class="content-item">
				<view class="title">支付成果</view>
				<view class="desc" v-text="data.deliverables"></view>
			</view> 
		</view>
		<files :files="data.projectInfoDto.attchmentDto" />
	</view>
</template>

<script>
	import {
		formalProject,
		getProjectContractTypeEnum
	} from '@/api/project.js'
	import {customerDepartment} from '@/api/system.js'
	import projectInfo from './projectInfo.vue'
	import files from './files.vue'
	import localCache from '@/util/cache.js'
	export default {
		data() {
			return {
				data: {
					projectInfoDto:{formalProjectDto:{}}
				},
				areas:[],
				list:{},
				type:['','咨询','实施','运维','研发','硬件','集成','其他'],//项目类型
				level:['','A-战略型项目或合同金额较大','B-多个系统或技术难度高且合同金一般','C-单一系统或技术难度低且合同金额较小'],//项目等级
				cityId:['','','','','','']//项目所在地
			}
		},
		components: {
			projectInfo,
			files
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
			} = await formalProject(this.id)
			let list = await customerDepartment(data.projectInfoDto.customerDeptId)
			let cte = await getProjectContractTypeEnum()
			const contractType = cte.data.find(item=>item.value == data.projectInfoDto.contractType)
			this.list = list.data
			data.contractType = contractType.label
			const allArea = localCache.getCache("allArea")
			data.projectInfoDto.projectAddressDtoList.forEach(item=>{
				const province = allArea.find(item2=>item2.id == item.provinceId)
				if(province){
					const city = province.children.find(item3=>item3.id == item.cityId)
					this.areas.push(province.areaName+'/'+city.areaName)
				}
			})
			this.data = data
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	/deep/.content .content-item .title{
	  min-width: 300rpx;
	 }
</style>
