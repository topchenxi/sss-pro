<template>
  <div class="hs-oms">
    <ul>
      <li @click="to('debtOfUncleared')" :class="{'current' : currentRuoteName == 'debtOfUncleared'}">
        <strong>欠款</strong>
      </li>
      <li @click="to('debtOfSubmit')" :class="{'current' : currentRuoteName == 'debtOfSubmit'}">
        <div class="item">
          <strong>已提交对账</strong>
        </div>
      </li>
      <li @click="to('debtOfFinish')" :class="{'current' : currentRuoteName == 'debtOfFinish'}">
        <div class="item">
          <strong>已对账</strong>
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
