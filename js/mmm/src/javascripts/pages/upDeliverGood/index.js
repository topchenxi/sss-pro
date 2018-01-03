import '../../common/base.js'
import OrderApi from '../../api/order'
import { getParam, getCache, setCache, lrzConfig, clearListCache, getLastPage, imgPath } from '../../common/utils.js'
import lrz from '../../vendor/lrz'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.render()
  }
  render() {
    let that = this
    that.$page = $('#upDeliverGood')
    that.orderNumber = getParam('orderNumber')
    that.notEdit = getParam('notEdit') || 0
    let orderDetail = getCache({
      type: 'sessionStorage',
      key: 'orderDetail'
    })
    if (that.notEdit) { // 表示只是展示作用 不是用来编辑的
      $.showPreloader()
      request({
        url: OrderApi.getSendCertificateList,
        data: {
          orderNumber: that.orderNumber,
          _time: that._time
        },
        callback(data) {
          $.hidePreloader()
          if (data.success == 1) {
            data.result[0].imgPath = imgPath
            that.fillData(data.result[0])
          } else {
            $.alert(data.msg)
          }
        }
      })
    } else {
      if (orderDetail && orderDetail.obj.orderNumber == that.orderNumber) {
        that.fillData(orderDetail.obj)
      } else {
        $.showPreloader()
        request({
          url: OrderApi.getDetail,
          data: {
            orderNumber: that.orderNumber,
            _time: that._time
          },
          callback(data) {
            $.hidePreloader()
            if (data.success == 1) {
              setCache({
                type: 'sessionStorage',
                key: 'orderDetail',
                value: data
              })
              that.fillData(data.obj)
            } else {
              $.alert(data.msg)
            }
          }
        })
      }
    }
  }
  fillData(data) {
    const doms = this.doms = {}
    let tpl = 'upDeliverGood/index.html'
    data.notEdit = this.notEdit
    nunjucks.render(tpl, data).then((tplHtml) => {
      $('.J_input_content').html(tplHtml)
      doms.logisticsInfo = $('.J_logisticsInfo', this.$page)
      doms.carInfo = $('.J_carInfo', this.$page)
      doms.num = 1
      doms.saveBtn = $('.J_save', this.$page)
      if (this.notEdit == 1) {
        $('.J_input_title').html('物流信息')
      }
      this.handleChoose()
      this.uploadImage()
      this.save()
      this.deleteCert()
      this.goBack()
      this.seCardGood()
      this.dochecked()
      this.zoomImages()
    })
  }
  seCardGood() {
    if (getParam('from')) {
      $('.J_deliverGood').remove()
    }
  }
  goBackLink() {
    // let source = getParam('source')
    // let url = decodeURIComponent(source)
    location.href = getLastPage()
  }
  goBack() {
    $('.J_goBack').on('click', () => {
      this.goBackLink()
    })
  }
  handleChoose() {
    const doms = this.doms
    $('.J_choseType input[name="type"]', this.$page).on('click', (e) => {
      doms.num = $(e.target).attr('data-num')
          // 1 -- 物流    0 -- 车队
      if (Number(doms.num) === 1) {
        doms.logisticsInfo.show()
        doms.carInfo.hide()
      } else if (Number(doms.num) === 0) {
        doms.logisticsInfo.hide()
        doms.carInfo.show()
      }
      this.dochecked()
    })
  }
  uploadImage() {
    const that = this;
    $('#img-file').unbind('change').on('change', function() {
      let $that = $(this)
      that.uploadTimes = []
      that.listenUpload = 0
      that.allLength = this.files.length
      $.each(this.files, (i, files) => {
        that.uploadTimes[i] = 0
        that.uploadComponent(files, $that, i)
      });
    })
  }
  uploadComponent(files, $that, index) {
    let that = this
    lrz(files, lrzConfig)
      .then((rst) => {
          // 处理成功会执行
        $.showPreloader();
        let randomNumber = parseInt(Math.random() * 700 + 800)
        const imgTpl = 'upDeliverGood/imgComponent.html'
        nunjucks.render(imgTpl, {
          base64: rst.base64,
          randomNumber
        }).then((imgTplHtml) => {
          $('.J_images', that.$page).before(imgTplHtml)
          that.zoomImages()
          $that.val(null)
          $.hidePreloader()
        })
        rst.formData.append('field', 'imgUrl')
        function imagAjax(index) {
          that.uploadTimes[index]++;
          $.ajax({
            url: '/redwood/sys/Common/uploadFile.do?type=4',
            type: 'POST',
            data: rst.formData,
            // timeout: 100,
            processData: false, // 告诉jQuery不要去处理发送的数据
            contentType: false, // 告诉jQuery不要去设置Content-Type请求头
            success: function(data) {
              $.hidePreloader();
              if (data.success == 1) {
                $('#single' + randomNumber).attr('data-src', data.imgUrl)
                that.listenUpload++
                that.dochecked()
              } else {
                $.toast(data.msg)
              }
              $that.val(null)
            },
            error: function(error) {
              if (that.uploadTimes[index] < 2) {
                imagAjax(index)
              } else {
                that.listenUpload++
              }
            }
          });
        }
        imagAjax(index)
      })
  }
      // 查看大图
  zoomImages() {
    this.$page.find('.J_zoom').unbind('click').on('click', function() {
      const photos = [];
      $(this).closest('.J_has_upload').find('.J_zoom').each(function() {
        let src = $(this).attr('src')
        if (src.indexOf('@') != -1) {
          src = src.slice(0, src.indexOf('@'))
        }
        photos.push(src)
      })
      const myPhotoBrowserPopup = $.photoBrowser({
        photos,
        type: 'popup'
      });
      myPhotoBrowserPopup.open();
    });
  }
      // 删除凭证
  deleteCert() {
    this.$page.on('click', '.J_del', (e) => {
      $(e.target).closest('.J_wrap').remove();
      this.dochecked()
    })
  }
      // 真正图片地址检测
  realImages() {
    let on = false
    $('.J_zoom').each(function() {
      if (!$(this).attr('data-src')) {
        on = true
        $(this).addClass('warning')
      } else {
        $(this).removeClass('warning')
      }
    })
    return on
  }
      // 遍历图片地址
  allImages() {
    let imgUrls = []
    $('.J_has_upload').find('.J_zoom').each(function() {
      imgUrls.push($(this).attr('data-src'))
    })
    return imgUrls
  }
  save() {
    const doms = this.doms
    const obj = {
      _time: this._time
    }
    let that = this
    $('.J_save', this.$page).unbind('click').on('click', (e) => {
      const target = $(e.target)
      if (target.hasClass('disabled')) return
      let imgUrls = that.allImages()
      if (!getParam('from')) {
        if (Number(doms.num) == 1) { // 物流
          const form1 = doms.logisticsInfo.serializeArray()
          form1.map((item) => {
            obj[item.name] = item.value
          })
        } else if (Number(doms.num) == 0) { // 车队
          const form2 = doms.carInfo.serializeArray()
          form2.map((item) => {
            obj[item.name] = item.value
          })
        }
        obj.orderNumber = this.orderNumber
        let ArrType = $('.J_type').serializeArray()
        if (ArrType.length == 0) {
          $.alert('请选择发货类型')
          return false
        } else if (ArrType[0].value == 1 && imgUrls.length == 0) {
          $.alert('发货类型为物流时必须上传图片凭据!')
          return false
        }
        obj.type = ArrType[0].value
        if (imgUrls.length > 0) {
          timeCount(() => {
            askInterface(obj)
          })
        } else {
          askInterface(obj)
        }
      } else {
        // 上传发货凭据图片不必传()
        // if (imgUrls.length == 0) {
        //   $.alert('请上传发货凭据!')
        //   return false
        // }
        timeCount(() => {
          askInterface({
            _time: that._time,
            orderNumber: getParam('orderNumber')
          })
        })
      }

      // 公共判断图片是否在上传
      function timeCount (callback) {
        let timer = setInterval(() => {
          $.showPreloader()
          if (that.listenUpload == that.allLength) {
            $.hidePreloader()
            clearInterval(timer);
            let realImages = that.realImages()
            if (realImages) {
              $.alert('红框标记的,请删除重新上传!!')
            } else {
              callback && callback(obj)
            }
          }
        }, 100)
      }

      // 公共请求函数
      function askInterface(obj) {
        let imgUrls = that.allImages()
        obj.imgUrls = JSON.stringify(that.allImages(imgUrls))
        if (imgUrls.length == 0) {
          delete obj.imgUrls
        }
        if (obj.type == 1) { // 物流的时候删除 车队的信息
          delete obj.carNumber
          delete obj.contactName
          delete obj.contactTel
        }
        if (obj.type == 0) { // 车队的时候删除物流的信息
          delete obj.sendCompany
          delete obj.sendOrderNumber
          delete obj.sendTel
        }
        $.showPreloader()
        request({
          url: OrderApi.send,
          data: obj,
          cache: true,
          cacheType: 'sessionStorage',
          callback: (data) => {
            $.hidePreloader()
            if (data.success === '1') {
              $.alert(data.msg, () => {
                clearListCache()
                that.goBackLink()
              })
            } else {
              $.alert(data.msg)
            }
          }
        })
      }
    })
  }
  dochecked() {
    const imgLenth = $('.J_wrap').length
    if ($('input[name="type"]:checked').val() == 1 && !imgLenth) {
      $('.J_save').addClass('disabled')
    } else {
      $('.J_save').removeClass('disabled')
    }
  }
}
export default new Page()
