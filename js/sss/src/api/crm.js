export default {
    customer: {
        listCustomer: '/crm/merchant/Customer/list.do',
        getDetails: '/crm/merchant/Customer/getById.do'
    },
    bankAccount: {
        getBankAccountList: '/crm/merchant/BankAccount/listByCustomerId.do'
    },
    customerAccount: {
        accountDetails: '/crm/merchant/CustomerAccount/getById.do'
    },
    transactionRecord: {
        list: '/crm/merchant/TransactionRecord/list.do'
    },
    omsTransactionDetail: {
        omsTransactionDetail: '/redwood/account/omsTransactionDetail'
    },
    bill: {
        list: '/crm/merchant/Bill/list.do',
        userDetails: '/crm/merchant/Bill/getById.do'
    }
}
