<template>
  <section class="buy-orderManage-list">
    <el-tabs type="card" v-model="activeName" class="sy-tabs-link">
      <el-tab-pane name="redwoodm">
        <a :href="mLink" slot="label" target="_blank">红杉移动端</a>
      </el-tab-pane>
      <el-tab-pane name="buyerOrderManageFollow">
        <router-link to="follow" tag="a" slot="label">订单动态</router-link>
      </el-tab-pane>
      <el-tab-pane name="buyerOrderManageAll">
        <router-link to="all" tag="a" slot="label">全部订单</router-link>
      </el-tab-pane>
    </el-tabs>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
    const host = location.href.indexOf('hspc') > -1 || location.href.indexOf('test') > -1 ? 'http://testmhongshan.soouya.com' : 'http://mhongshan.soouya.com/'
    return {
      activeName: this.$route.name,
      mLink: `${host}/?category=all-all`
    }
  }
}
</script>
