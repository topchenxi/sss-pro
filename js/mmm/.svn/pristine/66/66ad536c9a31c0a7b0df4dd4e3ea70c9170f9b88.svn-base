/*
  author  yonghuang/buyfollow/OrderProcess/getMoneyDetail.do
 */
import '../../common/base.js'
import { getCache, getLastPage } from '../../common/utils'
import OrderApi from '../../api/order'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.orderDetail = getCache({
      key: 'orderDetail',
      type: 'sessionStorage',
      dataType: 'json'
    })
    // this.orderNumber = getParam('orderNumber')
    this.status = this.orderDetail.obj.status //
    this.orderNumber = this.orderDetail.obj.orderNumber
    // this.productSource = this.orderDetail.obj.productSource
    // 现货状态下 >303 --316(未支付货款) 316（普通大货订单） 或者 416(流水订单) 之后都已经支付货款
    // 订货状态下 > 312 之后 显示为订金  >339 之后显示为尾款 (3 10 100)
    this.productSource = this.orderDetail.obj.productSource // 0 表示现货 1 表示订货
    this.getMoneyDetail()
  }
  getMoneyDetail() {
    const that = this
    $.showPreloader()
    request({
      url: OrderApi.getMoneyDetail,
	  mdthod: 'get',
      data: {
         id: that.id, _time: that._time 
      },
      callback(data) {
        $.hidePreloader()
        if (data.success == 1) {
          for (var i in data.obj) {
            if (i == 'lstReturnReplace') {
              let lstReturnReplace = data.obj.lstReturnReplace
              for (var j in lstReturnReplace) {
                for(var h in lstReturnReplace[j]) {
                  if (h != 'number') {
                    lstReturnReplace[j][h] = parseFloat(lstReturnReplace[j][h], 10).toFixed(2)
                  }
                }
              }
            } else {
              data.obj[i] = parseFloat(data.obj[i], 10).toFixed(2)
            }
          }
          data.obj.productSource = that.productSource
          that.renderList(data.obj)
        } else {
          $.alert(data.msg)
        }
      }
    })
  }
  renderList(renderData) {
    console.log(renderData)
    const moneyDetailtpl = 'moneyDetailList/index.html'
    nunjucks.render(moneyDetailtpl, renderData).then((moneyDetailHtml) => {
      $('.J_moneyDetailList').html(moneyDetailHtml)
      this.bindEvent()
    })
  }
  bindEvent() {
    const backBtn = $('.J_back')
    const lastPage = getLastPage();
    backBtn.on('click', () => {
      if (lastPage) {
        location.href = lastPage
        return false
      } else {
        history.go(-1)
        return false
      }
    })
  }
  // formatCurrency(number) {
  //   let val = Number(number)
  //   let backVal = parseFloat(val, 10).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  //   if (String(backVal) == '-0.00') {
  //     backVal = '0.00'
  //   }
  //   return backVal
  // }
  // UnformatCurrency(number) {
  //   const str = number.split(',')
  //   let realVal = ''
  //   str.map((key) => {
  //     realVal = realVal + key
  //   })
  //   return Number(realVal)
  // }
}
export default new Page()
