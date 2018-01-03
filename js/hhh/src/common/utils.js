import Fetch from 'isomorphic-fetch'
import { Notification, Message } from 'element-ui'
import Cookies from 'js-cookie'
/**
 * 序列化请求参数
 */
const serialize = (data) => {
  let serializeData = ''
  if (typeof data === 'undefined') {
    return data
  }
  if (typeof data === 'object') {
    for (const k of Object.keys(data)) {
      serializeData += k + '=' + data[k] + '&'
    }
    serializeData = serializeData.substring(0, serializeData.length - 1)
  }
  if (typeof data === 'string') {
    serializeData = data
  }
  return serializeData
}

/**
 * 数据请求
 */
const fetch = (conf) => {
  let url = conf.url
  const fetchConf = {
    credentials: 'include'
  }
  const serializeData = serialize(conf.data)
  if (conf.method) {
    if (conf.dataType === 'FormData') {
      Object.assign(fetchConf, {
        method: conf.method,
        body: conf.data
      })
    } else {
      Object.assign(fetchConf, {
        credentials: 'include',
        method: conf.method,
        headers: {
          'Content-Type': conf.contentType || 'application/x-www-form-urlencoded'
        },
        body: serializeData
      })
    }
  } else {
    if (serializeData) {
      if (url.indexOf('?') > -1) {
        url += serializeData
      } else {
        url += '?' + serializeData
      }
    }
  }

  return Fetch(url, fetchConf)
}

/**
 * 对外通用数据请求方法
 */
export const request = (params, callBack) => {
  const defaults = {
    method: params.method || ''
  }
  const reqOtion = Object.assign({}, defaults, params)
  console.log(reqOtion)
  return fetch(reqOtion).then((response) => response.json()).then((json) => {
    if (json.code == 10009) {
      if (location.href.indexOf('localcaiwu.soouya.com') > -1 || Cookies.get('isAuthed')) {
        Notification({
          title: json.message,
          message: `错误状态码 ${json.code}`,
          type: 'error',
          duration: 0,
          onClose: function() {
            sessionStorage.removeItem('currentUser')
            sessionStorage.removeItem('isAuthed')
            Cookies.remove('isAuthed')
            location.href = '/common/login'
          }
        })
      } else {
        location.href = '/common/login'
      }
      sessionStorage.removeItem('currentUser')
      sessionStorage.removeItem('isAuthed')
      Cookies.remove('isAuthed')
    } else {
      if (callBack) {
        console.log('json:', json)
        callBack(json)
      } else {
        return json
      }
    }
  })
}

/**
 * 设置缓存
 */
export const setCache = (options) => {
  var type = options.type || 'sessionStorage' // 缓存方式，sessionStorage或localStorage
  var key = options.key // 缓存的key
  var dataType = options.dataType || 'json' // 缓存的数据类型，string或json
  var value = options.value // 缓存的值
  var time = options.time // 缓存时间,以毫秒为单位

  if (dataType === 'json') {
    value = JSON.stringify(value)
  }

  var cacheType // 缓存类型,sessionStorage或localStorage
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
    var dateTime = new Date()
    var timeStamp = dateTime.getTime() + time

    try {
      sessionStorage.setItem(key + '-time', timeStamp)
    } catch (e) {
      sessionStorage.clear()
      sessionStorage.setItem(key + '-time', timeStamp)
    }
  }
}
/**
 * 设置cookie
 * @param  {string} name   cookie名称
 * @param  {string} expire 过期时间
 * @param  {string || bool} value  值
 */
// export const setCookies = (options) => {
//   const exdate = new Date()
//   exdate.setDate(exdate.getDate() + options.expire)
//   const expiresDay = options.expire == null ? '' : (`; expires = ${exdate.toGMTString()}`)
//   document.cookie = `${options.name}=${escape(options.value)}${expiresDay}`
// }
/**
 * 获取cookie
 * @param  {string} name   cookie的名称
 */
// export const getCookies = (options) => {
//   if (document.cookie.length > 0) {
//     let indexStart = document.cookie.indexOf(`${options.name}=`)
//     let indexEnd = 0
//     if (indexStart != -1) {
//       indexStart = indexStart + options.name.length + 1
//       indexEnd = document.cookie.indexOf(';', indexStart)
//       indexEnd == -1 && (indexEnd = document.cookie.length)
//       return unescape(document.cookie.substring(indexStart, indexEnd))
//     }
//   } else {
//     return ''
//   }
// }
/**
 * 获取缓存
 */
