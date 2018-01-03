/**
 * 订单详情-找版
 */
import { getCache, formatTimeString, getProductType, getParam, imgPath } from '../../common/utils'
import OrderApi from '../../api/order';



function getTitle(tags = "") {
    if (!tags) {
        return "";
    }
    if (tags.indexOf('_') == -1) {
        return tags;
    }
    let tt = tags.split(",");
    let category = null;
    let TAG_SPLIT = '_';
    // let category2=null;
    let value = "";
    for (let i in tt) {
        let t = tt[i];
        let nn = t.split(TAG_SPLIT); // 面料_针织_成分_涤纶
        if (nn.length == 4) {
            if (category == null) {
                category = nn[1];
            }
            value = value + nn[3] + "、";
        }
    }
    if (category != null) {
        if (value) {
            value = value.substring(0, value.length - 1);
        }
        value = category + "、" + value;
        return value;
    } else {
        return "";
    }
}


export default class zhaoban {
    constructor(data) {
        // console.log(data.productList)
        data.title = getTitle(data.title);
        this.doms = {}
        console.log(data);
        const renderData = this.convertData(data)
        console.log(renderData);
        this.render(renderData)
        this.bindEvents()
        this.getSendCertificateList()
    }

    convertData(data) {
        const loginInfo = getCache({
            type: 'sessionStorage',
            key: 'currentUser'
        }).loginInfo;
        const findTypestring = {
            1: '找相同',
            2: '找类似',
            4: '找定做'
        }

        function getFindTypeString(typeString = '') {
            // console.log(typeString)
            const typeArr = typeString.split(',')
            const arr = []
            typeArr.map((item, index) => {
                arr.push(findTypestring[item])
            })
            return arr.join('/')
        }
        data.wantProductList = data.wantProductList.map(function(obj, index) {
            // console.log(obj.findType)
            obj.productType = getProductType(obj.productType) // 品类，商品类型 花型0, 面料1，辅料2，底布3，花布4
            // 寻样要求
            obj.motionDesc = data.motion && data.motion == 1 ? '是' : '否', // 是否提案
                obj.changeCardDesc = data.changeCard && data.changeCard == 1 ? '是' : '否' // 是否换头卡
            return obj
        });
        data.productList = data.productList.map(function(obj, index) {
            obj.productType = getProductType(obj.productType) // 品类，商品类型 花型0, 面料1，辅料2，底布3，花布4
            if (obj.expectedArrivalDate) {
                obj.expectedArrivalDate = formatTimeString(obj.expectedArrivalDate).split(' ')[0]
            }
            // obj.imgUrls = obj.imgUrls.split(',')
            return obj
        });
        const worthName = {
            1: '普通',
            8: '中',
            16: '高'
        }
        data.wantProductList.map((item, index) => {
            item.worthString = worthName[item.worth]
            // if (item.expectedTime) {
            //   item.expectedTimeString = formatTimeString(item.expectedTimeString)
            // }
        })
        // console.log('motion', data.motion)
        // console.log('hasChangeCard', data.hasChangeCard)
        return {
            loginInfo, // 登录信息
            imgPath,
            status: data.status, // 状态码
            sendType: data.sendType, // 状态码
            isMyTask: data.isMyTask, // 任务当前是否需要自己处理
            orderNumber: data.orderNumber, // 订单号
            redwoodDescr: data.redwoodDescr, // 红杉描述
            handler: data.handler, // 任务处理人姓名
            handlerTel: data.handlerTel, // 任务处理人电话
            follower: data.follower, // 跟单员姓名
            followerTel: data.followerTel, // 跟单员电话
            serviceNumber: data.serviceNumber, // 业务号
            createTime: Number(data.createTime) !== 0 ? formatTimeString(data.createTime) : '', // 发布时间
            buyerCompany: data.buyer.company, // 采购商所在公司
            buyerTel: data.buyer.tel, // 采购商电话
            province: data.province, // 送货地址 更详细地址
            city: data.city, // 送货地址 更详细地址
            area: data.area, // 送货地址 更详细地址
            addr: data.addr, // 送货地址 更详细地址
            contactName: data.contactName, // 联系人姓名
            contactTel: data.contactTel, // 联系人电话
            leaveMessage: data.leaveMessage, // 留言
            haveRealVersion: data.haveRealVersion === 0 ? '无样版' : '有样版', // 是否有样版: 0 没有 1有样版
            wantProductList: data.wantProductList, // 购买需求
            findTypeString: getFindTypeString(data.findType),
            productList: data.productList, // 购买信息
            content: data.content, // 任务备注
            expectedTimeString: data.expectedTime ? formatTimeString(data.expectedTime, 'yyyy-MM-dd') : '',
            replyList: data.replyList, // 接单列表
            title: data.title,
            scoreResult: data.scoreResult ? (data.scoreResult === 0 ? '不通过' : '通过') : '', // 审核结果
            score: data.score, // 审核分数
            scoreRemark: data.scoreRemark // 审核备注
        }
    }

    render(renderData) {
        const doms = this.doms
        doms.content = $('.J_content')
        doms.footer = $('.J_footer')
        const zhaobanTpl = 'orderDetail/zhaoban.html'
        // console.log(renderData)
        nunjucks.render(zhaobanTpl, renderData).then((zhaobanHtml) => {
            doms.content.append(zhaobanHtml)
        });

        // footer
        const footerTpl = 'orderDetail/footer.html'
        renderData.source = encodeURIComponent(location.pathname + location.search)
        nunjucks.render(footerTpl, { renderData }).then((footerHtml) => {
            doms.footer.append(footerHtml)
        });
    }

    getSendCertificateList() {
        const doms = this.doms
        $.showPreloader()
        request({
            url: OrderApi.getSendCertificateList,
            data: {
                orderNumber: getParam('orderNumber'),
                _time: this._time
            },
            callback(data) {
                $.hidePreloader()
                if (data.success === '1') {
                    if (data.result.length) {
                        const sendCertificateListTpl = 'orderDetail/sendCertificateList.html'
                        data.imgPath = imgPath
                        nunjucks.render(sendCertificateListTpl, data).then((html) => {
                            doms.content.append(html)
                        });
                    }
                } else {
                    $.alert('获取发货凭据列表失败！');
                }
            }
        });
    }

    bindEvents() {
        $(document).on('click', '.J_caret', function() {
            $(this).siblings().toggle();
        });
        $(document).on('click', '.del-color', function() {
            let buyProductId = $(this).data('id');
            console.log(buyProductId);

            $.confirm('你确定删除该色卡信息吗?',
                function() {
                    request({
                        url: 'redwood/colorCard/deleteReply',
                        contentType: 'application/json',
                        method: 'post',
                        data: JSON.stringify({
                            id: buyProductId
                        }),
                        callback(data) {
                            console.log(data);
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
                },
                function() {
                    // $.alert('You clicked Cancel button');
                }
            );



        });

        $(document).on('click', '.zb-popup', function() {
            let photos = $(this).find('img').map((i, img) => {
                return $(img).attr('src').split('@')[0]
            })
            var myPhotoBrowserPopup = $.photoBrowser({
                photos,
                type: 'popup'
            });
            myPhotoBrowserPopup.open();
        });
    }
}