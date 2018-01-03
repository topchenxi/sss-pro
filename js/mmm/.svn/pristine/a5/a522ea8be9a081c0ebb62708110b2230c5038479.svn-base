import OrderApi from '../../api/order'
// import AccountApi from '../../api/account'
import {
  formatTimeString, clearListCache, setLastPage,
  // setCache,
  getCache
} from '../../common/utils'
const _time = new Date().getTime()
export default class footer {
  bindFooterEvents() {
    /**
     * 记录lastpage
     */
    $(document).on('click', '.J_hold_lastpage', () => {
      setLastPage();
    });
    /**
     * 跟单员催缴通知 
     */
    $(document).on('click', '.J_y_urgeMoney', (e) => {
      const payDebtId = $(e.currentTarget).attr('data-payDebtId');
      let data = {
        payDebtId: payDebtId,
        _time: _time
      }
      $.modal({
        title: '确认是否通知采购商支付欠款',
        buttons: [
          {
            text: '取消',
            onClick() { }
          }, {
            text: '确认',
            onClick() {
              $.showPreloader();
              request({
                url: OrderApi.sendDebtSms,
                data: JSON.stringify(data),
                contentType: 'application/json',
                method: 'post',
                callback(res) {
                  $.hidePreloader();
                  if (res.success === '1') {
                    $.toast(res.msg);
                    clearListCache()
                    location.reload();
                  } else {
                    $.alert(res.msg);
                  }
                }
              })
            }
          }
        ]
      })
    });
    /**
     * 取消订单
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_cancel_order', (e) => {
      const orderNumber = $(e.currentTarget).data('ordernumber');
      $.prompt('被取消的订单将不能继续交易', '请说明取消原因', (content) => {
        if (content.length > 50) {
          $.toast('任务备注不能超过50字。');
          return false;
        } else if (content.length === 0) {
          $.toast('任务备注不能为空。');
          return false;
        }
        $.showPreloader();
        request({
          url: '/redwood/buyfollow/Order/cancel',
          contentType: 'application/json',
          method: 'post',
          data: JSON.stringify({
            orderNumber,
            content,
            _time
          }),
          callback(data) {
            $.hidePreloader();
            if (data.success === '1') {
              $.alert(data.msg, () => {
                clearListCache()
                location.reload();
              });
            } else {
              $.alert(data.msg);
            }
          }
        })
      });
    });
    /**
     * 确认收货
     */
    $(document).on('click', '.J_confirm_receive_for_buyer', (e) => {
      const orderNumber = $(e.currentTarget).data('ordernumber');
      $.modal({
        title: '确认采购商已收到货物',
        buttons: [
          {
            text: '取消',
            onClick() { }
          }, {
            text: '确认',
            onClick() {
              $.showPreloader();
              request({
                url: OrderApi.confirmReceiveForBuyer,
                data: {
                  orderNumber,
                  _time
                },
                callback(res) {
                  $.hidePreloader();
                  if (res.success === '1') {
                    $.toast(res.msg);
                    clearListCache()
                    location.reload();
                  } else {
                    $.alert(res.msg);
                  }
                }
              })
            }
          }
        ]
      })
    });
  }
  bindZBFooterEvents() {
    /**
     * 编辑找版按钮
     * @method $
     * @author
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_zhaoban_edit', function () {
      sessionStorage.removeItem('publishTemp')
      sessionStorage.removeItem('buyerInfo')
      sessionStorage.removeItem('defaultAddr')
      sessionStorage.removeItem('orderDetail')
      sessionStorage.removeItem('addressInfo')
      sessionStorage.removeItem('choosedTags')
    });
    /**
     * 放弃此单
     * @method $
     * @author
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_give_up', function () {
      const orderNumber = $(this).data('ordernumber');
      let modal = $.modal({
        title: '是否确认放弃此订单',
        afterText: `<textarea style='margin-top: 20px' class="modal-text-input J_giveUp_remark" placeholder="其他"></textarea>`,
        buttons: [
          {
            text: '取消',
            onClick() { }
          },
          {
            text: '确定',
            close: false,
            onClick() {
              const remark = $.trim($('.J_giveUp_remark').val())
              if (remark.length > 100) {
                $.toast('留言不能超过100字')
                return
              } else {
                $.closeModal(modal)
              }
              $.showPreloader();
              request({
                url: OrderApi.notifyZb,
                data: {
                  orderNumber,
                  _time
                },
                callback(data) {
                  $.hidePreloader();
                  if (data.success === '1') {
                    $.alert(data.msg, () => {
                      clearListCache()
                      location.reload();
                    });
                  } else {
                    $.alert(data.msg);
                  }
                }
              })
            }
          }
        ]
      })
    });
    /**
     * 通知找版
     * @method $
     * @author
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_notify_zb', function () {
      const orderNumber = $(this).data('ordernumber');
      $.modal({
        title: '确定通知后找版？',
        buttons: [
          {
            text: '取消',
            onClick() { }
          },
          {
            text: '确定',
            onClick() {
              $.showPreloader();
              request({
                url: OrderApi.notifyZb,
                data: {
                  orderNumber,
                  _time
                },
                callback(data) {
                  $.hidePreloader();
                  if (data.success === '1') {
                    $.alert(data.msg, () => {
                      clearListCache()
                      location.reload();
                    });
                  } else {
                    $.alert(data.msg);
                  }
                }
              })
            }
          }
        ]
      })
    });
    /**
     * 找版-提交审核
     * @method $
     * @author
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_submit_zb_to_audit', function () {
      const orderNumber = $(this).data('ordernumber');
      $.modal({
        // title: '确定后，请将色卡提交给找版组长进行审核',
        title: '是否确认提交审核？', // 20161008  v1.4版本 修改为此文案
        buttons: [
          {
            text: '确定',
            onClick() {
              $.showPreloader();
              request({
                url: OrderApi.submitZbToAudit,
                data: {
                  orderNumber,
                  _time
                },
                callback(data) {
                  $.hidePreloader();
                  if (data.success === '1') {
                    $.alert(data.msg, () => {
                      clearListCache()
                      location.reload();
                    });
                  } else {
                    $.alert(data.msg);
                  }
                }
              })
            }
          }, {
            text: '取消',
            onClick() { }
          }
        ]
      })
    });
    /**
     * 审核不/通过
     * @method $
     * @author
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_audit_zb', function () {
      const orderNumber = $(this).data('ordernumber');
      const agree = $(this).data('agree');
      // ? '确定后，可在待分配任务中重新指派找版员再次找版'
      const title = agree == '0' ? '是否确认找版不符合要求？' : '';
      const afterText = `
      <div style="font-size: 0.8rem">审核通过后，请将色卡交接给跟单员</div>
      <label style='margin-right: 10px'><input type='radio' name='score' value='0.3'>0.3分</label>
      <label style='margin-right: 10px'><input type='radio' name='score' value='0.5'>0.5分</label>
      <label><input type='radio' name='score' value='0.8'>0.8分</label>
      <label style="margin:5px 0;display:block"><input type='text' class='J_score_number' placeholder='自定义分数' value=''></label>
      <textarea  style="font-size: 0.8rem" class="modal-text-input J_score_remark" placeholder="其他"></textarea>`;
      const modalParam = {
        title,
        buttons: [
          {
            text: '取消',
            onClick() { }
          },
          {
            text: '确定',
            close: false,
            onClick() {
              let score = $('input[name="score"]:checked').val()
              const scoreRemark = $.trim($('.J_score_remark').val())
              const scoreNumber = $('.J_score_number').val()
              score = scoreNumber === '' ? score : scoreNumber
              const param = {
                orderNumber,
                agree,
                _time
              };
              if (agree != '0') {
                param.score = score
                param.scoreRemark = scoreRemark
                if (!score) {
                  $.toast('请打分')
                  return
                } else if (scoreRemark.length > 100) {
                  $.toast('留言不能超过100字符')
                  return
                } else {
                  $.closeModal(modal)
                }
              } else {
                $.closeModal(modal)
              }
              $.showPreloader();
              request({
                url: OrderApi.auditZb,
                data: param,
                callback(data) {
                  $.hidePreloader();
                  if (data.success === '1') {
                    $.alert(data.msg, () => {
                      clearListCache()
                      location.reload();
                    });
                  } else {
                    $.alert(data.msg);
                  }
                }
              })
            }
          },
        ]
      }
      if (agree != '0') {
        modalParam.afterText = afterText
      }
      const modal = $.modal(modalParam)
    });
    /**
     * 确认收色卡
     * @method $
     * @author
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_confirm_receive_sk', function () {
      const orderNumber = $(this).data('ordernumber');
      $.modal({
        title: '确定收到货物数量，档次无误？',
        buttons: [
          {
            text: '确定',
            onClick() {
              $.showPreloader();
              request({
                url: OrderApi.confirmReceiveSk,
                data: {
                  orderNumber,
                  _time
                },
                callback(data) {
                  $.hidePreloader();
                  if (data.success === '1') {
                    $.alert(data.msg, () => {
                      clearListCache()
                      location.reload();
                    });
                  } else {
                    $.alert(data.msg);
                  }
                }
              })
            }
          }, {
            text: '取消',
            onClick() { }
          }
        ]
      })
    });
  }
  bindJBFooterEvents() {
    /**
     * 录入剪版按钮
     * @method $
     * @author
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_jianban_input', function () {
      // 删除缓存
      sessionStorage.removeItem('tempFormData')
      sessionStorage.removeItem('productNumList')
      sessionStorage.removeItem('changeFlag')
    });
    /**
     * 编辑剪版按钮
     * @method $
     * @author
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_jianban_edit', function () {
      // 删除缓存
      sessionStorage.removeItem('productNumList')
      sessionStorage.removeItem('leaveMessage')
      sessionStorage.removeItem('buyerInfo')
      sessionStorage.removeItem('defaultAddr')
      sessionStorage.removeItem('orderDetail')
      sessionStorage.removeItem('sellerInfo')
      sessionStorage.removeItem('addressInfo')
    });
    /**
     * 剪版待确认收款
     * @method $
     * @author
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    function del(text) {
      let link = location.href
      if (link.indexOf('orderDetail') > -1) {
        link = link.replace(text, '')
      }
      return link
    }
    $(document).on('click', '.J_confirm_jb_money_pay', function () {
      const orderNumber = $(this).data('ordernumber');
      $.modal({
        title: '确认收款？',
        buttons: [
          {
            text: '取消',
            onClick() { }
          },
          {
            text: '确定',
            onClick() {
              $.showPreloader();
              request({
                url: OrderApi.confirmJbMoneyPay,
                data: {
                  orderNumber,
                  _time
                },
                callback(data) {
                  $.hidePreloader();
                  if (data.success === '1') {
                    $.alert(data.msg, () => {
                      clearListCache()
                      let link = del('&jbCollection=1')
                      location.href = link
                      // location.assign('http://' + location.host + '/orderDetail.html?orderNumber=' + orderNumber);
                    });
                  } else {
                    $.alert(data.msg);
                  }
                }
              })
            }
          }
        ]
      })
    });
    /**
     * 剪版组长和剪版组员的确认收款
     * @method $
     * @author
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_confirm_jb_money_pay2', function () {
      const orderNumber = $(this).data('ordernumber');
      $.modal({
        title: '确认收款？',
        buttons: [
          {
            text: '取消',
            onClick() { }
          }, {
            text: '确定',
            onClick() {
              $.showPreloader();
              request({
                url: OrderApi.confirmJbMoneyPay4zy,
                data: {
                  orderNumber,
                  _time
                },
                callback(data) {
                  $.hidePreloader();
                  if (data.success === '1') {
                    $.alert(data.msg, () => {
                      clearListCache()
                      let link = del('&jbCollection=1')
                      location.href = link
                    });
                  } else {
                    $.alert(data.msg);
                  }
                }
              })
            }
          }
        ]
      })
    });
    /**
     * 退回此单  剪版
     * @method $
     * @author
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_reback', function () {
      const orderNumber = $(this).data('ordernumber');
      let modal = $.modal({
        title: '是否确认退回此订单',
        afterText: `<textarea style='margin-top: 20px' class="modal-text-input J_reback_content" placeholder="其他"></textarea>`,
        buttons: [
          {
            text: '取消',
            onClick() { }
          },
          {
            text: '确定',
            close: false,
            onClick() {
              const content = $.trim($('.J_reback_content').val())
              if (content.length > 100) {
                $.toast('留言不能超过100字')
                return
              } else {
                $.closeModal(modal)
              }
              $.showPreloader();
              request({
                url: OrderApi.sendbackJb,
                data: {
                  orderNumber,
                  content,
                  _time
                },
                callback(data) {
                  $.hidePreloader();
                  if (data.success === '1') {
                    $.alert(data.msg, () => {
                      clearListCache()
                      location.reload();
                    });
                  } else {
                    $.alert(data.msg);
                  }
                }
              })
            }
          }
        ]
      })
    })
    /**
     * 通知剪版
     * @method $
     * @author
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_notify_jb', function () {
      const orderNumber = $(this).data('ordernumber');
      $.modal({
        title: '确定通知后剪版？',
        buttons: [
          {
            text: '取消',
            onClick() { }
          },
          {
            text: '确定',
            onClick() {
              $.showPreloader();
              request({
                url: OrderApi.notifyJb,
                data: {
                  orderNumber,
                  _time
                },
                callback(data) {
                  $.hidePreloader();
                  if (data.success === '1') {
                    $.alert(data.msg, () => {
                      clearListCache()
                      location.reload();
                    });
                  } else {
                    $.alert(data.msg);
                  }
                }
              })
            }
          }
        ]
      })
    });
    /**
     * 提交审核
     * @method $
     * @author
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_submit_jb_to_audit', function () {
      const orderNumber = $(this).data('ordernumber');
      $.modal({
        title: '确定后，请将剪版提交给剪版组长进行审核',
        buttons: [
          {
            text: '取消',
            onClick() { }
          },
          {
            text: '确定',
            onClick() {
              $.showPreloader();
              request({
                url: OrderApi.submitJbToAudit,
                data: {
                  orderNumber,
                  _time
                },
                callback(data) {
                  $.hidePreloader();
                  if (data.success === '1') {
                    $.alert(data.msg, () => {
                      clearListCache()
                      location.reload();
                    });
                  } else {
                    $.alert(data.msg);
                  }
                }
              })
            }
          }
        ]
      })
    });
    /**
     * 审核不/通过
     * @method $
     * @author
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_audit_jb', function () {
      const orderNumber = $(this).data('ordernumber');
      const agree = $(this).data('agree');
      const title = (agree == '0'
        ? '确定后，可在待分配任务中重新指派剪版员再次剪版'
        : '审核通过后，请将货品交接给跟单员')
      $.modal({
        title,
        buttons: [
          {
            text: '取消',
            onClick() { }
          },
          {
            text: '确定',
            onClick() {
              $.showPreloader();
              request({
                url: OrderApi.auditJb,
                data: {
                  orderNumber,
                  agree,
                  _time
                },
                callback(data) {
                  $.hidePreloader();
                  if (data.success === '1') {
                    $.alert(data.msg, () => {
                      clearListCache()
                      location.reload();
                    });
                  } else {
                    $.alert(data.msg);
                  }
                }
              })
            }
          }
        ]
      })
    });
    /**
     * 审核不/通过
     * @method $
     * @author
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $(document).on('click', '.J_confirm_receive_jb', function () {
      const orderNumber = $(this).data('ordernumber');
      $.modal({
        title: '确定收到货物数量，档次无误？',
        buttons: [
          {
            text: '取消',
            onClick() { }
          },
          {
            text: '确定',
            onClick() {
              $.showPreloader();
              request({
                url: OrderApi.confirmReceiveJb,
                data: {
                  orderNumber,
                  _time
                },
                callback(data) {
                  $.hidePreloader();
                  if (data.success === '1') {
                    $.alert(data.msg, () => {
                      clearListCache()
                      location.reload();
                    });
                  } else {
                    $.alert(data.msg);
                  }
                }
              })
            }
          }
        ]
      })
    });
  }
  bindDHFooterEvents() {
    const that = this
    /**
     * 通知询价
     */
    $(document).on('click', '.J_notify_ask_price', (e) => {
      const orderNumber = $(e.currentTarget).data('ordernumber');
      const updateSellerInfo = getCache({ key: 'updateSellerInfo', dataType: 'json', type: 'sessionStorage' })
      if (updateSellerInfo) {
        $.modal({
          title: '供应商信息更改尚未保存',
          text: '确认将放弃更改供应商信息',
          buttons: [
            {
              text: '取消',
              onClick() { }
            },
            {
              text: '确认',
              onClick() {
                sessionStorage.removeItem('updateSellerInfo')
                $.modal({
                  title: '是否立刻通知买货组询价？',
                  text: '通知后将不可再修改订单信息',
                  buttons: [
                    {
                      text: '立刻通知',
                      onClick() {
                        that.notifyAskPrice(0, orderNumber)
                      }
                    }, {
                      text: '稍后通知',
                      onClick() {
                        that.notifyAskPrice(1, orderNumber)
                      }
                    }
                  ]
                })
              }
            }
          ]
        })
      } else {
        $.modal({
          title: '是否立刻通知买货组询价？',
          text: '通知后将不可再修改订单信息',
          buttons: [
            {
              text: '立刻通知',
              onClick() {
                that.notifyAskPrice(0, orderNumber)
              }
            }, {
              text: '稍后通知',
              onClick() {
                that.notifyAskPrice(1, orderNumber)
              }
            }
          ]
        })
      }
    });

    /**
     * 打回跟单
     */
    $(document).on('click', '.J_repulse', (e) => {
      const orderNumber = $(e.currentTarget).data('ordernumber');
      const param = {
        orderNumber: orderNumber,
        _time: new Date().getTime()
      }
      $.modal({
        title: '打回跟单',
        text: '确认要将此订单打回？',
        buttons: [
          {
            text: '是的',
            onClick() {
              $.showPreloader();
              request({
                url: OrderApi.rejectToFollower,
                data: {
                  param: JSON.stringify(param)
                },
                callback(data) {
                  $.hidePreloader();
                  if (data.success === '1') {
                    $.alert('已打回跟单', () => {
                      clearListCache()
                      location.href = '/orderList.html?Tabkey=xj&category=all-all';
                    });
                  } else {
                    $.alert(data.msg);
                  }
                }
              })
            }
          }, {
            text: '暂不',
            onClick() {

            }
          }
        ]
      })
    })

    /**
     * 通知付款
     */
    $(document).on('click', '.J_notify_pay', (e) => {
      const orderNumber = $(e.currentTarget).data('ordernumber');
      const title = $(e.currentTarget).data('title')
      const item = JSON.parse($(e.currentTarget).data('item'))
      const error = that.notifyValidate(item)
      const source = $(e.currentTarget).data('source')
      if (error.length) {
        $.modal({
          title: '必填项尚未填写完整',
          text: `填写完整才可${title}`,
          afterText: `必填项：${error.join('')}`,
          buttons: [
            {
              text: '稍后填写',
              onClick() { }
            }, {
              text: '立刻填写',
              onClick() {
                location.assign(`http://${location.host}/${item.status === 338
                  ? 'inputFinal'
                  : 'inputInfo'}.html?orderNumber=${item.orderNumber}&isEditOrNot=1&source=${source}`)
              }
            }
          ]
        })
      } else {
        $.modal({
          title,
          text: title.indexOf('尾款') !== -1
            ? '通知后将不可再修改尾款信息'
            : '通知后将不可再修改大货信息',
          buttons: [
            {
              text: '立刻通知',
              onClick() {
                that.notifyPay(0, orderNumber)
              }
            }, {
              text: '稍后通知',
              onClick() {
                that.notifyPay(1, orderNumber)
              }
            }
          ]
        })
      }
    });
    /**
     * 申请垫付
     */
    $(document).on('click', '.J_apply_advance', (e) => {
      const orderNumber = $(e.currentTarget).data('ordernumber');
      $.modal({
        title: '申请垫付',
        text: '确认申请垫付后，财务将付款给供应商',
        buttons: [
          {
            text: '返回',
            onClick() { }
          }, {
            text: '申请垫付',
            onClick() {
              $.showPreloader();
              request({
                url: OrderApi.applyAdvance,
                data: {
                  orderNumber,
                  _time
                },
                callback(data) {
                  $.hidePreloader();
                  if (data.success === '1') {
                    $.alert('申请垫付成功', () => {
                      clearListCache()
                      location.reload();
                    });
                  } else {
                    $.alert(data.msg);
                  }
                }
              })
            }
          }
        ]
      })
    });
    /**
     * 录入(更新)供货商送货时间
     */
    $(document).on('click', '.J_update_reply_send_time', (e) => {
      const orderNumber = $(e.currentTarget).data('ordernumber');
      const sendInneed = $(e.currentTarget).data('sendinneed');
      let replySendTime = $(e.currentTarget).data('replysendtime') || new Date().getTime();
      let time = formatTimeString(replySendTime, 'yyyy-MM-dd')
      const modal = $.modal({
        title: (sendInneed === 0
          ? '预计提货员提货时间'
          : '预计供货商送货时间'),
        afterText: `<input class="modal-text-input J_calendar" type="text" value="${time}"/>
        <textarea style='margin-top: 20px' class="modal-text-input J_content task-remark" placeholder="任务备注"></textarea>`,
        buttons: [
          {
            text: '取消',
            onClick() { }
          }, {
            text: '确认',
            close: false,
            onClick() {
              const content = $(modal).find('.J_content').val()
              if (content.length > 50) {
                $.toast('任务备注不能超过50字。');
                return false;
              }
              time = $(modal).find('.J_calendar').val()
              replySendTime = new Date(time).getTime()
              $.closeModal(modal);
              $.showPreloader();
              request({
                url: OrderApi.updateReplySendTime,
                data: {
                  orderNumber,
                  replySendTime,
                  content,
                  _time
                },
                callback(data) {
                  $.hidePreloader();
                  if (data.success === '1') {
                    $.alert(data.msg, () => {
                      clearListCache()
                      location.reload();
                    });
                  } else {
                    $.alert(data.msg);
                  }
                }
              })
            }
          }
        ]
      })
      $(modal).find('.J_calendar').calendar({ value: [time] });
    });
    /**
     * 录入(更新)换货时间
     */
    $(document).on('click', '.J_input_replace_time', (e) => {
      const orderNumber = $(e.currentTarget).data('ordernumber');
      let replaceTime = $(e.currentTarget).data('replacetime') || new Date().getTime();
      const sendType = $(e.currentTarget).data('sendtype');
      let time = formatTimeString(replaceTime, 'yyyy-MM-dd')
      const modal = $.modal({
        title: '预计换货时间',
        afterText: `<input class="modal-text-input J_calendar" type="text" value="${time}"/>
        <textarea style='margin-top: 20px' class="modal-text-input J_content task-remark" placeholder="任务备注"></textarea>`,
        buttons: [
          {
            text: '取消',
            onClick() { }
          }, {
            text: '确认',
            close: false,
            onClick() {
              time = $(modal).find('.J_calendar').val()
              const content = $(modal).find('.J_content').val()
              if (content.length > 50) {
                $.toast('任务备注不能超过50字。');
                return false;
              }
              replaceTime = new Date(time).getTime();
              $.closeModal(modal);
              $.showPreloader();
              request({
                url: OrderApi.inputReplaceTime,
                data: {
                  orderNumber,
                  sendType,
                  replaceTime,
                  content,
                  _time
                },
                callback(data) {
                  $.hidePreloader();
                  if (data.success === '1') {
                    $.alert(data.msg, () => {
                      clearListCache()
                      location.reload();
                    });
                  } else {
                    $.alert(data.msg);
                  }
                }
              })
            }
          }
        ]
      })
      $(modal).find('.J_calendar').calendar({ value: [time] });
    });
    /**
     * 确认收货
     */
    $(document).on('click', '.J_confirm_receive', (e) => {
      const orderNumber = $(e.currentTarget).data('ordernumber');
      $.modal({
        title: '确认收货',
        text: '一旦签收，收货人将负责托管货和单，确保货和单的准确性和完整性',
        buttons: [
          {
            text: '取消',
            onClick() { }
          }, {
            text: '确认收货',
            onClick() {
              const data = {
                orderNumber,
                _time
              };
              $.showPreloader();
              request({
                url: OrderApi.confirmReceive,
                data,
                callback(res) {
                  $.hidePreloader();
                  if (res.success === '1') {
                    $.toast(res.msg);
                    clearListCache()
                    location.reload();
                  } else {
                    $.alert(res.msg);
                  }
                }
              })
            }
          }
        ]
      })
    });
    /**
     * 通知换货
     */
    $(document).on('click', '.J_notify_replace', (e) => {
      const orderNumber = $(e.currentTarget).data('ordernumber');
      const ph = $(e.currentTarget).data('ph')
      const modal = $.modal({
        title: '需换货（不合格）匹号',
        text: '匹号：' + ph,
        afterText: '<textarea class="modal-text-input J_content task-remark" placeholder="任务备注"></textarea>',
        buttons: [
          {
            text: '取消',
            onClick() { }
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
                  _time
                },
                callback(res) {
                  $.hidePreloader();
                  if (res.success === '1') {
                    $.toast(res.msg);
                    clearListCache()
                    location.reload();
                  } else {
                    $.alert(res.msg);
                  }
                }
              })
            }
          }
        ]
      })
    });
    /**
     * 通知发货
     */
    $(document).on('click', '.J_notify_send', (e) => {
      const orderNumber = $(e.currentTarget).data('ordernumber');
      const modal = $.modal({
        title: '通知发货',
        afterText: '<textarea class="modal-text-input J_content task-remark" placeholder="任务备注"></textarea>',
        buttons: [
          {
            text: '取消',
            onClick() { }
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
                  _time
                },
                callback(res) {
                  $.hidePreloader();
                  if (res.success === '1') {
                    $.toast(res.msg);
                    clearListCache()
                    location.reload();
                  } else {
                    $.alert(res.msg);
                  }
                }
              })
            }
          }
        ]
      })
    });
    /**
     * 通知取货
     */
    $(document).on('click', '.J_notify_receive', (e) => {
      const orderNumber = $(e.currentTarget).data('ordernumber');
      $.modal({
        title: '通知取货',
        buttons: [
          {
            text: '取消',
            onClick() { }
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
                    clearListCache()
                    location.reload();
                  } else {
                    $.alert(res.msg);
                  }
                }
              })
            }
          }
        ]
      })
    });
    $(document).on('click', '.J_goRealGetPay', (e) => {
      let orderNumber = $(e.currentTarget).data('ordernumber');
      let payDebtId = $(e.currentTarget).data('payDebtId');
      location.href = `/realGetPay.html?orderNumber=${orderNumber}&unGetPay=1&payDebtId=${payDebtId}`
    })
    $(document).on('click', '.J_removeDhSession', (e) => {
      console.log('大货和尾款清缓存');
      sessionStorage.removeItem('temSourceUrl')
      sessionStorage.removeItem('tempData')
      sessionStorage.removeItem('orderDetail')
      sessionStorage.removeItem('sellerInfo')
      sessionStorage.removeItem('sellerAccounts')
      return false
    })
    /**
     * 实收作废
     */
    // $(document).on('click', '.J_confirm_income', (e) => {
    //   if ($(e.currentTarget).is('.disabled')) {
    //     return false;
    //   }
    //   const orderNumber = $(e.currentTarget).data('ordernumber');
    //   const productSource = $(e.currentTarget).data('productsource');
    //   const collectDebts = $(e.currentTarget).data('collectdebts');
    //   const status = $(e.currentTarget).data('status');
    //   const source = $(e.currentTarget).data('source');
    //   let afterText
    //   switch (status) { // 没有有欠款 正常状态
    //     case 325:
    //       afterText = '<input class="modal-text-input J_earnest_money" type="text" placeholder="订金（必填）"/>'
    //       break;
    //     case 345:
    //       afterText = `<input class="modal-text-input J_final_money" type="text" placeholder="尾款（必填）"/>
    //   <input class="modal-text-input J_service_money" type="text" placeholder="服务费（选填）"/>`
    //       break;
    //     case 327:
    //       afterText = `<input class="modal-text-input J_final_money" type="text" placeholder="货款（必填）"/>
    //   <input class="modal-text-input J_service_money" type="text" placeholder="服务费（选填）"/>`
    //       break;
    //     default:
    //   }
    //   if (collectDebts === 1) { // 是否有欠款
    //     afterText = `<input class="modal-text-input J_earnest_money" type="text" placeholder="订金"/>
    // <input class="modal-text-input J_final_money" type="text" placeholder="货款（尾款）"/>
    // <input class="modal-text-input J_service_money" type="text" placeholder="服务费"/>`
    //   }
    //   if (collectDebts !== 1) {
    //     location.href = `/realGet.html?orderNumber=${orderNumber}&source=${source}`
    //     return
    //   }
    //   const modal = $.modal({
    //     title: '实收',
    //     text: '一旦确认提交，将不可修改',
    //     afterText,
    //     buttons: [{
    //       text: '取消',
    //       onClick() {}
    //     }, {
    //       text: '确认',
    //       close: false,
    //       onClick() {
    //         const earnestMoney = $(modal).find('.J_earnest_money')
    //         const finalMoney = $(modal).find('.J_final_money')
    //         const serviceMoney = $(modal).find('.J_service_money')
    //         const confirmMoney = []
    //         function requestConfirm() {
    //           $.closeModal(modal)
    //           $.showPreloader();
    //           request({
    //             url: (collectDebts !== 1 ? AccountApi.confirmIncome : AccountApi.confirmDebtPay),
    //             data: {
    //               orderNumber,
    //               _time,
    //               confirmMoney: JSON.stringify(confirmMoney)
    //             },
    //             callback(res) {
    //               $.hidePreloader();
    //               if (res.success === '1') {
    //                 $.toast(res.msg);
    //                 clearListCache()
    //                 location.href = 'http://' + location.host + '/orderDetail.html?orderNumber=' + orderNumber;
    //               } else {
    //                 $.alert(res.msg);
    //               }
    //             }
    //           })
    //         }
    //         if (earnestMoney.length) {
    //           const earnestMoneyVal = earnestMoney.val()
    //           if (earnestMoneyVal) {
    //             confirmMoney.push({
    //               realAmount: earnestMoneyVal,
    //               fundType: 2
    //             })
    //           } else if (collectDebts !== 1) {
    //             $.toast('订金为必填项')
    //             return false;
    //           }
    //         }
    //         if (finalMoney.length) {
    //           const finalMoneyVal = finalMoney.val()
    //           if (finalMoneyVal) {
    //             confirmMoney.push({
    //               realAmount: finalMoneyVal,
    //               fundType: (productSource === 1 ? 3 : 5) // 3 尾款，5 货款
    //             })
    //           } else if (collectDebts !== 1) {
    //             $.toast('尾款（货款）为必填项')
    //             return false;
    //           }
    //         }
    //         if (serviceMoney.length) {
    //           const serviceMoneyVal = serviceMoney.val()
    //           if (serviceMoneyVal) {
    //             confirmMoney.push({
    //               realAmount: serviceMoneyVal,
    //               fundType: 4
    //             })
    //           } else {
    //             $.closeModal(modal)
    //             $.modal({
    //               title: '服务费未填写，确认提交？',
    //               buttons: [{
    //                 text: '再看看',
    //                 onClick() {}
    //               }, {
    //                 text: '确认',
    //                 onClick() {
    //                   requestConfirm()
    //                 }
    //               }]
    //             })
    //             return false;
    //           }
    //         }
    //         requestConfirm()
    //       }
    //     }]
    //   })
    // });
  }
  /**
   * 通知付款
   */
  notifyPay(isAtOnce, orderNumber) {
    $.showPreloader();
    request({
      url: OrderApi.notifyPay,
      data: {
        orderNumber,
        isAtOnce
      },
      callback(data) {
        $.hidePreloader();
        if (isAtOnce === 0) {
          if (data.success === '1') {
            $.alert('已通知付款', () => {
              clearListCache()
              location.reload();
            });
          } else {
            $.alert(data.msg);
          }
        }
      }
    })
  }
  /**
   * 通知询价
   */
  notifyAskPrice(isAtOnce, orderNumber) {
    $.showPreloader();
    request({
      url: OrderApi.notifyAskPrice,
      data: {
        orderNumber,
        isAtOnce,
        _time
      },
      callback(data) {
        $.hidePreloader();
        if (isAtOnce === 0) {
          if (data.success === '1') {
            $.alert('已通知询价', () => {
              clearListCache()
              location.reload();
            });
          } else {
            $.alert(data.msg);
          }
        } else {
          location.reload();
        }
      }
    })
  }
  /**
   * 通知付款校验
   */
  notifyValidate(data) {
    const error = []
    // || !data.replyAccountBranch
    if (!data.replyAccountBank || !data.replyAccountNumber || (!data.replyAccountUser && !data.replyAccountCompany)) {
      error.push('供应商收款方式；')
    }
    if (!data.earnestMoney && data.productSource === 1) {
      error.push('订金金额；')
    }
    if (data.status === 315 || data.status === 338) {
      if (data.productType === 1) {
        let productError = false
        data.productList.forEach((obj) => {
          if (!obj.color || !obj.price || !obj.quantity) {
            productError = true;
          }
        })
        productError && error.push('单价、色号、数量；')
        if (data.productList[0].quantityUnit === '千克') {
          if (!data.replyWidth || !data.replyWeigth) {
            error.push('幅宽、克重；')
          }
        }
      }
    }
    return error
  }
}
