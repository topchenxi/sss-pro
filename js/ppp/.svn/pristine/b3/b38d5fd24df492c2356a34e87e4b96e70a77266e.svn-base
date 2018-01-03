<template>
  <div>
    <el-menu mode="vertical" :default-active="String($route.meta.index)" theme="light" class="el-menu-vertical-demo">
      <el-submenu tag="span" index="5" v-if="woodClothHunterAdmin | woodSalesLeader | woodFinance">
        <template slot="title">
          <i class="el-icon-menu"></i>找版管理</template>
        <router-link :to="{name: 'findOrderList'}" tag="span">
          <el-menu-item index="5">找版列表</el-menu-item>
        </router-link>
        <router-link :to="{name: 'fndTransform'}" tag="span">
          <el-menu-item index="6">订单转化率</el-menu-item>
          <!--name待处理  -->
        </router-link>
      </el-submenu>

      <router-link :to="{name: 'ziyingCutList'}" tag="span" v-if="woodAdmin | woodFinance | woodCutClothLeader">
        <el-menu-item index="4">
          <i class="el-icon-menu"></i>剪版管理
        </el-menu-item>
      </router-link>
      <router-link :to="{name: 'bulkOrderList'}" tag="span" v-if="woodAdmin | woodPurchaserLeader | woodFinance | woodFollowTeamLeader">
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>大货管理
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script>
import getCache from '@/utils/getCache'
export default {
  components: {
  },
  props: {
  },
  data() {
    const auth = JSON.parse(getCache({
      key: 'currentUser'
    }))
    console.log(auth)
    return {
      defaultIndex: '1',
      woodClothHunterAdmin: auth.woodClothHunterAdmin,
      woodSalesLeader: auth.woodSalesLeader,
      woodFollowAdmin: auth.woodFollowAdmin,
      woodFollowTeamLeader: auth.woodFollowTeamLeader,
      woodCutClothLeader: auth.woodCutClothLeader,
      woodFinance: auth.woodFinance,
      woodAdmin: auth.woodAdmin,
      woodClothHunterLeader: auth.woodClothHunterLeader,
      woodPurchaserLeader: auth.woodPurchaserLeader
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  background-color: #fff;
  .el-menu {
    background-color: #fff;
  }
}
</style>
