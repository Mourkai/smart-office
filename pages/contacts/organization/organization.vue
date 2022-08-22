<template>
	<view class="organization">
		<view class="search">
			<u-search :showAction="false" clearabled v-model="keyWord" style="width: 90%;" actionText="搜索"
				@clear="keyWord=''" @input="search" />
		</view>
		<OrganizationList
		    ref="org"
			:data="orgData" 
			:keyWord="keyWord" 
			@next="orgNext"
			@changeUsersIds="changeUsersIds" 
			@changeChildrenIds="changeChildrenIds" 
		/>
		<view class="bottom-bar" @click="showChose">
			<view class="title">
				已选择{{usersIds.length}}人
			</view>
			<view class="avatar-group" v-if="true">
				<view class="avatar-group-item">安雪</view>
				<view class="avatar-group-item">孟锴</view>
				<view class="avatar-group-item">哈哈</view>
				<view>
					...
				</view>
			</view>
			<view class="names-desc" v-else>
				{{namesDesc}}
			</view>
			<view class="up-icon">
				<u-icon name="arrow-up" color="#3196FA" labelColor="#3196FA" size="16"></u-icon>
			</view>
			<view class="bar-btn" @click.stop="createGroup">
				<u-button type="primary" shape="circle" :text="`确定(4/${count})`"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import OrganizationList from '@/components/organization-list/index.vue'
	import localCache from '@/util/cache.js'
	import {treeListWithUserCount,getAppAllUserCount} from '@/api/system.js'
	export default {
		data() {
			return {
				isAll: false,
				keyWord: '',
				usersIds:[],
				count:0,
				childrenIds:[],
				namesDesc:"请选择",
				restart:0,
				orgData:{
					children:[],
					users:[],
					id:''
				}
			}
		},
		onShow() {
			this.$nextTick(()=>{
				this.$refs.org.init()
			})
		},
		components:{
			OrganizationList
		},
		async onLoad({restart}) {
			this.restart = restart
			const {data} = await getAppAllUserCount()
			this.count = data
		},
		//restart 重新开始选择
		async mounted() {
			//判断vuex里有没有currentOrg,如果没有，请求最外层
			let currentOrg = this.$store.state.organization.currentOrg;
			var isEmpty = Object.keys(currentOrg);
			let children = [];
			let users = [];
			if(isEmpty.length == 0 || this.restart == 1){
				this.$store.commit('changeUsersIds',[])
				currentOrg = localCache.getCache('orgUsersList')
				if(!currentOrg){
					const re = await treeListWithUserCount()
					currentOrg = re.data[0]
					localCache.setCache('orgUsersList', currentOrg)
				}
			}
			if(currentOrg.children){
				 children = currentOrg.children.map(item=>{
					let num = `部门${Number(item.children.length)}`;
					if(item.children.length === 0){
						num = `人员${item.users.length}`
					}
					let isChecked = false
					if(this.childrenIds.indexOf(item.id) !== -1){
						isChecked=true;
					}
					return {
						id:item.id,
						title:item.orgName,
						orgName:item.orgName,
						isChecked,
						numberText:num,
						users:item.users,
						children:item.children
					}
				})
			}
			if(currentOrg.users){
				 users = currentOrg.users.map(item=>{
					let isChecked = false
					if(this.usersIds.indexOf(item.id) !== -1){
						isChecked=true;
					}
					return {
						id:item.id,
						name:item.name ?? "空",
						isChecked,
						departmentName: currentOrg.orgName
					}
				})
			}
			this.orgData.children = children
			this.orgData.users = users
			this.orgData.id = currentOrg.id
			this.$store.commit('changeOrg',currentOrg)
			uni.setNavigationBarTitle({
				title: currentOrg.orgName
			});
		},
		methods: {
			showChose(){
				uni.navigateTo({
					url:'/pages/contacts/organization/chose'
				})
			},
			orgNext(e){
				this.$store.commit('changeOrg',e)
				uni.navigateTo({
					url:'/pages/contacts/organization/organization'
				})
			},
			changeUsersIds(e){
				var newArr = e.filter(function(item,index){
				     return e.indexOf(item) === index;  // 因为indexOf 只能查找到第一个  
				});
				this.$store.commit('changeUsersIds',newArr)
				this.usersIds = newArr
			},
			changeChildrenIds(e){
				var newArr = e.filter(function(item,index){
				     return e.indexOf(item) === index;  // 因为indexOf 只能查找到第一个  
				});
				this.$store.commit('changeChildrenIds',newArr)
				this.childrenIds = newArr
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		box-sizing: border-box;
		overflow: hidden;
		background-color: #f6f6f6;
		color:#333
	}
	.scroll {
		position: absolute;
		left: 0;
		top: 110rpx;
		right: 0;
		padding-bottom: 100px;
	}
	.search {
		position: fixed;
		z-index: 9;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		padding: 30rpx 0 20rpx 0;
		margin-bottom: 20rpx;
		background-color: #fff;
	}
	.bottom-bar{
		box-sizing: border-box;
		position: fixed;
		display: flex;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		padding: 30rpx;
		border-top: 2rpx solid #E4E4E4;
		.title{
			width:25%;
			line-height: 60rpx;
			white-space: nowrap;
			overflow: hidden;
		}
		.names-desc{
			flex: 1;
			line-height: 60rpx;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.up-icon{
			width:5%;
			margin:18rpx 10rpx 0 10rpx;
		}
		.avatar-group{
			display: flex;
			flex: 1;
			.avatar-group-item{
				font-size: 25rpx;
				width: 60rpx;
				height: 60rpx;
				text-align: center;
				line-height: 60rpx;
				border-radius: 10rpx;
				background-color:#3196FA;
				padding: 5rpx;
				color: #fff;
				margin:0 5rpx;
			}
		}
		.bar-btn{
			width: 30%;
		}
	}
</style>
