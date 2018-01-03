/*
  author  yonghuang
 */
import '../../common/base.js'
import { getCache } from '../../common/utils'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.render()
  }
  render() {
    const that = this
    const orderDetail = getCache({
      key: 'orderDetail',
      type: 'sessionStorage',
      dataType: 'json'
    })
    const loginInfo = getCache({
      key: 'currentUser',
      type: 'sessionStorage',
      dataType: 'json'
    }).loginInfo
    const productList = orderDetail.obj.productList
    const tpl = 'colorList/index.html'
    this.data = {
      title: '单价、颜色、购买量',
      productList,
      status: orderDetail.obj.status,
      loginInfo
    }
    this.backLink = `/orderDetail.html?orderNumber=${orderDetail.obj.orderNumber}`
    console.log(this.data)
    nunjucks.render(tpl, this.data).then((colorListHtml) => {
      that.$page = $('#colorList')
      that.$page.html(colorListHtml)
      this.bindEvents()
    })
  }
  bindEvents() {
    const backBtn = $('.J_back')
    backBtn.on('click', () => {
      location.href = this.backLink
      return false
    })
  }
}
export default new Page()
