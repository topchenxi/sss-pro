
import '../../common/base.js'
import { 
 getParam,
 getCache,
 setCache, 
 imgPath,
 lrzConfig,
 clearListCache,
 formatTimeString, getLastPage} from '../../common/utils.js'
import OrderApi from '../../api/order'
import lrz from'../../vendor/lrz'

// 此页面需要传值 ?orderNumber=10224241
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.$page = $('#checkClothList')
    this.render()
  }
  render() {
    let that = this
    this.orderNumber = getParam('orderNumber')
    this.source = decodeURI(getParam('source'))
    request({
      url: OrderApi.getDetail,
      data: {
        orderNumber: this.orderNumber,
        _time: this._time
      },
      callback(data) {
        if (data.success == 1) {
          that.handleFirst(data.obj)
        } else {
          $.alert(data.msg)
        }
      }
    })
  }
  goBackLink() {
    location.href = `/orderDetail.html?orderNumber=${this.orderNumber}`
    return
    let url = getCache({
      type: 'sessionStorage',
      key: 'temSourceUrl'
    })
    sessionStorage.removeItem('temSourceUrl')
    location.href = url
  }
  storeGoBackLink() {
    let url = getCache({
      type: 'sessionStorage',
      key: 'temSourceUrl'
    })
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
  handleFirst(orderDetail) {
    const that = this
    let resData = this.transformData(orderDetail)
    this.lastCheckTime = orderDetail.lastCheckTime // 记得把orderDetail.lastCheckTime
    const billTextTpl = 'checkClothList/billText.html'
    nunjucks.render(billTextTpl, resData).then((billTextHtml) => {
      that.$page.find('.J_bill_text').html(billTextHtml)
      this.goBack(resData);
      this.zoomImages()
    })
    const changeGoodTpl = 'checkClothList/listItem.html'
    nunjucks.render(changeGoodTpl, resData).then((changeGoodTplHtml) => {
      that.$page.find('.J_changeGood').html(changeGoodTplHtml)
      this.zoomImages()
      this.bindAssert()
    })
    if (resData.woodFollowLeader) {
      const footerTpl = 'checkClothList/footer.html'
      nunjucks.render(footerTpl, resData).then((footerTplHtml) => {
        that.$page.find('.J_checkFooter').html(footerTplHtml)
        this.bindFooterEvent()
      })
    }
  }
  
  bindFooterEvent() {
    // 取消订单
     let that = this
     $(document).on('click', '.J_cancel_order', (e) => {
        const orderNumber = $(e.currentTarget).data('ordernumber');
        $.prompt('被取消的订单将不能继续交易', '请说明取消原因',
          (content) => {
            if (content.length > 50) {
              $.toast('任务备注不能超过50字。');
              return false;
            }
            $.showPreloader();
            request({
              url: OrderApi.cancel,
              data: {
                orderNumber,
                content,
                _time: this._time
              },
              callback(data) {
                $.hidePreloader();
                if (data.success === '1') {
                  $.alert(data.msg, () => {
                   location.href = `/orderDetail.html?orderNumber=${that.orderNumber}`
                  });
                } else {
                  $.alert(data.msg);
                }
              }
            })
          }
        )
     })
      /**
     * 通知发货
     */
    $(document).on('click', '.J_notify_send', (e) => {
      const orderNumber = $(e.currentTarget).data('ordernumber');
      let modal = $.modal({
        title: '通知发货',
        afterText: '<textarea class="modal-text-input J_content task-remark" placeholder="任务备注"></textarea>',
        buttons: [{
          text: '取消',
          onClick() {}
        }, {
          text: '确认',
          close: false,
          onClick() {
            const content = $(modal).find('.J_content').val()
            if (content.length > 50) {
              $.toast('任务备注不能超过50字。');
              return false;
            }
            $.closeModal(modal);
            $.showPreloader();
            request({
              url: OrderApi.notifySend,
              data: {
                orderNumber,
                content,
                _time: this._time
              },
              callback(res) {
                $.hidePreloader();
                if (res.success === '1') {
                  $.toast(res.msg);
                  location.href = `/orderDetail.html?orderNumber=${that.orderNumber}`
                } else {
                  $.alert(res.msg);
                }
              }
            })
          }
        }]
      })
    })
    // 通知换货
    $(document).on('click', '.J_change_good', (e) => {
        const orderNumber = $(e.currentTarget).data('ordernumber');
        let number = $(e.currentTarget).data('number')
        let modal = $.modal({
          title: '<div style="text-align:left;">需换货（不合格）匹号</div>',
          afterText: '<div class="phNumber"><span class="ph-l">匹号:</span><span class="serialNumber">'+number+'</span></div><textarea class="modal-text-input J_content task-remark" placeholder="备注"></textarea>',
          buttons: [{
            text: '取消',
            onClick() {}
          }, {
            text: '确认',
            close: false,
            onClick() {
              const content = $(modal).find('.J_content').val()
              if (content.length > 50) {
                $.toast('任务备注不能超过50字。');
                return false;
              }
              $.closeModal(modal);
              $.showPreloader();
              request({
                url: OrderApi.notifyReplace,
                data: {
                  orderNumber,
                  content,
                  _time: this._time
                },
                callback(res) {
                  $.hidePreloader();
                  if (res.success === '1') {
                    $.toast(res.msg);
                     location.href = `/orderDetail.html?orderNumber=${that.orderNumber}`
                  } else {
                    $.alert(res.msg);
                  }
                }
              })
            }
          }]
        })
    });
      /**
     * 通知取货
     */
    $(document).on('click', '.J_notify_receive', (e) => {
      const orderNumber = $(e.currentTarget).data('ordernumber');
      $.modal({
        title: '通知取货',
        buttons: [{
          text: '取消',
          onClick() {}
        }, {
          text: '确认',
          onClick() {
            $.showPreloader();
            request({
              url: OrderApi.notifyReceive,
              data: {
                orderNumber,
                _time
              },
              callback(res) {
                $.hidePreloader();
                if (res.success === '1') {
                  $.toast(res.msg);
                   location.href = `/orderDetail.html?orderNumber=${that.orderNumber}`
                } else {
                  $.alert(res.msg);
                }
              }
            })
          }
        }]
      })
    })

  }
  transformData(orderDetail) {
    let checkReportList = orderDetail.checkReportList
    let checkFlawList = orderDetail.checkFlawList
    let fixCheckFlawList = []
    let hg = {}
    let dgt = {}
    let bhg = {}
    hg.serialItem = []
    dgt.serialItem = []
    bhg.serialItem = []
    bhg.storeNumber= []
    checkFlawList.map((item) => {
      if (item.result == 0) {
        dgt.type = '待沟通'
        dgt.serialItem.push(item)
      } else if (item.result == 1) {
        hg.type = '合格'
        hg.serialItem.push(item)
      } else if (item.result == 2) {
        bhg.type = '不合格'
        bhg.storeNumber.push(item.number)
        bhg.serialItem.push(item)
      }
    })
    fixCheckFlawList.push(hg)
    fixCheckFlawList.push(dgt)
    fixCheckFlawList.push(bhg)
    let loginInfo = getCache({
      key: 'currentUser'
    }).loginInfo
    let resData = {
      imgPath,
      redwoodDescr: orderDetail.redwoodDescr,  // 红杉描述
      handler: orderDetail.handler,  // 任务处理人姓名
      handlerTel: orderDetail.handlerTel,  // 任务处理人电话
      follower: orderDetail.follower,  // 跟单员姓名
      followerTel: orderDetail.followerTel,  // 跟单员电话
      status :  orderDetail.status,
      orderNumber: orderDetail.orderNumber,
      serviceNumber: orderDetail.serviceNumber,
      productNumber: orderDetail.productNumber, // 货号
      company: orderDetail.buyer.company,  // 采购商所在公司
      sellerCompany: orderDetail.sellerCompany,  // 供货商档口名
      lastCheckTime: formatTimeString(orderDetail.lastCheckTime),
      lastChecker: orderDetail.lastChecker,
      checkCount: orderDetail.checkCount,
      checkReportList: checkReportList,
      checkFlawList: fixCheckFlawList,
      woodFollowLeader: loginInfo.woodFollowLeader,
      sendType: orderDetail.sendType, // 配送方式,soouya配送 0 采购商自提 1 
      productType : orderDetail.productType
    }
    return resData
  }
  // 查看大图
  zoomImages() {
    this.$page.find('.J_zoom').unbind('click').on('click', function () {
      let arr = $(this).attr('data-allImg').split(',')
      arr = arr.map((item) => {
        item = imgPath + item
        return item
      })
      let myPhotoBrowserPopup = $.photoBrowser({
        photos: arr,
        type: 'popup'
      });
      myPhotoBrowserPopup.open();
    });
  }
 
  // 返回按扭提交
  goBack(orderDetail) {
    let that = this
    $('.J_goBack', this.$page).on('click', () => {
      that.goBackLink()
    })
  }
  bindAssert() {
    let that = this
    $('.J_update', this.$page).on('click', function() {
       let ph = $(this).attr('data-ph')
       let id = $(this).attr('data-id')
       let result = $(this).attr('data-result')
       let on = 'checked'
       let text = '<form class="J_fixResult">'+
       '<input type="radio" name="result" class="yresult" '+(result == 1 ? on : '')+'  id="id1" value="1" /><label for="id1">合格</label>'+
       '<input name="result" class="yresult" '+(result == 0 ? on : '')+' type="radio" id="id2" value="0" /><label for="id2">待沟通</label>'
       +'<input name="result" class="yresult" '+(result == 2 ? on : '')+' type="radio" id="id3" value="2" /><label for="id3">不合格</label></form>'
        $.modal({
          title: '更改评价',
          text: '匹号:'+ph,
          afterText: text,
          buttons: [
            {
              text: '取消'
            },
            {
              text: '确认',
              bold: true,
              onClick: function () {
                let result = $('.J_fixResult').serializeArray()
                let obj = {
                  result: result[0].value,
                  id,
                  _time: that._time
                }
                request({
                  url: OrderApi.updateCheckFlaw,
                  data: obj,
                  callback(data) {
                    if (data.success == 1) {
                      location.reload()
                    } else {
                      $.toast(data.msg)
                    }
                  }
                })

              }
            },
          ]
        })
    })
  }
  // 收集参数传值
  collectData(orderDetail, callback) {
      // 获取上传模块的数据
      let that = this
      let checkFlaw
      let checkReport = this.collectCheckReport()
      if (this.lastCheckTime == 0) {
        // 新增数据
        checkFlaw = this.collectUpCertData()
      } else {
        // 换货的
        checkFlaw = this.collectChangeGoodCertData()
      }
      let reqOption = {
        checkReport: JSON.stringify(checkReport),
        orderNumber: orderDetail.orderNumber,
        checkFlaw: JSON.stringify(checkFlaw),
        _time: this._time
      }
      console.log('reqOption', reqOption)
      return 
      $.showPreloader()
      request({
        url: OrderApi.inputCheckReport,
        data: reqOption,
        callback(data) {
          $.hidePreloader()
          if (data.success == 1) {
             clearListCache()
             if (callback) {
              callback(data)
             } else {
              $.alert(data.msg, () => {
                that.goBackLink()
              })
             }
          } else {
            $.toast(data.msg)
          }
        },
        error() {
          $.hidePreloader()
          $.alert('保存失败,请重新保存!')
        }
      })
    
  }

}
export default new Page()
