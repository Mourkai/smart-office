<template>
	<view>
		<view class="content">
			<view class="pro-title">
				申请人信息
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

		<view class="content" v-for="item in data.computerRentalDetailDtoList">
			<view class="pro-title">
				明细信息
			</view>
			<table class="work-table">
				<tr>
					<td>
						使用人：{{item.userName}}
					</td>
					<td>
						需求日期：{{item.demandDate}}
					</td>
				</tr>
				<tr>
					<td>
						电脑类型：{{getType(item.computerType)}}
					</td>
					<td>
						数量：{{item.amount}}
					</td>
				</tr>
				<tr>
					<td>
						接收人：{{item.receiverName}}
					</td>
					<td>
						手机：{{item.receiverPhone}}
					</td>
				</tr>
				<tr>
					<td colspan="2">
						项目编号：{{item.projectCode}}
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<view style="display: flex;">
							<text style="width:20%;line-height: 23px;">租赁费用</text>
							<u--input v-if="isShowEdit" placeholder="请输入内容" type="number" style="flex:1;border: 0;padding: 0;" 
							 v-model="item.price">
								 <template slot="suffix">
									<u-button
										text="修改"
										type="success"
										size="mini"
										@click="toChangeFee(item)"
									/>
								</template>
							</u--input>
							<view style="line-height: 23px;" v-else>
								{{item.price}}
							</view>
						</view>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						项目名称：{{item.projectName}}
					</td>
				</tr>
				<tr>
					<td colspan="2">
						配置要求：{{item.configurationTypeName}}
					</td>
				</tr>
				<tr>
					<td colspan="2">
						邮寄地址：{{item.mailingAddress}}
					</td>
				</tr>
				<tr>
					<td colspan="2">
						说明：{{item.remark}}
					</td>
				</tr>
			</table>
		</view>
	</view>
</template>

<script>
	import {
		computerRentalInfo,
		updateComputerList
	} from '@/api/administration.js'
	import localCache from '@/util/cache.js'
	import {
		computerTypeList
	} from '@/api/system.js'
	export default {
		data() {
			return {
				data: {},
				isShowEdit:false,
				comp:[]
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
			} = await computerRentalInfo(this.id)
			const comp = await computerTypeList();
			this.data = data
			this.comp = comp.data
		},
		methods:{
			getType(computerType){
				const r2Data = this.comp.find(item=>computerType  == item.value)
				return r2Data.label
			},
			toChangeFee(e){
				if(!e.price){
					return uni.showToast({
						title: '金额错误',
						icon: 'none'
					})
				}
				updateComputerList(this.data.computerRentalDetailDtoList).then(res=>{
					if(res.data){
						uni.showToast({
							title: '修改成功',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
</style>
