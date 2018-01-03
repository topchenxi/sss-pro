/*
  author  yonghuang
 */
import '../../common/base.js'
import { getCache, setCache, imgPath, getParam, clearListCache, setLastPage, formatTimeString } from '../../common/utils'
import orderApi from '../../api/order'
import addrApi from '../../api/address'
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
        that.change = false
        // 是否是编辑页面
        that.type = getParam('type')
        that.source = decodeURI(getParam('source'))
        const tpl = 'zhaoBanPublish/index.html'
        let renderObj = {}
        // 采购商信息
        that.buyerInfo = getCache({
            key: 'buyerInfo',
            type: 'sessionStorage',
            dataType: 'json'
        })
        // 收件人的信息
        that.defaultAddr = getCache({
            key: 'defaultAddr',
            type: 'sessionStorage',
            dataType: 'json'
        })
        that.backUrl = that.source || '/'
        that.publishTemp = getCache({
            key: 'publishTemp',
            type: 'sessionStorage',
            dataType: 'json'
        })
        const choosedTags = getCache({
            type: 'sessionStorage',
            dataType: 'json',
            key: 'choosedTags'
        });
        let tagNames = '';
        let tagsId = ''
        if (choosedTags) { // 表示能拿到标签缓存
            for (let i = 0; i < choosedTags.length; i++) {
                tagsId = tagsId + choosedTags[i].id;
                // tagNames = tagNames + (choosedTags[i].parentName + choosedTags[i].name);
                tagNames = tagNames + choosedTags[i].name;
                if (i < choosedTags.length - 1) {
                    tagsId = tagsId + ',';
                    tagNames = tagNames + ',';
                }
            }
        }
        if (!that.type || that.type == 'add') {
            // 存在采购商 要去获取默认地址
            if (that.buyerInfo && !that.defaultAddr) {
                new Promise(function(resolve, reject) {
                    that.getDefaulAddr(that.buyerInfo.id, resolve, reject)
                }).then(function() {
                    render()
                })
            } else {
                render()
            }

            function render() {
                if (that.buyerInfo) {
                    // that.change = true
                }
                if (that.publishTemp) {
                    renderObj = $.extend({}, that.publishTemp)
                }
                that.renderData = {
                    imgUrls: renderObj.imgUrls && renderObj.imgUrls,
                    imagesPath: imgPath,
                    buyerInfo: that.buyerInfo,
                    productType: renderObj.productType,
                    productNumber: renderObj.productNumber,
                    haveRealVersion: renderObj.haveRealVersion,
                    findType: renderObj.findType && renderObj.findType.split(','),
                    title: tagsId,
                    tagNames: tagNames,
                    leaveMessage: renderObj.leaveMessage,
                    defaultAddr: that.defaultAddr,
                    worth: renderObj.worth,
                    quantityUnit: renderObj.quantityUnit,
                    color: renderObj.color,
                    quantity: renderObj.quantity,
                    expectedTime: formatTimeString(renderObj.expectedTime),
                    disabled: renderObj.disabled
                }
                that.expectedTime = renderObj.expectedTime
                that.renderData.findType && that.renderData.findType.map((item, index) => {
                    if (item == 1) {
                        that.renderData.findType1 = true
                    }
                    if (item == 2) {
                        that.renderData.findType2 = true
                    }
                    if (item == 4) {
                        that.renderData.findType3 = true
                    }
                })
                nunjucks.render(tpl, that.renderData).then((zhaoBanPublishHtml) => {
                    that.$contet = $('.J_content')
                    that.$contet.html(zhaoBanPublishHtml)
                    that.bindEvents()
                })
            }
        } else {
            // 从订单详情过来 编辑
            that.orderDetail = getCache({
                key: 'orderDetail',
                type: 'sessionStorage',
                dataType: 'json'
            })
            that.orderNumber = getParam('orderNumber')
            if (!that.orderDetail || that.orderDetail.obj.orderNumber != that.orderNumber) {
                // 需要获取详情
                // $.showPreloader()
                request({
                    url: orderApi.getDetail,
                    data: {
                        orderNumber: that.orderNumber,
                        _time: that._time
                    },
                    cache: false,
                    callback: (data) => {
                        if (data.success === '1') {
                            setTimeout(() => {
                                $.hidePreloader();
                                that.orderDetail = data
                                setCache({
                                    type: 'sessionStorage',
                                    dataType: 'json',
                                    key: 'orderDetail',
                                    value: data
                                })
                                setCache({
                                    type: 'sessionStorage',
                                    dataType: 'json',
                                    key: 'choosedTags',
                                    value: data.obj.tagArray
                                })
                                that.setTemTags(data.obj.wantProductList)
                                that.defaultAddr = null
                                renderDetail()
                            })
                        } else {
                            $.toast(data.msg)
                        }
                    }
                })
            } else {
                renderDetail()
            }

            function renderDetail() {
                const obj = that.orderDetail.obj
                that.expectedTime = obj.expectedTime
                if (!that.buyerInfo) {
                    that.buyerInfo = that.orderDetail.obj.buyer
                    setCache({
                        type: 'sessionStorage',
                        dataType: 'json',
                        key: 'buyerInfo',
                        value: that.buyerInfo
                    })
                }
                if (that.buyerInfo && !that.defaultAddr) {
                    new Promise(function(resolve, reject) {
                        that.getDefaulAddr(that.buyerInfo.id, resolve, reject)
                    }).then(function() {
                        renderWidthAddr()
                    })
                } else {
                    renderWidthAddr()
                }

                function renderWidthAddr() {
                    const renderObj2 = $.extend({}, that.publishTemp)
                    that.renderData = {
                        imgUrls: renderObj2.imgUrls || obj.imgUrls,
                        imagesPath: imgPath,
                        buyerInfo: that.buyerInfo,
                        productType: renderObj2.productType || obj.productType,
                        findType: renderObj2.findType || obj.findType,
                        productNumber: renderObj2.productNumber || obj.productNumber,
                        haveRealVersion: renderObj2.haveRealVersion || obj.haveRealVersion,
                        title: tagsId || obj.wantProductList[0].title,
                        tagNames: tagNames || obj.wantProductList[0].tagNames,
                        type: that.type,
                        defaultAddr: that.defaultAddr,
                        orderNumber: obj.orderNumber,
                        worth: renderObj2.worth || obj.wantProductList[0].worth,
                        quantityUnit: renderObj2.quantityUnit || obj.wantProductList[0].quantityUnit,
                        color: renderObj2.color || obj.wantProductList[0].color,
                        quantity: renderObj2.quantity || obj.wantProductList[0].quantity,
                        leaveMessage: renderObj2.leaveMessage || obj.leaveMessage,
                        // expectedTime: Number(renderObj2.expectedTime || obj.expectedTime),
                        disabled: true
                    }
                    that.expectedTime = renderObj2.expectedTime || obj.expectedTime
                    that.renderData.findType = (that.renderData.findType && that.renderData.findType.split(',')) || []
                    that.renderData.findType.map((item, index) => {
                        if (item == 1) {
                            that.renderData.findType1 = true
                        }
                        if (item == 2) {
                            that.renderData.findType2 = true
                        }
                        if (item == 4) {
                            that.renderData.findType3 = true
                        }
                    })
                    nunjucks.render(tpl, that.renderData).then((zhaoBanPublishHtml) => {
                        that.$contet = $('.J_content')
                        that.$contet.html(zhaoBanPublishHtml)
                        that.bindEvents()
                    })
                }
            }
        }
    }
    getDefaulAddr(buyerId, resolve, reject) {
        const that = this
        $.showPreloader()
        request({
            url: addrApi.AddressGetDefault,
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({
                userId: buyerId,
                _time: that._time
            }),
            cache: false,
            callback: (data) => {
                if (data.success === '1') {
                    setTimeout(() => {
                        $.hidePreloader();
                    })
                    that.defaultAddr = data.obj
                    setCache({
                        type: 'sessionStorage',
                        dataType: 'json',
                        key: 'defaultAddr',
                        value: that.defaultAddr
                    })
                    resolve(that.defaultAddr)
                } else {
                    $.toast(data.msg)
                    reject(data.msg)
                }
            }
        })
    }
    bindEvents() {
        const that = this
        const saveBtn = $('.J_save')
        const imgFile = $('#img-file')
        const imgDom = $('.J_has_upload')
        const backBtn = $('.J_back') // 返回键
        const selectBuyer = $('.J_select_buyer') // 选择采购商
        const addrEdit = $('.J_addr_edit') // 编辑供应商
        const chooseTags = $('.J_choosedTags') // 织法工艺选择
        const imgTpl = 'imgTpl.html'
        that.formDom = $('form')
        const $title = $('input[name="title"]') // 名称
        const $addrId = $('input[name="addrId"]') // 收货人
        const sendDay = $('.J_send_day') // 期望货期i
        const $findType = $('input[name="findType"]') // 寻样要求
        const $productType = $('input[name="productType"]') // 品类
        const $worth = $('input[name="worth"]') // 档次
        const $fuliaoUnit = $('.J_fuliao_unit') // 辅料单位输入宽
        const $mianliaoUnit = $('.J_mianliao_unit') // 面料单位下拉框
        const $haveRealVersion = $('input[name="haveRealVersion"]')
        const $leaveMessage = $('textarea[name="leaveMessage"]')
        const $quantity = $('input[name="quantity"]')
        const clearBtn = $('.J_clear')
        if (that.publishTemp) {
            that.doChecked($leaveMessage)
        }
        that.valid = false
        // 焦点以上校验
        $productType.change((e) => {
            // 修改需求量的单位
            const productType = $('input[name="productType"]:checked').val()
            if (productType == 1) {
                $('.J_mianliao_unit').removeClass('fn-hide')
                $('.J_fuliao_unit').addClass('fn-hide')
            } else if (productType == 2) {
                $('.J_mianliao_unit').addClass('fn-hide')
                $('.J_fuliao_unit').removeClass('fn-hide')
            }
            $fuliaoUnit.val('')
            $mianliaoUnit.val('')
            $('input[name="quantityUnit"]').val('')
            that.change = true
            that.hideTips($(e.currentTarget))
            that.doChecked(e)
        })
        $findType.change((e) => {
            that.change = true
            const findTypeInput = $('input[name="findType"]:checked')
            findTypeInput.length ? that.hideTips($(e.currentTarget)) : that.showTips($(e.currentTarget))
            that.doChecked(e)
        })
        // 修改档次
        $worth.change((e) => {
            that.doChecked(e)
            that.hideTips($(e.currentTarget))
            that.change = true
        })
        $title.on('input', (e) => {
            const val = $(e.currentTarget).val()
            if (!val) {
                that.showTips($(e.currentTarget))
            } else {
                that.hideTips($(e.currentTarget))
            }
            that.doChecked(e)
            that.change = true
        })
        $haveRealVersion.change((e) => {
            that.doChecked(e)
            that.hideTips($(e.currentTarget))
            that.change = true
        })
        $fuliaoUnit.on('input', (e) => {
            const val = $(e.currentTarget).val()
            $('input[name="quantityUnit"]').val(val)
            that.change = true
            that.doChecked($leaveMessage)
            that.hideTips($(e.currentTarget))
        })
        $mianliaoUnit.change((e) => {
            const val = $(e.currentTarget).val()
            $('input[name="quantityUnit"]').val(val)
            that.change = true
            that.doChecked($leaveMessage)
            that.hideTips($(e.currentTarget))
        })
        $leaveMessage.on('input', (e) => {
            that.change = true
            that.doChecked($leaveMessage)
        })
        $quantity.on('input', (e) => {
            that.change = true
            that.doChecked($haveRealVersion)
        })
        // 期望货期
        // sendDay.calendar({
        //   inputReadOnly: false,
        //   onClose: (cal) => {
        //     this.expectedTime = cal.input.val()
        //     const now = new Date().valueOf()
        //     const select = new Date(this.expectedTime).valueOf()
        //     if ((select + 24 * 3600 * 1000) < now) {
        //       $.alert('不能小于当前时间')
        //       $('.J_send_day').val('')
        //       return false
        //     }
        //     this.doChecked()
        //   }
        // })
        let dataArray = []
        const pickerOption = {
            // toolbarTemplate: `<header class="bar bar-nav"> <button class="button button-link pull-right close-picker">确定</button> <h1 class="title"></h1> </header>`,
            onClose: (p) => {
                const expectedTime = $('.J_send_day').val() ? new Date($('.J_send_day').val()).valueOf() : 0
                const now = new Date().valueOf()
                if ((expectedTime + 24 * 3600 * 1000) < now) {
                    $.alert('不能小于当前时间')
                    $('.J_send_day').val('')
                    return false
                }
                // $('input[name="expectedTime"]').val(expectedTime)
                this.doChecked($leaveMessage)
            }
        }
        // 日期初始化和选择
        if (that.expectedTime) {
            const newDate = formatTimeString(that.expectedTime)
            const year = newDate.split(' ')[0].split('-')[0]
            const month = newDate.split(' ')[0].split('-')[1]
            const day = newDate.split(' ')[0].split('-')[2]
            let hour = newDate.split(' ')[1].split(':')[0]
            const minute = newDate.split(' ')[1].split(':')[1]
            if (hour < 10) {
                hour = hour.substr(1)
            }
            dataArray = [year, month, day, hour, minute]
            pickerOption.value = dataArray
        }
        sendDay.datetimePicker(pickerOption);

        // $(document).on('click', '.picker-columns', () => {
        // })
        // 清除日期
        clearBtn.on('click', () => {
            // $('input[name="expectedTime"]').val('')
            sendDay.val('')
            this.doChecked($leaveMessage)
        })
        selectBuyer.on('click', () => {
            const formData = that.gatherFormData()
            if ($('.J_save').hasClass('disabled')) {
                formData.disabled = true
            } else {
                formData.disabled = false
            }
            setCache({
                type: 'sessionStorage',
                dataType: 'json',
                value: formData,
                key: 'publishTemp'
            })
            setLastPage(location.href);
            location.href = '/buyerList.html?source=zhaoBanPublish'
            return false
        })
        chooseTags.on('click', () => {
            const formData = that.gatherFormData()
            if ($('.J_save').hasClass('disabled')) {
                formData.disabled = true
            } else {
                formData.disabled = false
            }
            setCache({
                type: 'sessionStorage',
                dataType: 'json',
                value: formData,
                key: 'publishTemp'
            })
            location.href = '/addProperty.html'
            // setLastPage()
            return false
        })
        addrEdit.on('click', () => {
            if (!that.buyerInfo) {
                $.toast('请选择采购商')
                return
            }
            const formData = that.gatherFormData()
            if ($('.J_save').hasClass('disabled')) {
                formData.disabled = true
            } else {
                formData.disabled = false
            }
            setCache({
                type: 'sessionStorage',
                dataType: 'json',
                value: formData,
                key: 'publishTemp'
            })
            setCache({
                type: 'sessionStorage',
                dataType: 'json',
                key: 'sourcePage',
                value: location.href
            })
            console.log('defaultAddr', that.defaultAddr)
            if (that.defaultAddr) {
                location.href = `/addressList.html?source=zhaoBanPublish&id=${that.defaultAddr.id}`
            } else {
                location.href = `/addressList.html?source=zhaoBanPublish`
            }
            return false
        })
        backBtn.on('click', () => {
            if (that.publishTemp || that.change) {
                $.modal({
                    title: '尚未发布找版',
                    text: '继续返回，已填内容将不会被保留',
                    buttons: [{
                            text: '继续返回',
                            onClick: () => {
                                sessionStorage.removeItem('publishTemp')
                                sessionStorage.removeItem('buyerInfo')
                                sessionStorage.removeItem('defaultAddr')
                                sessionStorage.removeItem('orderDetail')
                                sessionStorage.removeItem('addressInfo')
                                sessionStorage.removeItem('sourcePage')
                                sessionStorage.removeItem('choosedTags')
                                location.href = that.backUrl
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
                location.href = that.backUrl
                return false
            }
        })
        imgDom.on('click', '.J_img_preview', () => {
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
        })
        // 删除图片
        imgDom.on('click', '.J_img_del', (e) => {
            const target = $(e.currentTarget)
            that.change = true
            target.parents('.J_upload_img').remove()
            that.doChecked($addrId)
        })
        imgFile.unbind('change').on('change', function() {
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
                            url: '/redwood/sys/Common/uploadFile.do?type=0&time=' + that._time,
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
                                        that.change = true
                                        that.doChecked($addrId)
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
        })
        // 保存
        saveBtn.on('click', (e) => {
            $.toast('该功能已下架!');
            return;
            if ($(e.currentTarget).hasClass('disabled')) return
            const formData = this.gatherFormData()
            formData.leaveMessage = String($('textarea[name="leaveMessage"]').val()).replace(/[\r\n]/g, '').replace(/\ +/g, '')
            formData.quantityUnit = String($('input[name="quantityUnit"]').val()).replace(/[\r\n]/g, '').replace(/\ +/g, '')
            if (formData.leaveMessage.length > 200) {
                $.toast('留言不能超过200个字')
                return false
            }
            if (!formData.quantity) {
                delete formData.quantityUnit
            }
            if (formData.expectedTime) {
                formData.expectedTime = new Date(formData.expectedTime.replace(/-/g, '/')).valueOf()
            } else {
                formData.expectedTime = ''
            }
            $.modal({
                title: '立即通知找版？',
                text: '',
                buttons: [{
                    text: '立刻通知',
                    onClick() {
                        that.comitZhaoBan(0, formData)
                    }
                }, {
                    text: '稍后通知',
                    onClick() {
                        that.comitZhaoBan(1, formData)
                    }
                }]
            })
        })
    }
    // 设置缓存给标签定位
    setTemTags(wantProductList) {
        if (wantProductList[0] && wantProductList[0].title) {
            let choosedTags = []
            const title = wantProductList[0].title.split(',')
            title.map((item) => {
                let obj = {}
                let arrItem = item.split('_')
                obj.id = item
                obj.name = arrItem[arrItem.length - 1]
                obj.parentName = arrItem[0]
                choosedTags.push(obj)
            })
            // console.log(choosedTags)
            setCache({
                key: 'choosedTags',
                value: choosedTags
            })
        }
    }
    gatherFormData() {
        const that = this
        const imgDoms = $('.J_has_upload').find('.J_upload_img')
        const formArray = this.formDom.serializeArray()
        const formData = {
            _time: this._time
        }
        formArray.map((key) => {
            formData[key.name] = key.value
        })
        // 图片单独获取
        formData.imgUrls = []
        imgDoms.each((key, dom) => {
            formData.imgUrls.push($(dom).find('a').attr('data-link'))
        })
        //寻样要求单独获取
        let findType = []
        const findTypeInput = $('input[name="findType"]:checked')
        findTypeInput.each((index, item) => {
            findType.push($(item).val())
        })
        that.findType = findType.join()
        formData.findType = findType.join(',')
        console.log(formData.findType)
        return formData
    }
    comitZhaoBan(type, formData) { // 发布找版
        const that = this
        $.showPreloader()
        formData.imgUrls = JSON.stringify(formData.imgUrls)
        request({
            url: that.type == 'edit' ? orderApi.updateZb : orderApi.commitZb,
            data: formData,
            cache: false,
            callback: (data) => {
                sessionStorage.removeItem('publishTemp')
                sessionStorage.removeItem('buyerInfo')
                sessionStorage.removeItem('defaultAddr')
                sessionStorage.removeItem('orderDetail')
                sessionStorage.removeItem('addressInfo')
                sessionStorage.removeItem('sourcePage')
                sessionStorage.removeItem('choosedTags')
                if (data.success === '1') {
                    clearListCache()
                    if (type) {
                        $.hidePreloader()
                        location.href = '/orderList.html?Tabkey=tzzb&category=zb-all'
                    } else {
                        that.notifyZhaoBan(that.type == 'edit' ? that.orderNumber : data.obj.orderNumber)
                    }
                } else {
                    $.hidePreloader();
                    $.alert(data.msg)
                }
            }
        })
    }
    notifyZhaoBan(orderNumber) { // 通知找版
        request({
            url: orderApi.notifyZb,
            data: {
                orderNumber
            },
            cache: false,
            callback: (data) => {
                if (data.success === '1') {
                    $.hidePreloader()
                    clearListCache()
                    location.href = `/orderDetail.html?orderNumber=${orderNumber}`
                    // location.href = '/orderList.html?TabKey=dfprw'
                } else {
                    $.hidePreloader()
                    $.alert(data.msg)
                }
            }
        })
    }
    doChecked(e) {
        let items = ''
        if (e[0] && e[0].name == 'leaveMessage') {
            items = $(e).parents('li')
        } else {
            items = e.currentTarget ? $(e.currentTarget).parents('.J_need_item') : $(e).parents('.J_need_item')
        }
        const that = this
        const validArr = []
        const hasUploadNum = $('.J_upload_img').length
        items.prevAll().each((i, item) => {
            const input = $(item).find('input')
            let val = ''
            if (input.attr('type') === 'radio' || input.attr('type') === 'checkbox') {
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
            if (input.attr('type') === 'radio' || input.attr('type') === 'checkbox') {
                const name = input.attr('name')
                val = $(`input[name='${name}']:checked`).val()
            } else {
                val = input.val()
            }
            if (val === '' || val === undefined) {
                validArr.push('false')
            }
        })
        if (!hasUploadNum) {
            validArr.push('false')
            that.showTips($('.J_has_upload'))
        } else {
            that.hideTips($('.J_has_upload'))
        }
        if ($(e.currentTarget ? e.currentTarget : e).val() === '' && (e[0] && e[0].name != 'leaveMessage')) {
            validArr.push('false')
            that.showTips($(e.currentTarget ? e.currentTarget : e))
        }
        if ($('input[name="quantity"]').val()) {
            if (!$('input[name="quantityUnit"]').val()) {
                validArr.push('false')
                that.showTips($('input[name="quantity"]'))
            }
        } else {
            that.hideTips($('input[name="quantity"]'))
        }
        if (!validArr.length) {
            $('.J_save').removeClass('disabled')
        } else {
            $('.J_save').addClass('disabled')
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