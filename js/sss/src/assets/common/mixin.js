const Mixin = {
  beforeRouteEnter: (to, from, next) => {
    if (to.meta.index !== from.meta.index) {
      sessionStorage.removeItem('checkAccountFilters')
      sessionStorage.removeItem('pendingAccountFilters')
      sessionStorage.removeItem('reconciliationFilters')
      sessionStorage.removeItem('payTransactionListFilters')
      sessionStorage.removeItem('splitAccountFilters')
      sessionStorage.removeItem('refundeFilters')
      sessionStorage.removeItem('recordsFilters')
      sessionStorage.removeItem('refundmentFilters')
    }
    next()
  }
}
export default Mixin
