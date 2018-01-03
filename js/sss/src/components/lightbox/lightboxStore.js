class Lightboxstore {
  constructor () {
    this.state = {
      images: {},
      index: false,
      group: false,
      rotateValue: 0,
      proportionValue: 1
    }
    if (this.state.group) {
      this.state.images[this.state.group] = []
    }
  }
  addImage (url, group) {
    if (this.state.images[group] === undefined) {
      this.state.images[group] = []
    }
    return this.state.images[group].push(url) - 1
  }
  open (url, group) {
    this.state.group = group
    this.state.images[group].map((image, key) => {
      if (image === url) {
        this.state.index = key
      }
    })
  }
  close () {
    this.state.index = false
  }
  next () {
    this.state.index ++
    if (this.state.index >= this.state.images[this.state.group].length) {
      this.state.index = 0
    }
  }
  prev () {
    this.state.index --
    if (this.state.index < 0) {
      this.state.index = this.state.images[this.state.group].length - 1
    }
  }

  remove (url, group) {
    this.state.images[group] = []
    // this.state.images[group] = this.state.images[group].map(image => {
    //   if (image.url !== url) {
    //     return image
    //   }
    // })
  }

  enlarge () { // 放大
    this.state.proportionValue *= 1.2
  }

  narrow () { // 缩小
    this.state.proportionValue /= 1.2
  }

  rotate () { // 旋转
    this.state.rotateValue += 90
    if (this.state.rotateValue > 360) {
      this.state.rotateValue = 90
    }
  }
}
export default new Lightboxstore()
