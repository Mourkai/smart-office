<template>
	<view class="organization-list">
		<view class="scroll" :class="{'clear-scroll-top':!selected}">
			<!-- 全选 -->
			<view class="allCheck p20" v-if="selected">
				<u-checkbox-group>
					<u-checkbox :checked="isAll" shape="circle"  @change="changeAll" labelColor="#333" label="全选" />
				</u-checkbox-group>
			</view>
			<!-- 渲染组织 -->
			<u-checkbox-group placement="column">
				<view class="org-list p20" v-if="data.children.length">
					<view class="list-item" v-for="(item,index) in data.children">
						<view class="left-block">
							<u-checkbox shape="circle" v-if="selected" :name="item.id" @change="e=>changeChildren(e,item)" :checked="item.isChecked" />
							<view class="title" v-text="item.id+'--'+item.isChecked"></view>
							<view class="number" v-text="` (${item.users.length}) `"></view>
						</view>
						<view class="right-block">
							<u-icon name="list-dot" color="#3196FA" v-if="selected" labelColor="#3196FA" @click="toChildren(item)" label="下级" size="25" />
							<u-button type="primary" size="small" v-else shape="circle" @click="removeGroup(item.id)" text="移除"></u-button>
						</view>
					</view>
				</view>
			</u-checkbox-group>
			<!-- 渲染人员 -->
			<u-checkbox-group placement="column">
				<view class="users">
					<view class="info" v-for="(item,index) in data.users">
						<view>
							<u-checkbox :name="item.id" v-if="selected" shape="circle" @change="e=>changeUsers(e,item)" :checked="item.isChecked" />
						</view>
						<Avatar :name="item.name ? item.name:'无'" size="80rpx" />
						<view class="pitem">
							<text class="name" v-text="item.name ? item.name:'无'"></text>
							<text class="post" v-text="item.isChecked"></text>
						</view>
						<view class="right-block">
							<u-button type="primary" size="small" v-if="!selected" shape="circle" @click="removeusers(item.id)" text="移除"></u-button>
						</view>
					</view>
				</view>
			</u-checkbox-group>
		</view>
	</view>
</template>

