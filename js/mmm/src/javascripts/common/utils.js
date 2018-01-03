/**
 * 公共方法
 * @module utils
 */
import UserApi from '../api/user'

const userAgent = navigator.userAgent.toLowerCase()

/**
 * 图片上传配置
 */
export const lrzConfig = {
    width: 1280,
    height: 1280,
    quality: 0.7
}

export const myLevel = {
    0: '未申请',
    1: '铜牌',
    2: '银牌',
    3: '金牌',
    4: '铂金',
    5: '钻石'
}


/**
 * 判断是否是安卓APP
 * @member
 * @author 家优
 * @return {boolean}   布尔值
 */
export const isAndroidApp = (
    () => {
        if ((userAgent.indexOf('android') > -1) && (userAgent.indexOf('redwood') === 0)) {
            return true
        } else {
            return false
        }
    }
)()

/**
 * 判断是否是IOS APP
 * @member
 * @author 家优
 * @return {boolean}  布尔值
 */
export const isiPhoneApp = (
    () => {
        if ((userAgent.indexOf('iphone') > -1) && (userAgent.indexOf('redwood') === 0)) {
            return true
        } else {
            return false
        }
    }
)()

/**
 * 判断是否是Weex APP
 * @member
 * @author 家优
 * @return {boolean}  布尔值
 */
export const isWeexApp = (
    () => {
        if (userAgent.indexOf('weex') > -1) {
            return true
        } else {
            return false
        }
    }
)()

/**
 * 搜芽图片读取路径
 * @member
 * @author 黄永
 * @return {string}  图片绝对路径
 */
export const imgPath = (
    () => {
        if (location.href.indexOf('test') > -1) {
            return 'http://test.soouya.com'
        } else {
            return 'http://www.soouya.com'
        }
    }
)()

/**
 * 获取缓存key
 * @method
 * @author 家优
 * @param  {string} url    url
 * @param  {object|string} params 参数
 * @return {string}        [description]
 */
const getCacheKey = (url, params) => {
    if (typeof params === 'undefined') {
        return url
    }
    let tmp = ''
    if (typeof params === 'object') {
        $.each(params, (k, v) => {
            tmp += `&${k}=${v}`
        })
    }
    if (typeof params === 'string') {
        tmp = params
    }
    return url.indexOf('?') > -1 ? `${url}&${tmp}` : `${url}?${tmp}`
}

/**
 * 判断是否是微信环境
 * @member
 * @author 家优
 * @return {boolean}  布尔值
 */
export const isWeiXin = (function() {
    const userAgent = navigator
        .userAgent
        .toLowerCase()
    return (userAgent.match(/MicroMessenger/i) === 'micromessenger')
}())

/**
 * 获取url参数的值
 * @method
 * @author 家优
 * @param  {string} name name
 * @param  {string} link =             location.href [description]
 * @return {string}      [description]
 */
export const getParam = (name, link = location.href) => {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    link = link.substring(link.indexOf('?') + 1)
    const r = link.match(reg)
    if (r) {
        return unescape(r[2])
    }
    return ''
}

// ["http://localredwoodm.soouya.com/orderList.html?Tabkey=sqk&collectDebts=1&unGetPay=1&category=all-all"]
export const removeParams = (name, link = location.href) => {
    let links = link
    if (links.indexOf('orderDetail') > -1) {
        let linksArr = links.split('?')
        let linkTitle = linksArr[0]
        let temParam = []
        linksArr[1].split('&').map((item) => {
            if (item.indexOf(name) > -1) {
                console.log('no')
            } else {
                temParam.push(item)
            }
        })
        let strParam = temParam.join('&')
        let allLink = linkTitle + '?' + strParam
        return allLink
    } else {
        return links
    }
}

/**
 * 设置缓存
 * @example
 * setCache({
 *     type: 'sessionStorage',
 *     key: 'cache-key-demo',
 *     value: cacheValue
 * })
 */
export const setCache = (options) => {
    const type = options.type || 'sessionStorage' // 缓存方式，sessionStorage或localStorage
    const key = options.key // 缓存的key
    const dataType = options.dataType || 'json' // 缓存的数据类型，string或json
    let value = options.value // 缓存的值
    const time = options.time // 缓存时间,以毫秒为单位
    if (dataType === 'json') {
        value = JSON.stringify(value)
    }
    let cacheType // 缓存类型,sessionStorage或localStorage
    if (type === 'sessionStorage') {
        cacheType = sessionStorage
    } else if (type === 'localStorage') {
        cacheType = localStorage
    } else {
        return false
    }
    try {
        cacheType.setItem(key, value)
    } catch (e) {
        cacheType.clear()
        cacheType.setItem(key, value)
    }
    if (time) { // 如果有设置缓存时间则时间到后数据就会销毁，默认是sessionStorage或localStorage的生命周期
        const dateTime = new Date()
        const timeStamp = dateTime.getTime() + time
        try {
            sessionStorage.setItem(`${key}-time`, timeStamp)
        } catch (e) {
            sessionStorage.clear()
            sessionStorage.setItem(`${key}-time`, timeStamp)
        }
    }
    return true
}

