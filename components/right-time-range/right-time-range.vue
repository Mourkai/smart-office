<template>
	<view class="right">
		<view class="content">
			<view class="title">
				{{title}}
			</view>
			<view class="btn-group">
				<u-button :type="currentBtn==index?'primary':'info'" v-for="(item,index) in btnList"
					@click="dateBtn(index)" shape="circle" :key="item" :text="item"></u-button>
			</view>
		</view>
		<view class="content">
			<view class="title">
				自定义时间范围
			</view>
			<view class="date">
				<view @click="showTime1 = true">
					<u--input placeholder="开始时间" readonly fontSize="13" v-model="starttime1" />
				</view>
				<view @click="showTime1 = true">
					<u--input placeholder="结束时间" readonly fontSize="13" v-model="endtime1" />
				</view>
			</view>
		</view>
		<u-calendar v-if="showTime1" :show="showTime1" :defaultDate="defaultDate" :minDate="preDate" monthNum="4" mode="range" @confirm="confirmTime1"
			@close="showTime1=false" />
	</view>
</template>

<script>
	import DateUtil from '@/util/date.js'
	export default {
		name: 'right',
		data() {
			return {
				showTime1: false,
				showTime2: false,
				starttime: '',
				defaultDate:[],
				preDate:'',
				endtime: '',
				starttime1:'',
				endtime1:'',
				btnList: ['今天', '昨天', '本周', '上周', '本月', '上月']
			}
		},
		props: {
			title: {
				type: String,
				default: '选择时间'
			},
			currentBtn:{
				type:Number,
				default:999
			},
			start:{
				type:String,
				default:''
			},
			end:{
				type:String,
				default:''
			}
		},
		mounted() {
			this.starttime1 = this.start
			this.endtime1 = this.end
			this.preDate = DateUtil.getPreMonthDay(DateUtil.getNowDay(),3)
		},
		watch:{
			currentBtn(e){
			}
		},
		methods: {
			reset(){
				this.starttime1 = ''
				this.endtime1 = ''
			},
			dateBtn(index) {
				const day = new Date();
				this.starttime1 = ''
				this.endtime1 = ''
				let date = ['','']
				if (index === 0) {
					date = [DateUtil.getNowDay(),DateUtil.getNowDay()]
				} else if (index === 1) {
					date = [DateUtil.getYesterday(),DateUtil.getYesterday()]
				} else if (index === 2) {
					date = [DateUtil.getStartDayOfWeek(),DateUtil.getEndDayOfWeek()]
				} else if (index === 3) {
					date = [DateUtil.getLastWeekStartDate(),DateUtil.getLastWeekEndDate()]
				} else if (index === 4) {
					date = [DateUtil.getStartDayOfMonth(),DateUtil.getEndDayOfMonth()]
				} else if (index === 5) {
					date = [DateUtil.getLastMonthStartDate(),DateUtil.getLastMonthEndDate()]
				}
				//TODO:: 返回时间格式
				this.starttime = date[0]
				this.endtime = date[1]
				this.$emit('setTime',[this.starttime,this.endtime,index])
			},
			confirmTime1(e) {
				this.showTime1 = false;
				this.starttime1 = e.shift()
				this.endtime1 = e.pop()
				this.defaultDate=[this.starttime1,this.endtime1]
				this.$emit('setTime',[this.starttime1,this.endtime1,999])
			},
			confirmTime2(e) {
				this.showTime2 = false;
				this.endtime1 = e[0]
				this.$emit('setTime',[this.starttime1,this.endtime1,999])
			}
		}
	}
</script>
<style lang="scss" scoped>
	.popup-content {


		.content {
			margin-top: 40rpx;

			.title {
				font-size: 30rpx;
				margin-bottom: 20rpx;
			}

			.btn-group {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.u-button {
					width: 30%;
					height: 55rpx;
					margin-bottom: 20rpx;
				}
			}

			.date {
				display: flex;
				justify-content: space-around;
				view{
					flex: 1;
					.u-input {
						width: 80%;
						height: 40rpx;
						border-radius: 50rpx;
					}
				}
				
			}
		}
	}
</style>
