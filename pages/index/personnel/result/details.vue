<template>
	<view class="details">
		<view class="in-title" :style="{'padding-top':(safe.barHeight+10)+'px'}">
			<view class="title">
				绩效确认
			</view>
		</view>
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
			<view class="info" v-if="showProcess">
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
		<view class="step-line p20" v-if="showProcess">
			<view class="intitle">
				申诉进程
			</view>
			<LineProcess :data="process"></LineProcess>
		</view>
		<view style="width: 100%;height: 100px;background-color: #F6F6F6;"></view>
		<view class="bottom-bar" v-if="!isLoad && detailData.pass == 6" :style="{'padding-bottom':(safe.safeBottom+30)+'px'}">
			<view class="bar-item" @click="toSign">
				<view class="img">
					<image src="/static/menu/result/qianzi.png" mode=""></image>
				</view>
				<view class="text">
					签字
				</view>
			</view>
			<view class="bar-item" @click="appeal">
				<view class="img">
					<image src="/static/menu/result/shensu.png" mode=""></image>
				</view>
				<view class="text">
					申诉
				</view>
			</view>
			<view class="bar-item" @click="confirm">
				<view class="img">
					<image src="/static/menu/result/queren.png" mode=""></image>
				</view>
				<view class="text">
					确认
				</view>
			</view>
		</view>
		<sinSignature ref="sig" :safe="safe" @input="signDone" v-model="v"></sinSignature>
	</view>
</template>
<script>
	import {
		findEvalDetail,
		evalDetail,
		confirmEvaluation
	} from '@/api/hr.js'
	import {
		getTrackById
	} from '@/api/process.js'
	import sinSignature from "@/components/sin-signature/sin-signature.vue"
	import LineProcess from '@/components/line-process/line-process.vue'
	import listItem from './listItem.vue'
	export default {
		data() {
			return {
				v: '',
				safe:{
					barHeight: 0,
					safeBottom: 0,
				},
				process: [],
				showSign:false,
				showProcess:false,
				isLoad:true,
				count:'-',
				level:'-',
				param:{},
				details: {},
				detailData:{},
				list: []
			};
		},
		components: {
			sinSignature,
			LineProcess,
			listItem
		},
		onShow() {
			this.LoadData()
		},
		onLoad(param) {
			uni.getSystemInfo({
				success: (e) => {
					this.safe.barHeight = e.statusBarHeight
					this.safe.safeBottom = e.safeAreaInsets.bottom
				}
			})
			this.param = param
		},
		methods: {
			async LoadData(){
				const {data} = await evalDetail(this.param)
				const findEd = await findEvalDetail(this.param.id)
				const detail = findEd.data
				let time = '暂无'
				let status = ''
				let confirmTime = ''
				if(detail.time){
					time = detail.time.substr(0,7)+'月绩效'
				}
				if(detail.pass == 1 || detail.pass==6){
					status = detail.pass
				}else if(detail.pass == 2 && detail.isAppeal==1){
					status = detail.levelString	
					time = time+'(申诉成功)'
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
				//流程轨迹 已申诉  申诉成功显示
				if(detail.isAppeal==1 || (detail.isAppeal==0 && detail.pass==1)){
					this.showProcess = true
					const trackData = await getTrackById(detail.appealId)
					const trackNewArr = []
					trackData.data.forEach(item => {
						item.approveList.forEach(item2 => {
							trackNewArr.push(item2)
						})
					})
					this.process = trackNewArr
				}
				this.detailData = detail
			},
			async toSign() {
				let s = await this.$refs.sig.getSyncSignature();
			},
			confirm() {
				if(!this.v){
					uni.showToast({
						title: '请先签字',
						icon: 'none'
					})
					return;
				}
				confirmEvaluation({
					id:this.param.id,
					strBase64Image:this.v
				}).then(res=>{
					this.LoadData()
				})
			},
			appeal(){
				if(this.detailData.appealNumber > 0){
					uni.showToast({
						title: '不能重复申诉',
						icon: 'none'
					})
					return;
				}
				uni.navigateTo({
					url:'./appeal?id='+this.param.id
				})
			},
			signDone(){
				setTimeout(() => {
				   uni.pageScrollTo({scrollTop: 99999, duration: 0});
				}, 50);
			}
		}
	}
</script>
<style lang="scss">
	page{
		background-color: #F6F6F6;
	}
	.details {
		box-sizing: border-box;
		position: relative;
		background-color: #F6F6F6;
		.in-title {
			width: 100%;
			padding-top: 100rpx;
			height: 200px;
			background: linear-gradient(to bottom, #FF9630, #F6F6F6);
			.title {
				text-align: center;
				font-size: 16px;
				color: #fff;
				font-weight: bold;
			}
		}

		.header {
			margin-top: -130px;
		}

		.table-content {
			box-sizing: border-box;
			background-color: #fff;
			border-radius: 8px;
			padding:10px;
			margin: 10px;
			
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
			.sign-img{
				margin: 20px 0 20px 0;
				display: flex;
				justify-content: flex-end;
				overflow: hidden;
				.title{
					 align-self: center;
					 color:#666666;
					 font-size: 15px;
				}
				.img{
					max-width: 70%;
					image{
						max-width:97%;
						height: 100px;
						border: 1px solid #F1F1F4;
					}
				}
			}
		}
		
		.bottom-bar{
			display: flex;
			position: fixed;
			bottom:0;
			width: 100%;
			box-sizing: border-box;
			background-color: #fff;
			height:70px;
			padding-top:10px;
			border-top: 1px solid #F1F1F4;
			.bar-item{
				flex: 1;
				text-align: center;
				font-size: 14px;
				color: #333333;
				.img{
					image{
						width:25px;
						height:25px;
					}
				}
			}
		}
	}
	.S{color: #2AC8F2;}
	.A{color: #09C8AB;}
	.B{color: #EF8D44;}
	.C{color: #F76634;}
	.D{color: #DF4B3C;}
	.step-line {
		margin-bottom: 40rpx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 8px;
		padding:10px;
		margin: 10px;
		.intitle{
			font-size: 17px;
			margin:5px 5px 20px 5px;
		}
	}
</style>
