import '../../common/base.js'
import Zhaoban from './zhaoban.js'
import Jianban from './jianban.js'
import DH from './dh.js'
import dhls from './dhls.js'
import {
  setCache,
  checkLogin,
  getParam,
  getLastPage,
  getCache
} from '../../common/utils'
import OrderApi from '../../api/order'
import Footer from './footer'
class Page extends Footer {
  constructor() {
    super()
    this._time = new Date().getTime()
    this.doms = {}
    checkLogin({
      lastPage: location.href
    }, () => {
      this.getOrderDetail()
    })
    this.bindEvents()
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
        $.hidePreloader()
        if (data.success === '1') {
          setCache({ // 将订单详情缓存到本地
            type: 'sessionStorage',
            key: 'orderDetail',
            value: data
          })
          if (data.obj.category === 'zb-all' || data.obj.category === 'zb-zy') { // 找版
            new Zhaoban(data.obj)
            that.bindZBFooterEvents()
          } else if (data.obj.category === 'jb-all') { // 剪版
            new Jianban(data.obj)
            that.bindJBFooterEvents()
          } else if (data.obj.category === 'all-all') { // 大货
            new DH(data.obj)
            that.bindDHFooterEvents()
          } else if (data.obj.category === 'dhls-all') { // 大货流水
            new dhls(data.obj)
          }
          that.bindFooterEvents()
        } else {
          $.alert(data.msg)
        }
      },
      error() {
        $.alert('获取订单详情失败，请刷新重试')
      }
    })
  }
  bindEvents() {
    // 禁止自动返回
    $(document).on('click', '.J_back', () => {
      const updateSellerInfo = getCache({
        key: 'updateSellerInfo',
        dataType: 'json',
        type: 'sessionStorage'
      })
      if (updateSellerInfo) {
        $.modal({
          title: '是否放弃更改供应商',
          text: '',
          buttons: [{
            text: '是',
            onClick() {
              sessionStorage.removeItem('updateSellerInfo')
              back()
            }
          }, {
            text: '否',
            onClick() {

            }
          }]
        })
      } else {
        back()
      }
      function back() {
        const lastPage = getLastPage()
        if (lastPage) {
          location.href = lastPage
        } else {
          location.assign(`http://${location.host}`)
        }
      }
    });

    // 状态列表
    $(document).on('click', '.J_status_list', (e) => {
      if (!$(e.target).is('a')) {
        location.href = '/statusList.html'
      }
    })

    // 添加'refresh'监听器
    $(document).on('refresh', '.pull-to-refresh-content', () => {
      location.reload();
    });
  }

}
export default new Page()
