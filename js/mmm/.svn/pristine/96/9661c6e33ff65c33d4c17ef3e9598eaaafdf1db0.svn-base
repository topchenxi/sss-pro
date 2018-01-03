/*
  author  yonghuang
 */
// import { request } from '../../common/base'
import '../../common/base.js'
import { getCache, formatTimeString } from '../../common/utils'
import orderApi from '../../api/order.js'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.getList()
  }
  getList() {
    this.orderDetail = getCache({
      key: 'orderDetail',
      type: 'sessionStorage',
      dataType: 'json',
    })
    $.showPreloader();
    request({
      url: orderApi.getTaskList,
      data: {
        orderNumber: this.orderDetail.obj.orderNumber,
        _time: this._time,
      },
      cache: false,
      callback: (data) => {
        if (data.success === '1') {
          setTimeout(() => {
            $.hidePreloader();
          }, 500);
          this.listRender(data.result)
        } else {
          $.toast(data.msg)
        }
      },
    })
  }
  listRender(listData) {
    const listTpl = 'statusList/index.html'
    if (listData) {
      listData.forEach((value) => {
        value.createTimeString = formatTimeString(value.createTime)
      })
    }
    const paramArr = location.search ? (location.search).replace('?', '').split('&') : [] // 从订单页面到编辑的时候才有
    this.paramObj = {}
    paramArr.map((item) => {
      this.paramObj[item.split('=')[0]] = item.split('=')[1]
    })
    if (this.paramObj.payWay == 0 || this.paramObj.payWay == 1 ) {
      this.skipUrl = `/${this.paramObj.source}.html?orderNumber=${this.orderDetail.obj.orderNumber}&payWay=${this.paramObj.payWay}`
    } else if (this.paramObj.urgeMoney == 0 || this.paramObj.urgeMoney == 1) {
      this.skipUrl = `/${this.paramObj.source}.html?orderNumber=${this.orderDetail.obj.orderNumber}&urgeMoney=${this.paramObj.urgeMoney}`
    } else {
      // this.skipUrl = `/orderDetail.html?orderNumber=${this.orderDetail.obj.orderNumber}`
      this.skipUrl = ''
    }
    const rendData = {
      listData,
      title: '历史任务列表',
    }
    nunjucks.render(listTpl, rendData).then((listHtml) => {
      const $listContDom = $('.J_content')
      $listContDom.append(listHtml)
      this.listEventBind();
    }) 
  }
  listEventBind() {
    const backBtn = $('.J_back')
    backBtn.on('click', () => {
      if (this.skipUrl) {
        location.href = this.skipUrl
      } else {
        history.go(-1)
      }
      return false
    })
  }
}
export default new Page()
