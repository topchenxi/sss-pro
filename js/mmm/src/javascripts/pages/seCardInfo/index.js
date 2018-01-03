import '../../common/base.js'
// import OrderApi from '../../api/order'
import {
    imgPath,
    getParam,
    getCache,
    setCache,
    lrzConfig,
    setLastPage,
    formatTimeString,
    // unique
} from '../../common/utils.js'
import lrz from '../../vendor/lrz'
class Page {
    constructor() {
        this._time = new Date().getTime()
        this.$page = $('#seCardInfo')
        this.render()
    }
    render() {
        this.edit = getParam('edit')
        this.orderNumber = getParam('orderNumber')
        let headTitle = $('.J_seCardInfo_title', this.$page)

        let backTemData = getCache({
            key: 'backTemData'
        })
        if (this.edit == 1) {
            headTitle.text('编辑色卡信息')
            // 编辑请求数据
            let info = getCache({
                key: 'tempSeCardInfo'
            })
            info.edit = this.edit
            info.imgPath = imgPath
            if (backTemData) {
                info = $.extend({}, info, backTemData)
            }

            this.renderTpl(info)
        } else {
            // 新增数据
            let newInfo = {}
            newInfo.imgPath = imgPath
            newInfo = $.extend({}, newInfo, backTemData)
            this.renderTpl(newInfo)
        }
    }
    renderTpl(data) {
        const tpl = 'seCardInfo/cardInfo.html'
        let datas = data || {}
        datas = $.extend({}, datas, this.getSellerInfo(), this.tags(datas))
        if (datas.expectedArrivalDate) {
            datas.expectedArrivalDate = formatTimeString(datas.expectedArrivalDate, 'yyyy-MM-dd')
        }
        nunjucks.render(tpl, datas).then((tplHtml) => {
            $('.J_seCardInfo', this.$page).html(tplHtml)
            this.bindEvent()
        })
    }
    // 供应商信息sellerInfo
    getSellerInfo() {
        let sellerInfo = getCache({
            key: 'sellerInfo'
        })
        if (sellerInfo) {
            sellerInfo.shopId = sellerInfo.id
            return sellerInfo
        } else {
            return {}
        }
    }
    // 单独处理标签
    tags(datas) {
        console.log(datas)
        let title = []
        let tagNames = []
        let choosedTags = getCache({
            key: 'choosedTags'
        })
        if (choosedTags) {
            choosedTags.map((item) => {
                tagNames.push(item.name)
                title.push(item.id)
            })
        } else {
            if (datas.tagNames) {
                datas.tagNames.split(',').map((item) => {
                    tagNames.push(item)
                })
                datas.title.split(',').map((val) => {
                    title.push(val)
                })
            }
        }
        return {
            title: title.join(','),
            tagNames: tagNames.join(',')
        }
    }
    // 设置缓存给标签定位
    setTemTags() {
        let title = $('.J_title', this.$page).val()
        if (title) {
            let arrTags = title.split(',')
            let choosedTags = []
            arrTags.map((item) => {
                let obj = {}
                let arrItem = item.split('_')
                obj.id = item
                obj.name = arrItem[arrItem.length - 1]
                obj.parentName = arrItem[0]
                choosedTags.push(obj)
            })
            console.log('choosedTags', choosedTags)
            setCache({
                key: 'choosedTags',
                value: choosedTags
            })
        }
    }
    bindEvent() {
        let that = this
        this.uploadImage()
        this.changeType()
        this.listenInfo()
        this.deleteCert()
        this.saveInfo()
        this.elementInput()
        this.goBack()
        this.zoomImages()
        this.goAnotherPage()
        $('[name="expectedArrivalDate"]').calendar({
            onClose: function(p) {
                that.listenInfo()
            }
        })
        // 单独写一个处理
        this.uncheckData()
        this.limitLeaveMessage()
        this.connectPrice()
    }
    limitLeaveMessage() {
        $('textarea[name="leaveMessage"]').on('keyup', function() {
            let leaveMessage = String($('textarea[name="leaveMessage"]').val()).replace(/[\r\n]/g, '').replace(/\ +/g, '')
            if (leaveMessage.length > 50) {
                $(this).val(leaveMessage.substring(0, 50))
            }
        })
    }
    // 价格联动
    connectPrice() {
        let miniQuantityUnit = $('.J_miniQuantityUnit', this.$page)
        let miniPriceUnit = $('.J_miniPriceUnit', this.$page)
        miniQuantityUnit.on('change', function() {
            let unit = $(this).val()
            miniPriceUnit.val('元/' + unit)
        })
        miniPriceUnit.on('change', function() {
            let unit = $(this).val().split('/')[1]
            miniQuantityUnit.val(unit)
        })
    }
    // 去其他页面
    goAnotherPage() {
        $('.J_shopName', this.$page).on('click', (e) => {
            this.setTemData()
            setLastPage()
            location.href = `/sellerList.html`
        })
        // $('.J_addProperty', this.$page).on('click', (e) => {
        //   this.setTemData()
        //   this.setTemTags()
        //   location.href = '/addProperty.html?ids=123123'
        // })
    }
    // 设置暂时缓存
    setTemData() {
        let value = this.validate(false, true)
        if (value && value.expectedArrivalDate) {
            value.expectedArrivalDate = new Date(value.expectedArrivalDate).valueOf()
        }
        value.expectedArrivalDate
        setCache({
            key: 'backTemData',
            value: value
        })
    }
    // 清除暂时缓存
    clearTemData() {
        sessionStorage.removeItem('backTemData')
        sessionStorage.removeItem('choosedTags')
        sessionStorage.removeItem('sellerInfo')
    }
    elementInput() {
        $('.J_input', this.$page).on('keyup', (e) => {
            this.listenInfo()
        })
    }
    saveInfo() {
        $('.J_save', this.$page).on('click', (e) => {
            // let info = this.validate(false, true)
            if ($(e.target).hasClass('disabled')) {
                return false
            } else {
                if (this.edit == 1) {
                    this.updateData(true, false)
                } else {
                    this.updateData(false, true)
                }
            }
        })
    }
    changeType() {
        let width = $('.J_width', this.$page)
        let categoryName = $('.J_categoryName', this.$page)
        let bookBlock = $('.J_bookBlock', this.$page)
        let price = $('.J_price', this.$page)
        $('.J_radio', this.$page).on('change', (e) => {
            let index = $(e.target).val()
            if (index == 1) {
                width.show()
                categoryName.hide()
                this.changeLabel('货号');
            } else {
                width.hide()
                categoryName.show()
                this.changeLabel('品名');
            }
            this.listenInfo()
        })

        $('.J_productSource', this.$page).on('change', (e) => {
            let index = $(e.target).val()
            if (index == 0) { // 现货
                bookBlock.hide()
                price.show()
            } else { // 1 订货
                bookBlock.show()
                price.hide()
            }
            this.listenInfo()
        })
    }
    validate(check, collect) {
        let forms = $('.J_seCardInfo', this.$page).serializeArray()
        let imgUrls = []
        $('.J_upimgWrap', this.$page).each(function() {
            imgUrls.push($(this).find('.J_zoom').attr('data-src'))
        })
        let obj = {}
        obj.imgUrls = imgUrls
        forms.map((item) => {
            obj[item.name] = item.value
        })
        obj.tagNames = obj.title

        let validateResult = false
        // 公共筛选
        function commonChoose() {
            if (obj.productType == 2) {
                delete obj.replyWeigth
                delete obj.kongCha
                // delete obj.productNumber
            }
            // 现货时将预计到货时间,起订量, 定做价格
            if (obj.productSource == 0) {
                delete obj.expectedArrivalDate
                delete obj.miniQuantity
                delete obj.miniQuantityUnit
                delete obj.miniPrice
                delete obj.miniPriceUnit
            }
            if (obj.productSource == 1) {
                delete obj.price
                delete obj.priceUnit
            }
        }

        if (check) {
            for (let k in obj) {
                if (k != 'leaveMessage' && k != 'replyWidth' && k != 'replyWeigth' && k != 'miniPrice' && k != 'title' && k != 'tagNames' && k != 'title') {
                    if (k == 'imgUrls' && obj.imgUrls.length == 0) {
                        validateResult = true
                        break
                    }
                    commonChoose()
                    if (obj[k] == '') {
                        validateResult = true
                        break
                    }
                }
            }
            console.log('验证', obj)
            console.log('validateResult', validateResult)
            return validateResult
        }

        if (collect) {
            commonChoose()
            return obj
        }
    }
    changeLabel(label) {
        $('.J_product_label').text(label);
    }
    listenInfo() {
        let openOrNot = this.validate(true, false)
        let saveBtn = $('.J_save', this.$page)
        if (openOrNot) {
            saveBtn.addClass('disabled ')
        } else {
            saveBtn.removeClass('disabled ')
        }
    }
    goBack() {
        let that = this
        $('.J_goBack', this.$page).on('click', () => {
            $.modal({
                text: '你填写的信息没有保存,返回后信息将丢失?',
                buttons: [{
                        text: '取消',
                        onClick() {}
                    },
                    {
                        text: '确定',
                        bold: true,
                        onClick: function() {
                            that.clearTemData()
                            location.href = `/seCardList.html?orderNumber=${that.orderNumber}`
                        }
                    }
                ]
            })
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
                rst.formData.append('field', 'imgUrl')
                imagAjax(index)

                function imagAjax(index) {
                    that.uploadTimes[index]++;
                    $.ajax({
                        url: '/redwood/sys/Common/uploadFile.do?type=6',
                        type: "POST",
                        data: rst.formData,
                        // timeout: 100,
                        processData: false, // 告诉jQuery不要去处理发送的数据
                        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
                        success: function(data) {
                            $.hidePreloader();
                            if (data.success == 1) {
                                // $('#single' + randomNumber).attr('data-src', data.imgUrl)
                                let randomNumber = parseInt(Math.random() * 700 + 800)
                                const imgTpl = `<div class="up-img J_upimgWrap"><img class="J_zoom" id="single${randomNumber}" show-src="${rst.base64}" data-src="${data.imgUrl}" src="${rst.base64}" style="width: 4rem; height: 3.5rem;">` +
                                    `<span class="close J_close">x</span></div>`
                                $('.J_images', that.$page).before(imgTpl)
                                // that.zoomImages()
                                $that.val(null)
                                that.listenInfo()
                                $.hidePreloader()
                                // that.listenUpload++
                            } else {
                                $.toast(data.msg)
                            }
                            $that.val(null)
                        },
                        error: function(error) {
                            $.hidePreloader();
                            $.alert('上传失败,请重新上传!')
                            that.listenInfo()
                            $that.val(null)
                            // if (that.uploadTimes[index] < 2) {
                            //     imagAjax(index)
                            // } else {
                            //     that.listenUpload++
                            // }
                        }
                    });
                }
            })
    }
    // 查看大图
    zoomImages() {
        // const that = this
        $(document).on('click', '.J_zoom', function() {
            const photos = [];
            $(this).closest('.J_has_upload').find('.J_zoom').each(function() {
                photos.push($(this).attr('show-src'))
            })
            const myPhotoBrowserPopup = $.photoBrowser({
                photos,
                type: 'popup',
            });
            myPhotoBrowserPopup.open();
        });
    }
    // 删除图片
    deleteCert() {
        this.$page.on('click', '.J_close', (e) => {
            $(e.target).closest('.J_upimgWrap').remove();
            this.listenInfo()
        })
    }
    updateData(edit, add) {
        let getCardListInfo = getCache({
            type: 'sessionStorage',
            key: 'listCardInfo'
        })
        let currentFormData = this.validate(false, true)
        if (currentFormData.expectedArrivalDate) {
            currentFormData.expectedArrivalDate = (new Date(currentFormData.expectedArrivalDate)).valueOf()
        }
        if (edit) {
            let singleTem = getCache({
                type: 'sessionStorage',
                key: 'tempSeCardInfo'
            })
            let editIndex = singleTem.index
            let buyProductId = singleTem.buyProductId
            let temResult = getCardListInfo.result
            currentFormData.buyProductId = buyProductId
            temResult.splice(editIndex, 1, currentFormData)
            getCardListInfo.result = temResult
            setCache({
                type: 'sessionStorage',
                key: 'tempSeCardInfo',
                value: currentFormData
            })
        }
        if (add) {
            getCardListInfo.result.push(currentFormData)
        }
        console.log('currentFormData', currentFormData)
        setCache({
            type: 'sessionStorage',
            key: 'listCardInfo',
            value: getCardListInfo
        });
        this.clearTemData()
        location.href = `/seCardList.html?orderNumber=${this.orderNumber}`
    }
    uncheckData() {
        $('input[type=number]').on('keyup', (e) => {
            let maxLength = 0
            switch (e.currentTarget.name) {
                case 'replyWeigth':
                    maxLength = 10
                    break;
                default:
                    maxLength = 8
                    break;
            }
            if (maxLength > 0) {
                if (parseFloat(e.currentTarget.value) > Math.pow(10, maxLength)) {
                    e.currentTarget.value = e.currentTarget.value.substring(0, maxLength)
                }
                let split = e.currentTarget.value.split('.')
                if (split.length > 1 && split[1].length > 2) {
                    e.currentTarget.value = Number(e.currentTarget.value).toFixed(2)
                }
            }
        })
    }
}
export default new Page()