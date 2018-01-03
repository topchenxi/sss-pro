/**
 * 大货
 */
import {
  setCache,
  getCache,
  formatTimeString,
  getProductType,
  imgPath,
  getParam,
  setLastPage
} from '../../common/utils'
import orderApi from '../../api/order.js'
export default class DH {
  constructor (data) {
    this.doms = {}
    const renderData = this.convertData(data)
    this.render(renderData)
    this.bindEvents()
  }
  convertData(data) {
    const loginInfo = getCache({
      type: 'sessionStorage',
      key: 'currentUser'
    }).loginInfo;
    // 大货订单编辑供应商信息的时候存在这个 session
    this.updateSellerInfo = getCache({
      type: 'sessionStorage',
      key: 'updateSellerInfo'
    })
    if (this.updateSellerInfo && this.updateSellerInfo.orderNumber == data.orderNumber) {
      var tmp = {}
      tmp.sellerAddr = this.updateSellerInfo.addr
      tmp.sellerArea = this.updateSellerInfo.area
      tmp.sellerCity = this.updateSellerInfo.city
      tmp.sellerCompany = this.updateSellerInfo.company
      tmp.sellerProvince = this.updateSellerInfo.province
      tmp.sellerTel = this.updateSellerInfo.tel
      tmp.shopId = this.updateSellerInfo.id
      $.extend(data, tmp);
    }
    const collectDebts = getParam('collectDebts')
    if (collectDebts) {
      loginInfo.collectDebts = collectDebts
    }
    let unGetPay = getParam('unGetPay')
    if (unGetPay) {
      loginInfo.unGetPay = unGetPay
    }
    const urgeMoney = getParam('urgeMoney')
    if (urgeMoney) {
      loginInfo.urgeMoney = urgeMoney
    }
    this.orderNumber = data.orderNumber
    let maDan = false
    if ((data.productSource === 0 && data.status > 305) || data.productSource === 1 && data.status > 335) {
      maDan = true
    }
    let payStatus
    if (data.status === 325) {
      payStatus = data.earnestMoneyPayStatus
    }
    if (data.status === 327) {
      payStatus = data.fullMoneyPayStatus
    }
    if (data.status === 345) {
      payStatus = data.finalMoneyPayStatus
    }
    let doneStatus = false
    if (data.status === 3 || data.status === 10 || data.status === 100) { doneStatus = true }
    console.log('dadadad', data);
    const renderData = {
      loginInfo, // 登录信息
      imgPath, // 图片域名
      payStatus, // 实收付状态
      doneStatus, // 完成状态
      isMyTask: data.isMyTask, // 是否是当前能操作的task 是(1) 不是(0)
      redwoodDescr: data.redwoodDescr,  // 红杉描述
      status: data.status,  // 订单状态
      content: data.content,  // 留言，任务备注
      handler: data.handler,  // 任务处理人姓名
      handlerTel: data.handlerTel,  // 任务处理人电话
      handlerRoleName: data.handlerRoleName,  // 任务处理人角色
      follower: data.follower,  // 跟单员姓名
      followerTel: data.followerTel,  // 跟单员电话
      orderNumber: data.orderNumber,  // 订单号
      payDebtId: getParam('payDebtId'), //
      serviceNumber: data.serviceNumber,  // 业务号
      leaveMessage: data.leaveMessage,  // 留言,跟单员留言
      createTime: Number(data.createTime) !== 0 ? formatTimeString(data.createTime) : '',  // 发布时间
      expectedTime: Number(data.expectedTime) !== 0 ? formatTimeString(data.expectedTime, 'yyyy-MM-dd') : '',  // 期望货期
      // urgent: Number(data.expectedTime) != 0 ? ((Number(data.expectedTime) - Number(data.createTime) <= 24 * 3600 * 1000) ? true : false) : false,  // 判断是否加急
      emergency: data.emergency,  // 判断是否加急
      expectedArrivalDate: Number(data.expectedArrivalDate) !== 0 ? formatTimeString(data.expectedArrivalDate, 'yyyy-MM-dd') : '',  // 供应商提供的预计到货时间
      buyer: data.buyer,  // 采购商信息
      // myLevel: myLevel[data.buyer.myLevel], // 采购商等级
      contractModelDescr: data.buyer.contractModelDescr, // 采购商等级描述
      contractModelName: data.buyer.contractModelName, // 采购商等级
      company: data.buyer.company,  // 采购商所在公司
      showSellerSave: this.updateSellerInfo && this.updateSellerInfo.orderNumber == data.orderNumber, // 是否显示在供应商中的保存an'niu
      sellerCompany: data.sellerCompany,  // 供货商档口名
      sellerTel: data.sellerTel,  // 供货商电话
      sellerProvince: data.sellerProvince,  // 供货商（省)
      sellerCity: data.sellerCity,  // 供货商（市）
      sellerArea: data.sellerArea,  // 供货商（区）
      sellerAddr: data.sellerAddr,  // 供货商详细地址
      replyRemark: data.replyRemark,  // 供货商备注
      productNumber: data.productNumber,  // 货号
      productLength: data.productList.length,  // 商品颜色组数
      productType: getProductType(data.productType),  // 品类，商品类型 花型0, 面料1，辅料2，底布3，花布4
      buyType: data.buyType === 'jb' ? '剪版' : '大货',  // 订单类型
      type: data.type,
      typeString: data.type == 1 ? '服务单' : data.type == 2 ? '贸易单' : '',
      checkCloth: data.checkCloth,  // 是否需要验货，0不验货 1验货
      checkClothString: data.checkCloth === 0 ? '不验货' : '验货',  // 是否需要验货，0不验货 1验货
      haveRealVersion: data.haveRealVersion === 0 ? '无样版' : '有样版',  // 是否有样版: 0 没有 1有样版
      madanImgUrls: data.madanImgUrls,  // 码单图片
      productSourceString: data.productSource === 0 ? '现货' : '订货',  // 货源(0 现货 1 订货)
      productSource: data.productSource,  // 货源(0 现货 1 订货)
      sendInneed: data.sendInneed,  // 提货方式(0、提货员提货;1、供应商送货)
      sendInneedString: data.sendInneed === 0 ? '提货员提货' : '供应商送货',  // 提货方式(0、提货员提货;1、供应商送货)
      deliveryProvince: data.deliveryProvince,  // 提货地址(省)
      deliveryCity: data.deliveryCity,  // 提货地址(省)
      deliveryArea: data.deliveryArea,  // 提货地址(省)
      deliveryAddr: data.deliveryAddr,  // 提货地址(省)
      payInvoiceInneed: data.payInvoiceInneed === 1 ? '有发票' : '没有发票',  // 支付时是否需要发票（1是0否供应商是否要发票
      invoiceStatus: data.invoiceStatus === 1 ? '需要发票' : '不要发票',  // 采购商是否要发票
      sendType: data.sendType,  // 配送方式,soouya配送 0 采购商自提 1
      sendTypeString: data.sendType === 1 ? '采购商自提' : '搜芽配送',  // 配送方式,soouya配送 0 采购商自提 1
      contactName: data.contactName,  // 联系人姓名
      contactTel: data.contactTel,  // 联系人电话
      province: data.province,  // 送货地址 更详细地址
      city: data.city,  // 送货地址 更详细地址
      area: data.area,  // 送货地址 更详细地址
      addr: data.addr,  // 送货地址 更详细地址
      saleMoney: data.saleMoney && data.saleMoney.toFixed(2),
      serviceMoney: data.serviceMoney.toFixed(2), // 服务费
      taxMoney: data.taxMoney.toFixed(2), // 税款
      total: data.total.toFixed(2),
      sendCompany: data.sendCompany,  // 快递公司名称
      sendTel: data.sendTel,  //  物流公司联系电话
      estimatedTotal: Number(data.estimatedTotal).toFixed(2),  //  预估价
      maDan, // 是否显示码单
      replyAccountUser: data.replyAccountUser, // 供应商开户人姓名 个人
      replyAccountCompany: data.replyAccountCompany, // 供应商开户人姓名 企业
      replyAccountType: data.replyAccountType, // 企业类型
      replyAccountBank: data.replyAccountBank, // 供应商开户行 ,
      replyAccountBranch: data.replyAccountBranch, // 供应商开户支行
      replyAccountNumber: data.replyAccountNumber, // 供应商银行号码
      purchaserRealName: data.purchaserRealName, // 供应商银绑定的买货员
      sellerContactTel: data.sellerContactTel, // 商家联系人
      sellerContact: data.sellerContact, // 商家联系人电话号码
      imgUrls: data.imgUrls.length === 0 ? ['/upload/util/default_buy.jpg'] : data.imgUrls, // 产品图片
      earnestMoneyPayStatus: data.earnestMoneyPayStatus, // 采购商支付定金,未付(0), 等待souuya确认(1) soouya已确认收到定金,就是已付(2), soouya已经支付定金给供货商(101)
      finalMoneyPayStatus: data.finalMoneyPayStatus, // 采购商支付尾款,未付(0), 等待souuya确认(1) soouya已确认收到尾款,就是已付(2), soouya已经支付尾款给供货商(101)
      fullMoneyPayStatus: data.fullMoneyPayStatus, // 采购商支付尾款,未付(0), 等待souuya确认(1) soouya已确认收到尾款,就是已付(2), soouya已经支付尾款给供货商(101)
      replySendTime: Number(data.replySendTime) !== 0 ? formatTimeString(data.replySendTime, 'yyyy-MM-dd') : '', // 供应商送货时间
      kongCha: data.kongCha, // 空差
      zhiTong: data.zhiTong, // 纸筒
      replaceTime: data.replaceTime, // 换货时间
      replaceTimeString: Number(data.replaceTime) !== 0 ? formatTimeString(data.replaceTime, 'yyyy-MM-dd') : '', // 换货时间
      itemString: JSON.stringify(data), //
      isProcessByFinance: data.isProcessByFinance, // 是否经过财务 是(1) 不是(0) ,
      earnestMoneyPayType: data.earnestMoneyPayType, // 定金垫付(0)还是实付(1)
      finalMoneyPayType: data.finalMoneyPayType, // 尾款垫付(0)还是实付(1)
      fullMoneyPayType: data.fullMoneyPayType, // 全款垫付(0)还是实付(1)
      lastCheckTime: formatTimeString(data.lastCheckTime), // 上次验货时间
      lastChecker: data.lastChecker, // 上次验货人
      checkCount: data.checkCount, // 验货总次数
      billingCycle: data.billingCycle,
      servicePrice: data.servicePrice,
      servicePriceUnit: data.servicePriceUnit,
      clientRewardPrice: data.clientRewardPrice
    }
    const checkFlawList = []
    if (data.checkFlawList && data.checkFlawList.length) {
      data.checkFlawList && data.checkFlawList.map((item, index) => {
        if (item.result == 2) {
          checkFlawList.push(item.number)
        }
      })
      // 将不合格的数据收集起来
      renderData.checkFlawList = checkFlawList.length ? checkFlawList.join(',') : ''
      // 是否显示换货按钮
      if (checkFlawList.length) {
        renderData.notifyReplaceBtnShow = true
      } else {
        renderData.notifyReplaceBtnShow = false
      }
    }
    setCache({
      type: 'sessionStorage',
      dataType: 'json',
      key: 'renderData',
      value: renderData
    })
    return renderData
  }

