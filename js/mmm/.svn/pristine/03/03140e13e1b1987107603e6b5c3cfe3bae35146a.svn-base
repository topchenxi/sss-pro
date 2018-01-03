import '../../common/base.js'
import {
  moneyDetail
} from '../moneyDetailList/index.js'
import lrz from '../../vendor/lrz'
class Page {
  constructor() {
    this._time = new Date()
      .getTime()
    this.render()
  }
  render() {
    const sameInfoTpl = 'uploadType/sameInfo.html'
    this.billInfo = {
      orderNumber: 'asd1231231',
      seller: '帅哥',
      buyer: '国男',
      good: '12211231'
    }
    nunjucks.render(sameInfoTpl, this.billInfo)
      .then((sameInfoHtml) => {
        this.$page = $('#uploadType')
        this.$page.find('.J_bill_text')
          .html(sameInfoHtml);
      })
    this.bindEvents()
      // 这里传查看费用明细的data
    moneyDetail($('#fareDetail-list'), {})
  }
  bindEvents() {
    this.uploadImage();
    this.saveInfo();
    this.deleteCert();
  }
  uploadImage() {
      const uploadTpl = 'uploadType/uploadTpl.html'
      let that = this;
      $('#img-file')
        .unbind('change')
        .on('change', function () {
          $.each(this.files, function (i, files) {
            lrz(files, {
                width: 1280,
                height: 1280,
                quality: 40
              })
              .then(function (rst) {
                // 处理成功会执行
                rst.formData.append('field', 'imgUrl');
                $.showPreloader();
                $.ajax({
                  url: '/pages/Tmp/uploadTmpFile.do',
                  type: "POST",
                  data: rst.formData,
                  processData: false, // 告诉jQuery不要去处理发送的数据
                  contentType: false, // 告诉jQuery不要去设置Content-Type请求头
                  success: function (data) {
                    let obj = {};
                    obj['imgUrl'] = data.imgUrl;
                    obj['base64'] = rst.base64;
                    obj['randNumber'] = Math.random();
                    nunjucks.render(uploadTpl, obj)
                      .then((uploadTplHtml) => {
                        $('.J_bill_block')
                          .append(uploadTplHtml)
                        that.zoomImages();
                        that.chooseType();
                      })


                  }
                });
              })
              .catch(function (err) {
                // 处理失败会执行
                $.alert(err)
              })
              .always(function (always) {
                // 不管是成功失败，都会执行
                $.hidePreloader();
              });
          });
        })
    }
    // 查看大图
  zoomImages() {
      this.$page.find('.J_zoom')
        .on('click', function () {
          let photos = [];
          photos.push($(this)
            .attr('src'));
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
        $(e.target)
          .closest('.J_bill_section')
          .remove();
      })
    }
    // 保存
  saveInfo() {
      let that = this
      $('.J_save_btn', this.$page)
        .on("click", () => {
          let billBlock = $('.J_bill_block', that.$page)
          let len = billBlock.find('.J_bill_section')
            .length

          if (len == 0) {
            $.alert('必须上传凭证')
            return
          }

          let billCheckBox = billBlock.find('.checkbox-wrap')
          let arr = [];
          let turn = false
          $.each(billCheckBox, function () {
            let on = true
            $(this)
              .find('[name="cageTory"]')
              .each(function () {
                if ($(this)
                  .prop('checked')) {
                  on = false
                }
              })
            arr.push(on)
          })
          $.each(arr, function (k, v) {
            if (v) {
              turn = true
            }
          })
          if (turn) {
            $.alert('上传凭证的类型至少选一个!!')
            return
          }
          $.alert('请求接口')
        })
    }
    // 类型选择判断
  chooseType() {
    // 根据明细来
    this.moneyInfo = {
      orderName: 0,
      leftMoney: 10,
      serviceMoney: 50
    }
    const that = this
    $("[name='cageTory']", this.$page)
      .on('change', (e) => {
        let warnTip = $('.J_warn', $(e.target)
          .closest('.J_bill_section'));
        let num = $(e.target)
          .attr('data-cagetory')
        let on = $(e.target)
          .prop('checked')
        console.log('ononono---', on)
        if (on) {
          console.log('onon')
            // 这里取明细对比 订金为0 就显示
          if (num == 0 && that.moneyInfo.orderName != 0) {
            warnTip.eq(num)
              .show()
          }
          if (num == 1 && that.moneyInfo.leftMoney != 0) {
            warnTip.eq(num)
              .show()
          }
          if (num == 2 && that.moneyInfo.serviceMoney != 0) {
            warnTip.eq(num)
              .show()
          }
        } else {
          warnTip.eq(~~num)
            .hide()
        }

      })
  }
}
export default new Page()
