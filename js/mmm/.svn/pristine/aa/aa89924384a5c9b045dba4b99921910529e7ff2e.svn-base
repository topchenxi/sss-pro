/**
 * 订单打印详情
 */
/*
  author  yonghuang
 */
import '../../common/base'
import {
  // getParam,
  formatTimeString,
  getCache,
  imgPath,
  culAdd
} from '../../common/utils'

class PrintDetail {
  constructor() {
    // let that = this
    this._time = new Date().getTime()
    this.doms = {
      container: $('.J_content')
    }
    this.printDetail = getCache({
      key: 'printDetail',
      type: 'sessionStorage',
      dataType: 'json',
    })
    console.log(this.printDetail)
    if (this.printDetail.type === 'DH') {
      document.title = '大货任务通知单'
    } else if (this.printDetail.type === 'PayReq') {
      document.title = '付款申请单'
    }
    // document.title = '大货任务通知单'
    this.renderOrderInfo()
  }
  renderOrderInfo() {
    const that = this
    $.hidePreloader()
    let orderInfo = that.formatOrderInfo(that.printDetail.obj)
    console.log(orderInfo)
    if (that.printDetail.type === 'DH') {
      nunjucks.render('printDetail/DH.html', orderInfo)
      .then((renderHtml) => {
        that.doms.container.html(renderHtml)
        that.bindEvents()
      })
    } else if (that.printDetail.type === 'PayReq') {
      orderInfo = that.PayReqFormat(orderInfo);
      console.log('orderInfo', orderInfo);
      nunjucks.render('printDetail/PayReq.html', orderInfo).then((renderHtml) => {
        that.doms.container.html(renderHtml)
        that.doms.container.html(renderHtml)
        that.resize()
        that.fixImgSize()
        that.bindEvents()
      })
    }
  }

  formatOrderInfo(orderInfo) {
    let that = this
    orderInfo.createTime = orderInfo.createTime ? formatTimeString(orderInfo.createTime) : '';
    orderInfo.imgPath = imgPath
    if (orderInfo.amount) {
      orderInfo.amount = that.formatCurrency(orderInfo.amount)
    }
    if (orderInfo.serviceMoney) {
      orderInfo.serviceMoney = that.formatCurrency(orderInfo.serviceMoney)
    }
    if (orderInfo.totalWithServiceMoney) {
      orderInfo.totalWithServiceMoney = that.formatCurrency(orderInfo.totalWithServiceMoney)
    }
    return orderInfo
  }

  PayReqFormat(orderInfo) {
    orderInfo.fullTime = orderInfo.fullTime ? formatTimeString(orderInfo.fullTime) : '';
    orderInfo.earnestTime = orderInfo.earnestTime ? formatTimeString(orderInfo.earnestTime) : '';
    orderInfo.finalTime = orderInfo.finalTime ? formatTimeString(orderInfo.finalTime) : '';

    if (orderInfo.category == 'dhls-all') {
      orderInfo.total = orderInfo.fullMoney;
    } else {
      if (orderInfo.productSource == '0') {
        // console.log('total', orderInfo.fullMoney, orderInfo.taxMoney);
        orderInfo.total = culAdd(culAdd(orderInfo.fullMoney, orderInfo.taxMoney), orderInfo.serviceMoney);
      } else if (orderInfo.productSource == '1') {
        orderInfo.total = culAdd(culAdd(culAdd(orderInfo.earnestMoney, orderInfo.finalMoney), orderInfo.taxMoney), orderInfo.serviceMoney);
      }
    }

    orderInfo.fullMoney = this.formatCurrency(orderInfo.fullMoney)
    orderInfo.taxMoney = this.formatCurrency(orderInfo.taxMoney)
    orderInfo.earnestMoney = this.formatCurrency(orderInfo.earnestMoney)
    orderInfo.finalMoney = this.formatCurrency(orderInfo.finalMoney)
    orderInfo.total = this.formatCurrency(orderInfo.total)
    return orderInfo;
  }

  formatCurrency(number) {
    let val = Number(number)
    let backVal = parseFloat(val, 10).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
    if (String(backVal) == '-0.00') {
      backVal = '0.00'
    }
    return backVal
  }
  fixImgSize () {
    $('.imgs').each(function() {
      var $this = $(this);
      var src = $this.attr('src');
      if (!src) {
        return;
      }
      var img = new Image();
      img.src = src;
      img.onload = function() {
        if (img.width <= img.height) {
          $this.css({
            'width': 'auto',
            'height': '100%'
          });
        } else {
          $this.css({
            'width': '100%',
            'height': 'auto'
          });
        }
      };
    });
  }
  resize () {
    // const screenWidth = document.body.clientWidth
    // const screenHeight = window.screen.height
    // $('.container-detail').css({
    //   'width': '842px',
    //   'height': '620px'
    // })
  }
  bindEvents() {
    // let that = this

    // $('img').each((i,val)=> {
    //   let img = $(val)
    //   img.on('load', ()=>{
    //     let width = img.width()
    //     let height = img.height()
    //     if(height>width) {
    //       img.addClass('translate')
    //     }
    //   })
    // })
  }
}

export default new PrintDetail()
