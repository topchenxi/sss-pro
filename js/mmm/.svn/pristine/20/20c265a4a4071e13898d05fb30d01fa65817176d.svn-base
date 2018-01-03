import '../../common/base.js'
import {
    scrollGetData,
    getParam,
    getCache,
    setCache,
    imgPath,
    checkLogin,
    setLastPage
} from '../../common/utils'
import Footer from '../orderDetail/footer'
import OrderApi from '../../api/order'
class Page extends Footer {
    constructor() {
        super()
        let orderStatus = getParam('status')
        let chargeOffStatus = '';
        if(orderStatus == 'toReimburse') {
            chargeOffStatus = 0;
            orderStatus = '';
        }
        if(orderStatus == 'reimbursed') {
            chargeOffStatus = 1;
            orderStatus = '';
        }
        let key = getQueryString('key');
        this.requestParam = {
            "pageSize": 20,
            "pageNumber": 1,
            "statuses": orderStatus,
            "chargeOffStatus": chargeOffStatus,
            key
        }
        this.doms = {
            container: $('#orderList'),
            searchValue: $('#search')
        }
        if (key.length > 0) {
            $('#search').val(key)
            $('.J_search_btn').removeClass('disabled')
        }
        checkLogin({
            lastPage: location.href
        }, (res) => {
            if (res.success === '1') {
                this.pageinit();
                this.renderOrderList();
            }
        })

        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(decodeURI(r[2]));
            return '';
        }
    }

    pageinit() {
        const headTpl = 'orderList/head.html'
        let pageTitle = '订单列表'
        let orderStatus = getParam('status')
        switch (orderStatus) {
            case '200,201,502':
                pageTitle = '待剪版'
                break
            case 'toReimburse':
                pageTitle = '待报销'
                break
            case 'reimbursed':
                pageTitle = '已报销'
                break
        }
        nunjucks.render(headTpl, {
            title: pageTitle
        }).then((headHtml) => {
            $('.J_index_head', $('#orderList')).html(headHtml)
        })
    }

    renderOrderList(type) {
        let that = this;
        let url = OrderApi.searchCutOrder
        let requestData = Object.assign({}, this.requestParam)
        delete requestData.totalCount;
        const scrollContent = $('.J_list_dom');
        request({
            url,
            method: 'GET',
            data: requestData,
            cache: false,
            callback(response) {
                if (response.success === '1') {
                    const tpl = 'jbOrderList/index.html'
                    let data = formatListData(response)
                    that.requestParam.totalCount = data.page.totalCount;
                    nunjucks.render(tpl, data).then((resHtml) => {
                        if (type === 'append') {
                            scrollContent.append(resHtml)
                            if (data.page.result.length == 0) {
                                $('.J_empty_tips').text('没有更多数据了')
                            }
                        } else {
                            scrollContent.html(resHtml)
                            if (data.page.result.length == 0) {
                                $('.J_empty_tips').text('暂无数据')
                            }
                            if (type !== 'search') {
                                that.bindEvent();
                            }
                        }
                        that.scrollInit();
                    })
                }
            }
        })
        /**
         * 格式化订单列表数据
         * @param {object} data
         */
        function formatListData(data) {
            data.page.result.forEach((item) => {
                switch (item.status) {
                    case 200:
                        item.orderStatus = '待录入剪版信息';
                        break;
                    case 201:
                        item.orderStatus = '待提交审核';
                        break;
                    case 202:
                        item.orderStatus = '待审核';
                        break;
                    case 210:
                        item.orderStatus = '待报销';
                        break;
                    case 211:
                        item.orderStatus = '已报销';
                        break;
                    case 220:
                        item.orderStatus = '待发货';
                        break;
                    case 221:
                        item.orderStatus = '待提交支付';
                        break;
                    case 222:
                        item.orderStatus = '待对账';
                        break;
                    case 223:
                        item.orderStatus = '已完成';
                        break;
                    case 230:
                        item.orderStatus = '已取消';
                        break;
                    case 510:
                        item.orderStatus = '待报销';
                        break;
                    case 511:
                        item.orderStatus = '已报销';
                        break;
                    case 502:
                        item.orderStatus = '待提货';
                        break;
                }
                // 追加审核不通过时显示的信息不超过22个字符,刚好两行备注
                // if (item.denyRemark && item.denyRemark != "" && item.denyRemark.length > 22) {
                //   item.denyRemark = item.denyRemark.substr(0,22)
                // }
                Array.isArray(item.productNumbers) && item.productNumbers.some((product) => {
                    let hasProductImg = Array.isArray(product.imgUrls) &&
                        product.imgUrls.length > 0 &&
                        product.imgUrls.some((imgUrl) => {
                            if (imgUrl !== '') {
                                item.iconImg = imgUrl
                                return true
                            } else {
                                return false
                            }
                        });
                    if (hasProductImg) {
                        return true
                    } else {
                        let hasMadanImg = Array.isArray(item.madanUrls) &&
                            item.madanUrls.length > 0 &&
                            item.madanUrls.some((imgUrl) => {
                                if (imgUrl !== '') {
                                    item.iconImg = imgUrl
                                    return true
                                } else {
                                    return false
                                }
                            })
                        if (hasMadanImg) {
                            return true
                        } else {
                            item.iconImg = ''
                            return false
                        }
                    }
                })
            })
            return data
        }
    }

    actionOrder(orderId, actionType, targetElement) {
        let url = `${OrderApi.searchCutOrder}/${orderId}?_function=${actionType}`
        if (actionType == 'lading')
            url = `/redwood/ziying/cut/${orderId}?_function=${actionType}`
        request({
            url,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({}),
            callback(response) {
                if (response.success === '1') {
                    targetElement.parents('.money-list-card').remove()
                } else {
                    $.alert(response.msg)
                }
            }
        })
    }

    bindEvent() {
        const that = this;
        let searchInput = $('#search')
        let searchBtn = $('.J_search_btn')
        // 确认收款
        $('.J_confirm_payment').on('click', (e) => {
            let targetElement = $(e.currentTarget)
            let orderId = targetElement.attr('data-orderId')
            $.modal({
                title: '是否确认收款？',
                text: '',
                buttons: [{
                    text: '取消',
                }, {
                    text: '确定',
                    onClick() {
                        that.actionOrder(orderId, 'confirm', targetElement)
                    }
                }]
            })
        })
        // 提交审核
        $(document).on('click', '.J_submit_review', (e) => {
            let targetElement = $(e.currentTarget)
            let orderId = targetElement.attr('data-orderId')
            $.modal({
                title: '是否确定提交审核？',
                text: '',
                buttons: [{
                    text: '取消',
                }, {
                    text: '确定',
                    onClick() {
                        that.actionOrder(orderId, 'submit', targetElement)
                    }
                }]
            })
        })

        // 确认提货
        $(document).on('click', '.J_submit_lading', (e) => {
            let targetElement = $(e.currentTarget)
            let orderId = targetElement.attr('data-orderId')
            $.modal({
                title: '是否确定提货？',
                text: '',
                buttons: [{
                    text: '取消',
                }, {
                    text: '确定',
                    onClick() {
                        that.actionOrder(orderId, 'lading', targetElement)
                    }
                }]
            })
        })


        $(document).on('click', '.J_submit_updateTotalMoney', function (e) {
            let targetElement = $(e.currentTarget)
            let orderId = targetElement.attr('data-orderId')
            console.log('costMoney:' + targetElement.attr('data-costMoney'))            
            $.prompt('编辑成本货款', function (value) {
                let url = `/redwood/ziying/cut/${orderId}?_function=updateInfo`
                request({
                    url,
                    method: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify({costMoney: value}),
                    callback(response) {
                        if (response.success === '1') {
                            that.renderOrderList('search');
                        } else {
                            $.alert(response.msg)
                        }
                    }
                })
            });
            $('.modal-text-input').val(targetElement.attr('data-costMoney'));
        });

        // 搜索
        searchBtn.on('click', (e) => {
            let cutKey = $.trim(searchInput.val())
            this.requestParam.key = cutKey
            if (cutKey !== '') {
                this.renderOrderList('search');
            }
        })

        searchInput.on('input', (e) => {
            if ($(e.currentTarget).val() === '') {
                searchBtn.addClass('disabled')
            } else {
                searchBtn.removeClass('disabled')
            }
        })
    }

    scrollInit() { // 无限滚动
        const that = this;
        const doms = this.doms;
        const scrollOption = {
            reqOptions: this.requestParam,
            scrollDom: $('.J_scroll_dom', doms.container), // 因为是绝对定位
            listDom: $('.J_list_dom ', doms.container), // 所以需要传 真正能够计算高度的div进去
            loadingMore: that.requestParam.totalCount / that.requestParam.pageSize > that.requestParam.pageNumber
        };
        scrollGetData(scrollOption, () => {
            that.requestParam = $.extend(that.requestParam, scrollOption.reqOptions);
            that.renderOrderList('append');
        });
    }
}

export default new Page()
