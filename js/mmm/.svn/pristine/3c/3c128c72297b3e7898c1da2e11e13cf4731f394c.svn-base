import '../common/base.js'
import OrderApi from '../api/order'
import {
    checkLogin,
    unique,
    sortByObject,
    getParam,
    setCache,
    setLastPage
} from '../common/utils'
class Page {
    constructor() {
        this._time = new Date().getTime()
        $(document).on('click', '.icon-refresh', function() {
            location.reload()
        })
        checkLogin({
            lastPage: location.href
        }, (res) => {
            this.loginInfo = res.loginInfo
            this.getTask()
        })
    }
    getTask() {
        this.renderTab()
    }
    filterCondition() {
        let zbArr = [
            'woodClothHunterLeader',
            'woodClothHunterAdmin',
            'woodClothHunter',
            'woodFollowLeader',
            'woodAdmin'
        ]
        let jbArr = [
            'woodCutCloth',
            'woodCutClothLeader',
            'woodFollowLeader',
            'woodFinance',
            'woodAdmin'
        ]
        let dhArr = [
            'woodFollowLeader',
            'woodBuyerManager',
            'woodBuyerManagerAdmin',
            'woodBuyerManagerLeader',
            'woodChecker',
            'woodCheckerLeader',
            'woodFinance',
            'woodLogistics',
            'woodLogisticsLeader',
            'woodPurchaser',
            'woodPurchaserLeader',
            'woodTaker',
            'woodTakerLeader',
            'woodSales', // 销售员
            'woodSalesLeader' // 销售组长
        ]
        let loginInfo = this.loginInfo
        delete loginInfo.user
        let filterArr = []
        for (let k in loginInfo) {
            if (loginInfo[k]) {
                filterArr.push(k)
            }
        }
        // let openArr = ['zb', 'jb', 'dh']
        let openArr = []
        filterArr.map((item) => {
            let zbIndex = $.inArray(item, zbArr)
            let jbIndex = $.inArray(item, jbArr)
            let dhIndex = $.inArray(item, dhArr)
            if (zbIndex > -1) {
                // openArr.push({key: 'a', value:'zb'})
                openArr.push('zb')
            }
            if (jbIndex > -1) {
                // openArr.push({key: 'b', value:'jb'})
                openArr.push('jb')
            }
            if (dhIndex > -1) {
                // openArr.push({key: 'c', value:'dh'})
                openArr.push('dh')
            }
        })
        openArr = unique(openArr)
        let temArr = []
        openArr.map((item) => {
            if (item == 'zb') {
                temArr.push({
                    key: 'a',
                    value: 'zb'
                })
            } else if (item == 'jb') {
                temArr.push({
                    key: 'b',
                    value: 'jb'
                })
            } else {
                temArr.push({
                    key: 'c',
                    value: 'dh'
                })
            }
        })
        temArr.sort(sortByObject('key'))
        let reaArr = []
        temArr.map((item) => {
            reaArr.push(item.value)
        })
        openArr = reaArr
        // 判断显示什么模板
        let category = ''
        if (openArr.length == 1) {
            if ($.inArray('zb', openArr) > -1) {
                category = 'zb-all'
            } else if ($.inArray('jb', openArr) > -1) {
                category = 'jb-all'
            } else if ($.inArray('dh', openArr) > -1) {
                category = 'all-all'
            }
        } else if (openArr.length == 2) {
            if ($.inArray('dh', openArr) > -1) {
                if ($.inArray('zb', openArr) > -1) {
                    category = 'zb-all'
                } else {
                    category = 'jb-all'
                }
            } else {
                category = 'zb-all'
            }
        } else if (openArr.length == 3) {
            category = 'zb-all'
        }

        return {
            category,
            openArr
        }
    }
    renderTab() {
        const searchCont = $('.J_search_cont')
        if (this.loginInfo.woodFinance) {
            searchCont.hide()
        }
        let obj = this.filterCondition()
        let that = this
        let tpl = 'index/tabTpl.html'
        let category = getParam('category') || obj.category
        that.openArrLength = obj.openArr.length
        setCache({
            type: 'sessionStorage',
            dataType: 'json',
            key: 'showTabArr',
            value: obj.openArr
        })
        nunjucks.render(tpl, {
            showTabArr: obj.openArr,
            category
        }).then((contentHtml) => {
            $('.J_tabContent', that.$page).html(contentHtml)
            this.changeTab()
        })
        this.reqTask({
            _time: this._time,
            category
        }, (data) => {
            this.render(data, category)
        })
    }
    // 切换tab
    changeTab() {
        let that = this
        $('.J_tabContent a', this.$page).on('click', function() {
            $(this).addClass('active').siblings('a').removeClass('active')
        })
    }
    reqTask(reqOptions, fnCallBack) {
        $.showPreloader();
        request({
            url: OrderApi.getTaskSummary,
            data: reqOptions,
            cache: false,
            // contentType:'application/json',
            callback: (data) => {
                setTimeout(() => {
                    $.hidePreloader();
                }, 400);
                if (data.success === '1') {
                    fnCallBack && fnCallBack(data)
                } else {
                    $.toast(data.msg)
                }
            }
        })
    }
    // 渲染模板
    render(taskData, index) {
        const that = this
        let tpl = ''
        switch (index) {
            case 'zb-all':
                tpl = 'index/zhaoBanTpl.html'
                break;
            case 'jb-all':
                tpl = 'index/jianBanTpl.html'
                break;
            case 'all-all':
                tpl = 'index/contentTpl.html'
                break;
        }
        this.data = {
            title: '采购商',
            backLink: '/orderPublish.html',
            role: this.loginInfo,
            TaskNumObj: taskData
        }
        nunjucks.render(tpl, this.data).then((contentHtml) => {
            that.$page = $('.J_content')
            that.$page.html(contentHtml)
            // 重置剪版员search的placeholder值 
            if (index === 'jb-all') {
                $('#search').attr('placeholder', '订单号，采购商名称，供应商名称')
                $('.J_search_btn').addClass('disabled')
                that.renderSuperscript()
            }
            this.bindEvents()
        })
    }

