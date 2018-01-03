<template>
  <div class="tab-wrap y-tab">
    <el-tabs v-model="activeName" type="card" class="has-link">
      <!-- <el-tab-pane></el-tab-pane> -->
      <el-tab-pane v-for="(item,index) in tabsOptions" :name="item.name" :key="item.name">
        <router-link :to="{name: item.name}" slot="label" tag="a">
          <template v-if="index == 0">
              <span>{{item.label}}({{obj.purchaserWaitReview}})</span>
            </template>
            <template v-if="index == 1">
              <span>{{item.label}}({{obj.purchaserReviewed}})</span>
            </template>
            <template v-if="index == 2">
              <span>{{item.label}}({{obj.purchaserFinished}})</span>
            </template>
            <template v-if="index == 3">
              <span>{{item.label}}({{obj.purchaserCanceled}})</span>
            </template>  
        </router-link>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { request } from 'utils/tool'
export default {
  data() {
    return {
      tabsOptions: [
        {
          label: '待审核',
          name: 'buyerWaitCheck',
          to: 'buyer/buyerwaitcheck'
        },
        {
          label: '已审核',
          name: 'buyerHadCheck',
          to: 'buyer/buyerhadcheck'
        },
        {
          label: '已完成',
          name: 'buyerFinish',
          to: 'buyer/buyerfinish'
        },
        {
          label: '已取消',
          name: 'buyerCancel',
          to: 'buyer/buyercancel'
        }
      ],
      activeName: this.$route.name,
      obj: {
      }
    }
  },
  mounted() {
    this.getTab()
    this.activeName
  },
  methods: {
    getTab() {
      request({
        url: '/redwood/returnreplace/getCount',
        data: {},
        method: 'get',
        contentType: 'application/json'
      }).then((res) => {
        if (res.success == 1) {
          this.obj = res
        }
      })
      console.log(this.obj)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-tabs.has-link {
  & .el-tabs__nav {
    & .el-tabs__item {
      padding: 0;
      &>a {
        padding: 0 15px;
        display: block;
        color: inherit;
        text-decoration: none;
      }
    }
  }
}
</style>

