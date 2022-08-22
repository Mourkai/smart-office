<template>
	<view class="add bp50">
		<view class="choose-time p20">
			<view class="month" @click="showTime = true">
				<u--input placeholder="请选择" suffixIconStyle="fontSize:13px" fontSize="13" :value="timeFormat(topTime)"
					readonly suffixIcon="arrow-down" />
			</view>
			<view class="week">
				<view class="week-item" v-for="(item,index) in week" @click="weekClick(item,index)">
					<u-button type="primary" v-if="item.statusName == '已填报'" :plain="true"
						:text="`第 ${index+1} 周 ${item.name}`"></u-button>
					<u-button v-else :plain="true" :class="{'active':currentBtn==index}"
						:text="`第 ${index+1} 周 ${item.name}`"></u-button>
					<u-button type="primary" v-if="item.statusName == '已填报'" :text="item.statusName"></u-button>
					<u-button v-else :plain="true" :text="item.statusName"></u-button>
				</view>
			</view>
		</view>
		<view class="week7day p40" v-show="showBlock">
			<view class="day-item" v-for="(item,index) in day7">
				<view class="week" v-text="item.week"></view>
				<view :class="'day '+(item.isSuccess ? 'success':'')+(currentDayIndex ===index ? ' active':'')"
					@click="changeDay(index)" v-text="item.day"></view>
			</view>
		</view>
		<view class="form p20" :key="index" v-for="(item,index) in day7[currentDayIndex].data">
			<view class="item-title" v-text="item.timeType"></view>
			<view class="form-item">
				<view class="title required">项目编码</view>
				<view class="content" @click="showProjectFunc(index)">
					<u--input placeholder="请选择" suffixIconStyle="fontSize:13px" fontSize="13" v-model="item.code"
						readonly suffixIcon="arrow-down" />
				</view>
			</view>
			<view class="form-item">
				<view class="title">项目名称</view>
				<view class="content">
					<u--input placeholder="选择项目后自动带出" v-model="item.projectName" fontSize="13" readonly />
				</view>
			</view>
			<view class="form-item">
				<view class="title">项目经理</view>
				<view class="content">
					<u--input placeholder="选择项目后自动带出" v-model="item.projectManagerName" fontSize="13" readonly />
				</view>
			</view>
			<view class="form-item">
				<view class="title required">工时类型</view>
				<view class="content" @click="showWorkTypeFunc(index)">
					<u--input placeholder="请选择" suffixIconStyle="fontSize:13px" fontSize="13" v-model="item._workType"
						readonly suffixIcon="arrow-down" />
				</view>
			</view>
			<view class="form-item">
				<view class="title">工时时长</view>
				<view class="content">
					<u--input placeholder="" v-model="item.manHourLength" fontSize="13" />
				</view>
			</view>
			<view class="form-item">
				<view class="title required">出差补贴</view>
				<view class="content" @click="showTravelAllowanceFunc(index)">
					<u--input placeholder="请选择" suffixIconStyle="fontSize:13px" fontSize="13"
						v-model="item._travelAllowance" readonly suffixIcon="arrow-down" />
				</view>
			</view>
		</view>
		<view class="btn-group" v-show="showBlock">
			<u-button type="primary" shape="circle" text="提交" @click="submit"></u-button>
		</view>
		<u-datetime-picker :show="showTime" v-model="topTime" @cancel="showTime=false" @confirm="dateConfirm"
			ref="datetimePicker" mode="year-month" />
		<u-picker :show="showProject" @confirm="confirmProject" @cancel="showProject=false" keyName="code"
			:columns="project" />
		<u-picker :show="showWorkType" @confirm="confirmWorkType" @cancel="showWorkType=false" keyName="label"
			:columns="workType" />
		<u-picker :show="showTravelAllowance" @confirm="confirmTravelAllowance" @cancel="showTravelAllowance=false"
			:defaultIndex="travelAllowanceIndex" keyName="name" :columns="travelAllowance" />
	</view>
