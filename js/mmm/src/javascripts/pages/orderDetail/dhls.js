/**
 * 剪版
 */
import { getCache, formatTimeString, imgPath, getProductType, getParam } from '../../common/utils'
export default class dhls {
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
    return {
      loginInfo, // 登录信息
      imgPath,
      // ygj, // 预估价
      // total, // 总价
      status: data.status, // 状态码
      // isMyTask: data.isMyTask, // 任务当前是否需要自己处理
      orderNumber: data.orderNumber, // 订单号
      payDebtId: getParam('payDebtId'), //
      redwoodDescr: data.redwoodDescr,  // 红杉描述
      handler: data.handler,  // 任务处理人姓名
      handlerTel: data.handlerTel,  // 任务处理人电话
      follower: data.follower,  // 跟单员姓名
      followerTel: data.followerTel,  // 跟单员电话
      serviceNumber: data.serviceNumber,  // 业务号
      createTime: Number(data.createTime) !== 0 ? formatTimeString(data.createTime) : '', // 发布时间
      buyerCompany: data.buyer.company,  // 采购商所在公司
      // myLevel: myLevel[data.buyer.myLevel],// 采购商等级
      contractModelName: data.buyer.contractModelName, // 采购商等级
      contractModelDescr: data.buyer.contractModelDescr, // 采购商等级描述
      sellerCompany: data.sellerCompany, // 供应商
      productLength: data.productList.length, //
      replyAccountUser: data.replyAccountUser, // 供应商开户人姓名 个人
      replyAccountCompany: data.replyAccountCompany, // 供应商开户人姓名 企业
      replyAccountType: data.replyAccountType, // 企业类型
      replyAccountNumber: data.replyAccountNumber, // 供应商卡号
      replyAccountBank: data.replyAccountBank, // 供应商开户行 ,
      replyAccountBranch: data.replyAccountBranch, // 供应商开户支行
      madanImgUrls: data.madanImgUrls,  // 码单图片
      imgUrls: data.imgUrls.length === 0 ? ['/upload/util/default_buy.jpg'] : data.imgUrls, // 产品图片
      productNumber: data.productNumber,  // 货号
      buyType: data.buyType === 'jb' ? '剪版' : '大货',  // 订单类型
      commitType: data.commitType, // 1 表示跟单员 2 销售员
      checkClothString: data.checkCloth === 0 ? '不验货' : '验货',  // 是否需要验货，0不验货 1验货
      productType: getProductType(data.productType), // 品类，商品类型 花型0, 面料1，辅料2，底布3，花布4
      haveRealVersion: data.haveRealVersion === 0 ? '无样版' : '有样版',  // 是否有样版: 0 没有 1有样版
      isProcessByFinance: data.isProcessByFinance, // 是否经过财务 是(1) 不是(0) ,
      earnestMoneyPayType: data.earnestMoneyPayType, // 定金垫付(0)还是实付(1)
      finalMoneyPayType: data.finalMoneyPayType, // 尾款垫付(0)还是实付(1)
      fullMoneyPayType: data.fullMoneyPayType, // 全款垫付(0)还是实付(1)
       earnestMoneyPayStatus: data.earnestMoneyPayStatus, // 采购商支付定金,未付(0), 等待souuya确认(1) soouya已确认收到定金,就是已付(2), soouya已经支付定金给供货商(101)
      finalMoneyPayStatus: data.finalMoneyPayStatus, // 采购商支付尾款,未付(0), 等待souuya确认(1) soouya已确认收到尾款,就是已付(2), soouya已经支付尾款给供货商(101)
      fullMoneyPayStatus: data.fullMoneyPayStatus, // 采购商支付尾款,未付(0), 等待souuya确认(1) soouya已确认收到尾款,就是已付(2), soouya已经支付尾款给供货商(101)

    }
  }

  render(renderData) {
    const doms = this.doms
    doms.content = $('.J_content')
    doms.supplyMethod = $('#supplyMethod')

    const dhlsTpl = 'orderDetail/dhls.html'
    nunjucks.render(dhlsTpl, renderData).then((dhlsHtml) => {
      doms.content.append(dhlsHtml)
    });
    // 费用信息
    const supplyMethodTpl = 'orderDetail/supplyMethod.html'
    nunjucks.render(supplyMethodTpl, renderData).then((supplyMethodHtml) => {
      doms.supplyMethod.append(supplyMethodHtml)
    })
  }

  bindEvents () {

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
