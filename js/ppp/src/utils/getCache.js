export default function (options) {
  const key = options.key
  const type = options.type || 'sessionStorage'
  if (type === 'sessionStorage' || type === 'localStorage') {
    const cache = type === 'sessionStorage' ? sessionStorage : localStorage
    let storage = JSON.parse(cache.getItem(key))
    if (storage) {
      if (storage.hasOwnProperty('expireTime')) {
        const nowTime = +new Date()
        const expireTime = storage.expireTime
        if (expireTime - nowTime >= 0) {
          delete storage.expireTime
        } else {
          cache.removeItem(key)
          return null
        }
      }
      return storage.value
    } else {
      return null
    }
  } else {
    return null
  }
}