</template>
<script>
	import dateFormat, {
		timestampToTime
	} from '@/util/date-format.js'
	import {
		getWorkingHour,
		getWorkType,
		getProject,
		submitWorkingHour
	} from '@/api/project.js'
	import {
		defaultWorkHoursItem
	} from './config/workHours.js'
	import localCache from '@/util/cache.js'
	export default {
		name: 'add',
		data() {
			return {
				showWorkType: false,
				showBlock: false,
				workTypeIndex: [0],
				travelAllowanceIndex: [0],
				showProject: false,
				showTravelAllowance: false,
				currentBtn: 0,
				currentDayIndex: 0,
				currentOperaTimeIndex: 0, //因为上午下午是个数组，0上午1下午，这个用来判断当前操作的是哪个
				project: [],
				week: [],
				travelAllowance: [
					[{
						value: 1,
						name: '是'
					}, {
						value: 2,
						name: '否'
					}]
				],
				workType: [],
				showTime: false,
				topTime: '',
				day7: [{
					data: []
				}]
			}
		},
		created() {
			this.$EventBus.$on('changeProjectOrArea', e => {
				if(e.type == 'project'){
					this.confirmProject(e.data)
				}
			})	
		},
		async onLoad() {
			let date = new Date();
			let y = date.getFullYear();
			let m = this.formatNum(date.getMonth() + 1);
			this.topTime = `${y}/${m}`
			this.getWeekList()
			const worktype = await getWorkType()
			this.workType = [worktype.data]
			const project = await getProject()
			this.project = [project.data.rows]
			this.showBlock = true
		},
		methods: {
			changeDay(index) {
				this.currentDayIndex = index
				//console.log(this.day7[this.currentDayIndex].data);
			},
			timeFormat(time) {
				if (typeof time == 'number') {
					return timestampToTime(time)
				}
				return time
			},
			async submit() {
				const workingHourRecordDtoList = []
				const userInfo = localCache.getCache('userInfo')
				this.day7.map(item => {
					workingHourRecordDtoList.push(item.data[0])
					workingHourRecordDtoList.push(item.data[1])
				})
				const formData = {
					fillEndDate: this.week[this.currentBtn].endDate,
					fillStartDate: this.week[this.currentBtn].firstDate,
					id: this.week[this.currentBtn].id,
					processIsCommit: true,
					userId: userInfo.userId,
					workingHourRecordDtoList
				}
				const re = await submitWorkingHour(formData)
				if (re.data) {
					uni.$u.toast("提交成功")
					this.week[this.currentBtn].statusName = '已填报'
					this.day7[this.currentDayIndex].isSuccess = true
					//this.getWeekList()
				}
			},
			showProjectFunc(index) {
				uni.navigateTo({
					url: '/pages/common/search?type=project'
				})
				// this.projectIndex = this.day7[this.currentDayIndex].data[index]._projectIndex || [0]
				this.currentOperaTimeIndex = index
			},
			showTravelAllowanceFunc(index) {
				this.showTravelAllowance = true
				this.travelAllowanceIndex = this.day7[this.currentDayIndex].data[index]._travelAllowanceIndex || [0]
				this.currentOperaTimeIndex = index
			},
			showWorkTypeFunc(index) {
				this.showWorkType = true
				this.workTypeIndex = this.day7[this.currentDayIndex].data[index]._workTypeIndex || [0]
				this.currentOperaTimeIndex = index
			},
			confirmWorkType(e) {
				const data = this.day7[this.currentDayIndex].data[this.currentOperaTimeIndex]
				const newData = e.value[0];
				data._workType = newData.label
				data._workTypeIndex = newData.value
				data.workType = newData.value
				this.showWorkType = false
			},
			confirmProject(newData) {
				const data = this.day7[this.currentDayIndex].data[this.currentOperaTimeIndex]
				data.projectManagerName = newData.projectManagerName
				data.projectManagerId = newData.projectManagerId
				data.projectId = newData.id
				data.projectName = newData.name
				data.code = newData.code
			},
			confirmTravelAllowance(e) {
				const newData = e.value[0]
				const data = this.day7[this.currentDayIndex].data[this.currentOperaTimeIndex]
				data.travelAllowance = newData.value
				data._travelAllowance = newData.name
				this.showTravelAllowance = false
			},
			async getWeekList() {
				if (typeof this.topTime == 'number') {
					this.topTime = dateFormat(this.topTime, 'YYYY/MM')
				}
				const {
					data
				} = await getWorkingHour(this.topTime)
				this.week = data.map((item, index) => {
					const first = item.firstDate.slice(5)
					const last = item.endDate.slice(5)
					item.name = `${first}/${last}`
					if (index == 0) {
						this.weekClick(item, 0) //手动触发一下
					}
					return item
				})
			},
			async weekClick(date, index) {
				this.currentBtn = index
				let currentDate = new Date(date.firstDate);
				let timesStamp = currentDate.getTime();
				let currenDay = currentDate.getDay();
				const weekNum = ['一', '二', '三', '四', '五', '六', '日']
				const day7 = [];
				let dayData = []
				if (date.id) {
					const {
						data
					} = await getWorkingHour(date.id)
					dayData = data.workingHourRecordDtoList
				}
				for (let i = 0; i < 7; i++) {
					const c = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7));
					const fillDate = c.getFullYear() + '-' + this.formatNum(c.getMonth() + 1) + '-' + this.formatNum(c
						.getDate());
					let dataItem = []
					if (dayData.length > 0) {
						dataItem[0] = {
							...dayData.shift(),
							morning: 1,
							timeType: '上午',
							fillDate
						}
						dataItem[1] = {
							...dayData.shift(),
							morning: 0,
							timeType: '下午',
							fillDate
						}
						dataItem.map(item => {
							if (item.travelAllowance == 1) {
								item._travelAllowance = '是'
								item._travelAllowanceIndex = [0]
							} else if (item.travelAllowance == 2) {
								item._travelAllowance = '否'
								item._travelAllowanceIndex = [1]
							}
							item._workType = ''
							this.workType[0].map((item2, index) => {
								if (item.workType == item2.value) {
									item._workType = item2.label
									item._workTypeIndex = [index]
								}
							})
							return item
						})
					} else {
						const dh = [...defaultWorkHoursItem]
						dh[0].fillDate = fillDate
						dh[1].fillDate = fillDate
						dataItem = dh
					}
					let isSuccess = false
					if (dataItem[0].code && dataItem[1].code) {
						isSuccess = true
					}
					const obj = {
						isSuccess,
						week: weekNum[i],
						day: this.formatNum(c.getDate()),
						data: dataItem
					}
					const objStr = JSON.stringify(obj)
					const objParse = JSON.parse(objStr)
					day7.push(objParse);
				}
				this.day7 = day7
			},
			formatNum(num) {
				let res = Number(num);
				return res < 10 ? '0' + res : res;
			},
			dateConfirm(e) {
				this.topTime = dateFormat(e.value, 'YYYY/MM')
				this.getWeekList()
				this.showTime = false
			},
			onNavigationBarButtonTap(val) {
				if (val.index == 0) {
					uni.navigateTo({
						url: '/pages/index/common-used/work-hours/index'
					})
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.form {
		.item-title {
			color: #444444;
			text-align: center;
			line-height: 100rpx;
		}

		border-bottom: 1px solid #F2F2F2;
	}

	.form-item {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;

		.title {
			width: 20%;
			color: #666666;
			font-size: 30rpx;
			margin-right: 20rpx;
		}

		.title::before {
			content: "*";
			color: #fff;
			margin-right: 6rpx;
		}

		.required::before {
			color: red;
		}

		.content {
			flex: 1;
		}
	}

	.btn-group {
		display: flex;
		margin-top: 70rpx;

		.u-button {
			margin: 0 80rpx;
		}
	}

	.choose-time {
		.month {
			width: 60%;
			margin: 0 auto;
		}

		.week {
			display: flex;
			flex-direction: column;
			margin-top: 30rpx;

			.week-item {
				display: flex;

				.u-button {
					height: 60rpx;
					width: 120rpx;
				}

				.active {
					border: 1px solid $main-color;
					color: $main-color;
				}

				.u-button:first-child {
					//border:1px solid red;
					margin-right: 50rpx;
					width: 60%;
				}

				margin-bottom: 20rpx;
			}
		}
	}

	.week7day {
		display: flex;

		.day-item {
			font-size: 32rpx;
			color: #666666;
			text-align: center;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.day {
				width: 60rpx;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 50%;
				margin-top: 13rpx;
				position: relative;
			}

			.day::after {
				width: 8rpx;
				height: 8rpx;
				content: "";
				position: absolute;
				background-color: #fc7a64;
				bottom: 0;
				border-radius: 50%;
				left: 50%;
				transform: translate(-50%);
			}

			.success::after {
				background-color: #66b140;
			}

			.day:hover,
			.active {
				background-color: $main-color;
				color: #fff;
			}
		}
	}
</style>
