
import '../../common/base.js'
import { getParam, getCache, setCache, imgPath, uniquelize, lrzConfig, clearListCache} from '../../common/utils.js'
import OrderApi from '../../api/order'
import AccountApi from '../../api/account'
import lrz from'../../vendor/lrz'
import moneyDetail from './moneyDetail.js'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.$page = $('#uploadBill')
    this.getBankList()
  }
  getBankList() {
    const that = this
    $.showPreloader()
    request({
      url: AccountApi.financeAccountList,
      data: '',
      callback(data) {
        $.hidePreloader()
        if (data.success == 1) {
          that.renderBank(data)
          that.render()
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
  renderBank(data) {
    const that = this
    let accountListTpl = 'uploadBill/accountList.html'
    nunjucks.render(accountListTpl, data).then((accountListHtml) => {
      $('.J_account_list').html(accountListHtml);
      this.selectAccount(data)
    })
  }
  render() {
    let that = this
    let orderDetail = getCache({
      type: 'sessionStorage',
      key: 'orderDetail'
    })
    this.orderNumber = getParam('orderNumber')
    this.urgeMoney = getParam('urgeMoney')
    this.payDebtId = getParam('payDebtId')
    this.id = getParam('payDebtId')
    this.noUp = true
    this.storeGoBackLink()
    that.handleFirst()
  }
 //
 goBackLink(sure, index) {
    if(this.urgeMoney){
      if (index == 1) {
        this.oldBackLin(true)
      } else {
        this.oldBackLin()
      }
    } else {
      let settlements = getCache({
        key: 'settlement'
      })
      if (index) {
       location.href = `/settlement.html`
      } else {
        sessionStorage.removeItem('settlement')
        location.href = `/settlement.html?payNumber=${settlements.payNumber}`
      }
    }
  }
  oldBackLin(isBack) {
    let url = getCache({
      key: 'temSourceUrl'
    })
    sessionStorage.removeItem('temSourceUrl')
    let comfrom = url.indexOf('orderList')
    if (isBack || comfrom != -1) {
      location.href = url
    } else {
      url = url.replace('urgeMoney=1', '')
      location.href = url
    }
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
  handleFirst() {
    const that = this
    let settlement = getCache({
      key: 'settlement'
    })
   // status  312 --订金 335-- 尾款  316 -- 货款
  //  console.log('settlement', settlement);
    let resData = {
      // totalEarnestMoney: settlement.totalEarnestMoney,
      // totalFullMoney: settlement.totalFullMoney,
      // totalTaxMoney: settlement.totalTaxMoney,
      // totalSaleMoney: settlement.totalSaleMoney,
      // totalServiceMoney: settlement.totalServiceMoney,
      // totalFinalMoney: settlement.totalFinalMoney,
      // urgeMoney: this.urgeMoney,
      totalMoney: settlement.totalMoney
    }
    if (this.urgeMoney != 1) {
      const billTextTpl = 'uploadBill/billText.html'
      nunjucks.render(billTextTpl, resData).then((billTextHtml) => {
        that.$page.find('.J_bill_text').html(billTextHtml);
      })
    } else {
       new moneyDetail(this.$page)
       $('.J_input_title').text('录入催缴欠款凭据')
    }
    this.$resData = resData
    this.uploadImage()
    this.goBack(resData)
    this.saveInfo(resData)
    this.storeData()
    this.renderTemData(resData)
    this.deleteCert()
    this.remarkFill()
    this.addUpComponent()
    this.zoomImages()
    this.listFirstCert()
  }
    // 备注限定
  remarkFill(){
    $('#uploadBill').on('input','.J_remark', function() {
      let val = $(this).val()
      if (!/^[^"&]{0,50}$/gi.test(val)) {
        $(this).val(val.substring(0, 50))
      }
    })
  }
  // 渲染暂时的信息
  renderTemData(resData) {
    let that = this
    let getTemData = getCache({
        type: 'sessionStorage',
        key: 'temData'
    })
    if (getTemData) {
      let temBillInfoTpls = 'uploadBill/temBillInfo.html'
      let len = getTemData.length
      if (len = 1 && $(".J_bill_block .J_upParent").length) {
        $('.J_upParent').closest('.J_form').remove()
      }

      getTemData.map((item) => {
          let obj = {}
          obj.imgUrl = item.imgUrl;
          obj['randNumber'] = Math.random();
          obj.remark = item.remark
          obj.imgPath = imgPath
          obj.base64 = item.base64
          nunjucks.render(temBillInfoTpls, obj).then((temBillInfoHtml) => {
            $('.J_bill_block').append(temBillInfoHtml)
            that.zoomImages()
            $('.J_add').removeClass('yhide')
             that.listenSubmit()
             that.listFirstCert()
          })
      })

    }
  }
  // 获取上传凭证
  getCertiType() {
    let certificateForMultiFundType = []
    $('.J_form', this.$page).each(function(k,v) {
       let obj = {}
       let arr = $(this).serializeArray()
       let tempArr = []
       arr.map((item) => {
          obj[item.name] = item.value
       })
       certificateForMultiFundType.push(obj)
    })
    return certificateForMultiFundType
  }
  // 设置临时凭证数据
  setTemData() {
    let list = this.getCertiType()
    setCache({
      type: 'sessionStorage',
      key: 'temData',
      value: list
    })
  }
  // 跳转作缓存
  storeData() {
   let that = this
   $('.J_link', this.$page).on('click', function() {
      let link = $(this).attr('href')
      function go() {
        that.setTemData()
        if (that.listenUpload == that.allLength) {
          clearInterval(timer)
          location.href = link
        } else {
         $.showPreloader()
        }
      }
      let timer = setInterval(() => {
        go()
      }, 1000)
      return false
   })
  }
  uploadImage() {
    let that = this;
    $(document).delegate('[type="file"]','change', function () {
      that.beginIndex = false
      let target = $(this)
       that.uploadComponent(this.files[0], target)
       that.listenSubmit()
       if ($('.J_add').hasClass('yhide')) {
         $('.J_add').removeClass('yhide')
       }
    })
  }
  uploadComponent(files, target) {
    let that = this
    lrz(files, lrzConfig)
    .then(function(rst) {
       $.showPreloader();
      let randomNumber = parseInt(Math.random() * 700 + 800)
      that.zoomImages()
      // 处理成功会执行
      rst.formData.append('field', 'imgUrl');
      imgAjax()
      function imgAjax() {
        $.ajax({
          url: '/redwood/sys/Common/uploadFile.do?type=2',
          type: "POST",
          data: rst.formData,
          // timeout: 10000,
          processData: false, // 告诉jQuery不要去处理发送的数据
          contentType: false, // 告诉jQuery不要去设置Content-Type请求头
          success: function(data) {
            $.hidePreloader()
            if (data.success == 1) {
              that.beginIndex = true
              target.closest(".J_newParent").html(`<img src="${rst.base64}" data-src="" id="yang${randomNumber}" class="J_zoom" style="border:1px solid #ccc;" /><input type='hidden' name='base64' value='${rst.base64}'>`)
              $("#yang"+randomNumber).attr('data-src', data.imgUrl)
              $("#yang"+randomNumber).after(`<input type='hidden' name='imgUrl' value='${data.imgUrl}'>`)
              that.listenSubmit()
              that.zoomImages()
            } else {
              $.toast(data.msg)
            }
          },
          error: function(error) {
            $.hidePreloader()
            that.beginIndex = true
          }
        });
      }

    })
  }
  // 查看大图
  zoomImages() {
    $(".J_bill_block .J_zoom").unbind('click').on('click', function () {
      let photos = [];
      photos.push($(this).attr('src'));
      let myPhotoBrowserPopup = $.photoBrowser({
        photos: photos,
        type: 'popup'
      });
      myPhotoBrowserPopup.open();
    });
  }
  // 删除凭证
  deleteCert() {
    this.$page.on('click', '.J_del', (e) => {
       let $this = $(e.target)
       let len = $this.closest('.J_bill_block').find('.J_form').length;
       if (len == 1) {
        this.listFirstCert()
        return
       }
       $this.closest('.J_form').remove();
       this.setTemData()
       this.listenSubmit()
       this.listFirstCert()
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
  // 返回
  goBack(resData) {
    let that = this
    $(document).on('click','.J_goBack', () => {
      $.modal({
        title: '是否保存并提交修改',
        text: '一旦提交,将不可修改，任务将被传递',
        buttons: [
          {
            text: '继续返回',
            onClick() {
              sessionStorage.removeItem('temData')
              that.goBackLink(false, 1)
            }
          },
          {
            text: '保存确认',
            bold: true,
            onClick: function () {
              if ($('.J_save_btn ').hasClass('disabled')) {
                $.alert('请上传付款凭据')
              } else {
                that.requestSave(resData)
              }
            }
          }
        ]
      })
    })
  }
  // 保存
  saveInfo(resData) {
    let that = this
    $('.J_save_btn', this.$page).unbind('click').on("click", (e) => {
      let on =  $(e.target).hasClass('disabled')
      if (on) {
        return false
      } else {
        let text = ''
        let buttonsArr = [
          {
            text: '取消'
          },
          {
            text: '确定',
            bold: true,
            onClick() {
              that.requestSave(resData)
            }
          }
        ]
        $.modal({
          title: '立即通知财务查收',
          text,
          buttons: buttonsArr
        })
      }
    })
  }
  // 监听满足条件
  listenSubmit() {
    let result = this.getCertiType()
    let on = false
    // result.map((item) => {
    //   if(!item.imgUrl) {
    //     on = true
    //   }
    // })
    if(!on) {
      const tips = $('.J_account_checked')
      on = $('[name="financeAccountId"]').val() ? false : true
      on ? tips.removeClass('fn-hide') : tips.addClass('fn-hide')
    }
    if (on) {
      $(".J_save_btn").addClass('disabled')
    } else {
      $(".J_save_btn").removeClass('disabled')
    }
  }
  requestSave(resData) {
    let that = this
    let certificateForMultiFundType = that.getCertiType()
    certificateForMultiFundType = certificateForMultiFundType.map((item) => {
      if (item.base64) {
        delete item.base64
      }
      return item
    })
    let settlement = getCache({
      key: 'settlement'
    })
    let reqOption ={
      // type: 1,
      orderNumberList: settlement.orderNumberList,
      payNumber: settlement.payNumber,
      certificateList: certificateForMultiFundType,
      financeAccountId: $('[name="financeAccountId"]').val(),
      _time: that._time
    }
    let url
    if (that.urgeMoney) {
      url = OrderApi.inputDebtPayCertificate
      // reqOption.orderNumber = that.orderNumber 2016-9-16 作废  orderNumber 参数改成 payDebtId
      reqOption.payDebtId = that.id
      delete reqOption.orderNumberList
      delete reqOption.payNumber
    } else {
      url = OrderApi.inputPayCertificate
    }
    // console.log('reqOption', reqOption);
    // return false
    $.showPreloader()
    request({
      url,
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(reqOption),
      callback(data) {
        $.hidePreloader()
        if (data.success == 1) {
          sessionStorage.removeItem('temData')
          clearListCache()
          $.alert(data.msg, () => {
            that.goBackLink(true)
          })
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
  // 选择财务收款方式
  selectAccount(bankData) {
    const that = this
    $('[name="financeAccountId"]').change(()=> {
      that.listenSubmit()
      const bankId = $('[name="financeAccountId"]').val()
      // $('.J_account_number').html(bankNumber)
      bankData.result.map((obj, i)=> {
        if (bankId == obj.id) {
          $('.J_account_number').html(obj.bankNumber)
        }
      })
    })
  }
  // 添加上传凭据
  addUpComponent() {
    let billInfoTpl = 'uploadBill/billInfo.html'
    let that = this
    $(".J_add", this.$page).on('click', function() {
      let targetContent = $(this).closest('.J_input_content').find('.J_bill_block')
      nunjucks.render(billInfoTpl, {}).then((billInfoHtml) => {
        targetContent.append(billInfoHtml);
        that.listenSubmit()
        that.listFirstCert()
      })
    })
  }
}
export default new Page()
