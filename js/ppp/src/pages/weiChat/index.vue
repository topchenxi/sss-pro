<template>
  <section>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <router-view></router-view>
  </section>
</template>

<script>
// import
export default {
  mounted() {
    document.body.addEventListener('touchstart', function() {
      // Toast({
      //   message: res.msg,
      //   position: 'bottom',
      //   duration: 2000,
      // })
    })
  }
}
</script>

<style>

</style>