/**
 * 获取缓存
 * @example
 * let cacheValue = getCache({
 *     type: 'sessionStorage',
 *     key: 'cache-key-demo'
 * })
 */
export const getCache = (options) => {
    const key = options.key
    const type = options.type || 'sessionStorage'
    const dataType = options.dataType || 'json' // 缓存的数据类型，string或json
    let cacheType // 缓存类型,sessionStorage或localStorage
    if (type === 'sessionStorage') {
        cacheType = sessionStorage
    } else if (type === 'localStorage') {
        cacheType = localStorage
    } else {
        return false
    }
    const dateTime = new Date()
    const timeStamp = dateTime.getTime()
    const efficientTime = sessionStorage.getItem(`${key}-time`) || timeStamp + 1000 * 60 * 60 * 24 * 365 // 默认存储时间为1年
    const timeInterval = efficientTime - timeStamp
    if (timeInterval >= 0) {
        let value = cacheType.getItem(key)
        if (!value) {
            return false
        }
        if (dataType === 'json') {
            try {
                value = JSON.parse(cacheType.getItem(key))
                if (typeof(value) === 'object' && Object.prototype.toString.call(value)
                    .toLowerCase() === '[object object]' && !value.length) {
                    value.expiredTime = new Date(parseInt(efficientTime, 10))
                }
            } catch (e) {
                console.log(e)
            }
        }
        return value
    } else { // 已过缓存时间，让数据失效
        cacheType.removeItem(key)
        return false
    }
}

export const getLastPage = () => {
    const lastPage = getCache({
        key: 'lastPage'
    }) || [];
    const value = lastPage.pop();
    setCache({
        key: 'lastPage',
        type: 'sessionStorage',
        value: lastPage
    });
    return value;
}

export const setLastPage = (href) => {
    href = href || location.href;
    const lastPage = getCache({
        key: 'lastPage'
    }) || [];
    console.log(href)
    lastPage.push(href);
    console.log(lastPage)
    setCache({
        key: 'lastPage',
        type: 'sessionStorage',
        value: lastPage
    });
}

/**
 * 数据请求接口  校验 url并抛出错误，默认参数
 * @todo something to do
 * @method
 * @author 家优
 * @param  {object} options={  data: {}} [description]
 * @return {boolean}         [description]
 */
