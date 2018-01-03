/**
 * financial
 */
// type 1 采购商付款给soouya的凭证 2 soouya付款给供货商的凭证 ,

const AccountApi = {
  confirmPayAndInputCertificate: '/redwood/account/PayConfirm/confirmPayAndInputCertificate.do', // 确认付款并上传付款凭据调用页面
  list: '/redwood/account/Certificate/list.do', // 获取收(付)款凭据列表
  confirmIncome: '/redwood/account/PayConfirm/confirmIncome.do', // 确认收到款
  confirmDebtPay: '/redwood/account/PayConfirm/confirmDebtPay.do', // 确认收到欠款
  sendbackDebt: '/redwood/account/PayConfirm/sendbackDebt.do', // 财务异常处理欠款
  sendbackDebt: '/redwood/account/PayConfirm/sendbackDebt.do', // 财务异常处理欠款
	financeAccountList: '/redwood/account/FinanceAccount/list.do' // 财务收款方式列表
}

export default AccountApi
