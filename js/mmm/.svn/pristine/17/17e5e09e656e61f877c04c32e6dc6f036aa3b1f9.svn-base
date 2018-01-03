import '../../common/base'
import AccountApi from '../../api/account'
import OrderApi from '../../api/order'
import { getParam, formatTimeString, imgPath, getCache, setCache, getLastPage} from '../../common/utils'
// 验布报告这样传 ?tplType=report&orderNumber=10224241&typeCagetory=2&isEdit=(0-看,1--可编辑)
// 付款凭据 ?tplType=certiType&orderNumber=10224241&typeCagetory=1 采购商付款凭据
// 付款凭据 ?tplType=certiType&orderNumber=10224241&typeCagetory=2 搜芽付款凭据
class CertificateList {
    constructor () {
        this._time = new Date().getTime()
        this.container = $('#certificateList')
        this.bindEvent()
    }
    bindEvent() {
        let that = this
        let reqOption = {}
        this.orderNumber = getParam('orderNumber')
        reqOption.orderNumber = this.orderNumber
        reqOption._time = that._time
        // 进此页面要传的参数
        let tplType = getParam('tplType') // report certiType 用来区分是验布模板还是付款凭据模板
        let typeCagetory = getParam('typeCagetory')  // 1, 2 用来区分是采购商,还是搜芽
        let obj = {
            buyerTitle: '采购商付款凭据', // type 1
            soouyaTitle: '搜芽付款凭据',  // type 2
            checkReport: '验货报告'
        }
        let innerData = {}
        let tpl
        let url
        if (tplType == 'report') { // 验布
            innerData.title = obj.checkReport
            tpl = 'certificateList/checkGoodTpl.html'
            url = OrderApi.getCheckReportList
            reqOption.type = 0
        } else if (tplType == 'certiType' && typeCagetory == 1) { // 采购商付款凭据
            innerData.title = obj.buyerTitle
            tpl = 'certificateList/index.html'
            url = OrderApi.getCertificateList
            reqOption.type = 1
        } else if (tplType == 'certiType' && typeCagetory == 2) { // 搜芽付款凭据
            innerData.title = obj.soouyaTitle
            tpl = 'certificateList/index.html'
            url = OrderApi.getCertificateList
            reqOption.type = 2
        }
        innerData.orderNumber = reqOption.orderNumber
        // 头部
        let headTpl = 'certificateList/head.html'
        nunjucks.render(headTpl, innerData).then((headHtml) => {
          $('.J_head', this.container).html(headHtml)
          this.goBack()
        })
        $.showPreloader()
        request({
          url: url,
          data: reqOption,
          cache: false,
          callback: (data) => {
            $.hidePreloader()
            if (data.success === '1') {
              data.result =  data.result.map((val) => {
                if (val.createTime) {
                    val['createTimeString'] = formatTimeString(val.createTime, 'yyyy-MM-dd')
                }
                if (val.editTime) {
                    val['editTimeString'] = formatTimeString(val.editTime, 'yyyy-MM-dd')
                }
                return val
              })
              that.fillData({data, tpl, reqOption})
            } else {
              $.toast(data.msg)
            }
          }
        })
    }
    goBack() {
      let that = this
      $('.J_goBack').on('click', () => {
        location.href = getLastPage()
      })
    }
    fillData(params) {
        let that = this
        let combineData = params.data
        let tpl = params.tpl
        if (params.reqOption.type == 0) { // 说明是验货报告
            let orderDetail = getCache({
                type: 'sessionStorage',
                key: 'orderDetail'
            })
            if (orderDetail && orderDetail.obj.orderNumber == params.reqOption.orderNumber) {
               combineData.orderDetail = orderDetail.obj
               combineData.tpl = tpl
               that.renderTpl(combineData)
            } else {
              $.showPreloader()
              request({
                url: OrderApi.getDetail,
                data: {
                  orderNumber: params.reqOption.orderNumber,
                  _time: that._time
                },
                callback(data) {
                  if (data.success == 1) {
                    setCache({
                      type: 'sessionStorage',
                      key: 'orderDetail',
                      value: data
                    })
                    combineData.orderDetail = data.obj
                    combineData.tpl = tpl
                    that.renderTpl(combineData)
                  } else {
                    $.toast(data.msg)
                  }
                  $.hidePreloader()
                }
              })
            }
        } else { // 此处是 付款凭据列表
          combineData.tpl = tpl
          that.renderTpl(combineData)
        }
    }
    renderTpl(data) {
        data.imgPath = imgPath
        if (getParam('edit') == 1) {
          data.edit = true
        }
        nunjucks.render(data.tpl, data).then((tplHtml) => {
          $(".J_certificate_list", this.container).html(tplHtml)
          this.zoomImages()
          this.bindAssert()
        })
    }
    zoomImages() {
      $('.J_zoomPicture').unbind('click').on('click', function () {
        let photos = []
        photos.push($(this).attr('data-src'))
        let myPhotoBrowserPopup = $.photoBrowser({
          photos: photos,
          type: 'popup'
        })
        myPhotoBrowserPopup.open()
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
                    _time: that._time,
                    id
                  }
                  request({
                    url: OrderApi.updateCheckReport,
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

}

export default new CertificateList()
