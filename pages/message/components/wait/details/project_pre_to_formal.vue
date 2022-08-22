<template>
	<view>
		<projectInfo :id="data.projectId" showLevel showType></projectInfo>
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
					<view class="title">建设主体</view>
					<view class="desc" v-text="data.projectInfoDto.buildMain"></view>
				</view>
				<view class="content-item">
					<view class="title">委托方所属部门</view>
					<view class="desc" v-text="data.custom.name"></view>
				</view>
				<view class="content-item">
					<view class="title">委托方联系人</view>
					<view class="desc" v-text="data.custom.deptLeader"></view>
				</view>
				<view class="content-item">
					<view class="title">委托方联系方式</view>
					<view class="desc" v-text="data.custom.leaderPhone"></view>
				</view>
				<view class="content-item">
					<view class="title">预计起止日期</view>
					<view class="desc">{{dateStr}}</view>
				</view>
				<!-- <view class="content-item" v-for="(item,index) in data.projectInfoDto.projectAddressDtoList">
					<view class="title">项目所在地</view>
					<view class="desc" v-text="item.cityId"></view>
				</view> -->
				<view class="content-item">
					<view class="title">合同类型</view>
					<view class="desc" v-text="contractType[data.projectInfoDto.contractType]"></view>
				</view>
				<view class="content-item">
					<view class="title">预计合同金额</view>
					<view class="desc" v-text="data.projectInfoDto.price"></view>
				</view>
				<view class="content-item">
					<view class="title">总体描述</view>
					<view class="desc" v-text="data.projectInfoDto.content"></view>
				</view>
				<view class="content-item">
					<view class="title">执行最要信息</view>
					<view class="desc" v-text="data.importantContent"></view>
				</view>
				<view class="content-item">
					<view class="title">项目协作</view>
					<view class="desc" v-text="data.collaboration"></view>
				</view>
				<view class="content-item">
					<view class="title">交付成果</view>
					<view class="desc" v-text="data.deliverables"></view>
				</view>
		</view>
		<files :files="data.projectInfoDto.attchmentDto" />
	</view>
</template>

<script>
	import {
		presalesProject,
		formalProject,
	} from '@/api/project.js'
	import projectInfo from './projectInfo.vue'
	import files from './files.vue'
	import {customerDepartment} from '@/api/system.js'
	export default {
		data() {
			return {
				data:{
					custom:{},
					projectInfoDto:{formalProjectDto:{}},
				},
				dateStr:'无',
				list:{},
				type:['','咨询','实施','运维','研发','硬件','集成','其他'],//项目类型
				level:['','A-战略型项目或合同金额较大','B-多个系统或技术难度高且合同金一般','C-单一系统或技术难度低且合同金额较小'],//项目等级
				contractType:['','固定期限劳动合同','无固定期限劳动合同','实习协议','劳务协议','劳务派遣合同','返聘协议','短期劳务合同','其他']//合同类型
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		components:{
			projectInfo,
			files
		},
		async mounted() {
			let {data} = await formalProject(this.id)
			let custom = await customerDepartment(data.projectInfoDto.customerDeptId)
			this.data = data
			this.data.custom = custom.data
			if(data.projectInfoDto.formalProjectDto){
				this.dateStr = data.projectInfoDto.formalProjectDto.startDate+'~'+data.projectInfoDto.formalProjectDto.endDate
			}
		} 
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	/deep/.content .content-item .title{
		min-width: 220rpx;
	}
</style>