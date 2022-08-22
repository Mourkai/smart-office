export default {
	state: {
		currentOrg:{},
		usersIds:[],
		childrenIds:[],
	},
	mutations: {
		changeOrg(state, org) {
			state.currentOrg = org
		},
		changeUsersIds(state, usersIds) {
			state.usersIds = usersIds
		},
		changeChildrenIds(state, childrenIds) {
			state.childrenIds = childrenIds
		}
	},
	getters: {

	},
	actions: {

	}
}
