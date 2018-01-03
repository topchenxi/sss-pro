/*
  author  yonghuang
 */
import '../../common/base.js'
import {
  request,
  getCache,
  setCache,
  formatTimeString,
  clearListCache,
  getParam
} from '../../common/utils'
import orderApi from '../../api/order.js'
import addrApi from '../../api/address'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.payment = 0
    this.taxes = 0
    this.serviceMoney = 0
    this.render()
  }
  render() {
    const that = this
    this.source = getParam('source')
    this.secondStep = getCache({ // 只有在发布订单的步骤中才会出现
      key: 'secondStep',
      type: 'sessionStorage',
      dataType: 'json'
    })
    this.reqOption = {}
    const tpl = 'sendWays/index.html'
    if (!this.source) {
      let payment = 0
      console.log('this.secondStep:', this.secondStep)
      const productList = JSON.parse(this.secondStep.productList)
      console.log('productList:', productList)
      if (productList.length > 0) {
        for (let i = 0; i < productList.length; i++) {
          payment += productList[i].salePrice * productList[i].quantity
        }
        this.payment = payment
      }
      this.data = {
        title: '提交订单',
        prospect: this.secondStep.prospect,
        saleMoney: (payment || 0).toFixed(2)
      }
      if (this.sendWaysObj) {
        this.data.sendType = this.sendWaysObj.sendType
        this.data.invoiceStatus = this.sendWaysObj.invoiceStatus
        this.data.leaveMessage = this.sendWaysObj.leaveMessage
        this.data.taxPoint = this.sendWaysObj.taxPoint
        this.data.serviceMoney = this.sendWaysObj.serviceMoney
        this.data.expectedTimeString = this.sendWaysObj.expectedTimeString
        this.expectedTimeString = this.sendWaysObj.expectedTimeString
        this.expectedTime = this.sendWaysObj.expectedTime
        this.data.ableClick = true
        this.data.saleMoney = this.sendWaysObj.saleMoney || payment
      }
      this.reqOption.buyerId = this.secondStep.buyerId
      this.backLink = '/addColor.html'
    } else {
      this.orderDetail = getCache({
        key: 'orderDetail',
        type: 'sessionStorage',
        dataType: 'json'
      })
      console.log('this.orderDetail:', this.orderDetail)
      this.data = {
        title: '编辑订单',
        sendType: this.orderDetail.obj.sendType,
        invoiceStatus: this.orderDetail.obj.invoiceStatus,
        leaveMessage: this.orderDetail.obj.leaveMessage,
        taxPoint: this.orderDetail.obj.taxPoint,
        serviceMoney: this.orderDetail.obj.serviceMoney,
        saleMoney: this.orderDetail.obj.saleMoney
      }
      this.backLink = `/${this.source}.html?orderNumber=${this.orderDetail.obj.orderNumber}`
      this.data.expectedTimeString = Number(this.orderDetail.obj.expectedTime) === 0 ? '' : formatTimeString(this.orderDetail.obj.expectedTime).split(' ')[0]
      this.expectedTime = this.orderDetail.obj.expectedTime
      this.reqOption.buyerId = this.orderDetail.obj.buyer.id
      if (this.sendWaysObj) {
        this.data.sendType = this.sendWaysObj.sendType
        this.data.invoiceStatus = this.sendWaysObj.invoiceStatus
        this.data.leaveMessage = this.sendWaysObj.leaveMessage
        this.data.taxPoint = this.sendWaysObj.taxPoint
        this.data.serviceMoney = this.sendWaysObj.serviceMoney
        this.data.expectedTimeString = this.sendWaysObj.expectedTime
        this.expectedTime = this.sendWaysObj.expectedTime
        this.data.ableClick = true
        this.data.saleMoney = this.sendWaysObj.saleMoney ? this.sendWaysObj.saleMoney : this.data.saleMoney
      }
    }
    if (!this.reqOption.buyerId) {
      // 如果是编辑页面而且没有采购商ID可能是 从订单详情直接返回的
      // 跳到发布页
      location.href = '/?category=all-all'
      return false
    }
    this.data.status = this.source ? 'edit' : 'create'
    console.log(1, this.sendWaysObj)
    this.sendWaysObj = getCache({ // 只有在发布订单的步骤中才会出现
      key: 'sendWaysObj',
      type: 'sessionStorage',
      dataType: 'json'
    })
    if (this.sendWaysObj !== false) {
      this.data = Object.assign(this.data, this.sendWaysObj)
      console.log('this.sendWaysObj2:' + this.sendWaysObj)
    }
    console.log(' this.data2:' + this.data) //这里遇到困难,当不存在sendwayobj时候,如何做
    // debugger
    this.data.saleMoney = Number(this.data.saleMoney).toFixed(2)
    nunjucks.render(tpl, this.data).then((sendWaysHtml) => {
      // debugger
      that.$page = $('#sendWays')
      that.$page.html(sendWaysHtml)
      this.defaultAddr = getCache({
        key: 'defaultAddr',
        type: 'sessionStorage',
        dataType: 'json'
      })
      // 存在缓存默认收货地址的时候就没必要去请求
      if (this.defaultAddr) {
        this.renderAddr({
          obj: this.defaultAddr
        })
      } else if (!this.orderDetail || !Number(this.orderDetail.obj.sendType)) {
        this.getDefaulAddr()
      } else {
        this.bindEvents()
      }
    })
  }
  getDefaulAddr() {
    this.reqOption._time = this._time
    this.reqOption.userId = this.reqOption.buyerId
    $.showPreloader()
    request({
      url: addrApi.AddressGetDefault,
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify(this.reqOption),
      cache: false,
      callback: (data) => {
        if (data.success === '1') {
          setTimeout(() => {
            $.hidePreloader();
          })
          this.defaultAddr = data.obj
          this.renderAddr(data)
        } else {
          $.toast(data.msg)
        }
      }
    })
  }
  renderAddr(data) {
    const addressDom = $('.J_address_con')
    const addressTpl = 'sendWays/addressTpl.html'
    nunjucks.render(addressTpl, data).then((addressHtml) => {
      addressDom.html(addressHtml)
      this.bindEvents()
      this.doChecked()
    })
  }
  bindEvents() {
    this.sendTypeInput = $('input[name="sendType"]')
    this.invoiceStatus = $('input[name="invoiceStatus"]')
    this.leaveMessage = $('textarea[name="leaveMessage"]')
    const sendDay = $('.J_send_day')
    const addrSelectLink = $('.J_addr_select')
    this.saveBtn = $('.J_save')
    this.backBtn = $('.J_back')
    this.clearBtn = $('.J_clear')
    // 获取默认被选上的配送方式
    this.sendType = $('input[name="sendType"]:checked').val()
    this.taxPoint = $('.J_taxPoint')
    this.serviceMoneyDom = $('.J_serviceMoney')
    this.taxPoint.change((e) => {
      const val = $(e.currentTarget).val()
      if (val > 100 || val <= 0) {
        $.alert('税点不能小于等于0或大于100')
        return
      }
      this.taxes = this.payment * val * 0.01
      $('.J_taxes').text(this.taxes.toFixed(2))
      const totalPay = this.payment + this.taxes + this.serviceMoney
      $('.J_totalPay').text(totalPay.toFixed(2))
    })
    this.serviceMoneyDom.change((e) => {
      this.serviceMoney = parseFloat($(e.currentTarget).val())
      $('.J_serviceMoney_text').text(this.serviceMoney.toFixed(2))
      const totalPay = this.payment + this.taxes + this.serviceMoney
      $('.J_totalPay').text(totalPay.toFixed(2))
    })
    this.sendTypeInput.change((e) => {
      const val = $(e.currentTarget).val()
      if (val === '0') { // 搜芽配送
        $('.J_address_con').removeClass('fn-hide')
        if (!this.defaultAddr) {
          this.getDefaulAddr()
        }
      } else {
        $('.J_address_con').addClass('fn-hide')
      }
      this.sendType = val
      this.doChecked('first')
    })
    this.invoiceStatus.on('change', (e) => {
      const value = e.target.value
      if (value == 0) {
        $('.J_label_taxPoint').hide()
      } else {
        $('.J_label_taxPoint').show()
      }
      this.doChecked()
    })
    let dataArray = []
    const pickerOption = {
      onClose: (cal) => {
        this.expectedTimeString = cal.input.val()
        const now = new Date().valueOf()
        const select = new Date(this.expectedTimeString).valueOf()
        this.expectedTime = select
        if (select < now) {
          $.alert('不能小于当前时间')
          $('.J_send_day').val('')
          return false
        }
        this.doChecked()
      }
    }
    if (this.expectedTime) {
      const newDate = formatTimeString(this.expectedTime)
      const year = newDate.split(' ')[0].split('-')[0]
      const month = newDate.split(' ')[0].split('-')[1]
      const day = newDate.split(' ')[0].split('-')[2]
      let hour = newDate.split(' ')[1].split(':')[0]
      const minute = newDate.split(' ')[1].split(':')[1]
      if (hour < 10) {
        hour = hour.substr(1)
      }
      dataArray = [year, month, day, hour, minute]
      console.log('dataArray,', dataArray)
      pickerOption.value = dataArray
    }
    sendDay.datetimePicker(pickerOption)
    this.leaveMessage.on('focus', () => {
      this.doChecked()
    })
    // 清除日期
    this.clearBtn.on('click', () => {
      sendDay.val('')
      this.expectedTime = ''
      this.expectedTimeString = ''
      this.doChecked()
    })
    var addressId;
    addrSelectLink.on('click', (e) => {
      const that = $(e.currentTarget)
      const sendWaysObj = {}
      const addrId = that.attr('data-addrId')
      addressId = addrId
      sendWaysObj.leaveMessage = String($('textarea[name="leaveMessage"]').val()).replace(/[\r\n]/g, '').replace(/\ +/g, '')
      sendWaysObj.invoiceStatus = $('input[name="invoiceStatus"]:checked').val()
      sendWaysObj.expectedTime = this.expectedTime
      sendWaysObj.sendType = $('input[name="sendType"]:checked').val()
      sendWaysObj.taxPoint = $('.J_taxPoint').val()
      sendWaysObj.serviceMoney = $('.J_serviceMoney').val()
      sendWaysObj.expectedTimeString = this.expectedTimeString
      setCache({
        key: 'sendWaysObj',
        dataType: 'json',
        type: 'localStorage',
        value: sendWaysObj,
      })
      location.href = `/addressList.html?id=${addrId}`
      return false
    })
    this.backBtn.on('click', (e) => {
      const sendWaysObj = {}
      sendWaysObj.leaveMessage = String($('textarea[name="leaveMessage"]').val()).replace(/[\r\n]/g, '').replace(/\ +/g, '')
      sendWaysObj.invoiceStatus = $('input[name="invoiceStatus"]:checked').val()
      sendWaysObj.expectedTime = this.expectedTime
      sendWaysObj.sendType = $('input[name="sendType"]:checked').val()
      sendWaysObj.taxPoint = $('.J_taxPoint').val()
      sendWaysObj.serviceMoney = $('.J_serviceMoney').val()
      sendWaysObj.expectedTimeString = this.expectedTimeString
      setCache({
        key: 'sendWaysObj',
        dataType: 'json',
        type: 'sessionStorage',
        value: sendWaysObj,
      })
      location.href = this.backLink
      return false
    })
    this.saveBtn.on('click', (e) => {
      const that = $(e.currentTarget)
      if (that.hasClass('disabled')) return
      let param = {}
      let addrId = ''
      param.invoiceStatus = $('input[name="invoiceStatus"]:checked').val()
      param.leaveMessage = String($('textarea[name="leaveMessage"]').val()).replace(/[\r\n]/g, '').replace(/\ +/g, '')
      param.taxPoint = $('.J_taxPoint').val()
      if ($('[name="invoiceStatus"]').val() == 1 && param.taxPoint == '') {
        $.toast('税点不能为空')
        return
      }
      param.serviceMoney = $('.J_serviceMoney').val()
      if (param.serviceMoney == '') {
        $.toast('服务费不能为空')
        return
      }
      if (param.leaveMessage.length > 200) {
        $.toast('留言不能超过200个字')
        return
      }
      if (this.expectedTime) {
        if ((typeof this.expectedTime) == 'string') {
          param.expectedTime = new Date(this.expectedTime.replace(/-/g, '/')).valueOf()
        } else {
          param.expectedTime = this.expectedTime
        }
      } else {
        param.expectedTime = 0
      }
      if (this.buyerInfo || this.orderDetail) {
        let company = this.secondStep ? this.secondStep.company : this.orderDetail ? this.orderDetail.obj.buyer.company : ''
        let patt1 = new RegExp('试用');
        if (patt1.test(company) && !param.leaveMessage) {
          $.toast('试用客户请在“采购商留言“中填写真实客户名称')
          $('textarea[name="leaveMessage"]').focus()
          return false
        }
      }
      param.sendType = this.sendType
      param._time = this._time
      if (this.sendType === '0') { // 搜芽配送 需要传收货地址ID
        addrId = $('input[name="addrId"]').val()
        param.addrId = addrId
      }

      if (this.secondStep) {
        delete this.secondStep.prospect
        param = $.extend(param, this.secondStep)
      }
      console.log('param:', param)
      if (this.source) {
        param.orderNumber = this.orderDetail.obj.orderNumber
        this.commit(orderApi.updateSendStyle, param)
      } else {
        /*if (param.imgUrls.length) {
          param.imgUrls = JSON.stringify(param.imgUrls)
        }*/
        this.commit(orderApi.commit, param)
      }
    })
  }
  commit(urls, param) {
    $.showPreloader()
    request({
      url: urls,
      data: param,
      cache: false,
      method: 'POST',
      cacheType: 'sessionStorage',
      callback: (data) => {
        $.hidePreloader()
        if (data.success === '1') {
          sessionStorage.removeItem('firstStep')
          sessionStorage.removeItem('sellerInfo')
          sessionStorage.removeItem('buyerInfo')
          sessionStorage.removeItem('secondStep')
          sessionStorage.removeItem('colorInfo')
          sessionStorage.removeItem('addressInfo')
          sessionStorage.removeItem('defaultAddr')
          sessionStorage.removeItem('sendWaysObj')
          sessionStorage.removeItem('updateSellerInfo')
          sessionStorage.removeItem('publishAgain')
          clearListCache()
          if (this.source) { // 属于更新页面 不会返回orderNumber
            location.href = `/orderDetail.html?orderNumber=${this.orderDetail.obj.orderNumber}`
          } else {
            location.href = `/orderDetail.html?orderNumber=${data.obj.orderNumber}`
          }
        } else {
          $.alert(data.msg)
        }
      }
    })
  }
  doChecked(type) {
    // 按钮是否可点
    if (Number(this.sendType) === 0 && this.defaultAddr) {
      this.saveBtn.removeClass('disabled')
    } else if (Number(this.sendType) === 1) {
      this.saveBtn.removeClass('disabled')
    } else {
      this.saveBtn.removeClass('disabled')
    }
    // 配送方式校验
    if (Number(this.sendType) === 0) {
      if (this.defaultAddr) {
        this.hideTips(this.sendTypeInput)
      } else {
        this.showTips(this.sendTypeInput)
      }
    }
    // 是否需要发票校验
    if (type === 'first') return
    // if (!invoice) {
    //   this.showTips(this.invoiceStatus)
    // } else {
    //   this.hideTips(this.invoiceStatus)
    // }
  }
  showTips(doms) {
    doms.parents('.item-inner').find('.tips').removeClass('fn-hide')
  }
  hideTips(doms) {
    doms.parents('.item-inner').find('.tips').addClass('fn-hide')
  }
}
export default new Page()