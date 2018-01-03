import '../../common/base'
import {
  getParam,
  culDiv,
  culMul,
  culAdd,
  getServiceRate,
  setCache,
  getCache,
  imgPath,
  formatTimeString,
  lrzConfig,
  clearListCache,
  setLastPage
} from '../../common/utils'
import OrderApi from '../../api/order'
import lrz from '../../vendor/lrz'
// /inputInfo.html?renderType=(0,1 --录入大货，尾款)&orderNumber=10249846&isEditOrNot=(0,1--录入，修改)
// 采购商税款 =（成本单价+服务费单价）*采购商税点*采购数量
// 服务费 = 服务费单价*采购数量
// 成本货款 = 成本单价*采购数量
class InputBigGood {
  constructor() {
    this._time = new Date().getTime()
    this.$page = $('#inputBigGood')
    this.bindEvent()
    this.storeGoBackLink()

  }
  bindEvent() {
    const that = this
    // 订单详情信息
    this.orderNumber = getParam('orderNumber')
    this.isEditOrNot = getParam('isEditOrNot') // 录入还是修改 0 --录入 1 --修改
    this.source = decodeURI(getParam('source')) // 录入还是修改 0 --录入 1 --修改
    this.markFromPc = getParam('markFromPc')
    this.shopCartList = getParam('from')
    this.pcInputDh = getParam('pcInputDh')
    const isStoreOrderDetail = getCache({
      type: 'sessionStorage',
      key: 'orderDetail'
    })
    if (isStoreOrderDetail && isStoreOrderDetail.obj.orderNumber == this.orderNumber) {
      console.log('回来的', isStoreOrderDetail.obj)
      that.renderTpl(isStoreOrderDetail.obj)
    } else {
      that.reqOrderDetail()
    }
    if (this.pcInputDh) {
      $('.J_goback').hide()
    }
  }
  // 单独请求订单详情拿数据
  reqOrderDetail() {
    $.showPreloader()
    const that = this
    request({
      url: OrderApi.getDetail,
      data: {
        orderNumber: this.orderNumber,
        _time: that._time
      },
      cache: false,
      callback(data) {
        $.hidePreloader()
        if (data.success == 1) {
          setCache({
            type: 'sessionStorage',
            key: 'orderDetail',
            value: data
          })
          that.renderTpl(data.obj)
        } else {
          $.toast(data.msg)
        }
      }
    })
  }
  renderTpl (orderDetail) {
    const that = this
    const currentUser = getCache({
      key: 'currentUser'
    })
    this.currentUser = currentUser
    orderDetail.isEditOrNot = this.isEditOrNot
    let moneyDetail = this.getStoreDetail()
    let totalMoney = moneyDetail.totalMoney
    // let totalCounts = moneyDetail.totalCounts
    orderDetail.totalCounts = moneyDetail.totalCounts // 总购买数量
    orderDetail.quantityUnit = moneyDetail.quantityUnit // 数量单位
    // 临时跳转回来的数据存起来
    this.tempData = getCache({
      type: 'sessionStorage',
      key: 'tempData'
    })
    const widthAndWeigth = (Number(orderDetail.replyWeigth) + Number(orderDetail.replyWidth)).toFixed(2)
    // const countServiceMoney = this.countServiceMoney(orderDetail, totalMoney) // 计算服务费

    if (this.isEditOrNot == 0 && Number(orderDetail.costMoney) == 0) {
      orderDetail.costMoney = Number(orderDetail.costMoney).toFixed(2)
      //orderDetail.serviceMoney = Number(countServiceMoney).toFixed(2)
    } else if (this.isEditOrNot == 1 && !this.tempData) {
      orderDetail.costMoney = Number(orderDetail.costMoney).toFixed(2)
      //orderDetail.serviceMoney = Number(orderDetail.serviceMoney).toFixed(2)
    }

    if (this.tempData) {
      // 判断什么时候取修改后的货款
      let tempTotalMoney = Number(this.tempData.tempTotalMoney).toFixed(2)
      let tempquantityUnit = this.tempData.quantityUnit
      let tempwidthAndWeigth = Number(this.tempData.widthAndWeigth).toFixed(2)
      totalMoney = totalMoney.toFixed(2)

      if (tempTotalMoney == totalMoney) {
        if (tempquantityUnit != orderDetail.quantityUnit || (tempwidthAndWeigth && tempwidthAndWeigth != widthAndWeigth)) {
          console.log('不同单位')
          //this.tempData.costMoney = Number(totalMoney).toFixed(2)  // 总价格
          //this.tempData.serviceMoney = Number(countServiceMoney).toFixed(2)
        } else {
          console.log('同单位')
          //orderDetail.costMoney = Number(orderDetail.costMoney).toFixed(2)
          //orderDetail.serviceMoney = Number(orderDetail.serviceMoney).toFixed(2)
        }
      } else if (tempTotalMoney != totalMoney) {
        //this.tempData.costMoney = Number(totalMoney).toFixed(2)  // 总价格
        // 此处判断什么时候取什么时候的服务费
        //this.tempData.serviceMoney = Number(countServiceMoney).toFixed(2)
      }
    }
     // 如果存在临时的taxPoint就先把值赋给 orderDetail.taxPoint
     let taxYesNo = false
     if (this.tempData) {
       if (orderDetail.taxPoint != this.tempData.taxPoint) {
         taxYesNo = true
       }
       orderDetail.taxPoint = this.tempData.taxPoint
     }
    // 如果存在临时的sellerTaxPoint就先把值赋给 orderDetail.sellerTaxPoint
     let sellerTaxYesNo = false
     if (this.tempData) {
       if (orderDetail.sellerTaxPoint != this.tempData.sellerTaxPoint) {
         sellerTaxYesNo = true
       }
       orderDetail.sellerTaxPoint = this.tempData.sellerTaxPoint
     }


     // 货源为现货的总计
    orderDetail.imgPath = imgPath
    orderDetail.proLen = orderDetail.productList.length
    // 采购商税款 =（成本单价+服务费单价）*采购商税点*采购数量
    // 服务费 = 服务费单价*采购数量
    // 成本货款 = 成本单价*采购数量
    let serviceMoney = 0 // 服务费
    let costMoney = 0 // 成本货款
    let saleMoney = 0 // 销售货款
    let totalQuantity = 0 // 总数量
    let taxMoney = 0  // 采购商税费
    let sellerTaxMoney = 0 // 供应商税费
    let buyMoney = 0 //
    if (orderDetail.productList.length > 0) {
      for (let i = 0; i < orderDetail.productList.length; i++) {
        if (orderDetail.productList[i].price) {
          costMoney += orderDetail.productList[i].price * orderDetail.productList[i].quantity
        } else {
          orderDetail.productList[i].price = 0
        }
        if (orderDetail.productList[i].salePrice) {
          saleMoney += orderDetail.productList[i].salePrice * orderDetail.productList[i].quantity
        }
        totalQuantity += parseFloat(orderDetail.productList[i].quantity)
        if (orderDetail.type == 1) { // 服务单
          taxMoney += (parseFloat(orderDetail.productList[i].price) + parseFloat(orderDetail.servicePrice)) * parseFloat(orderDetail.taxPoint) * 0.01 * parseFloat(orderDetail.productList[i].quantity)
        } else {
          taxMoney += (parseFloat(orderDetail.productList[i].price)) * parseFloat(orderDetail.taxPoint) * 0.01 * parseFloat(orderDetail.productList[i].quantity)
        }

        if (orderDetail.productList[i].buyPrice) {
          buyMoney += parseFloat(orderDetail.productList[i].buyPrice) * parseFloat(orderDetail.productList[i].quantity)
        }

        // 供应商税费

          if (!orderDetail.sellerTaxPoint) {
            sellerTaxMoney = 0
          } else {
            sellerTaxMoney += (parseFloat(orderDetail.productList[i].price)) * parseFloat(orderDetail.sellerTaxPoint) * 0.01 * parseFloat(orderDetail.productList[i].quantity)
          }
        serviceMoney += parseFloat(orderDetail.servicePrice) * orderDetail.productList[i].quantity
      }
    }
    // orderDetail.costMoney = this.costMoney = costMoney.toFixed(2)
    // orderDetail.taxMoney = this.taxMoney = taxMoney.toFixed(2)
    // orderDetail.taxMoney = (saleMoney * orderDetail.taxPoint * 0.01).toFixed(2)
    let megerDetail
    if (this.tempData) { // 页面需要的传值计算
      // this.tempData.taxMoney = orderDetail.taxMoney
      this.tempData.expectedArrivalDateString = formatTimeString(this.tempData.expectedArrivalDate, 'yyyy-MM-dd')
      if (orderDetail.hasfix && currentUser.loginInfo.woodPurchaser) { // 这个是买货员可以修改的成本货款
        this.tempData.hasfix = orderDetail.hasfix
        this.tempData.saleMoney = Number(saleMoney).toFixed(2)
        this.tempData.costMoney = (Number(costMoney) + Number(sellerTaxMoney)).toFixed(2)
        this.tempData.servicePriceUnit = orderDetail.servicePriceUnit
        this.tempData.costMoneyOffTax = Number(costMoney).toFixed(2)
      }

      console.log(this.tempData)
      if (orderDetail.hasfix && currentUser.loginInfo.woodFollowLeader) { // 这个是跟单员可以修改的 采购商税款 服务费
        this.tempData.hasfix = orderDetail.hasfix
        this.tempData.saleMoney = Number(saleMoney).toFixed(2)
        this.tempData.serviceMoney = Number(serviceMoney).toFixed(2)
        this.tempData.costMoney = (Number(costMoney) + Number(sellerTaxMoney)).toFixed(2)
        this.tempData.costMoneyOffTax = Number(costMoney).toFixed(2)
        this.tempData.servicePriceUnit = orderDetail.servicePriceUnit
      }
      // 跟单员的
      if ((orderDetail.hasfix && currentUser.loginInfo.woodFollowLeader) || taxYesNo) {
        this.tempData.taxMoney = Number(taxMoney).toFixed(2)
        this.tempData.servicePriceUnit = orderDetail.servicePriceUnit
      }
      if (orderDetail.hasfix || sellerTaxYesNo) {
        // 供应商税费
        this.tempData.sellerTaxMoney = Number(sellerTaxMoney).toFixed(2)
      }
      // 所有的人都需要?
      this.tempData.buyMoney = (Number(buyMoney) + Number(sellerTaxMoney)).toFixed(2)
      this.tempData.buyMoneyOffTax = Number(buyMoney).toFixed(2)
      megerDetail = $.extend({}, orderDetail, this.tempData, this.getSellerInfo(), this.getsellerAccounts())
    } else {
      // if (orderDetail.sellerTaxMoney) {
      //   orderDetail.buyMoneyOffTax = ( Number(orderDetail.buyMoney) - Number(orderDetail.sellerTaxMoney) ).toFixed(2)
      // } else {
      //   orderDetail.buyMoneyOffTax = orderDetail.buyMoney
      // }
      megerDetail = $.extend({}, orderDetail, this.getSellerInfo(), this.getsellerAccounts())
      megerDetail.expectedArrivalDateString = formatTimeString(orderDetail.expectedArrivalDate, 'yyyy-MM-dd')
    }

    // megerDetail.saleMoney = saleMoney.toFixed(2)
    // megerDetail.serviceMoney = (megerDetail.servicePrice * totalQuantity).toFixed(2)

    const bigGoodTpl = currentUser.loginInfo.woodPurchaser ? 'inputInfo/buyerInputBigGood.html' : 'inputInfo/inputBigGood.html'
    megerDetail.woodPurchaser = currentUser.loginInfo.woodPurchaser
    this.megerDetail = megerDetail
    megerDetail.total = megerDetail.saleMoney // 支付总额与销售货款显示同样值
    // megerDetail.taxMoney = Number(megerDetail.taxMoney).toFixed(2)
    megerDetail.servicePrice = orderDetail.servicePrice
    this.orderDetail = orderDetail
    nunjucks.render(bigGoodTpl, megerDetail).then((res) => {
      if (this.isEditOrNot == 0) {
        $('.J_input_title').text('录入大货信息')
      } else {
        $('.J_input_title').text('修改大货信息')
      }
      // 渲染主模板
      $('.J_record_content').html(res)
      // 渲染左下角
      /*let leftCorner = 'inputInfo/leftCorner.html'
      nunjucks.render(leftCorner, megerDetail).then((leftCornerHtml) => {
        $('.J_leftCorner', this.$page).html(leftCornerHtml)
        this.countTotalMoney()
      })*/

      if ((megerDetail.status == 312) || (megerDetail.status == 316)) {
          console.log('nothing')
        } else {
          $('[name="expectedArrivalDate"]').calendar({})
        }
      // 供应商收款方式显示模板
      let accountTpl = 'inputInfo/accountTpl.html';
      nunjucks.render(accountTpl, megerDetail).then((rendTpl) => {
        $('.J_account', this.$supplyPage).html(rendTpl)
      })
      // shopId供下面跳转供应商收款方式使用
      this.shopId = megerDetail.shopId
      // 供应商收款方式跳页编辑
      this.goEidtSupplyMethod()

      this.uploadImage()
      this.delImages()
     // 供下面调用
      // this.orderDetail = megerDetail
      // 修改货款调整服务费

      that.adjustServiceMoney(megerDetail)
      this.handleEarnestMoney()
      this.handleBigGood()
      this.goBack()
      // 结束
      // 绑定初始图片放大
      this.zoomImages()
      // 跳转
      this.goEidtSupply(this.orderDetail)
      this.goEditColor(this.orderDetail)

      this.backPage()
      this.remarkFill()
      this.adjustMoney()
      this.changeSupplyBill()
      // this.changeTaxPoint()
      // this.changeSaleMoney()
      this.changeEarnestMoney()
      this.caculateTaxPoint()
      this.linkShow(this.orderDetail)

      this.linkSeller()
      this.caculateSellerTaxPoint()
      this.linkSellerInput()
      this.linkCostMoney()
      this.linkBuyMoney()

      if (this.isEditOrNot == 0 && !this.tempData) {
        // this.countTaxMoney(megerDetail.costMoney)
      }

      if (this.tempData && (this.tempData.tempTotalMoney != totalMoney)) {
        // this.countTaxMoney(megerDetail.costMoney)
      }
      if (this.tempData && this.tempData.tempTotalMoney == totalMoney) {
        if (this.tempData.quantityUnit != orderDetail.quantityUnit) {
          // this.countTaxMoney(megerDetail.costMoney)
        }
      }
    })
  }
  // 成本货款（不含税）联动
  linkCostMoney () {
    $('.J_costMoneyOffTax [name="costMoneyOffTax"]').on('keyup', function() {
       let costMoneyOffTax = parseFloat($(this).val())
       let sellerTaxMoney = $('.J_sellerTaxMoney [name="sellerTaxMoney"]').val()
       let buyMoneyOffTax = $('.J_buyMoneyOffTax [name="buyMoneyOffTax"]').val()
       if (buyMoneyOffTax < parseFloat(costMoneyOffTax)) buyMoneyOffTax = costMoneyOffTax;
       $('.J_costMoney [name="costMoney"]').val( (Number(sellerTaxMoney)+Number($(this).val())).toFixed(2) )
       $('.J_buyMoneyOffTax [name="buyMoneyOffTax"]').val( Number(buyMoneyOffTax).toFixed(2) )
       $('.J_buyMoney [name="buyMoney"]').val( (Number(sellerTaxMoney)+Number(buyMoneyOffTax)).toFixed(2) )
    })

    $('.J_costMoney [name=costMoney]').on('keyup', function() {
      let sellerTaxMoney = $('.J_sellerTaxMoney [name="sellerTaxMoney"]').val()
      let costMoney = parseFloat($(this).val())
      let buyMoney = parseFloat($('.J_buyMoney [name=buyMoney]').val())
      if (buyMoney < costMoney) {
        $('.J_buyMoney [name=buyMoney]').val(costMoney)
        $('.J_buyMoneyOffTax [name="buyMoneyOffTax"]').val( (Number(costMoney) - Number(sellerTaxMoney)).toFixed(2) )
      }
    })
  }
  // 采购货款（不含税）联动
  linkBuyMoney () {
    $('.J_buyMoneyOffTax [name="buyMoneyOffTax"]').on('keyup', function () {
       let costMoneyOffTax = $('.J_costMoneyOffTax [name="costMoneyOffTax"]').val()
       let sellerTaxMoney = $('.J_sellerTaxMoney [name="sellerTaxMoney"]').val()
       let buyMoneyOffTax = parseFloat($(this).val())
       if (buyMoneyOffTax < parseFloat(costMoneyOffTax)) buyMoneyOffTax = costMoneyOffTax;
       $('.J_buyMoney [name="buyMoney"]').val( (Number(sellerTaxMoney)+Number(buyMoneyOffTax)).toFixed(2) )
    })

    $('.J_buyMoney [name=buyMoney]').on('keyup', function () {
      let buyMoney = parseFloat($(this).val())
      let costMoney = parseFloat($('.J_costMoney [name=costMoney]').val())
      if (costMoney && buyMoney < costMoney) {
        // $(this).val(costMoney)
      }
    })
  }
  // 供应商发票选择联动供应商税点
  linkSeller () {
    let that = this
    $('.J_sellerPayBill').on('change', function() {
      if ($(this).val() == 1) {
        $('.J_sellerTaxPoint').show()
        $('.J_extra_wrapContent').show()
      } else {
        $('.J_sellerTaxPoint').hide()
        $('.J_extra_wrapContent').hide()
      }
      $('.J_sellerTaxPoint_inpt [name="sellerTaxPoint"]').val(0)
      that.rewriteMoney(0, 1) // 多传一个1为了重置
    })
  }
  // 供应商税款修改联动
  linkSellerInput () {
    $('.J_sellerTaxMoney [name="sellerTaxMoney"]').on('keyup', function() {
      let costMoneyOffTax = $('.J_costMoneyOffTax [name="costMoneyOffTax"]').val()
      $('.J_costMoney [name="costMoney"]').val((Number(costMoneyOffTax) + Number($(this).val())).toFixed(2))

      let buyMoneyOffTax = $('.J_buyMoneyOffTax [name="buyMoneyOffTax"]').val()
      $('.J_buyMoney [name="buyMoney"]').val((Number(buyMoneyOffTax) + Number($(this).val())).toFixed(2))
    })
  }
  // 计算供应商税点联动的地方
  caculateSellerTaxPoint () {
    let that = this
    $('.J_sellerTaxPoint_inpt [name="sellerTaxPoint"]', this.$page).on('keyup', function() {
       let taxPoint = $(this).val()
       that.rewriteMoney(taxPoint)
    })
  }
  // 供应商和成本货款联动
  rewriteMoney (taxPoint, index) {
    let totalInfo = this.reCaculateSellerTaxMoney(taxPoint)
    console.log('计算出来的', totalInfo);
    let sellerTaxMoney = totalInfo.sellerTaxMoney
    let buyMoneyOffTax = 0
    let costMoneyOffTax = 0
    if (index) {
      costMoneyOffTax = totalInfo.costMoney
      buyMoneyOffTax = totalInfo.buyMoney
    } else {
      costMoneyOffTax = $('.J_costMoneyOffTax [name="costMoneyOffTax"]').val()
      buyMoneyOffTax = $('.J_buyMoneyOffTax [name="buyMoneyOffTax"]').val()
    }
    $(".J_sellerTaxMoney [name='sellerTaxMoney']").val(sellerTaxMoney.toFixed(2))
    $('.J_sellerTaxMoney_text').text(taxPoint)
    $('.J_costMoneyOffTax [name="costMoneyOffTax"]').val(Number(costMoneyOffTax).toFixed(2))
    $('.J_buyMoneyOffTax [name="buyMoneyOffTax"]').val(Number(buyMoneyOffTax).toFixed(2))
    let costMoney = ( Number(costMoneyOffTax) + Number(sellerTaxMoney) ).toFixed(2)
    let buyMoney = (Number(buyMoneyOffTax) + Number(sellerTaxMoney)).toFixed(2)
    console.log('costMoney', costMoney);
    $('.J_costMoney [name="costMoney"]').val(costMoney)
    $('.J_buyMoney [name="buyMoney"]').val(buyMoney)
  }
  // 手动改供应商税点时，重新计算供应商税费
  reCaculateSellerTaxMoney (sendTaxPoint) {
    let sellerTaxMoney = 0  // 供应商税费
    let costMoney = 0  // 成本货款
    let buyMoney = 0 // 采购货款
    if (this.orderDetail.productList.length > 0) {
      for (let i = 0; i < this.orderDetail.productList.length; i++) {
        costMoney += this.orderDetail.productList[i].price * this.orderDetail.productList[i].quantity
        buyMoney += this.orderDetail.productList[i].buyPrice * this.orderDetail.productList[i].quantity
        sellerTaxMoney += (parseFloat(this.orderDetail.productList[i].price)) * parseFloat(sendTaxPoint) * 0.01 * parseFloat(this.orderDetail.productList[i].quantity)
      }
    }
    console.log('this.orderDetail.productList',  this.orderDetail.productList);
    return {sellerTaxMoney, costMoney, buyMoney}
  }
  // 跟单员手动修改销售货款联动支付总额显示
  linkShow (orderDetail) {
    $(".J_onlyForFollower").on('keyup', function () {
       if (orderDetail.productSource == 0) {
         $('.J_onlyForFollowerText').text($(this).val())
       }
    })
  }
  // 手动改采购商税点时，重新计算采购商税费
  reCaculateTaxMoney (sendTaxPoint) {
    let taxMoney = 0  // 采购商税费
    if (this.orderDetail.productList.length > 0) {
      for (let i = 0; i < this.orderDetail.productList.length; i++) {
        if (this.orderDetail.type == 1) { // 服务单
          taxMoney += (parseFloat(this.orderDetail.productList[i].price) + parseFloat(this.orderDetail.servicePrice)) * parseFloat(sendTaxPoint) * 0.01 * parseFloat(this.orderDetail.productList[i].quantity)
        } else {
          taxMoney += (parseFloat(this.orderDetail.productList[i].price)) * parseFloat(sendTaxPoint) * 0.01 * parseFloat(this.orderDetail.productList[i].quantity)
        }
      }
    }
    return taxMoney
  }
  // 计算采购商税点联动的地方
  caculateTaxPoint () {
    let that = this
    $('.J_taxPoint', this.$page).on('keyup', function() {
       let taxPoint = $(this).val()
       let taxMoney = that.reCaculateTaxMoney(taxPoint)
       $(".J_taxMoney [name='taxMoney']").val(taxMoney.toFixed(2))
       $('.J_taxPoint_text').text(taxPoint)
    })
  }
  calTotalMoney () {
    // 采购商税款 =（成本单价+服务费单价）*采购商税点*采购数量
    // 服务费 = 服务费单价*采购数量
    // 成本货款 = 成本单价*采购数量
    const self = this
    self.saleMoney = parseFloat($('.J_saleMoney').val())
    self.serviceMoney = parseFloat($('.J_yh_service').val())
    //let totalMoney = self.saleMoney + self.serviceMoney + self.taxMoney
    let totalMoney = self.saleMoney
    if (this.megerDetail.productSource == 0) {
      $('.J_totalMoney').text(totalMoney.toFixed(2))
    } else if (this.megerDetail.productSource == 1) {
      $('.J_totalMoney').text(self.earnestMoney.toFixed(2))
    }
  }
  changeEarnestMoney () {
    const self = this
    $('.J_earnestMoney').on('keyup', function () {
      let earnestMoney = $(this).val()
      $('.J_showMoneyChange').text(earnestMoney)
      // self.earnestMoney = parseFloat(earnestMoney)
      // self.calTotalMoney()
    })
  }
  // changeSaleMoney () {
  //   const self = this
  //   $('.J_saleMoney').on('change', function () {
  //     const taxPoint = $('.J_taxPoint').val()
  //     const saleMoney = $(this).val()
  //     const taxMoney = saleMoney * taxPoint * 0.01
  //     self.taxMoney = taxMoney
  //     self.saleMoney = saleMoney
  //     $('.J_taxMoney').text(taxMoney.toFixed(2))
  //     self.calTotalMoney()
  //   })
  // }
  // changeTaxPoint () {
  //   const self = this
  //   $('.J_taxPoint').on('change', function () {
  //     const saleMoney = $('[name="saleMoney"]').val()
  //     const costMoney = $('.J_costMoney').text()
  //     const taxPoint = $(this).val()
  //     const taxMoney = saleMoney * taxPoint * 0.01
  //     self.taxPoint = taxPoint
  //     self.taxMoney = taxMoney
  //     self.serviceMoney = saleMoney - costMoney - taxMoney
  //     $('.J_yh_service').val(self.serviceMoney.toFixed(2))
  //     $('.J_taxPoint_text').text(taxPoint)
  //     $('.J_taxMoney').text(taxMoney.toFixed(2))
  //     self.calTotalMoney()
  //   })
  // }
  // 供应商信息sellerInfo
  getSellerInfo() {
    let sellerInfo = getCache({
      key: 'sellerInfo'
    })
    if (sellerInfo) {
      sellerInfo.shopId = sellerInfo.id
      return sellerInfo
    } else {
      return {}
    }
  }
  // 供应商收款方式
  getsellerAccounts() {
    let sellerAccounts = getCache({
      key: 'sellerAccounts'
    })
    if (sellerAccounts) {
      delete sellerAccounts.shopId
      delete sellerAccounts.type
      sellerAccounts.bankAccountId = sellerAccounts.id
      return sellerAccounts
    } else {
      return {}
    }
  }
  // setBankAccountId
  setBankAccountId() {
    let id = $('.J_bankAccountId').val()
    let sellerAccounts = getCache({
      key: 'sellerAccounts'
    })
    if (sellerAccounts) {
      sellerAccounts.id = id
      setCache({
        key: 'sellerAccounts',
        value: sellerAccounts
      })
    } else {
      setCache({
        key: 'sellerAccounts',
        value: {id: id}
      })
    }
  }
  goBackLink() {
    let url = getCache({
      type: 'sessionStorage',
      key: 'temSourceUrl'
    })
    sessionStorage.removeItem('temSourceUrl')
    sessionStorage.removeItem('tempData')
    sessionStorage.removeItem('orderDetail')
    sessionStorage.removeItem('sellerInfo')
    sessionStorage.removeItem('sellerAccounts')
    let temShopUrl = getCache({
      key: 'shopCartListUrl'
    })

    if (temShopUrl) {
      sessionStorage.removeItem('shopCartListUrl')
      location.href = '/shopCartList.html'
    } else if (url) {
      location.href = url
    } else {
      // window.history.back(-1)
      location.href = '/orderList.html?Tabkey=xj&category=all-all'
    }
  }
  storeGoBackLink() {
    let url = getCache({
      key: 'temSourceUrl'
    })

    let temShopUrl = getCache({
      key: 'shopCartListUrl'
    })

    if (!temShopUrl) {
      let shopCartListUrl = getParam('from')
      if (shopCartListUrl) {
        setCache({
          key: 'shopCartListUrl',
          value: shopCartListUrl
        })
      }
    }
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
  // 备注限定
  remarkFill() {
    $('#inputBigGood').on('keyup', '.J_replyRemark', function() {
      let val = $(this).val()
      if (!/^[^"&]{0,200}$/gi.test(val)) {
        $(this).val(val.substring(0, 200))
      }
    })
  }
  // 供应商发票更改
  changeSupplyBill() {
    let that = this
    $('[name="payInvoiceInneed"]', this.$page).on('change', function() {
      let val = $(this).val()
      let costMoneys = $('.J_costMoney', that.$page).val()
      that.updateOrderDetail({payInvoiceInneed: val})
      // that.countTaxMoney(costMoneys)
    })
  }
  // 随时更新orderDetail
  updateOrderDetail(obj) {
    let orderDetail = getCache({
      key: 'orderDetail'
    }).obj
    let megerDetail = $.extend({}, orderDetail, obj)
    setCache({
      key: 'orderDetail',
      value: {
        obj: megerDetail
      }
    })
  }
  // 货款变更时使采购商税款和服务费作相应变动
  adjustMoney() {
    let that = this
    $('.J_costMoney', this.$page).on('keyup', function() {
      let costMoney = $(this).val()
      that.updateOrderDetail({
        costMoney: costMoney
      })
      let checkCloth = that.getCheckCloth()
      that.orderDetail.checkCloth = checkCloth;
      that.countTaxMoney(costMoney)
    })
  }
  // 后退
  backPage() {
    let that = this
    let back = $('.J_goback', this.$page)
    if (this.shopCartList == 'shopCartList') {
      back.hide()
    }
    back.on('click', () => {
      $.modal({
        title: '是否保存修改?',
        buttons: [
          {
            text: '不保存',
            onClick() {
              sessionStorage.removeItem('tempData')
              that.goBackLink()
            }
          },
          {
            text: '保存',
            bold: true,
            onClick() {
              that.collectAllData()
            }
          }
        ]
      })
    })
  }
  // 供应商返回
  goBack() {
    let that = this
    $('.J_back', this.$supplyPage).on('click', () => {
      history.go(-1)
      return false
    })
  }
  // 收集供应商收款方式
  collectSupply() {
    return {}
  }
  // 处理订金状态
  handleEarnestMoney() {
    $('[name="earnestMoney"]', this.$page).on('input', function() {
      $('.J_total_prepay').text(Number($(this).val()).toFixed(2))
    })
  }
  // 计算现货总金额
  countTotalMoney() {
    let that = this
    let costMoney = $('.J_costMoney', that.$page).val()
    let taxMoney = $('.J_taxMoney', that.$page).val()
    let serviceMoney = $('.J_yh_service', that.$page).val()
    //let total = (Number(costMoney) + Number(taxMoney) + Number(serviceMoney)).toFixed(2)
    let total = $('.J_saleMoney').val()
    $('.J_total_cash', that.$page).text(total)
  }
  // 处理录入大货逻辑
  handleBigGood() {
      let that = this
      let $bigGood = $('.J_big_good');
      let $payContent = $bigGood.find('.J_order_good');
      // 货源
      $bigGood.find('.good-source').on('change', (e) => {
          let num = $(e.target).attr('data-num')
          that.orderDetail.productSource = num
          that.storeProductSource = num
          that.updateOrderDetail({
            productSource: num
          })
          if (num == 0) {
              $payContent.hide()
              $('.J_yh').show()
              $('.J_dj').hide()
              $('.J_showPre').hide()
              $('.J_total_title').text('支付总额')
              that.countTotalMoney()
              $('.J_total_cash').show()
              $('.J_total_prepay').hide()
          } else {
              $payContent.show()
              $('.J_showPre').show()
              $('.J_yh').hide()
               $('.J_dj').show()
              let dj = Number($('[name="earnestMoney"]').val())
              $('.J_total_title').text('支付订金')
              $('.J_total_cash').hide()
              $('.J_total_prepay').show().text(dj)
          }
          that.showLogicWord(num)
      })
     this.saveBigGood()
     this.checkClothChange()
  }
  showLogicWord (index) {
    if (index == 0) { // 现货
      $(".J_y_saleMoney_title").text('支付总额：')
      $('.J_showMoneyChange').text($('.J_y_saleMoney').text())
    } else { // 订货
      $(".J_y_saleMoney_title").text('支付订金：')
      $('.J_showMoneyChange').text($('.J_earnestMoney').val())
    }
  }
  // 验货切换
  checkClothChange() {
    let that = this
    $('.J_checkCloth', this.$page).on('change', function() {
        let val = $(this).val()
        let costMoney = $('.J_costMoney').val()
        that.updateOrderDetail({
          checkCloth: val
        })
        let tempOrderDetail = that.getStoreDetail().orderDetail
        let serviceMoney = that.countServiceMoney(tempOrderDetail, costMoney)
        // $('.J_yh_service').val(Number(serviceMoney).toFixed(2))
        // that.countTotalMoney()
    })
  }
  // 调整服务费
  adjustServiceMoney(orderDetail) {
    let that = this
    $('[name="costMoney"]', this.$page).on('input', (e) => {
       let val = $(e.target).val()
       let serviceMoney = $('[name="serviceMoney"]', that.$page).val()
    })
    $('[name="serviceMoney"]', this.$page).on('input', (e) => {
       let serviceMoney = $(e.target).val()
       that.serviceMoney = serviceMoney
    })
    // 计算现货总计
    $('.J_common_count').on('input', (e) => {
      let orderDetail = this.getStoreDetail().orderDetail
          that.countTotalMoney()
    })
    // 只能输入>=0的数
    // $('[type="number"]', this.$page).on('input', (e) => {
    //   let val = $(e.target).val()
    // })
  }
  // 获取验货与不验货value 0 - 1
  getCheckCloth() {
    let checkCloth
     $('.J_checkCloth').each(function() {
        if ($(this).prop('checked')) {
          checkCloth = $(this).val()
        }
      })
    return checkCloth
  }
  // 计算货款
  getStoreDetail() {
    let orderDetail = getCache({
      key: 'orderDetail'
    }).obj
    let totalCounts = 0  // 计算总购买量
    let totalMoney = 0 // 计算货款
    let quantityUnit
    let subtotal = 0
    orderDetail.productList.map((val) => {
      subtotal = culMul(val.salePrice, val.quantity)
      totalCounts = culAdd(totalCounts, val.quantity)
      totalMoney = culAdd(totalMoney, subtotal)
      quantityUnit = val.quantityUnit
    })
    return {
      totalCounts,
      totalMoney,
      quantityUnit,
      orderDetail
    }
  }
  // 计算采购商税款
  countTaxMoney (costMoney) {
    // 供应商不能开发票 0  payInvoiceInneed   ||   invoiceStatus --1 采购商需要发票 计算采购商税款= 货款* 0.09
    let storeOrderDetail = this.getStoreDetail()
    let on = storeOrderDetail.orderDetail.payInvoiceInneed ;
    if (storeOrderDetail.orderDetail.invoiceStatus == 1 && (on == 0 || on == null) ) {
      let costMoneys = costMoney || storeOrderDetail.totalMoney
      let tax = (Number(costMoneys)*0.09).toFixed(2)
      $('.J_taxMoney', this.$page).val(tax)
    } else {
      $('.J_taxMoney', this.$page).val(0)
    }
    this.countTotalMoney()
  }
  // 计算服务费
  countServiceMoney(orderDetail, currentMoney) {
    const contractModelName = orderDetail.buyer.contractModelName;
    if(contractModelName === '金牌VIP' || contractModelName === '铂金VIP' || contractModelName === '钻石VIP'  ) {
      console.log('老')
      return this.oldCountServiceMoney(orderDetail, currentMoney)
    } else {
      console.log('新')
      return this.newCountServiceMoney(orderDetail, currentMoney)
    }
  }
  // 新的服务费计算方式
  newCountServiceMoney(orderDetail, currentMoney){
    let that = this
    let serviceMoney = 0
    let quantityTotal = orderDetail.totalCounts // 总购买数
    // 全货款
    let realTotal = currentMoney || this.getStoreDetail().totalMoney
    let dahuoYanbuCharge = orderDetail.buyer.dahuoYanbuCharge/100 // 验布服务费率
    let dahuoCharge = orderDetail.buyer.dahuoCharge/100 // 不验布服务费率

    if (orderDetail.checkCloth == 1) {
     // 验货需要计算服务费
      serviceMoney = Number(realTotal)*Number(dahuoYanbuCharge)
      console.log('验布服务费', serviceMoney)
    } else { // 不验货算服务费
      serviceMoney = Number(realTotal)*Number(dahuoCharge)
      // alert('00:'+ serviceMoney)
      console.log('不验布服务费', serviceMoney)
    }
    return (serviceMoney = serviceMoney > 10 ? serviceMoney : 10)
  }
  // 旧的服务费计算方式
  oldCountServiceMoney(orderDetail, currentMoney){
    if (orderDetail.checkCloth == 1) {
     // 验货需要计算服务费
      /**
       * 计算服务费2辅料1面料
       */
      let serviceMoney = 0
      let quantityTotal = orderDetail.totalCounts // 总购买数
      let realTotal = 0
      realTotal = currentMoney || this.getStoreDetail().totalMoney
      if (orderDetail.productType == '1') {
          //面料大货//先进行码数转换
          // console.log('进来面料')
          if (orderDetail.quantityUnit == '千克' || orderDetail.quantityUnit == '公斤') {
              if ((orderDetail.replyWidth) && (orderDetail.replyWeigth)) {
                  //若用户买了b公斤布料，克重为c克每平方米, 幅宽为d厘米，则
                  // x=b * 100000 / c / d
                  quantityTotal = culDiv(culDiv(culDiv(quantityTotal, orderDetail.replyWidth), orderDetail.replyWeigth), 0.9144);
              } else {
                  quantityTotal = 0
              }
          } else if (orderDetail.quantityUnit == '米') {
              // 若用户买了a米布料，则
              // x=a*0.9144
              quantityTotal = culDiv(quantityTotal, 0.9144);
          }
          serviceMoney = culMul(quantityTotal, getServiceRate(orderDetail.buyer.contractModelName));
          // console.log('服务费', serviceMoney)
      } else if (orderDetail.productType == '2') {
          //辅料大货,总价的 2%，最低不少于 ¥10.00
          // console.log('辅料要用总货款', realTotal)
         serviceMoney = culMul(realTotal, 0.02);
      }
      return ( serviceMoney = serviceMoney > 10 ? serviceMoney : 10)
    } else {
      return 0;
    }
  }
// 上传码单
uploadImage() {
  let that = this;
  $('#img-file').unbind('change').on('change', function () {
      let $that = $(this)
      $.each(this.files, function(i, files) {
        lrz(files,lrzConfig)
                .then(function(rst) {
                    // 处理成功会执行
                    $.showPreloader();
                    rst.formData.append('field', 'imgUrl');
                    $.ajax({
                        url: '/redwood/sys/Common/uploadFile.do?type=5',
                        type: "POST",
                        data: rst.formData,
                        // timeout: 10000,
                        processData: false, // 告诉jQuery不要去处理发送的数据
                        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
                        success: function(data) {
                          let tpl = `<div class="up-img J_upimgWrap"><img class='J_zoom' data-src='${data.imgUrl}' style='width: 4rem; height: 3.5rem;' src="${rst.base64}"><span class="close J_close">x</span></div>`
                           $('.J_images').before(tpl)
                           that.zoomImages();
                           $that.val(null)
                           $.hidePreloader();
                        },
                        error: function(err) {
                          $that.val(null)
                          $.hidePreloader();
                          $.toast('上传失败,重新上传!')
                        }
                    });
                })
      });
  })
}
// 查看大图
zoomImages() {
  this.$page.find('.J_zoom').unbind('click').on('click', function () {
    let zoomImages = $(this).closest('.J_has_upload').find('.J_zoom')
    let photos = [];
    zoomImages.each(function(){
      photos.push(imgPath+$(this).attr('data-src'));
    })
    let myPhotoBrowserPopup = $.photoBrowser({
      photos: photos,
      type: 'popup'
    });
    myPhotoBrowserPopup.open();
  });
}
//  删除图片
delImages() {
  this.$page.on('click', '.J_close', (e) => {
      $(e.target).closest('.J_upimgWrap').remove()
  })
}
// 提交大货信息
saveBigGood() {
  let that = this
  $('.J_saveBtn', this.$page).on('click', (e) => {
    if (eval($('.J_buyMoney [name="buyMoney"]').val()) < eval($('.J_costMoney [name="costMoney"]').val())) {
      $.toast('采购货款不能小于成本货款')
      $('.J_buyMoney [name="buyMoney"]').focus()
      return
}
     that.collectAllData()
  })
}
collectAllData() {
  if (this.currentUser.loginInfo.woodFollowLeader) {
    this.followerEditData()
  } else {
    this.checkData()
  }
}
checkData() {
  let that = this
  let bigGoodForm = $(".J_big_good").serializeArray()
  console.log('bigGoodForm:', bigGoodForm)
  let reqParams = {}
  bigGoodForm.map((val) => {
    reqParams[val.name] = val.value
  })
  // 获取色号单价信息
  let productList = getCache({
    type: 'sessionStorage',
    key: 'orderDetail'
  }).obj.productList

  if (this.isEditOrNot == 1) {
    reqParams.productSource = this.orderDetail.productSource
    reqParams.earnestMoneyPayStatus = this.orderDetail.earnestMoneyPayStatus
  }

  // if (reqParams['buyMoney'] < reqParams['costMoney'] || reqParams['buyMoneyOffTax'] < reqParams['costMoneyOffTax']) {
  //   $.alert('')
  // }

  // 检测供应商收款方式是否有id
  let bankAccountId = $('.J_bankAccountId', this.$page).val()
  if (!bankAccountId) {
    $.alert('请选择供应商收款方式')
    return false
  }

  let productSource = reqParams.productSource // 货源类型
  let madanLen = $('.J_zoom', this.$page).length

  if ( madanLen == 0 && productSource == 0) {
      $.alert('现货必须有码单图片!')
      return
  }

  if (productSource == 1 && reqParams.earnestMoney <= 0) {
      $.alert('请输入订金')
      return
  }

  if (!reqParams['productNumber']) {
    $.toast('货号不能为空')
    $('[name="productNumber"]').focus()
    return
  }

  if (this.orderDetail.productList.length > 0) {
    let flag = true
    for (let i = 0; i < this.orderDetail.productList.length; i ++) {
      if (this.orderDetail.productList[i].price <= 0 || this.orderDetail.productList[i].buyPrice <= 0) {
        flag = false
        break
      }
    }
    if (!flag) {
      $.alert('请填写成本单价与采购单价')
      return
    }
  }

  if (reqParams.buyMoney < 0) {
    $.alert('请输入采购货款')
    return
  }

  if (reqParams.costMoney < 0) {
    $.alert('请输入成本货款')
    return
  }

  if (reqParams.sellerTaxMoney > 0) {
    if (reqParams.buyMoneyOffTax < 0) {
      $.alert('请输入采购货款')
      return
    }

    if (reqParams.costMoneyOffTax < 0) {
      $.alert('请输入采购货款')
      return
    }
  }

  this.tellInfo({
    productList,
    reqParams
  })
}
tellInfo(params) {
  let that = this
  let productList = params.productList
  let reqParams = params.reqParams
  let orderDetail = this.getStoreDetail().orderDetail

  if (productList.length == 0 || (orderDetail.quantityUnit == '千克' && orderDetail.replyWidth == '' && this.orderDetail.replyWidth == '' )) {
     let text
     if (orderDetail.productSource == 0 ) {
      text = '付款'
     } else if (orderDetail.productSource == 1) {
      text = '付订金'
     }
     let weightAndHeight
     if (orderDetail.quantityUnit == '千克') {
      weightAndHeight = '必填项:单价、色号、数量、克重、幅宽'
     } else {
      weightAndHeight = '必填项:单价、色号、数量'
     }
     $.modal({
      title: '填写完整才可通知采购商',
      text: weightAndHeight,
      buttons: [
        {
          text: '稍后填写',
          onClick() {
            that.handleData({
              reqParams,
              productList
            })
          }
        },
        {
          text: '立即填写',
          bold: true,
          onClick: function () {

          }
        }
      ]
    })
  } else {
    let text
    let word
    if (orderDetail.productSource == 0) {
      text = '付款'
      word = '大货'
    } else if (orderDetail.productSource == 1) {
      text = '付订金'
       word = '大货'
    }
    $.modal({
      title: '通知'+text,
      text: '通知后将不可再修改'+word+'信息',
      buttons: [
        {
          text: '稍后通知',
          onClick() {
            that.telPay({
              reqParams,
              productList,
              isAtOnce: 1
           })
          }
        },
        {
          text: '立即通知',
          bold: true,
          onClick() {
           that.telPay({
              reqParams,
              productList,
              isAtOnce: 0
           })
          }
        }
      ]
    })
  }
}
// 通知付款
telPay(params) {
  let that = this
   this.handleData({
      reqParams: params.reqParams,
      productList: params.productList
    }, function(data) {
      if (data.success == 1) {
        $.showPreloader()
        request({
          url: OrderApi.notifyPay,
          data: {
            isAtOnce: params.isAtOnce,
            orderNumber: that.orderNumber,
            _time: that._time
          },
          callback(data) {
            if (data.success == 1) {
              if (that.pcInputDh) { // 从pc过来的录入大货
                  $.alert('编辑成功')
                  sessionStorage.removeItem('tempData')
                  sessionStorage.removeItem('orderDetail')
                  sessionStorage.removeItem('temSourceUrl')
                  sessionStorage.removeItem('tempData')
                  sessionStorage.removeItem('sellerInfo')
                  sessionStorage.removeItem('sellerAccounts')
                  clearListCache()
                  window.open('about:blank', '_self', '')
                  document.write('修改成功，请回红杉ＰＣ页面操作!');
              } else {
                $.alert(data.msg)
                clearListCache()
                that.goBackLink()
              }
              // that.goBackLink()
            } else {
              $.alert(data.msg)
            }
            $.hidePreloader()
          }
        })
      }
    })
}
// 提交接口
handleData(params, callback) {
  let that = this
  let madanImgUrls = []
   $('.J_zoom', that.$page).each(function() {
     madanImgUrls.push($(this).attr('data-src'))
   })
  let on = false
  params.productList = params.productList.map((item) => {
     if (String(item.price) === '') {
        on = true
     }
     return item
  })
  if (on) {
    $.alert('颜色及数量必填!')
    return
  }
  let orderDetail = this.getStoreDetail().orderDetail
  if (!orderDetail.servicePriceUnit) {
    $.alert('服务费单位不能为空!')
    return
  }
  let extraParam = {
    productList: params.productList,
    orderNumber: this.orderDetail.orderNumber,
    madanImgUrls: madanImgUrls,
    costMoney: $('.J_costMoney').text(),
    _time: that._time
  }
  let filterParams = params.reqParams

  if (filterParams.expectedArrivalDate) {
    filterParams['expectedArrivalDate'] = new Date(filterParams['expectedArrivalDate']).valueOf()
  } else {
    delete filterParams.expectedArrivalDate
  }

  if (String(filterParams.replyRemark).length > 200) {
      $.alert('买货员备注字数不能超过200')
      return false
  }

  if (filterParams.payInvoiceInneed == 1) { // 供应商有发票
    if (!Number(filterParams.sellerTaxPoint)) {
      $.alert('供应商税点必须大于0')
      return false
    }
  }
  if (filterParams.payInvoiceInneed == 0 || !filterParams.payInvoiceInneed) {
    delete filterParams.sellerTaxPoint
    delete filterParams.sellerTaxMoney
    delete filterParams.costMoneyOffTax
  }

  if (this.isEditOrNot == 1) { // 编辑态手动获取货源类型 和 订金状态
    filterParams.productSource = orderDetail.productSource
    filterParams.earnestMoneyPayStatus = orderDetail.earnestMoneyPayStatus
  }
  delete filterParams.totalCounts

  if (filterParams.productSource == 0) { // 现货
     delete filterParams.expectedArrivalDate
     delete filterParams.earnestMoney
     delete filterParams.earnestMoneyPayStatus
  }
  if (filterParams.productSource == 1) {
    filterParams.earnestMoneyPayStatus = 0
  }
  let mergerGetDetail = this.getStoreDetail()
  if (mergerGetDetail.quantityUnit == '千克') {
    filterParams.replyWidth = mergerGetDetail.orderDetail.replyWidth
    filterParams.replyWeigth = mergerGetDetail.orderDetail.replyWeigth
  }
  let reqOption = $.extend({}, filterParams, extraParam)
  delete reqOption.sellerCompany
  reqOption.costMoney = $('.J_costMoney [name="costMoney"]').val()
  reqOption.servicePriceUnit = this.orderDetail.servicePriceUnit
  $.showPreloader()
  request({
    url: OrderApi.inputDh,
    data: JSON.stringify(reqOption),
    contentType:"application/json",
    method: 'post',
    callback(data) {
      if (data.success == 1) {
        if (this.pcInputDh) { // 从pc过来的录入大货
            $.alert('编辑成功')
            sessionStorage.removeItem('tempData')
            sessionStorage.removeItem('orderDetail')
            sessionStorage.removeItem('temSourceUrl')
            sessionStorage.removeItem('tempData')
            sessionStorage.removeItem('sellerInfo')
            sessionStorage.removeItem('sellerAccounts')
            clearListCache()
            window.open('about:blank', '_self', '')
            document.write('修改成功，请回红杉ＰＣ页面操作!');
        } else {
          $.alert(data.msg)
        }
        sessionStorage.removeItem('tempData')
        sessionStorage.removeItem('orderDetail')
        clearListCache()
        if (callback) {
          callback(data)
        } else {
          that.goBackLink()
        }
      } else {
        if (data.success == 10030) {
          $.alert('成本单价不能为空')
        } else {
          $.alert(data.msg)
        }
      }
      $.hidePreloader()
    }
  })
}
// 跟单员编辑的数据单独调
followerEditData() {
  // 获取色号单价信息
  let that = this
  // 获取码单图片地址
  let madanImgUrls = []
  $('.J_has_upload .J_zoom').each(function() {
    madanImgUrls.push($(this).attr('data-src'))
  })
  let bigGoodForm = $(".J_big_good").serializeArray()
  let reqParams = {}
  bigGoodForm.map((val) => {
    reqParams[val.name] = val.value
  })
  let orderDetail = this.orderDetail
  let obj = {}
  let productList = getCache({
    type: 'sessionStorage',
    key: 'orderDetail'
  }).obj.productList
  obj.productList = productList
  obj.orderNumber = orderDetail.orderNumber
  if (orderDetail.productSource == 1) { // 订货才要传订金
    if (reqParams.earnestMoney <= 0) {
      $.alert('请输入订金')
      return
    }
    obj.earnestMoney = reqParams.earnestMoney
  }
  obj.saleMoney = reqParams.saleMoney
  if (orderDetail.invoiceStatus == 1) {
    if (!Number(reqParams.taxPoint)) {
      $.alert('采购商税点必须大于0')
      return false
    }
    obj.taxMoney = reqParams.taxMoney
    obj.taxPoint = reqParams.taxPoint
  }
  if (orderDetail.payInvoiceInneed == 1) { // 供应商有发票
    obj.sellerTaxMoney = orderDetail.sellerTaxMoney // 不能修改
    obj.costMoneyOffTax = orderDetail.costMoneyOffTax // 不能修改
    obj.buyMoneyOffTax = orderDetail.buyMoneyOffTax // 不能修改
  }
  if (orderDetail.type == 1) { // 服务单才传服务费
     obj.serviceMoney = reqParams.serviceMoney
  }
  obj.costMoney = orderDetail.costMoney
  obj.servicePrice = orderDetail.servicePrice
  obj.servicePriceUnit = orderDetail.servicePriceUnit
  obj.checkCloth = reqParams.checkCloth
  obj.kongCha = reqParams.kongCha
  obj.zhiTong = reqParams.zhiTong
  obj.leaveMessage = $('.J_leaveMessage').val()
  // obj.replyRemark = orderDetail.replyRemark
  // obj.replyRemark = reqParams.replyRemark
  obj.madanImgUrls = madanImgUrls
  obj.type = orderDetail.type
  obj.buyMoney = orderDetail.buyMoney // 不能修改
  $.showPreloader()
  request({
    url:OrderApi.updateDh,
    data: JSON.stringify(obj),
    method: 'post',
    contentType:"application/json",
    callback(data) {
      $.hidePreloader()
      if (data.success == 1) {
         $.alert('编辑成功')
        sessionStorage.removeItem('tempData')
        sessionStorage.removeItem('orderDetail')
        sessionStorage.removeItem('temSourceUrl')
        sessionStorage.removeItem('tempData')
        sessionStorage.removeItem('sellerInfo')
        sessionStorage.removeItem('sellerAccounts')
        clearListCache()
        window.open('about:blank', '_self', '')
        document.write('修改成功，请回红杉ＰＣ页面操作!');
      } else {
        $.alert(data.msg)
      }
    }
  })
}
// 去选择供应商收款方式
goEidtSupplyMethod() {
  $('.J_goRealSupply', this.$page).on('click', (e) => {
    if (!this.shopId) {
      $.alert('请选择供应商')
      return;
    }
    this.goBeforeStoreData()
    this.setBankAccountId()
    setLastPage()
    location.href=`/sellerAccountsList.html?shopId=${this.shopId}`
  })
}
// 去编辑供应商
goEidtSupply(orderDetail) {
  $('.J_goSupply', this.$page).on('click', (e) => {
    this.goBeforeStoreData()
    setLastPage()
    location.href=`/sellerList.html`
  })
}
// 去编辑颜色
goEditColor(orderDetail) {
  $('.J_jumpColor', this.$page).on('click', (e) => {
     this.goBeforeStoreData()
     const type = $('[name="type"]:checked').val()
     this.updateOrderDetail({type: type})
     if (this.shopCartList) {
        location.href=`/addColor.html?source=inputInfo&orderNumber=${orderDetail.orderNumber}&isEditOrNot=${orderDetail.isEditOrNot}&from=shopCartList`
     } else {
        location.href=`/addColor.html?source=inputInfo&orderNumber=${orderDetail.orderNumber}&isEditOrNot=${orderDetail.isEditOrNot}`
     }
     if (this.pcInputDh) {
        location.href=`/addColor.html?source=inputInfo&orderNumber=${orderDetail.orderNumber}&isEditOrNot=${orderDetail.isEditOrNot}&pcInputDh=1`
     }
  })
}
goBeforeStoreData() {
  // 收集供应商信息
  let supplyInfo = this.collectSupply()
  let madanImgUrls = []
  $('.J_zoom', this.$page).each(function() {
    madanImgUrls.push($(this).attr('data-src'))
  })
  let currentPageInfo = $('.J_big_good', this.$page).serializeArray()
  let collectData = {}
  currentPageInfo.map((item) => {
    collectData[item.name] = item.value
  })
  collectData= $.extend({},supplyInfo, collectData)
  collectData['madanImgUrls'] = madanImgUrls
  let storeOrderDetail = this.getStoreDetail()
  let tempTotalMoney = collectData.costMoney
  // 用来判断单位克重幅宽计算服务费的
  collectData.widthAndWeigth = Number(storeOrderDetail.orderDetail.replyWidth) + Number(storeOrderDetail.orderDetail.replyWeigth)
  // 用来判断是否重新计算货款
  collectData.tempTotalMoney = tempTotalMoney
  collectData.quantityUnit = storeOrderDetail.quantityUnit
  collectData.expectedArrivalDate = new Date(collectData['expectedArrivalDate']).valueOf()
  if (this.isEditOrNot == 0) {
   let targetProduceSoure
    $('.J_productSource [name="productSource"]').each(function() {
      if ($(this).prop('checked')) {
        targetProduceSoure = $(this).attr('data-num')
      }
    })
    collectData.productSource = targetProduceSoure
  }
  collectData = $.extend({}, storeOrderDetail.orderDetail, collectData)
  // 此处增加hasfix字段是为了判断是否要重新计算成本货款,服务费，采购商税费，服务费
  collectData.hasfix = false
  const that = this
  if (this.currentUser.loginInfo.woodPurchaser) { // 买货员
    collectData.saleMoney = $('.J_y_saleMoney').text()
  }
  let changeHasfixDetail = getCache({key: 'orderDetail'})
  changeHasfixDetail.obj.hasfix = false
  if (this.currentUser.loginInfo.woodPurchaser) { // 买货员
     changeHasfixDetail.obj.saleMoney = $('.J_y_saleMoney').text()
     changeHasfixDetail.obj.sellerTaxPoint = $('.J_sellerTaxPoint_inpt [name="sellerTaxPoint"]').val()
  }
  if (this.currentUser.loginInfo.woodFollowLeader) { // 跟单员
     changeHasfixDetail.obj.taxPoint = $('.J_taxPoint').val()
     changeHasfixDetail.obj.sellerTaxPoint = $('.J_sellerTaxMoney_text').text()
  }


  setCache({
    type: 'sessionStorage',
    key: 'orderDetail',
    value: changeHasfixDetail
  })
  // 此处增加hasfix字段是为了判断是否要重新计算成本货款,服务费，采购商税费，服务费
  console.log('临时数据--在这里', collectData)
  setCache({
    type: 'sessionStorage',
    key: 'tempData',
    value: collectData
  })
  }
}

export default new InputBigGood()
