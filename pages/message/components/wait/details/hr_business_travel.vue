<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="title">流程编号</view>
				<view class="desc" v-text="data.instanceNo"></view>
			</view>
			<view class="content-item">
				<view class="title">姓名</view>
				<view class="desc" v-text="data.userName"></view>
			</view>
			<view class="content-item">
				<view class="title">员工编码</view>
				<view class="desc" v-text="data.userData.workCode"></view>
			</view>
			<view class="content-item">
				<view class="title">工号</view>
				<view class="desc" v-text="data.userData.workCode"></view>
			</view>	
			<view class="content-item">
				<view class="title">手机号</view>
				<view class="desc" v-text="data.userData.phonenumber"></view>
			</view>
			<view class="content-item">
				<view class="title">员工类型</view>
				<view class="desc" v-text="data.userData.staffTypeDesc"></view>
			</view>
			<view class="content-item">
				<view class="title">所在部门</view>
				<view class="desc" v-text="data.userData.orgName"></view>
			</view>
			<view class="content-item">
				<view class="title">岗位</view>
				<view class="desc" v-text="data.userData.postName"></view>
			</view>
			<view class="content-item">
				<view class="title">直属主管</view>
				<view class="desc" v-text="data.userData.leaderName"></view>
			</view>
		</view>
		<view class="content" v-for="item in data.detailList">
			<view class="pro-title">
				出差信息
			</view>
			<view class="content-item">
				<view class="title">出差事由</view>
				<view class="desc" v-text="data.reason1"></view>
			</view>
			<view class="content-item">
				<view class="title">交通工具</view>
				<view class="desc" v-text="vehicle[item.vehicle]"></view>
			</view>
			<view class="content-item">
				<view class="title">单程往返</view>
				<view class="desc" v-text="tripType[item.tripType]"></view>
			</view>
			<view class="content-item">
				<view class="title">起止日期</view>
				<view class="desc">{{item.startDate+' ~ '+item.endDate}}</view>
			</view>
			<view class="content-item">
				<view class="title">出发地</view>
				<view class="desc" v-text="item.startAddress"></view>
			</view>
			<view class="content-item">
				<view class="title">目的地</view>
				<view class="desc" v-text="item.endAddress"></view>
			</view>
			<view class="content-item">
				<view class="title">天数</view>
				<view class="desc" v-text="item.days"></view>
			</view>
			<view class="content-item">
				<view class="title">出差备注</view>
				<view class="desc" v-text="item.remark"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		businessTravel
	} from '@/api/hr.js'
	import {
		getOneArea,
		getUserInfo
	} from '@/api/system.js'
	export default {
		data() {
			return {
				data: {
					userData:{}
				},
				vehicle: ['', '飞机', '火车', '汽车', '其他'],
				tripType: ['', '单程', '往返']
			}
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		async mounted() {
			let {
				data
			} = await businessTravel(this.id)
			data.detailList.map(async (item)=>{
				const r1 = await getOneArea(item.startAddress)
				const r2 = await getOneArea(item.endAddress)
				item.startAddress = r1.data.commonName
				item.endAddress = r2.data.commonName
				return item
			})
			const userData = await getUserInfo(data.userId)
			data.userData = userData.data.sysWorkInfoDto
			this.data = data
		},
		methods: {
			async getArea(id) {
				const data = await getOneArea(id)
				return data.data.commonName
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../config/details.scss";
</style>
