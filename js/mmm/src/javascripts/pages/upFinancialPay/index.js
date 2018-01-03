import '../../common/base.js'
import { getParam, getCache, setCache, lrzConfig, clearListCache } from '../../common/utils.js'
import OrderApi from '../../api/order'
import AccountApi from '../../api/account'
import lrz from '../../vendor/lrz'

// 此页面需要传值 upFinacialPay.html?orderNumber=10224241&payWay=0--1  0 是垫付 1是实付
class Page {
    constructor() {
        this._time = new Date().getTime()
        this.render()
    }
    render() {
        let that = this
        let orderDetail = getCache({
            type: 'sessionStorage',
            key: 'orderDetail'
        })
        this.orderNumber = getParam('orderNumber')
        this.source = decodeURI(getParam('source'))
        if (orderDetail && (orderDetail.obj.orderNumber == this.orderNumber)) {
            this.reqMoneyList(orderDetail)
        } else {
            request({
                url: OrderApi.getDetail,
                data: {
                    orderNumber: this.orderNumber,
                    _time: this._time
                },
                callback(data) {
                    if (data.success == 1) {
                        setCache({
                            type: 'sessionStorage',
                            key: 'orderDetail',
                            value: data
                        })
                        that.reqMoneyList(data)
                    } else {
                        $.alert(data.msg)
                    }
                }
            })
        }
    }
    reqMoneyList(orderDetail) {
        let that = this
        request({
            url: OrderApi.getMoneyDetail,
            data: {
                orderNumber: orderDetail.obj.orderNumber,
                _time: this._time
            },
            callback(data) {
                if (data.success == 1) {
                    orderDetail.obj.moneyDetailList = data.obj
                    that.handleFirst(orderDetail.obj)
                } else {
                    $.alert(data.msg)
                }
            }
        })
    }
    handleFirst(orderDetail) {
            this.payWay = getParam('payWay')
            let payWay = this.payWay
            let title = (payWay == 0) ? '确认垫付' : '实付'
            let resData = {
                redwoodDescr: orderDetail.redwoodDescr, // 红杉描述
                handler: orderDetail.handler, // 任务处理人姓名
                handlerTel: orderDetail.handlerTel, // 任务处理人电话
                follower: orderDetail.follower, // 跟单员姓名
                followerTel: orderDetail.followerTel, // 跟单员电话
                status: orderDetail.status,
                orderNumber: orderDetail.orderNumber,
                serviceNumber: orderDetail.serviceNumber,
                productNumber: orderDetail.productNumber, // 货号
                company: orderDetail.buyer.company, // 采购商所在公司
                sellerCompany: orderDetail.sellerCompany, // 供货商档口名
                earnestMoney: orderDetail.earnestMoney, // 订金
                serviceMoney: orderDetail.serviceMoney, // 服务费
                finalMoney: orderDetail.finalMoney, // 尾款
                fullMoney: orderDetail.fullMoney, //  货款
                payWay: payWay, //  垫付0与实付1
            }
            this.$page = $('#upFinancialPay')
                // head
            const headTpl = 'upFinancialPay/head.html'
            nunjucks.render(headTpl, { title }).then((headHtml) => {
                    this.$page.find('.J_head').html(headHtml)
                    this.goBack(resData);
                })
                // main body
            const billTextTpl = 'upFinancialPay/billText.html'
            nunjucks.render(billTextTpl, resData).then((billTextHtml) => {
                this.$page.find('.J_bill_text').html(billTextHtml)
                let word
                if (payWay == 0) {
                    word = '上传搜芽付款凭据'
                } else {
                    word = '上传搜芽付款凭据'
                }
                $('.J_upload_word').text(word)
                this.uploadImage(resData);
                this.deleteCert();
                this.saveInfo(resData);
                this.goStatusList()
                this.goMoneyList()
                this.renderTemData()
                this.remarkFill()
                this.goTel()
                this.storeGoBackLink()
            })
        }
        // 电话调用
    goTel() {
            $('.J_tel').on('click', function() {
                if ($(this).hasClass('disabled')) {
                    return false
                }
            })
        }
        // 备注限定
    remarkFill() {
            $('#upFinancialPay').on('input', '.J_remark', function() {
                console.log('111')
                let val = $(this).val()
                if (!/^[^"&]{0,50}$/gi.test(val)) {
                    $(this).val(val.substring(0, 50))
                }
            })
        }
        // 临时跳转回来的数据渲染
    renderTemData() {
        let that = this
        let payTemData = getCache({
            type: 'sessionStorage',
            key: 'payTemData'
        })
        if (payTemData) {
            $('.J_confirmMoney').val(payTemData.realAmount)
            let certificate = payTemData.certificate
            if (certificate.length > 0) {
                const temBillInfo = 'upFinancialPay/temBillInfo.html'
                certificate.map((item) => {
                    let obj = {}
                    obj.imgUrl = item.imgUrl;
                    obj.base64 = item.base64
                    obj.remark = item.remark
                    nunjucks.render(temBillInfo, obj).then((temBillInfoHtml) => {
                        that.$page.find('.J_bill_block').append(temBillInfoHtml)
                        that.zoomImages()
                    })
                    console.log('obj', obj)
                })
            }
        }
    }
    goStatusList() {
        let that = this
        $(document).on('click', '.J_goStatusList', (e) => {
            if (!$(e.target).is('a')) {
                function go() {
                    that.setStoreData()
                    if (that.listenUpload == that.allLength) {
                        clearInterval(timer)
                        $.hidePreloader()
                        location.href = `/statusList.html?source=upFinancialPay&orderNumber=${that.orderNumber}&payWay=${that.payWay}`
                    } else {
                        $.showPreloader()
                    }
                }
                let timer = setInterval(() => {
                    go()
                }, 100)
            }
        })
    }
     goBackLink() {
        let url = getCache({
          type: 'sessionStorage',
          key: 'temSourceUrl'
        })
        sessionStorage.removeItem('temSourceUrl')
        location.href = url
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
    uploadImage(resData) {
        let that = this;
        $('#img-file').unbind('change').on('change', function() {
            let $that = $(this)
            that.uploadTimes = []
            that.listenUpload = 0
            that.allLength = this.files.length
            $.each(this.files, function(i, files) {
                $('.J_tel').addClass('disabled')
                that.uploadTimes[i] = 0
                that.uploadComponent(files, $that, i)
            });
        })
    }
    uploadComponent(files, $that, index) {
            let that = this
            const billInfoTpl = 'upFinancialPay/billInfo.html'
            lrz(files, lrzConfig)
                .then(function(rst) {
                    // 处理成功会执行
                    rst.formData.append('field', 'imgUrl');
                    $.showPreloader();
                    let obj = {}
                    let randomNumber = parseInt(Math.random() * 700 + 800)
                    obj['base64'] = rst.base64
                    obj['randomNumber'] = randomNumber
                    nunjucks.render(billInfoTpl, obj).then((billInfoHtml) => {
                        $('.J_bill_block').append(billInfoHtml)
                        that.zoomImages();
                        $that.val(null)
                    })
                    $.hidePreloader();

                    function imagAjax(index) {
                        that.uploadTimes[index]++;
                        $.ajax({
                            url: '/redwood/sys/Common/uploadFile.do?type=1',
                            type: "POST",
                            data: rst.formData,
                            // timeout: 100,
                            processData: false, // 告诉jQuery不要去处理发送的数据
                            contentType: false, // 告诉jQuery不要去设置Content-Type请求头
                            success: function(data) {
                                $.hidePreloader();
                                if (data.success == 1) {
                                    $('.J_tel').removeClass('disabled')
                                    $('#single' + randomNumber).val(data.imgUrl)
                                    that.listenUpload++
                                } else {
                                    $.toast(data.msg)
                                }
                                $that.val(null)
                            },
                            error: function(error) {
                                $('.J_tel').removeClass('disabled')
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
                $(e.target).closest('.J_form').remove()
                this.setStoreData()
            })
        }
        // 返回按扭提交
    goBack(orderDetail) {
        let that = this
        $('.J_goBack', this.$page).on('click', () => {
            $.modal({
                title: '是否保存并提交修改',
                text: '一旦提交,将不可修改，任务将被传递',
                buttons: [{
                    text: '继续返回',
                    onClick() {
                        that.deleteTemData()
                        // location.href = `orderDetail.html?orderNumber=${that.orderNumber}`
                        // location.href = that.source
                        that.goBackLink()
                    }
                }, {
                    text: '保存确认',
                    bold: true,
                    onClick: function() {
                        that.collectData(orderDetail)
                    }
                }]
            })
        })
    }
        // 真正图片地址检测
    realImages() {
            let on = false
            $('.J_images').each(function() {
                if (!$(this).val()) {
                    on = true
                    $(this).closest('.J_bill_section').addClass('warning')
                } else {
                    $(this).closest('.J_bill_section').removeClass('warning')
                }
            })
            return on
        }
        // 保存
    saveInfo(orderDetail) {
            let that = this
            $('.J_save_btn', this.$page).unbind('click').on("click", () => {
                function go() {
                    if (that.listenUpload == that.allLength) {
                        $.hidePreloader()
                        clearInterval(timer)
                        $.modal({
                            title: '一旦提交,将不可修改，任务将被传递',
                            buttons: [{
                                text: '放弃提交'
                            }, {
                                text: '确认提交',
                                bold: true,
                                onClick: function() {
                                    that.collectData(orderDetail)
                                }
                            }]
                        })
                    } else {
                        $.showPreloader()
                    }
                }
                let timer = setInterval(() => {
                    go()
                }, 100)
            })
        }
        // 点击查看费用时设置缓存
    goMoneyList() {
            let that = this
            $('.J_link', this.$page).on('click', function() {
                let link = $(this).attr('href')

                function go() {
                    that.setStoreData()
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
        // 删除临时数据
    deleteTemData() {
            sessionStorage.removeItem('payTemData')
        }
        // 设置暂时数据
    setStoreData() {
            let payTemData = this.singleData()
            setCache({
                type: 'sessionStorage',
                key: 'payTemData',
                value: payTemData
            })
        }
        // 单独收集数据
    singleData() {
            let realAmount = $('.J_confirmMoney').val()
            let listForm = $('.J_form', this.$page)
            let certificate = []
            listForm.each(function() {
                let formData = $(this).serializeArray()
                let obj = {}
                formData.map((item) => {
                    obj[item.name] = item.value
                })
                certificate.push(obj)
            })
            return {
                realAmount,
                certificate
            }
        }
        // 收集参数传值
    collectData(orderDetail) {
        let that = this
        let billBlock = $('.J_bill_block', this.$page)
        let len = billBlock.find('.J_bill_section').length
        let fundType = $('.J_confirmMoney').attr('fundType')
        let singleData = this.singleData()
        let realAmount = singleData.realAmount
        if (realAmount <= 0) {
            $.toast($.trim($('.J_name').text()) + '填写必须大于0')
            $('.J_confirmMoney').focus()
            return
        }
        if (len == 0) {
            $.toast('必须上传凭证')
            return
        }

        // 此处判断是否有图片在上传过程中
        let timer = setInterval(() => {
            $.showPreloader()
            if (that.listenUpload == that.allLength) {
                console.log('inini')
                $.hidePreloader()
                clearInterval(timer);
                let realImages = that.realImages()
                if (realImages) {
                    $.alert('红框标记的,请删除重新上传!!')
                } else {
                    askInterface()
                }
            }
        }, 100)

        function askInterface() {
            let certificate = that.singleData().certificate
            certificate.map((item) => {
                delete item.base64
            })
            let reqOption = {
                realAmount,
                fundType,
                certificate: JSON.stringify(certificate),
                orderNumber: orderDetail.orderNumber,
                _time: that._time
            }
            console.log('req', reqOption)
                // return false
            $.showPreloader()
            request({
                url: AccountApi.confirmPayAndInputCertificate,
                data: reqOption,
                callback(data) {
                    $.hidePreloader()
                    if (data.success == 1) {
                        that.deleteTemData()
                        $.alert(data.msg, () => {
                            clearListCache()
                            // location.href = `/orderDetail.html?orderNumber=${that.orderNumber}`
                            that.goBackLink()
                        })
                    } else {
                        $.toast(data.msg)
                    }
                }
            })
        }
    }

}
export default new Page()
