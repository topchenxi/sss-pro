
import '../../common/base.js'
import { getCache, imgPath, setCache, setLastPage } from '../../common/utils'
import orderApi from '../../api/order.js'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.$page = $('#shopCartList')
    this.getList()
  }
  getList() {
    this.orderDetail = getCache({
      key: 'orderDetail',
      type: 'sessionStorage',
      dataType: 'json'
    })
    $.showPreloader();
    request({
      url: orderApi.listShoppingCart,
      data: {
        _time: this._time
      },
      cache: false,
      callback: (data) => {
        console.log('data', data);
        $.hidePreloader();
        if (data.success === '1') {
          this.renderTpl(data)
        } else {
          $.toast(data.msg)
        }
      }
    })
  }
  renderTpl(data) {
    const tpl = 'shopCartList/loop.html'
    data.imgPath = imgPath
    nunjucks.render(tpl, data).then((tplHtml) => {
      $('.J_shop_content', this.$page).html(tplHtml)
      this.bindEvent()
    })
  }
  bindEvent() {
    this.allChoose()
    this.checkboxChoose()
    this.sumbit()
    this.cancelOrder()
    // 编辑流水订单
    $('.J_edit_ls').on('click', () => {
      sessionStorage.removeItem('sellerInfo')
      sessionStorage.removeItem('buyerInfo')
      sessionStorage.removeItem('sellerAccounts')
    });
    // 编辑剪版订单
    $('.J_edit_jb').on('click', function() {
      var $this = $(this);
      var orderNumber = $this.data('ordernumber');
      var source = encodeURIComponent(location.pathname + location.search);
      location.href = '/jianBanInput.html?type=edit&orderNumber=' + orderNumber + '&from=shopCartList' + '&source=' + source;
      return false;
    })

    $('.J_removeDhSession2').on('click', (e) => {
      sessionStorage.removeItem('temSourceUrl')
      sessionStorage.removeItem('tempData')
      sessionStorage.removeItem('orderDetail')
      sessionStorage.removeItem('sellerInfo')
      sessionStorage.removeItem('sellerAccounts')
      location.href = $(e.target).attr('href')
      return false
    });

  }
  // parent-radio choose
  allChoose() {
    $('.J_radio', this.$page).on('change', function() {
      $(this).closest('.J_loopWrap').siblings('.J_loopWrap').find('.J_radio').each(function() {
        $(this).prop('checked', false)
      })
      $('.J_loopWrap .J_chk').prop('checked', false)
      let chk = $(this).closest('.J_loopWrap').find('.J_sonOrder .J_chk');
      if ($(this).prop('checked')) {
        chk.each(function() {
          $(this).prop('checked', true)
        })
      } else {
        chk.each(function() {
          $(this).prop('checked', false)
        })
      }
    })
  }
  // son-checkbox choose
  checkboxChoose() {
    function checkBox(target) {
      let arr = []
      let on = true
      target.closest('.J_sonOrder').find('.J_chk').each(function() {
        arr.push($(this).prop('checked'))
      })
      arr.map((item) => {
        if (item) {
          on = false
        }
      })
      return on
    }
    $(".J_chk", this.$page).unbind('change').on('change', function() {
      let loopWrap = $(this).closest('.J_loopWrap')
      let otherLoopWrap = loopWrap.siblings('.J_loopWrap')
      otherLoopWrap.each(function() {
        $(this).find(".J_chk").prop('checked', false)
        $(this).find(".J_radio").prop('checked', false)
      })
      let on = checkBox($(this))
      if (on) {
        loopWrap.find('.J_radio').prop('checked', false)
      } else {
        loopWrap.find('.J_radio').prop('checked', true)
      }
    })
  }
  cancelOrder() {
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
            url: orderApi.cancel,
            data: {
              orderNumber,
              content,
              _time: this._time
            },
            callback(data) {
              $.hidePreloader();
              if (data.success === '1') {
                $.alert(data.msg, () => {
                  location.reload();
                });
              } else {
                $.alert(data.msg);
              }
            }
          })
        }
      );
    });
  }
  sumbit() {
    let that = this
    $('.J_submit', this.$page).on('click', function() {
      setLastPage();
      that.collectData()
    })
  }
  collectData() {
    let radio = $(this.$page).find('.J_radio')
    let orderNumberList = []
    radio.each(function() {
      if ($(this).prop('checked')) {
        $(this).closest('.J_loopWrap').find('.J_sonOrder .J_chk').each(function() {
          if ($(this).prop('checked')) {
            orderNumberList.push($(this).attr('id'))
          }
        })
      }
    })
    if (orderNumberList.length == 0) {
      $.alert('请选择采购商')
      return
    }
    $.showPreloader()
    request({
      url: orderApi.submitShoppingCart,
      data: {
        orderNumberList: JSON.stringify(orderNumberList),
        _time: this._time
      },
      callback(data) {
        $.hidePreloader()
        if (data.success == 1) {
          setCache({
            key: 'settlement',
            value: data.obj
          })
          location.href = '/settlement.html'
        } else {
          $.alert(data.msg)
        }
      }
    })
  }

}
export default new Page()
