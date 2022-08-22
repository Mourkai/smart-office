<template>
	<view>
		<view class="content">
			<view class="pro-title">
				申请信息
			</view>
			<view class="content-item">
				<view class="title">申请人</view>
				<view class="desc" v-text="data.applicantName"></view>
			</view>
			<view class="content-item">
				<view class="title">所属部门</view>
				<view class="desc" v-text="data.orgName"></view>
			</view>
			<view class="content-item">
				<view class="title">项目名称</view>
				<view class="desc" v-text="data.projectName"></view>
			</view>
			<view class="content-item">
				<view class="title">项目编号</view>
				<view class="desc" v-text="data.projectCode"></view>
			</view>
			<view class="content-item">
				<view class="title">申请时间</view>
				<view class="desc" v-text="data.applicationDate"></view>
			</view>
			<view class="content-item">
				<view class="title">费用合计</view>
				<view class="desc" v-text="data.total"></view>
			</view>
			<view class="content-item">
				<view class="title">备注</view>
				<view class="desc" v-text="data.remark"></view>
			</view>
		</view>
		<view class="content" v-for="item in data.purchaseDetailDtoList">
			<view class="pro-title">
				明细信息
			</view>
			<table class="work-table">
				<tr>
					<td>
						{{item.reiName}}
					</td>
					<td>
						物品/事项：{{item.reimbursementName}}
					</td>
				</tr>
				<tr>
					<td>
						预算数量：{{item.number}}
					</td>
					<td>
						预算金额：{{item.budgetFee}}
					</td>
				</tr>
				<tr>
					<td  colspan="2">
						预算单价：{{item.budgetPrice}}
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<view style="display: flex;">
							<view style="line-height: 30px;">执行数量</view>
							<u--input placeholder="请输入内容" maxlength="8" v-if="isShowEdit" @input="change(item)" type="number" style="width:50%;;border: 0;padding:0 0 0 10px;" 
							 v-model="item.executiveNumber" />
							<view style="line-height: 30px;" v-else>
								：{{item.executiveNumber}}
							</view>
						</view>
					</td>
				</tr>
				<tr>
					<td  colspan="2">
						<view style="display: flex;">
							<view style="line-height: 30px;">执行金额</view>
							<u--input placeholder="请输入内容" @input="change(item)" maxlength="8" v-if="isShowEdit" type="number" style="width:50%;border: 0;padding:0 0 0 10px;" 
							 v-model="item.executiveFee" />
							<view style="line-height: 30px;" v-else>
								：{{item.executiveFee}}
							</view>
						</view>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<view style="display: flex;">
							<view style="flex: 1;">
								执行单价：{{item.executivePrice}}
							</view>
							<u-button
								style="width:60px;"
								text="修改"
								type="success"
								size="mini"
								@click="toChange(item)"
							/>
						</view>
					</td>
				</tr>
			</table>
		</view>
	</view>
</template>

<script>
	import {
		purchaseInfo,
		updatePurchaseList
	} from '@/api/administration.js'
	import localCache from '@/util/cache.js'
	export default {
		data() {
			return {
				data:{},
				isShowEdit:false
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			},
			process:{
				type:Array,
				default:[]
			},
			watchUpdateUtilStr:{
				type: Number,
				default:0
			}
		},
		watch:{
			watchUpdateUtilStr(val) {
				if(this.process.length > 0){
					const last = this.process[this.process.length-1]
					const userInfo = localCache.getCache('userInfo')
					if(last.title.indexOf("行政总监") != -1 && userInfo.userId == last.userId){
						this.isShowEdit = true
					}
				}
			}
		},
		async mounted() {
			let {
				data
			} = await purchaseInfo(this.id)
			this.data = data
		},
		methods:{
			toChange(data){
				if(this.change(data)){
					updatePurchaseList(this.data.purchaseDetailDtoList).then(res=>{
						if(res.data){
							uni.showToast({
								title: '修改成功',
								icon: 'none'
							})
						}
					})
				}
			},
			change(data){
				if(data.executiveFee <= 0 || data.executiveNumber <= 0){
					uni.showToast({
						title: '数字错误',
						icon: 'none'
					})
					return false;
				}
				let d = data.executiveFee/data.executiveNumber
				data.executivePrice = d.toFixed(2);
				return true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
</style>