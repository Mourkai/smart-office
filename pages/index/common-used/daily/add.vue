<template>
	<view class="add bp50">
		<view class="header" v-if="!isShowCalendar">
			<view class="title" v-text="editTitle"></view>
		</view>
		<renCalendar @onDisabled="disableDateFunc" @onDayClick="dayClick" v-if="isShowCalendar" @changeMonth="changeMonth" headerBar
			:open="false" :markDays="markDays" disabledAfter />
		<u-row class="p20 top-group" v-show="isShowTopButton && project.length > 1">
			<u-col span="4">
				<u-button type="primary" :plain="!isSame" @click="leaveThis(0)" text="同项目" />
			</u-col>
			<u-col span="4">
				<u-button type="primary" :plain="!isDiff" @click="leaveThis(1)" text="不同项目" />
			</u-col>
		</u-row>
		<u--form class="form p20" labelPosition="left">
			<template v-for="(item,index) in formData">
				<template v-if="formData.length == 2">
					<u-divider :text="index == 0 ? '上午':'下午'"></u-divider>
				</template>
				<u-form-item class="form-item">
					<view class="title required">项目名称</view>
					<view class="content" @click="showProjectFunc(index)">
						<u--input placeholder="请选择" suffixIconStyle="fontSize:13px" fontSize="13"
							v-model="item.projectName" readonly suffixIcon="arrow-down" />
					</view>
				</u-form-item>
				<u-form-item class="form-item">
					<view class="title">项目编码</view>
					<view class="content">
						<u--input v-model="item.code" placeholder="选择项目后自动带出" fontSize="13" readonly />
					</view>
				</u-form-item>
				<u-form-item prop="code" class="form-item">
					<view class="title">项目经理</view>
					<view class="content">
						<u--input v-model="item._leaderName" placeholder="选择项目后自动带出" fontSize="13" readonly />
					</view>
				</u-form-item>
				<view class="form-item">
					<view class="title required">工时类型</view>
					<view class="content">
						<template v-if="formData.length == 1">
							<view @click="showWorkTypeFunc(index,'_amWorkType')">
								<u--input placeholder="上午" suffixIconStyle="fontSize:13px" fontSize="13"
									v-model="item._amWorkType" readonly suffixIcon="arrow-down" />
							</view>
							<view @click="showWorkTypeFunc(index,'_pmWorkType')">
								<u--input placeholder="下午" suffixIconStyle="fontSize:13px" fontSize="13"
									v-model="item._pmWorkType" readonly suffixIcon="arrow-down" />
							</view>
						</template>
						<view v-else @click="showWorkTypeFunc(index,item.workTypeField)">
							<template v-if="formData.length === 2">
								<u--input v-if="index === 0" placeholder="请选择" suffixIconStyle="fontSize:13px"
									fontSize="13" v-model="item._amWorkType" readonly suffixIcon="arrow-down" />
								<u--input v-if="index === 1" placeholder="请选择" suffixIconStyle="fontSize:13px"
									fontSize="13" v-model="item._pmWorkType" readonly suffixIcon="arrow-down" />
							</template>
						</view>
					</view>
				</view>
				<u-form-item class="form-item">
					<view class="title required">工作城市</view>
					<view class="content" @click="showCityFunc(index)">
						<u--input placeholder="请选择" suffixIconStyle="fontSize:13px" fontSize="13"
							v-model="item._addressName" readonly suffixIcon="arrow-down" />
					</view>
				</u-form-item>
				<u-form-item class="form-item">
					<view class="title required">工作地点</view>
					<view class="content">
						<u--input placeholder="请输入工作地点" v-model="item.address" fontSize="13" />
					</view>
				</u-form-item>
				<u-form-item class="form-item item-column">
					<view class="title" :class="{'required':!isVacation[index]}">今日完成</view>
					<view class="content">
						<textarea v-model="item.todayReport" maxlength="99999" placeholder=""></textarea>
					</view>
				</u-form-item>
				<u-form-item class="form-item item-column">
					<view class="title" :class="{'required':!isVacation[index]}">明日计划</view>
					<view class="content">
						<textarea v-model="item.nextDayPlan" maxlength="99999" placeholder=""></textarea>
					</view>
				</u-form-item>
				<u-form-item class="form-item item-column">
					<view class="title">工作备忘</view>
					<view class="content">
						<textarea v-model="item.memo" maxlength="99999" placeholder=""></textarea>
					</view>
				</u-form-item>
				<u-form-item class="form-item item-column">
					<view class="title">工作建议</view>
					<view class="content">
						<textarea v-model="item.suggest" maxlength="99999" placeholder=""></textarea>
					</view>
				</u-form-item>
			</template>
			<view class="btn-group">
				<u-button type="info" shape="circle" v-if="isShowTopButton || show513" text="重置" @click="reset"></u-button>
				<u-button type="primary" shape="circle" v-if="show513" text="维护历史数据" @click="submit('history')"></u-button>
				<u-button type="primary" v-if="isShowTopButton" shape="circle" text="提交" @click="submit('submit')"></u-button>
			</view>
		</u--form>
		<u-picker :show="showWorkType" @confirm="confirmWorkType" @cancel="showWorkType=false" keyName="label"
			:columns="workType" />
	</view>
