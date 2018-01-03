<template>
  <div id="app" class="app" :class="[$route.meta.bg ? 'newBg': '']">
    <router-view class="view"></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  components: {},
  mounted() {
    // console.log('router', this.$route);
  }
}

</script>
<style lang="scss">
@import '~element-ui/lib/theme-default/index.css';
@import 'src/style/scss/common-style.scss';

</style>
