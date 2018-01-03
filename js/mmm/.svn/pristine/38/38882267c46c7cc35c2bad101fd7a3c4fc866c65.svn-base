import '../../common/base.js'
import { getCache, getLastPage, getParam, setCache, imgPath, clearListCache, removeParams } from '../../common/utils'
import OrderApi from '../../api/order'
import AccountApi from '../../api/account'
 class Page {
  constructor() {
    let that = this
    this._time = new Date().getTime()
    this.orderNumber = getParam('orderNumber')
    this.payDebtId = getParam('payDebtId')
    this.$page = $('#realGetPay')
    this.orderDetail = getCache({
      key: 'orderDetail',
      type: 'sessionStorage',
      dataType: 'json'
    })
    this.goBack()
    if (this.orderDetail && this.orderDetail.obj.orderNumber == this.orderNumber) {
      this.initData(this.orderDetail.obj)
    } else {
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
              key: 'orderDetail',
              value: data
            })
            that.initData(data.obj)
          } else {
            $.alert(data.msg)
          }
        }
      })
    }
  }
  initData(orderDetail) {
    // this.orderNumber = getParam('orderNumber')
    this.status = orderDetail.status //
    this.orderNumber = orderDetail.orderNumber
    this.productSource =  orderDetail.productSource
    // 现货状态下 >303 --316(未支付货款) 316（普通大货订单） 或者 416(流水订单) 之后都已经支付货款
    // 订货状态下 > 312 之后 显示为订金  >339 之后显示为尾款 (3 10 100)
    this.productSource = orderDetail.productSource // 0 表示现货 1 表示订货
    this.getMoneyDetail()
  }
  getMoneyDetail() {
    const that = this
    $.showPreloader()
    request({
      url: OrderApi.getDebtDetail,
      data: {
        payDebtId: that.payDebtId,
        _time: that._time
      },
      callback(data) {
        $.hidePreloader()
        if (data.success == 1) {
          for (var i in data.obj) {
            if (i != 'debtCertificateList') {
              data.obj[i] = parseFloat(data.obj[i], 10).toFixed(2)
            }
          }
          data.obj.productSource = that.productSource
          data.obj.imgPath = imgPath
          that.renderList(data.obj)
        } else {
          $.alert(data.msg)
        }
      }
    })
  }
  renderList(renderData) {
    console.log(renderData)
    const moneyDetailtpl = 'realGetPay/moneyDetail.html'
    nunjucks.render(moneyDetailtpl, renderData).then((moneyDetailHtml) => {
      $('.J_bill_text', this.$page).html(moneyDetailHtml)
      this.preViewImage()
      this.enterInput()
      this.allMoney()
      this.btnEvent()
    })
  }
  // 处理unGetPay值是否需要从setLastPage清楚
  filterLastPage(isRemove) {
    let lastPageArr = getCache({key: 'lastPage'})
    lastPageArr = lastPageArr.map((item) => {
      return removeParams('unGetPay', item)
    })
    setCache({
      key: 'lastPage',
      value: lastPageArr
    })
  }
  goBack() {
    let that = this
    $('.J_goBack', this.$page).on('click', function() {
      location.href = getLastPage()
    })
  }
  // 查看大图
  preViewImage() {
    this.$page.on('click','.J_zoom' ,function () {
      let zoomImages = $(this).attr('data-src')
      let photos = [];
      photos.push(imgPath+zoomImages)
      let myPhotoBrowserPopup = $.photoBrowser({
        photos: photos,
        type: 'popup'
      });
      myPhotoBrowserPopup.open();
    });
  }
  // 输入框填写
  enterInput() {
    let that = this
    $('[name="realAmount"]', this.$page).on('input', function (){
       let re = /[^\d|\.{1}]/g
       let val = $(this).val()
        if (re.test(val)) {  
            $(this).val(val.substring(0, val.length-1))
            $(this).focus(); 
        } 
        that.allMoney()
    })
  }
  // 计算合计
  allMoney() {
    let totalMoney = this.dataOfInput().totalMoney
    $('.J_totalMoneyShow', this.$page).text(totalMoney)
  }
  dataOfInput() {
    let showMoney = $('.J_totalMoneyShow', this.$page)
    let moneyForm = $('.J_financialPay .J_form', this.$page)
    let confirmDebtPay = []
    moneyForm.each(function() {
      let obj = $(this).serializeArray()
       console.log('moneyForm', obj)
      let temObj = {}
      obj.map((item) => {
        if (item.value.indexOf(',') > -1) {
          item.value = item.value.replace(',','')
        }
        temObj[item.name] = item.value
      })
      confirmDebtPay.push(temObj)
    })
    let totalMoney = 0
    confirmDebtPay.map((val) => {
      totalMoney += Number(val.realAmount)
    })
    totalMoney = totalMoney.toFixed(2)
    return {
      totalMoney,
      confirmMoney: confirmDebtPay
    }
  }
  btnEvent() {
    // 异常
    $('.J_unnormal', this.$page).on('click', (e) => {
      let orderNumber = this.orderNumber
      let _time = this._time
      let that = this
      $.modal({
        title: '对账异常？',
        buttons: [{
          text: '取消',
          onClick() {}
        }, {
          text: '确认',
          onClick() {
            $.showPreloader();
            request({
              url: AccountApi.sendbackDebt,
              data: {
                orderNumber,
                _time
              },
              callback(res) {
                $.hidePreloader();
                if (res.success === '1') {
                  $.toast(res.msg);
                  clearListCache()
                  that.filterLastPage()
                  location.href = getLastPage()
                } else {
                  $.alert(res.msg);
                }
              }
            })
          }
        }]
      })
    })
    // 确定实收
    $('.J_confirmPay', this.$page).on('click', (e) => {
      let confirmMoney = this.dataOfInput().confirmMoney
      let orderNumber = this.orderNumber
      let _time = this._time
      let that = this
      $.modal({
        title: '一旦确认提交，将不可修改。',
        buttons: [{
          text: '取消',
          onClick() {}
        }, {
          text: '确认',
          onClick() {
            $.showPreloader();
            request({
              url: AccountApi.confirmDebtPay,
              data: {
                orderNumber,
                confirmMoney: JSON.stringify(confirmMoney),
                _time
              },
              callback(res) {
                $.hidePreloader();
                if (res.success === '1') {
                  $.toast(res.msg)
                  clearListCache()
                  that.filterLastPage()
                  location.href = getLastPage()
                } else {
                  $.alert(res.msg)
                }
              }
            })
          }
        }]
      })
    })
  }
}
  
export default new Page()