</template>
<script>
	import {
		getProject,
		postDailyReport,
		getDateList,
		getWorkType,
		automaticUserInfo,
		getDaily,
		putDailyReport
	} from '@/api/project'
	import {
		areaCommon
	} from '@/api/system.js'
	import {
		formVerb
	} from './config/daily.js'
	import localCache from '@/util/cache.js'
	import renCalendar from '@/components/ren-calendar/ren-calendar.vue'
	export default {
		name: 'add',
		data() {
			return {
				showWorkType: false,
				isSame: true,
				isShowCalendar:true,
				isShowTopButton: false,
				isVacation:[false,false],//是否选择都是假期
				currentOperaIndex: 0,
				currentWorkTypeField: '_amWorkType',
				isDiff: false,
				editTitle:'',
				show513:false,
				isDataDone:false,//是否真正的渲染完成页面
				markDays: [],
				workType: [],
				project: [],
				city: [],
				formData: [],
				dailyRecordDto: {},
				sourceData: {
					workTypeField: '_amWorkType',
					projectName: '',
					_addressName: '',
					_leaderName: '',
					_workType: '',
					_amWorkType: '出勤',
					amWorkType:1,
					_pmWorkType: '出勤',
					pmWorkType:1,
					projectId: '',
					userId: '',
					address: '', //工作地点
					code: '', //项目编码
					memo: '',
					commonAreaId: '', //工作城市
					todayReport: '', //今日完成
					fillDate: '', //填报日期
					nextDayPlan: '', //明日计划
					suggest: '', //工作建议。
				},
				resetData: {}
			}
		},
		components: {
			renCalendar
		},
		watch:{
		    //检测是不是选择的请假或者节假日，如果是，今日明日内容不必填
		    formData:{
		      deep:true,
		      handler(newValue){
				if(newValue.length == 1){
					if([3,4,5].indexOf(newValue[0].amWorkType) !== -1 && [3,4,5].indexOf(newValue[0].pmWorkType) !== -1){
						this.isVacation[0] = true
					}else{
						this.isVacation[0] = false
					}
				}else{
					newValue.forEach((item,index)=>{
					  if(index === 0){
					    this.isVacation[index] = [3,4,5].indexOf(item.amWorkType) !== -1
					  }else{
						this.isVacation[index] = [3,4,5].indexOf(item.pmWorkType) !== -1
					  }
					})
				}
				if(this.isDataDone){
					const dailyList = localCache.getCache('dailyList') ?? []
					let currentDailyIndex = dailyList.findIndex(item=>item.dailyRecordDto.fillDate == this.dailyRecordDto.fillDate)
					if(currentDailyIndex == -1 && dailyList.length < 2){
						dailyList.push({
							dailyRecordDto:this.dailyRecordDto,
							dailyRecordDetailsDtoList:this.formData
						})
					}else{
						dailyList[currentDailyIndex] = {
							dailyRecordDto:this.dailyRecordDto,
							dailyRecordDetailsDtoList:this.formData
						}
					}
					localCache.setCache('dailyList',dailyList)
				}
		      }
		    }
		  },
		async created(data) {
			const autoMatic = await automaticUserInfo()
			this.formData = [{
				...this.sourceData,
				address:autoMatic.data.address,
				projectId:autoMatic.data.projectId,
				commonAreaId:autoMatic.data.commonAreaId
			}]
			const worktype = await getWorkType()
			this.workType = [worktype.data]
			this.$EventBus.$on('changeProjectOrArea', e => {
				if (e.type == 'area') {
					this.confirmCity(e.data)
				}
				if (e.type == 'project') {
					this.confirmProject(e.data)
				}
			})
		},
		methods: {
			leaveThis(type) {
				if (type == 0) { //同项目
					this.isSame = true
					this.isDiff = false
					this.formData.splice(1, 1)
				} else { //不同项目
					this.isSame = false
					this.isDiff = true
					this.formData.push({
						...this.sourceData,
						address:this.formData[0].address,
						commonAreaId:this.formData[0].commonAreaId,
						_addressName:this.formData[0]._addressName,
						workTypeField: '_pmWorkType'
					})
				}
			},
			showCityFunc(index) {
				this.currentOperaIndex = index
				uni.navigateTo({
					url: '/pages/common/search?type=area'
				})
			},
			showProjectFunc(index) {
				this.currentOperaIndex = index
				uni.navigateTo({
					url: '/pages/common/search?type=project'
				})
			},
			disableDateFunc() {
				uni.showToast({
					title: '未来日期不可选择',
					icon: 'none'
				})
			},
			reset() {
				this.formData = JSON.parse(JSON.stringify(this.resetData))
			},
			showWorkTypeFunc(index, field) {
				this.currentOperaIndex = index
				this.currentWorkTypeField = field
				this.showWorkType = true
			},
			confirmWorkType(e) {
				const newData = e.value[0];
				const overData = {
					...this.formData[this.currentOperaIndex]
				}
				if (this.currentWorkTypeField === '_amWorkType') {
					overData._amWorkType = newData.label
					overData._amWorkTypeIndex = newData.value
					overData.amWorkType = newData.value
				} else {
					overData._pmWorkType = newData.label
					overData._pmWorkTypeIndex = newData.value
					overData.pmWorkType = newData.value
				}
				this.$set(this.formData, this.currentOperaIndex, overData)
				this.showWorkType = false
			},
			async dayClick(e) {
				const dateData = this.markDays.find(item => e.date == item.date)
				this.isDataDone = false
				const autoMatic = await automaticUserInfo()
				let overData = [{
					...this.sourceData,
					projectId:autoMatic.data.projectId,
					code:autoMatic.data.projectCode,
					_leaderName:autoMatic.data.projectManagerName,
					projectName:autoMatic.data.projectName,
					address:autoMatic.data.address,
					commonAreaId:autoMatic.data.commonAreaId
				}]
				const dailyListCache = localCache.getCache('dailyList') ?? []
				const dailyCache = dailyListCache.find(item=>item.dailyRecordDto.fillDate == dateData.date)
				let data = {}
				if(!dateData.id && dailyCache){
					data = dailyCache
				}else{
					let reData = await getDaily(dateData.id)
					data = reData.data
				}
				let dailyRecordDto = data
				let dailyRecordDetailsDtoList = dailyRecordDto.dailyRecordDetailsDtoList
				delete dailyRecordDto.createBy;
				delete dailyRecordDto.createBy;
				delete dailyRecordDto.createByName;
				delete dailyRecordDto.createTime;
				delete dailyRecordDto.updateBy;
				delete dailyRecordDto.updateByName;
				delete dailyRecordDto.updateTime;
				delete dailyRecordDto.submitTime;
				//回显赋值
				if (dailyRecordDetailsDtoList.length > 0) {
					this.isShowTopButton = true
					if ([2,3].indexOf(dailyRecordDto.pass) !== -1) {
						this.isShowTopButton = false
					}
					if(!dailyRecordDetailsDtoList[0].amWorkType){
						dailyRecordDetailsDtoList[0].amWorkType = dailyRecordDto.amWorkType
					}
					if(!dailyRecordDetailsDtoList[0].pmWorkType){
						dailyRecordDetailsDtoList[0].pmWorkType = dailyRecordDto.pmWorkType
					}
					dailyRecordDetailsDtoList[0].workTypeField = '_amWorkType'
					if (dailyRecordDto.projectFlag !== 'N') {
						this.isSame = true;
						this.isDiff = false;
					} else{
						this.isSame = false;
						this.isDiff = true;
						if(!dailyRecordDetailsDtoList[1].amWorkType){
							dailyRecordDetailsDtoList[1].amWorkType = dailyRecordDto.amWorkType
						}
						if(!dailyRecordDetailsDtoList[1].pmWorkType){
							dailyRecordDetailsDtoList[1].pmWorkType = dailyRecordDto.pmWorkType
						}
						dailyRecordDetailsDtoList[1].workTypeField = '_pmWorkType'
					}
					overData = JSON.parse(JSON.stringify(dailyRecordDetailsDtoList))
					if(dailyRecordDetailsDtoList.length >= 2){
						this.isSame = false
						this.isDiff = true;
					}
					this.dailyRecordDto = {
						...dailyRecordDto
					}
				} else {
					this.isShowTopButton = true;
					this.isSame = true;
					this.isDiff = false;
					dailyRecordDetailsDtoList = [{}]
					this.dailyRecordDto = {
						...dailyRecordDto,
						fillDate: dateData.date
					}
				}
				const dailyDateNum = this.dailyRecordDto.fillDate.split("-").join("")
				if (dailyDateNum <= 20220513 && this.dailyRecordDto.pass === 3 && this.dailyRecordDto.remark === 'history'){
				    this.show513 = true;
				}else{
				    this.show513 = false;
				}
				overData.forEach((item, index) => {
					const amWorkType = this.workType[0].find(workItem => item.amWorkType == workItem.value)
					const pmWorkType = this.workType[0].find(workItem => item.pmWorkType == workItem.value)
					const areaInfo = this.city.find(areaItem => item.commonAreaId == areaItem.id || item.commonAreaId == areaItem.cityId) || {}
					overData[index].projectName = item.projectName
					overData[index].code = item.code || item.projectCode
					overData[index]._leaderName = item._leaderName || item.projectManagerName
					overData[index].projectId = item.projectId
					overData[index]._addressName = areaInfo.cityName
					overData[index].commonAreaId = areaInfo.id
					overData[index]._amWorkType = amWorkType && amWorkType.label
					overData[index]._pmWorkType = pmWorkType && pmWorkType.label
				})
				this.formData = JSON.parse(JSON.stringify(overData))
				this.resetData = JSON.parse(JSON.stringify(overData))
				setTimeout(()=>{
					this.isDataDone = true
				},1000)
			},
			confirmProject(data) {
				const otherIndex = this.currentOperaIndex ? 0:1
				if(this.formData.length > 1 && this.formData[otherIndex].projectId == data.id){
					setTimeout(()=>{
						uni.$u.toast("上午下午不能是同一个项目")
					},10)
				}else{
					const overData = {
						...this.formData[this.currentOperaIndex],
						projectName: data.name,
						code: data.code,
						_leaderName: data.projectManagerName,
						projectId: data.id,
					}
					this.$set(this.formData, this.currentOperaIndex, overData)
				}
			},
			confirmCity(data) {
				const overData = {
					...this.formData[this.currentOperaIndex],
					_addressName: data.cityName,
					commonAreaId: data.id,
				}
				this.$set(this.formData, this.currentOperaIndex, overData)
			},
			onNavigationBarButtonTap(val) {
				if (val.index == 0 && this.isShowCalendar) {
					uni.navigateTo({
						url: '/pages/index/common-used/daily/index'
					})
				}
			},
			async submit(type) {
				const userInfo = localCache.getCache('userInfo')
				this.dailyRecordDto.userId = userInfo.userId
				this.dailyRecordDto.processIsCommit = true
				let dailyRecordDto = {}
				if (this.formData.length === 1) { //同项目
					dailyRecordDto.projectFlag = "Y"
					dailyRecordDto.amWorkType = this.formData[0].amWorkType
					dailyRecordDto.pmWorkType = this.formData[0].pmWorkType
					this.formData[0].amPmFlag = 'AP'
				} else if (this.formData.length === 2) { //不同项目
					dailyRecordDto.projectFlag = "N"
					dailyRecordDto.amWorkType = this.formData[0].amWorkType
					dailyRecordDto.pmWorkType = this.formData[1].pmWorkType
					this.formData[0].amPmFlag = 'A'
					this.formData[1].amPmFlag = 'P'
				} else return
				const submitData = {
					dailyRecordDetailsDtoList: [],
					...this.dailyRecordDto,
					...dailyRecordDto,
					id:this.dailyRecordDto.id,
					processIsCommit:true
				}
				const dailyRecordDetailsDtoList = JSON.parse(JSON.stringify(this.formData))
				submitData.dailyRecordDetailsDtoList = dailyRecordDetailsDtoList.map(item=>{
					delete item.code
					return item
				})
				let submitMethod = postDailyReport
				if(type === 'history'){
					submitMethod = putDailyReport
				}
				if (formVerb(this.formData,this.isVacation)) {
					const {
						data
					} = await submitMethod(submitData);
					if (data) {
						uni.$u.toast("提交成功")
						//删除当前日的缓存
						let dailyList = localCache.getCache('dailyList') ?? []
						let currentDailyIndex = dailyList.findIndex(item=>item.dailyRecordDto.fillDate == this.dailyRecordDto.fillDate)
						dailyList.splice(currentDailyIndex,1)
						localCache.setCache('dailyList',dailyList)
						const fillDate = this.dailyRecordDto.fillDate.split('-')
						this.isShowTopButton = false
						await this.changeMonth([fillDate[0], fillDate[1]])
						if(this.isShowCalendar){
							uni.navigateTo({
								url: 'index'
							})
						}else{
							//如果是修改页面的话，修改成功后返回详情页，并且执行详情页的loadData方法
							let pages = getCurrentPages();
							let beforePage = pages[pages.length - 2];   
							uni.navigateBack({
							    delta: 1,//返回上一级注意这里要设置为1
							    success:()=>{
							        beforePage.$vm.loadData({
										id:this.dailyRecordDto.id,
										name:`${userInfo.singleName}的工作日志`,
										bpmStatus:1,
										path:'project_daily_record',
										createBy:userInfo.userId,
									});
							    }
							})
						}
					}
				}
			},
			async changeMonth(e) {
				const dateList = await getDateList(`${e[0]}-${this.formatNum(e[1])}-01`)
				this.markDays = dateList.data
			},
			formatNum(num) {
				let res = Number(num);
				return res < 10 ? '0' + res : res;
			}
		},
		async onLoad({editDate}) {
			//项目
			const project = await getProject({notOver:true})
			this.project = project.data.rows
			//城市
			const city = await areaCommon()
			this.city = city.data.rows
			//每次进来缓存一下，用作选择页面的数据，空间换时间
			localCache.setCache('projectList',this.project)
			localCache.setCache('cityList',this.city)
			//日期
			let date = new Date();
			let y = date.getFullYear();
			let m = this.formatNum(date.getMonth() + 1);
			let d = this.formatNum(date.getDate());
			if(!editDate){
				this.isShowCalendar = true;
			}else{
				this.isShowCalendar = false;
				this.editTitle = `${editDate}日报修改`
				const editDateArr = editDate.split('-')
				y = editDateArr[0]
				m = editDateArr[1]
				d = editDateArr[2]
			}
			this.dailyRecordDto.fillDate = `${y}-${m}-${d}`
			await this.changeMonth([y, m])
			//如果刚加载进来的这一天就已经填报了的话，就获取一下填报信息
			await this.dayClick({
				date: this.dailyRecordDto.fillDate
			})
		}
	}
</script>
<style lang="scss" scoped>
	.top-group {
		margin-top: 20rpx;
	}

	.form-item {
		display: flex;
		align-items: center;
		margin-bottom: 40rpx;

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

			/deep/.uni-textarea-textarea {
				font-size: 27rpx !important;
			}
		}
	}

	.item-column {
		/deep/.u-form-item__body__right__content__slot {
			align-items: flex-start;
		}
	}

	.btn-group {
		display: flex;
		margin-top: 70rpx;

		.u-button {
			margin: 0 15rpx;
		}
	}

	/deep/.u-form-item__body {
		width: 100%;
		padding: 0;
	}

	textarea {
		box-sizing: border-box;
		height: 200rpx;
		border-radius: 4px;
		padding: 6px 9px;
		border-width: 0.5px !important;
		border-color: #dadbde !important;
		border-style: solid;
		width: 100%
	}
	.header {
		padding: 40rpx 20rpx;
		font-size: 38rpx;
		border-bottom: 1px solid #D7D7D7;
	}
</style>
