export default function (time, format = 'yyyy-MM-dd HH:mm:ss') {
  if (isNaN(time)) {
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
