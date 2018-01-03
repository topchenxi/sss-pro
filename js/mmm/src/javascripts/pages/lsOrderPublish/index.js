/*
  *name  发布流水订单
  *author  yonghuang
 */
import '../../common/base.js'
import { getCache, setCache, imgPath, getParam, clearListCache, setLastPage, getLastPage } from '../../common/utils'
import orderApi from '../../api/order'
import lrz from '../../vendor/lrz'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.render()
  }
  render() {
    const that = this
    // 表示进来该页面是否有操作
    this.change = false
    that.host = location.host
    // 是否是编辑页面
    that.orderNumber = getParam('orderNumber')
    that.edit = getParam('edit')
    // 供应商信息
    this.sellerInfo = getCache({
      key: 'sellerInfo',
      type: 'sessionStorage',
      dataType: 'json'
    })
    // 供应商收款方式
    this.sellerAccounts = getCache({
      key: 'sellerAccounts',
      type: 'sessionStorage',
      dataType: 'json'
    })
    // 采购商信息
    this.buyerInfo = getCache({
      key: 'buyerInfo',
      type: 'sessionStorage',
      dataType: 'json'
    })
    this.firstStepTemp = getCache({
      key: 'firstStepTemp',
      type: 'sessionStorage',
      dataType: 'json'
    })
    this.renderData = {}
    let info = {}
    if (this.firstStepTemp) {
      info = {
        madanImgUrls: this.firstStepTemp.madanImgUrls,
        productType: this.firstStepTemp.productType || 1,
        productNumber: this.firstStepTemp.productNumber,
        fullMoney: this.firstStepTemp.fullMoney,
        taxMoney: this.firstStepTemp.taxMoney,
        serviceMoney: this.firstStepTemp.serviceMoney
      }
      if (this.firstStepTemp.productList && this.firstStepTemp.productList.length) {
        info.productList = this.firstStepTemp.productList
      }
      this.change = true
      that.toRender(info)
    } else if (!this.orderNumber) {
      info = {
        productType: this.firstStepTemp.productType || 1
      }
      that.toRender(info)
    } else if (that.orderNumber) {
      $.showPreloader()
      request({
        url: orderApi.getDetail,
        data: {
          orderNumber: that.orderNumber,
          _time: that._time
        },
        callback(data) {
          $.hidePreloader()
          if (data.success == 1) {
            setCache({
              type: 'sessionStorage',
              key: 'orderDetail',
              value: data
            })
            that.orderDetail = data
            const obj = data.obj
            // 从详情中获取供应商收款方式
            if (!that.sellerAccounts) {
              that.sellerAccounts = {
                replyAccountUser: obj.replyAccountUser,
                replyAccountCompany: obj.replyAccountCompany,
                replyAccountNumber: obj.replyAccountNumber,
                replyAccountBank: obj.replyAccountBank,
                replyAccountBranch: obj.replyAccountBranch,
                province: obj.replyAccountProvince,
                city: obj.replyAccountCity,
                bankShort: obj.replyAccountBankShort, // 银行缩写
                bankId: obj.replyAccountBankId, // 银联号
                type: obj.replyAccountType, // 账号类型
                id: obj.bankAccountId,
              }
              setCache({
                type: 'sessionStorage',
                dataType: 'json',
                key: 'sellerAccounts',
                value: that.sellerAccounts
              })
            }
            console.log(that.sellerInfo)
            console.log(obj)
            if (!that.sellerInfo) {
              that.sellerInfo = {
                id: obj.shopId,
                company: obj.company,
                tel: obj.tel,
                addr: obj.addr,
                province: obj.province,
                area: obj.area,
                city: obj.city
              }
              setCache({
                type: 'sessionStorage',
                dataType: 'json',
                key: 'sellerInfo',
                value: that.sellerInfo
              })
            }
            if (!that.buyerInfo) {
              that.buyerInfo = obj.buyer
              setCache({
                type: 'sessionStorage',
                dataType: 'json',
                key: 'buyerInfo',
                value: obj.buyer
              })
            }
            info = {
              madanImgUrls: obj.madanImgUrls,
              productType: obj.productType,
              productNumber: obj.productNumber,
              fullMoney: obj.fullMoney,
              taxMoney: obj.taxMoney,
              serviceMoney: obj.serviceMoney,
              productList: obj.productList,
              orderNumber: obj.orderNumber
            }
            that.toRender(info)
          } else {
            $.toast(data.msg)
          }
        }
      })
    }
  }
  toRender(info) {
    const that = this
    const tpl = 'lsOrderPublish/index.html'
    this.renderData = {
      imagesPath: imgPath,
      buyerInfo: that.buyerInfo,
      sellerInfo: that.sellerInfo,
      sellerAccounts: that.sellerAccounts
    }
    console.log(this.renderData)
    // 个人或者企业都是replyAccountUser来展示 在展示的情况下
    // if (that.sellerAccounts) {
    //   this.renderData.sellerAccounts.replyAccountUser = that.sellerAccounts.type == 1 ? that.sellerAccounts.replyAccountCompany : that.sellerAccounts.replyAccountUser
    // }
    if (that.orderNumber) {
      info.orderNumber = that.orderNumber
    }
    if (that.edit == 1) {
      info.edit = that.edit
    }
    $.extend(that.renderData, info)
    nunjucks.render(tpl, that.renderData).then((lsOrderPublishHtml) => {
      that.$contet = $('.J_content')
      that.$contet.html(lsOrderPublishHtml)
      that.bindEvents()
      that.doCaculate('init')
    })
  }
  bindEvents() {
    const saveBtn = $('.J_save')
    const imgFile = $('#img-file')
    const imgDom = $('.J_has_upload')
    const backBtn = $('.J_back') // 返回键
    const selectBuyer = $('.J_select_buyer') // 选择采购商
    const sellerEdit = $('.J_seller_edit') // 编辑供应商
    const sellerAccountsEdit = $('.J_sellerAccounts_edit') // 编辑供应商
    const imgTpl = 'imgTpl.html'
    this.formDom = $('form')
    const $productType = $('input[name="productType"]')
    const $productNumber = $('input[name="productNumber"]')
    // 色号部分
    const addColor = $('.J_add_more') // 增加色号
    const colorTpl = 'lsOrderPublish/colorTpl.html'
    this.colorListEventBind() // 色号列表事件绑定
    // 费用明细部分
    const $fullMoney = $('input[name="fullMoney"]')
    const $taxMoney = $('input[name="taxMoney"]')
    const $serviceMoney = $('input[name="serviceMoney"]')
    if (this.firstStepTemp) {
      this.doChecked($productNumber)
    }
    const that = this
    // 焦点以上校验
    $productType.change((e) => {
      this.doChecked(e)
      this.hideTips($(e.currentTarget))
      this.change = true
      const type = $(e.currentTarget).val()
      this.productType = type
      this.changeUnitDom(type)
      this.doChecked(e)
    })
    $productNumber.on('input', (e) => {
      const val = $(e.currentTarget).val()
      if (!val) {
        this.showTips($(e.currentTarget))
      } else {
        this.hideTips($(e.currentTarget))
      }
      this.doChecked(e)
      this.change = true
    })
    $fullMoney.on('input', (e) => {
      const val = $(e.currentTarget).val()
      if (val && val >= 0) {
        this.hideTips($(e.currentTarget))
      } else if (val < 0) {
        $(e.currentTarget).val('0.00')
      }
      this.doFeedCaculate()
      this.doChecked(e)
      this.change = true
    })
    $taxMoney.on('input', (e) => {
      const val = $(e.currentTarget).val()
      if (val && val >= 0) {
        this.hideTips($(e.currentTarget))
      } else if (val < 0) {
        $(e.currentTarget).val('0.00')
      }
      this.doFeedCaculate()
      this.doChecked(e)
      this.change = true
    })
    $serviceMoney.on('input', (e) => {
      const val = $(e.currentTarget).val()
      if (val && val >= 0) {
        this.hideTips($(e.currentTarget))
      } else if (val < 0) {
        $(e.currentTarget).val('0.00')
      }
      this.doFeedCaculate()
      this.doChecked(e)
      this.change = true
    })
    selectBuyer.on('click', () => {
      const formData = this.gatherFormData()
      if ($('.J_save').hasClass('disabled')) {
        formData.disabled = true
      } else {
        formData.disabled = false
      }
      setCache({
        type: 'sessionStorage',
        dataType: 'json',
        value: formData,
        key: 'firstStepTemp'
      })
      setLastPage()
      location.href = '/buyerList.html?source=lsOrderPublish'
      return false
    })
    sellerEdit.on('click', () => {
      const formData = this.gatherFormData()
      if ($('.J_save').hasClass('disabled')) {
        formData.disabled = true
      } else {
        formData.disabled = false
      }
      setLastPage()
      setCache({
        type: 'sessionStorage',
        dataType: 'json',
        value: formData,
        key: 'firstStepTemp'
      })
      location.href = '/sellerList.html'
      return false
    })
    // 供应商付款方式编辑
    sellerAccountsEdit.on('click', () => {
      const formData = this.gatherFormData()
      if (!that.sellerInfo.id) {
        $.alert('请先选择供应商')
        return false
      }
      if ($('.J_save').hasClass('disabled')) {
        formData.disabled = true
      } else {
        formData.disabled = false
      }
      setLastPage()
      location.href = `/sellerAccountsList.html?shopId=${that.sellerInfo.id}`
      setCache({
        type: 'sessionStorage',
        dataType: 'json',
        value: formData,
        key: 'firstStepTemp'
      })
      return false
    })
    // 增加色号
    addColor.on('click', () => {
      const length = $('.J_color_block>li').length
      nunjucks.render(colorTpl, {
        productType: $('input[name="productType"]:checked').val(), // 品类 1 面料 2 辅料
        length: length + 1
      }).then((lsOrderPublishHtml) => {
        const colorDoms = $('.J_color_block')
        colorDoms.append(lsOrderPublishHtml)
        this.colorListEventBind()
        this.doChecked($('.J_items').last().find('.J_price'))
      })
    })
    backBtn.on('click', () => {
      if (this.change) {
        $.modal({
          title: '尚未提交订单',
          text: '继续返回，已填内容将不会被保留',
          buttons: [
            {
              text: '继续返回',
              onClick: () => {
                sessionStorage.removeItem('sellerInfo')
                sessionStorage.removeItem('sellerAccounts')
                sessionStorage.removeItem('buyerInfo')
                sessionStorage.removeItem('firstStepTemp')
                if (this.orderNumber) {
                  location.href = '/shopCartList.html?Tabkey=fk&category=all-all'
                } else {
                  location.href = getLastPage()
                }
                return false
              }
            },
            {
              text: '继续填写'
            }
          ]
        })
        return false
      } else {
        if (this.orderNumber) {
          location.href = '/shopCartList.html?Tabkey=fk&category=all-all'
        } else {
          location.href = getLastPage()
        }
        return false
      }
    })
    imgDom.on('click', '.J_img_preview', () => {
      const imgUrl = []
      $('.J_img_preview img').each((e, value) => {
        let src = $(value).attr('src')
        if (src.indexOf('@') != -1) {
          src = src.slice(0, src.indexOf('@'))
        }
        imgUrl.push(src)
      })
      const myPhotoBrowserPopup = $.photoBrowser({
        photos: imgUrl,
        type: 'popup'
      })
      myPhotoBrowserPopup.open()
    })
    // 删除图片
    imgDom.on('click', '.J_img_del', (e) => {
      const target = $(e.currentTarget)
      this.change = true
      this.doChecked($('.J_items').last().find('.J_price'))
      target.parents('.J_upload_img').remove()
    })
    imgFile.unbind('change').on('change', function() {
      let $that = $(this)
      $.each(this.files, (i, files) => {
        lrz(files, {
          width: 1280,
          height: 1280,
          quality: 40
        })
        .then((rst) => {
          $.showPreloader();
          // 处理成功会执行
          rst.formData.append('field', 'imgUrl');
          const option = {
            url: '/redwood/sys/Common/uploadFile.do?type=5&time=' + that._time,
            type: 'POST',
            data: rst.formData,
            processData: false, // 告诉jQuery不要去处理发送的数据
            contentType: false, // 告诉jQuery不要去设置Content-Type请求头
            success: (data) => {
              $.hidePreloader();
              if (data.success == 1) {
                const obj = {}
                obj.link = data.imgUrl
                obj.previewlink = rst.base64
                nunjucks.render(imgTpl, obj).then((imgHtml) => {
                  const hasUploadNum = $('.J_upload_img').length
                  if (hasUploadNum >= 9) {
                    $.toast('最多只能上传9张')
                    return
                  }
                  imgDom.prepend(imgHtml)
                  that.change = true
                  that.doChecked($('input[name="productType"]'))
                })
              } else {
                $.alert(data.msg)
              }
              $that.val(null)
            },
            error: () => {
              $.hidePreloader();
              $.alert('上传失败')
            }
          }
          $.ajax(option);
        })
        .catch((err) => {
          // 处理失败会执行
          $.alert(err)
        })
        .always(() => {
          // 不管是成功失败，都会执行
          // $.hidePreloader()
        });
      });
    })
    // 保存
    saveBtn.on('click', (e) => {
      if ($(e.currentTarget).hasClass('disabled')) return
      const formData = that.gatherFormData()
      formData._time = that._time
      formData.madanImgUrls = JSON.stringify(formData.madanImgUrls)
      formData.productList = JSON.stringify(formData.productList)
      $.modal({
        title: '提交后请到支付页付款？',
        buttons: [
          {
            text: '确定',
            onClick: () => {
              $.showPreloader()
              request({
                url: formData.orderNumber ? orderApi.updateLs : orderApi.commitLs,
                data: formData,
                cache: false,
                callback: (data) => {
                  $.hidePreloader();
                  if (data.success == '1') {
                    clearListCache()
                    sessionStorage.removeItem('sellerInfo')
                    sessionStorage.removeItem('sellerAccounts')
                    sessionStorage.removeItem('buyerInfo')
                    sessionStorage.removeItem('firstStepTemp')
                    if (formData.orderNumber) {
                      location.href = '/shopCartList.html?Tabkey=fk&category=all-all'
                    } else {
                      location.href = `/orderDetail.html?orderNumber=${data.obj.orderNumber}`
                    }
                    return false
                  } else {
                    $.alert(data.msg)
                  }
                }
              })
            }
          },
          {
            text: '取消'
          }]
      })
    })
  }
  /*
    type = 1 表示面料 2 表示辅料
   */
  changeUnitDom(type) {
    const unitDomClass = type == 2 ? '.J_fuliao_input' : '.J_mianliao_input'
    // 单位输入框 父级
    $('.J_unit_input').addClass('fn-hidden')
    $(unitDomClass).removeClass('fn-hidden')
    // 单位输入框本体
    $('.J_priceUnit').addClass('fn-hidden')
    $(unitDomClass).find('.J_priceUnit').removeClass('fn-hidden')
    // 修改品类的时候 单位先全部置空
    $('.J_quantityUnit').text('')
    $('.J_priceUnit[type="text"]').val('')
    $('.J_priceUnit[type="radio"]').prop('checked', false)
  }
  colorListEventBind() {
    const delColorBtn = $('.J_del')
    const priceUnit = $('.J_priceUnit')
    const priceInput = $('.J_price')
    const colorInput = $('.J_color')
    const numInput = $('.J_num')
    // 删除色卡
    delColorBtn.unbind('click').on('click', (e) => {
      const target = $(e.currentTarget)
      const colorLength = $('.J_color_block>li').length
      if (colorLength == 1) {
        $.toast('至少有一组色卡信息')
        return false
      } else {
        target.parent('li').remove()
      }
      this.doChecked($('.J_items').last().find('.J_price'))
      this.doCaculate()
    })
    priceUnit.unbind('input change').on('input change', (e) => {
      const target = $(e.currentTarget)
      const type = target.attr('type')
      const name = target.attr('name')
      const val = type == 'radio' ? $(`input[name="${name}"]:checked`).val() : target.val()
      const unit = target.parents('.J_items').find('.J_quantityUnit')
      unit.text(val)
      if (!val) {
        this.showTips($(e.currentTarget))
      } else {
        this.hideTips($(e.currentTarget))
      }
      this.doCaculate()
      this.doChecked(e)
    })
    // 输入单价
    priceInput.unbind('input').on('input', (e) => {
      const val = $(e.currentTarget).val()
      if (!val) {
        this.showTips($(e.currentTarget))
      } else {
        this.hideTips($(e.currentTarget))
      }
      this.doCaculate()
      this.doChecked(e)
    })
    // 输入色号
    colorInput.unbind('input').on('input', (e) => {
      const val = $(e.currentTarget).val()
      if (!val) {
        this.showTips($(e.currentTarget))
      } else {
        this.hideTips($(e.currentTarget))
      }
      this.doChecked(e)
    })
    // 输入数量
    numInput.unbind('input').on('input', (e) => {
      const val = $(e.currentTarget).val()
      if (!val) {
        this.showTips($(e.currentTarget))
      } else {
        this.hideTips($(e.currentTarget))
      }
      this.doCaculate()
      this.doChecked(e)
    })
  }
  gatherFormData() {
    const imgDoms = $('.J_has_upload').find('.J_upload_img')
    const formArray = this.formDom.serializeArray()
    const formData = {}
    formArray.map((item, val) => {
      formData[item.name] = item.value
    })
    formData.madanImgUrls = []
    imgDoms.each((key, dom) => {
      formData.madanImgUrls.push($(dom).find('a').attr('data-link'))
    })
    formArray.map((key) => {
      formData[key.name] = key.value
    })
    formData.productList = this.gatherProudctList()
    // 收集 费用明细
    formData.fullMoney = $('input[name="fullMoney"]').val()
    formData.taxMoney = $('input[name="taxMoney"]').val()
    formData.serviceMoney = $('input[name="serviceMoney"]').val()
    // console.log(formData)
    return formData
  }
  // 收集色卡信息
  gatherProudctList() {
    const itemDoms = $('.J_items')
    let newProductList = []
    itemDoms.each((i, item) => {
      const $item = $(item)
      console.log($item.find('.J_price').val())
      const colorNum = $item.find('.J_color').val().trim().replace(/([,|，])/g, '');
      const quantity = $item.find('.J_num').val().trim().replace(/([,|，])/g, '');
      const quantityUnit = $item.find('.J_quantityUnit').text().trim().replace(/([,|，])/g, '');
      const price = $item.find('.J_price').val() ? $item.find('.J_price').val() : 0
      const buyProductId = $item.find('.J_buyProductId').attr('data-value')
      if (!colorNum || !quantity || !price || !quantityUnit) {
        return false
      }
      const tempObj = {
        color: colorNum,
        quantity,
        quantityUnit,
        priceUnit: `元/${quantityUnit}`,
        price
      }
      let tempObjForUpdate = {}
      if (buyProductId) {
        tempObj.buyProductId = buyProductId
      }
      tempObjForUpdate = $.extend(tempObjForUpdate, tempObj)
      newProductList.push(tempObjForUpdate)
    })
    return newProductList
  }
  doFeedCaculate() {
    const $fullMoney = $('input[name="fullMoney"]')
    const $taxMoney = $('input[name="taxMoney"]')
    const $serviceMoney = $('input[name="serviceMoney"]')
    const prospect = this.formatCurrency(Number($fullMoney.val()) + Number($taxMoney.val()) + Number($serviceMoney.val()))
    $('.J_prospect_price').text(prospect)
  }
  doCaculate(type) {
    const that = this
    const items = $('.J_items')
    let fullMoney = 0
    let prospect = 0
    const allPriceArr = []
    items.each((key, doms) => {
      const perPrice = Number($(doms).find('.J_price').val())
      const perNum = Number($(doms).find('.J_num').val())
      allPriceArr.push(perNum * perPrice)
    })
    allPriceArr.map((key) => {
      fullMoney = fullMoney + key
    })
    if (type != 'init' && !that.tempObjForUpdate) {
      $('input[name="fullMoney"]').val(parseFloat(fullMoney, 10).toFixed(2))
    }
    this.hideTips($('input[name="fullMoney"]'))
    prospect = Number($('input[name="fullMoney"]').val()) + Number($('input[name="taxMoney"]').val()) + Number($('input[name="serviceMoney"]').val())
    $('.J_prospect_price').text(this.formatCurrency(prospect))
  }
  formatCurrency(number) {
    return parseFloat(number, 10).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  }
  doChecked(e) {
    const items = e.currentTarget ? $(e.currentTarget).parents('.J_need_item') : $(e).parents('.J_need_item')
    const that = this
    const validArr = []
    const hasUploadNum = $('.J_upload_img').length
    items.prevAll().each((i, item) => {
      const input = $(item).find('input').not('.fn-hidden')
      let val = ''
      if (input.attr('type') == 'radio') {
        const name = input.attr('name')
        val = $(`input[name='${name}']:checked`).val()
      } else {
        val = input.val()
      }
      if (val === '' || val === undefined) {
        that.showTips(input)
      }
    })
    $('.J_need_item').each((i, item) => {
      const input = $(item).find('input').not('.fn-hidden')
      let val = ''
      if (input.attr('type') === 'radio') {
        const name = input.attr('name')
        val = $(`input[name='${name}']:checked`).val()
      } else {
        val = input.val()
      }
      if (val === '' || val === undefined) {
        validArr.push('false')
      }
    })
    if (!hasUploadNum) {
      validArr.push('false')
      that.showTips($('.J_has_upload'))
    } else {
      that.hideTips($('.J_has_upload'))
    }
    if ($(e.currentTarget ? e.currentTarget : e).val() === '') {
      validArr.push('false')
      that.showTips($(e.currentTarget ? e.currentTarget : e))
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
}
export default new Page()