    renderSuperscript() {
        let url = OrderApi.getCountCut
        request({
            url,
            method: 'GET',
            cache: false,
            callback(response) {
                if (response.success === '1') {
                    const waitCut = (response.obj['200'] || 0) + (response.obj['201'] || 0) + (response.obj['502'] || 0)
                    if (waitCut > 0) {
                        $('.J_wait_jb').prepend($('<span class="task-num">' + waitCut + '</span>'))
                    }
                    const c10 = response.obj['toReimburse']
                    if (c10 > 0) {
                        $('.J_wait_reimbursement').prepend($('<span class="task-num">' + c10 + '</span>'))
                    }
                    const c11 = response.obj['reimbursed']
                    if (c11 > 0) {
                        $('.J_confirm_reimbursement').prepend($('<span class="task-num">' + c11 + '</span>'))
                    }
                }
            }
        })
    }
    bindEvents() {
        let that = this
        let searchInput = $('#search')
        let searchBtn = $('.J_search_btn')
        $('.J_items').on('click', function() {
            let category = $(this).closest('.J_prefix').attr('data-prefix')
            const href = $(this).attr('data-link')
            sessionStorage.removeItem('reqOptions')
            sessionStorage.removeItem('publishAgain')
            location.href = `${href}&category=${category}`
            return false
        })
        $('.J_zhaoban_publish').on('click', function() {
            sessionStorage.removeItem('publishTemp')
            sessionStorage.removeItem('buyerInfo')
            sessionStorage.removeItem('defaultAddr')
            sessionStorage.removeItem('orderDetail')
            sessionStorage.removeItem('choosedTags')
        })
        $('.J_jianban_publish').on('click', function() {
            sessionStorage.removeItem('productNumList')
            sessionStorage.removeItem('leaveMessage')
            sessionStorage.removeItem('buyerInfo')
            sessionStorage.removeItem('defaultAddr')
            sessionStorage.removeItem('orderDetail')
            sessionStorage.removeItem('sellerInfo')
        })
        $('.J_order_publish').on('click', function() {
            sessionStorage.removeItem('firstStep')
            sessionStorage.removeItem('sellerInfo')
            sessionStorage.removeItem('buyerInfo')
            sessionStorage.removeItem('secondStep')
            sessionStorage.removeItem('colorInfo')
            sessionStorage.removeItem('addressInfo')
            sessionStorage.removeItem('defaultAddr')
            sessionStorage.removeItem('sendWaysObj')
            sessionStorage.removeItem('orderDetail')
            setLastPage()
        })
        $('.j-undercarriage').on('click', function() {
            $.toast('该功能已下架!');
        })
        $('.J_lsorder_publish').on('click', function() {
            sessionStorage.removeItem('sellerInfo')
            sessionStorage.removeItem('sellerAccounts')
            sessionStorage.removeItem('buyerInfo')
            sessionStorage.removeItem('firstStepTemp')
            sessionStorage.removeItem('orderDetail')
            setLastPage()
        })

        searchInput.on('keyup', function(e) {
            if (searchInput.val()) {
                $('.J_search_btn').removeClass('disabled')
            } else {
                $('.J_search_btn').addClass('disabled')
            }
        })

        $('.J_search_btn').on('click', function() {
            let category = that.$page.find('.J_prefix').attr('data-prefix')
            var keyword = $.trim($('#search').val())
            let categoryA = getParam('category')
            if (that.loginInfo.woodCutCloth || that.loginInfo.woodCutClothLeader) {
                if (!!keyword) {
                    location.href = `/jbOrderList.html?key=${encodeURIComponent(keyword)}`
                }
            } else {
                location.href = encodeURI(`/buyList.html?comeFrom=index&listKey=all&keyword=${keyword}&category=${category}`)
            }
        })
    }
}
export default new Page()