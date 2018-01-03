/**
 * 剪版
 */
import { getCache, formatTimeString, imgPath, getParam, getProductType, culMul, culAdd } from '../../common/utils'
import OrderApi from '../../api/order'
export default class Jianban {
  constructor (data) {
    this.doms = {}
    const renderData = this.convertData(data)
    this.render(renderData)
    this.bindEvents()
    this.getSendCertificateList()
  }

  convertData(data) {
    const loginInfo = getCache({
      type: 'sessionStorage',
      key: 'currentUser'
    }).loginInfo;
    let ygj = 0;
    let total = 0;
    data.wantProductList = data.wantProductList.map(function(obj, index) {
      obj.productType = getProductType(obj.productType) // 品类，商品类型 花型0, 面料1，辅料2，底布3，花布4
      for (let i = 0, l = obj.colorList.length; i < l; i++) {
        let color = obj.colorList[i]
        ygj = culAdd(ygj, culMul(color.price, color.quantity)).toFixed(2)
      }
      return obj
    });
    data.productList = data.productList.map(function(obj, index) {
      obj.productType = getProductType(obj.productType) // 品类，商品类型 花型0, 面料1，辅料2，底布3，花布4
      obj.expectedArrivalDateString = obj.expectedArrivalDate ? formatTimeString(obj.expectedArrivalDate).split(' ')[0] : ''// 预计到货时间
      for (let i = 0, l = obj.colorList.length; i < l; i++) {
        let color = obj.colorList[i]
        total = culAdd(total, culMul(color.price, color.quantity)).toFixed(2)
      }
      return obj
    });
    const jbCollection = getParam('jbCollection')
    if (jbCollection) {
      loginInfo.jbCollection = jbCollection
    }
    // Tabkey --- 作为确认收版的标志
    loginInfo.tabKey = getParam('tabKey')
    return {
      loginInfo, // 登录信息
      imgPath,
      ygj, // 预估价
      total, // 总价
      status: data.status, // 状态码
      isMyTask: data.isMyTask, // 任务当前是否需要自己处理
      orderNumber: data.orderNumber, // 订单号
      redwoodDescr: data.redwoodDescr,  // 红杉描述
      handler: data.handler,  // 任务处理人姓名
      handlerTel: data.handlerTel,  // 任务处理人电话
      follower: data.follower,  // 跟单员姓名
      followerTel: data.followerTel,  // 跟单员电话
      serviceNumber: data.serviceNumber,  // 业务号
      createTime: Number(data.createTime) !== 0 ? formatTimeString(data.createTime) : '', // 发布时间
      buyerCompany: data.buyer.company,  // 采购商所在公司
      buyerTel: data.buyer.tel,  // 采购商电话
      province: data.province,  // 送货地址 更详细地址
      city: data.city,  // 送货地址 更详细地址
      area: data.area,  // 送货地址 更详细地址
      addr: data.addr,  // 送货地址 更详细地址
      contactName: data.contactName,  // 联系人姓名
      contactTel: data.contactTel,  // 联系人电话
      leaveMessage: data.leaveMessage,  // 留言,采购商留言
      wantProductList: data.wantProductList, // 购买需求
      productList: data.productList, // 购买信息
      madanImgUrls: data.madanImgUrls, // 码单
      standAlone: getParam('tabKey') == 'dqrsk' ? 1 : 0,
      sendType: data.sendType,
      content: data.content, // 任务备注
      sellerCompany: data.sellerCompany,
      sellerTel: data.sellerTel,
      sellerProvince: data.sellerProvince,
      sellerCity: data.sellerCity,
      sellerArea: data.sellerArea,
      sellerAddr: data.sellerAddr
    }
  }

  render(renderData) {
    const doms = this.doms
    doms.content = $('.J_content')
    doms.footer = $('.J_footer')
    const jianbanTpl = 'orderDetail/jianban.html'
    nunjucks.render(jianbanTpl, renderData).then((jianbanHtml) => {
      doms.content.append(jianbanHtml)
    });
    // footer
    const footerTpl = 'orderDetail/footer.html'
    renderData.source = encodeURIComponent(location.pathname + location.search)
    nunjucks.render(footerTpl, { renderData }).then((footerHtml) => {
      doms.footer.append(footerHtml)
    });
  }

  getSendCertificateList() {
    const doms = this.doms
    $.showPreloader()
    request({
      url: OrderApi.getSendCertificateList,
      data: {
        orderNumber: getParam('orderNumber'),
        _time: this._time
      },
      callback(data) {
        $.hidePreloader()
        if (data.success === '1') {
          if (data.result.length) {
            const sendCertificateListTpl = 'orderDetail/sendCertificateList.html'
            data.imgPath = imgPath
            nunjucks.render(sendCertificateListTpl, data).then((html) => {
              doms.content.append(html)
            });
          }
        } else {
          $.alert('获取发货凭据列表失败！');
        }
      }
    });
  }

  bindEvents () {
    $(document).on('click', '.J_caret', function() {
      $(this).siblings().toggle();
    });

    $(document).on('click', '.zb-popup', function () {
      let photos = $(this).find('img').map((i, img) => {
        return $(img).attr('src').split('@')[0]
      })
      var myPhotoBrowserPopup = $.photoBrowser({
        photos,
        type: 'popup'
      });
      myPhotoBrowserPopup.open();
    });
  }
}
