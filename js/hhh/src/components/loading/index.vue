<style src="./loading.scss" lang="scss" scoped></style>
<template>
  <div class="y__loading-wrap" v-if="loading">
    <div class="y__loading" >
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      loading: Boolean
    },
    data () {
      return {}
    }
  }
</script>
