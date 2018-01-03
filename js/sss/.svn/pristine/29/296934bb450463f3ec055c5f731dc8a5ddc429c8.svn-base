<template>
  <div v-loading.body="fullscreenLoading">
    <div class="oms-title-wrap">
      <h2>供应商审核</h2>
    </div>
    <div class="containter" v-loading.body="loading">
      <SearchFilter :params="params" @toSearch="getShopList"></SearchFilter>
      <div class="table-wrap">
        <div class="table-content" :style="{ height : windowHeight - 320 + 'px'}">
          <table class="table">
            <colgroup>
              <col width="10%">
              <!-- 档口名称 -->
              <col width="20%">
              <col width="15%">
              <!-- 档口地址 -->
              <col width="25%">
              <col width="10%">
              <col width="10%">
            </colgroup>
            <thead>
              <tr>
                <th>日期</th>
                <th>档口名称</th>
                <th>档口电话</th>
                <th>档口地址</th>
                <th>添加人</th>
                <th>状态</th>
                <th>审核操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in list" :key="index">
                <!-- 日期 -->
                <td>{{item.createTime | date}}</td>
                <!-- 档口名称 -->
                <td class="ta-l">{{item.company}}</td>
                <!-- 档口电话 -->
                <td>{{item.tel}}</td>
                <!-- 档口地址 -->
                <td class="ta-l">
                  {{ (item.province==undefined?'':item.province) + (item.city==undefined?'':item.city)+ (item.area==undefined?'':item.area)+ (item.addr==undefined?'':item.addr)}}
                </td>
                <!-- 添加人 -->
                <td>{{item.createrName}}</td>
                <!-- 状态 -->
                <td>
                  <span v-if="item.check == 0">未审核</span>
                  <span class="green" v-if="item.check == 1">已审核</span>
                  <span class="error" v-if="item.check == -1">已废弃</span>
                </td>
                <!-- 审核操作 -->
                <td>
                  <span title="通过" v-if="item.check !=  1" class="m10 icon icon-pass" @click='updateCheck(item.id,1)'></span>
                  <span title="通过" v-if="item.check ==  1" class="m10 icon icon-pass-disabled"></span>
                  <span title="废弃" v-if="item.check != -1" class="m10 icon icon-del" @click='updateCheck(item.id,-1)'></span>
                  <span title="废弃" v-if="item.check == -1" class="m10 icon icon-del-disabled"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Page :total="total" :params="params" @toSearch="getShopList"></Page>
      </div>
    </div>
  </div>
</template>
<script>
import { getSellerAuditList, chgSellerStatus } from 'src/common/service';
import SearchFilter from './search.vue';
export default {
  components: {
    SearchFilter
  },
  data() {
    return {
      fullscreenLoading: false,
      params: {
        check: '',
        key: '',
        pageSize: 10,
        pageNumber: 1
      },
      list: [],
      total: 0,
      loading: true
    };
  },
  mounted() {
    this.getShopList()
  },
  methods: {
    async updateCheck(id, check) {
      if (!id) return;
      const option = {
        confirmButtonText: check == 1 ? '通过' : '立即废弃',
        cancelButtonText: '取消',
        type: 'warning'
      };
      try {
        const dlgMessage = check == 1 ? '确定审核通过该用户吗?' : '确定废弃该用户吗?';
        let msgRes = await this.$confirm(dlgMessage, '提示', option);
        if (msgRes !== 'confirm') return;
        let params = {
          'id': id,
          'check': check
        };
        let res = await chgSellerStatus(params);
        if (res.success !== '1') return;
        this.getShopList();
        this.$message.success(res.msg);
      } catch (error) {
        console.log('已取消');
      }
    },
    async getShopList() {
      this.loading = true;
      let res = await getSellerAuditList(this.params);
      this.loading = false;
      if (res.success !== '1') return;
      this.list = res.page.result;
      this.total = res.page.totalCount;
    }
  }
};

</script>
