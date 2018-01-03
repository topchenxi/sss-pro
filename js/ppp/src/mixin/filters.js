import formatTime from '@/utils/formatTime'

export default {
  filters: {
    formateNumber(val) {
      return Number(val).toFixed(2) || '0.00'
    },
    formatNumber(val) {
      return Number(val).toFixed(2) || '0.00'
    },
    formatMoney(val) {
      let result = '--'
      if (val !== null) {
        result = Number(val).toFixed(2) || 0.00 + '元'
      }
      return result
    },
    formatTime(val) {
      return (val === null || val <= 0) ? '--' : formatTime(val)
    },
    formatDate(val) {
      if (val === undefined || val === null) {
        return ''
      }
      return formatTime(val).substring(0, 10)
    }
  }
}
