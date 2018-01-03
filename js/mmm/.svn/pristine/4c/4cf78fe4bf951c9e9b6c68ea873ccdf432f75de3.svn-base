/*
  author  yonghuang
 */
// import { request } from '../../common/base'
import '../../common/base.js'
import { getCache, setCache, getParam } from '../../common/utils'
import orderApi from '../../api/order'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.render()
  }
  render() {
    const that = this
    // 模板
    const tpl = 'addColor/index.html'
    // 来源页面source 如果为空表示是新创建
    this.source = getParam('source')
    this.orderNumber = getParam('orderNumber')
    this.isEditOrNot = getParam('isEditOrNot')
    this.shopCartList = getParam('from')
    this.pcInputDh = getParam('pcInputDh')
    this.loginInfo = null;
    let productList = null
    let productType = ''
    let productNumber = ''
    let salePriceUnit = ''
    let title = '颜色及数量'
    let orderType = 1 // 默认是服务单
    let servicePrice = ''
    let clientRewardPrice = ''
    let servicePriceUnit = ''
    if (this.source) { // 编辑
      this.orderDetail = getCache({
        key: 'orderDetail',
        type: 'sessionStorage',
        dataType: 'json'
      })
      console.log('this.orderDetail:', this.orderDetail)
      productNumber = this.orderDetail.obj.productNumber
      productList = this.orderDetail.obj.productList
      productType = this.orderDetail.obj.productType
      salePriceUnit = this.orderDetail.obj.salePriceUnit
      servicePrice = this.orderDetail.obj.servicePrice
      // clientRewardPrice = this.orderDetail.obj.clientRewardPrice
      servicePriceUnit = this.orderDetail.obj.servicePriceUnit
      orderType = this.orderDetail.obj.type
      if (this.orderDetail.obj.productList.length > 0) {
        salePriceUnit = this.orderDetail.obj.productList[0].quantityUnit
      }
      if (this.source === 'inputInfo' || this.source === 'inputFinal') {
        if (this.shopCartList) {
          this.backLink = `/${this.source}.html?orderNumber=${this.orderNumber}&isEditOrNot=${this.isEditOrNot}&from=shopCartList`
        } else {
          this.backLink = `/${this.source}.html?orderNumber=${this.orderNumber}&isEditOrNot=${this.isEditOrNot}`
        }
        if (this.pcInputDh) {
          this.backLink = `/${this.source}.html?orderNumber=${this.orderNumber}&isEditOrNot=${this.isEditOrNot}&pcInputDh=1`
        }
      } else {
        this.backLink = `/${this.source}.html`
      }
      this.eidtNotShow = true
      title = '颜色及数量'
    } else { // 发布订单流程的
      this.firstStep = getCache({
        key: 'firstStep',
        dataType: 'json',
        tyep: 'sessionStorage'
      })
      this.colorInfo = getCache({ // 获取传送过来的颜色
        key: 'colorInfo',
        dataType: 'json',
        tyep: 'sessionStorage'
      })
      this.secondStep = getCache({
        key: 'secondStep',
        dataType: 'json',
        tyep: 'sessionStorage',
      })
      orderType = this.firstStep.type
      productList = this.colorInfo
      productType = this.firstStep.productType
      productNumber = this.secondStep.productNumber
      salePriceUnit = this.secondStep.salePriceUnit
      servicePrice = this.secondStep.servicePrice
      servicePriceUnit = this.secondStep.servicePriceUnit
      // clientRewardPrice = this.secondStep.clientRewardPrice
      this.backLink = '/orderPublish.html'
    }
    const currentUser = getCache({
      key: 'currentUser',
      dataType: 'json',
      tyep: 'sessionStorage'
    })
    this.loginInfo = currentUser.loginInfo
    let xiaoshouPriceEdit = false // 销售单价可以编辑
    let chenbenPriceShow = false // 表示成本单价出现
    let chenbenPriceEdit = false // 表示成本单价出现并且能修改
    let caigoushuliangEdit = true // 采购数量能修改
    let sehaoEdit = false //色号可以改
    let servicePriceShow = orderType == 1 ? true : false
    let servicePriceReadOnly = false
    let maZhiBeiZhuEdit = false
    if (currentUser && (currentUser.loginInfo.woodPurchaser || currentUser.loginInfo.woodPurchaserLeader)) { // 买货员
      maZhiBeiZhuEdit = false // 买货员都不能 修改码纸备注
      servicePriceReadOnly = true // 服务费单价不能修改
      chenbenPriceShow = true
      chenbenPriceEdit = true
      xiaoshouPriceEdit = false
      sehaoEdit = false
    }
    if (currentUser && currentUser.loginInfo.woodFollowLeader) { // 跟单员
      xiaoshouPriceEdit = true
      chenbenPriceEdit = false
      chenbenPriceShow = true
      maZhiBeiZhuEdit = true
      servicePriceReadOnly = false
      sehaoEdit = true
    }
    if (this.orderDetail && this.orderDetail.obj.status && this.orderDetail.obj.status == 300 || !this.source) {
      xiaoshouPriceEdit = true
      chenbenPriceShow = false
    }

    if (this.source === 'inputFinal') { // 尾款 啥都不能改
      xiaoshouPriceEdit = false // 销售单价可以编辑
      servicePriceReadOnly = true
      maZhiBeiZhuEdit = false
      if (currentUser && currentUser.loginInfo.woodFollowLeader) { // 又可以改了。。妈的
        servicePriceReadOnly = false
        xiaoshouPriceEdit = true
      }
    }
    this.data = {
      title,
      productNumber,
      productType,
      productList,
      salePriceUnit,
      eidtNotShow: this.eidtNotShow,
      // backLink,
      source: this.source,
      disabled: !this.colorInfo,
      xiaoshouPriceEdit,
      chenbenPriceEdit,
      chenbenPriceShow,
      servicePriceShow,
      caigoushuliangEdit,
      servicePriceReadOnly,
      maZhiBeiZhuEdit,
      sehaoEdit,
      servicePrice,
      // clientRewardPrice,
      servicePriceUnit,
      servicePriceReadOnly,
      status: this.orderDetail ? this.orderDetail.obj.status : ''
    }
    if (this.orderDetail && this.orderDetail.obj.productList[0] && this.orderDetail.obj.productList[0].salePriceUnit === '元/千克') {
      this.data.replyWidth = this.orderDetail.obj.replyWidth
      this.data.replyWeigth = this.orderDetail.obj.replyWeigth
    }
    // 将一些变量设置成全局
    this.productType = Number(productType)
    nunjucks.render(tpl, this.data).then((addColorHtml) => {
      that.$page = $('#addColor')
      that.$page.html(addColorHtml)
      this.bindEvents()
      this.doCaculate() // 计算一次价格
    })
  }
  bindEvents() {
    this.change = false // 是否有改动
    const colorBlock = $('.J_color_block')
    const whBlock = $('.J_weight_height')
    const addMoreBtn = $('.J_add_more')
    const saveBtn = $('.J_save')
    let unitInput = $('[name="salePriceUnit"]')
    const changeAllPrice = $('.J_change_all')
    const backBtn = $('.J_back')
    const servicePriceInput = $('.J_servicePrice')
    const clientRewardPriceInput = $('.J_clientRewardPrice') // 回扣单价
    backBtn.on('click', () => {
      // if (this.colorInfo) {
      //   $.modal({
      //     title: '是否确定返回',
      //     text: '继续返回，已填内容将不会被保留',
      //     buttons: [
      //       {
      //         text: '不保存',
      //         onClick: () => {
      //           sessionStorage.removeItem('colorInfo')
      //           sessionStorage.removeItem('addressInfo')
      //           sessionStorage.removeItem('defaultAddr')
      //           location.href = this.backLink
      //           return false
      //         }
      //       },
      //       {
      //         text: '取消'
      //       }
      //     ]
      //   })
      // }
      if (this.change) {
        $.modal({
          title: '是否保存修改',
          text: '继续返回，已填内容将不会被保留',
          buttons: [
            {
              text: '不保存',
              onClick: () => {
                location.href = this.backLink
                return false
              }
            },
            {
              text: '保存',
              onClick: () => {
                this.doChecked($('.J_items').last().find('.J_salePrice'))
                if (this.source) {
                  saveBtn.triggerHandler('click')
                } else {
                  const colorList = this.gatherColorList()
                  setCache({
                    key: 'colorInfo',
                    datType: 'json',
                    value: colorList.newProductListForDetail,
                    tyep: 'sessionStorage'
                  })
                  location.href = this.backLink
                }
              }
            }
          ]
        })
      } else {
        location.href = this.backLink
        return false
      }
    })
    // 修改单价的时候 重新计算估价
    colorBlock.on('keyup', '.J_salePrice, .J_price', (e) => {
      let val = Number($(e.currentTarget).val())
      if (val < 0) {
        val = 0
        $(e.currentTarget).val(val)
      }
      this.doCaculate()
      this.doChecked(e)
    })
    colorBlock.on('keyup', '.J_buy_price', (e) => {
      let val = Number($(e.currentTarget).val())
      if (val < 0) {
        val = 0
        $(e.currentTarget).val(val)
      }
      this.doChecked(e)
    })
    // 修改采购数量的时候要计算估价
    colorBlock.on('keyup', '.J_num', (e) => {
      let val = Number($(e.currentTarget).val())
      if (val < 0) {
        val = 0
        $(e.currentTarget).val(val)
      }
      this.doCaculate()
      // 焦点以上 校验
      this.doChecked(e)
    })
    // 修改色号
    colorBlock.on('keyup', '.J_color', (e) => {
      // 焦点以上 校验
      this.doChecked(e)
    })
    servicePriceInput.on('keyup', (e) => {
      this.doChecked(e)
    })
    // clientRewardPriceInput.on('input', (e) => {
    //   this.doChecked(e)
    // })
    // 修改幅宽克重
    whBlock.on('keyup', '.J_replyWidth', (e) => {
      let val = Number($(e.currentTarget).val())
      if (val < 0) {
        val = 0
        $(e.currentTarget).val(val)
      }
      // 焦点以上 校验
      this.doChecked(e)
    })
    // 修改幅宽克重
    whBlock.on('keyup', '.J_replyWeigth', (e) => {
      let val = Number($(e.currentTarget).val())
      if (val < 0) {
        val = 0
        $(e.currentTarget).val(val)
      }
      // 焦点以上 校验
      this.doChecked(e)
    })
    // 增加多个色号
    addMoreBtn.on('click', () => {
      let unitWrapHtml = '';
      if (this.productType === 1 || this.productType == '面料') { // 面料
        unitInput = $('[name="salePriceUnit"]')
      } else if (this.productType === 2 || this.productType == '辅料') { // 辅料
        unitInput = $('[name="salePriceUnit"]')
      }
      const salePrice = colorBlock.children('li').last().find('.J_salePrice').val() || ''
      const unit = unitInput.val() || ''
      if (this.data.type === '辅料') {
        unitWrapHtml = `<input type="number" class="col-40 J_salePrice" value="${salePrice}" placeholder="销售单价">
            <span class="col-15 unit">元/</span>
            <span class="col-40 J_unit unit">元/${unit}</span>`
      } else {
        unitWrapHtml = `<input type="number" class="col-50 J_salePrice" value="${salePrice}" placeholder="请输入销售单价">
        <span class="J_unit col-50 unit">元/${unit}</span>`
      }
      const html = `<li class="row no-gutter">
                <div class="col-80 item-content J_items">
                    <ul>
                    <li class="J_need_item">
                        <div class="item-inner"><div class="item-title label">*色号 <span class="tips warning-text fn-hide ">&nbsp;!</span></div>
                        <input type="text" placeholder="请输入色号" class="J_color">
                        </div>
                    </li>
                    <li class="J_need_item">
                        <div class="item-inner">
                            <div class="item-title label">*销售单价 <span class="tips warning-text fn-hide ">&nbsp;!</span></div>
                            <div class="item-input row no-gutter">${unitWrapHtml}</div>
                        </div>
                    </li>
                    <li class="J_need_item">
                        <div class="item-inner">
                          <div class="item-title label">*采购数量 <span class="tips warning-text fn-hide ">&nbsp;!</span></div>
                          <div class="item-input row no-gutter">
                            <input type="number" placeholder="必填" class='J_num quantity col-50' value= ''>
                            <span class='col-25 unit J_quantityUnit'>${unit}</span>
                          </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-inner"><div class="item-title label">客户设计款号<span class="tips warning-text fn-hide ">&nbsp;!</span></div>
                        <input type="text" placeholder="请输入客户设计款号" class="J_outMaZhiRemark">
                        </div>
                    </li>
                    </ul>
                </div>
                <div class="col-20 del warning-text item-link J_del">删除</div></li>`
      colorBlock.append(html)
      this.doChecked($('.J_items').last().find('.J_salePrice'))
    })
    // 删除色号 也需要重新计算估价
    colorBlock.on('click', '.J_del', (e) => {
      $(e.target).parents('li').remove()
      this.doCaculate()
      if (!$('.J_items').last().find('.J_salePrice').length) {
        saveBtn.addClass('disabled')
      } else {
        this.doChecked($('.J_items').last().find('.J_salePrice'))
      }
    })
    // 修改码纸
    $(document).on('change', '.J_outMaZhiRemark', (e) => {
      this.doChecked($('.J_items').last().find('.J_salePrice'))
    })
    // 修改单位
    unitInput.on('keyup change', (e) => {
      const val = $(e.target).val() || ''
      const unitDom = $('.J_unit')
      unitDom.html(`元/${val}`)
      $('.J_quantityUnit').html(val)
      if ((this.source === 'inputInfo' || this.source === 'inputFinal') && val === '千克') { // 录入大货的时候需要填写幅宽和克重
        $('.J_weight_height').removeClass('fn-hide')
        $('.J_weight_height li').addClass('J_need_item')
      } else if ((this.source === 'inputInfo' || this.source === 'inputFinal') && val !== '千克') {
        $('.J_weight_height').addClass('fn-hide')
        $('.J_weight_height li').removeClass('J_need_item')
      }
      this.doChecked(e)
    })
    // 一键修改 所有单价 录入大货编辑态的时候才会出现
    changeAllPrice.on('click', () => {
      const modal = $.modal({
        title: '修改色号销售单价',
        text: '此操作将改变所有色号的销售单价',
        afterText: '<input type="number" class="prompt-text" placeholder="请输入销售单价，纯数字"/>',
        buttons: [
          {
            text: '取消',
            onClick: () => {
              $.closeModal(modal)
            }
          },
          {
            text: '确认修改',
            close: false,
            onClick: () => {
              let val = $('.prompt-text').val()
              if (val) {
                if (val < 0) {
                  val = 0
                  $('.prompt-text').val(val)
                }
                $('.J_salePrice').val(val)
                $.closeModal(modal)
                this.doCaculate()
                this.doChecked($('.J_items').last().find('.J_salePrice'))
              } else {
                $.toast('请输入销售单价')
                $('.prompt-text').focus()
              }
              // $.closeModal(modal)
            }
          }
        ]
      })
    })

    // 修改或者创建
    saveBtn.on('click', (e) => {
      const target = $(e.target)
      if ($('.J_productNumber').val() === '') {
        $.toast('货号不能为空')
        return
      }
      if (target.hasClass('disabled')) return
      const obj = this.gatherColorList()
      const newProductListForDetail = obj.newProductListForDetail
      const newProductListForUpdate = obj.newProductListForUpdate

      this.servicePrice = $('.J_servicePrice').val()
      // this.clientRewardPrice = $('.J_clientRewardPrice').val()
      this.servicePriceUnit = (this.salePriceUnit.indexOf('元') > -1 ? '' : '元/') + this.salePriceUnit

      if (!this.source) {
        if (!this.checkProductPrice(newProductListForDetail)) {
          return
        }

        const secondStep = $.extend(this.firstStep, {
          productList: JSON.stringify(newProductListForDetail),
          prospect: $('.J_prospect_salePrice').text(),
          productNumber: $('.J_productNumber').val(),
          salePriceUnit: $('[name="salePriceUnit"]').val(),
          servicePrice: $('.J_servicePrice').val(),
          // clientRewardPrice: $('.J_clientRewardPrice').val(),
          servicePriceUnit: '元/' + $('[name="salePriceUnit"]').val()
        })
        setCache({
          key: 'secondStep',
          datType: 'json',
          value: secondStep,
          tyep: 'sessionStorage'
        })
        setCache({
          key: 'colorInfo',
          datType: 'json',
          value: newProductListForDetail,
          tyep: 'sessionStorage'
        })
        location.href = '/sendWays.html'
      } else if (this.source === 'colorList') {
        if (!this.checkProductPrice(newProductListForUpdate)) {
          return
        }

        // 如果是从色号列表也过来的 要独立更新色号信息
        this.orderDetail.obj.productList = newProductListForDetail
        this.orderDetail.obj.productNumber = $('.J_productNumber').val()
        setCache({
          key: 'orderDetail',
          datType: 'json',
          value: this.orderDetail,
          tyep: 'sessionStorage'
        })
        const reqOption = {
          orderNumber: this.orderDetail.obj.orderNumber,
          productNumber: $('.J_productNumber').val(),
          productList: JSON.stringify(newProductListForUpdate),
          servicePrice: this.servicePrice,
          // clientRewardPrice: this.clientRewardPrice,
          servicePriceUnit: this.servicePriceUnit,
          _time: this._time
        }
        request({
          url: orderApi.updateProductColorPrice,
          data: reqOption,
          cache: false,
          callback: (data) => {
            if (data.success === '1') {
              location.href = `/${this.source}.html`
            } else {
              $.toast(data.msg)
            }
          }
        })
      } else if (this.source === 'inputInfo' || this.source === 'inputFinal') {
        if (!this.checkProductPrice(newProductListForDetail)) {
          return
        }

        this.orderDetail.obj.productList = newProductListForDetail
        if (this.quantityUnit === '千克') {
          this.orderDetail.obj.replyWidth = $('input[name="replyWidth"]').val()
          this.orderDetail.obj.replyWeigth = $('input[name="replyWeigth"]').val()
        }
        this.orderDetail.obj.servicePrice = this.servicePrice
        this.orderDetail.obj.servicePriceUnit = this.servicePriceUnit
        this.orderDetail.obj.hasfix = true // 表示是 已经修改过得
        setCache({
          key: 'orderDetail',
          datType: 'json',
          value: this.orderDetail,
          tyep: 'sessionStorage'
        })

      var tempData = getCache({
        key: 'tempData',
        type: 'sessionStorage',
        dataType: 'json'
      })
      tempData.productList=this.orderDetail.obj.productList
      setCache({
          key: 'tempData',
          datType: 'json',
          value: tempData,
          tyep: 'sessionStorage'
        })

        location.href = `/${this.source}.html?orderNumber=${this.orderNumber}&isEditOrNot=${this.isEditOrNot}`
      } else {
        if (!this.checkProductPrice(newProductListForDetail)) {
          return
        }

        this.orderDetail.obj.productList = newProductListForDetail

        setCache({
          key: 'orderDetail',
          datType: 'json',
          value: this.orderDetail,
          tyep: 'sessionStorage'
        })
        location.href = `/${this.source}.html`
      }
    })
  }

  checkProductPrice(productList) {
    console.log(productList)
    let flag = true
    if (productList.length > 0) {
      for (let i = 0; i < productList.length; i ++) {
        if (parseFloat(productList[i].buyPrice) > parseFloat(productList[i].salePrice)) {
          $.alert('销售单价不能小于采购单价')
          $($('.J_buy_price')[0]).focus()
          flag = false
          break
        }
        if (this.loginInfo && !this.loginInfo.woodFollowLeader) {
          if (parseFloat(productList[i].buyPrice) < parseFloat(productList[i].price)) {
            $.alert('采购单价不能小于成本单价')
            $($('.J_buy_price')[0]).focus()
            flag = false
            break
          }
        }
      }
    }
    return flag
  }

  gatherColorList() {
    const itemDoms = $('.J_items')
    const newProductListForDetail = []
    const newProductListForUpdate = []
    if (this.productType === 1) { // 面料
      this.quantityUnit = $('[name="salePriceUnit"]').val()
      this.salePriceUnit = `元/${this.quantityUnit}`
    } else if (this.productType === 2) { // 辅料
      this.quantityUnit = $('[name="salePriceUnit"]').val()
        this.salePriceUnit = `元/${this.quantityUnit}`
    }

    itemDoms.each((i, item) => {
      const $item = $(item)
      const colorNum = $item.find('.J_color').val() ? $item.find('.J_color').val().trim().replace(/([,|，])/g, '') : '';
      const quantity = $item.find('.J_num').val().trim().replace(/([,|，])/g, '');
      const salePrice = $item.find('.J_salePrice').val() ? $item.find('.J_salePrice').val().trim().replace(/([,|，])/g, '') : 0
      const price = $item.find('.J_price').val() ? $item.find('.J_price').val().trim().replace(/([,|，])/g, '') : 0
      const buyPrice = $item.find('.J_buy_price').val() ? $item.find('.J_buy_price').val().trim().replace(/([,|，])/g, '') : 0
      const id = $item.find('.J_id').attr('data-value')
      // const buyProductId = $item.find('.J_buyProductId').attr('data-value')
      const outMaZhiRemark = $item.find('.J_outMaZhiRemark').val()
      const productNumber = $item.find('.J_productNumber').val()
      const tempObj = {
        color: colorNum,
        quantity,
        quantityUnit: this.quantityUnit,
        salePrice,
        salePriceUnit: this.salePriceUnit,
        price,
        priceUnit: this.salePriceUnit,
        buyPrice,
        buyPriceUnit: this.salePriceUnit,
        outMaZhiRemark: outMaZhiRemark
      }
      let tempObjForUpdate = {}
      let tempObjForDetail = {}
      tempObjForUpdate = $.extend(tempObjForUpdate, tempObj, {
        id
        // buyProductId
      })
      tempObjForDetail = $.extend(tempObjForDetail, tempObj, {
        id
        // buyProductId
      })
      newProductListForDetail.push(tempObjForDetail)
      newProductListForUpdate.push(tempObjForUpdate)
    })
    return {
      newProductListForDetail,
      newProductListForUpdate,
    }
  }
  doCaculate() {
    const items = $('.J_items')
    let prospect = 0
    const allPriceArr = []
    items.each((key, doms) => {
      const perPrice = Number($(doms).find('.J_salePrice').val())
      const perNum = Number($(doms).find('.J_num').val())
      allPriceArr.push(perNum * perPrice)
    })
    allPriceArr.map((key) => {
      prospect = prospect + key
    })
    $('.J_prospect_salePrice').text(this.formatCurrency(prospect))
  }
  formatCurrency(number) {
    return parseFloat(number, 10).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  }
  // 校验
  doChecked(e) {
    const target = e.currentTarget ? $(e.currentTarget) : e
    const items = target.parents('li.J_need_item')
    const validArr = []
    this.change = true
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
    $('.J_outMaZhiRemark').each((i, item) => {
      if ($(item).val().length > 20) {
        validArr.push('false')
        this.showTips($(item))
        $(item).focus()
        $.toast('客户设计款号不能超过20字符')
        return false
      } else {
        this.hideTips($(item))
      }
    })
    if (target.val() === '') {
      validArr.push('false')
      this.showTips(target)
    } else {
      this.hideTips(target)
    }
    let unitInput = null
    if (this.productType === 1) { // 面料
      unitInput = $('[name="salePriceUnit"]')
    } else if (this.productType === 2) {
      unitInput = $('[name="salePriceUnit"]')
    }
    if (!unitInput.val()) {
      validArr.push('false')
      this.showTips($('[name="salePriceUnit"]'))
    } else {
      this.hideTips(unitInput)
    }

    // $('.J_buy_price').each((i, item) => {
    //   // 采购价
    //   let self = $(item)
    //   let val = self.val()
    //   let price = self.parents('div.J_items').find('.J_price').val()
    //   if ( (parseFloat(price) <= 0 || parseFloat(val) <= 0) || ( parseFloat(price) > 0 && parseFloat(val) < parseFloat(price)) ) {
    //     validArr.push('false')
    //     // $.toast("采购价需要大于成本价")
    //     this.showTips(self);
    //   } else {
    //     this.hideTips(self)
    //   }
    // })

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
}
export default new Page()
