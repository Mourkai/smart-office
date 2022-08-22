import {
	count
} from '@/api/msg.js'
async function setCount(){
	let c = '';
	let {
		data
	} = await count()
	if (data && data > 0) {
		c = ` (${data})`
	}
	if (data > 0) {
		uni.setTabBarBadge({
			index: 0,
			text: data.toString()
		})
	} else {
		uni.removeTabBarBadge({
			index: 0
		})
	}
}
export {
	setCount
}
