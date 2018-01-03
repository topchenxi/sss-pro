<template>
  <div class="tab-wrap y-tab">
    <el-tabs v-model="activeName" type="card" class="has-link">
      <!-- <el-tab-pane></el-tab-pane> -->
      <el-tab-pane v-for="(item, index) in tabsOptions" :name="item.name" :key="item.name">
        <router-link :to="{name: item.name}" slot="label" tag="a">
          <template v-if="index == 0">
            <span>{{item.label}}({{obj.toCount}})</span>
          </template>
          <template v-if="index == 1">
            <span>{{item.label}}({{obj.doneCount}})</span>
          </template>
        </router-link>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { newRequest } from 'utils/tool'
export default {
  data() {
    return {
      tabsOptions: [
        {
          label: '退款中',
          name: 'soouyaRefund',
          to: 'paymentManage/soouyarefund'
        },
        {
          label: '已退款',
          name: 'hadSoouyaRefund',
          to: 'paymentManage/hadsoouyarefund'
        },
      ],
      activeName: this.$route.name,
      obj: {
      toCount: 0,
      doneCount: 0,
    }
    }
  },
  mounted() {
    this.getTab()
    this.activeName
  },
  methods: {
    getTab() {
      this.obj = {}
      newRequest({
        url: '/redwood/returnReplaceSoouyaRefund/getSumary',
        data: {},
        method: 'get'
      }).then((res) => {
        if (res.success == 1) {
          this.obj = res.obj
        }
      })
    },
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

