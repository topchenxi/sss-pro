/**
 * base file
 */
var Promise = require('es6-promise').Promise
window.Promise = Promise
import '../vendor/zepto'
import '../vendor/nunjucks'
import '../vendor/sm'
import '../vendor/sm-extend'
import '../vendor/sm-city-picker'
import {
  request,
  isiPhoneApp,
  isAndroidApp,
  isWeexApp,
  checkLogin
} from './utils'

/**
 * @class  base
 * @author 家优 x
 */
class Base {
  constructor() {
    window.request = request

    // if (!isiPhoneApp && !isAndroidApp) {
    //   if (location.host == 'hongshan.soouya.com' && location.href.indexOf('print') < 0 && location.href.indexOf('login') < 0) {
    //     $.alert('请在APP打开')
    //     $('.page-group').html('')
    //   }
    // }
    const reportDetailPage = location.href.indexOf('reportDetai') == -1 ? false : true // 验布报告详情页不需要登录
    if (!isiPhoneApp && !isAndroidApp && location.href.indexOf('login.html') === -1 && !reportDetailPage) {
      // $.showPreloader()
      checkLogin({
        lastPage: location.href
      }, () => {
        // $.hidePreloader()
      })
    }

    if (isWeexApp) {
      $('header').hide()
      $('.page-current').css('margin-top', '-1.7rem')
    }
    const env = nunjucks.configure('/templates', {
      tags: {
        blockStart: '<%',
        blockEnd: '%>',
        variableStart: '<$',
        variableEnd: '$>',
        commentStart: '<#',
        commentEnd: '#>'
      }
    })
    // 增加一些 自定义的filter 类
    env.addFilter('placeholder', (val, descr) => val || descr)
    $.config = {
      // 路由功能开关过滤器，返回 false 表示当前点击链接不使用路由
      routerFilter: ($link) => {
        // 某个区域的 a 链接不想使用路由功能
        if ($link.is('.disable-router a')) {
          return false
        }
        return true
      }
    }
    $.init()
  }
}
export default new Base()