export const request = (options = {
    data: {}
}) => {
    let requestStartTime
    let requestEndTime
    const url = options.url
    let method = options.method
    let contentType = options.contentType
    const time = options.url.indexOf('?') > -1 ? `&time=${new Date().getTime()}` : `?time=${new Date().getTime()}`
    options.data = options.data || {}
    // delete options.data._time
    const cacheKey = getCacheKey(url, options.data)
    if (typeof method === 'undefined' || !$.inArray(method, ['get', 'post'])) {
        method = 'get'
    }
    if (typeof options.data === 'object') {
        options.data._time = options.data._time || new Date().getTime()
    }
    const parrt = new RegExp('[^\\u4E00-\\u9FA5|\\u3000｜\\uFF00-\\uFFEF|\\u0007-\\u000d|\\u0020-\\u00ff|\\u3000-\\u303f|\\u2000-\\u206f]')
    const checkOption = $.extend(true, {}, options.data)
    delete checkOption._time
    delete checkOption.orderNumber
    delete checkOption.pageNumber
    delete checkOption.pageSize
    for (let i in checkOption) {
        if (parrt.test(checkOption[i]) && !checkOption[i].indexOf('g/㎡') > 0) {
            $.hidePreloader()
            $.alert('不能输入特殊字符')
            return false
        }
    }
    const cacheData = getCache({
        type: options.cacheType || 'sessionStorage',
        key: cacheKey,
        dataType: 'json'
    })
    if (method === 'get' && options.cache && cacheData) {
        options.callback && options.callback(cacheData)
        return true
    }
    setTimeout(function() {
        doAjax()
    }, 100)

    function doAjax() {
        // console.log(options.data)
        let ajaxUrl = method.toLowerCase() === 'post' ? url : url + time
        $.ajax({
            type: method,
            // type: 'POST',
            url: ajaxUrl,
            data: options.data,
            xhrFields: options.xhrFields,
            dataType: options.dataType || 'json',
            jsonp: options.jsonp || 'callback',
            contentType: contentType || 'application/x-www-form-urlencoded',
            beforeSend: options.beforeSend || function() {
                requestStartTime = new Date().getTime()
            },
            timeout: options.timeout || 15000,
            success(res) {
                if (method === 'get') {
                    if (options.cache && res) { // 缓存请求结果
                        try {
                            setCache({
                                type: options.cacheType || 'sessionStorage',
                                key: cacheKey,
                                dataType: 'json',
                                value: res,
                                time: 1000 * 60 * 60 * 24 * 30 // 缓存一个月
                            })
                        } catch (e) {
                            if (options.cacheType === 'localStorage') {
                                localStorage.clear()
                            } else {
                                sessionStorage.clear()
                            }
                            setCache({
                                type: options.cacheType || 'sessionStorage',
                                key: cacheKey,
                                dataType: 'json',
                                value: res,
                                time: 1000 * 60 * 60 * 24 * 30 // 缓存一个月
                            })
                        }
                    }
                }
                if (res && res.success == 10009) { // 登录失效
                    options && options.data && options.data.lastPage && setLastPage(options.data.lastPage);
                    let tempObj = getCache({
                        type: 'localStorage',
                        key: 'jiekou10009',
                        dataType: 'json'
                    }) || {
                        infoArr: []
                    }
                    tempObj.infoArr.push({
                        time: new Date(),
                        jieKouName: url,
                        errorCode: res.success
                    })
                    setCache({
                        type: 'localStorage',
                        key: 'jiekou10009',
                        value: tempObj
                    })
                    $.hidePreloader()
                    $.alert('用户信息失效, 后端返回状态码=' + res.success, function() {
                        location.href = '/login.html'
                    })
                    return
                }
                options.callback && options.callback(res)
            },
            error: options.error || function(err) {
                // alert('超时', err)
                $.hidePreloader()
                $.alert('请求超时，请重新操作或刷新重试')
            },
            complete: options.complete || function() {
                requestEndTime = new Date().getTime();
                const responseTime = requestEndTime - requestStartTime
                statResponseTime({
                    api: options.url,
                    responseTime: responseTime,
                    type: 'request'
                })
            }
        })
    }
    return false;
}

/**
 * 检查是否登录，已登录则返回用户信息
 * @method
 * @author robin
 * @param  {object}   options={} 参数
 * @param  {Function} callback 回调
 * @return {boolean}            布尔值
 */
export const checkLogin = (options = {}, callback) => {
    const currentUser = getCache({
        key: 'currentUser',
        type: 'sessionStorage',
    });
    // alert(JSON.stringify(currentUser))
    if (currentUser) {
        callback(currentUser);
        return
    }
    request({
        url: UserApi.getCurrentUser,
        data: options,
        callback(data) {
            if (data && data.loginInfo) {
                setCache({ // 将用户信息缓存到本地
                    type: 'sessionStorage',
                    key: 'currentUser',
                    value: data
                });
                setCache({ // 将用户信息缓存到本地
                    type: 'localStorage',
                    key: 'localStorage-user',
                    value: data.loginInfo
                });
                callback(data);
            } else {
                const localUserInfo = getCache({ // 当前用户未登录，尝试获取本地缓存中的信息帮用户自动登录
                    key: 'localStorage-user',
                    type: 'localStorage'
                });
                if (!localUserInfo || !localUserInfo.userName || !localUserInfo.pwd) {
                    options && setLastPage(options.lastPage);
                    location.href = '/login.html';
                    return false;
                }
                const params = {
                    userName: localUserInfo.userName,
                    pwd: localUserInfo.pwd,
                    group: localUserInfo.group
                };

                request({
                    url: UserApi.login,
                    data: params,
                    callback(res) {
                        if (res.success === '1' && res.loginInfo) {
                            const cacheData = {
                                userName: params.userName,
                                pwd: params.pwd,
                                group: params.group
                            };
                            setCache({ // 将用户信息缓存到本地
                                type: 'localStorage',
                                key: 'localStorage-user',
                                value: cacheData
                            });
                            callback(res);
                        } else {
                            options && setLastPage(options.lastPage);
                            location.href = '/login.html';
                        }
                    }
                })
            }
            return false;
        }
    })
}

