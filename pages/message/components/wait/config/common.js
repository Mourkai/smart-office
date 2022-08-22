const btnList = [{
	name: '批准',
	disabled: false,
	requestFunc: 'adoptById',
	textareaTitle: '意见'
}, {
	name: '拒绝',
	disabled: false,
	requestFunc: 'refuseById',
	textareaTitle: '意见'
}, {
	name: '加签',
	isSearch: true,
	disabled: false,
	requestFunc: 'countersignById',
	searchTitle: '加签对象',
	textareaTitle: '加签原因'
}, {
	name: '转发',
	isSearch: true,
	disabled: false,
	requestFunc: 'relayById',
	searchTitle: '转发对象',
	textareaTitle: '意见'
}, {
	name: '转办',
	isSearch: true,
	disabled: false,
	requestFunc: 'transferById',
	searchTitle: '转办对象',
	textareaTitle: '意见'
}, {
	name: '退回',
	disabled: false,
	requestFunc: 'sendBackById',
	textareaTitle: '退回原因'
}]
const sourceBtnList = JSON.parse(JSON.stringify(btnList))
const resetBtnList = () => {
	return sourceBtnList
}

export {
	resetBtnList,
	btnList
}
