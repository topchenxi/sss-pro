/**
 * 结算页
 */
import '../../common/base.js'
import {
  getCache,
  setCache,
  imgPath,
  getParam,
  getLastPage,
  setLastPage
} from '../../common/utils'
import OrderApi from '../../api/order'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.getPayResult()
    this.bindEvents()
  }
  render(data) {
    const that = this;
    data = this.convertData(data);
    const tpl = 'settlement/settlement.html'
    data.mark = location.href.indexOf('payNumber') > -1 ? true : false
    nunjucks.render(tpl, data).then((html) => {
      that.$page = $('#settlement')
      that.$page.html(html)
    });
  }

  getPayResult() {
    const that = this
    const payNumber = getParam('payNumber');
    if (!payNumber) {
      let data = getCache({
        type: 'sessionStorage',
        key: 'settlement'
      });
      // console.log('data', data);
      that.render(data);
      return false;
    }
    $.showPreloader()
    request({
      url: OrderApi.getPayResult,
      data: { payNumber },
      callback(data) {
        $.hidePreloader()
        if (data.success === '1') {
          that.render(data.obj)
        } else {
          $.alert(data.msg)
        }
      },
      error() {
        $.alert('获取详情失败，请刷新重试')
      }
    })
  }

  convertData(data) {
    let hasAppOrder = false;
    let orderNumberList = [];
    data.orderList.forEach(obj => {
      if (obj.source === 2) {
        hasAppOrder = true;
      }
      orderNumberList.push(obj.orderNumber);
    })
    // console.log('orderNumberList', orderNumberList);
    const loginInfo = getCache({
      type: 'sessionStorage',
      key: 'currentUser'
    }).loginInfo;
    // console.log('loginInfo', loginInfo);
    let pageTitle;
    if (!data.status) {
      pageTitle = '结算页';
    } else if (data.status == '1') {
      if (loginInfo.woodFinance) {
        if (data.type != 2) {
          pageTitle = '实收页';
        } else {
          pageTitle = '垫付页';
        }
      } else {
        if (data.type != 2) {
          pageTitle = '支付结果页';
        } else {
          pageTitle = '垫付结果页';
        }
      }
    } else if (data.status == '2' || data.status == '101') {
      if (data.type != 2) {
        pageTitle = '支付结果页'
      } else {
        pageTitle = '垫付结果页'
      }
    }
    Object.assign(data, {
      loginInfo,
      imgPath,
      pageTitle,
      orderNumberList,
      hasAppOrder
    })

    setCache({
      type: 'sessionStorage',
      key: 'settlement',
      value: data
    })
    if (data.type != 2 || !data.type) {
      if (!data.status) {
        data.payType = '支付'
      } else {
        data.payType = '已付'
      }
    } else if (data.type == 2) {
      if (!data.status) {
        data.payType = '支付'
      } else if (data.status == 1) {
        if (loginInfo.woodFinance) {
          data.payType = '垫付'
        } else {
          data.payType = '申请垫付'
        }
      } else if (data.status == 2) {
        data.payType = '已付'
      }
    }

    data.totalTxt = data.payType;
    if (loginInfo.woodFinance) {
      if (data.status == 1) {
        data.totalTxt = '实收'
      }
    }

    // console.log('getPayResult', data);
    console.log('ssss', data);
    return data;
  }

  bindEvents() {
    let _time = this._time;

    $(document).on('click', '.J_set_lastpage', function() {
      setLastPage();
    });

    $(document).on('click', '.J_back', function() {
      const lastPage = getLastPage();
      if (lastPage) {
        location.href = lastPage;
      } else {
        location.href = 'http://' + location.host;
      }
    });

    /**
     * 点击时展开大图
     */
    $(document).on('click', '.pb-popup', (e) => {
      const type = $(e.currentTarget).data('type')
      const settlement = getCache({
        type: 'sessionStorage',
        key: 'settlement'
      });
      let photos = settlement[type];
      if (!photos.length) { photos = ['/upload/util/default_buy.jpg'] }
      photos = photos.map((url) => imgPath + url)
      const myPhotoBrowserPopup = $.photoBrowser({
        photos,
        type: 'popup'
      });
      myPhotoBrowserPopup.open();
    });

    /**
     * 对账异常
     */
    $(document).on('click', '.J_sendback_income', (e) => {
      const $btn = $(e.currentTarget);
      const disabled = $btn.hasClass('disabled');
      if (disabled) { return false; }
      const payNumber = $btn.data('paynumber');
      $.modal({
        title: '对账异常？',
        buttons: [{
          text: '取消',
          onClick() {}
        }, {
          text: '确定',
          onClick() {
            $.showPreloader();
            request({
              url: OrderApi.sendbackIncome,
              data: {
                payNumber,
                _time
              },
              callback(data) {
                $.hidePreloader();
                if (data.success === '1') {
                  $.alert('操作成功', () => {
                    const lastPage = getLastPage();
                    location.href = lastPage;
                  });
                } else {
                  $.alert(data.msg);
                }
              }
            })
          }
        }]
      })
    });
    /**
     * 申请垫付
     */
    $(document).on('click', '.J_apply_advance', (e) => {
      if ($(e.currentTarget).hasClass('disabled')) { return false; }
      const payNumber = $(e.currentTarget).data('paynumber');
      let settlement = getCache({
        type: 'sessionStorage',
        key: 'settlement'
      })
      const orderNumberList = JSON.stringify(settlement.orderNumberList);
      $.modal({
        text: '财务将代替采购商垫付款项给供应商，确定？',
        afterText: `<textarea style='margin-top: 20px' class="modal-text-input J_dianfu_remark" placeholder="垫付备注"></textarea>`,
        buttons: [{
          text: '取消',
          onClick() {}
        }, {
          text: '申请垫付',
          onClick() {
            $.showPreloader();
            const content = $('.J_dianfu_remark').val()
            request({
              url: OrderApi.applyAdvance,
              data: {
                orderNumberList,
                payNumber,
                content,
              },
              callback(data) {
                $.hidePreloader();
                if (data.success === '1') {
                  sessionStorage.removeItem('settlement');
                  $.alert('申请垫付成功', () => {
                    location.href = '/settlement.html?payNumber=' + settlement.payNumber;
                  });
                } else {
                  $.alert(data.msg);
                }
              }
            })
          }
        }]
      })
    });
    /**
     * 确认收到款
     */
    $(document).on('click', '.J_confirm_income', (e) => {
      const payNumber = $(e.currentTarget).data('paynumber');
      const type = $(e.currentTarget).data('type');
      $.modal({
        text: (type != 2 ? '确定采购商的款项已正确到账？' : '确定替采购商垫付款项？'),
        buttons: [{
          text: '取消',
          onClick() {}
        }, {
          text: '确定',
          onClick() {
            $.showPreloader();
            request({
              url: OrderApi.confirmIncome,
              data: {
                payNumber,
                _time
              },
              callback(data) {
                $.hidePreloader();
                if (data.success === '1') {
                  $.alert('操作成功', () => {
                    location.reload();
                  });
                } else {
                  $.alert(data.msg);
                }
              }
            })
          }
        }]
      })
    });
  }
}
export default new Page()
