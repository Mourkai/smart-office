<template>
	<view>
		<u-subsection :list="['上午', '下午']" v-if="data.length==2" :current="topCurrent" @change="sectionChange" />
		<view class="content">
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="dailyRecordDto.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">日志日期</view>
				<view class="desc" v-text="data[topCurrent].fillDate"></view>
			</view>
			<view class="content-item">
				<view class="title">项目名称</view>
				<view class="desc" v-text="data[topCurrent].projectName"></view>
			</view>
			<view class="content-item">
				<view class="title">项目编码</view>
				<view class="desc" v-text="data[topCurrent].projectCode"></view>
			</view>
			<view class="content-item">
				<view class="title">工时类型</view>
				<view v-if="data.length == 1">
					<div class="desc">
						上午：{{data[topCurrent].amWorkType}}
					</div>
					<div class="desc">
						下午：{{data[topCurrent].pmWorkType}}
					</div>
				</view>
				<view class="desc" v-if="data.length == 2 && topCurrent==0">
					{{data[topCurrent].amWorkType}}
				</view>
				<view class="desc" v-if="data.length == 2 && topCurrent==1">
					{{data[topCurrent].pmWorkType}}
				</view>
			</view>
			<view class="content-item">
				<view class="title">工作城市</view>
				<view class="desc" v-text="data[topCurrent].city"></view>
			</view>
			<view class="content-item">
				<view class="title">工作地点</view>
				<view class="desc" v-text="data[topCurrent].address"></view>
			</view>
			<view class="content-item">
				<view class="title">今日完成</view>
				<view class="desc" v-html="data[topCurrent].todayReport"></view>
			</view>
			<view class="content-item">
				<view class="title">明日计划</view>
				<view class="desc" v-html="data[topCurrent].nextDayPlan"></view>
			</view>
			<view class="content-item">
				<view class="title">工作备忘</view>
				<view class="desc" v-html="data[topCurrent].memo"></view>
			</view>
			<view class="content-item">
				<view class="title">工作建议</view>
				<view class="desc" v-html="data[topCurrent].suggest"></view>
			</view>
		</view>
		<view class="btn-float" v-if="showEdit">
			<u-button type="primary" class="btn" size="large" icon="edit-pen-fill" shape="circle" @click="toEdit"></u-button>
		</view>
	</view>
</template>
<script>
	import {
		getProject,
		getWorkType,
		getDaily //日报日志
	} from '@/api/project.js'
	import localCache from '@/util/cache.js'
	import {
		areaCommon
	} from '@/api/system.js'
	
	export default {
		data() {
			return {
				data: [{
					instanceNo:'',
					fillDate:'',
				}],
				dailyRecordDto:{},
				topCurrent:0,
				showEdit:false
			};
		},
		props: {
			id: {
				type: String,
				default: ""
			},
			type: {
				type: String,
				default: ""
			},
			watchUpdateUtilStr:{
				type: Number,
				default:0
			}
		},
		watch:{
			watchUpdateUtilStr(val) {
				console.log("时间戳修改了");
				this.loadData()
			}
		},
		async mounted() {
			this.loadData()
		},
		methods: {
			sectionChange(e){
				this.topCurrent = e
			},
			toEdit(){
				uni.navigateTo({
					url:'/pages/index/common-used/daily/add?editDate='+this.dailyRecordDto.fillDate
				})
			},
			async loadData(){
				let project = localCache.getCache('projectList');
				const userInfo = localCache.getCache('userInfo')
				if(!project){
					const {data} = await getProject()
					project = data.rows
				}
				const wt = await getWorkType()
				const workType = wt.data
				const re = await getDaily(this.id)
				const dailyRecordDto = re.data
				console.log(dailyRecordDto);
				const dailyRecordDetailsDtoList = dailyRecordDto.dailyRecordDetailsDtoList
				
				if(userInfo.userId === dailyRecordDto.userId && dailyRecordDto.pass === 1){
					this.showEdit = true
				}
				this.dailyRecordDto = dailyRecordDto
				let city = ''
				const area = await areaCommon()
				if(dailyRecordDetailsDtoList[0].amPmFlag === "P" && dailyRecordDetailsDtoList[1].amPmFlag === "A"){
				    const pm = dailyRecordDetailsDtoList[0]
				    const am = dailyRecordDetailsDtoList[1]
				    dailyRecordDetailsDtoList = [am,pm]
				}
				this.data = dailyRecordDetailsDtoList.map((listItem,listIndex)=>{
					listItem.fillDate = dailyRecordDto.fillDate
					area.data.rows && area.data.rows.map(item => {
						if (listItem.commonAreaId == item.id || listItem.commonAreaId == item.cityId) {
							city = item.commonName
						}
					})
					if (listItem.todayReport && listItem.todayReport.indexOf('\\n')) {
						listItem.todayReport = listItem.todayReport.replace(/\n/g, '<br>')
					}
					if (listItem.nextDayPlan && listItem.nextDayPlan.indexOf('\\n')) {
						listItem.nextDayPlan = listItem.nextDayPlan.replace(/\n/g, '<br>')
					}
					if (listItem.memo && listItem.memo.indexOf('\\n')) {
						listItem.memo = listItem.memo.replace(/\n/g, '<br>')
					}
					const amWorkType = workType.find(wtItem=>wtItem.value == dailyRecordDto.amWorkType)
					const pmWorkType = workType.find(wtItem=>wtItem.value == dailyRecordDto.pmWorkType)
					return {
						...listItem,
						amWorkType:amWorkType.label,
						pmWorkType:pmWorkType.label,
						city
					}
				})
			}
		},
	};
</script>
<style lang="scss" scoped>
	@import "../config/details.scss";
	.btn-float{
		position:fixed;right:20px;bottom: 200px;
		.btn{
			width: 55px;height: 55px;box-shadow: 0 0 5px #3196FA
		}
	}
</style>