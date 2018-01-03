/*
  author  yonghuang/buyfollow/OrderProcess/getMoneyDetail.do
 */
import '../../common/base.js'
import { getCache, getLastPage, getParam, setCache } from '../../common/utils'
import OrderApi from '../../api/order'
export default class moneyDetail {
  constructor(parent) {
    let that = this
    this._time = new Date().getTime()
    this.orderNumber = getParam('orderNumber')
    this.id = getParam('payDebtId')
    this.$page = parent
    this.orderDetail = getCache({
      key: 'orderDetail',
      type: 'sessionStorage',
      dataType: 'json'
    })
    if (this.orderDetail && this.orderDetail.obj.orderNumber == this.orderNumber) {
      this.initData(this.orderDetail.obj)
    } else {
      $.showPreloader()
      request({
        url: OrderApi.getDetail,
        data: {
          orderNumber: that.orderNumber,
          _time: that._time
        },
        callback(data) {
          if (data.success == 1) {
            setCache({
              key: 'orderDetail',
              value: data
            })
            that.initData(data.obj)
          } else {
            $.alert(data.msg)
          }
        }
      })
    }
  }
  initData(orderDetail) {
    // this.orderNumber = getParam('orderNumber')
    this.status = orderDetail.status //
    this.orderNumber = orderDetail.orderNumber
    this.productSource =  orderDetail.productSource
    // 现货状态下 >303 --316(未支付货款) 316（普通大货订单） 或者 416(流水订单) 之后都已经支付货款
    // 订货状态下 > 312 之后 显示为订金  >339 之后显示为尾款 (3 10 100)
    this.productSource = orderDetail.productSource // 0 表示现货 1 表示订货
    this.getMoneyDetail()
  }
  getMoneyDetail() {
    const that = this
    $.showPreloader()
    request({
      url: OrderApi.getMoneyDetail,
	  method: 'get',
      data: {
         id: that.id, _time: that._time 
      },
      callback(data) {
        $.hidePreloader()
        if (data.success == 1) {
          // for (var i in data.obj) {
            // data.obj[i] = parseFloat(data.obj[i], 10).toFixed(2)
          //   if (i == 'lstReturnReplace') {
          //     let lstReturnReplace = data.obj.lstReturnReplace
          //     for (var j in lstReturnReplace) {
          //       for(var h in lstReturnReplace[j]) {
          //         if (h != 'number') {
          //           lstReturnReplace[j][h] = parseFloat(lstReturnReplace[j][h], 10).toFixed(2)
          //         }
          //       }
          //     }
          //   }
          // }
          // data.obj.productSource = that.productSource
          // that.renderList(data.obj)
          // const res = {
          //   'obj': {
          //     'availableYet': 1,
          //     'creditLineYet': 1,
          //     'debtMoney': 1
          //   },
          //   'success': '1',
          //   'msg': '操作成功'
          // }
          that.renderList(data.obj)
        } else {
          $.alert(data.msg)
        }
      }
    })
  }
  renderList(renderData) {
    console.log(renderData)
    const moneyDetailtpl = 'uploadBill/moneyDetail.html'
    nunjucks.render(moneyDetailtpl, renderData).then((moneyDetailHtml) => {
      $('.J_bill_text', this.$page).html(moneyDetailHtml)
    })
  }
}
