<template>
	<view class="organization-list">
		<view class="scroll" :class="{'clear-scroll-top':!selected}">
			<view class="allCheck p20" v-if="selected">
				<u-checkbox-group @change="changeAll">
					<u-checkbox :checked="isAll" shape="circle" labelColor="#333" label="全选" />
				</u-checkbox-group>
			</view>
			<u-checkbox-group placement="column" v-model="checkedChildren">
				<view class="org-list p20" v-if="data.children.length">
					<view class="list-item" v-for="(item,index) in data.children">
						<view class="left-block">
							<u-checkbox shape="circle" v-if="selected" :name="item.id" @change="e=>changeChildren(e,item)" :checked="item.isChecked" />
							<view class="title" v-text="item.id+'----'+item.orgName"></view>
							<view class="number" v-text="` (${item.users.length}) `"></view>
						</view>
						<view class="right-block">
							<u-icon name="list-dot" color="#3196FA" v-if="selected" labelColor="#3196FA" @click="toChildren(item)" label="下级" size="25" />
							<u-button type="primary" size="small" v-else shape="circle" @click="removeGroup(item.id)" text="移除"></u-button>
						</view>
					</view>
				</view>
			</u-checkbox-group>
			<u-checkbox-group placement="column" v-model="checkedUsers">
				<view class="users">
					<view class="info" v-for="(item,index) in data.users">
						<view>
							<u-checkbox :name="item.id" v-if="selected" shape="circle" @change="e=>changeUsers(e,item)" />
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
				childrenIds: [],
				usersIds: [],
				checkedUsers: [],
				checkedChildren: [],
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
		watch:{
			checkedChildren(v){
				let arr = [...v]
				this.checkedUsers = [...this.checkedUsers]
				if(v){
					v.forEach(item=>{
						const da = this.data.children.find(item2=>item2.id==item)
						//获取组下所有id
						this.setUsersIds(da.users,true)
						if(da.children.length > 0){
							const downChildrenIds = this.digui(da.children,[])
							arr = arr.concat(downChildrenIds)
						}
					})
				}
				this.$emit('changeChildrenIds',arr)
			},
			checkedUsers(v){
				this.$emit('changeUsersIds',v)
			}
		},
		mounted() {
			const usersIds = this.$store.state.organization.usersIds;
			const childrenIds = this.$store.state.organization.childrenIds;
			this.usersIds = usersIds
			this.childrenIds = childrenIds
			this.checkedUsers = usersIds
			this.checkedChildren = childrenIds
			this.$emit('changeUsersIds',this.usersIds)
			this.$emit('changeChildrenIds',this.childrenIds)
			setTimeout(()=>{
				this.isSelectAll()
			},100)
		},
		methods: {
			toChildren(data){
				this.$emit('next',data)
			},
			digui(children,arr){
				for (let i = 0; i < children.length; i++) {
					  arr.push(children[i].id)
					  if(children[i].users.length > 0){
						  this.setUsersIds(children[i].users,true)
					  }
					  if(children[i].children.length > 0){
						 this.digui(children[i].children,arr)
					  }
				}
				return arr;
			},
			changeChildren(e,data){
				// this.setUsersIds(data.users,e)
				// data.children.forEach(item=>{
				// 	this.setUsersIds(item.users,e)
				// 	this.childrenIds.push(item.id)
				// 	if(item.children){
				// 		item.children.forEach(item2=>{
				// 			this.setUsersIds(item2.users,e)
				// 			this.childrenIds.push(item2.id)
				// 		})
				// 	}
				// })
				// this.$emit('changeChildrenIds',this.childrenIds)
				this.isSelectAll()
			},
			changeUsers(e,data){
				this.setUsersIds([data],e)
			},
			isSelectAll(){
				let isAll = true;
				if(this.data.children.length == 0 && this.data.users.length == 0){
					isAll=false
				}
				//判断是不是全选
				for (var i = 0; i < this.data.children.length; i++) {
					 if(!this.data.children[i].isChecked){
						 isAll=false
						 break;
					 }
				}
				for (var i = 0; i < this.data.users.length; i++) {
					 if(!this.data.users[i].isChecked){
						 isAll=false
						 break;
					 }
				}
				this.isAll = isAll
			},
			setUsersIds(users,e){
				if(users.length==0) return;
				const list = users.map(item=>item.id)
				let checkedUsers = this.$store.state.organization.usersIds;
				if(e){
					checkedUsers = checkedUsers.concat(list)
				}else{
					list.forEach(item=>{
						const delIndex = checkedUsers.findIndex(item2=>item2 == item)
						checkedUsers.splice(delIndex,1)
					})
				}
				this.$emit('changeUsersIds',checkedUsers)
				this.isSelectAll()
			},
			changeAll(e) {
				const children = this.data.children.map(item=>item.id)
				const users = this.data.users.map(item=>item.id)
				let allUsersIds = this.$store.state.organization.usersIds;
				let allChildrenIds = this.$store.state.organization.childrenIds;
				if(e.length > 0){ //全选
					this.checkedChildren = this.checkedChildren.concat(children)
					this.users = this.users.concat(users)
				}else{ //全不选
					users.forEach(item=>{
						const delIndex = allUsersIds.findIndex(item2=>item2 == item)
						allUsersIds.splice(delIndex,1)
					})
					children.forEach(item=>{
						const delIndex = allChildrenIds.findIndex(item2=>item2 == item)
						allChildrenIds.splice(delIndex,1)
					})
					this.$emit('changeUsersIds',allUsersIds)
					this.$emit('changeChildrenIds',allChildrenIds)
				}

				// this.isAll = e.length > 0
				// this.data.children = this.data.children.map((item,index) => {
				// 	item.isChecked = this.isAll
				// 	this.changeChildren(this.isAll,this.data.children[index])
				// 	return item
				// })
				// this.data.users = this.data.users.map(item => {
				// 	item.isChecked = this.isAll
				// 	this.changeUsers(this.isAll,item)
				// 	return item
				// })
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
