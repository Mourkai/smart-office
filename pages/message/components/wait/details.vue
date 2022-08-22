<template>
	<view>
		<component :is="name" :id="id" :watchUpdateUtilStr="watchUpdateUtilStr" :process="process"></component>
	</view>
</template>
<script>
	//非项目用印申请 administration/nonProjectSeal/{id}
	import administration_non_project_seal from './details/administration_non_project_seal.vue'
	//项目用印申请 administration/projectSeal/{id}
	import administration_project_seal from './details/administration_project_seal.vue'
	//投标保证金申请 /fee/bidBail/{id}
	import fee_bid_security from './details/fee_bid_security.vue'
	//中标服务费申请 
	import fee_bid_winning_service_fee from './details/fee_bid_winning_service_fee.vue'
	//物资采购申请 fee/projectMaterial/{id}
	import fee_material_purchase_req from './details/fee_material_purchase_req.vue'
	//非项目报销申请 fee/nonProjectReimbursement/process/detail/{id}
	import fee_non_project_reimbursement from './details/fee_non_project_reimbursement.vue'
	//项目付款申请 fee/projectPay/{id}
	import fee_project_pay from './details/fee_project_pay.vue'
	//项目报销申请 fee/projectReimbursement/{id}
	import fee_project_reim from './details/fee_project_reim.vue'
	//项目备用金申请 fee/projectImprest/{id}	
	import fee_project_reserve_fund from './details/fee_project_reserve_fund.vue'
	//员工转正申请 hr/
	import hr_become_staff from './details/hr_become_staff.vue'
	//转正申请
	import hr_become from './details/hr_become.vue'
	//出差申请
	import hr_business_travel from './details/hr_business_travel.vue'
	//入职申请 hr/induction/add            没调
	import hr_induction from './details/hr_induction.vue'
	//员工离职申请
	import hr_quit_staff from './details/hr_quit_staff.vue'
	//离职申请
	import hr_quit from './details/hr_quit.vue'
	//薪资调整申请    1
	import hr_salary_adju from './details/hr_salary_adju.vue'
	//调动申请hr/transfer/tranAndTurnByid/{id}   没调   1
	import hr_transfer from './details/hr_transfer.vue'
	//加班申请 hr/userWorkOver/{id}            没调  1
	import hr_work_overtime from './details/hr_work_overtime'
	//验收申请 /project/projectInfo/getAcceptanceInfo/{id}  1
	import projce_check from './details/projce_check.vue'
	//投标申请 /project/biddingInfo/{id}  1
	import project_bid from './details/project_bid.vue'
	//预算编制申请 project/projectBudget/{id}  没调   1
	import project_budgeting from './details/project_budgeting'
	//变更申请project/projectModify/{id} 每调
	import project_change from './details/project_change.vue'
	//结项申请project /projectClose/{id}
	import project_close from './details/project_close.vue'
	//收款申请project /getSignContractDetail/{id}
	import project_coll from './details/project_coll.vue'
	//付款合同付款申请  project/contractPaymentInfo{id}
	import project_cont_sign_pay_pay from './details/project_cont_sign_pay_pay.vue'
	//付款合同签署申请
	import project_contract_sign_pay from './details/project_contract_sign_pay.vue'
	//合同签署申请
	import project_contract_sign from './details/project_contract_sign.vue'
	//客户申请
	import project_customer from './details/project_customer.vue'
	//*日报申请 project/getDaily/{id}
	//import project_daily from './details/project_daily.vue'
	import project_daily_record from './details/project_daily.vue'
	//正式申请 project/formalProject/{id}
	import project_formal from './details/project_formal.vue'
	//框架投标申请project/biddingInfo/{id}
	import project_frame_bid from './details/project_frame_bid.vue'
	//工时申请project/workingHourRecord/{id}
	import project_hours from './details/project_hours.vue'
	//增员申请
	import project_in_staff from './details/project_in_staff.vue'
	//开票申请project/invoiceRequisition/{id}
	import project_invoicing from './details/project_invoicing.vue'
	//商机申请 project/businessOpportunity/{id}
	import project_opportunity from './details/project_opportunity.vue'
	//减员申请
	import project_out_staff from './details/project_out_staff.vue'
	//售前申请 project /presalesProject/{id}
	import project_pre_sales from './details/project_pre_sales.vue'
	//售前转正式申请
	import project_pre_to_formal from './details/project_pre_to_formal.vue'
	//供应商申请
	import project_supplier from './details/project_supplier.vue'
	//周报申请project /weekReport/{id}
	import project_weekly from './details/project_weekly.vue'
	//中标申请project /noticeAward/{id}
	import project_winning_bid from './details/project_winning_bid.vue'
	//电脑租赁申请 computer_rental
	import computer_rental from './details/computer_rental.vue'
	//行政采购申请  purchase
	import purchase from './details/purchase.vue'
	//差旅报销申请  fee_project_travel
	import fee_project_travel from './details/fee_project_travel.vue'
	//费用报销申请  fee_project_cost
	import fee_project_cost from './details/fee_project_cost.vue'
	//付款申请  fee_pay
	import fee_pay from './details/fee_pay.vue'
	//内部项目  project_inner
	import project_inner from './details/project_inner.vue'
	//预算编制申请 
	import project_budgeting_add from './details/project_budgeting_add.vue'
	//风险
	import project_riskregister from './details/project_riskregister.vue'
	//绩效申诉
	import performance_evaluation_appeal from './details/performance_evaluation_appeal.vue'
	
	export default {
		data() {
			return {
				data: {}
			};
		},
		props: {
			name: {
				type: String,
				default: "projce_check"
			},
			id:{
				type:String,
				default:""
			},
			process:{
				type:Array,
				default:[]
			},
			watchUpdateUtilStr:{
				type:Number,
				default:0
			}
		},
		components:{
			administration_non_project_seal,
			administration_project_seal,
			fee_bid_security,
			fee_bid_winning_service_fee,
			fee_material_purchase_req,
			fee_non_project_reimbursement,
			fee_project_pay,
			fee_project_reim,
			fee_project_reserve_fund,
			hr_become_staff,
			hr_become,
			hr_business_travel,
			hr_induction,
			hr_quit_staff,
			hr_quit,
			hr_salary_adju,
			hr_transfer,
			hr_work_overtime,
			projce_check,
			project_bid,
			project_budgeting,
			project_change,
			project_close,
			project_coll,
			project_cont_sign_pay_pay,
			project_contract_sign_pay,
			project_contract_sign,
			project_customer,
			project_daily_record,
			project_formal,
			project_frame_bid,
			project_hours,
			project_in_staff,
			project_invoicing,
			project_opportunity,
			project_out_staff,
			project_pre_sales,
			project_pre_to_formal,
			project_supplier,
			project_weekly,
			project_winning_bid,
			computer_rental,
			purchase,
			fee_project_travel,
			fee_project_cost,
			fee_pay,
			project_inner,
			project_budgeting_add,
			project_riskregister,
			performance_evaluation_appeal
		}
	}
</script>

