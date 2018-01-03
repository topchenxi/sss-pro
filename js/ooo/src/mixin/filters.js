import formatTime from '@/utils/formatTime'

export default {
  filters: {
    formatNumber(val) {
      return (val !== null && Number(val) >= 0) ? Number(val).toFixed(2) : '--'
    },
    formatMoney(val) {
      let result = '--'
      if (val !== null) {
        result = Number(val).toFixed(2) || 0.00 + '元'
      }
      return result
    },
    formatTime(val) {
      return val === null || val === 0 ? '--' : formatTime(val)
    },
    formatDate(val) {
      if (val === undefined || val === null || Number(val) <= 0) {
        return '--'
      }
      return formatTime(val).substring(0, 10)
    }
  },
  methods: {
    formatHongshanUrl(url) {
      const host = window.location.host
      if (host.indexOf('test') > -1 || host.indexOf('hspc') > -1) {
        return 'http://testhongshan.soouya.com' + url;
      } else if (host.indexOf('local') > -1) {
        return 'http://localhongshan.soouya.com' + url;
      } else {
        return 'http://hongshan.soouya.com' + url;
      }
    },
    formatNumber(row, column) {
      let val = row[column.property]
      return (val !== null && Number(val) >= 0) ? Number(val).toFixed(2) : '--'
    },
    formatMoney(row, column) {
      let val = row[column.property]
      let result = '--'
      if (val !== null) {
        result = Number(val).toFixed(2) || 0.00 + '元'
      }
      return result
    },
    formatTime(row, column) {
      let val = row[column.property]
      return val === null || val === 0 ? '--' : formatTime(val)
    },
    formatDate(row, column) {
      let val = row[column.property]
      if (val === undefined || val === null) {
        return ''
      }
      return formatTime(val).substring(0, 10)
    }
  }
}
