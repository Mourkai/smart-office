<template>
	<view class="details">
		<!-- <view class="header">
			<view class="title" v-text="name"></view>
		</view> -->
		<!-- watchUpdateUtilStr：为了解决组件更新，但是myDetails子组件不更新的参数，子组件监听该时间戳参数变化，从而做一些事情 -->
		<myDetails :name="component" :id="id" :watchUpdateUtilStr="watchUpdateUtilStr" :process="process" />
		<view class="step-title p20">流程</view>
		<view class="step-line p20">
			<LineProcess :data="process"></LineProcess>
		</view>
		<template v-if="isButton==1">
			<view class="btn-group">
				<u-button type="primary" v-for="(item,index) in btnList" shape="circle" :disabled="item.disabled" @click="openModel(item,index)"
					:text="item.name" />
			</view>
		</template>
		<template v-if="isButton==2">
			<u-button shape="circle" v-if="showBackBtn" type="primary" style="width: 70%;" @click="backNotice" text="撤销" />
		</template>
		<view class="btn-group" v-if="isButton==3">
			<u-button shape="circle" type="primary" style="width: 40%;" :style="{'width':showBackBtn ? '40%':'100%'}" @click="openModel(btnList[3],3)" text="转发" />
			<u-button shape="circle" type="primary" v-if="showBackBtn" style="width: 40%;" @click="backNotice" text="撤销"></u-button>
		</view>
		<template v-if="isButton==4">
			<u-button shape="circle" type="primary" style="width: 70%;" @click="openModel(btnList[3],3)" text="转发" />
		</template>

		<ApprovalModal v-if="showModal" @close="showModal = false" @confirm="confirm" :data="btnList[currentModalIndex]"
			:show="showModal" />
	</view>
