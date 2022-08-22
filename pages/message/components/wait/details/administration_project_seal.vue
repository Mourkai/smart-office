<template>
	<view>
		<projectInfo :id="data.projectId"></projectInfo>
		<view class="content">
			<view class="pro-title">
				用印信息
			</view>
			<view class="content-item">
				<view class="title">印章公司</view>
				<view class="desc" v-text="data.companyName"></view>
			</view>
			<view class="content-item">
				<view class="title">印章类型</view>
				<view class="desc" v-text="data.type"></view>
			</view>
			<view class="content-item">
				<view class="title">印章事由</view>
				<view class="desc" v-text="data.reason"></view>
			</view>
		</view>
		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		projectSeal,
		getSealTypeEnumMap
	} from '@/api/administration.js'
	import projectInfo from './projectInfo.vue'
	import files from './files.vue'
	
	export default {
		data() {
			return {
				showFile: false,
				data:{}
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		components:{
			files,
			projectInfo
		},
		async mounted() {
			let {data} = await projectSeal(this.id)
			const r1 = await getSealTypeEnumMap()//获取印章类型枚举类
			const r1Data = r1.data.find(item=>item.value == data.type)
			if(r1Data){
				data.type = r1Data.label
			}
			this.data = data
		}
	}
</script>
<style lang="scss" scoped>
	@import "../config/details.scss";
</style>
