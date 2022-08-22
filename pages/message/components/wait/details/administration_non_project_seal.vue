<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">流程编码</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">用印类型</view>
				<view class="desc" v-text="data.useType"></view>
			</view>
			<view class="content-item">
				<view class="title">是否外带</view>
				<view class="desc" v-text="takeOut[data.takeOut]"></view>
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
				<view class="title">用印事由</view>
				<view class="desc" v-text="data.reason"></view>
			</view>
		</view>

		<files :files="data.attchmentDto" />
	</view>
</template>

<script>
	import {
		nonProjectSeal,
		getSealTypeEnumMap,
		getUseSealTypeEnumMap
	} from '@/api/administration.js'
	import files from './files.vue'

	export default {
		name: 'administration_non_project_seal',
		data() {
			return {
				data: {},
				takeOut: ['否', '是'],
				showFile: false
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
			} = await nonProjectSeal(this.id)
			const r1 = await getSealTypeEnumMap() //获取印章类型枚举类
			const r2 = await getUseSealTypeEnumMap() //获取用印类型枚举类
			const r1Data = r1.data.filter(item => item.value == data.type)
			const r2Data = r2.data.filter(item => data.useType == item.value)
			data.type = r1Data[0].label
			data.useType = r2Data[0].label
			this.data = data
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
</style>
