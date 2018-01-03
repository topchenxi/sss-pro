<style src="./lightbox.scss" lang="scss"></style>
<template>
  <div class="lightbox" v-if="image" @click="!isNoBgClick && close()">
    <lightbox-image :image="image" :key="image"></lightbox-image>
    <div class="lightbox__close" @click="close">X</div>
    <div class="lightbox__operation">
      <el-button @click.native="enlarge" type="primary">放大</el-button>
      <el-button @click.native="narrow" type="primary">缩小</el-button>
      <el-button @click.native="rotate" type="primary">旋转</el-button>
    </div>
    <div class="lightbox__btn prev" @click.stop.prevent="prev">上一张</div>
    <div class="lightbox__btn next" @click.stop.prevent="next">下一张</div>
  </div>
</template>
<script>
import './lightboxDirective'
import store from './lightboxStore'
import lightboxImage from './lightboxImage'
export default {
  components: {
    lightboxImage
  },
  data () {
    return {
      state: store.state,
      isNoBgClick: true
    }
  },
  methods: {
    close () { store.close() },
    next () { store.next() },
    prev () { store.prev() },
    enlarge() {
      store.enlarge()
      window.onresize()
    },
    narrow () {
      store.narrow()
      window.onresize()
    },
    rotate () {
      store.rotate()
      window.onresize()
    }
  },
  computed: {
    image () {
      if (this.state.index !== false) {
        return this.state.images[this.state.group][this.state.index]
      }
    }
  }
}
</script>
