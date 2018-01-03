<template>
  <div class="hs-oms">
    <ul>
      <li @click="to('checkFindList')" :class="{'current' : currentRuoteName == 'checkFindList'}">
        <strong>找版</strong>
      </li>
      <li @click="to('checkCutList')" :class="{'current' : currentRuoteName == 'checkCutList'}">
        <div class="item">
          <strong>剪版</strong>
        </div>
      </li>
      <li @click="to('checkBulkList')" :class="{'current' : currentRuoteName == 'checkBulkList'}">
        <div class="item">
          <strong>大货</strong>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentRuoteName: this.$route.name
    };
  },
  mounted() {},
  methods: {
    to(name) {
      this.$router.push({ 'name': name });
    }
  }
}

</script>
