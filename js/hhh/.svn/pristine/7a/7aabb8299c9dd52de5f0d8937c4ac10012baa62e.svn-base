<template>
  <div class="go-back">
    <div v-if="goback.back == 1"><router-link class="go" :to="{name: goback.link}">&lt;{{goback.name}}<slot></slot></router-link></div>
    <div v-if="goback.back == 0"><span class="go">{{goback.name}}<slot></slot></span></div>
  </div>
</template>

<script>
export default {
  props: {
    goback: {
      type: Object,
      required: false,
      default: function(a) {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
  .go-back {
    height: 30px;
    line-height: 30px;
    padding: 0 0;
    background: #eff2f7;
    border-bottom: 1px solid #ddd;
    margin-bottom: 5px;
    .go {
      text-decoration: none;
      color: #000;
    }
  }
</style>
