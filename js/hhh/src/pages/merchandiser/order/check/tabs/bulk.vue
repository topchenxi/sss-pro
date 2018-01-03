<template>
  <div>
    <hsMenu></hsMenu>
    <div class="oms-content mt20">
      <div class="main-wrap">
        <div class="main-content">
          <div class="table-wrap" :style="{ height : windowHeight - 210 + 'px' }">
            <table class="table">
              <colgroup>
              </colgroup>
              <thead>
                <tr>
                  <th>发布时间</th>
                  <th>订单号</th>
                  <th>采购商昵称</th>
                  <th>采购商公司名称</th>
                  <th>采购商注册手机号</th>
                  <th>订单状态</th>
                  <th>跟单员</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list" :key="index">
                  <!-- 发布时间 -->
                  <td>{{item.createTime | date}}</td>
                  <!-- 订单号 -->
                  <td>{{item.number}}</td>
                  <!-- 采购商昵称 -->
                  <td>{{item.customerNickName}}</td>
                  <!-- 采购商公司名称 -->
                  <td>{{item.customerCompany}}</td>
                  <!-- 采购商注册手机号 -->
                  <td>{{item.customerMobilePhone}}</td>
                  <!-- 订单状态 -->
                  <td>
                    <template v-if="item.status === 20">待审核</template>
                    <template v-else-if="item.status === 25">审核不通过</template>
                  </td>
                  <!-- 跟单员 -->
                  <td>{{item.followerName}}</td>
                  <!-- 操作 -->
                  <td>
                    <el-button class="table-btn" @click.native="toDetail(item)" :disabled="!item.followerName">编辑</el-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="empty" v-if="!list.length"></div>
          </div>
          <Page :total="total" :params="params" @toSearch="getList"></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import hsMenu from '../menu.vue';
import { getOrderOfBulk } from 'src/service/merchandiser';
export default {
  components: {
    hsMenu
  },
  data() {
    return {
      params: {
        pageSize: 10,
        pageNumber: 1,
      },
      list: [],
      total: 0,
    }
  },
  methods: {
    toDetail(item) {
      this.$router.push({
        name: 'checkBulkDetails',
        query: {
          id: item.id
        }
      })
    },
    async getList() {
      this.$store.dispatch('changeload', true);
      let res = await getOrderOfBulk(this.params);
      this.$store.dispatch('changeload', false);
      if (res.success !== '1') return;
      this.list = res.page.result;
      this.total = res.page.totalCount;
    }
  },
  mounted() {
    this.getList();
  }
}

</script>