</template>
<script>
	import LineProcess from '@/components/line-process/line-process.vue'
	import ApprovalModal from '@/components/approval-modal/approval-modal.vue'
	import {
		getTrackById,
		adoptById,
		refuseById,
		transferById,
		relayById,
		countersignById,
		sendBackById,
		getPendingCount,
		todoclass
	} from '@/api/process.js'
	import {
		btnList,
		resetBtnList
	} from './config/common.js'
	import {
		resovleMenu
	} from '../config/wait.js'
	import localCache from '@/util/cache.js'
	import myDetails from './details.vue'
	import {compleAct} from '@/api/process.js'
	export default {
		data() {
			return {
				id: 0,
				path: '',
				process: [],
				name: '',
				isButton: 0,
				showBackBtn: true, //撤销按钮
				showModal: false,
				showFile: false,
				currentModalIndex: 0,
				btnList,
				sourceBtnList:[],
				watchUpdateUtilStr:new Date().getTime(),
				component: '',
				path: '',
				userId: ''
			};
		},
		async onLoad(data) {
			this.loadData(data)
		},
		components: {
			LineProcess,
			ApprovalModal,
			myDetails
		},
		mounted() {
			switch(this.component){
				case "project_daily_record":
					this.btnList[1].disabled = true
					this.showBackBtn = false
				break;
				case "performance_evaluation_appeal":
					this.btnList[0].name = '同意申诉'
					this.btnList[1].name = '申诉不通过'
					this.btnList[2].disabled = true
					this.btnList[3].disabled = true
					this.btnList[4].disabled = true
					this.btnList[5].disabled = true
				break;
				default:
					this.btnList = resetBtnList()
					this.showBackBtn = true
			}
		},
		methods: {
			async openModel(item, index) {
				this.currentModalIndex = index
				this.btnList[index].id = this.id
				this.showModal = true
			},
			cancelModal() {
				this.showModal = false
			},
			backNotice() {
				uni.$u.toast('暂不支持')
			},
			async confirm(e) {
				const func = this.btnList[this.currentModalIndex].requestFunc
				let re = null
				e.id = this.id
				switch (func) {
					case 'adoptById': //批准
						re = await adoptById(e);
						break;
					case 'refuseById': //拒绝
						delete e.userId
						re = await refuseById(e);
						break;
					case 'transferById': //转办 （包含多个用户id）
						e.transferUserId = e.userId
						delete e.userId
						re = await transferById(e);
						break;
					case 'relayById': //转发
						if (!Array.isArray(e.userId)) {
							e.userId = [e.userId]
						}
						e.relayUserIdList = e.userId
						delete e.userId
						re = await relayById(e);
						break;
					case 'countersignById': //加签
						e.busId = this.id
						delete e.id
						re = await countersignById(e);
						break;
					case 'sendBackById': //退回
						delete e.userId
						re = await sendBackById(e);
						break;
					default:
						re = null
				}
				if (re.code == 200) {
					const pages = getCurrentPages();
					const prevPage = pages[pages.length - 2]; //上一个页面
					//转发按钮下标为3 所以不需要删除
					this.currentModalIndex != 3 && prevPage.$vm.delListItem(this.id)
					uni.$u.toast('操作成功')
					const {
						data
					} = await getPendingCount()
					uni.setTabBarBadge({
						index: 0,
						text: data.pending.toString()
					})

					const category = await todoclass()
					this.menu = category.data.map(item => {
						return {
							...resovleMenu(item)
						}
					})
					localCache.setCache('waitCategory', this.menu)
					setTimeout(() => {
						uni.navigateBack()
					}, 500)
				}
			},
			async loadData({
				id,
				name,
				bpmStatus,
				path,
				createBy
			}){
				this.isButton = 1
				const userInfo = localCache.getCache('userInfo')
				this.userId = userInfo.userId
				this.component = path
				this.id = id
				this.name = name || '详情'
				uni.setNavigationBarTitle({
					title:name
				})
				//日志禁用拒绝按钮
				const re = await getTrackById(id)
				const newArr = []
				let isSelfOper = false;//我是不是正在审批这条数据
				re.data.forEach((item,index) => {
					item.approveList.forEach(item2 => {
						if (item2.operType == 2 && item2.approvalUserId == this.userId) {
							this.isButton = 4//如果流程里有本人，并且本人已经审批了
						}
						if (item2.operType == 12 && item2.approvalUserId == this.userId) {
							this.isButton = 4
						}
						if (item2.operType == 1 && item2.approvalUserId == this.userId) {
							this.isButton = 1//如果流程里有本人，并且本人正在审批中，该状态会覆盖之前的
							isSelfOper = true
						}
						newArr.push(item2)
					})
				})
				if (bpmStatus == 1) { //待提交，只显示撤销 bpmStatus == 1待提交
					this.isButton = 2
					if (createBy !== this.userId) { //待提交,并且不是本人的情况,就一定有【撤销】【转发】
						this.isButton = 3
					}
				}
				if (bpmStatus == 4) { //已拒绝
					this.isButton = 4
				}
				if (bpmStatus == 2 && newArr.length <= 2 && createBy == this.userId) {
					//已发起，没人审批的情况下，是有【撤销】【转发】按钮
					this.isButton = 3
				} else if ((bpmStatus == 2 || bpmStatus == 3) && newArr.length >= 2 && createBy == this.userId && !isSelfOper) {
					//!isSelfOper 这条数据是我自己提的，我也要审批我自己提的数据，这个时候应该button == 1才对
					//已发起，如果有一个人审批了，就只显示【转发】按钮
					//审批人审批了单子，在已处理去看，只有【转发】按钮
					this.isButton = 4
				}
				if (createBy != this.userId && bpmStatus == 3) { //不是我的，但是我已经批准了，不显示按钮
					this.isButton = 4
				}
				this.process = newArr
				this.watchUpdateUtilStr = new Date().getTime()
			}
		},
	};
</script>
<style lang="scss">
	.details {
		box-sizing: border-box;
		padding-bottom: 50rpx;
	}

	.step-title {
		//border-top: 1px solid #ddd;
	}

	.header {
		padding: 40rpx 20rpx;
		font-size: 38rpx;
		border-bottom: 1px solid #D7D7D7;

		.desc {
			margin-top: 15rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #666666;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}
		}
	}

	.btn-group {
		.u-button {
			width: 23%;
			height: 70rpx;
			margin: 30rpx 20rpx;
		}

		border-top: 1px solid #ddd;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.step-line {
		margin-bottom: 40rpx;
	}

	.file-content {
		text-align: center;
		padding: 50rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.icon {
			margin-bottom: 20rpx;
		}
	}
</style>
