/*
  author  yonghuang
 */
import '../../common/base.js'
import OrderApi from '../../api/order'
import AccountApi from '../../api/account'
import { getCache, getParam, imgPath, setCache, clearListCache } from '../../common/utils'
class Page {
  constructor() {
    this._time = new Date().getTime()
    const orderDetail = getCache({
      key: 'orderDetail',
      type: 'sessionStorage',
      dataType: 'json'
    })
    this.source = decodeURI(getParam('source'))
    this.orderDetail = orderDetail
    if (this.orderDetail && this.orderDetail.obj.orderNumber === getParam('orderNumber')) {
      this.getList()
    } else {
      this.getOrderDetail()
    }
  }
  getOrderDetail() {
    const that = this
    $.showPreloader()
    request({
      url: OrderApi.getDetail,
      data: {
        orderNumber: getParam('orderNumber'),
        _time: this._time
      },
      callback(data) {
        if (data.success === '1') {
          setCache({ // 将订单详情缓存到本地
            type: 'sessionStorage',
            key: 'orderDetail',
            value: data,
            dataType: 'json'
          })
          that.orderDetail = data
          that.getList()
        } else {
          $.alert(data.msg)
        }
      },
      error() {
        $.alert('获取订单详情失败，请刷新重试')
      }
    })
  }
  getList() {
    request({
      url: OrderApi.getMoneyDetail,
      data: {
        orderNumber: this.orderDetail.obj.orderNumber,
        _time: this._time
      },
      cache: false,
      callback: (data) => {
        $.hidePreloader()
        if (data.success === '1') {
          this.renderList(data)
        } else {
          $.toast(data.msg)
        }
      }
    })
  }
  renderList(data) {
    this.listDataForShow = $.extend(true, {}, data.obj)
    const formData = $.extend(true, {}, data.obj)
    for (const key in this.listDataForShow) {
      this.listDataForShow[key].amount = this.formatCurrency(this.listDataForShow[key].amount, 1)
      this.listDataForShow[key].debt = this.formatCurrency(this.listDataForShow[key].debt, 1)
      this.listDataForShow[key].realAmount = this.formatCurrency(this.listDataForShow[key].realAmount, 1)
    }
    for (const key2 in formData) {
      formData[key2].amount = this.formatCurrency(formData[key2].amount, 0)
      formData[key2].debt = this.formatCurrency(formData[key2].debt, 0)
      formData[key2].realAmount = this.formatCurrency(formData[key2].realAmount, 0)
    }
    let quantityAll = 0
    this.orderDetail.obj.productList.map((key) => {
      quantityAll = quantityAll + key.quantity
    })
    quantityAll = quantityAll.toFixed(2) + this.orderDetail.obj.productList[0].quantityUnit || ''
    const renderData = {
      listObj: this.listDataForShow,
      status: this.orderDetail.obj.status,
      estimatedTotal: this.orderDetail.obj.estimatedTotal,
      quantityAll, // 总购买量
      imgPath,
      formData,
      collectDebts: getParam('collectDebts'),
      productSource: this.orderDetail.obj.productSource, // 0 现货 1 订货
      madanImgUrls: this.orderDetail.obj.madanImgUrls
    }
    const realGetTpl = 'realGet/index.html'
    nunjucks.render(realGetTpl, renderData).then((moneyDetailHtml) => {
      $('.J_realGet').html(moneyDetailHtml)
      this.listData = data.obj
      this.bindEvent()
    })
  }
  bindEvent() {
    const saveBtn = $('.J_save')
    const backBtn = $('.J_back')
    const madanPreviews = $('.J_madan')
    const earnestMoneyInput = $('.J_earnestMoney')
    const finalMoneyInput = $('.J_finalMoney')
    const serviceMoneyInput = $('.J_serviceMoney')
    const fullMoneyInput = $('.J_fullMoney')
    const that = this
    const collectDebts = getParam('collectDebts')
    // 临时记住正确的数值
    this.correctData = {
      correctServiceMoney: '',
      correctFinalMoney: '',
      correctEarnestMoney: '',
      correctFullMoney: ''
    }
    earnestMoneyInput.on('focus keyup blur', () => {
      this.doChecked(earnestMoneyInput, 'earnestMoney')
    })
    finalMoneyInput.on('focus keyup blur', () => {
      this.doChecked(finalMoneyInput, 'finalMoney')
    })
    fullMoneyInput.on('focus keyup blur', () => {
      this.doChecked(fullMoneyInput, 'fullMoney')
    })
    serviceMoneyInput.on('focus keyup blur', () => {
      console.log(serviceMoneyInput)
      this.doChecked(serviceMoneyInput, 'serviceMoney')
    })
    backBtn.on('click', () => {
      if (that.source) {
        location.href = that.source
      } else {
        history.go(-1)
      }
      return false
    })
    /**
     * 点击时展开大图
     */
    madanPreviews.on('click', (e) => {
      let photos = that.orderDetail.obj.madanImgUrls
      if (!photos.length) { photos = ['/upload/util/default_buy.jpg'] }
      photos = photos.map((url) => imgPath + url)
      const myPhotoBrowserPopup = $.photoBrowser({
        photos,
        type: 'popup'
      });
      myPhotoBrowserPopup.open();
    });
    saveBtn.on('click', (e) => {
      const modal = $.modal({
        title: '实收',
        text: '一旦确认提交，将不可修改',
        buttons: [{
          text: '取消',
          onClick() {}
        }, {
          text: '确认',
          close: false,
          onClick() {
            const confirmMoney = []
            function requestConfirm() {
              $.closeModal(modal)
              $.showPreloader();
              request({
                url: (collectDebts !== 1 ? AccountApi.confirmIncome : AccountApi.confirmDebtPay),
                data: {
                  orderNumber: that.orderDetail.obj.orderNumber,
                  _time: that._time,
                  confirmMoney: JSON.stringify(confirmMoney)
                },
                callback(res) {
                  $.hidePreloader();
                  if (res.success === '1') {
                    $.toast(res.msg);
                    clearListCache()
                    if (that.source) {
                      location.href = that.source
                    } else {
                      history.go(-1)
                    }
                  } else {
                    $.alert(res.msg);
                  }
                }
              })
            }
            if (earnestMoneyInput.length) {
              const earnestMoneyVal = earnestMoneyInput.val()
              if ((earnestMoneyVal || earnestMoneyVal === 0) && earnestMoneyVal < 1000000) {
                confirmMoney.push({
                  realAmount: earnestMoneyVal,
                  fundType: 2
                })
              } else {
                $.toast('订金为必填项,且大于等于零小于100W')
                $.closeModal(modal)
                return false;
              }
            }
            if (finalMoneyInput.length) {
              const finalMoneyVal = finalMoneyInput.val()
              if ((finalMoneyVal || finalMoneyVal === 0) && finalMoneyVal < 1000000) {
                confirmMoney.push({
                  realAmount: finalMoneyVal,
                  fundType: 3 // 3 尾款，5 货款
                })
              } else {
                $.toast('尾款为必填项,且大于等于零小于100W')
                $.closeModal(modal)
                return false;
              }
            }
            if (fullMoneyInput.length) {
              const fullMoneyVal = fullMoneyInput.val()
              if ((fullMoneyVal || fullMoneyVal === 0) && fullMoneyVal < 1000000) {
                confirmMoney.push({
                  realAmount: Number(fullMoneyVal),
                  fundType: 5 // 3 尾款，5 货款
                })
              } else {
                $.toast('货款为必填项,且大于等于零小于100W')
                $.closeModal(modal)
                return false;
              }
            }
            if (serviceMoneyInput.length) {
              const serviceMoneyVal = serviceMoneyInput.val()
              console.log(serviceMoneyInput)
              if (serviceMoneyVal || serviceMoneyVal === 0) {
                if (serviceMoneyVal >= 1000000) {
                  $.toast('服务费要小于100W')
                  $.closeModal(modal)
                  return false;
                }
                confirmMoney.push({
                  realAmount: serviceMoneyVal,
                  fundType: 4
                })
              } else {
                $.closeModal(modal)
                $.modal({
                  title: '服务费未填写，确认提交？',
                  buttons: [{
                    text: '再看看',
                    onClick() {}
                  }, {
                    text: '确认',
                    onClick() {
                      confirmMoney.push({
                        realAmount: 0,
                        fundType: 4
                      })
                      requestConfirm()
                    }
                  }]
                })
                return false;
              }
            }
            requestConfirm()
          }
        }]
      })
    })
  }
  /*
    @param type 表示是否有千位符 1:表示有
   */
  formatCurrency(number, type) {
    let val = Number(number)
    let backVal = !type ? parseFloat(val, 10).toFixed(2).toString() : parseFloat(val, 10).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
    if (String(backVal) == '-0.00') {
      backVal = '0.00'
    }
    return backVal
  }
  doChecked(dom, type) {
    const test = dom.val() ? /^[0-9]*(\.)?[0-9]{0,2}$/g.test(dom.val()) : false
    let tempFlag = ''
    switch (type) {
      case 'earnestMoney':
        tempFlag = this.correctData.correctEarnestMoney
        break;
      case 'finalMoney':
        tempFlag = this.correctData.correctFinalMoney
        break;
      case 'fullMoney':
        tempFlag = this.correctData.correctFullMoney
        break;
      case 'serviceMoney':
        tempFlag = this.correctData.correctServiceMoney
        break;
    }
    if (test) {
      tempFlag = dom.val()
      switch (type) {
        case 'earnestMoney':
          this.correctData.correctEarnestMoney = tempFlag
          break;
        case 'finalMoney':
          this.correctData.correctFinalMoney = tempFlag
          break;
        case 'fullMoney':
          this.correctData.correctFullMoney = tempFlag
          break;
        case 'serviceMoney':
          this.correctData.correctServiceMoney = tempFlag
          break;
      }
    } else {
      if (tempFlag != 0 && tempFlag >= 10) {
        dom.val(tempFlag)
      } else {
        dom.val('')
      }
    }
  }
}
export default new Page()
