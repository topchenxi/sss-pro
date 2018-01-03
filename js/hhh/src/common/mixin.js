import {
  formatTimeString,
  dateFormat
} from 'common/utils'
import { Message } from 'element-ui';
import Page from 'components/page';
const Mixin = {
  // beforeRouteEnter: (to, from, next) => {
  //   if (to.meta.index !== from.meta.index) {
  //     sessionStorage.removeItem('checkAccountFilters')
  //     sessionStorage.removeItem('pendingAccountFilters')
  //     sessionStorage.removeItem('reconciliationFilters')
  //     sessionStorage.removeItem('payTransactionListFilters')
  //     sessionStorage.removeItem('splitAccountFilters')
  //     sessionStorage.removeItem('refundeFilters')
  //     sessionStorage.removeItem('recordsFilters')
  //     sessionStorage.removeItem('refundmentFilters')
  //   }
  //   next()
  // },
  data() {
    return {
      windowHeight: document.body.clientHeight
    }
  },
  components: {
    Page
  },
  filters: {
    formateNumber(val) {
      return Number(val).toFixed(2)
    },
    formatTime(val) {
      return (val === null || val <= 0) ? '--' : formatTimeString(val)
    },
    formatMoney(val) {
      return (val === null || val === -1) ? '--' : Number(val).toFixed(2)
    },
    formatCheckBu(val) {
      return val == null ? '--' : val
    },
    date(value, format = 'yyyy-MM-dd hh:mm:ss') {
      if (!value || value == -1) return '';
      return dateFormat(value, format);
    },
    creditTypeFilter(value) {
      switch ('' + value) {
        case '-2':
          return '老数据';
        case '-1':
          return '未支付';
        case '1':
          return '垫付支付';
        case '2':
          return '白条支付';
        case '3':
          return '余额';
        case '4':
          return '信贷支付';
        default:
          return '--';
      }
    }
  },
  methods: {
    formatCheckBu(row, column) {
      let val = row[column.property]
      return val == null ? '--' : val
    },
    formatTime(row, column) {
      let val = row[column.property]
      return val === null ? '--' : formatTimeString(val)
    },
    formatMoney(row, column) {
      let val = row[column.property]
      return val === null ? '--' : (parseFloat(val).toFixed(2) + '元')
    },
    formatReimburseStatus(row, column) {
      let val = row[column.property]
      return val == 1 ? '待报账' : '已报账'
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
    formatParamsTime(params) {
      const hasTime = Array.isArray(params.time) && params.time.length === 2
      params.timeBegin = hasTime ? +new Date(params.time[0]) : ''
      params.timeEnd = hasTime ? +new Date(params.time[1]) : ''
      delete params.time
      return params
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowHeight = document.body.clientHeight;
    })
  }
}
export default Mixin
