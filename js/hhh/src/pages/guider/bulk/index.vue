<template>
  <section>
    <div class="tab-wrap y-tab">
      <el-tabs v-model="activeName" type="card" class="has-link tabs-container">
        <el-tab-pane v-for="(item, index) in tabsOptions" :name="item.type" :key="item.type">
          <router-link :to="{name: item.name, query: { type: item.type }}" slot="label" tag="a">
            <template v-if="index == 0">
              <p>{{all}}</p>
              <p> {{item.label}}</p>
            </template>
             <template v-if="index == 1">
              <p>{{toLadding}}</p>
              <p>{{item.label}}</p>
            </template>
             <template v-if="index == 2">
              <p>{{toCheck}}</p>
              <p>{{item.label}}</p>
            </template>
             <template v-if="index == 3">
              <p>{{toSubmitPay}}</p>
              <p>{{item.label}}</p>
            </template>
            <template v-if="index == 4">
              <p>{{toPay}}</p>
              <p>{{item.label}}</p>
            </template>
            <template v-if="index == 5">
              <p>{{toOut}}</p>
              <p>{{item.label}}</p>
            </template>
            <template v-if="index == 6">
              <p>{{toReceive}}</p>
              <p> {{item.label}}</p>
            </template>
            <template v-if="index == 7">
              <p>{{received}}</p>
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
          label: '全部订单',
          name: 'allOrder',
          type: 'all'
        },
         {
          label: '等待通知提货',
          name: 'allOrder',
          type: 'toLading'
        },
        {
          label: '等待验货',
          name: 'waitInspect',
          type: 'toCheck'
        },
          {
          label: '提交客户支付',
          name: 'allOrder',
          type: 'toSubmitPay'
        },
          {
          label: '等待客户支付',
          name: 'waitPay',
          type: 'waitPay',
        },
        {
          label: '等待出仓',
          name: 'waitOutRepo',
          type: 'waitOutRepo',
        },
        {
          label: '等待客户收货',
          name: 'waitReceipt',
          type: 'waitReceipt',
        },
        {
          label: '客户已收货',
          name: 'hadReceipt',
          type: 'hadReceipt',
        }
      ],
      all: 0,
      toCheck: 0,
      toOut: 0,
      toSubmitPay: 0,
      toPay: 0,
      toReceive: 0,
      received: 0,
      toLadding: 0,
      activeName: this.$route.query.type
    }
  },
  mounted() {
    this.activeName = this.$route.query.type
    var self = this;
    bus.$on('count', function (count) {
      self.all = count.all
      self.toCheck = count.toCheck
      self.toLadding = count.toLadding
      self.toOut = count.toOut
      self.toSubmitPay = count.toSubmitPay
      self.toPay = count.toPay
      self.toReceive = count.toReceive
      self.received = count.received
    });
  },
  watch: {
      // 解决在同一个路由里面点击大货订单table下边的横条不会切换到第一个的问题
      '$route'(to, from) {
       this.activeName = this.$route.query.type
      }
  },
  methods: {
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
