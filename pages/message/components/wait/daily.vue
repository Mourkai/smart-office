<template>
	<view class="daily">
		<view class="fixed-header">
			<view class="search">
				<u-search inputAlign="center" height="30" :showAction="false" />
				<view class="icon" @click="showRight = true">
					<u-icon name="list" size="26"></u-icon>
				</view>
			</view>
			<view class="select">
				<u-checkbox-group class="select-checknox" placement="column" @change="changeisAll">
					<u-checkbox label="全选" labelSize="13" shape="circle" :checked="checkAll" name="全选">
					</u-checkbox>
				</u-checkbox-group>
				<view class="choose" @click="showTop = true">
					<view class="text">选择项目名称</view>
					<view>
						<u-icon name="arrow-down" size="18"></u-icon>
					</view>
				</view>
				<view class="submit" @click="allsub">
					批量提交
				</view>
			</view>
		</view>
		<view class="list fixed-body">
			<u-checkbox-group v-model="checkarr" class="select-checknox" placement="column">
				<MessageItem v-for="(item,index) in itemData" :iconGroup="iconGroup" :key="item.name" @change="check=>itemChange(index,check)" checkbox :data="item" />
			</u-checkbox-group>
		</view>
		<u-popup :show="showTop" closeOnClickOverlay @close="showTop = false" mode="top">
			<view class="top-content">
				<u-radio-group v-model="radiovalue1" placement="column">
					<u-radio :customStyle="{marginBottom: '30rpx'}" v-for="(item, index) in radiolist1" :key="index"
						:label="item.name" :name="item.name" @change="radioChange">
					</u-radio>
				</u-radio-group>
				<view class="btn-group">
					<u-button type="primary" size="mini" shape="circle" @click="showTop = false" text="确定"></u-button>
					<u-button type="info" size="mini" shape="circle" @click="showTop = false" text="关闭"></u-button>
				</view>
			</view>
		</u-popup>
		<DailyRight :show="showRight" @closeRight="showRight = false"></DailyRight>
	</view>
</template>

<script>
	import MessageItem from '@/components/message-item/message-item.vue'
	import DailyRight from './right/dailyRight.vue'
	import {
		itemData
	} from './config/daily.js'
	export default {
		name: 'daily',
		data() {
			return {
				isAllSelect: [],
				checkarr:[],
				itemData,
				checkAll:false,
				iconGroup:['order','grid','map','clock'],
				showTop: false,
				showRight:false,
				radiolist1: [{
						name: '北京电力公司某某项目',
						disabled: false
					},
					{
						name: '青岛电力公司某某项目',
						disabled: false
					},
					{
						name: '美国电力公司某某项目',
						disabled: false
					}
				],
				radiovalue1: '美国电力公司某某项目',
			}
		},
		components: {
			MessageItem,
			DailyRight
		},
		methods: {
			changeisAll(n) {
				this.checkAll = !this.checkAll
				this.itemData.map(item=>item.check = this.checkAll)
			},
			radioChange(n) {
			},
			allsub(){
				//批量提交
			},
			toPage() {
			},
			itemChange(index,check){
				if(!check){
					this.checkAll = false
				}else{
					this.itemData[index].check = check
					//是否全选true
					const isHadFalse = this.itemData.filter(item=>item.check===false)
					if(isHadFalse.length === 0){//如果不存在false的情况下，那就是手动全选了
						this.checkAll = true
					}
				}
			}
		}
	}
</script>
<style lang="scss">
	page{
		position: relative;
	}
	.fixed-header{
		    position: fixed;
		    width: 100%;
		    background-color: #fff;
		    z-index: 9;
		    left: 0;
	}
	.fixed-body{
		position: absolute;width: 100%;top: 240rpx;
		padding-bottom: 200rpx;
	}
	.search {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 30rpx 20rpx;

		.u-search {
			margin-right: 40rpx !important;
		}
	}

	.select {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 20rpx 20rpx 35rpx 20rpx;
		font-size: 30rpx;
		justify-content: center;
		border-bottom: 1px solid #D7D7D7;

		.select-checknox {
			flex: 1;
		}

		.choose {
			min-width: 200rpx;
			display: flex;
			align-items: center;
			color: #606266;

			.text {
				margin-right: 10rpx;
			}
		}

		.submit {
			flex: 1;
			text-align: right;
			color: #3196FA;
		}
	}

	.list {
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	.top-content{
		padding: 50rpx;
		.btn-group{
			display: flex;
			justify-content: center;
			margin-top: 30rpx;
			.u-button{
				width: 200rpx;
				height: 60rpx;
			}
		}
	}
</style>
