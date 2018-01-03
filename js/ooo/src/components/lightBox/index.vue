<template>
  <div>
    <img :src="'http://www.soouya.com' + url" v-for="(url,idx) in value" width="40" height="40" @click="showLightBox(idx)" class="sy-img">
    <div class="sy-light-box" v-if="isShow">
      <div class="sy-btn-wrap">
        <el-button class="zoom-in-btn" type="primary" @click="zoom(.1)">放大</el-button>
        <el-button class="zoom-out-btn" type="primary" @click="zoom(-.1)">缩小</el-button>
        <el-button class="rotate-btn" type="primary" @click="rotate">旋转</el-button>
      </div>
      <i class="el-icon-close close" @click="close"></i>
      <i class="el-icon-arrow-left prev" @click="change(-1)"></i>
      <i class="el-icon-arrow-right next" @click="change(1)"></i>
      <div>
        <img :src="'http://www.soouya.com' + value[currentImgIdx]" :style="style">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['value'],
  data() {
    return {
      isShow: false,
      currentImgIdx: 0,
      window: {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      },
      style: {},
      transformValue: {
        scale: 1,
        rotate: 0
      },
      img: null
    }
  },
  methods: {
    showLightBox(idx) {
      let image = new Image()
      image.src = `http://www.soouya.com${this.value[idx]}`
      image.onload = () => {
        this.img = image
        Object.assign(this.transformValue, {
          scale: 1,
          rotate: 0
        })
        this.setStyle()
        this.currentImgIdx = idx
        this.isShow = true
      }
    },
    setStyle() {
      let image = this.img
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
      let transformValue = this.transformValue
      this.style = {
        position: 'absolute',
        width: width + 'px',
        height: height + 'px',
        left: (window.innerWidth - width) * 0.5 + 'px',
        top: (window.innerHeight - height) * 0.5 + 'px',
        transform: `scale(${transformValue.scale},${transformValue.scale}) rotate(${transformValue.rotate * 90}deg)`
      }
    },
    zoom(val) {
      let transformValue = this.transformValue
      transformValue.scale = transformValue.scale * (1 + val)
      this.setStyle()
    },
    rotate() {
      let transformValue = this.transformValue
      transformValue.rotate = transformValue.rotate + 1 > 3 ? 0 : transformValue.rotate + 1
      this.setStyle()
    },
    change(val) {
      let newIdx = this.currentImgIdx + val
      let maxIdx = this.value.length - 1
      this.showLightBox(newIdx > maxIdx ? 0 : newIdx < 0 ? maxIdx : newIdx)
    },
    close() {
      this.isShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
.sy-light-box {
  z-index: 3000;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #fff;
}

.sy-img {
  margin-right: 10px;
}

.close {
  position: absolute;
  right: 30px;
  top: 20px;
  font-size: 30px;
}

.prev {
  position: absolute;
  top: 0;
  font-size: 60px;
  top: 50%;
  -webkit-transform: translate(50%, -50%);
  -ms-transform: translate(50%, -50%);
  transform: translate(50%, -50%);
}

.next {
  position: absolute;
  right: 0;
  font-size: 60px;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.sy-btn-wrap {
  position: absolute;
  left: 10px;
  top: 10px;
}
</style>
