<template>
  <section>
    <div class="tab-wrap y-tab">
      <el-tabs v-model="activeName" type="card" class="tabs-container">
        <el-tab-pane v-for="(item, index) in tabsOptions" :name="item.name" :key="item.name">
          <router-link :to="{name: item.name}" slot="label" tag="a">
            <template v-if="index == 0">
              <p>{{guiderReviewed}}</p>
              <p>{{item.label}}</p>
            </template>
            <template v-if="index == 1">
              <p>{{guiderFinished}}</p>
              <p>{{item.label}}</p>
            </template>
            <template v-if="index == 2">
              <p>{{guiderCanceled}}</p>
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
import { newRequest } from 'utils/tool'
import bus from './eventBus'
export default {
  data() {
    return {
      guiderReviewed: 0,
      guiderFinished: 0,
      guiderCanceled: 0,
      tabsOptions: [{
          label: '退换货中',
          name: 'guiderRring',
        },
        {
          label: '已完成',
          name: 'guiderRrFinish',
        },
        {
          label: '已取消',
          name: 'guiderRrCancel'
        }
      ],
      activeName: this.$route.name
    }
  },
  mounted() {
    this.activeName = this.$route.name
    this.getTab()
    var self = this;
    bus.$on('count', function (count) {
      self.guiderReviewed = count.guiderReviewed
      self.guiderFinished = count.guiderFinished
      self.guiderCanceled = count.guiderCanceled
    })
  },
  methods: {
    getTab() {
      newRequest({
        url: '/redwood/returnreplace/getCount',
        data: {},
        contentType: 'application/json',
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.guiderReviewed = res.guiderReviewed
          this.guiderFinished = res.guiderFinished
          this.guiderCanceled = res.guiderCanceled
        } else {}
      })
    }
  }
}

</script>
