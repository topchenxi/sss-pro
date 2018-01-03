import {
  formatTimeString,
} from 'common/utils'
import { Message } from 'element-ui';

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
  },
  filters: {
    formateNumber(val) {
      return (val === null || val < 0) ? '--' : Number(val).toFixed(2)
    },
    formatTime(val) {
      return (val === null || val <= 0) ? '--' : formatTimeString(val)
    },
    formatMoney(val) {
      return (val === null || val === -1) ? '--' : Number(val).toFixed(2)
    },
    formatDate(val) {
      let date = '--'
      if (val !== null) {
        let y = new Date(val).getFullYear()
        let m = new Date(val).getMonth() + 1
        let d = new Date(val).getDate()
        date = y + '-' + m + '-' + d
      }
      return date
    },
  },
  methods: {
    formatTime(row, column) {
      let val = row[column.property]
      return val === null ? '--' : formatTimeString(val)
    },
    formatDate(row, column) {
      let val = row[column.property]
      let date = '--'
      if (val !== null) {
        let y = new Date(val).getFullYear()
        let m = new Date(val).getMonth() + 1
        let d = new Date(val).getDate()
        date = y + '-' + m + '-' + d
      }
      return date
    },
    formatMoney(row, column) {
      let val = row[column.property]
      return val === null ? '--' : (parseFloat(val).toFixed(2) + '元')
    },
    formatNumber(row, column) {
      let val = row[column.property]
      return val === null ? '--' : (Number(val).toFixed(2))
    },
    formatReimburseStatus(row, column) {
      let val = row[column.property]
      return val == 1 ? '待报销' : '已报销'
    },
    formatReimburseFukuanType(row, column) {
      let val = row[column.property]
      return val == 1 ? '现金报销' : '线上转账'
    },
    requestIsSuccess(data, errorCallBack) {
      if (data.success !== '1') {
        this.handleRequestError(data, errorCallBack);
      }
      return data.success === '1';
    },
    handleRequestError(data, errorCallBack) {
      if (errorCallBack) {
        errorCallBack();
      } else {
        Message({
          type: 'error',
          message: data.msg,
          duration: 1000,
        });
      }
      return this;
    },
    formatParamsTime(param, timeBeginKey = 'timeBegin', timeEndKey = 'timeEnd') {
      let params = Object.assign({}, param)
      const hasTime = Array.isArray(params.time) && params.time.length === 2
      params[timeBeginKey] = hasTime ? +new Date(params.time[0]) : ''
      params[timeEndKey] = hasTime ? +new Date(params.time[1]) + 1000 * 60 * 60 * 24 : ''
      delete params.time
      return params
    }
  }
}
export default Mixin
