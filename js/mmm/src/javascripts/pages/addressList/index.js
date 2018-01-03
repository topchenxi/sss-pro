/*
  author  yonghuang
 */
import '../../common/base.js'
import { getCache, setCache, getParam } from '../../common/utils.js'
import addrApi from '../../api/address.js'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.orderDetail = getCache({
      key: 'orderDetail',
      type: 'sessionStorage',
      dataType: 'json'
    })
    this.sourcePage = getCache({
      key: 'sourcePage',
      type: 'sessionStorage',
      dataType: 'json'
    })
    this.source = getParam('source')
    this.render()
  }
  getList() {
    const reqOption = {
      userId: this.buyerInfo.id || this.orderDetail.obj.buyer.id,
      _time: this._time
    }
    $.showPreloader();
    request({
      url: addrApi.list,
      data: JSON.stringify(reqOption),
      contentType: 'application/json',
      method: 'POST',
      cache: false,
      callback: (data) => {
        if (data.success === '1') {
          setTimeout(() => {
            $.hidePreloader();
          }, 500);
          setCache({
            key: 'addressInfo',
            type: 'sessionStorage',
            dataType: 'json',
            value: data
          })
          this.addressInfo = data
          this.renderList(data)
        } else {
          $.toast(data.msg)
        }
      }
    })
  }
  render() {
    const that = this
    const tpl = 'addressList/index.html'
    this.buyerInfo = getCache({
      key: 'buyerInfo',
      type: 'sessionStorage',
      dataType: 'json'
    })
    this.data = {
      title: '收货人'
    }
    if (this.sourcePage) { // 找版和剪版过来
      this.backLink = this.sourcePage
    } else if (this.source) { // 大货
      this.backLink = `/${this.source}.html`
    } else { // 大货
      this.backLink = this.buyerInfo ? '/sendWays.html' : '/sendWays.html?source=orderDetail'
    }
    nunjucks.render(tpl, this.data).then((addressListHtml) => {
      that.$page = $('#addressList')
      that.$page.html(addressListHtml)
      this.addressInfo = getCache({
        key: 'addressInfo',
        type: 'sessionStorage',
        dataType: 'json'
      })
      if (this.addressInfo) {
        this.renderList(this.addressInfo)
      } else {
        this.getList()
      }
    })
  }
  renderList(data) {
    const addrTpl = 'addressList/address.html'
    const paramAddrId = getParam('id')
    if (paramAddrId && this.addressInfo) {
      this.addressInfo.selectId = paramAddrId
    }
    nunjucks.render(addrTpl, data).then((addressListHtml) => {
      $('.J_address_block').html(addressListHtml)
      this.bindEvents()
    })
  }
  bindEvents() {
    const $addrList = $('.J_address_list')
    const backBtn = $('.J_back')
    backBtn.on('click', () => {
      sessionStorage.removeItem('sourcePage')
      location.href = this.backLink
      return false
    })
    $addrList.unbind('click').on('click', (e) => {
      const addrId = $(e.currentTarget).find('input[name="address"]').val()
      for (let i = 0; i < this.addressInfo.result.length; i++) {
        if (this.addressInfo.result[i].id === Number(addrId)) {
          setCache({
            key: 'defaultAddr',
            type: 'sessionStorage',
            dataType: 'json',
            value: this.addressInfo.result[i]
          })
        }
      }
      if (this.sourcePage) {
        sessionStorage.removeItem('sourcePage')
        location.href = this.backLink
      } else if (this.source) {
        history.go(-1)
      } else {
        location.href = this.backLink
      }
      return false
    })
  }
}
export default new Page()
