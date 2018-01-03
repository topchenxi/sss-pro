<template>
  <section class="buy-orderManage-list">
    <el-tabs type="card" v-model="activeName" class="sy-tabs-link">
      <el-tab-pane name="redwoodm">
        <a :href="mLink" slot="label" target="_blank">红杉移动端</a>
      </el-tab-pane>
      <el-tab-pane name="publisjDh">
        <a :href="dhUrl" slot="label" target="_blank">发大货</a>
      </el-tab-pane>
      <el-tab-pane name="dhManageFollow">
        <router-link to="follow" tag="a" slot="label">订单动态</router-link>
      </el-tab-pane>
      <!-- <el-tab-pane name="dhManageRefunding">
        <router-link to="refunding" tag="a" slot="label">供应商退款中</router-link>
      </el-tab-pane> -->
      <el-tab-pane name="dhManageAll">
        <router-link to="all" tag="a" slot="label">全部订单</router-link>
      </el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </section>
</template>

<script>
import FollowUp from 'components/dahuo/followUp'
import All from 'components/dahuo/all'
export default {
  components: {
    FollowUp,
    All
  },
  data() {
    const host = location.href.indexOf('hspc') > -1 || location.href.indexOf('test') > -1 || location.href.indexOf('local') > -1 ? 'http://testmhongshan.soouya.com/' : 'http://mhongshan.soouya.com/'
    return {
      activeName: this.$route.name,
      mLink: `${host}/?category=all-all`,
      dhUrl: `${host}orderPublish.html`,
    }
  },
  // mounted() {
  //   const host1 = local
  //   if (host == 'hspc.soouya.com' || host.indexOf('local') != -1) {
  //     this.webUrl = 'http://testmhongshan.soouya.com/'
  //   } else if (host.indexOf('test') != -1) {
  //     this.webUrl = 'http://testmhongshan.soouya.com/'
  //   } else {
  //     this.webUrl = 'http://mhongshan.soouya.com/'
  //   }
  // }
}
</script>
