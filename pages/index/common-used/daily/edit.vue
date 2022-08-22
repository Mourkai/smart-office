<template>
	<view class="add bp50">
		<view class="header">
			<view class="title" v-text="name"></view>
		</view>
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
		<view class="step-line p20">
			<LineProcess :data="process"></LineProcess>
		</view>
		<view class="btn-group">
			<u-button type="primary" shape="circle" text="编辑" @click="submit()"></u-button>
		</view>
		<!-- 项目名称 -->
		<u-picker :show="showProject" v-model="formData.projectId" @confirm="confirmProject" @cancel="showProject=false"
			keyName="name" :columns="project" />
		<!-- 工作城市 -->
		<u-picker :show="showCity" @confirm="confirmCity" @cancel="showCity=false" :columns="city" keyName="cityName" />
	</view>
</template>
<script>
	import {
		getProject,
		postDailyReport,
		getDateList,
		getDaily
	} from '@/api/project'
	import {
		areaCommon
	} from '@/api/system.js'
	import {
		rules
	} from './config/daily.js'
	import {
		getTrackById
	} from '@/api/process.js'
	import localCache from '@/util/cache.js'
	import LineProcess from '@/components/line-process/line-process.vue'
	export default {
		data() {
			return {
				showCity: false,
				showProject: false,
				project: [],
				city: [],
				name: '',
				id: '',
				process:[],
				formData: {
					_projectName: '',
					_addressName: '',
					_leaderName: '',
					projectId: '',
					userId: '',
					address: '', //工作地点
					code: '', //项目编码
					memo: '',
					commonAreaId: '', //工作城市
					todayReport: '', //今日完成
					fillDate: '', //填报日期
					nextDayPlan: '', //明日计划
					suggest: '', //工作建议
				},
				resetData: {},
				rules
			}
		},
		components: {
			LineProcess
		},
		methods: {
			reset() {
				this.formData = {
					...this.resetData
				}
			},
			confirmProject(e) {
				const data = e.value[0]
				this.formData._projectName = data.name
				this.formData.code = data.code
				this.formData._leaderName = data.projectManagerName
				this.formData.projectId = data.id
				this.showProject = false
			},
			confirmCity(e) {
				this.showCity = false
				const data = e.value[0]
				this.formData._addressName = data.cityName
				this.formData.commonAreaId = data.cityId
			},
			async submit() {
				const userInfo = localCache.getCache('userInfo')
				this.formData.userId = userInfo.userId
				this.formData.processIsCommit = true
				this.$refs.daily.validate().then(async res => {
					const {
						data
					} = await postDailyReport(this.formData);
					if (data) {
						uni.$u.toast("提交成功")
						setTimeout(() => {
							uni.navigateTo({
								url: 'index'
							})
						}, 500)
					}
				}).catch(errors => {
					if (errors[0]) {
						uni.$u.toast(errors[0].message)
					} else {
						uni.$u.toast("请稍后重试")
					}
				})
			}
		},
		async onLoad({
			id,
			name
		}) {
			this.name = name
			this.id = id
			//项目
			const project = await getProject()
			this.project = [project.data.rows]
			//城市
			const {
				data
			} = await areaCommon()
			this.city = [data.rows]
			const daily = await getDaily(id)
			this.formData = daily.data
			this.project[0].forEach(item => {
				if (daily.data.projectId == item.id) {
					this.formData._projectName = item.name
					this.formData.code = item.code
					this.formData._leaderName = item.projectManagerName
					this.formData.projectId = item.id
				}
			})
			this.city[0].forEach(item => {
				if (daily.data.commonAreaId == item.id) {
					this.formData._addressName = item.cityName
					this.formData.commonAreaId = item.id
				}
			})
			this.formData.fillDate = daily.data.fillDate
			this.resetData = {
				...this.formData
			}
			const re = await getTrackById(id)
			const newArr = []
			re.data.forEach(item => {
				item.approveList.forEach(item2 => {
					newArr.push(fire)
				})
			})
			this.process = newArr
		}
	}
</script>
<style lang="scss" scoped>
	.form {
		margin-top: 30rpx;
	}

	.header {
		padding: 40rpx 20rpx;
		font-size: 38rpx;
		border-bottom: 1px solid #D7D7D7;
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

		.content {
			width: 100%
		}

		.avatar-group {
			display: flex;
			margin-top: 20rpx;
			flex-wrap: wrap;

			.avatar {
				text-align: center;
				flex: 1;

				view {
					color: #666666;
					font-size: 30rpx;
					margin-top: 8rpx;
				}
			}
		}
	}

	.btn-group {
		display: flex;
		margin-top: 70rpx;

		.u-button {
			margin: 0 80rpx;
		}
	}

	/deep/.u-form-item__body {
		width: 100%;
		padding: 0;
	}
</style>
