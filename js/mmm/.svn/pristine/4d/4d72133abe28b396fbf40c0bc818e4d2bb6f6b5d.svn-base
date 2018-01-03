import '../../common/base.js'
import OrderApi from '../../api/order'
import {
    imgPath,
    getParam,
    getCache,
    setCache,
    clearListCache
} from '../../common/utils.js'
import lrz from '../../vendor/lrz'
class Page {
    constructor() {
        this._time2 = new Date().getTime()
        this.$page = $('#seCardList')
        this.orderNumber = getParam('orderNumber')
        this.render()
    }
    render() {
        let that = this
        let getCardListInfo = getCache({
            type: 'sessionStorage',
            key: 'listCardInfo'
        })
        if (getCardListInfo) {
            this.renderTpl(getCardListInfo)
        } else {
            $.showPreloader();
            request({
                url: OrderApi.listSk,
                data: {
                    orderNumber: this.orderNumber
                },
                callback(data) {
                    console.log('ddd')
                    $.hidePreloader();
                    if (data.success == 1) {
                        let datas = {
                            result: data.result,
                            orderNumber: that.orderNumber
                        }
                        setCache({
                            type: 'sessionStorage',
                            key: 'listCardInfo',
                            value: datas
                        });
                        that.renderTpl(datas)
                    } else {
                        $.alert(data.msg)
                    }
                }
            })
        }
    }
    renderTpl(data) {
        const tpl = 'seCardList/item.html'
        let datas = data;
        console.log(datas);
        datas.result = datas.result.map((item) => {
            item.itemInfo = JSON.stringify(item)
            return item
        })
        if (datas.result.length == 0) {
            $('.J_saveCardList').hide()
        } else {
            $('.J_saveCardList').show()
        }
        nunjucks.render(tpl, datas).then((tplHtml) => {
            $('.J_seCardList', this.$page).html(tplHtml)
            this.bindEvent()
        })
    }
    bindEvent() {
        this.addCardInfo()
        this.goBack()
        this.deleteItem()
        this.editCardInfo()
        this.saveCardList()
        this.storeGoBackLink()
    }
    addCardInfo() {
        $('.J_add_seCard', this.$page).on('click', (e) => {
            this.storeGoBackLink()
            location.href = `/seCardInfo.html?orderNumber=${this.orderNumber}&edit=0`
        })
    }
    goBack() {
        let that = this
        $('.J_goBack', this.$page).unbind('click').on('click', () => {
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
                            sessionStorage.removeItem('listCardInfo')
                            that.goBackLink()
                        }
                    }
                ]
            })
        })
    }
    deleteItem() {
        let that = this
        $('.J_deleteItem', this.$page).unbind('click').on('click', function() {
            let index = $(this).attr('data-index');
            let reply = $(this).data('reply');
            let buyProductId = $(this).data('id');
            $.modal({
                text: '确定删除色卡?',
                buttons: [{
                        text: '取消',
                        onClick() {}
                    },
                    {
                        text: '确定',
                        bold: true,
                        onClick: function() {
                            that.updateData(index)

                            if (reply == 1) {
                                request({
                                    url: 'redwood/colorCard/deleteReply',
                                    contentType: 'application/json',
                                    method: 'post',
                                    data: JSON.stringify({
                                        id: buyProductId
                                    }),
                                    callback(data) {
                                        if (data.success == 1) {
                                            $.alert('删除成功', function() {
                                                window.location.reload();
                                            });
                                        } else {
                                            $.alert(data.msg);
                                        }
                                    },
                                    error() {}
                                })
                            }
                        }
                    }
                ]
            })
        })
    }
    updateData(index) {
        let getCardListInfo = getCache({
            type: 'sessionStorage',
            key: 'listCardInfo'
        })
        getCardListInfo.result.splice(index, 1)
        setCache({
            type: 'sessionStorage',
            key: 'listCardInfo',
            value: getCardListInfo
        });
        this.renderTpl(getCardListInfo)
    }
    editCardInfo() {
        let that = this
        $('.J_edit_cardInfo', this.$page).on('click', function() {
            let reply = $(this).data('reply');
            if (reply == 1) return;
            that.storeGoBackLink()
            let itemInfo = JSON.parse($(this).attr('itemInfo'))
            let index = $(this).attr('edit-index')
            itemInfo['index'] = index
            setCache({
                type: 'sessionStorage',
                key: 'tempSeCardInfo',
                value: itemInfo
            });
            location.href = `/seCardInfo.html?edit=1&orderNumber=${that.orderNumber}`
        })
    }
    saveCardList() {
        $('.J_saveCardList', this.$page).unbind('click').on('click', (e) => {
            this.postData()
        })
    }
    postData() {
        let that = this
        let getCardListInfo = getCache({
            key: 'listCardInfo'
        })
        if (getCardListInfo.result.length == 0) {
            $.alert('请新增录入色卡')
            return false
        }
        getCardListInfo.result.map((item) => {
            delete item.sellerCompany
            delete item.tagNames
            delete item.tagArray
        })
        let reqData = {
            orderNumber: getCardListInfo.orderNumber,
            _time: this._time2,
            productList: JSON.stringify(getCardListInfo.result)
        }
        console.log('reqData', reqData)
        $.showPreloader()
        request({
            url: OrderApi.inputSk,
            data: reqData,
            callback(data) {
                $.hidePreloader()
                if (data.success == 1) {
                    sessionStorage.removeItem('listCardInfo')
                    clearListCache()
                    $.alert(data.msg, () => {
                        that.goBackLink()
                    })
                } else {
                    $.alert(data.msg)
                }
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
}
export default new Page()