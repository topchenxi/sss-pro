import '../../common/base.js'
import {
    getCache,
    setCache,
    imgPath,
    getParam,
    clearListCache
} from '../../common/utils'
import orderApi from '../../api/order'
import lrz from '../../vendor/lrz'
class Page {
    constructor() {
        this.doms = {
            content: $('.J_content'),
            footer: $('.J_footer')
        }
        this.orderInfo = null;
        this.render()
    }

    render() {
        const that = this;
        const tpl = 'jbInputInfo/index.html'
        const orderID = getParam('id');
        request({
            url: `${orderApi.searchCutOrder}/${orderID}`,
            method: 'GET',
            cache: false,
            callback: (response) => {
                if (response.success === '1') {
                    response.obj.createTime = that.formatTime(response.obj.createTime)
                    response.obj.madanUrls = response.obj.madanUrls || []
                    response.obj.productNumbers.forEach((product) => {
                        product.colors.forEach((color) => {
                            color.cutterPriceUnit = color.followerPriceUnit
                            color.cutterQuantityUnit = color.followerQuantityUnit
                        })
                    })
                    response.obj.madan = response.obj.madan || ''
                    that.orderInfo = response.obj
                    nunjucks.render(tpl, response.obj).then((html) => {
                        that.doms.content.html(html)
                        that.bindEvents()
                        that.canSubmit()
                    })
                } else {
                    $.alert(response.msg)
                }
            }
        })
    }

    saveJBInfo() {
        let jbMsg = $('#jb-msg').val().replace(/[\r\n]/g, '').replace(/\ +/g, '')
        let order = this.orderInfo
        if (order.madan.length < 4 || order.madan.length > 50) {
            $.toast(order.madan.length < 4 ? '请输入正确的码单' : '长度不能超过50个字符')
            return false
        }
        if (jbMsg.length > 100) {
            $.toast('留言不能超过一百个字')
            return false;
        }
        if (order.madanUrls.length === 0) {
            $.toast('请提交码单')
            return false;
        }
        order.costMoney = $('.J-cost-money').val()
        let method = getParam('type')
        let putData = $.extend({}, {
            cutterRemark: jbMsg,
            productNumbers: order.productNumbers,
            costMoney: order.costMoney,
            madanUrls: order.madanUrls,
            totalMoney: order.totalMoney,
            taxMoney: order.taxMoney,
            madan: order.madan,
            serviceMoney: order.serviceMoney
        })
        const orderID = getParam('id');
        request({
            url: `${orderApi.searchCutOrder}/${orderID}?_function=input`,
            data: JSON.stringify(putData),
            method: 'PUT',
            contentType: 'application/json',
            cache: false,
            callback: (response) => {
                if (response.success === '1') {
                    history.back()
                } else {
                    $.alert(response.msg)
                }
            }
        })
    }

    toFloat(number) {
        return parseFloat((number || 0).toFixed(2))
    }

    countCostMoney() {
        let countPrice = 0
        this.orderInfo.productNumbers.forEach((product) => {
            product.colors.forEach((color) => {
                countPrice += this.toFloat(color.cutterPriceMoney * color.cutterQuantity)
            })
        })
        this.orderInfo.costMoney = countPrice
    }

    countTaxMoney() {
        let taxMoney = 0
        let order = this.orderInfo;
        order.taxMoney = this.toFloat((order.costMoney + order.serviceMoney) * order.taxPoint / 100)
    }

    countTotalMoney() {
        this.countCostMoney();
        this.countTaxMoney();
        this.countServiceMoney();
        let order = this.orderInfo;
        order.totalMoney = this.toFloat(order.taxMoney + order.serviceMoney + order.costMoney)
        $('.J-cost-money').val(order.costMoney)
    }

    countServiceMoney() {
        let order = this.orderInfo;
        let serviceMoney = order.productNumbers.reduce((productAcc, productVal) => {
            let countQuantity = productVal.colors.reduce((colorAcc, colorVal) => {
                return Number(colorAcc) + Number(colorVal.cutterQuantity)
            }, 0)
            let currentProductPrice = countQuantity * productVal.price
            return (productAcc + currentProductPrice)
        }, 0)
        order.serviceMoney = parseFloat(serviceMoney.toFixed(2))
    }

