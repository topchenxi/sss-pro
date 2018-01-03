<template>
  <section>
    <div class="tab-wrap y-tab">
      <el-tabs v-model="activeName" type="card" class="has-link tabs-container">
        <el-tab-pane v-for="(item, index) in tabsOptions" :name="item.name" :key="item.name">
          <router-link :to="{name: item.name}" slot="label" tag="a">
            <template v-if="index == 0">
              <p>{{bulkCount}}</p>
              <p> {{item.label}}</p>
            </template>
            <template v-if="index == 1">
              <p>{{cutCount}}</p>
              <p>{{item.label}}</p>
            </template>
          </router-link>
        </el-tab-pane>
      </el-tabs>
        <router-view>
        </router-view>
    </div>
  </section>
</template>
<script>
import bus from './eventBus';
export default {
  data() {
    return {
      tabsOptions: [{
          label: '大货',
          name: 'buyerDebtDahuo',
        },
        {
          label: '剪版',
          name: 'buyerDebtJianban',
        }
      ],
      activeName: this.$route.name,
      bulkCount: 0,
      cutCount: 0
    }
  },
  mounted() {
    this.activeName = this.$route.name
    var self = this;
    bus.$on('countBuyerDebt', function(count) {
      self.bulkCount = count.outRepo
      self.cutCount = count.cut
    });
  },
  methods: {}
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
