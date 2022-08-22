<template>
	<view class="right">
		<u-popup :show="show" mode="right" :customStyle="{width:'70vw'}" @close="closeRight">
			<view class="popup-content p20">
				<view class="header"></view>
				<view class="content" style="margin-top: 20rpx;">
					<view class="title">
						业务类型
					</view>
					<view class="btn-group">
						<u-button v-for="(item,index) in selectData"
							:class="{'active':formData.defKey.indexOf(item.defKey) != -1}" @click="selectOne(item)"
							shape="circle" :text="item.name"></u-button>
					</view>
				</view>
				<view class="content">
					<view class="title">
						申请人
					</view>
					<view class="leader-group">
						<view class="leader-item" :key="item.id" @longpress="deleteThis(item)"
							v-for="(item,index) in formData.chooses">
							{{item.name}}
						</view>
						<view class="leader-item btn" v-show="formData.chooses.length < 6" @click="showTxl">+</view>
					</view>
				</view>
				<RightTimeRange ref='rightTime' :currentBtn="formData.currentBtn" :end="formData.proposerDateEnd"
					:start="formData.proposerDateStart" @setTime="setTime"></RightTimeRange>
				<view class="bottom-group">
					<u-button shape="circle" @click="reset">重置</u-button>
					<u-button type="primary" @click="submit" shape="circle">提交</u-button>
				</view>
			</view>
		</u-popup>
		<u-action-sheet :actions="actionList" cancelText="取消" @select="listenAction" title="删除筛选值"
			@close="showAction=false" :show="showAction"></u-action-sheet>
	</view>
</template>

<script>
	import localCache from '@/util/cache.js'
	import RightTimeRange from '@/components/right-time-range/right-time-range.vue'
	import {
		getDeploySelect
	} from '@/api/process.js'
	export default {
		name: 'right',
		data() {
			return {
				currentValueName: '',
				delObj: {},
				actionList: [{
					name: '删除'
				}],
				selectData: [],
				showAction: false,
				formData: {
					chooses: [],
					defKey: [],
					appUserIds: [],
					proposerDateStart: '',
					proposerDateEnd: '',
					currentBtn: 999
				}
			}
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			searchData: {
				type: Object,
				default: () => {}
			}
		},
		created() {
			this.$EventBus.$on('changeChoose', e => {
				if (e.length <= 6) {
					this.formData.chooses = e
					this.formData.appUserIds = e.map(item => item.id)
				}
			})
			this.formData.currentBtn = this.searchData.currentBtn
			if(Array.isArray(this.searchData.defKey)){
				this.formData.defKey = this.searchData.defKey
			}else{
				this.formData.defKey = this.searchData.defKey.split(',')
			}
			this.formData.chooses = this.searchData.chooses || []
			if (this.formData.currentBtn == 999) {
				this.formData.proposerDateEnd = this.searchData.proposerDateEnd
				this.formData.proposerDateStart = this.searchData.proposerDateEnd
			}
		},
		components: {
			RightTimeRange
		},
		async mounted() {
			uni.hideLoading()
			const {
				data
			} = await getDeploySelect({
				category: 1
			})
			this.selectData = data
		},
		methods: {
			closeRight() {
				this.$emit('closeRight', !this.show)
			},
			deleteThis(e) {
				this.showAction = true
				this.delObj = e
			},
			selectOne(data) {
				if (this.formData.defKey.indexOf(data.defKey) == -1) {
					this.formData.defKey.push(data.defKey)
				} else {
					this.formData.defKey = this.formData.defKey.filter(item => item != data.defKey)
				}
			},
			listenAction(e) {
				if (e.name == '删除') {
					this.formData.chooses = this.formData.chooses.filter(item => item.id != this.delObj.id)
					this.delObj = {}
				}
			},
			submit() {
				const appUserIds = this.formData.appUserIds.toString()
				if(this.formData.defKey[0] == ''){
					this.formData.defKey = this.formData.defKey.splice(1)
				}
				if(this.formData.defKey.length == 1){
					this.formData.defKey = this.formData.defKey[0]
				}
				this.$emit('search', {
					proposerDateStart: this.formData.proposerDateStart,
					proposerDateEnd: this.formData.proposerDateEnd,
					appUserIds,
					defKey: this.formData.defKey,
					chooses: this.formData.chooses,
					currentBtn: this.formData.currentBtn
				})
				this.$emit('closeRight')
			},
			showTxl() {
				this.formData.appUserIds = this.formData.chooses.map(item=>item.id)
				const appUserIds = this.formData.appUserIds.toString()
				uni.navigateTo({
					url: '/pages/contacts/choose?limit=6&appUserIds=' + appUserIds
				})
			},
			setTime(e) {
				this.formData.proposerDateStart = e[0]
				this.formData.proposerDateEnd = e[1]
				this.formData.currentBtn = e[2]
			},
			reset() {
				this.$refs.rightTime.reset()
				this.formData = {
					chooses: [],
					defKey: [],
					appUserIds: '',
					proposerDateStart: '',
					proposerDateEnd: '',
					currentBtn: 999
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.popup-content {
		.header {
			font-size: 32rpx;
			display: flex;
			align-items: center;
			position: relative;

			.title {
				flex: 1;
			}

			.close {
				width: 50rpx;
				text-align: right;
			}
		}

		.content {
			margin-top: 40rpx;

			.title {
				font-size: 30rpx;
				margin-bottom: 20rpx;
			}

			.btn-group {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				align-items: center;

				.u-button {
					max-width: 45%;
					margin-left: inherit;
					height: 55rpx;
					margin-bottom: 20rpx;
				}

				.active {
					background-color: $main-color;
					color: #fff;
					border: 1px solid $main-color;
				}
			}

			.select {
				width: 80%;
				margin-bottom: 20rpx;

				.u-input {
					height: 40rpx;
					border-radius: 50rpx;
				}
			}

			.leader-group {
				display: flex;
				flex-wrap: wrap;

				.leader-item {
					font-size: 30rpx;
					min-width: 30%;
					margin-right: 5rpx;
					text-align: center;
					border-radius: 10rpx;
					border: 1px solid $main-color;
					background-color: $main-color;
					color: #fff;
					line-height: 60rpx;
					height: 60rpx;
					padding: 0;
					margin-top: 15rpx;
				}

				.btn {
					border: 1px solid #ddd;
					color: #333;
					background-color: #fff;
				}
			}


			.date {
				display: flex;
				justify-content: space-between;

				.u-input {
					width: 40%;
					height: 40rpx;
					border-radius: 50rpx;
				}
			}
		}

		.bottom-group {
			display: flex;
			justify-content: space-around;
			position: fixed;
			right: 0;
			width: 70vw;
			bottom: 30rpx;

			.u-button {
				width: 200rpx;
			}
		}
	}

	/deep/.u-action-sheet__item-wrap__item__name {
		color: red;
	}
</style>
