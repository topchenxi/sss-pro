/*
  author  yonghuang
 */
// import { request } from '../../common/base'
import '../../common/base.js'
import { getCache, setCache, getParam, imgPath, formatTimeString } from '../../common/utils'
import lrz from '../../vendor/lrz'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.render()
  }
  render() {
    const that = this
    // 模板
    const tpl = 'proNumber/index.html'
    that.type = getParam('type') // 编辑货号还是新增货号
    that.index = getParam('index') // 货号序号
    that.source = getParam('source') // 来源
    that.productNumList = getCache({ // 获取货号列表
      key: 'productNumList',
      dataType: 'json',
      tyep: 'sessionStorage'
    })
    let colorList = null
    let productType = null
    let imgUrls = null
    let productNumber = null
    let expectedArrivalDateString = ''
    if (that.type == 'edit') { // 编辑
      that.productList = that.productNumList[that.index]
      colorList = that.productList.colorList
      productType = that.productList.productType
      expectedArrivalDateString = that.productList.expectedArrivalDate ? formatTimeString(that.productList.expectedArrivalDate).split(' ')[0] : ''
      productNumber = that.productList.productNumber
      imgUrls = that.productList.imgUrls
      that.unit = that.productList.colorList[0].priceUnit
    } else if (that.type == 'add') { // 新增货号
      that.productList = null
    }
    that.data = {
      productType,
      colorList,
      expectedArrivalDateString,
      imgPath,
      imgUrls,
      productNumber,
      type: that.type,
      source: that.source
    }
    // 将一些变量设置成全局
    that.productType = Number(productType)
    nunjucks.render(tpl, that.data).then((proNumberHtml) => {
      that.$page = $('#proNumber')
      that.$page.html(proNumberHtml)
      that.bindEvents()
      if (that.type == 'edit') {
        that.unitRender({
          productType,
          colorList
        })
      }
      // that.doCaculate() // 计算一次价格
    })
  }
  bindEvents() {
    const that = this
    that.change = false // 是否有改动
    const colorBlock = $('.J_color_block')
    const whBlock = $('.J_weight_height')
    const addMoreBtn = $('.J_add_more')
    const saveBtn = $('.J_save')
    let $productType = $('input[name="productType"]') // 品类
    let $productNumber = $('input[name="productNumber"]') // 品类
    const changeAllPrice = $('.J_change_all')
    const backBtn = $('.J_back')
    const imgFile = $('#img-file')
    const imgDom = $('.J_has_upload')
    const clearBtn = $('.J_clear')
    const imgTpl = 'imgTpl.html'
    // 切换品类
    $productType.on('change', (e) => {
      const productType = $(e.currentTarget).val()
      const unitRenderData = {
        productType
      }
      that.productType = productType
      if (productType == 1) {
        $('.J_name_label').text('货号')
        $('.J_color_label').text('色号')
      } else {
        $('.J_name_label').text('品名')
        $('.J_color_label').text('颜色')
      }
      that.unitRender(unitRenderData)
      // 切换品类 单位清空
      $('.J_unit').html('')
      $('.J_quantityUnit').html('')
      that.unit = ''
      that.change = true
    })
    // 清除时间
    clearBtn.on('click', () => {
      // $('input[name="expectedTime"]').val('')
      $('input[name="expectedArrivalDate"]').val('')
    })
    // 返回
    backBtn.on('click', () => {
      if (this.change) {
        $.modal({
          title: '是否确定返回',
          text: '继续返回，已填内容将不会被保留',
          buttons: [
            {
              text: '确定',
              onClick: () => {
                history.go(-1)
                // sessionStorage.removeItem('productNumList')
                // location.href = this.backLink
                return false
              }
            },
            {
              text: '取消'
            }
          ]
        })
      } else {
        history.go(-1)
        return false
      }
    })
    // 预计到货时间
    $('[name="expectedArrivalDate"]').calendar({})
    $('[name="expectedArrivalDate"]').change((e) => {
      that.change = true
      that.doChecked(e)
    })
    // 货号输入
    $productNumber.on('input', (e) => {
      this.doChecked(e)
    })
    // 修改单价的时候 重新计算估价
    colorBlock.on('input', '.J_price', (e) => {
      let val = Number($(e.currentTarget).val())
      if (val < 0) {
        val = 0
        $(e.currentTarget).val(val)
      }
      // this.doCaculate()
      this.doChecked(e)
    })
    // 修改数量的时候要计算估价
    colorBlock.on('input', '.J_num', (e) => {
      let val = Number($(e.currentTarget).val())
      if (val < 0) {
        val = 0
        $(e.currentTarget).val(val)
      }
      // this.doCaculate()
      // 焦点以上 校验
      this.doChecked(e)
    })
    // 修改色号
    colorBlock.on('input', '.J_color', (e) => {
      // 焦点以上 校验
      this.doChecked(e)
    })
    // 修改幅宽克重
    whBlock.on('input', '.J_replyWidth', (e) => {
      let val = Number($(e.currentTarget).val())
      if (val < 0) {
        val = 0
        $(e.currentTarget).val(val)
      }
      // 焦点以上 校验
      this.doChecked(e)
    })
    // 修改幅宽克重
    whBlock.on('input', '.J_replyWeigth', (e) => {
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
      let unitInput = '';
      let colorName = ''
      if (!that.productType || !that.unit) {
        $.toast('请选择品类和单位')
        return
      }
      if (this.productType == 1) { // 面料
        unitInput = $('input[name="priceUnit"]:checked')
        colorName = '色号'
      } else if (this.productType == 2) { // 辅料
        unitInput = $('input[name="priceUnit"]')
        colorName = '颜色'
      }
      const price = colorBlock.children('li').last().find('.J_price').val() || ''
      const unit = unitInput.val() || ''
      if (this.data.type === '辅料') {
        unitWrapHtml = `<input type="number" class="col-40 J_price" value="${price}" placeholder="单价">
            <span class="col-15 unit">元/</span>
            <span class="col-40 J_unit unit">元/${unit}</span>`
      } else {
        unitWrapHtml = `<input type="number" class="col-50 J_price" value="${price}" placeholder="请输入单价">
        <span class="J_unit col-50 unit">元/${unit}</span>`
      }
      const html = `<li class="row no-gutter">
                <div class="col-80 item-content J_items">
                    <ul>
                    <li class="J_need_item">
                        <div class="item-inner">
                            <div class="item-title label">单价 <span class="tips warning-text fn-hide ">&nbsp;!</span></div>
                            <div class="item-input row no-gutter">${unitWrapHtml}</div>
                        </div>
                    </li>
                    <li class="J_need_item">
                        <div class="item-inner"><div class="item-title label J_color_label"> ${colorName}<span class="tips warning-text fn-hide ">&nbsp;!</span></div>
                        <input type="text" placeholder="请输入色号" class="J_color">
                        </div>
                    </li>
                    <li class="J_need_item">
                        <div class="item-inner">
                          <div class="item-title label">数量 <span class="tips warning-text fn-hide ">&nbsp;!</span></div>
                          <div class="item-input row no-gutter">
                            <input type="number" placeholder="必填" class='J_num quantity col-50' value= ''>
                            <span class='col-25 unit J_quantityUnit'>${unit}</span>
                          </div>
                        </div>
                    </li>
                    </ul>
                </div>
                <div class="col-20 del warning-text item-link J_del">删除</div></li>`
      colorBlock.append(html)
      this.doChecked($('.J_items').last().find('.J_price'))
    })
    // 删除色号 也需要重新计算估价
    colorBlock.on('click', '.J_del', (e) => {
      $(e.target).parents('li').remove()
      // this.doCaculate()
      if (!$('.J_items').last().find('.J_price').length) {
        saveBtn.addClass('disabled')
        that.change = true
      } else {
        this.doChecked($('.J_items').last().find('.J_price'))
      }
    })
    // 一键修改 所有单价 录入大货编辑态的时候才会出现
    changeAllPrice.on('click', () => {
      const modal = $.modal({
        title: '修改色号单价',
        text: '此操作将改变所有色号的单价',
        afterText: '<input type="number" class="prompt-text" placeholder="请输入单价，纯数字"/>',
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
                $('.J_price').val(val)
                $.closeModal(modal)
                this.doChecked($('.J_items').last().find('.J_price'))
                // this.doCaculate()
              } else {
                $.toast('请输入单价')
                $('.prompt-text').focus()
              }
              // $.closeModal(modal)
            }
          }
        ]
      })
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
      that.change = true
      target.parents('.J_upload_img').remove()
      that.doChecked($('input[name="productNumber"]'))
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
            url: '/redwood/sys/Common/uploadFile.do?type=0&time=' + that._time,
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
                  that.doChecked($('input[name="productNumber"]'))
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
    // 修改或者创建
    saveBtn.on('click', (e) => {
      const target = $(e.currentTarget)
      if (target.hasClass('disabled')) return
      const itemDoms = $('.J_items')
      const newColorListForDetail = []
      const newColorListForUpdate = []
      if (this.productType == 1) { // 面料
        this.quantityUnit = $('input[name="priceUnit"]:checked').val()
        this.priceUnit = `元/${this.quantityUnit}`
      } else if (this.productType == 2) { // 辅料
        this.quantityUnit = $('input[name="priceUnit"]').val()
        this.priceUnit = `元/${this.quantityUnit}`
      }
      itemDoms.each((i, item) => {
        const $item = $(item)
        const colorNum = $item.find('.J_color').val().trim().replace(/([,|，])/g, '');
        const quantity = $item.find('.J_num').val().trim().replace(/([,|，])/g, '');
        const price = $item.find('.J_price').val() ? $item.find('.J_price').val().trim().replace(/([,|，])/g, '') : 0
        const id = $item.find('.J_id').attr('data-value')
        const buyProductId = $item.find('.J_buyProductId').attr('data-value')
        const tempColorList = {
          color: colorNum,
          quantity,
          quantityUnit: this.quantityUnit,
          price,
          priceUnit: this.priceUnit
        }
        let tempColorListForUpdate = {}
        let tempColorListForDetail = {}
        tempColorListForUpdate = $.extend(tempColorListForUpdate, tempColorList, {
          buyProductId
        })
        tempColorListForDetail = $.extend(tempColorListForDetail, tempColorList, {
          id,
          buyProductId
        })
        newColorListForDetail.push(tempColorListForDetail)
        newColorListForUpdate.push(tempColorListForUpdate)
      })
      let productNumList = $.extend([], this.productNumList)
      const formData = that.gatherFormData()
      let tempProductList = {
        colorList: newColorListForDetail,
        priceUnit: this.priceUnit
      }
      tempProductList = $.extend(tempProductList, formData)
      if (this.type == 'add') { // 新增一个货号 否则只是更新货号信息
        productNumList.push(tempProductList)
      } else if (this.type == 'edit') {
        productNumList[this.index] = tempProductList
      }
      // 检查色号是否重复
      const colorNameList = []
      newColorListForDetail.map((item, i) => {
        colorNameList.push(item.color)
      })
      const repeatColor = that.isRepeat(colorNameList)
      if (repeatColor) {
        $.alert(`色号'${repeatColor}'已经存在`)
        return false
      }
      // 检查货号是否重复
      const productNameList = []
      productNumList.map((item, i) => {
        productNameList.push(item.productNumber)
      })
      const repeatProduct = that.isRepeat(productNameList)
      if (repeatProduct) {
        $.alert(`货号'${repeatProduct}'已经存在`)
        return false
      }
      setCache({
        key: 'productNumList',
        datType: 'json',
        value: productNumList,
        tyep: 'sessionStorage'
      })
      history.go(-1)
    })
  }
  unitRender(unitRenderData) {
    const that = this
    const unitTpl = 'proNumber/unitTpl.html'
    nunjucks.render(unitTpl, unitRenderData).then((proNumberHtml) => {
      const block = $('.J_unit_block')
      block.html(proNumberHtml)
      that.unitBindEvents()
      if (that.type == 'add') { // 在新增的时候才需要出发这个检测
        that.doChecked($('input[name="productType"]'))
      }
    })
  }
  unitBindEvents() {
    const that = this
    let unitInput = $('input[name="priceUnit"]')
    // 修改单位
    unitInput.on('input change', (e) => {
      const val = $(e.target).val() || ''
      const unitDom = $('.J_unit')
      that.unit = val
      unitDom.html(`元/${val}`)
      $('.J_quantityUnit').html(val)
      if ((this.source === 'inputInfo' || this.source === 'inputFinal') && val === '千克') { // 录入大货的时候需要填写幅宽和克重
        $('.J_weight_height').removeClass('fn-hide')
        $('.J_weight_height li').addClass('J_need_item')
      } else if ((this.source === 'inputInfo' || this.source === 'inputFinal') && val !== '千克') {
        $('.J_weight_height').addClass('fn-hide')
        $('.J_weight_height li').removeClass('J_need_item')
      }
      that.doChecked($('input[name="productNumber"]'))
      that.doChecked(unitInput)
    })
  }
  gatherFormData() {
    const that = this
    const imgDoms = $('.J_has_upload').find('.J_upload_img')
    const expectedArrivalDate = $('input[name="expectedArrivalDate"]').val()
    const formData = {
      _time: this._time
    }
    formData.imgUrls = []
    imgDoms.each((key, dom) => {
      formData.imgUrls.push($(dom).find('a').attr('data-link'))
    })
    // if (formData.imgUrls) {
    //   formData.imgUrls = JSON.stringify(formData.imgUrls)
    // }
    formData.productType = that.productType
    formData.expectedArrivalDate = expectedArrivalDate ? new Date(expectedArrivalDate).getTime() : ''
    formData.productNumber = $('input[name="productNumber"]').val()
    return formData
  }
  doCaculate() {
    const items = $('.J_items')
    let prospect = 0
    const allPriceArr = []
    items.each((key, doms) => {
      const perPrice = Number($(doms).find('.J_price').val())
      const perNum = Number($(doms).find('.J_num').val())
      allPriceArr.push(perNum * perPrice)
    })
    allPriceArr.map((key) => {
      prospect = prospect + key
    })
    $('.J_prospect_price').text(this.formatCurrency(prospect))
  }
  formatCurrency(number) {
    return parseFloat(number, 10).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  }
  isRepeat(arr) {
    var hash = {};
    for (var i in arr) {
      if (hash[arr[i]]) {
        return arr[i]
      }
      hash[arr[i]] = true;
    }
    return false
  }
  // 校验
  doChecked(e) {
    const that = this
    const target = e.currentTarget ? $(e.currentTarget) : e
    const items = target.parents('li.J_need_item')
    const validArr = []
    const hasUploadNum = $('.J_upload_img').length
    this.change = true
    // 向上检验
    items.prevAll().each((i, item) => {
      const input = $(item).find('input')
      let val = ''
      if (input.attr('type') === 'radio') {
        const name = input.attr('name')
        val = $(`input[name='${name}']:checked`).val()
      } else if (input.length > 1) {
        val = $(input[0]).val()
      } else {
        val = input.val()
      }
      if (val === '' || val === undefined) {
        this.showTips(input)
      }
    })
    // 全局必填项检查
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
    if (target.val() === '') {
      validArr.push('false')
      this.showTips(target)
    } else {
      this.hideTips(target)
    }
    // 图片至少一个
    // if (!hasUploadNum && that.source != 'jianBanInput') {
    //   validArr.push('false')
    //   this.showTips($('.J_has_upload'))
    // } else {
    //   this.hideTips($('.J_has_upload'))
    // }

    // 色号至少一个
    if (!$('.J_color_block>li').length) {
      validArr.push('false')
    }

    // 对已存在的色号进行判断
    let unitInput = null
    if (this.productType == 1) { // 面料
      unitInput = $('input[name="priceUnit"]:checked')
    } else if (this.productType == 2) {
      unitInput = $('input[name="priceUnit"]')
    } else {
      unitInput = $('input[name="priceUnit"]:checked')
    }
    if (!unitInput.val()) {
      validArr.push('false')
      this.showTips($('input[name="priceUnit"]'))
    } else {
      this.hideTips(unitInput)
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
