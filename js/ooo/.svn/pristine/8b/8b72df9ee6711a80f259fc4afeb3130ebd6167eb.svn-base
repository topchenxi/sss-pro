<template>
  <div @click.stop>
    <div v-if="loading" class="lightbox__loading"></div>
    <transition name="bounce" enter-active-class="animated rollIn" leave-active-class="animated rollOut">
      <img :src="src" class="lightbox__image" :style="style" :key="src">
    </transition>
  </div>
</template>
<script>
import store from './lightboxStore'
export default {
  props: {
    image: String
  },
  data() {
    return {
      state: store.state,
      loading: true,
      src: 'false',
      style: {}
    }
  },
  methods: {
    resizeImage(image) {
      let width = image.width
      let height = image.height
      if (width > window.innerWidth || height > window.innerHeight) {
        const ratio = width / height
        const windowRatio = window.innerWidth / window.innerHeight
        if (ratio > windowRatio) {
          width = window.innerWidth
          height = width / ratio
        } else {
          height = window.innerHeight
          width = height * ratio
        }
      }
      width *= this.state.proportionValue
      height *= this.state.proportionValue
      this.style = {
        width: width + 'px',
        height: height + 'px',
        left: (window.innerWidth - width) * 0.5 + 'px',
        top: (window.innerHeight - height) * 0.5 + 'px'
      }
      const rotateStyle = {
        '-ms-transform': `rotate(${this.state.rotateValue}deg)`, /* IE 9 */
        '-moz-transform': `rotate(${this.state.rotateValue}deg)`, /* Firefox */
        '-webkit-transform': `rotate(${this.state.rotateValue}deg)`, /* Safari and Chrome */
        '-o-transform': `rotate(${this.state.rotateValue}deg)`, /* Opera */
        'transform': `rotate(${this.state.rotateValue}deg)`
      }
      this.style = Object.assign({}, this.style, rotateStyle)
    }
  },
  mounted() {
    const image = new window.Image()
    image.onload = () => {
      this.loading = false
      this.src = this.image
      this.resizeImage(image)
    }
    this.resizeEvent = () => {
      this.resizeImage(image)
    }
    image.src = this.image
    window.addEventListener('resize', this.resizeEvent)
    window.onresize = this.resizeEvent
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeEvent)
  }
}

</script>
