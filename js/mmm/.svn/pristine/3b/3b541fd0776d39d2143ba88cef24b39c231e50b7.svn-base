
import '../../common/base.js'
import { getParam, getCache, setCache, imgPath, lrzConfig, clearListCache, setLastPage } from '../../common/utils.js'
import OrderApi from '../../api/order'
import AccountApi from '../../api/account'
import lrz from '../../vendor/lrz'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.render()
    this.change = false
  }
  render() {
    let that = this
    this.orderNumber = getParam('orderNumber')
    this.urgeMoney = getParam('urgeMoney')
    this.orderDetail = getCache({
      type: 'sessionStorage',
      key: 'orderDetail'
    })
    if (!that.orderDetail || (that.orderDetail && that.orderDetail.obj.orderNumber != that.orderNumber)) {
      $.showPreloader()
      request({
        url: OrderApi.getDetail,
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
            that.handleFirst()
          } else {
            $.toast(data.msg)
          }
        }
      })
    } else {
      that.handleFirst()
    }
  }
  goBackLink(sure) {
    let url = getCache({
      type: 'sessionStorage',
      key: 'temSourceUrl'
    })
    sessionStorage.removeItem('temSourceUrl')
    if (url.indexOf('orderDetail') > -1) {
      if (sure) {
        let getTemUrl = getParam('urgeMoney', url)
        if (getTemUrl) {
          url = url.replace('&urgeMoney=1', '')
        }
      }
    }
    location.href = url
  }
  storeGoBackLink() {
    let url = getCache({
      type: 'sessionStorage',
      key: 'temSourceUrl'
    })
    if (!url) {
      let source = getParam('source')
      let url = decodeURIComponent(source)
      setCache({
        type: 'sessionStorage',
        key: 'temSourceUrl',
        value: url
      });
    }
  }
  handleFirst() {
    const that = this
    const orderDetail = that.orderDetail.obj
    const source = encodeURIComponent(location.href)
    that.status = orderDetail.status
    // status  325 321 312 --订金
    // 345 341 339 -- 尾款
    // 327 316 323-- 货款
    // orderDetail.status = 327
    // that.status = 339
    that.payType = 1 // 付款方式 0 垫付 1 实付
    let realAmount = 0
    if (that.status == 312 || that.status == 321 || that.status == 325) {
      realAmount = orderDetail.earnestMoney; // 订金
      that.payType = that.orderDetail.obj.earnestMoneyPayType
    } else if (that.status == 345 || that.status == 341 || that.status == 339) {
      realAmount = Number(orderDetail.finalMoney)   // 尾款
      that.payType = that.orderDetail.obj.finalMoneyPayType
    } else if (that.status == 316 || that.status == 323 || that.status == 327 || that.status == 423 || that.status == 427) {
      realAmount = Number(orderDetail.fullMoney)  // 货款
      that.payType = that.orderDetail.obj.fullMoneyPayType
    }
    that.realAmount = realAmount
    that.payNumber = getParam('payNumber')
    let resData = {
      status: orderDetail.status,
      orderNumber: orderDetail.orderNumber,
      payNumber: that.payNumber,
      madanImgUrls: orderDetail.madanImgUrls,
      sellerCompany: orderDetail.sellerCompany, // 供货商档口名
      earnestMoney: orderDetail.earnestMoney || '0.00', // 订金
      serviceMoney: orderDetail.serviceMoney || '0.00', // 服务费
      finalMoney: orderDetail.finalMoney || '0.00', // 尾款
      fullMoney: orderDetail.fullMoney || '0.00', // 货款
      taxMoney: orderDetail.taxMoney || '0.00', // 税款
      source,
      payType: that.payType,
      imgPath
    }
    // 下面提醒框用的
    that.status = orderDetail.status
    const orderDetailTextTpl = 'shouldPay/orderDetail.html'
    nunjucks.render(orderDetailTextTpl, resData).then((orderDetailTextHtml) => {
      $('.J_orderDetail_text').html(orderDetailTextHtml);
      this.$resData = resData
      this.baseEventBind()
      this.goBack()
      this.saveInfo()
    })
    // 预览码单图片
  }
  baseEventBind() {
    const that = this
    const orderDetail = that.orderDetail.obj
    const saveTempData = $('.J_save_temp')
    const madanImgBtn = $('.J_madan_images')
    const realAmountInput = $('input[name="realAmount"]')
    // 手动输入实付金额
    realAmountInput.unbind('input').on('input', (e) => {
      const target = $(e.currentTarget)
      if (target.val() > that.realAmount) {
        $.toast('实付金额不能比应付金额大')
        target.val(that.realAmount)
        target.focus()
        return;
      }
      that.listenSubmit()
    })
    // 供应商收款方式
    const supplyMethodTpl = 'orderDetail/supplyMethod.html'
    that.billInfoTpl = 'shouldPay/temBillInfo.html'
    nunjucks.render(supplyMethodTpl, {
      replyAccountUser: orderDetail.replyAccountUser, // 供应商开户人姓名
      replyAccountNumber: orderDetail.replyAccountNumber, // 供应商卡号
      replyAccountBank: orderDetail.replyAccountBank, // 供应商开户行 ,
      replyAccountType: orderDetail.replyAccountType, // 账户类型 ,
      replyAccountBranch: orderDetail.replyAccountBranch // 供应商开户支行
    }).then((supplyMethodHtml) => {
      $('#supplyMethod').append(supplyMethodHtml)
    })
    // 跳去其他页面的时候 缓存临时信息
    saveTempData.on('click', () => {
      this.gatherTempData()
      setLastPage();
    })

    madanImgBtn.on('click', () => {
      let photos = orderDetail.madanImgUrls
      if (!photos.length) { photos = ['/upload/util/default_buy.jpg'] }
      photos = photos.map((url) => imgPath + url)
      const myPhotoBrowserPopup = $.photoBrowser({
        photos,
        type: 'popup'
      });
      myPhotoBrowserPopup.open();
    })
    // 渲染凭据模板
    that.renderCertificateTpl()
    // 图片上传
    that.uploadImage()
  }
  // 添加上传凭据
  addUpComponent() {
    let that = this
    $('.J_add_bill').on('click', function() {
      nunjucks.render(that.billInfoTpl, {
        certificate: ['']
      }).then((billInfoHtml) => {
        $('.J_bill_block').append(billInfoHtml);
        that.listenSubmit()
        that.deleteCert()
      })
    })
  }
  // 备注限定
  remarkFill() {
    $('#shouldPay').on('input', '.J_remark', function() {
      let val = $(this).val()
      if (!/^[^'&]{0,50}$/gi.test(val)) {
        $(this).val(val.substring(0, 50))
      }
    })
  }
  gatherTempData() {
    const certificate = []
    $('.J_newParent').each((index, item) => {
      const imgUrl = $(item).find('input[name="imgUrl"]').val()
      const remark = $(item).parents('.J_form').find('.J_remark').val() || ''
      if (imgUrl) {
        certificate.push({
          imgUrl,
          remark
        })
      }
    })
    const realAmount = $('input[name="realAmount"]').val()
    const formData = {
      certificate,
      realAmount
    }
    setCache({
      type: 'sessionStorage',
      key: 'tempData',
      dataType: 'json',
      value: formData
    })
    return formData
  }
  // 渲染暂时的信息
  renderCertificateTpl() {
    let that = this
    let tempData = getCache({
      type: 'sessionStorage',
      key: 'tempData'
    })
    const tplData = {}
    if (tempData.certificate && tempData.certificate.length) {
      that.change = true
      tplData.certificate = tempData.certificate
      if ($('.J_add_bill').hasClass('fn-hide')) {
        $('.J_add_bill').removeClass('fn-hide')
      }
    } else {
      tplData.certificate = ['']
    }
    tplData.imgPath = imgPath
    nunjucks.render(that.billInfoTpl, tplData).then((temBillInfoHtml) => {
      $('.J_bill_block').html(temBillInfoHtml)
      that.listenSubmit()
      that.deleteCert()
      // 增加付款凭据
      that.addUpComponent()
      that.zoomImages()
      // 备注限定
      that.remarkFill()
    })
    if (tempData.realAmount) {
      $('input[name="realAmount"]').val(tempData.realAmount)
    }
  }
  uploadImage() {
    let that = this;
    $(document).delegate('[type="file"]', 'change', function () {
      that.beginIndex = false
      let target = $(this)
      $.showPreloader();
      that.uploadComponent(this.files[0], target)
      if ($('.J_add_bill').hasClass('fn-hide')) {
        $('.J_add_bill').removeClass('fn-hide')
      }
    })
  }
  uploadComponent(files, target) {
    let that = this
    lrz(files, lrzConfig)
    .then(function(rst) {
      let randomNumber = parseInt(Math.random() * 700 + 800)
      target.closest('.J_newParent').html(`<img src="${rst.base64}" data-src="" id="yang${randomNumber}" class="J_zoom" style="border:1px solid #ccc;" /><input type='hidden' name='base64' value='${rst.base64}'>`)
      that.zoomImages()
      $.hidePreloader()
      // 处理成功会执行
      rst.formData.append('field', 'imgUrl');
      imgAjax()
      function imgAjax() {
        $.ajax({
          url: '/redwood/sys/Common/uploadFile.do?type=2',
          type: 'POST',
          data: rst.formData,
          // timeout: 10000,
          processData: false, // 告诉jQuery不要去处理发送的数据
          contentType: false, // 告诉jQuery不要去设置Content-Type请求头
          success: function(data) {
            if (data.success == 1) {
              that.beginIndex = true
              $('#yang' + randomNumber).attr('data-src', data.imgUrl)
              $('#yang' + randomNumber).after(`<input type='hidden' name='imgUrl' value='${data.imgUrl}'>`)
              that.listenSubmit()
            } else {
              $.toast(data.msg)
            }
          },
          error: function(error) {
            that.beginIndex = true
          }
        });
      }
    })
  }
  // 查看大图
  zoomImages() {
    $('.J_preview').unbind('click').on('click', function (e) {
      let photos = [];
      let src = $(this).attr('src')
      if (src.indexOf('@') != -1) {
        src = src.slice(0, src.indexOf('@'))
      }
      photos.push(src);
      let myPhotoBrowserPopup = $.photoBrowser({
        photos: photos,
        type: 'popup'
      });
      myPhotoBrowserPopup.open();
    });
  }
  // 删除凭证
  deleteCert() {
    $('.J_del').unbind('click').on('click', (e) => {
      let $this = $(e.target)
      if ($this.hasClass('disabled')) {
        console.log($this.hasClass('disabled'))
        return false
      }
      let len = $('.J_form').length;
      if (len == 1) {
        $.toast('至少一个要上传一个付款凭据')
        return false
      }
      $this.parents('.J_form').remove();
      this.listenSubmit()
    })
  }
  // 返回
  goBack() {
    let that = this
    $('.J_goBack').on('click', () => {
      if (that.change) {
        $.modal({
          title: '是否确认离开',
          text: '确认离开，修改内容将不被保存',
          buttons: [
            {
              text: '确认',
              onClick() {
                sessionStorage.removeItem('tempData')
                location.href = `/settlement.html?payNumber=${that.payNumber}`
              }
            },
            {
              text: '取消',
              bold: true,
              onClick: function () {
              }
            }
          ]
        })
      }
    })
  }
  // 保存
  saveInfo() {
    let that = this
    $('.J_save_btn').unbind('click').on('click', (e) => {
      if ($(e.target).hasClass('disabled')) return false
      let text = ''
      let buttonsArr = [
        {
          text: '放弃提交'
        },
        {
          text: '确认提交',
          bold: true,
          onClick() {
            that.requestSave()
          }
        }
      ]
      $.modal({
        title: '一旦提交,将不可修改，任务将被传递',
        text,
        buttons: buttonsArr
      })
    })
  }
  requestSave(resData) {
    let that = this
    let fundType = 2
    if (that.status == 312 || that.status == 321 || that.status == 325) {
      fundType = 2; // 订金
    } else if (that.status == 345 || that.status == 341 || that.status == 339) {
      fundType = 3; // 尾款
    } else if (that.status == 316 || that.status == 323 || that.status == 327 || that.status == 423 || that.status == 427) {
      fundType = 5; // 全款
    }
    const postData = that.gatherTempData()
    // 校验报告
    let reqOption = {
      fundType, // 1 表示采购商给搜芽凭据 2 搜芽给供应商凭据
      orderNumber: that.orderNumber,
      realAmount: $('input[name="realAmount"]').val() || 0,
      certificate: JSON.stringify(postData.certificate),
      _time: that._time
    }
    $.showPreloader()
    request({
      url: AccountApi.confirmPayAndInputCertificate,
      data: reqOption,
      callback(data) {
        $.hidePreloader()
        if (data.success == 1) {
          sessionStorage.removeItem('tempData')
          clearListCache()
          $.alert(data.msg, () => {
            location.href = `/settlement.html?payNumber=${that.payNumber}`
          })
        } else {
          $.toast(data.msg)
        }
      },
      error() {
        $.hidePreloader()
        $.alert('保存失败,请重新保存!')
      }
    })
  }
  // 监听满足条件
  listenSubmit() {
    const that = this
    let on = false
    that.change = true
    $('.J_newParent').each((index, item) => {
      const imgUrl = $(item).find('input[name="imgUrl"]').val()
      if (!imgUrl) {
        on = true
      }
    })
    if ($('input[name="realAmount"]').val() === '' || $('input[name="realAmount"]').val() < 0 || $('input[name="realAmount"]').val() > that.realAmount) {
      on = true
    }
    if (on) {
      $('.J_save_btn').addClass('disabled')
    } else {
      $('.J_save_btn').removeClass('disabled')
    }
    const formLength = $('.J_form').length
    if (formLength == 1) {
      $('.J_form').find('.J_del').addClass('disabled')
    } else {
      $('.J_form').find('.J_del').removeClass('disabled')
    }
  }
}
export default new Page()