  render(renderData) {
    const doms = this.doms
    doms.content = $('.J_content')
    doms.footer = $('.J_footer')
    doms.supplyMethod = $('#supplyMethod')


    // 状态
    const statusTpl = 'orderDetail/status.html'
    nunjucks.render(statusTpl, renderData).then((statusHtml) => {
      $('.J_status').append(statusHtml)
    })
    // 供应商信息
    const sellerMsgTpl = 'orderDetail/sellerMsg.html'
    nunjucks.render(sellerMsgTpl, renderData).then((sellerMsgHtml) => {
      console.log(1112)
      doms.content.append(sellerMsgHtml)
    })

    // 订单商品信息
    const productMsgTpl = 'orderDetail/productMsg.html'
    nunjucks.render(productMsgTpl, renderData).then((productMsgHtml) => {
      doms.content.append(productMsgHtml)
    })

    // 价格列表
    const priceTpl = 'orderDetail/price.html'
    nunjucks.render(priceTpl, renderData).then((priceHtml) => {
      doms.content.append(priceHtml)
    })

    // 大货信息
    const dhMsgTpl = 'orderDetail/dhMsg.html'
    nunjucks.render(dhMsgTpl, renderData).then((dhMsgHtml) => {
      doms.content.append(dhMsgHtml)
    })

    // 采购商信息
    const buyerMsgTpl = 'orderDetail/buyerMsg.html'
    nunjucks.render(buyerMsgTpl, renderData).then((buyerMsgHtml) => {
      doms.content.append(buyerMsgHtml)
    })

    // 收货地址信息
    /*const addressTpl = 'orderDetail/address.html'
    nunjucks.render(addressTpl, renderData).then((addressHtml) => {
      const $addressHtml = $(addressHtml)
      doms.content.append($addressHtml)

      doms.sendType = $($addressHtml).find('.J_send_type')
      doms.sendDetail = $($addressHtml).find('.J_send_detail')
    })*/

    // 费用信息
    const priceMsgTpl = 'orderDetail/priceMsg.html'
    nunjucks.render(priceMsgTpl, renderData).then((priceMsgHtml) => {
      doms.content.append(priceMsgHtml)
    })

    // footer
    const footerTpl = 'orderDetail/footer.html'
    renderData.source = encodeURIComponent(location.pathname + location.search)
    nunjucks.render(footerTpl, { renderData }).then((footerHtml) => {
      doms.footer.append(footerHtml)
    })

    // 费用信息
    const supplyMethodTpl = 'orderDetail/supplyMethod.html'
    nunjucks.render(supplyMethodTpl, renderData).then((supplyMethodHtml) => {
      doms.supplyMethod.append(supplyMethodHtml)
    })
  }

