<template>
  <div style="height: 100%;">
    <SiteHead class="sy-site-head"></SiteHead>
    <main class="main-body">
      <SiteLeftBar class="sy-site-leftBar"></SiteLeftBar>
      <div class="sy-content-wrap" :style="{'height': bodyHeight + 'px'}">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
<script>
import SiteHead from '@/components/header/head'
import SiteLeftBar from '@/components/leftBar/leftBar'
export default {
  name: 'layout',
  components: {
    SiteHead,
    SiteLeftBar
  },
  data() {
    return {
      bodyHeight: 600,
    }
  },
  mounted() {
    this.bodyHeight = document.body.clientHeight - 51
    window.addEventListener('resize', this.countHeight)
  },
  methods: {
    countHeight() {
      this.bodyHeight = document.body.clientHeight - 51
    }
  }
}
</script>
<style lang="scss" scoped>
.sy-site-head {
  width: 100%;
  height: 50px;
  // border-bottom: 1px solid #ccc;
}

.main-body {
  margin-left: 0px;
  width: 100%;
  height: calc(100% - 51px);
  position: relative;
}

.sy-content-wrap {
  width: calc(100%);
  position: relative;
  padding: 10px 10px 0 185px;
  overflow: auto;
  background-color: #f9f9f9;
}

.sy-site-leftBar {
  background-color: #39ab65 !important;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 175px;
  height: calc(100%);
  overflow: auto;
  box-sizing: border-box;
  border-right: 1px solid #ccc;
  z-index: 1010;
}

// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.5s;
// }

// .fade-enter,
// .fade-leave-active {
//   opacity: 0;
// }
</style>
