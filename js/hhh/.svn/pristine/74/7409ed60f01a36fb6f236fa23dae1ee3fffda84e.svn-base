<template id="">
  <div>
    <loading :loading="$store.state.b.loading" />
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </div>
</template>
<script>
import Loading from 'components/loading'
export default {
  components: {
    Loading
    // lightbox
  },
  data () {
    return {
      loading: false
    }
  },
  mounted() {
    // this.getCurrentUser()
  },
  methods: {
  }
}
</script>
<style lang='scss'>

</style>
