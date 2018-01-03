/*
  author  yonghuang
 */
import '../../common/base.js'
import { getCache, setCache, imgPath, getParam, clearListCache } from '../../common/utils'
import orderApi from '../../api/order'
import lrz from '../../vendor/lrz'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.render()
  }
  render() {
    const that = this
    const tpl = 'jianBanInput/index.html'
    // 表示进来该页面是否有操作
    that.change = getCache({
      type: 'sessionStorage',
      dataType: 'json',
      key: 'changeFlag'
    })
    // 是否是编辑页面
    that.type = getParam('type')
    that.source = decodeURI(getParam('source'))
    that.orderDetail = getCache({
      type: 'sessionStorage',
      dataType: 'json',
      key: 'orderDetail'
    })
    that.tempFormData = getCache({
      key: 'tempFormData',
      type: 'sessionStorage',
      dataType: 'json'
    })
    // 货号列表
    that.productNumList = getCache({
      key: 'productNumList',
      type: 'sessionStorage',
      dataType: 'json'
    })
    that.orderNumber = getParam('orderNumber')
    if (!that.orderDetail || that.orderDetail.obj.orderNumber != that.orderNumber) {
      // 需要获取详情
      $.showPreloader()
      request({
        url: orderApi.getDetail,
        data: {
          orderNumber: that.orderNumber,
          _time: that._time
        },
        cache: false,
        callback: (data) => {
          if (data.success === '1') {
            setTimeout(() => {
              $.hidePreloader();
              that.orderDetail = data
              setCache({
                type: 'sessionStorage',
                dataType: 'json',
                key: 'orderDetail',
                value: data
              })
              renderDetail()
            })
          } else {
            $.hidePreloader();
            $.toast(data.msg)
          }
        }
      })
    } else {
      renderDetail()
    }
    function renderDetail() {
      const obj = that.orderDetail.obj
      that.backUrl = that.source
      if (!that.productNumList && obj.productList.length) {
        that.productNumList = []
        $.extend(true, that.productNumList, obj.productList)
        setCache({
          type: 'sessionStorage',
          dataType: 'json',
          key: 'productNumList',
          value: that.productNumList
        })
      }
      // 计算单个货号预估价 和总的预估价
      if (that.productNumList.length) {
        that.calculatePrice()
      }
      that.renderData = {
        imgPath: imgPath,
        leaveMessage: that.tempFormData.leaveMessage || (obj.productList[0] ? obj.productList[0].leaveMessage : '') || '',
        madanImgUrls: that.tempFormData.madanImgUrls ? JSON.parse(that.tempFormData.madanImgUrls) : obj.madanImgUrls,
        productNumList: that.productNumList.length ? that.productNumList : '',
        allProspectPrice: that.allProspectPrice,
        orderNumber: that.orderDetail.obj.orderNumber
        // disabled: (that.sellerInfo && that.productNumList.length > 0 ) ? false: true
      }
      nunjucks.render(tpl, that.renderData).then((jianBanInputHtml) => {
        that.$contet = $('.J_content')
        that.$contet.html(jianBanInputHtml)
        that.bindEvents()
      })
    }
  }
  bindEvents() {
    const that = this
    const saveBtn = $('.J_save')
    const imgFile = $('#img-file')
    const imgDom = $('.J_has_upload')
    const backBtn = $('.J_back') // 返回键
    const imgTpl = 'imgTpl.html'
    that.formDom = $('form')
    const addProNumber = $('.J_add_proNumber') // 增加货号
    const delProNumber = $('.J_del_proNumber') // 删除该货号
    const editProNumber = $('.J_edit_proNumber') // 编辑该货号
    // that.valid = false
    that.doChecked($('.J_items').last().find('.J_price')) // 填充完就检查一遍
    // 增加货号
    addProNumber.on('click', () => {
      const tempFormData = that.gatherFormData()
      setCache({
        type: 'sessionStorage',
        dataType: 'json',
        value: tempFormData,
        key: 'tempFormData'
      })
      if (!that.change) {
        setCache({
          type: 'sessionStorage',
          dataType: 'json',
          key: 'changeFlag',
          value: true
        })
      }
      location.href = '/proNumber.html?type=add&source=jianBanInput'
    })
    // 删除货号
    delProNumber.on('click', (e) => {
      const target = $(e.currentTarget)
      $.modal({
        title: '确定删除货号',
        text: '',
        buttons: [
          {
            text: '取消',
            onClick: () => {
            }
          },
          {
            text: '确定',
            onClick: () => {
              const number = target.attr('data-number')
              target.parents('li').remove()
              that.updateProductNumList(number)
              that.calculatePrice()
              if (!that.change) {
                setCache({
                  type: 'sessionStorage',
                  dataType: 'json',
                  key: 'changeFlag',
                  value: true
                })
              }
            }
          }
        ]
      })
    })
    // 编辑货号
    editProNumber.on('click', (e) => {
      const index = Number($(e.currentTarget).attr('data-index')) - 1
      if (!that.change) {
        setCache({
          type: 'sessionStorage',
          dataType: 'json',
          key: 'changeFlag',
          value: true
        })
      }
      const tempFormData = that.gatherFormData()
      setCache({
        type: 'sessionStorage',
        dataType: 'json',
        value: tempFormData,
        key: 'tempFormData'
      })
      location.href = `/proNumber.html?type=edit&index=${index}&source=jianBanInput`
      return false
    })
    // 回退
    backBtn.on('click', () => {
      const change = getCache({
        type: 'sessionStorage',
        dataType: 'json',
        key: 'changeFlag'
      })
      if (change || that.change) {
        $.modal({
          title: '尚未提交订单',
          text: '继续返回，已填内容将不会被保留',
          buttons: [
            {
              text: '继续返回',
              onClick: () => {
                sessionStorage.removeItem('tempFormData')
                sessionStorage.removeItem('productNumList')
                sessionStorage.removeItem('changeFlag')
                location.href = that.backUrl
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
        sessionStorage.removeItem('tempFormData')
        sessionStorage.removeItem('productNumList')
        sessionStorage.removeItem('changeFlag')
        location.href = that.backUrl
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
      if (!that.change) {
        setCache({
          type: 'sessionStorage',
          dataType: 'json',
          key: 'changeFlag',
          value: true
        })
      }
      target.parents('.J_upload_img').remove()
      that.doChecked($('textarea[name="leaveMessage"]')) // 填充完就检查一遍
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
                  if (!that.change) {
                    setCache({
                      type: 'sessionStorage',
                      dataType: 'json',
                      key: 'changeFlag',
                      value: true
                    })
                  }
                  that.doChecked($('textarea[name="leaveMessage"]')) // 填充完就检查一遍
                })
              } else {
                $.hidePreloader()
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
      const formData = this.gatherFormData()
      formData.leaveMessage = String($('textarea[name="leaveMessage"]').val()).replace(/[\r\n]/g, '').replace(/\ +/g, '')
      if (formData.leaveMessage.length > 50) {
        $.toast('留言不能超过五十个字')
        return false
      }
      const from = getParam('from');
      if (from == 'shopCartList') { // 合并结算页跳转过来的保存接口不一样
        that.editJb(formData);
        return false;
      }
      $.modal({
        title: '立即提交审核？',
        text: '',
        buttons: [{
          text: '立刻提交',
          onClick() {
            that.inputJbInfo(0, formData)
          }
        }, {
          text: '稍后提交',
          onClick() {
            that.inputJbInfo(1, formData)
          }
        }]
      })
    })
  }
  gatherFormData() {
    const imgDoms = $('.J_has_upload').find('.J_upload_img')
    const formArray = this.formDom.serializeArray()
    const formData = {
      _time: this._time
    }
    formData.madanImgUrls = []
    imgDoms.each((key, dom) => {
      formData.madanImgUrls.push($(dom).find('a').attr('data-link'))
    })
    formArray.map((key) => {
      formData[key.name] = key.value
    })
    if (formData.madanImgUrls) {
      formData.madanImgUrls = JSON.stringify(formData.madanImgUrls)
    }
    return formData
  }
  editJb(formData) {
    const that = this
    formData.productList = []
    $.extend(true, formData.productList, that.productNumList)
    if (formData.productList.length) {
      formData.productList.map((item, i) => {
        delete item.prospectPrice
        item.priceUnit = item.colorList[0].priceUnit
        item.colorList = JSON.stringify(item.colorList)
      })
    }
    formData.productList = JSON.stringify(formData.productList)
    $.showPreloader()
    request({
      url: orderApi.editJb,
      data: formData,
      cache: false,
      callback: (data) => {
        $.hidePreloader()
        if (data.success === '1') {
          sessionStorage.removeItem('productNumList')
          sessionStorage.removeItem('tempFormData')
          sessionStorage.removeItem('orderDetail')
          clearListCache()
          location.href = that.source;
        } else {
          $.alert(data.msg)
        }
      }
    })
  }
  inputJbInfo(type, formData) {
    const that = this
    formData.productList = []
    $.extend(true, formData.productList, that.productNumList)
    console.log('formData.productList:', formData.productList)
    if (formData.productList.length) {
      formData.productList.map((item, i) => {
        delete item.prospectPrice
        item.priceUnit = item.colorList[0] && item.colorList[0].priceUnit
        item.colorList = JSON.stringify(item.colorList)
      })
    }
    formData.productList = JSON.stringify(formData.productList)
    $.showPreloader()
    request({
      url: orderApi.inputJb,
      data: formData,
      cache: false,
      callback: (data) => {
        if (data.success === '1') {
          sessionStorage.removeItem('productNumList')
          sessionStorage.removeItem('tempFormData')
          sessionStorage.removeItem('orderDetail')
          clearListCache()
          if (type) { // 稍后通知
            $.hidePreloader()
            location.href = '/orderList.html?Tabkey=djb&category=jb-all'
          } else {
            // 立即通知
            that.submitJbToAuditAction(that.orderNumber)
          }
        } else {
          $.hidePreloader()
          $.alert(data.msg)
        }
      }
    })
  }
  calculatePrice() {
    const that = this
    that.allProspectPrice = 0
    if (that.productNumList.length > 0) {
      that.productNumList.map((item, i) => {
        let colorList = item.colorList
        let tempPrice = 0
        colorList.map((item2, j) => {
          tempPrice = tempPrice + Number(item2.quantity) * Number(item2.price)
        })
        item.prospectPrice = that.formatCurrency(tempPrice)
        that.allProspectPrice = that.allProspectPrice + tempPrice
      })
      that.allProspectPrice = that.formatCurrency(that.allProspectPrice)
    }
    $('.J_all_prospect').text(that.allProspectPrice)
    if (that.productNumList.length > 0) {
      $('.J_save').removeClass('disabled')
    } else {
      $('.J_save').addClass('disabled')
    }
  }
  // 更新当前sessionStorage 中的货号列表 productNumList
  updateProductNumList(number) {
    let index = 0
    this.productNumList.map((item, i) => {
      if (number == item.productNumber) {
        index = i
      }
    })
    this.productNumList.splice(index, 1)
    setCache({
      type: 'sessionStorage',
      dataType: 'json',
      key: 'productNumList',
      value: this.productNumList
    })
  }
  submitJbToAuditAction(orderNumber) { // 提交审核
    const that = this
    request({
      url: orderApi.submitJbToAudit,
      data: {
        orderNumber,
        _time: that._time
      },
      cache: false,
      callback: (data) => {
        $.hidePreloader()
        if (data.success === '1') {
          location.href = `/orderDetail.html?orderNumber=${orderNumber}`
        } else {
          $.alert(data.msg)
        }
      }
    })
  }
  formatCurrency(number) {
    let val = Number(number)
    let backVal = parseFloat(val, 10).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
    if (String(backVal) == '-0.00') {
      backVal = '0.00'
    }
    return backVal
  }
  doChecked(e) {
    let items = ''
    if (e[0] && e[0].name == 'leaveMessage') {
      items = $(e).parents('li')
    } else {
      items = e.currentTarget ? $(e.currentTarget).parents('.J_need_item') : $(e).parents('.J_need_item')
    }
    const that = this
    const validArr = []
    const hasUploadNum = $('.J_upload_img').length
    items.prevAll().each((i, item) => {
      const input = $(item).find('input')
      let val = ''
      if (input.attr('type') === 'radio') {
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
      const input = $(item).find('input')
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
    if ($(e.currentTarget ? e.currentTarget : e).val() === '' && (e[0] && e[0].name != 'leaveMessage')) {
      validArr.push('false')
      that.showTips($(e.currentTarget ? e.currentTarget : e))
    }
    if (!that.productNumList.length) {
      validArr.push('false')
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
