/*
 *供应商编辑
 */
/*
  author  yonghuang
 */
import '../../common/base.js'
import shopApi from '../../api/shop.js'
import {
  setCache,
  getCache,
  getParam,
  clearListCache,
  getLastPage
} from '../../common/utils'

class Page {
  constructor() {
    this._time = new Date().getTime()
    this.render()
  }
  render() {
    const that = this
    // 来源页面source 如果为空表示是新创建
    that.source = getParam('source')
    that.type = getParam('type')
    const tpl = 'sellerEdit/index.html'
    let sellerInfo = {}
    that.orderDetail = getCache({
      type: 'sessionStorage',
      dataType: 'json',
      key: 'orderDetail'
    })
    that.updateSellerInfo = getCache({
      type: 'sessionStorage',
      dataType: 'json',
      key: 'updateSellerInfo'
    })
    if (that.updateSellerInfo) {
      $.extend(that.orderDetail.obj, that.updateSellerInfo)
    }
    // if (!that.source || that.source == 'jianBanInput' || that.source == 'lsOrderPublish') {
    if (!that.source) {
      sellerInfo = getCache({
        type: 'sessionStorage',
        dataType: 'json',
        key: 'sellerInfo'
      })
    } else if (that.source == 'orderDetail') {

      sellerInfo = {
        sellerProvince: that.orderDetail.obj.sellerProvince,
        sellerCity: that.orderDetail.obj.sellerCity,
        sellerArea: that.orderDetail.obj.sellerArea,
        sellerAddr: that.orderDetail.obj.sellerAddr,
        purchaserRealName: that.orderDetail.obj.purchaserRealName,
        sellerContact: that.orderDetail.obj.sellerContact,
        sellerContactTel: that.orderDetail.obj.sellerContactTel,
        sellerTel: that.orderDetail.obj.sellerTel,
        sellerCompany: that.orderDetail.obj.sellerCompany,
        id: that.orderDetail.obj.shopId,
      }
    }
    let telType = 1 // 默认是固话
    const phoneObj = {}
    if (sellerInfo.sellerTel) {
      const telArr = sellerInfo.sellerTel.split('-')
      if (telArr.length > 1) {
        // 固话
        phoneObj.pre = telArr[0]
        phoneObj.end = telArr[1]
      } else {
        // 手机
        telType = 2
        phoneObj.phone = sellerInfo.sellerTel
      }
    }
    that.telType = telType
    that.phoneObj = phoneObj
    that.data = {
      title: '供应商',
      sellerInfo,
      telType,
      phoneObj,
      province: sellerInfo.sellerProvince,
      city: sellerInfo.sellerCity,
      area: sellerInfo.sellerArea,
      source: that.source,
      type: that.type,
    }
    if (that.orderDetail && that.orderDetail.obj.status) {
      that.data.status = that.orderDetail.obj.status
    }
    console.log(that.data)
    nunjucks.render(tpl, that.data).then((sellerEditHtml) => {
      that.$page = $('#sellerEdit')
      that.$page.html(sellerEditHtml)
      that.bindEvents()
    })
  }
  bindEvents() {
    const that = this
    const saveBtn = $('.J_save')
    const backBtn = $('.J_back')
    // 校验
    const $sellerCompany = $('input[name="sellerCompany"]')
    const $sellerAddr = $('.J_sellerAddr')
    const $sellerTelType = $('.J_tel_type')
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
    $sellerCompany.on('keyup', (e) => {
      this.doChecked(e)
    })
    $sellerAddr.on('keyup', (e) => {
      this.doChecked(e)
    })
    // 电话类型切换
    $sellerTelType.on('click', (e) => {
      that.telType = $(e.currentTarget).attr('data-type')
      if (that.telType == 1) { // 固话
        $('.J_phone_wrap').addClass('fn-hide')
        $('.J_tel_wrap').removeClass('fn-hide')
        $('.J_pre_tel').val() ? that.doChecked($('.J_end_tel')) : that.doChecked($('.J_pre_tel'))
      } else { // 手机
        $('.J_phone_wrap').removeClass('fn-hide')
        $('.J_tel_wrap').addClass('fn-hide')
        that.doChecked($('.J_phone'))
      }!$(e.currentTarget).hasClass('active')
      $sellerTelType.removeClass('active')
      $(e.currentTarget).addClass('active')
    })

    // 区号验证
    $('.J_pre_tel').on('keyup', function (e) {
      let val = $('.J_pre_tel').val()
      if (val.length > 4) {
        $('.J_pre_tel').val(val.substr(0, 4))
      }
      that.phoneObj.pre = $('.J_pre_tel').val()
      that.doChecked($('.J_pre_tel'))
    })
    // 固话验证
    $('.J_end_tel').on('keyup', function (e) {
      let val = $('.J_end_tel').val()
      if (val.length > 8) {
        $('.J_end_tel').val(val.substr(0, 8))
      }
      that.phoneObj.end = $('.J_end_tel').val()
      that.doChecked($('.J_end_tel'))
    })
    // 手机验证
    $('.J_phone').on('keyup', function (e) {
      let val = $('.J_phone').val()
      if (val.length > 11) {
        $('.J_phone').val(val.substr(0, 11))
      }
      that.phoneObj.phone = $('.J_phone').val()
      that.doChecked($('.J_phone'))
    })
    // $sellerTel.on('keyup', (e) => {
    //   const val = $(e.currentTarget).val()
    //   if (val.length > 11) {
    //     $.toast('电话不能超过11位')
    //     $(e.currentTarget).val(val.substr(0, 11))
    //   }
    //   this.doChecked(e)
    // })
    backBtn.on('click', () => {
      location.href = getLastPage()
      return false
    })
    // 保存
    saveBtn.on('click', (e) => {
      const target = $(e.currentTarget)
      if (target.hasClass('disabled')) return
      that.formTarget = target
      that.createSeller()
    })
  }