    bindEvents() {
        const that = this
        const saveBtn = $('.J_save')
        const imgFile = $('#img-file')
        const imgDom = $('.J_has_upload')
        const backBtn = $('.J_back') // 返回键
        const imgTpl = 'imgTpl.html'
        const followerPriceInput = $('.J-follower-price-money')
        const followerQuantityInput = $('.J-follower-quantity')
        const addImgBtn = $('.J_add_img')
        const changeUnit = $('.J-quantity-selector')
        const inputUnit = $('.J-quantity-input')
        that.formDom = $('form')
        // 回退
        backBtn.on('click', () => {
            $.modal({
                title: '提示',
                text: '点击返回已填写的信息将会丢失，是否确认返回？',
                buttons: [{
                        text: '确定',
                        onClick: () => {
                            history.back();
                        }
                    },
                    {
                        text: '取消'
                    }
                ]
            })
        })
        // 删除图片
        imgDom.on('click', '.J_img_del', (e) => {
            const target = $(e.currentTarget)
            let imgIndex = Math.abs(target.parents('.J_upload_img').index())
            this.orderInfo.madanUrls.splice(imgIndex, 1)
            target.parents('.J_upload_img').remove()
            addImgBtn.css('display', 'inline-block')
        })

        imgFile.unbind('change').on('change', function () {
            let $that = $(this)
            $.each(this.files, (i, files) => {
                lrz(files, {
                    width: 1280,
                    height: 1280,
                    quality: 10
                }).then((rst) => {
                    $.showPreloader();
                    // 处理成功会执行
                    rst.formData.append('field', 'imgUrl');
                    const option = {
                        url: '/redwood/sys/Common/uploadFile.do?type=5&time=' + that._time,
                        type: 'POST',
                        data: rst.formData,
                        processData: false, // 告诉jQuery不要去处理发送的数据
                        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
                        success: (data) => {
                            $.hidePreloader();
                            if (data.success == 1) {
                                if (data.imgUrl == '') {
                                    $.alert('上传失败');
                                    return false
                                }
                                const obj = {}
                                obj.link = data.imgUrl
                                obj.previewlink = rst.base64
                                nunjucks.render(imgTpl, obj).then((imgHtml) => {
                                    const hasUploadNum = $('.J_upload_img').length
                                    if (hasUploadNum >= 6) {
                                        $.toast('最多只能上传6张')
                                        return
                                    }
                                    that.orderInfo.madanUrls.push(data.imgUrl)
                                    if (that.orderInfo.madanUrls.length === 6) {
                                        addImgBtn.hide()
                                    }
                                    imgDom.prepend(imgHtml)
                                    that.canSubmit()
                                })
                            } else {
                                $.hidePreloader()
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
                }).catch((err) => {
                    $.alert(err)
                }).always(() => {});
            });
        })
        // 保存
        saveBtn.on('click', (e) => {
            if ($(e.currentTarget).hasClass('disabled')) return
            that.countTotalMoney()
            this.saveJBInfo()
        })
        // 更改成本单价
        followerPriceInput.on('keyup', (e) => {
            const target = $(e.currentTarget)
            let colorsIndex = target.parents('.J-input-color').index()
            let productIndex = target.parents('.J-input-product').index() - 1
            let targetVal = target.val()
            let valArr = targetVal.split('.')
            if (!(valArr.length < 3 && valArr[0] != '') || (valArr.length === 2 && valArr[1].length > 2)) {
                targetVal = parseFloat(valArr[0] + '.' + valArr[1]).toFixed(2)
                target.val(targetVal)
            }
            this.orderInfo.productNumbers[productIndex].colors[colorsIndex].cutterPriceMoney = parseFloat(targetVal)
            this.countTotalMoney()
            this.canSubmit()
        })
        // 更改采购数量
        followerQuantityInput.on('keyup', (e) => {
            const target = $(e.currentTarget);
            let colorsIndex = target.parents('.J-input-color').index();
            let productIndex = target.parents('.J-input-product').index() - 1;
            let targetVal = target.val()
            let valArr = targetVal.split('.')
            if (!(valArr.length < 3 && valArr[0] != '') || (valArr.length === 2 && valArr[1].length > 2)) {
                targetVal = parseFloat(valArr[0] + '.' + valArr[1]).toFixed(2)
                target.val(targetVal)
            }
            console.log(parseFloat(targetVal))
            this.orderInfo.productNumbers[productIndex].colors[colorsIndex].cutterQuantity = parseFloat(targetVal)
            this.countTotalMoney()
            this.canSubmit()
        })

        $('.J-toggle-show').on('click', (e) => {
            $(e.currentTarget).parents('.jb-order-info').toggleClass('hide')
        })

        $('.J_pb_img').on('click', (e) => {
            let targetElement = $(e.currentTarget)
            let targetIndex = $(e.currentTarget).index()
            let wrapElement = targetElement.parents('.J_pb_img_wrap');
            let imgArr = [];
            wrapElement.find('img').each((index, element) => {
                if (index === targetIndex) {
                    imgArr.unshift(element.src)
                } else {
                    imgArr.push(element.src)
                }
            })
            let myPhotoBrowserStandalone = $.photoBrowser({
                photos: imgArr,
                type: 'popup'
            })
            myPhotoBrowserStandalone.open()
        })

        $('.J-mandan-number').on('keyup', (e) => {
            this.orderInfo.madan = $(e.currentTarget).val()
             this.canSubmit()
        })

        if (changeUnit && changeUnit.length > 0) {
          changeUnit.on('change', (e) => {
              let self = $(e.currentTarget)
              let productIndex = self.parents('.J-input-product').index() - 1
              let unitSpan = self.parents('.J-input-product').find('.J-cutter-unit');
              let priceSpan = self.parents('.J-input-product').find('.J-cutter-price-unit');
              let currentUnit = self.val();
              if (currentUnit != unitSpan.html()) {
                let priceUnit = currentUnit.split('/')[1]
                unitSpan.html(currentUnit)
                priceSpan.html(priceUnit)
                this.orderInfo.productNumbers[productIndex].colors.forEach((color) => {
                  color.cutterPriceUnit = currentUnit
                  color.cutterQuantityUnit = priceUnit
                })
                // let colorIndex = unitSpan.index()
                // this.orderInfo.productNumbers[productIndex].colors[colorIndex].cutterPriceUnit = self.val()
                // this.orderInfo.productNumbers[productIndex].colors[colorIndex].cutterQuantityUnit = self.val().split('/')[1]
              }
              // console.log(this.orderInfo.productNumbers)
          })
          changeUnit.trigger('change')
        }

        if (inputUnit && inputUnit.length > 0) {
              inputUnit.on('keyup', (e) => {
                let self = $(e.currentTarget)
                let productIndex = self.parents('.J-input-product').index() - 1
                console.log(productIndex)
                let unitSpan = self.parents('.J-input-product').find('.J-cutter-unit');
                let priceSpan = self.parents('.J-input-product').find('.J-cutter-price-unit');
                let currentUnit = self.val();
                if (currentUnit != unitSpan.html()) {
                  let priceUnit = self.val().indexOf('/') > -1 ? self.val().split('/')[1] : self.val();
                  unitSpan.html(currentUnit)
                  priceSpan.html(priceUnit)
                  this.orderInfo.productNumbers[productIndex].colors.forEach((color) => {
                    color.cutterPriceUnit = currentUnit
                    color.cutterQuantityUnit = priceUnit
                  })
              }
          })
          inputUnit.trigger('keyup')
        }
    }

    formatTime(time) {
        if (isNaN(time)) {
            return time
        }
        const format = 'yyyy-MM-dd HH:mm:ss'
        const t = new Date(Number(time))
        const tf = (i) => (i < 10 ? '0' : '') + i
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (a) => {
            let val
            switch (a) {
                case 'yyyy':
                    val = tf(t.getFullYear())
                    break
                case 'MM':
                    val = tf(t.getMonth() + 1)
                    break
                case 'mm':
                    val = tf(t.getMinutes())
                    break
                case 'dd':
                    val = tf(t.getDate())
                    break
                case 'HH':
                    val = tf(t.getHours())
                    break
                case 'ss':
                    val = tf(t.getSeconds())
                    break
                default:
                    break
            }
            return val
        })
    }

    canSubmit() {
        let result = this.orderInfo.madanUrls.length > 0
        if (result) {
            result = this.orderInfo.productNumbers.every((product) => {
                return product.colors.every((color) => {
                    return Number(color.cutterQuantity) >= 0 && Number(color.cutterPriceMoney)
                })
            })
        }
        if (this.orderInfo.madan.length < 4) {
            result = false
        }
        if (result) {
            $('.J_save').removeClass('disabled')
        } else {
            $('.J_save').addClass('disabled')
        }
    }

}
export default new Page()