<script>
	import Avatar from '@/components/avatar/avatar.vue'

	export default {
	
		data() {
			return {
				isAll: false,
				childrenIds: this.$store.state.organization.childrenIds//组织id
			}
		},
		props:{
			keyWord:{
				type:String,
				default:""
			},
			selected:{
				type:Boolean,
				default:true
			},
			data:{
				type:Object,
				default:()=>{}
			}
		},
		components:{
			Avatar
		},
		methods: {
			toChildren(data){
				this.$emit('next',data)
			},
			init(e){
				//判断本页面所有的组织ID，所有的人员ID 是否都存在于缓存数组里
				//如果都存在的话，那么全选按钮是要选中的
				const orgId=this.data.children.map((v)=>{
					return v.id
				})
				const users=this.data.users.map((v)=>{
					return v.id
				})
				//vuex缓存的组织
				let childrenIds = this.$store.state.organization.childrenIds;
				childrenIds.filter((v)=>{
					const checkData = this.data.children.find(item=>item.id == v)
					if(checkData){
						if(orgId.indexOf(v) != -1){
							//要选中的组织
							checkData.isChecked = true
						}else{
							checkData.isChecked = false
						}
					}
				})
				//vuex缓存的人员
				let usersIds = this.$store.state.organization.usersIds;
				usersIds.filter((v)=>{
					const checkData = this.data.users.find(item=>item.id == v)
					if(checkData){
						if(users.indexOf(v) != -1){
							//要选中的组织
							checkData.isChecked = true
						}else{
							checkData.isChecked = false
						}
					}
				})
				if(usersIds.length && childrenIds.length){
					if(this.filterArr(childrenIds,orgId).length==0 && this.filterArr(usersIds,users).length==0){
						//选中全选按钮
						this.isAll = true
						this.checkOrgAndPer(true)
					}
				}
			},
			//取差集
			filterArr(arr,arr2){
				return arr2.filter((v)=>{
					return arr.indexOf(v)==-1 
				})
			},
			setChildrenIds(children,e){
				// children.forEach(item=>{
				// 	const da = this.data.children.find(item2=>item2.id==item)
				// 	//获取组下所有id
				// 	if(da.children.length > 0){
				// 		const downChildrenIds = this.digui(da.children,[],true)
				// 		arr = arr.concat(downChildrenIds)
				// 	}
				// })
			},
			digui(children,arr,e){
				for (let i = 0; i < children.length; i++) {
					 
					  arr.push(children[i].id)
					  if(children[i].users.length > 0){
						  this.setUsersIds(children[i].users,e)
					  }
					  if(children[i].children.length > 0){
						 this.digui(children[i].children,arr,e)
					  }
				}
				return arr;
			},
			changeChildren(e,data,isallcheck){
				let childrenIds = this.$store.state.organization.childrenIds;
				if(e){
					data.isChecked = true;
					childrenIds.push(data.id)
					const cids = this.digui(data.children,[],true)
					this.setUsersIds(data.users,true)
					childrenIds = childrenIds.concat(cids)
				}else{
					this.isAll = false
					data.isChecked = false;
					//当前组织下边的人员取消选中
					this.setUsersIds(data.users,false)
					//本次需要删除的组织
					const vvvv = [... this.digui(data.children,[],false),data.id];
					childrenIds = childrenIds.filter((v)=>{
						return vvvv.indexOf(v)==-1 
					})
				}
				//如果是全选的话
				if(isallcheck){
					//党组织样式更改
					this.checkOrgAndPer(e)
				}
				this.isSelectAll()
				this.$emit('changeChildrenIds',childrenIds)
			},
			isSelectAll(){
				let isAll = true
				for (var i = 0; i < this.data.children.length; i++) {
					if(!this.data.children[i].isChecked){
						isAll = false
						break;
					}
				}
				for (var i = 0; i < this.data.users.length; i++) {
					if(!this.data.users[i].isChecked){
						isAll = false
						break;
					}
				}
				
				if(isAll){
					//把this.data.id加到vuex
					childrenIds.push(this.data.id)
					this.$emit('changeChildrenIds',childrenIds)
				}else{
					//把this.data.id移除vuex
				}
				this.isAll = isAll
			},
			//选中组织和人
			checkOrgAndPer(e){
				this.data.children=this.data.children.map((v)=>{
					return {
						...v,
						isChecked:e
					}
				})
				//人员样式更改
				this.data.users=this.data.users.map((v)=>{
					return {
						...v,
						isChecked:e
					}
				})
			},
			changeUsers(e,data){
				this.setUsersIds([data],e)
			},
			setUsersIds(users,e){
				if(users.length==0) return;
				const list = users.map(item=>item.id)
				let checkedUsers = this.$store.state.organization.usersIds;
				if(e){
					checkedUsers = checkedUsers.concat(list)
				}else{
					this.isAll = false
					list.forEach(item=>{
						const delIndex = checkedUsers.findIndex(item2=>item2 == item)
						checkedUsers.splice(delIndex,1)
					})
				}
				this.$emit('changeUsersIds',checkedUsers)
			},
			//全选逻辑
			changeAll(e){
				this.changeChildren(e,this.data,true)
			},
			removeGroup(id){
				const delIndex = this.data.children.find(item=>item.id == id)
				this.data.children.splice(delIndex,1)
			},
			removeusers(id){
				const delIndex = this.data.users.find(item=>item.id == id)
				this.data.users.splice(delIndex,1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.allCheck {
		display: flex;
		height: 50rpx;
		background-color: #fff;
		border-bottom: 13rpx solid #f6f6f6;
		border-top: 13rpx solid #f6f6f6;
	}

	.scroll {
		position: absolute;
		left: 0;
		right: 0;
		top: 110rpx;
		padding-bottom: 100px;
	}
	.clear-scroll-top {
		top: 0;
		padding-bottom: 20px;
	}

	.org-list{
		background-color: #fff;
		border-bottom: 15rpx solid #f6f6f6;
		padding-bottom: 0!important;
		.list-item {
			display: flex;
			margin-top: 25rpx;
			.left-block {
				flex: 1;
				display: flex;
				padding-bottom: 26rpx;
				border-bottom: 1rpx solid #E4E4E4;
				.title{
					max-width: 50%;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					margin-right: 10rpx;
				}
				.number{
					font-size: 27rpx;
					line-height: 40rpx;
				}
			}
			.rightOper {
				padding-left: 20rpx;
				border-left: 1rpx solid #E4E4E4;
			}
		}
		
		.list-item:last-child .left-block{
			border-bottom:0;
		}
	}
	.users{
		.info {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-bottom: 4rpx;
			padding: 20upx;
			color: #444444;
			font-size:30rpx;
			background: #fff;
		
			.post {
				font-size:28rpx;
				color: #666666;
			}
		}
		.pitem {
			flex: 1;
			height:80upx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-left: 20rpx;
		}
	}

</style>
