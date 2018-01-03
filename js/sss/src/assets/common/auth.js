import { Message } from 'element-ui'
import {
  request,
  getCache,
  setCache
} from 'src/common/utils.js'
import seedApi from 'src/api/seed.js'
import Cookies from 'js-cookie'
export default {
  loggedIn (resolve, reject) {
    const currentUser = getCache({ key: 'currentUser' })
    const that = this
    if (currentUser) {
      if (that.charge(currentUser)) {
        resolve(true)
      } else {
        reject(false)
      }
    } else if (Cookies.get('isAuthed')) {
      // 同域自动获取currentUser
      request({
        url: seedApi.getCurrentUser
      }).then(data => {
        if (data.success === '1') {
          setCache({
            key: 'currentUser',
            value: data
          })
          if (that.charge(data)) {
            resolve(true)
          } else {
            reject(false)
          }
        } else {
         reject(false)
        }
      })
    } else {
      reject(false)
    }
  },
  charge (currentUser) {
    if (currentUser.loginInfo) {
      const isAuthed = sessionStorage.getItem('isAuthed') || Cookies.get('isAuthed')
      //
      if (isAuthed || location.href.indexOf('localcaiwu.soouya.com') > -1 || location.href.indexOf('devcaiwu.soouya.com') > -1 || location.href.indexOf('testcaiwu.soouya.com') > -1) {
        return true
      } else {
        return true
      }
    } else {
      Message({
        message: '账户没有权限',
        type: 'error'
      })
      return false
    }
  }
}