export const getCache = (options) => {
  var key = options.key
  var type = options.type || 'sessionStorage'
  var dataType = options.dataType || 'json' // 缓存的数据类型，string或json
  var cacheType // 缓存类型,sessionStorage或localStorage
  if (type === 'sessionStorage') {
    cacheType = sessionStorage
  } else if (type === 'localStorage') {
    cacheType = localStorage
  } else {
    return false
  }

  var dateTime = new Date()
  var timeStamp = dateTime.getTime()
  var efficientTime = sessionStorage.getItem(key + '-time') || timeStamp + 1000 * 60 * 60 * 24 * 365 // 默认存储时间为1年
  var timeInterval = efficientTime - timeStamp

  if (timeInterval >= 0) {
    var value = cacheType.getItem(key)
    if (!value) {
      return false
    }
    if (dataType === 'json') {
      try {
        value = JSON.parse(cacheType.getItem(key))
        if (typeof value === 'object' && Object.prototype.toString.call(value).toLowerCase() === '[object object]' && !value.length) {
          // value.expiredTime = new Date(parseInt(efficientTime))
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

/**
 * category 转中文
 */
export const getCategoryStr = (category) => {
  let categoryStr = ''
  switch (category) {
    case 'zb-all':
      categoryStr = '找版'
      break;
    case 'jb-all':
      categoryStr = '剪版'
      break;
    case 'all-all':
      categoryStr = '大货'
      break;
    case 'dhls-all':
      categoryStr = '流水'
      break;
    default:
      categoryStr = ''
  }
  return categoryStr
}

/**
 * source 转中文
 */
export const getSourceStr = (source) => {
  let sourceStr = ''
  switch (source) {
    case 1:
      sourceStr = '红杉移动'
      break;
    case 2:
      sourceStr = 'app'
      break;
    case 3:
      sourceStr = '微信提交'
      break;
    default:
      sourceStr = ''
  }
  return sourceStr
}

/**
 * 大货类型type转中文
 */
export const getDhTypeStr = (type) => {
  let typeStr = ''
  switch (type) {
    case 1:
      typeStr = '服务单'
      break;
    case 2:
      typeStr = '贸易单'
      break;
    default:
      typeStr = '未知大货类型'
  }
  return typeStr
}

/**
 * fundType 转中文
 */
export const getFundTypeStr = (fundType) => {
  let fundTypeStr = ''
  switch (fundType) {
    case 2:
      fundTypeStr = '定金'
      break;
    case 3:
      fundTypeStr = '尾款'
      break;
    case 5:
      fundTypeStr = '全款'
      break;
    case 7:
      fundTypeStr = '差价'
      break;
    default:
      fundTypeStr = '未知款项类型'
  }
  return fundTypeStr
}

/**
 * payWay 转中文
 */
export const getPayWayStr = (payWay) => {
  let payWayStr = ''
  switch (payWay) {
    case 'alipay':
      payWayStr = '支付宝手机支付'
      break;
    case 'tecent_wx':
      payWayStr = '微信支付'
      break;
    case 'offline':
      payWayStr = '线下支付'
      break;
    default:
      payWayStr = ''
  }
  return payWayStr
}
/**
 * payStatus 转中文
 */
export const getPayStatusStr = (payStatus) => {
  let payStatusStr = ''
  switch (payStatus) {
    case 1:
      payStatusStr = '申请中'
      break;
    case 2:
      payStatusStr = '受理中'
      break;
    case 3:
      payStatusStr = '支付成功'
      break;
    case -1:
      payStatusStr = '受理失败'
      break;
    case -2:
      payStatusStr = '支付失败'
      break;
    case -3:
      payStatusStr = '已删除'
      break;
    default:
      payStatusStr = '状态有误'
  }
  return payStatusStr
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

export const copy = (obj, to) => {
  if (obj instanceof Object) {
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) to[attr] = obj[attr];
    }
  }
}

const newFetch = (reqOption) => {
  let url = reqOption.url
  const fetchConf = {
    credentials: 'include',
  }
  if (reqOption.method != 'get') {
    if (reqOption.dataType === 'FormData') {
      Object.assign(fetchConf, {
        method: reqOption.method,
        body: reqOption.data
      })
    } else {
      Object.assign(fetchConf, {
        method: reqOption.method,
        headers: {
          'Content-Type': reqOption.contentType || 'application/x-www-form-urlencoded',
        },
        body: reqOption.contentType === 'application/x-www-form-urlencoded' ? serialize(reqOption.data) : JSON.stringify(reqOption.data)
      })
    }
  } else {
    let serializeData = serialize(reqOption.data)
    if (serializeData) {
      if (url.indexOf('?') > -1) {
        url += serializeData
      } else {
        url += '?' + serializeData
      }
    }
  }
  return Fetch(url, fetchConf)
}

export const newRequest = (params) => {
  const defaults = {
    method: params.method || 'post'
  }
  const reqOption = Object.assign({}, defaults, params)
  return newFetch(reqOption).then((response) => response.json()).then((json) => {
    if (json.success == 10009) {
      // alert('后端报错,错误码=10009')
      // console.log('10009回来的东西', json)
      // sessionStorage.removeItem('currentUser')
      // location.href = '/login'
      Message({
        type: 'error',
        message: '后端报错,错误码=10009',
        duration: 1200,
        onClose() {
          sessionStorage.removeItem('currentUser')
          location.href = '/login'
        }
      })
    }
    return json
  })
}

export const dateFormat = (value, format) => {
  let date = new Date(value);
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return format;
}
