/**
 * 用户中心
 */
/*
  author  yonghuang
 */
import '../../common/base'
import { isPC, setCache, checkLogin} from '../../common/utils'
import OrderApi from '../../api/order'
class OrderQuery {
  constructor () {
    let that = this
    this._time = new Date().getTime()
    this.doms = {
        searchInput: $('#search'),
        queryDHBtn: $('.J_query'),
        queryPayReqBtn: $('.J_payRquest_query'),
    }

    if (!isPC()) {
        const printTips = '请用谷歌浏览器访问 ' + location.href + ' 进行打印'
        $('.printTips').text(printTips)
    }
    checkLogin({
      lastPage: location.href
    }, () => {
      this.bindEvents()
    })

  }

  query (type) {
    let serviceNumber = this.doms.searchInput.val()

    if (!serviceNumber) {
        $.alert('请输入需要打印的订单号')
        return
    }
    this.renderOrderInfo(type, serviceNumber)
    // location.href = '/printDetail.html?orderNumber=' + orderNumber +'&type='+ type
  }
  renderOrderInfo(type, serviceNumber) {
    const that = this
    // console.log('OrderApi:', OrderApi)
    // 截取真正后面8位的订单号
    // let serviceNumber = getParam('orderNumber')
    /*let len = Number(serviceNumber.length) - 8
    let orderNumber = serviceNumber.substr(len)*/
    let orderNumber = serviceNumber
    $.showPreloader()
    request({
      url: type === 'DH' ? OrderApi.getDhTaskNotice : OrderApi.getPayApply,
      data: {
        orderNumber: orderNumber,
        _time: that._time
      },
      callback: (res) => {
        $.hidePreloader()
        if (res.success == 1) {
          setCache({
            type: 'sessionStorage',
            dataType: 'json',
            key: 'printDetail',
            value: {
              obj: res.obj,
              type: type
            }
          })
          location.href = '/printDetail.html'
        } else if (res.success == 10009) {
          location.href ='/login.html'

        } else {
          $.alert(res.msg)
        }
        // let orderInfo = that.formatOrderInfo(res)
        // if (this.paramObj.type === 'DH') {
        //   nunjucks.render('printDetail/DH.html', orderInfo)
        //   .then((renderHtml) => {
        //     that.doms.container.html(renderHtml)
        //   })
        // } else if (this.paramObj.type === 'PayReq') {
        //   nunjucks.render('printDetail/PayReq.html', orderInfo)
        //   .then((renderHtml) => {
        //     that.doms.container.html(renderHtml)
        //   })
        // }
      }
    });
  }

  bindEvents () {
    let that = this

    that.doms.queryDHBtn.on('click', function () {
        that.query('DH')
    })

    that.doms.queryPayReqBtn.on('click', function () {
        that.query('PayReq')
    })

    $('.J_goSeeDetail').on('click', function () {
        const host = location.href
        let serviceNumber = that.doms.searchInput.val()
        if (!serviceNumber) {
            $.alert('请输入需要查看订单号')
            return
        }
        if (host.indexOf('test') > -1) {
          window.open("http://testhongshan.soouya.com/index/orderDetail?orderNumber="+serviceNumber+"&noBar=1")
        } else {
          window.open("http://hongshan.soouya.com/index/orderDetail?orderNumber="+serviceNumber+"&noBar=1")
        }

    })

    // that.doms.searchInput.on('keydown', function (e) {
    //     if (e.keyCode === 13) {
    //         that.query()
    //     }
    // })
  }
}

export default new OrderQuery()
