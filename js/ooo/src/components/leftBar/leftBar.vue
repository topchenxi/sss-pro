<template>
  <div class="left-bar">
    <p class="title">订单跟踪系统</p>
    <el-menu mode="vertical" :default-active="String($route.meta.index)" theme="light" class="el-menu-vertical-demo">
      <el-submenu tag="span" index="5" v-if="woodClothHunterAdmin | woodSalesLeader | woodFinance | woodGuiderAdmin">
        <template slot="title">
          <span class="icon-find"></span>找版管理</template>
        <router-link :to="{name: 'findAll'}" tag="span">
          <el-menu-item index="5">找版列表</el-menu-item>
        </router-link>
        <router-link :to="{name: 'findTransRate'}" tag="span">
          <el-menu-item index="6">订单转化率</el-menu-item>
          <!--name待处理  -->
        </router-link>
      </el-submenu>
      <router-link :to="{name: 'cutAll'}" tag="span" v-if="woodAdmin | woodFinance | woodCutClothLeader | woodGuiderAdmin">
        <el-menu-item index="4">
          <i class="icon-jianban"></i>剪版管理
        </el-menu-item>
      </router-link>
      <router-link :to="{name: 'bulkOrder'}" tag="span" v-if="woodAdmin | woodPurchaserLeader | woodFinance | woodFollowTeamLeader | woodGuiderAdmin">
        <el-menu-item index="3">
          <i class="icon-dahuo"></i>大货管理
        </el-menu-item>
      </router-link>
      <!-- <router-link :to="{name: 'buyerDebtBulk'}" tag="span" v-if="woodAdmin">
        <el-menu-item index="7">
          <i class="el-icon-menu"></i>采购商欠款记录
        </el-menu-item>
      </router-link> -->
    </el-menu>
  </div>
</template>
<script>
import getCache from '@/utils/getCache'
export default {
  components: {},
  props: {},
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
      woodPurchaserLeader: auth.woodPurchaserLeader,
      woodGuiderAdmin: auth.woodGuiderAdmin
    }
  },
  mounted() { },
  methods: {}
}

</script>
<style lang="scss">
.left-bar {
  background-color: #39ab65;
  .title {
    color: #fff;
    font-size: 20px;
    text-align: center;
  }
  .el-menu {
    margin-top: 0px !important;
    .el-icon-menu {
      color: #fff;
    }
    margin-top: 20px;
    .el-submenu__title {
      color: #fff;
      border-left: 0px solid #39ab65 !important;
      &:hover {
        background-color: #2e9757;
      }
      .el-submenu__icon-arrow {
        color: #fff;
      }
      background-color: #39ab65;
    }
    .el-menu-item {
      color: #fff;
      background-color: #39ab65;
      border-left: 4px solid #39ab65;
      &:hover {
        background-color: #2e9757;
        border-left: 4px solid #2e9757;
      }
      min-width: 100px;
    }
    .is-active {
      color: #fff;
      border-left: 4px solid #4d745e;
      background-color: #2e9757;
      &:hover {
        background-color: #2e9757;
        border-left: 4px solid #4d745e;
      }
    }
    .is-opened {
      background-color: #39ab65;
      border-left: 0px solid #39ab65;
      &:hover {
        background-color: #39ab65;
        border-left: 0px solid #39ab65;
      }
    }
  }
}
</style>
