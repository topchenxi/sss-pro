<template>
  <div class="hs-oms">
    <ul>
      <li @click="to('checkFindWait')" :class="{'current' : currentRuoteName == 'checkFindWait'}">
        <strong>待通知找版</strong>
      </li>
      <li @click="to('checkFinding')" :class="{'current' : currentRuoteName == 'checkFinding'}">
        <div class="item">
          <strong>找版中</strong>
        </div>
      </li>
      <li @click="to('checkFinded')" :class="{'current' : currentRuoteName == 'checkFinded'}">
        <div class="item">
         <strong>已结束</strong>
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
