<template>
	<view class="right">
		<u-popup :show="show" mode="right" :customStyle="{width:'550rpx'}" @close="closeRight" @open="open">
			<view class="popup-content p20">
				<!-- 	<view class="header">
					<view class="title">
						筛选
					</view>
					<view class="close" @click="closeRight">
						<u-icon name="close"></u-icon>
					</view>
				</view> -->
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
				<RightTimeRange ref="rightTime" :currentBtn="formData.currentBtn" :end="formData.proposerDateEnd"
					:start="formData.proposerDateStart" @setTime="setTime" />
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
	import RightTimeRange from '@/components/right-time-range/right-time-range.vue'
	export default {
		name: 'right',
		data() {
			return {
				showDefKey: false,
				showAction: false,
				showCategory: false,
				currentValueName: '',
				delObj: {},
				actionList: [{
					name: '删除'
				}],
				categoryDefault: [],
				defKeyDefault: [],
				formData: {
					category: '',
					categoryId: '',
					chooses: [],
					appUserIds: [],
					defKey: '',
					defKeyId: '',
					proposerDateStart: '',
					proposerDateEnd: '',
					currentBtn: 999
				},
				columns: []
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
		components: {
			RightTimeRange
		},
		created() {
			this.$EventBus.$on('changeChoose', e => {
				if (e.length <= 6) {
					this.formData.chooses = e
					this.formData.appUserIds = e.map(item => item.id)
				}
			})
			this.formData.currentBtn = this.searchData.currentBtn
			this.formData.chooses = this.searchData.chooses || []
			if (this.formData.currentBtn == 999) {
				this.formData.proposerDateEnd = this.searchData.proposerDateEnd
				this.formData.proposerDateStart = this.searchData.proposerDateEnd
			}
		},
		mounted() {
			uni.hideLoading()
		},
		methods: {
			closeRight() {
				this.$emit('closeRight', !this.show)
			},
			closeRight() {
				this.$emit('closeRight', !this.show)
			},
			deleteThis(e) {
				this.showAction = true
				this.delObj = e
			},
			listenAction(e) {
				if (e.name == '删除') {
					this.formData.chooses = this.formData.chooses.filter(item => item.id != this.delObj.id)
					this.delObj = {}
				}
			},
			submit() {
				const appUserIds = this.formData.appUserIds.toString()
				this.$emit('search', {
					proposerDateStart: this.formData.proposerDateStart,
					proposerDateEnd: this.formData.proposerDateEnd,
					appUserIds,
					chooses: this.formData.chooses,
					currentBtn: this.formData.currentBtn
				})
				this.$emit('closeRight')
			},
			showTxl() {
				this.formData.appUserIds = this.formData.chooses.map(item=>item.id)
				const appUserIds = this.formData.appUserIds.toString()
				uni.navigateTo({
					url: '/pages/contacts/choose?limit=6&appUserIds='+appUserIds
				})
			},
			setTime(e) {
				this.formData.proposerDateStart = e[0]
				this.formData.proposerDateEnd = e[1]
				this.formData.currentBtn = e[2]
			},
			reset(){
				this.$refs.rightTime.reset()
				this.formData = {
					category:'',
					categoryId:'',
					chooses:[],
					appUserIds:'',
					defKey:'',
					defKeyId:'',
					proposerDateStart:'',
					proposerDateEnd:'',
					currentBtn:999
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.popup-content {
		.header {
			font-size: 35rpx;
			display: flex;
			align-items: center;
			margin-top: 20rpx;

			.title {
				flex: 1;
			}

			.close {
				width: 50rpx;
				text-align: right;
			}
		}

		.content {
			margin-top: 60rpx;

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
					height: 60rpx;
					margin-bottom: 20rpx;
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
</style>
