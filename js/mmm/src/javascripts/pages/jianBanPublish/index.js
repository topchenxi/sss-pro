/*
  author  yonghuang
 */
import '../../common/base.js'
import { getCache, setCache, imgPath, getParam, clearListCache, setLastPage } from '../../common/utils'
import orderApi from '../../api/order'
import addrApi from '../../api/address'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.render()
  }
  render() {
    const that = this
    // 表示进来该页面是否有操作
    that.change = false
    that.host = location.host
    that.source = decodeURI(getParam('source'))
    // 是否是编辑页面
    that.type = getParam('type')
    that.orderNumber = getParam('orderNumber')
    const tpl = 'jianBanPublish/index.html'
    that.leaveMessage = getCache({
      key: 'leaveMessage',
      type: 'sessionStorage',
      dataType: 'json'
    })
    // 货号列表
    that.productNumList = getCache({
      key: 'productNumList',
      type: 'sessionStorage',
      dataType: 'json'
    })
    // 收件人的信息
    that.defaultAddr = getCache({
      key: 'defaultAddr',
      type: 'sessionStorage',
      dataType: 'json'
    })
    // 采购商信息
    that.buyerInfo = getCache({
      key: 'buyerInfo',
      type: 'sessionStorage',
      dataType: 'json'
    })
    // 采购商信息
    that.sellerInfo = getCache({
      key: 'sellerInfo',
      type: 'sessionStorage',
      dataType: 'json'
    })
    if (!that.type || that.type == 'add') {
      // 计算单个货号预估价 和总的预估价
      if (that.productNumList) {
        that.calculatePrice()
      }
      renderAddr()
    } else if (that.type == 'edit') {
      that.orderDetail = getCache({
        type: 'sessionStorage',
        key: 'orderDetail',
        dataType: 'json'
      })
      const orderNumber = getParam('orderNumber')
      if (!that.orderDetail || that.orderDetail.obj.orderNumber != orderNumber) {
        // 需要获取详情
        $.showPreloader()
        request({
          url: orderApi.getDetail,
          data: {
            orderNumber,
            _time: that._time
          },
          cache: false,
          callback: (data) => {
            if (data.success === '1') {
              // $.hidePreloader();
              that.orderDetail = data
              setCache({
                type: 'sessionStorage',
                dataType: 'json',
                key: 'orderDetail',
                value: data
              })
              that.defaultAddr = null
              renderDetail()
            } else {
              $.hidePreloader();
              $.toast(data.msg)
            }
          }
        })
      } else {
        renderDetail()
      }
    }
    function renderDetail() {
      const obj = that.orderDetail.obj
      if (!that.productNumList) {
        that.productNumList = obj.wantProductList
        setCache({
          type: 'sessionStorage',
          dataType: 'json',
          key: 'productNumList',
          value: that.productNumList
        })
      }
      that.calculatePrice()
      if (!that.buyerInfo) {
        that.buyerInfo = obj.buyer
        setCache({
          type: 'sessionStorage',
          dataType: 'json',
          key: 'buyerInfo',
          value: obj.buyer
        })
      }
      if (!that.sellerInfo && obj.sellerCompany) {
        that.sellerInfo = {
          id: obj.shopId,
          sellerCompany: obj.sellerCompany,
          sellerTel: obj.sellerTel,
          sellerAddr: obj.sellerAddr,
          sellerArea: obj.sellerArea,
          sellerCity: obj.sellerCity,
          sellerProvince: obj.sellerProvince,
        }
        setCache({
          type: 'sessionStorage',
          dataType: 'json',
          key: 'sellerInfo',
          value: that.sellerInfo
        })
      }
      if (!that.leaveMessage) {
        that.leaveMessage = obj.leaveMessage
        setCache({
          type: 'sessionStorage',
          dataType: 'json',
          key: 'leaveMessage',
          value: that.leaveMessage
        })
      }
      renderAddr()
    }
    function renderAddr() {
      // 存在采购商 要去获取默认地址
      if (that.buyerInfo && !that.defaultAddr) {
        new Promise(function(resolve, reject) {
          that.getDefaulAddr(that.buyerInfo.id, resolve, reject)
        }).then(function() {
          render()
        })
      } else {
        render()
      }
      function render() {
        that.renderData = {
          imgPath: imgPath,
          buyerInfo: that.buyerInfo,
          sellerInfo: that.sellerInfo,
          leaveMessage: that.leaveMessage || '',
          defaultAddr: that.defaultAddr,
          productNumList: that.productNumList,
          allProspectPrice: that.allProspectPrice,
          disabled: !(that.buyerInfo && that.sellerInfo && that.productNumList.length)
        }
        console.log(that.renderData)
        if (that.orderDetail) {
          that.renderData.orderNumber = that.orderDetail.obj.orderNumber
        }
        that.backUrl = that.source ? that.source : '/?category=jb-all'
        nunjucks.render(tpl, that.renderData).then((jianBanPublishHtml) => {
          that.$contet = $('.J_content')
          that.$contet.html(jianBanPublishHtml)
          that.bindEvents()
        })
      }
    }
  }
  getDefaulAddr(buyerId, resolve, reject) {
    const that = this
    $.showPreloader()
    request({
      url: addrApi.AddressGetDefault,
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify({
        userId: buyerId,
        _time: that._time
      }),
      cache: false,
      callback: (data) => {
        $.hidePreloader();
        if (data.success === '1') {
          that.defaultAddr = data.obj
          resolve(that.defaultAddr)
        } else {
          $.toast(data.msg)
          reject(data.msg)
        }
      }
    })
  }
  bindEvents() {
    const that = this
    const saveBtn = $('.J_save')
    const backBtn = $('.J_back') // 返回键
    const selectBuyer = $('.J_select_buyer') // 选择采购商
    const selectSeller = $('.J_select_seller') // 编辑供应商
    const addrEdit = $('.J_addr_edit') // 编辑地址
    that.formDom = $('form')
    const addProNumber = $('.J_add_proNumber') // 增加货号
    const delProNumber = $('.J_del_proNumber') // 删除该货号
    const editProNumber = $('.J_edit_proNumber') // 编辑该货号
    that.valid = false
    if (that.buyerInfo || that.sellerInfo) {
      that.change = true
    }
    selectBuyer.on('click', () => {
      that.cacheLeaveMessage()
      setLastPage();
      location.href = '/buyerList.html?source=jianBanPublish'
      return false
    })
    // 编辑地址
    addrEdit.on('click', () => {
      if (!that.buyerInfo) {
        $.toast('请选择采购商')
        return
      }
      const formData = that.gatherFormData()
      if ($('.J_save').hasClass('disabled')) {
        formData.disabled = true
      } else {
        formData.disabled = false
      }
      that.cacheLeaveMessage()
      setCache({
        type: 'sessionStorage',
        dataType: 'json',
        key: 'sourcePage',
        value: location.href
      })
      if (that.defaultAddr) {
        location.href = `/addressList.html?source=jianBanPublish&id=${that.defaultAddr.id}`
      } else {
        location.href = `/addressList.html?source=jianBanPublish`
      }
      return false
    })
    selectSeller.on('click', () => {
      that.cacheLeaveMessage()
      setLastPage()
      location.href = '/sellerList.html'
      return false
    })
    // 增加货号
    addProNumber.on('click', () => {
      const formData = that.gatherFormData()
      if ($('.J_save').hasClass('disabled')) {
        formData.disabled = true
      } else {
        formData.disabled = false
      }
      that.cacheLeaveMessage()
      location.href = '/proNumber.html?type=add&source=jianBanPublish'
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
              that.change = true
            }
          }
        ]
      })
    })
    // 编辑货号
    editProNumber.on('click', (e) => {
      const index = Number($(e.currentTarget).attr('data-index')) - 1
      that.cacheLeaveMessage()
      location.href = `/proNumber.html?type=edit&index=${index}&source=jianBanPublish`
      return false
    })
    // 回退
    backBtn.on('click', () => {
      if (that.change) {
        $.modal({
          title: '是否保存修改',
          text: '继续返回，已填内容将不会被保留',
          buttons: [
            {
              text: '继续返回',
              onClick: () => {
                sessionStorage.removeItem('productNumList')
                sessionStorage.removeItem('leaveMessage')
                sessionStorage.removeItem('buyerInfo')
                sessionStorage.removeItem('defaultAddr')
                sessionStorage.removeItem('orderDetail')
                sessionStorage.removeItem('sellerInfo')
                sessionStorage.removeItem('addressInfo')
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
        location.href = that.backUrl
        return false
      }
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
      /**
       * 通知剪版
       */
      $.modal({
        title: '立即通知剪版？',
        text: '',
        buttons: [{
          text: '立刻通知',
          onClick() {
            that.commitJbInfo(0, formData)
          }
        }, {
          text: '稍后通知',
          onClick() {
            that.commitJbInfo(1, formData)
          }
        }]
      })
      // }
    })
  }
  gatherFormData() {
    const formArray = this.formDom.serializeArray()
    const formData = {
      _time: this._time
    }
    formArray.map((key) => {
      formData[key.name] = key.value
    })
    return formData
  }
  cacheLeaveMessage() {
    const $leaveMessage = $('textarea[name="leaveMessage"]')
    const leaveMessage = $leaveMessage.val()
    setCache({
      type: 'sessionStorage',
      dataType: 'json',
      value: leaveMessage,
      key: 'leaveMessage'
    })
  }
  commitJbInfo(type, formData) {
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
    formData.imgUrls = JSON.stringify(formData.imgUrls)
    $.showPreloader()
    request({
      url: that.type == 'edit' ? orderApi.updateJb : orderApi.commitJb,
      data: formData,
      cache: false,
      callback: (data) => {
        if (data.success === '1') {
          sessionStorage.removeItem('productNumList')
          sessionStorage.removeItem('leaveMessage')
          sessionStorage.removeItem('buyerInfo')
          sessionStorage.removeItem('defaultAddr')
          sessionStorage.removeItem('orderDetail')
          sessionStorage.removeItem('sellerInfo')
          sessionStorage.removeItem('addressInfo')
          clearListCache()
          if (!type) {
            that.notifyJbAction(that.type == 'edit' ? that.orderNumber : data.obj.orderNumber)
          } else {
            $.hidePreloader()
            location.href = '/orderList.html?Tabkey=tzjb&category=jb-all'
          }
        } else {
          $.hidePreloader()
          $.alert(data.msg)
        }
      }
    })
  }
  notifyJbAction(orderNumber) {
    request({
      url: orderApi.notifyJb,
      data: {
        orderNumber
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
  calculatePrice() {
    const that = this
    that.allProspectPrice = 0
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
    $('.J_all_prospect').text(that.allProspectPrice)
    // console.log(that.allProspectPrice)
    if (that.sellerInfo && that.buyerInfo && that.defaultAddr && that.productNumList.length > 0) {
      $('.J_save').removeClass('disabled')
    } else {
      $('.J_save').addClass('disabled')
    }
  }
  // 更新当前sessionStorage 中的货号列表 productNumList
  updateProductNumList(number) {
    let index = 0
    this.productNumList.map((item, i) => {
      console.log(number)
      console.log(item)
      if (number == item.productNumber) {
        console.log(i)
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
  formatCurrency(number) {
    let val = Number(number)
    let backVal = parseFloat(val, 10).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
    if (String(backVal) == '-0.00') {
      backVal = '0.00'
    }
    return backVal
  }
  // doChecked(e) {
  //   let items = ''
  //   if(e[0] && e[0].name == 'leaveMessage'){
  //     items = $(e).parents('li')
  //   } else {
  //     items = e.currentTarget ? $(e.currentTarget).parents('.J_need_item') : $(e).parents('.J_need_item')
  //   }
  //   const that = this
  //   const validArr = []
  //   const hasUploadNum = $('.J_upload_img').length
  //   items.prevAll().each((i, item) => {
  //     const input = $(item).find('input')
  //     let val = ''
  //     if (input.attr('type') === 'radio') {
  //       const name = input.attr('name')
  //       val = $(`input[name='${name}']:checked`).val()
  //     } else {
  //       val = input.val()
  //     }
  //     if (val === '' || val === undefined) {
  //       that.showTips(input)
  //     }
  //   })
  //   $('.J_need_item').each((i, item) => {
  //     const input = $(item).find('input')
  //     let val = ''
  //     if (input.attr('type') === 'radio') {
  //       const name = input.attr('name')
  //       val = $(`input[name='${name}']:checked`).val()
  //     } else {
  //       val = input.val()
  //     }
  //     if (val === '' || val === undefined) {
  //       validArr.push('false')
  //     }
  //   })
  //   if(!hasUploadNum) {
  //     validArr.push('false')
  //     that.showTips($('.J_has_upload'))
  //   } else {
  //     that.hideTips($('.J_has_upload'))
  //   }
  //   if ($(e.currentTarget ? e.currentTarget : e).val() === '' && (e[0] && e[0].name != 'leaveMessage')) {
  //     validArr.push('false')
  //     that.showTips($(e.currentTarget ? e.currentTarget : e))
  //   }
  //   if (!validArr.length) {
  //     $('.J_save').removeClass('disabled')
  //   } else {
  //     $('.J_save').addClass('disabled')
  //   }
  // }
  showTips(doms) {
    doms.parents('.item-inner').find('.tips').removeClass('fn-hide')
  }
  hideTips(doms) {
    doms.parents('.item-inner').find('.tips').addClass('fn-hide')
  }
}
export default new Page()
