<template>
	<view class="details">
		<view class="header p20">
			<listItem :data="details"></listItem>
		</view>
		<view class="table-content">
			<table class="work-table" cellspacing="0" cellpadding="0">
				<tr>
					<th>序号</th>
					<th>考评指标</th>
					<th>得分</th>
				</tr>
				<tr v-for="(item,index) in list">
					<td>{{index+1}}</td>
					<td>{{item.name}}</td>
					<td>{{item.getScore}}</td>
				</tr>
			</table>
			<view class="score">
				<view class="title">绩效等级：<text :class="level">{{level}}</text></view>
				<view class="title">总分：<text :class="level">{{count}}</text></view>
			</view>
			<view class="info">
				<u-icon name="info-circle" color="#999" size="17"></u-icon>
				<view class="text">
					绩效说明：绩效打分时，说明不是必填项
				</view>
			</view>
			<view class="info">
				<u-icon name="info-circle" style="align-items: flex-start;margin-top: 5px;" color="red" size="17"></u-icon>
				<view class="text">
					申诉理由：{{detailData.reason}}
				</view>
			</view>
			<view class="sign-img" v-if="v">
				<view class="title">
					签字：
				</view>
				<view class="img">
					<image :src="v" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findEvalDetail,
		getPerformanceEvaluationByAppealId,
		evalDetail
	} from '@/api/hr.js'
	import listItem from '../../../../index/personnel/result/listItem.vue'
	export default {
		data() {
			return {
				v: '',
				isLoad:true,
				count:'-',
				level:'-',
				param:{},
				details: {},
				detailData:{},
				list: []
			};
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		components: {
			listItem
		},
		async mounted() {
			const source = await getPerformanceEvaluationByAppealId(this.id)
			const {data} = await evalDetail({programmeId:source.data.programmeId,id:source.data.id})
			const findEd = await findEvalDetail(source.data.id)
			const detail = findEd.data
			let time = '暂无'
			let status = ''
			let confirmTime = ''
			if(detail.time){
				time = detail.time.substr(0,7)+'月绩效'
			}
			if(detail.pass == 1 || detail.pass==6){
				status = detail.pass
			}else{
				status = detail.levelString
				confirmTime = detail.confirmTime
			}
			this.details = {
				title:time,
				status,
				person:detail.evaluationUserName,
				submitTime:detail.submitTime,
				confirmTime
			}
			this.count = data.shift().score//删除数组第一个元素并返回（总分数）
			this.level = data.shift().score//删除数组第一个元素并返回（等级）
			this.list = data
			this.isLoad = false
			this.detailData = detail
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">
	.details {
		box-sizing: border-box;
		position: relative;
		background-color: #F6F6F6;
		.table-content {
			box-sizing: border-box;
			background-color: #fff;
			border-radius: 8px;
			padding:10px;
			margin-bottom: 10px;
			
			.work-table {
				border: solid #F1F1F4;
				border-width: 1px 0px 0px 1px;
				width: 100%;
				text-align: center;
				color: #666666;

				th {
					font-weight: 300;
					padding: 8rpx;
					font-size: 28rpx;
					border: 1px solid #F1F1F4;
					color: #25292C;
					height: 30px;
					background-color:#F1F1F4;
					border-width: 0px 1px 1px 0px;
				}

				tr:hover {
					background-color: #eee;
				}
				td {
					padding: 19rpx 15rpx;
					font-size: 26rpx;
					border: solid #F1F1F4;
					border-width: 0px 1px 1px 0px;
				}
			}
			.score{
				line-height:35px;
				border: 1px solid #F1F1F4;border-top:0px;text-align: right;
				font-size: 28rpx;
				color: #666666;
				.title{
					display:inline-block;margin: 0 18px;
				}
			}
			.info{
				display: flex;
				color: #999;
				font-size: 13px;
				margin-top: 5px;
				.text{
					line-height: 30px;
					margin-left:5px;
				}
			}
		}
	}
	.S{color: #2AC8F2;}
	.A{color: #09C8AB;}
	.B{color: #EF8D44;}
	.C{color: #F76634;}
	.D{color: #DF4B3C;}
</style>