/**
 * 滚动加载
 * @method
 * @author yonghuang
 * @param  {object}   param    [description]
 * @param  {Function} callback [description]
 * @return {undefined}            [description]
 */
export const scrollGetData = (param, callback) => {
    const cacheParam = param;
    const loadingDom = $('.J_scroll_preloader');
    loadingDom.hide();
    let timeout;
    let container;
    if (!param.scrollDom) {
        container = $(document);
    } else {
        container = $(param.scrollDom);
    }

    container.off('scroll').on('scroll', () => {
        const scrollHeight = container.scrollTop();
        const windowHeight = $(window).height();
        const containerHeight = param.listDom.height();
        const reachBottom = (scrollHeight + windowHeight + 150 >= containerHeight);
        if (reachBottom) {
            loadingDom.show(param.loadingMore);
            if (param.loadingMore) {
                clearTimeout(timeout);
                timeout = window.setTimeout(() => {
                    param.loadingMore = false;
                    cacheParam.reqOptions.pageNumber = cacheParam.reqOptions.pageNumber + 1;
                    callback && callback(cacheParam);
                }, 1000);
            } else {
                loadingDom.hide();
                // $.toast('没有更多数据')
            }
        }
    });
}

/**
 * 时间格式化
 * @func
 * @param  {Number} time   时间戳
 * @param  {string} format 时间格式
 */
export const formatTimeString = (time, format = 'yyyy-MM-dd HH:mm:ss') => {
    if (isNaN(time)) { // 非时间戳格式，本来就已经是字符串格式了
        return time
    }
    const t = new Date(Number(time));
    const tf = (i) => (i < 10 ? '0' : '') + i
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (a) => {
        let val;
        switch (a) {
            case 'yyyy':
                val = tf(t.getFullYear());
                break;
            case 'MM':
                val = tf(t.getMonth() + 1);
                break;
            case 'mm':
                val = tf(t.getMinutes());
                break;
            case 'dd':
                val = tf(t.getDate());
                break;
            case 'HH':
                val = tf(t.getHours());
                break;
            case 'ss':
                val = tf(t.getSeconds());
                break;
            default:
                break;
        }
        return val;
    })
}

/**
 * 品类类型转换中文
 * @method
 * @author robin
 * @param  {Number} productType [description]
 * @return {string}             [description]
 */
export const getProductType = (productType) => {
    let productTypeString
    switch (productType) {
        case 0:
            productTypeString = '花型'
            break;
        case 1:
            productTypeString = '面料'
            break;
        case 2:
            productTypeString = '辅料'
            break;
        case 3:
            productTypeString = '底布'
            break;
        case 4:
            productTypeString = '花布'
            break;
        default:
            productTypeString = '未知'
    }
    return productTypeString
}

/**
 * 转换订单类型
 * @method
 * @author robin
 * @param  {string} category [description]
 * @param  {string} buyType  [description]
 * @return {object}          [description]
 */
export const getOrderCategory = (category, buyType) => {
    let convertCategory;
    switch (category) {
        case 'vjd-jb':
            convertCategory = '面料';
            buyType = 'jb';
            break;
        case 'vjd-dh':
            convertCategory = '面料';
            buyType = 'dh';
            break;
        case 'vdf-dh':
            convertCategory = '辅料';
            buyType = 'dh';
            break;
        case 'vdf-jb':
            convertCategory = '辅料';
            buyType = 'jb';
            break;
        default:
            convertCategory = '未知类型'
            break;
    }
    if (!convertCategory) {
        convertCategory = (buyType === 'jb' ? '剪版' : '大货');
    }
    return {
        category: convertCategory,
        buyType
    }
}

/**
 * 判断是否是PC端
 * @member
 * @author robin
 * @return {boolean} [description]
 */
export const isPC = () => {
    const userAgentInfo = navigator.userAgent
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    let flag = true
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false
            break
        }
    }
    return flag
}

