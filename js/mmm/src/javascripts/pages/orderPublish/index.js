/*
  author  yonghuang
 */
import '../../common/base.js'
import { getCache, setCache, imgPath, getParam, clearListCache, setLastPage } from '../../common/utils'
import orderApi from '../../api/order'
import lrz from '../../vendor/lrz'
class Page {
    constructor() {
        this._time = new Date().getTime()
        this.render();
        $.toast('该功能已下架!');
    }
    render() {
        const that = this
        // 表示进来该页面是否有操作
        this.change = false
        that.host = location.host
        // 是否是编辑页面
        this.source = getParam('source') || ''
        const tpl = 'orderPublish/index.html'
        let renderObj = {}
        if (!this.source) {
            // 采购商信息
            this.buyerInfo = getCache({
                key: 'buyerInfo',
                type: 'sessionStorage',
                dataType: 'json'
            })
            // 供应商信息
            this.sellerInfo = getCache({
                key: 'sellerInfo',
                type: 'sessionStorage',
                dataType: 'json'
            })
            this.firstStep = getCache({
                key: 'firstStep',
                type: 'sessionStorage',
                dataType: 'json'
            })
            this.firstStepTemp = getCache({
                key: 'firstStepTemp',
                type: 'sessionStorage',
                dataType: 'json'
            })
            this.publishAgain = getCache({
                key: 'publishAgain',
                type: 'sessionStorage',
                dataType: 'json'
            })
            if (this.sellerInfo || this.firstStep || this.buyerInfo) {
                this.change = true
            }
            if (this.firstStepTemp) {
                // this.firstStepTemp.sellerCompany = this.sellerInfo.sellerCompany
                // this.firstStepTemp.sellerTel = this.sellerInfo.sellerTel
                // this.firstStepTemp.sellerAddr = this.sellerInfo.sellerAddr
                // this.firstStepTemp.sellerProvince = this.sellerInfo.sellerProvince
                // this.firstStepTemp.sellerArea = this.sellerInfo.sellerArea
                // this.firstStepTemp.sellerCity = this.sellerInfo.sellerCity
                renderObj = $.extend({}, this.firstStepTemp)
            } else {
                renderObj = $.extend({}, this.firstStep)
            }
            if (renderObj.disabled === true || renderObj.disabled === undefined) {
                renderObj.disabled = true
            } else {
                renderObj.disabled = false
            }
            console.log('renderObj.disabled:' + renderObj.disabled)
            this.renderData = {
                //imgUrls: renderObj.imgUrls,
                imagesPath: imgPath,
                buyerInfo: this.buyerInfo,
                sellerInfo: this.sellerInfo,
                type: renderObj.type,
                productType: renderObj.productType,
                productNumber: renderObj.productNumber,
                haveRealVersion: renderObj.haveRealVersion,
                checkCloth: renderObj.checkCloth,
                // disabled: this.firstStep ? !this.firstStep : renderObj.disabled,
                disabled: this.buyerInfo == false || this.sellerInfo == false || renderObj.type == 'undefined' || renderObj.productType == 'undefined' || renderObj.haveRealVersion == 'undefined' || renderObj.checkCloth == 'undefined',
                change: this.change
            }
            // this.buyerInfo == false || this.sellerInfo == false || renderObj.type == 'undefined' || renderObj.productType == 'undefined' || renderObj.haveRealVersion == 'undefined' || renderObj.checkCloth == 'undefined'
            console.log('renderData.disabled:' + this.renderData.disabled)
        } else {
            // 从订单详情过来 编辑
            this.change = true
            this.orderDetail = getCache({
                key: 'orderDetail',
                type: 'sessionStorage',
                dataType: 'json'
            })
            const obj = this.orderDetail.obj
            this.sellerInfo = {
                id: obj.shopId,
                sellerCompany: obj.sellerCompany,
                sellerTel: obj.sellerTel,
                sellerAddr: obj.sellerAddr,
                sellerArea: obj.sellerArea,
                sellerCity: obj.sellerCity,
                sellerProvince: obj.sellerProvince,
            }
            this.renderData = {
                //imgUrls: obj.imgUrls,
                imagesPath: imgPath,
                buyerInfo: obj.buyer,
                sellerInfo: this.sellerInfo,
                type: obj.type,
                productType: obj.productType,
                productNumber: obj.productNumber,
                haveRealVersion: obj.haveRealVersion,
                checkCloth: obj.checkCloth,
                source: this.source,
                orderNumber: obj.orderNumber,
                change: this.change
            }
            this.renderData.buyerInfo.billingCycle = obj.billingCycle
            console.log('buyerInfo', this.renderData);
        }

        if (this.source) {
            this.skipUrl = `/orderDetail.html?orderNumber=${this.orderDetail.obj.orderNumber}`
            this.backUrl = `/orderDetail.html?orderNumber=${this.orderDetail.obj.orderNumber}`
        } else {
            this.skipUrl = '/addColor.html'
            if (this.publishAgain) {
                this.backUrl = '/buyList.html?listKey=ywc&comeFrom=publishAgain&category=all-all'
            } else {
                this.backUrl = '/?category=all-all'
            }
        }
        console.log('this.renderData113:', this.renderData)
        nunjucks.render(tpl, this.renderData).then((orderPublishHtml) => {
            that.$contet = $('.J_content')
            that.$contet.html(orderPublishHtml)
            this.bindEvents()
            return
        })
    }
    bindEvents() {
        const saveBtn = $('.J_save')
        // const imgFile = $('#img-file')
        const imgDom = $('.J_has_upload')
        const backBtn = $('.J_back') // 返回键
        const selectBuyer = $('.J_select_buyer') // 选择采购商
        const sellerEdit = $('.J_seller_edit') // 编辑供应商
        // const imgTpl = 'imgTpl.html'
        this.formDom = $('form')
        const $productType = $('input[name="productType"]')
        const $haveRealVersion = $('input[name="haveRealVersion"]')
        const $checkCloth = $('input[name="checkCloth"]')
        const $productNumber = $('input[name="productNumber"]')
        const $type = $('input[name="type"]')
        if (this.firstStepTemp) {
            this.doChecked($productNumber)
        }
        this.valid = false
        const _this = this
        // 焦点以上校验
        $productType.change((e) => {
            this.doChecked(e)
            this.hideTips($(e.currentTarget))
            this.colorInfo = getCache({
                key: 'colorInfo',
                type: 'sessionStorage',
                dataType: 'json'
            })
            if (this.colorInfo) {
                $.modal({
                    title: '修改品类',
                    text: '确定修改，已填的色号信息将会被清空',
                    buttons: [{
                            text: '确定',
                            onClick: () => {
                                sessionStorage.removeItem('colorInfo')
                            }
                        },
                        {
                            text: '取消'
                        }
                    ]
                })
            }
            this.change = true
        })
        $type.change((e) => {
            this.doChecked(e)
            this.hideTips($(e.currentTarget))
            this.change = true
        })
        $haveRealVersion.change((e) => {
            this.doChecked(e)
            this.hideTips($(e.currentTarget))
            this.change = true
        })
        $checkCloth.change((e) => {
            this.doChecked(e)
            this.hideTips($(e.currentTarget))
            this.change = true
        })
        $productNumber.on('input', (e) => {
            const val = $(e.currentTarget).val()
            if (!val) {
                this.showTips($(e.currentTarget))
            } else {
                this.hideTips($(e.currentTarget))
            }
            this.doChecked(e)
            this.change = true
        })
        if (!this.source) {
            selectBuyer.on('click', () => {
                const formData = this.gatherFormData()
                if ($('.J_save').hasClass('disabled')) {
                    formData.disabled = true
                } else {
                    formData.disabled = false
                }
                setCache({
                    type: 'sessionStorage',
                    dataType: 'json',
                    value: formData,
                    key: 'firstStepTemp'
                })
                setLastPage()
                location.href = '/buyerList.html?source=orderPublish'
                return false
            })
        }
        sellerEdit.on('click', () => {
            const formData = this.gatherFormData()
            if ($('.J_save').hasClass('disabled')) {
                formData.disabled = true
            } else {
                formData.disabled = false
            }
            setCache({
                type: 'sessionStorage',
                dataType: 'json',
                value: formData,
                key: 'firstStepTemp'
            })
            setLastPage()
            location.href = '/sellerList.html'
            return false
        })
        backBtn.on('click', () => {
            if (this.change) {
                $.modal({
                    title: '尚未提交订单',
                    text: '继续返回，已填内容将不会被保留',
                    buttons: [{
                            text: '继续返回',
                            onClick: () => {
                                sessionStorage.removeItem('firstStep')
                                sessionStorage.removeItem('sellerInfo')
                                sessionStorage.removeItem('buyerInfo')
                                sessionStorage.removeItem('secondStep')
                                sessionStorage.removeItem('colorInfo')
                                sessionStorage.removeItem('addressInfo')
                                sessionStorage.removeItem('defaultAddr')
                                sessionStorage.removeItem('sendWaysObj')
                                sessionStorage.removeItem('firstStepTemp')
                                sessionStorage.removeItem('publishAgain')
                                location.href = this.backUrl
                                return false
                            }
                        },
                        {
                            text: '继续填写'
                        }
                    ]
                })
                return false
            } else {
                location.href = this.backUrl
                return false
            }
        })
        /* imgDom.on('click', '.J_img_preview', () => {
           const imgUrl = []
           $('.J_img_preview img').each((e, value) => {
             let src = $(value).attr('src')
             if (src.indexOf('@') != -1) {
               src = src.slice(0, src.indexOf('@'))
             }
             imgUrl.push(src)
           })
           const myPhotoBrowserPopup = $.photoBrowser({
             photos: imgUrl,
             type: 'popup'
           })
           myPhotoBrowserPopup.open()
         })*/
        // 删除图片
        /*imgDom.on('click', '.J_img_del', (e) => {
          const target = $(e.currentTarget)
          this.change = true
          // this.doChecked(e)
          target.parents('.J_upload_img').remove()
        })*/
        /*imgFile.unbind('change').on('change', function() {
          let $that = $(this)
          $.each(this.files, (i, files) => {
            lrz(files, {
              width: 1280,
              height: 1280,
              quality: 40
            })
            .then((rst) => {
              $.showPreloader();
              // 处理成功会执行
              rst.formData.append('field', 'imgUrl');
              const option = {
                url: '/redwood/sys/Common/uploadFile.do?type=0&time=' + _this._time,
                type: 'POST',
                data: rst.formData,
                processData: false, // 告诉jQuery不要去处理发送的数据
                contentType: false, // 告诉jQuery不要去设置Content-Type请求头
                success: (data) => {
                  $.hidePreloader();
                  if (data.success == 1) {
                    const obj = {}
                    obj.link = data.imgUrl
                    obj.previewlink = rst.base64
                    nunjucks.render(imgTpl, obj).then((imgHtml) => {
                      const hasUploadNum = $('.J_upload_img').length
                      if (hasUploadNum >= 9) {
                        $.toast('最多只能上传9张')
                        return
                      }
                      imgDom.prepend(imgHtml)
                      _this.change = true
                      // _this.doChecked($('input[name="sellerCompany"]'))
                    })
                  } else {
                    $.alert(data.msg)
                  }
                  $that.val(null)
                },
                error: () => {
                  $.hidePreloader();
                  $.alert('上传失败')
                }
              }
              $.ajax(option);
            })
            .catch((err) => {
              // 处理失败会执行
              $.alert(err)
            })
            .always(() => {
              // 不管是成功失败，都会执行
              // $.hidePreloader()
            });
          });
        })*/
        // 保存
        saveBtn.on('click', (e) => {
            $.toast('该功能已下架!');
            return;
            if ($(e.currentTarget).hasClass('disabled')) return
            const formData = this.gatherFormData()
            console.log('formData:', formData)
            if (this.source) {
                $.showPreloader()
                //formData.imgUrls = JSON.stringify(formData.imgUrls)
                request({
                    url: orderApi.updateProductNumber,
                    data: formData,
                    cache: false,
                    callback: (data) => {
                        $.hidePreloader()
                        if (data.success == '1') {
                            clearListCache()
                            location.href = this.skipUrl
                        } else {
                            $.alert(data.msg)
                        }
                    }
                })
            } else {
                setCache({
                    type: 'sessionStorage',
                    dataType: 'json',
                    value: formData,
                    key: 'firstStep'
                })
                location.href = this.skipUrl
            }
            sessionStorage.removeItem('firstStepTemp')
        })
    }
    gatherFormData() {
        //const imgDoms = $('.J_has_upload').find('.J_upload_img')
        const formArray = this.formDom.serializeArray()
        const formData = {
            _time: this._time
        }
        /*formData.imgUrls = []
        imgDoms.each((key, dom) => {
          formData.imgUrls.push($(dom).find('a').attr('data-link'))
        })*/
        formArray.map((key) => {
            formData[key.name] = key.value
        })
        if (this.source) { // 编辑订单
            delete formData.sellerCompany
            delete formData.sellerTel
            delete formData.sellerAddr
            delete formData.buyType
            delete formData.buyerId
        }
        return formData
    }
    doChecked(e) {
        const items = e.currentTarget ? $(e.currentTarget).parents('.J_need_item') : $(e).parents('.J_need_item')
        const that = this
        const validArr = []
        items.prevAll().each((i, item) => {
            const input = $(item).find('input')
            let val = ''
            console.log(input.attr('type'))
            if (input.attr('type') === 'radio') {
                const name = input.attr('name')
                val = $(`input[name='${name}']:checked`).val()
            } else {
                val = input.val()
            }
            if (val === '' || val === undefined) {
                that.showTips(input)
            }
        })
        $('.J_need_item').each((i, item) => {
            const input = $(item).find('input')
            let val = ''
            if (input.attr('type') === 'radio') {
                const name = input.attr('name')
                val = $(`input[name='${name}']:checked`).val()
            } else {
                val = input.val()
            }
            if (val === '' || val === undefined) {
                validArr.push('false')
            }
        })
        if ($(e.currentTarget ? e.currentTarget : e).val() === '') {
            validArr.push('false')
            that.showTips($(e.currentTarget ? e.currentTarget : e))
        }
        if (validArr.length) {
            var cannotNext = $('input[name=type]:checked').val() == undefined ||
                $('input[name=buyerId]').val() == '' ||
                $('input[name=shopId]').val() == '' ||
                $('input[name=productType]:checked').val() == undefined ||
                $('input[name=haveRealVersion]:checked').val() == undefined ||
                $('input[name=checkCloth]:checked').val() == undefined;
            if (cannotNext)
                $('.J_save').addClass('disabled')
        } else {
            $('.J_save').removeClass('disabled')
        }
    }
    showTips(doms) {
        doms.parents('.item-inner').find('.tips').removeClass('fn-hide')
    }
    hideTips(doms) {
        doms.parents('.item-inner').find('.tips').addClass('fn-hide')
    }
}
export default new Page()