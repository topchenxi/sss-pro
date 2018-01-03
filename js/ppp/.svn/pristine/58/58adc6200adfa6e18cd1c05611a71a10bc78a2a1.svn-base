<template>
  <div>
    <SiteHead class="sy-site-head"></SiteHead>
    <main>
      <SiteLeftBar class="sy-site-leftBar"></SiteLeftBar>
      <div class="sy-content-wrap">
        <transition name="fade">
          
            <router-view></router-view>
          
        </transition>
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
  }
}
</script>
<style lang="scss" scoped>
.sy-site-head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
}

main {
  position: fixed;
  top: 51px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}

.sy-content-wrap {
  position: fixed;
  left: 150px;
  top: 51px;
  bottom: 0;
  right: 0;
  padding: 10px 10px 0;
  overflow: auto;
}

.sy-site-leftBar {
  position: fixed;
  left: 0;
  top: 51px;
  width: 150px;
  bottom: 0;
  overflow: auto;
  box-sizing: border-box;
  border-right: 1px solid #ccc;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
