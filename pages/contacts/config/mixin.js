import localCache from '@/util/cache.js'
import {
	getAppUserList
} from '@/api/system.js'
export const mixin = {
	data() {
		return {
			data: [],
			tmp:[],
			keyWord:'',
			pageNum: 0,
			defaultIds: [],
			pageSize: 100,
			orgName: '',
			isOver:true,
			isBottom:false,
			total:0,
			color: ['#3c9cff', '#3c9cff', '#3c9cff', '#3c9cff'],
			to: '',
		}
	},
	mounted() {
		const userInfo = localCache.getCache('userInfo')
		this.orgName = `${userInfo.orgParentName} > ${userInfo.orgName}`
		this.loadData(this.pageNum)
	},
	activated() {
		const userInfo = localCache.getCache('userInfo')
		this.orgName = `${userInfo.orgParentName} > ${userInfo.orgName}`
	},
	onNavigationBarSearchInputChanged(e){
		this.keyWord = e.text;
		this.search()
	},
	methods: {
		async search(e){
			if(!this.keyWord){
				this.tmp = this.data
			}else{
				const {data} = await getAppUserList({
					pageNum: 1,
					pageSize: 999,//都筛选出来
					name:this.keyWord
				})
				const tmp=[];
				if(data.total == 0){
					this.isOver = true
				}else{
					this.isOver = false
					data.rows && data.rows.map(item => {
						if(item.name){
							//item.color = this.color[Math.floor(Math.random() * this.color.length)]
							if (this.defaultIds.indexOf(item.id) != -1) {
								item.isChecked = true;
								this.choose.push(item.id)
							}
							if(this.chooseItem){
								const had = this.chooseItem.findIndex(item2=>item2.id==item.id)
								if(had !== -1){
									item.isChecked = true
								}
							}
							tmp.push(item)
						}
					})
				}
				this.tmp = tmp
			}
		},
		async loadData(callback) {
			uni.showLoading({
				title: '加载中'
			});
			let data = []
			//contactsFull 是否缓存完通讯录人员
			//const contactsFull = localCache.getCache('contactsFull')
			//const cacheContacts = localCache.getCache('contacts') || []
			//if (contactsFull && contactsFull == 1) {
			if (false) {
				data = cacheContacts.slice(this.pageNum, this.pageSize)
				this.pageNum += 100
				this.pageSize += 100
				this.isOver = false
				this.total = cacheContacts.length
			} else {
				const result = await getAppUserList({
					pageNum: ++this.pageNum,
					pageSize:30
				})
				const total = result.data.total
				if(total){
					this.isOver = false
					this.total = total
				}
				// if (cacheContacts && cacheContacts.length >= total) {
				// 	localCache.setCache('contactsFull', 1)
				// } else {
				// 	localCache.setCache('contactsFull', 0)
				// 	result.data.rows.map(item => {
				// 		cacheContacts.push(item)
				// 	})
				// 	localCache.setCache('contacts', cacheContacts)
				// }
				data = result.data.rows
			}
			if(data.length == 0){
				this.isBottom = true
			}
			data.forEach(item => {
				if(!item.name){
					item.name = "暂无"
				}
				item.isChecked = false
				item.color = this.color[Math.floor(Math.random() * this.color.length)]
				if (this.defaultIds.indexOf(item.id) != -1) {
					item.isChecked = true
					this.choose.push(item.id)
				}
				this.data.push(item)
			})
			this.tmp = this.data
			callback && callback()
			uni.hideLoading()
		},
		reachBottom() {
			if(!this.keyWord){
				this.loadData()
			}
		},
		pullDownRefresh() {
			//localCache.setCache('contacts', [])
			//localCache.setCache('contactsFull', 0)
			this.data = []
			this.pageNum = 0
			this.pageSize =30
			this.keyWord = ''
			this.loadData(() => {
				uni.stopPullDownRefresh()
			})
		}
	}
}
