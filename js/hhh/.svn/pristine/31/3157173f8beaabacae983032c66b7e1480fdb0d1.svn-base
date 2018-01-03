<template>
  <div class="hs-oms">
    <ul>
      <li @click="to('loanSoouyaRefunding')" :class="{'current' : currentRuoteName == 'loanSoouyaRefunding'}">
        <div class="item">
          <p>{{count.toCount}}</p>
          <p>退款中</p>
        </div>
      </li>
      <li @click="to('loanSoouyaRefunded')" :class="{'current' : currentRuoteName == 'loanSoouyaRefunded'}">
        <div class="item">
          <p>{{count.doneCount}}</p>
          <p>已退款</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { getSoouyaRefundCount } from 'src/service/merchandiser';
export default {
  data() {
    return {
      currentRuoteName: this.$route.name,
      count: {
        'doneCount': 0,
        'toCount': 0,
      }
    };
  },
  mounted() {
    this.getCount();
  },
  methods: {
    async getCount() {
      let res = await getSoouyaRefundCount();
      if (res.success !== '1') return;
      this.count = res.obj;
    },
    to(name) {
      this.$router.push({ 'name': name });
    }
  }
}

</script>