  createSeller() {
    const that = this
    const $form = that.formTarget.parents('form')
    const formArr = $form.serializeArray()
    const formData = {
      _time: that._time
    }
    formArr.map((key) => {
      formData[key.name] = key.value
    })
    formData.sellerAddr = String(formData.sellerAddr).replace(/[\r\n]/g, '').replace(/\ +/g, '')
    if (formData.sellerAddr.length >= 45) {
      console.log(formData.sellerAddr.length)
      $.alert('详细地址过长')
      return false
    }
    if (that.telType == 1) {
      formData.tel = `${that.phoneObj.pre}-${that.phoneObj.end}`
    } else {
      formData.tel = that.phoneObj.phone
    }
    $.showPreloader()
    // 存在id 是编辑状态
    request({
      url: shopApi.add,
      data: JSON.stringify(formData),
      cache: false,
      method: 'post',
      cacheType: 'sessionStorage',
      contentType: 'application/json',
      callback: (data) => {
        $.hidePreloader()
        $.alert(data.msg, () => {
          if (data.success == '1') {
            clearListCache()
            setCache({
              key: 'sellerInfo',
              dataType: 'json',
              value: data.obj || {},
              type: 'sessionStorage'
            })
            if (that.source == 'orderDetailEdit') {
              const orderDetail = getCache({
                key: 'orderDetail',
                type: 'sessionStorage',
              })
              const updateSellerInfo = $.extend({
                orderNumber: orderDetail.obj.orderNumber
              }, data.obj)
              setCache({
                type: 'sessionStorage',
                key: 'updateSellerInfo',
                value: updateSellerInfo,
                dataType: 'json'
              })
            }
            that.sellerAccountsClear()
            getLastPage()
            sessionStorage.removeItem('orderDetail')
            location.href = getLastPage()
          }
        })
      }
    })
  }
  doChecked(e) {
    const that = this
    const target = e.currentTarget ? $(e.currentTarget) : e
    const name = target.attr('name')
    const items = target.parents('li.J_need_item')
    const validArr = []
    items.prevAll('.J_need_item').each((i, item) => {
      const input = $(item).find('input')
      let val = ''
      if (input.length > 1) {
        val = $(input[0]).val()
      } else {
        val = input.val()
      }
      if (val === '' || val === undefined) {
        that.showTips(input)
      }
    })
    $('.J_need_item').each((i, item) => {
      const input = $(item).find('input')
      let val = ''
      if (input.length > 1) {
        val = $(input[0]).val()
      } else if (input.length === 0) {
        val = String($(item).find('textarea').val()).replace(/[\r\n]/g, '').replace(/\ +/g, '')
      } else {
        val = input.val()
      }
      if (val === '' || val === undefined) {
        validArr.push('false')
      }
    })

    if (target.val() === '') {
      validArr.push('false')
      that.showTips(target)
    } else {
      that.hideTips(target)
    }
    // 特殊处理 手机号码
    if (name != 'sellerCompany') { //表示 都是在电话的以后的空间输入了
      if (that.telType == 1) { //固话
        if (!that.phoneObj.pre || !that.phoneObj.end) {
          that.showTips($('.J_pre_tel'))
          validArr.push('false')
        } else {
          that.hideTips($('.J_pre_tel'))
        }
      } else {
        if (!that.phoneObj.phone || String(that.phoneObj.phone).length != 11) {
          that.showTips($('.J_pre_tel'))
          validArr.push('false')
        } else {
          that.hideTips($('.J_pre_tel'))
        }
      }
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
  sellerAccountsClear() {
    const sellerAccounts = {
      id: '',
      shopId: '',
      replyAccountBank: '',
      replyAccountBranch: '',
      replyAccountUser: '',
      replyAccountNumber: '',
      province: '',
      city: '',
      bankId: '',
      bankShort: '',
      type: '',
      replyAccountNumber: '',
      isDefaulted: 0
    }
    setCache({
      type: 'sessionStorage',
      key: 'sellerAccounts',
      value: sellerAccounts,
      dataType: 'json'
    })
  }
}
export default new Page()