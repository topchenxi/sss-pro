<template>
  <section>
    <div class="oms-title-wrap">
      <h2>订单审核</h2>
    </div>
    <div class="containter" v-loading.body="loading">
      <AuditTabs></AuditTabs>
      <div class="table-wrap">
        <div class="table-content" :style="{ height : windowHeight - 300 + 'px'}">
          <table class="table">
            <thead>
              <tr>
                <th>发布时间</th>
                <th>订单号</th>
                <th>采购商昵称</th>
                <th>公司名称</th>
                <th>注册手机号</th>
                <th>订单状态</th>
                <th>跟单员</th>
                <th>编辑</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tableData" :key="index">
                <!-- 发布时间 -->
                <td>
                  {{item.createTime | date}}
                </td>
                <!-- 订单号 -->
                <td>{{item.number}}</td>
                <!-- 采购商昵称 -->
                <td class="ta-l">{{item.customerNickName}}</td>
                <!-- 公司名称 -->
                <td class="ta-l">{{item.customerCompany}}</td>
                <!-- 注册手机号 -->
                <td>{{item.customerMobilePhone}}</td>
                <!-- 订单状态 -->
                <td>
                  <span class="green" v-if="item.status === 20">待审核</span>
                  <span class="error" v-else-if="item.status === 25">审核不通过</span>
                </td>
                <!-- 跟单员 -->
                <td>{{item.followerName}}</td>
                <!-- 操作 -->
                <td>
                  <span @click="$router.push('/audit/bulk/details?id=' + item.id)" v-if="item.followerName" class="icon icon-editor m10"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Page :total="total" :params="params" @toSearch="getList"></Page>
      </div>
    </div>
  </section>
</template>
<script>
import AuditTabs from 'components/auditTabs.vue';
import { getOrderListByBluk } from 'src/common/service';
export default {
  components: {
    AuditTabs
  },
  data() {
    return {
      tableData: [],
      params: {
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      loading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true;
      let res = await getOrderListByBluk(this.params);
      this.loading = false;
      if (res.success !== '1') return;
      this.tableData = res.page.result;
      this.total = res.page.totalCount;
    }
  }
}

</script>
<style>


</style>
