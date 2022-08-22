<template>
	<view>
		<view class="content">
			<view class="pro-title">
				项目信息
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
				<view class="title">项目经理</view>
				<view class="desc" v-text="data.projectInfoDto.projectManagerName"></view>
			</view>
			<view class="content-item">
				<view class="title">所属部门</view>
				<view class="desc" v-text="data.projectInfoDto.orgName"></view>
			</view>
			<view class="content-item">
				<view class="title">部门负责人</view>
				<view class="desc" v-text="data.projectInfoDto.leaderName"></view>
			</view>
			<view class="content-item">
				<view class="title">所属业务线</view>
				<view class="desc" v-text="data.projectInfoDto.businessLineName"></view>
			</view>
			<view class="content-item">
				<view class="title">项目类型</view>
				<view class="desc" v-text="data.type"></view>
			</view>
			<view class="content-item">
				<view class="title">项目起止时间</view>
				<view class="desc">
					{{data.startDate +' - '+data.endDate}}
				</view>
			</view>
			<view class="content-item">
				<view class="title">项目所在地</view>
				<view class="desc" v-for="item in data.areas">{{item}}</view>
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
		formalProject,
		getProjectTypeEnum
	} from '@/api/project.js'
	import files from './files.vue'
	import localCache from '@/util/cache.js'
	export default {
		data() {
			return {
				data: {
					projectInfoDto:{}
				}
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
			let {
				data
			} = await formalProject(this.id)
			const type = await getProjectTypeEnum();
			const r2Data = type.data.find(item=>data.projectInfoDto.type  == item.value)
			data.type = r2Data.label
			const areas = []
			const allArea = localCache.getCache("allArea")
			data.projectInfoDto.projectAddressDtoList.forEach(item=>{
				const province = allArea.find(item2=>item2.id == item.provinceId)
				if(province){
					const city = province.children.find(item3=>item3.id == item.cityId)
					areas.push(province.areaName+'/'+city.areaName)
				}
			})
			console.log(data.projectInfoDto.projectAddressDtoList);
			data.areas = areas
			console.log(data.areas);
			this.data = data
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
	.content .content-item .title{
		min-width: 220rpx;
	}
	/deep/.content .content-item .title{
		min-width: 220rpx;
	}
</style>
