<template>
  <div class="hs-oms">
    <ul>
      <li @click="to('cardWait')" :class="{'current' : currentRuoteName == 'cardWait'}">
        <strong>待换卡头</strong>
      </li>
      <li @click="to('cardHad')" :class="{'current' : currentRuoteName == 'cardHad'}">
        <div class="item">
          <strong>已换卡头</strong>
        </div>
      </li>
      <li @click="to('cardNot')" :class="{'current' : currentRuoteName == 'cardNot'}">
        <div class="item">
          <strong>不换卡头</strong>
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
