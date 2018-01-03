import Fetch from 'isomorphic-fetch'
import { Message } from 'element-ui'
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
  if (conf.method != 'get') {
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
          'Content-Type': conf.contentType || 'application/x-www-form-urlencoded',
          // 'Cache-Control': 'no-cache',
          // 'expires': (new Date()).getTime(),
          // 'max-age': 0
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
    method: params.method || 'post'
  }
  const reqOtion = Object.assign({}, defaults, params)
  return fetch(reqOtion).then((response) => response.json()).then((json) => {
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
    } else {
      if (callBack) {
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
        value = JSON.parse(cacheType.getItem(key));
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
 ** 加法函数，用来得到精确的加法结果
 * @author robin
 * @func
 ** @desc 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** @example 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export const culAdd = (arg1, arg2) => {
  let r1
  let r2
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  const c = Math.abs(r1 - r2)
  const m = Math.pow(10, Math.max(r1, r2))
  if (c > 0) {
    const cm = Math.pow(10, c)
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', '')) * cm
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm
      arg2 = Number(arg2.toString().replace('.', ''))
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''))
    arg2 = Number(arg2.toString().replace('.', ''))
  }
  return (arg1 + arg2) / m
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
  let r1
  let r2
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  const m = Math.pow(10, Math.max(r1, r2)) // last modify by deeka //动态控制精度长度
  return (arg1 * m - arg2 * m) / m
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
  let m = 0
  const s1 = arg1.toString()
  const s2 = arg2.toString()
  try {
    if (s1.split('.')[1]) {
      m += s1.split('.')[1].length
    }
  } catch (e) {
    console.log(e)
  }
  try {
    if (s2.split('.')[1]) {
      m += s2.split('.')[1].length
    }
  } catch (e) {
    console.log(e)
  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
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
  let t1 = 0
  let t2 = 0
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {
    console.log(e)
  }
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {
    console.log(e)
  }
  const r1 = Number(arg1.toString().replace('.', ''))
  const r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}

export const getCurrentTime = () => {
  const addZero = (s) => {
    return s < 10 ? '0' + s : s
  }
  const now = new Date()
  const year = now.getFullYear()
  const month = addZero(Number(now.getMonth() + 1))
  const day = addZero(Number(now.getDate()))
  const hour = addZero(Number(now.getHours()))
  const minute = addZero(Number(now.getMinutes()))
  const second = addZero(Number(now.getSeconds()))
  const getTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  return new Date(getTime).getTime() // 毫秒数，转换时要*1000
}
// 距离周
export const distanceWeekTime = () => {
  const currentDate = getCurrentTime()
  const after7Date = currentDate - 7 * 24 * 3600 * 1000
  return new Date(after7Date).getTime()
}
// 距离月
export const distanceMonthTime = () => {
  const addZero = (s) => {
    return s < 10 ? '0' + s : s
  }
  const time = new Date()
  const currentDate = formatTimeString(time.valueOf()) // 显示yyyy-MM-dd HH:mm:ss
  const currentMonth = time.getMonth()
  const addZeroCurrentMonthNew = addZero(time.getMonth())
  const addZeroCurrentMonthOld = addZero(time.getMonth() + 1)
  const currentYear = time.getFullYear()
  let beforeMonthDate
  if (currentMonth === 0) { // 当前月是一月份时，跨年计算
    beforeMonthDate = currentDate.replace(currentYear, currentYear - 1)
  } else {
    beforeMonthDate = currentDate.replace(('-' + addZeroCurrentMonthOld), '-' + addZeroCurrentMonthNew)
  }
  return beforeMonthDate
}
// 距离年
export const distanceYearTime = () => {
  const currentDateTime = getCurrentTime()
  const year = new Date().getFullYear()
  const currentDateString = formatTimeString(currentDateTime)
  return currentDateString.replace(year, year - 1)
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
// 数组去重
export const unique = (arr) => {
  const result = []
  const json = {};
  for (var i = 0, len = arr.length; i < len; i++) {
    if (!json[arr[i]]) {
      json[arr[i]] = 1
      result.push(arr[i]) // 返回没被删除的元素
    }
  }
  return result
}
// 判断数组元素是否重复
export const isRepeat = (arr) => { // arr是否有重复元素
  const hash = {}
  for (var i in arr) {
    if (hash[arr[i]]) return true
    hash[arr[i]] = true
  }
  return false
}
// 生成随机数
export const randombetween = (min, max) => {
  return min + (Math.random() * (max - min + 1))
}
// 操作cookie
const setCookie = (cname, cvalue, exdays) => {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + '; ' + expires
}
const getCookie = function(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return ''
}
export const Cookie = {
  setCookie,
  getCookie
}
// 深度拷贝对象
export const extend = (obj) => {
  var o = obj.constructor == Object ? new obj.constructor() : new obj.constructor(obj.valueOf())
  for (var key in obj) {
    // if (o[key] != obj[key]) {
    //   if (typeof (obj[key]) == 'object') {
    //     o[key] = extend(obj[key])
    //   } else {
    //     o[key] = obj[key];
    //   }
    // }
    o[key] = obj[key];
  }
  return o
}

export const deepCopy = (source) => {
  var result;
  (source instanceof Array) ? (result = []) : (result = {});
  for (var key in source) {
    result[key] = (typeof source[key] === 'object') ? deepCopy(source[key]) : source[key];
  }
  return result
}

/**
 * [zeroPadding 小于10的数字补0，必填]
 * @param  {[Int]} value [description]
 * @return {[String]}       [description]
 */
export function zeroPadding(value) {
  return value < 10 ? `0${value}` : value
}

/**
 * [_isDateStrSeparatorCh 判断日期格式字符串的分隔符是否是中文]
 * @param  {[String]} str [必填]
 * @return {[String]}     [分隔符]
 */
function _getDateStrSeparator(str, startIndex, endIndex) {
  const startIndexs = startIndex || 4
  const endIndexs = endIndex || 5
  let separator = str.slice(startIndexs, endIndexs)
  if (separator === '年' || separator === '月') {
    separator = 'Ch'
  }
  return separator
}

/**
 * [_isDateStrSeparatorCh 判断日期格式字符串的分隔符是否是中文]
 * @param  {[String]} str [必填]
 * @return {[String]}     [分隔符]
 */
function _isDateStrSeparatorCh(str) {
  if (str.indexOf('年') != -1 || str.indexOf('月') != -1) {
    return true;
  }
  return false;
}
/**
 * [getFormatDateStr 获得指定日期格式的字符串]
 * @param  {[String or Date]}  date  [要转换的日期，必填]
 * @param  {[String]}  dateFormatStr     [要转化的目标格式，必填，2016-11-22之间的分隔符可任意，可选项：
 * 'yyyy-mm-dd hh:mm:ss','yyyy/mm/dd hh:mm:ss','yyyy.mm.dd hh:mm:ss','yyyy年mm月dd hh:mm:ss',
 * 'yyyy-mm-dd hh:mm',
 * 'mm-dd hh:mm',
 * 'yyyy-mm-dd',
 * 'mm-dd',
 * 'hh:mm:ss',
 * 'hh:mm'
 * ]
 * @return {[String]}                [时间格式字符串]
 */
export const getFormatDateStr = (date, dateFormatStr) => {
  if (!(date instanceof Date)) {
    if (date.indexOf('-') != -1) {
      date.replace(/-/g, '/')
    }
    date = new Date(date);
  }

  dateFormatStr = dateFormatStr.toLowerCase();
  if (!dateFormatStr) {
    return false;
  }
  let returnStr = ''
  let separator = _getDateStrSeparator(dateFormatStr)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  if (/^yyyy(.{1})mm(.{1})dd hh:mm:ss$/.test(dateFormatStr)) {
    if (_isDateStrSeparatorCh(dateFormatStr)) {
      returnStr = `${year}年${zeroPadding(month)}月${zeroPadding(day)}日`;
    } else {
      separator =
        returnStr = `${year}${separator}${zeroPadding(month)}${separator}${zeroPadding(day)}`;
    }
    returnStr += ` ${zeroPadding(hour)}:${zeroPadding(minute)}:${zeroPadding(second)}`;
  } else if (/^yyyy(.{1})mm(.{1})dd hh:mm$/.test(dateFormatStr)) {
    if (_isDateStrSeparatorCh(dateFormatStr)) {
      returnStr = `${year}年${zeroPadding(month)}月${zeroPadding(day)}日`;
    } else {
      returnStr = `${year}${separator}${zeroPadding(month)}${separator}${zeroPadding(day)}`;
    }
    returnStr += ` ${zeroPadding(hour)}:${zeroPadding(minute)}`;
  } else if (/^mm(.{1})dd hh:mm$/.test(dateFormatStr)) {
    if (_isDateStrSeparatorCh(dateFormatStr)) {
      returnStr = `${zeroPadding(month)}月${zeroPadding(day)}日`;
    } else {
      separator = _getDateStrSeparator(dateFormatStr, 2, 3);
      returnStr = `${zeroPadding(month)}${separator}${zeroPadding(day)}`;
    }
    returnStr += ` ${zeroPadding(hour)}:${zeroPadding(minute)}`;
  } else if (/^yyyy(.{1})mm(.{1})dd$/.test(dateFormatStr)) {
    if (_isDateStrSeparatorCh(dateFormatStr)) {
      returnStr = `${year}年${zeroPadding(month)}月${zeroPadding(day)}日`;
    } else {
      returnStr = `${year}${separator}${zeroPadding(month)}${separator}${zeroPadding(day)}`;
    }
  } else if (/^mm(.{1})dd$/.test(dateFormatStr)) {
    if (_isDateStrSeparatorCh(dateFormatStr)) {
      returnStr = `${zeroPadding(month)}月${zeroPadding(day)}日`;
    } else {
      separator = _getDateStrSeparator(dateFormatStr, 2, 3);
      returnStr = `${zeroPadding(month)}${separator}${zeroPadding(day)}`;
    }
  } else if (/^hh:mm:ss$/.test(dateFormatStr)) {
    returnStr = `${zeroPadding(hour)}:${zeroPadding(minute)}:${zeroPadding(second)}`;
  } else if (/^hh:mm$/.test(dateFormatStr)) {
    returnStr = `${zeroPadding(hour)}:${zeroPadding(minute)}`;
  }
  return returnStr
}

// 根据数组对象里面某个值排序
export const sortByObject = (name) => {
  return function(o, p) {
    var a, b;
    if (typeof o === 'object' && typeof p === 'object' && o && p) {
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
      console.log('error')
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
      // console.log(1, reqOption.data);
      Object.assign(fetchConf, {
        method: reqOption.method,
        body: reqOption.data
      })
    } else {
      // console.log(2, reqOption.data);
      Object.assign(fetchConf, {
        method: reqOption.method,
        headers: {
          'Content-Type': reqOption.contentType || 'application/x-www-form-urlencoded',
        },
        body: reqOption.contentType === 'application/x-www-form-urlencoded' ? serialize(reqOption.data) : JSON.stringify(reqOption.data)
      })
    }
  } else {
    if (typeof reqOption.data == 'object' && !reqOption.data._time) {
      reqOption.data._time = new Date().getTime();
    }
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

export const newRequest = (params, callBack) => {
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
    } else {
      if (callBack) {
        callBack(json)
      } else {
        return json
      }
    }
  })
}

export const removeArrayItem = (list, index) => {
  if (!(list instanceof Array)) return list
  if (list.length == 1 && index == 0) return []
  let save = list.slice(0, index)
  let last = list.slice(index + 1)
  return save.concat(last)
}

export const alertMessage = (msg, type, callBack) => {
  Message({
    type: type || 'error',
    message: msg,
    duration: 1500,
    onClose: () => {
      if (callBack instanceof Function) {
        callBack.apply(this, [])
      }
    }
  })
}
export const getOffset = (element) => {
  let pos = { top: 0, left: 0 }
  if (element.offsetParent) {
    while (element.offsetParent) {
      pos.top += element.offsetTop
      pos.left += element.offsetLeft
      element = element.offsetParent
    }
  } else if (element.x) {
    pos.left += element.x
  } else if (element.y) {
    pos.top += element.y
  }
  return pos
}
