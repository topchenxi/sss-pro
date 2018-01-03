
import '../../common/base.js'
import { getParam, getCache, setCache, imgPath, lrzConfig, clearListCache, formatTimeString, getLastPage, setLastPage } from '../../common/utils.js'
import OrderApi from '../../api/order'
import lrz from'../../vendor/lrz'

// 此页面需要传值 ?orderNumber=10224241
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.$page = $('#upCheckReport')
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
    location.href = getLastPage()
  }
  handleFirst(orderDetail) {
    const that = this
    let resData = this.transformData(orderDetail)
    this.lastCheckTime = orderDetail.lastCheckTime // 记得把orderDetail.lastCheckTime
    const billTextTpl = 'upCheckReport/billText.html'
    nunjucks.render(billTextTpl, resData).then((billTextHtml) => {
      that.$page.find('.J_bill_text').html(billTextHtml)
      this.uploadImage(resData);
      this.deleteCert();
      this.saveInfo(resData);
      this.goBack(resData);
      this.zoomImages()
      this.isCanSubmit()
      this.listFirstCert()
    })
    // 换货图片
    if (this.lastCheckTime) {
      const changeGoodTpl = 'upCheckReport/changeGood.html'
      nunjucks.render(changeGoodTpl, resData).then((changeGoodTplHtml) => {
        that.$page.find('.J_changeGood').html(changeGoodTplHtml)
        this.uploadImage(resData);
        this.zoomImages()
        this.isCanSubmit()
      
      })
      $('.J_bill_block').remove()
      $('.J_add').remove()
    }
    this.delePicture()
    this.addCert()
    this.radioChoose()
    this.numberFill()
    this.remarkFill()

  }
  transformData(orderDetail) {
    let checkFlawList = orderDetail.checkFlawList
    let checkReportList = orderDetail.checkReportList
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
      originLastCheckTiem: orderDetail.lastCheckTime,
      lastChecker: orderDetail.lastChecker,
      checkCount: orderDetail.checkCount,
      checkReportList: checkReportList ,
      checkFlawList: checkFlawList 
    }
    return resData
  }
  // 监听上传不超过9张
  listenUpPictureNumber(target) {
    let currentTarget = target.closest('.J_serialImg')
    let changeGoodForm = target.closest('.J_changeGoodForm')
    let len = currentTarget.find('img').length
    let on = false
    if (len >= 9) {
      on = true
      currentTarget.find('.J_upCloth').hide()
    } else {
      currentTarget.find('.J_upCloth').show()
    }
    return on
  }
  // 匹号填写
  numberFill() {
    let that = this
    $('.J_input_content', this.$page).unbind('input').on('input', '.J_piNumber', function() {
        that.isCanSubmit()
    })
  }
  // 监听凭证第一个不可删加类cannot
  listFirstCert() {
    let certList = $('.J_bill_block .J_del', this.$page)
    certList.each(function() {
      if ($(this).hasClass('cannot')) {
         $(this).removeClass('cannot')
      }
    })
    if (certList.length == 1) {
      certList.eq(0).addClass('cannot')
    }
  }
  // 评价选择临听
  radioChoose() {
    let that = this
    $('.J_input_content', this.$page).unbind('change').on('change', '[type="radio"]', function() {
        that.isCanSubmit()
    })
  }
  // 删除图片
  delePicture() {
    let that = this
    $('.list-block', this.$page).unbind('click').on('click','.close', function() {
      let $that = $(this)
      let target = $that.closest('.J_serialImg').find('.imgWrap').eq(0)
      $that.closest('.imgWrap').remove()
      that.listenUpPictureNumber(target)
      that.isCanSubmit()
    })
  }
  // 监听新增+显示
  listenAdd() {
    let len = $('.J_bill_block', this.$page).find('.J_form').length
    if (len >= 9) {
      $('.J_add', this.$page).hide()
    } else {
      $('.J_add', this.$page).show()
    }
  }
  // 备注限定
  remarkFill(){
    $(document).on('input','.J_remark', function() {
      let val = $.trim($(this).val())
      console.log(val.length)
       if (val.length >= 50) {
        $(this).val(val.substring(0,50))
       }
    })
  }
  uploadImage(resData) {
    let that = this;
    $('[type="file"]', this.$page).unbind('change').on('change', function () {
        let $that = $(this)
        that.allLength = this.files.length
        let files = this.files
        $.each(files, function(i, file) {
          that.uploadComponent(file, $that, i)
        });
    })
  }
  uploadComponent(files, $that, index) {
    let that = this
    const billInfoTpl = 'upCheckReport/billInfo.html'
    lrz(files, lrzConfig)
    .then(function(rst) {
        $.showPreloader();
        // 处理成功会执行
        rst.formData.append('field', 'imgUrl');
        function imagAjax (index) {
          $.ajax({
              url: '/redwood/sys/Common/uploadFile.do?type=3',
              type: "POST",
              data: rst.formData,
              // timeout: 10000,
              processData: false, // 告诉jQuery不要去处理发送的数据
              contentType: false, // 告诉jQuery不要去设置Content-Type请求头
              success: function(data) {
                $.hidePreloader();
                $that.val(null)
                if (data.success == 1) {
                  let isUpOrNot = that.listenUpPictureNumber($that)
                  if (isUpOrNot) {
                    return false
                  }
                  let randNumber = parseInt(Math.random() * 700 + 800)
                  let tpl = `<span class="imgWrap"><img src="${rst.base64}" data-src="${rst.base64}" data-link="${data.imgUrl}" class='J_zoom cloth' style="border:1px solid #ccc; width:2rem; height: 2rem;" /><strong class="close">x</strong><input type="hidden" name="imgUrl${randNumber}" value="${data.imgUrl}" ></span>`
                  $that.closest('.J_upCloth').before(tpl)
                  that.listenUpPictureNumber($that)
                  that.zoomImages()
                  that.isCanSubmit()
                  that.remarkFill()
                } else {
                  $.toast(data.msg)
                }
              },
              error: function(error) {
                $.hidePreloader()
                $that.val(null)
              }
          });
        }
        imagAjax(index)
    })
  }
  // 查看大图
  zoomImages() {
    this.$page.find('.J_zoom').unbind('click').on('click', function () {
      let photos = [];
      $(this).closest('.J_serialImg').find('.imgWrap img').each(function() {    
        photos.push($(this).attr('data-src'));
      })
      let myPhotoBrowserPopup = $.photoBrowser({
        photos: photos,
        type: 'popup'
      });
      myPhotoBrowserPopup.open();
    });
  }
  // 删除凭证
  deleteCert() {
    let that = this
    this.$page.on('click', '.J_del', function () {
      let len = $(this).closest('.J_bill_block').find('.J_form').length
      if (len == 1) {
        that.isCanSubmit()
        that.listFirstCert()
        return false
      }
      $(this).closest('.J_form').remove();
      that.isCanSubmit()
      that.listFirstCert()
      that.listenAdd()
    })
  }
  // 添加凭证
  addCert() {
    let that = this
    $('.J_add', this.$page).on('click', function() {
      let randNumber = parseInt(Math.random() * 700 + 800)
      let targetComponent = $(this).closest('.J_input_content').find('.J_bill_block')
      let billInfoTpl = 'upCheckReport/billInfo.html'
        nunjucks.render(billInfoTpl, {
          randNumber
        }).then((billInfoHtml) => {
          targetComponent.append(billInfoHtml)
          that.uploadImage()
          that.zoomImages()
          that.isCanSubmit()
          that.listFirstCert()
          that.listenAdd()
        })
    })
  }
  // 返回按扭提交
  goBack(orderDetail) {
    let that = this
    $('.J_goBack', this.$page).on('click', () => {
      $.modal({
        title: '尚未提交验货结果',
        text: '继续返回,已填写内容将不被保存',
        buttons: [
          {
            text: '继续返回',
            onClick() {
              that.goBackLink()
            }
          },
          {
            text: '继续填写',
            bold: true,
            onClick: function () {
            }
          }
        ]
      })
    })
  }
  // 保存
  saveInfo(orderDetail) {
    let that = this
    $('.J_save_btn', this.$page).unbind('click').on('click', (e) => {
      console.log(this.checkParams())
      if ($(e.currentTarget).hasClass('disabled')) return
      $.modal({
        title: '提交验货结果',
        text: '一旦提交,将不可修改，任务将被传递',
        buttons: [
          {
            text: '放弃提交'
          },
          {
            text: '确认提交',
            bold: true,
            onClick: function () {
              that.collectData(orderDetail, function (data) {
                if (data.success == 1) {
                  location.href = '/checkClothList.html?orderNumber='+that.orderNumber
                }
              })
            }
          }
        ]
      })
    })
  }
  isCanSubmit() {
    let turn = this.checkParams()
    if (turn) {
      $('.J_save_btn', this.$page).addClass('disabled')
    } else {
      $('.J_save_btn', this.$page).removeClass('disabled')
    }
  }
  checkParams() {
    let collectCheckReport = this.collectCheckReport()
    let collectUpCertData = this.collectUpCertData()
    let collectChangeGoodCertData = this.collectChangeGoodCertData()
    let on = false
    if (collectCheckReport.length == 0) {
      on = true
      return on
    }
    if (this.lastCheckTime) {
      // 换货信息
      collectChangeGoodCertData.map((item) => {
        if (item.result == undefined) {
          on = true
        }
      })
    } else {
      // 新增信息
       collectUpCertData.map((item) => {
        if (item.result == undefined || item.number == '') {
          on = true
        }
      })
    }
    console.log('on', on)
    return on
  }
  // 收集验布报告
  collectCheckReport() {
    let checkReport = $(".J_changeGoodForm", this.$page).serializeArray()
    let checkReportList = []
    checkReport.map((item) => {
      checkReportList.push(item.value)
    })
    return checkReportList
  }
  // 新增验货报告凭证数据
  collectUpCertData() {
    let checkGoodForm = $('.J_bill_block', this.$page).find('.J_form')
    let checkFlawList = []
    checkGoodForm.each(function() {
      let formData = $(this).serializeArray()
      let obj = {}
      obj.imgUrls = []
      formData.map((item) => {
        if (item.name.indexOf('imgUr') > -1) {
          obj.imgUrls.push(item.value)
        } else {
          obj[item.name] = item.value
        }
      })
      checkFlawList.push(obj)
    })
    console.log('新增报告', checkFlawList)
    return checkFlawList
  }
  // 编辑换货凭证数据
  collectChangeGoodCertData() {
    let checkGoodForm = $('.J_changeGood', this.$page).find('.J_form')
    let checkFlawList = []
    checkGoodForm.each(function() {
      let formData = $(this).serializeArray()
      let obj = {}
      obj.imgUrls = []
      formData.map((item) => {
        if (item.name.indexOf('imgUr') > -1) {
          obj.imgUrls.push(item.value)
        } else {
          obj[item.name] = item.value
        }
      })
      checkFlawList.push(obj)
    })
    console.log('换货报告', checkFlawList)
    return checkFlawList
  }
  // 收集参数传值
  collectData(orderDetail, callback) {
      // 获取上传模块的数据
      let that = this
      let checkFlaw
      let checkReport = this.collectCheckReport()
      if (this.lastCheckTime) {
        // 换货的
        checkFlaw = this.collectChangeGoodCertData()
      } else {
        // 新增数据
        checkFlaw = this.collectUpCertData()
        
      }
      let reqOption = {
        checkReport: JSON.stringify(checkReport),
        orderNumber: orderDetail.orderNumber,
        checkFlaw: JSON.stringify(checkFlaw),
        _time: this._time
      }
      console.log('reqOption', reqOption)
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
