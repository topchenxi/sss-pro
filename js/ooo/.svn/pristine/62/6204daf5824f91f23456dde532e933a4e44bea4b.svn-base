export default function (options) {
  const cacheType = options.type || 'sessionStorage' // 缓存方式，sessionStorage或localStorage
  const key = options.key // 缓存的key
  let value = {
    value: typeof options.value === 'object' ? JSON.stringify(options.value) : options.value
  }
  const time = parseInt(options.time) // 缓存时间,以毫秒为单位
  if (cacheType === 'sessionStorage' || cacheType === 'localStorage') {
    const cache = cacheType === 'sessionStorage' ? sessionStorage : localStorage
    time && Object.assign(value, {
      expireTime: +new Date() + time
    })
    value = JSON.stringify(value)
    try {
      cache.setItem(key, value)
    } catch (e) {
      console.log(e)
      cache.clear()
      cache.setItem(key, value)
    }
  }
}
