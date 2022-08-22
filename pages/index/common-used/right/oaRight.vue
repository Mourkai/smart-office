<template>
	<view class="right">
		<u-popup :show="show" mode="right" :customStyle="{width:'70vw'}" @close="closeRight">
			<view class="popup-content p20">
				<view class="header"></view>
				<view class="content">
					<view class="select" @click="selectCategory">
						<u--input placeholder="业务模块" suffixIconStyle="fontSize:13px" fontSize="13"
							v-model="formData.category" readonly suffixIcon="arrow-down" />
					</view>
					<view class="select" @click="selectDefKey">
						<u--input placeholder="业务类别" suffixIconStyle="fontSize:13px" fontSize="13"
							v-model="formData.defKey" readonly suffixIcon="arrow-down" />
					</view>
				</view>
				<view class="content">
					<view class="title">
						申请部门
					</view>
					<view class="select" @click="selectPro">
						<u--input placeholder="请选择" suffixIconStyle="fontSize:13px" fontSize="13" border="surround"
							v-model="formData.value1" readonly suffixIcon="arrow-down" />
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
				<RightTimeRange :currentBtn="formData.currentBtn" :end="formData.proposerDateEnd"
					:start="formData.proposerDateStart" @setTime="setTime"></RightTimeRange>
				<view class="bottom-group">
					<u-button shape="circle" @click="reset">重置</u-button>
					<u-button type="primary" @click="submit" shape="circle">提交</u-button>
				</view>
			</view>
		</u-popup>
		<u-action-sheet :actions="actionList" cancelText="取消" @select="listenAction" title="删除筛选值"
			@close="showAction=false" :show="showAction"></u-action-sheet>
		<u-picker :show="showCategory" keyName="dictLabel" :defaultIndex="categoryDefault" @confirm="confirmCategory"
			@cancel="showCategory=false" :columns="columns"></u-picker>
		<u-picker :show="showDefKey" keyName="name" @confirm="confirmdefKey" :defaultIndex="defKeyDefault"
			@cancel="showDefKey=false" :columns="columns"></u-picker>
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
		created() {
			this.$EventBus.$on('changeChoose', e => {
				if(e.length <= 6){
					this.formData.chooses = e
					this.formData.appUserIds = e.map(item=>item.id)
				}
			})
			this.formData.currentBtn = this.searchData.currentBtn
			if (this.formData.currentBtn == 999) {
				this.formData.proposerDateEnd = this.searchData.proposerDateEnd
				this.formData.proposerDateStart = this.searchData.proposerDateStart
			}
		},
		mounted() {
			const bdata = localCache.getCache('businessModule')	
			bdata.forEach((item, index) => {
				if (this.searchData.category == item.dictValue) {
					this.formData.category = item.dictLabel
					this.formData.categoryId = item.dictValue
					this.categoryDefault = [index]
					this.selectDefKey(false)
				}
			})
			this.formData.chooses = this.searchData.chooses || []
			uni.hideLoading()
		},
		components: {
			RightTimeRange
		},
		methods: {
			closeRight() {
				this.$emit('closeRight', !this.show)
			},
			selectPro(){
				uni.$u.toast("暂未开放")
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
			selectCategory() {
				let bdata = []
				this.showCategory = true
				bdata = localCache.getCache('businessModule')
				this.columns = [
					bdata
				]
			},
			async selectDefKey(isShow) {
				if(!this.formData.categoryId){
					uni.$u.toast("请先选择业务模块")
					return false
				}
				const bdata = await getDeploySelect({
					category: this.formData.categoryId
				})
				if (isShow instanceof Object) {
					this.showDefKey = true
					this.columns = [
						bdata.data
					]
				} else {
					bdata.data.forEach((item, index) => {
						if (this.searchData.defKey && item.defKey == this.searchData.defKey) {
							this.defKeyDefault = [index]
							this.formData.defKey = item.name
						}
					})
				}
			},
			submit() {
				const appUserIds = this.formData.appUserIds.toString()
				this.$emit('search', {
					category: this.formData.categoryId,
					defKey: this.formData.defKeyId,
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
			confirmCategory(e) {
				const value = e.value[0]
				if (this.formData['categoryId'] !== value.dictValue) {
					this.formData['category'] = value.dictLabel
					this.formData['categoryId'] = value.dictValue
					this.formData['defKey'] = ''
					this.formData['defKeyId'] = ''
				}
				this.showCategory = false
			},
			confirmdefKey(e) {
				const value = e.value[0]
				this.formData['defKey'] = value.name
				this.formData['defKeyId'] = value.defKey
				this.showDefKey = false
			},
			setTime(e) {
				this.formData.proposerDateStart = e[0]
				this.formData.proposerDateEnd = e[1]
				this.formData.currentBtn = e[2]
			},
			reset(){
				this.formData = {
					category: '',
					categoryId: '',
					chooses: [],
					appUserIds: [],
					defKey: '',
					defKeyId: '',
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
				justify-content: space-between;

				.u-button {
					width: 30%;
					height: 60rpx;
					margin-bottom: 20rpx;
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
