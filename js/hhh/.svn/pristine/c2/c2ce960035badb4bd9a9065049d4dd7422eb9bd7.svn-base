<template>
  <section>
    <div class="tab-wrap y-tab">
      <el-tabs v-model="activeName" type="card" class="tabs-container">
        <el-tab-pane v-for="(item, index) in tabsOptions" :name="item.name" :key="item.name">
          <router-link :to="{name: item.name}" slot="label" tag="a">
            <template v-if="index == 0">
              <p>{{item.count}}</p>
              <p> {{item.label}}</p>
            </template>
            <template v-if="index == 1">
              <p>{{item.count}}</p>
              <p>{{item.label}}</p>
            </template>
          </router-link>
        </el-tab-pane>
      </el-tabs>
      <keep-alive>
        <router-view>
        </router-view>
      </keep-alive>
    </div>
  </section>
</template>
<script>
import { sellerRefundingList, sellerRefundedList } from 'src/service/guider'
export default {
  data() {
    return {
      tabsOptions: [{
          label: '退款中',
          name: 'guidershopcompanyrefunding',
          count: 0
        },
        {
          label: '已退款',
          name: 'guiderShopCompanyRefunded',
          count: 0
        }
      ],
      activeName: this.$route.name
    }
  },
  mounted() {
    this.activeName = this.$route.name;
    Promise.all([
      sellerRefundingList({ 'orderStatus': 368 }),
      sellerRefundedList({ 'orderStatus': 100 })
    ]).then(res => {
      this.tabsOptions[0].count = res[0].page.totalCount;
      this.tabsOptions[1].count = res[1].page.totalCount;
    })
  }
}

</script>
