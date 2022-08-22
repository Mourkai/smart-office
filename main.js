import Vue from 'vue'
import App from './App'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
import store, {
	setupStore
} from './store'
import {
	myRequest
} from './util/api.js'
Vue.prototype.$myRuquest = myRequest
Vue.prototype.$store = store
Vue.prototype.$EventBus = new Vue()
Vue.filter('formatDate', (date) => {
	const nDate = new Date(date)
	const year = nDate.getFullYear()
	const month = nDate.getMonth().toString().padStart(2, 0)
	const day = nDate.getDay().toString().padStart(2, 0)
	return year + '-' + month + '-' + day
})


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
setupStore()
export default app