/**
 ** 加法函数，用来得到精确的加法结果
 * @author robin
 * @func
 ** @desc 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** @example 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export const culAdd = (arg1, arg2) => {
    let r1;
    let r2;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    const c = Math.abs(r1 - r2);
    const m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        const cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace('.', ''));
            arg2 = Number(arg2.toString().replace('.', '')) * cm;
        } else {
            arg1 = Number(arg1.toString().replace('.', '')) * cm;
            arg2 = Number(arg2.toString().replace('.', ''));
        }
    } else {
        arg1 = Number(arg1.toString().replace('.', ''));
        arg2 = Number(arg2.toString().replace('.', ''));
    }
    return (arg1 + arg2) / m;
}

/**
 ** 减法函数，用来得到精确的减法结果
 * @author robin
 * @func
 ** @desc 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** @example 调用：culSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export const culSub = (arg1, arg2) => {
    let r1;
    let r2;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    const m = Math.pow(10, Math.max(r1, r2)); // last modify by deeka //动态控制精度长度
    return (arg1 * m - arg2 * m) / m;
}

/**
 ** 乘法函数，用来得到精确的乘法结果
 * @author robin
 * @func
 ** @desc 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** @example 调用：culMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
export const culMul = (arg1, arg2) => {
    if (!arg1 || !arg2) {
        return 0
    }
    let m = 0;
    const s1 = arg1.toString();
    const s2 = arg2.toString();
    try {
        if (s1.split('.')[1]) {
            m += s1.split('.')[1].length;
        }
    } catch (e) {
        console.log(e);
    }
    try {
        if (s2.split('.')[1]) {
            m += s2.split('.')[1].length;
        }
    } catch (e) {
        console.log(e);
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}

/**
 ** 除法函数，用来得到精确的除法结果
 * @author robin
 * @func
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：culDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
export const culDiv = (arg1, arg2) => {
    let t1 = 0;
    let t2 = 0;
    try {
        t1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        console.log(e);
    }
    try {
        t2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        console.log(e);
    }
    const r1 = Number(arg1.toString().replace('.', ''));
    const r2 = Number(arg2.toString().replace('.', ''));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

/**
 * 滚动定位到某个位置
 * @func
 * @param  {object} $target [description]
 * @param  {object} skewing [description]
 * @return {boolean}         [description]
 */
export const scrollTo = ($target, skewing, container) => {
    function scroll(scrollTo, time) {
        let scrollFrom = container ? $(container).scrollTop() : parseInt(document.body.scrollTop)
        let i = 0
        let runEvery = 5; // run every 5ms
        scrollTo = parseInt(scrollTo);
        time /= runEvery;
        let interval = setInterval(function() {
            i++;
            if (container) {
                $(container).scrollTop((scrollTo - scrollFrom) / time * i + scrollFrom)
            } else {
                document.body.scrollTop = (scrollTo - scrollFrom) / time * i + scrollFrom
            }
            if (i >= time) {
                clearInterval(interval);
            }
        }, runEvery);
    }

    if ($target && typeof $target === 'object') {
        try {
            let offsetTop = $target.offset().top - (skewing || 0);
            if (offsetTop === 0) {
                scroll(offsetTop, 200);
            } else {
                scroll(offsetTop, 50);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

/**
 * 根据采购商等级获取服务费率
 * @method
 * @author 国唯
 * @param  {Number} level [description]
 * @return {float}       [description]
 */
export const getServiceRate = (level) => {
    let rate
    switch (level) {
        case '钻石VIP':
            rate = 0.1;
            break;
        case '铂金VIP':
            rate = 0.2;
            break;
        case '金牌VIP':
            rate = 0.3;
            break;
            // case 2:
            //   rate = 0.5;
            //   break;
        default:
            rate = 0;
    }
    return rate;
}

export const uniquelize = (arr) => {
    let res = []
    let json = {}
    for (let i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
            res.push(arr[i])
            json[arr[i]] = 1
        }
    }
    return res
}

/**
 * 时间响应统计
 */
export const statResponseTime = (options) => {
    try {
        const currentUser = getCache({
            key: 'currentUser',
            type: 'sessionStorage',
        });
        const _uuid = currentUser.loginInfo.user.id + '-' + new Date().getTime()
        options._uuid = _uuid
        const logString = JSON.stringify(options)
        // console.log('logString:', logString)
        if (isAndroidApp) {
            log(logString)
        }
        if (isiPhoneApp) {
            window.webkit.messageHandlers.jsLogger.postMessage({ body: logString });
        }
    } catch (e) {
        console.log(e)
    }
}

// 数组去重

export const unique = (arr) => {
    let result = [],
        hash = {};
    for (let i = 0, elem;
        (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result
}

// 根据数组对象里面某个值排序
export const sortByObject = (name) => {
    return function(o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        } else {
            throw ("error");
        }
    }
}

// 清除列表缓存
export const clearListCache = () => {
    for (const i in sessionStorage) {
        if (i.indexOf('pagecache-') != -1) {
            sessionStorage.removeItem(i)
        }
        if (i.indexOf('scrolltop-') != -1) {
            sessionStorage.removeItem(i)
        }
    }
    sessionStorage.removeItem('reqOptions')
}