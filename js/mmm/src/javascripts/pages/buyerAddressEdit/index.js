/*
 *供应商编辑
 * author  yonghuang
*/

// import { request } from '../../common/base'
import '../../common/base.js'
import { getCache } from '../../common/utils.js'
import addrApi from '../../api/address.js'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.render()
  }
  render() {
    const that = this
    const tpl = 'buyerAddressEdit/index.html'
    const addressInfo = getCache({
      key: 'addressInfo',
      type: 'sessionStorage',
      dataType: 'json'
    })
    this.buyerInfo = getCache({
      key: 'buyerInfo',
      type: 'sessionStorage',
      dataType: 'json'
    })
    this.orderDetail = getCache({
      key: 'orderDetail',
      type: 'sessionStorage',
      dataType: 'json'
    })
    const id = (location.search).replace('?', '').split('=')[1]
    if (addressInfo) {
      for (let i = 0; i < addressInfo.result.length; i++) {
        if (addressInfo.result[i].id == id) {
          this.currentAddr = addressInfo.result[i]
        }
      }
    }
    this.data = {
      backLink: '/sendWays.html'
    }
    if (this.currentAddr) {
      if (!this.currentAddr.province) {
        this.currentAddr.province = '北京'
        this.currentAddr.area = '海定区'
      }
    } else {
      this.currentAddr = {
        province: '北京',
        city: '东城区'
      }
    }
    this.data.addrObj = this.currentAddr
    this.data.userId = this.buyerInfo.id || this.orderDetail.obj.buyer.id
    nunjucks.render(tpl, this.data).then((buyerAddressEditHtml) => {
      that.$page = $('#buyerAddressEdit')
      that.$page.html(buyerAddressEditHtml)
      this.bindEvents(this.data)
    })
  }
  bindEvents() {
    const saveBtn = $('.J_save')
    const addSelect = $('.J_addr_select')
    addSelect.cityPicker({
      toolbarTemplate: `<header class="bar bar-nav">
      <button class="button button-link pull-right close-picker">确定</button>
      <h1 class="title">选择收货地址</h1>
      </header>`,
      onClose: (data) => {
        if (data && data.cols) {
          const select = data.value
          $('input[name="province"]').val(select[0])
          $('input[name="city"]').val(select[1])
          $('input[name="area"]').val(select[2])
          this.doChecked(addSelect)
        }
      }
    })
    // 焦点以上校验
    const $name = $('input[name="name"]')
    const $tel = $('input[name="tel"]')
    const $addr = $('input[name="addr"]')
    const $sendCompany = $('input[name="sendCompany"]')
    const $sendTel = $('input[name="sendTel"]')
    $name.on('input', (e) => {
      this.doChecked(e)
    })
    $tel.on('input', (e) => {
      this.doChecked(e)
    })
    $addr.on('input', (e) => {
      this.doChecked(e)
    })
    $sendCompany.on('input', (e) => {
      this.doChecked(e)
      this.doChecked($addr)
    })
    $sendTel.on('input', () => {
      this.doChecked($sendCompany)
    })
    // 是否设置默认物流
    const haveSendCompany = $('.J_haveSendCompany')
    haveSendCompany.change((e) => {
      const that = $(e.currentTarget)
      const checked = that.prop('checked')
      if (checked) {
        that.parents('li').siblings().removeClass('fn-hide')
        $sendCompany.parents('li').addClass('J_need_item')
      } else {
        that.parents('li').siblings().addClass('fn-hide')
        $sendCompany.parents('li').removeClass('J_need_item')
      }
      this.doChecked($addr)
    })
    // 保存
    saveBtn.on('click', (e) => {
      const that = $(e.currentTarget)
      if (that.hasClass('disabled')) return
      const formArray = $('form').serializeArray()
      const formData = {}
      formArray.map((key) => {
        formData[key.name] = key.value
      })
      formData.addr = String($('input[name="addr"]').val()).replace(/[\r\n]/g, '').replace(/\ +/g, '')
      if (formData.addr.length > 40) {
        $.toast('留言不能超过40个字')
        return false
      }
      if (formData.haveSendCompany) {
        if (haveSendCompany.prop('checked') === 'checked') {
          formData.haveSendCompany = 1
        } else {
          formData.haveSendCompany = 1
        }
      } else {
        formData.haveSendCompany = 0
      }
      if (formData.id) { // 表示编辑
        this.postData(addrApi.AddressUpdate, formData)
      } else { // 新增
        this.postData(addrApi.AddressAdd, formData)
      }
    })
  }
  doChecked(e) {
    const that = e.currentTarget ? $(e.currentTarget) : e
    const items = that.parents('li.J_need_item')
    const validArr = []
    items.prevAll().each((i, item) => {
      const input = $(item).find('input')
      let val = ''
      if (input.length > 1) {
        val = $(input[0]).val()
      } else {
        val = input.val()
      }
      if (val === '' || val === undefined) {
        this.showTips(input)
      }
    })

    $('.J_need_item').each((i, item) => {
      const input = $(item).find('input')
      let val = ''
      if (input.length > 1) {
        val = $(input[0]).val()
      } else {
        val = input.val()
      }
      if (val === '' || val === undefined) {
        validArr.push('false')
      }
    })
    if (that.val() === '') {
      validArr.push('false')
      this.showTips(that)
    } else {
      this.hideTips(that)
    }
    if (!validArr.length) {
      $('.J_save').removeClass('disabled')
    } else {
      $('.J_save').addClass('disabled')
    }
  }
  showTips(doms) {
    doms.parents('.item-inner').find('.tips').removeClass('fn-hide')
  }
  hideTips(doms) {
    doms.parents('.item-inner').find('.tips').addClass('fn-hide')
  }
  postData(urls, option) {
    option._time = this._time
    $.showPreloader();
    request({
      url: urls,
      data: JSON.stringify(option),
      cache: false,
      method: 'POST',
      contentType: 'application/json',
      cacheType: 'sessionStorage',
      callback: (data) => {
        if (data.success === '1') {
          sessionStorage.removeItem('addressInfo')
          sessionStorage.removeItem('defaultAddr')
          setTimeout(() => {
            $.hidePreloader();
          }, 500);
          $.alert('保存成功', () => {
            if (this.buyerInfo) { // 发布大货的时候
              // location.href = '/sendWays.html'
              history.go(-2)
            } else {
              location.href = '/sendWays.html?source=orderDetail'
            }
          });
        } else {
          $.toast(data.msg)
        }
      }
    })
  }
}
export default new Page()
