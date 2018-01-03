<template>
  <div>
    <div class="oms-title-wrap">
      <h2>采购商</h2>
      <div class="right">
        <div class="btn-add" @click="$router.push('/customer/save')"> <span class="icon-add"></span> 新增采购商 </div>
      </div>
    </div>
    <div class="containter" v-loading.body="loading">
      <SearchFilter :params="params" @toSearch="getList"></SearchFilter>
      <div class="table-wrap">
        <div class="table-content" :style="{ height : windowHeight - 320 + 'px'}">
          <table class="table">
            <colgroup>
              <!-- 采购商ID -->
              <col width="10%">
              <!-- 企业名称 -->
              <col width="14%">
              <!-- 企业电话 -->
              <col width="10%">
              <!-- 法人姓名 -->
              <col width="10%">
              <!-- 注册手机号 -->
              <col width="10%">
              <!-- 状态 -->
              <col width="5%">
              <!-- 大客户 -->
              <col width="5%">
              <!-- 跟单员 -->
              <col width="10%">
              <!-- 销售员 -->
              <col width="10%">
              <!-- 创建时间 -->
              <col width="10%">
              <!-- 详情 -->
            </colgroup>
            <thead>
              <tr>
                <th>采购商ID</th>
                <th>企业名称</th>
                <th>企业电话</th>
                <th>法人姓名</th>
                <th>注册手机号</th>
                <th>状态</th>
                <th>大客户</th>
                <th>跟单员</th>
                <th>销售员</th>
                <th>创建时间</th>
                <th>详情</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in list" :key="index">
                <!-- 采购商ID -->
                <td title="采购商ID">{{item.number}}</td>
                <!-- 企业名称 -->
                <td title="企业名称" class="ta-l">
                  <span title="已开通徙木" v-if="item.hasOpenedBaitiao==1" class="icon icon-ximu-active"></span>
                  <span title="未开通徙木" v-else class="icon icon-ximu-gray"></span>
                  <span title="已开通雁阵" v-if="item.hasOpenedYanzhen==1" class="icon icon-yanzhen-active"></span>
                  <span title="未开通雁阵" v-else class="icon icon-yanzhen-gray"></span> {{item.company || '--' }}
                </td>
                <!-- 企业电话 -->
                <td title="企业电话" class="ta-l">{{item.tel || '--'}}</td>
                <!-- 法人姓名 -->
                <td title="法人姓名">{{item.corporationName || '--'}}</td>
                <!-- 注册手机号 -->
                <td title="注册手机号">{{item.mobilePhone || '--'}}</td>
                <!-- 状态 -->
                <td title="状态"> <span class="green" v-if="item.status == 1">正常</span> <span class="error" v-else>异常</span> </td>
                <!-- 大客户 -->
                <td title="大客户"> <span v-if="item.large == 1" class="icon icon-vip"></span> <span v-else class="icon icon-vip-disabled"></span> </td>
                <!-- 跟单员 -->
                <td title="跟单员">{{item.followerName || '--'}}</td>
                <!-- 销售员 -->
                <td title="销售员">{{item.salerName || '--'}}</td>
                <!-- 创建时间 -->
                <td title="创建时间">{{item.createTime | date}}</td>
                <!-- 操作 -->
                <td title="详情"> <span @click="$router.push('/customer/detail?id=' + item.id)" class="m10 icon icon-detail"></span> </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Page :total="total" :params="params" @toSearch="getList"></Page>
      </div>
    </div>
  </div>
</template>
<script>
import { getCustomerList } from 'src/common/service';
import SearchFilter from './search.vue';
export default {
  components: {
    SearchFilter
  },
  data() {
    return {
      params: {
        // 关键词
        key: '',
        // 状态
        status: '',
        // 是否开通金融
        hasOpenedFinance: '',
        // 大客户
        largeBox: false,
        // 分页
        pageNumber: 1,
        pageSize: 10,
      },
      total: 0,
      list: [],
      loading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true;
      let params = Object.assign({}, this.params);
      params.large = params.largeBox ? 1 : '';
      delete params.largeBox;
      let res = await getCustomerList(params);
      this.loading = false;
      if (res.success !== '1') return;
      this.list = res.page.result;
      this.total = res.page.totalCount;
    }
  }
};

</script>
