import '../../common/base.js'
import {
    setCache,
    checkLogin,
    getParam,
    getLastPage,
    getCache
} from '../../common/utils'
import OrderApi from '../../api/order'
import Footer from '../orderDetail/footer'
class Page extends Footer {
    constructor() {
        super()
        this.doms = {
            content: $('.J_content'),
            footer: $('.J_footer')
        }
        checkLogin({
            lastPage: location.href
        }, () => {
            this.renderDetail()
        })

    }

    renderDetail() {
        const that = this;
        const orderId = getParam('id');
        request({
            url: `${OrderApi.searchCutOrder}/${orderId}`,
            mothed: 'GET',
            callback(response) {
                $.hidePreloader()
                if (response.success === '1') {
                    const tpl = 'jbOrderDetail/index.html'
                    response.obj.createTime = that.formatTime(response.obj.createTime)
                    if (response.obj.expectedSendTime > 0) {
                        response.obj.expectedSendTime = that.formatTime(response.obj.expectedSendTime).substring(0,10)
                    } else {
                        response.obj.expectedSendTime = '--'
                    }
                    nunjucks.render(tpl, response.obj).then((html) => {
                        that.doms.content.append(html)
                        that.bindEvent()
                    });
                } else {
                    $.alert(response.msg)
                }
            },
            error() {
                $.alert('获取订单详情失败，请刷新重试')
            }
        })
    }

    actionOrder(orderId, actionType, targetElement) {
        console.log('1:'+actionType)
        let url = `${OrderApi.searchCutOrder}/${orderId}?_function=${actionType}`
        if(actionType == 'lading')
            url = `/redwood/ziying/cut/${orderId}?_function=${actionType}`
        request({
            url,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({}),
            callback(response) {
                if (response.success === '1') {
                    history.back()
                } else {
                     $.alert(response.msg)
                }
            }
        })
    }

    bindEvent() {
        const that = this;
        $('.J-toggle-show').on('click', (e) => {
            $(e.currentTarget).parents('.jb-order-info').toggleClass('hide')
        })
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', () => {
            location.reload();
        });
        $(document).on('click', '.J_back', () => {
            history.back()
        })
        // 确认收款
        $('.J_confirm_payment').on('click', (e) => {
            let orderId = $(e.currentTarget).attr('data-orderId')
            $.modal({
                title: '是否确认收款？',
                text: '',
                buttons: [{
                    text: '取消',
                }, {
                    text: '确定',
                    onClick() {
                        that.actionOrder(orderId, 'confirm')
                    }
                }]
            })
        })
        // 提交审核
        $('.J_submit_review').on('click', (e) => {
            let orderId = $(e.currentTarget).attr('data-orderId')
            $.modal({
                title: '是否确定提交审核？',
                text: '',
                buttons: [{
                    text: '取消',
                }, {
                    text: '确定',
                    onClick() {
                        that.actionOrder(orderId, 'submit', $(e.currentTarget))
                    }
                }]
            })
        })

        //确认提货
        $('.J_submit_lading').on('click', (e) => {
            let orderId = $(e.currentTarget).attr('data-orderId')
            $.modal({
                title: '是否确定提货？',
                text: '',
                buttons: [{
                    text: '取消',
                }, {
                    text: '确定',
                    onClick() {
                        that.actionOrder(orderId, 'lading', $(e.currentTarget))
                    }
                }]
            })
        })

        $('.J_pb_img').on('click', (e) => {
            let targetElement = $(e.currentTarget)
            let targetIndex = $(e.currentTarget).index()
            let wrapElement = targetElement.parents('.J_pb_img_wrap');
            let imgArr = [];
            console.log(wrapElement)
            wrapElement.find('img').each((index, element) => {
                if (index === targetIndex) {
                    imgArr.unshift(element.src)
                } else {
                    imgArr.push(element.src)
                }
            })
            console.log(imgArr)
            let myPhotoBrowserStandalone = $.photoBrowser({
                photos: imgArr,
                type: 'popup'
            })
            myPhotoBrowserStandalone.open()
        })
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
}
export default new Page()
