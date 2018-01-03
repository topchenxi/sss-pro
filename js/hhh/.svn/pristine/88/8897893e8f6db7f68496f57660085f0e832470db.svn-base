<template>
  <div class="hs-oms">
    <ul>
      <li @click="to('bulkRRWaitAudit')" :class="{'current' : currentRuoteName == 'bulkRRWaitAudit'}">
        <div class="item">
          <p>{{count.followerWaitReview}}</p>
          <p>待审核</p>
        </div>
      </li>
      <li @click="to('bulkRRHadAudit')" :class="{'current' : currentRuoteName == 'bulkRRHadAudit'}">
        <div class="item">
          <p>{{count.followerReviewed}}</p>
          <p>已审核</p>
        </div>
      </li>
      <li @click="to('bulkRRFinish')" :class="{'current' : currentRuoteName == 'bulkRRFinish'}">
        <div class="item">
          <p>{{count.followerFinished}}</p>
          <p>已完成</p>
        </div>
      </li>
      <li @click="to('bulkRRCancel')" :class="{'current' : currentRuoteName == 'bulkRRCancel'}">
        <div class="item">
          <p>{{count.followerCanceled}}</p>
          <p>已取消</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { getBulkRRCount } from 'src/service/merchandiser';
export default {
  data() {
    return {
      currentRuoteName: this.$route.name,
      count: {
        'followerCanceled': 0,
        'followerFinished': 0,
        'followerReviewed': 0,
        'followerWaitReview': 0
      }
    };
  },
  mounted() {
    this.getCount();
  },
  methods: {
    async getCount() {
      let res = await getBulkRRCount();
      if (res.success !== '1') return;
      this.count = res;
    },
    to(name) {
      this.$router.push({ 'name': name });
    }
  }
}

</script>