  bindEvents() {
    const doms = this.doms

    /**
     * 跳转供应商列表页
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_seller_edit', () => {
      const {
        orderNumber,
        sellerCompany,
        sellerTel,
        sellerAddr
      } = getCache({
        type: 'sessionStorage',
        dataType: 'json',
        key: 'orderDetail'
      }).obj
      setCache({
        type: 'sessionStorage',
        key: 'sellerInfo',
        dataType: 'json',
        value: {
          orderNumber, // 订单号
          sellerCompany, // 供货商档口名
          sellerTel, // 供货商档口电话
          sellerAddr // 供货商详细地址
        }
      })
      setLastPage()
    });
    /**
     * 保存更新的供应商
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_seller_save', () => {
      $.showPreloader()
      // 存在id 是编辑状态
      request({
        url: orderApi.updateSeller,
        data: {
          shopId: this.updateSellerInfo.id,
          orderNumber: this.updateSellerInfo.orderNumber
        },
        cache: false,
        cacheType: 'sessionStorage',
        callback: (data) => {
          $.hidePreloader()
          $.alert(data.msg, () => {
            if (data.success == '1') {
              sessionStorage.removeItem('updateSellerInfo')
              location.reload()
            }
          })
        }
      })
    });

    /**
     * 编辑订单跳转
     */
    $(document).on('click', '.J_edit_order', () => {
      sessionStorage.removeItem('sellerInfo')
    });

    /**
     * 供应商付款方式
     */
    // $(document).on('click', '.J_supply_method', () => {
    //   // const renderData = getCache({
    //   //   type: 'sessionStorage',
    //   //   dataType: 'json',
    //   //   key: 'renderData'
    //   // })
    //   // location.href = '#supplyMethod'
    // });

    /**
     * 编辑配送方式
     */
    $(document).on('click', '.J_send_ways', () => {
      const { obj } = getCache({
        type: 'sessionStorage',
        key: 'orderDetail',
        dataType: 'json'
      });
      setCache({
        type: 'sessionStorage',
        key: 'sendWays',
        dataType: 'json',
        value: {
          orderNumber: obj.orderNumber,
          sendType: obj.sendType,
          leaveMessage: obj.leaveMessage,
          invoiceStatus: obj.invoiceStatus,
          expectedTime: obj.expectedTime,
          obj: {
            addrId: obj.addrId,
            contactName: obj.contactName,  // 联系人姓名
            contactTel: obj.contactTel,  // 联系人电话
            addr: obj.addr,  // 送货地址 更详细地址
            sendCompany: obj.sendCompany,  // 快递公司名称
            sendTel: obj.sendTel  //  物流公司联系电话
          }
        }
      })
    });

    /**
     * 配送方式展开、收缩
     */
    $(document).on('click', '.J_send_type', () => {
      doms.sendDetail.toggle();
    });

    /**
     * 点击时展开大图
     */
    $(document).on('click', '.pb-popup', (e) => {
      const type = $(e.currentTarget).data('type')
      const { obj } = getCache({
        type: 'sessionStorage',
        key: 'orderDetail',
        dataType: 'json'
      });
      let photos = obj[type];
      if (!photos.length) { photos = ['/upload/util/default_buy.jpg'] }
      photos = photos.map((url) => imgPath + url)
      const myPhotoBrowserPopup = $.photoBrowser({
        photos,
        type: 'popup'
      });
      myPhotoBrowserPopup.open();
    });
  }

}
