<template>
  <section>
    <div class="tab-wrap y-tab">
      <el-tabs v-model="activeName" type="card" class="has-link tabs-container">
        <el-tab-pane v-for="(item, index) in tabsOptions" :name="item.name" :key="item.name">
          <router-link :to="{name: item.name}" slot="label" tag="a">
            <template v-if="index == 0">
              <p>{{toCount}}</p>
              <p> {{item.label}}</p>
            </template>
            <template v-if="index == 1">
              <p>{{doneCount}}</p>
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
import { newRequest } from 'utils/tool'
export default {
  data() {
    return {
      toCount: 0,
      doneCount: 0,
      tabsOptions: [
        {
          label: '退款中',
          name: 'guiderRrRefunding',
        },
        {
          label: '已退款',
          name: 'guiderRrRefunded',
        }
      ],
      activeName: this.$route.name
    }
  },
  mounted() {
    this.activeName = this.$route.name
    this.getTab()
  },
  methods: {
    getTab() {
      newRequest({
        url: '/redwood/returnReplaceSellerRefund/getSumary',
        data: {},
        contentType: 'application/json',
        method: 'get',
      }).then(res => {
        if (res.success == 1) {
          this.toCount = res.obj.toCount
          this.doneCount = res.obj.doneCount
          this.$store.dispatch('changeload', false)
        } else {
          this.$store.dispatch('changeload', false)
        }
      })
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

