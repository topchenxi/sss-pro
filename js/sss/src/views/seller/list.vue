<template>
  <div>
    <div class="oms-title-wrap">
      <h2>供应商</h2>
      <div class="right">
        <div class="btn-add" @click="$router.push('/seller/save')"> <span class="icon-add"></span> 新增供应商 </div>
      </div>
    </div>
    <div class="containter" v-loading.body="loading">
      <SearchFilter :params="params" @toSearch="getSellerList"></SearchFilter>
      <div class="table-wrap">
        <div class="table-content" :style="{ height : windowHeight - 370 + 'px'}">
          <table class="table">
            <colgroup> </colgroup>
            <thead>
              <tr>
                <th>供应商ID</th>
                <th>供应商编号</th>
                <th>注册手机号</th>
                <th>店铺名称</th>
                <th>档口名称</th>
                <th>档口电话</th>
                <th>状态</th>
                <th>搜芽自营</th>
                <th>创建时间</th>
                <th>详情</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in list" :key="index">
                <!-- 供应商ID -->
                <td title="供应商ID">{{item.number}}</td>
                <!-- 供应商编号 -->
                <td title="供应商编号">{{item.serviceNumber || '--' }}</td>
                <!-- 注册手机号 -->
                <td title="注册手机号">{{item.mobilePhone || '--' }}</td>
                <!-- 店铺名称 -->
                <td title="店铺名称"> {{item.company || '--'}} </td>
                <!-- 档口名称 -->
                <td title="档口名称" class="ta-l">
                  <span class="icon icon-passed" v-if="item.shop.company && item.shop.check == 1" title="已通过审核"></span> {{item.shop.company}} </td>
                <!-- 档口电话 -->
                <td title="档口电话">{{item.shop.tel || '--' }}</td>
                <!-- 状态 -->
                <td title="状态">
                  <span class="green" v-if="item.status == 1">激活</span>
                  <span class="nuact" v-if="item.status == 0">未激活</span>
                  <span class="error" v-if="item.status == -2">异常</span>
                </td>
                <!-- 搜芽自营 -->
                <td title="搜芽自营"> <span class="icon icon-ziying" v-if="item.soouya == 1"></span> </td>
                <!-- 创建时间 -->
                <td title="创建时间">{{item.createTime | date}}</td>
                <!-- 操作 -->
                <td title="详情"> <span @click="$router.push('/seller/detail?id=' + item.id)" class="m10 icon icon-detail"></span> </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Page :total="total" :params="params" @toSearch="getSellerList"></Page>
      </div>
    </div>
  </div>
</template>
<script>
import { getSellerList } from 'src/common/service';
import SearchFilter from './search.vue';
export default {
  components: {
    SearchFilter
  },
  data() {
    return {
      params: {
        mobilePhone: '',
        companyLike: '',
        shopCompanyLike: '',
        shopTel: '',
        status: '',
        soouyaBox: false,
        pageSize: 10,
        pageNumber: 1
      },
      total: 0,
      list: [],
      loading: false
    }
  },
  mounted() {
    this.getSellerList()
  },
  methods: {
    async getSellerList() {
      this.loading = true;
      let params = Object.assign({}, this.params, {
        'soouya': this.params.soouyaBox ? 1 : '',
        'shop.companyLike': this.params.shopCompanyLike,
        'shop.tel': this.params.shopTel,
      });
      let res = await getSellerList(params);
      this.loading = false;
      if (res.success !== '1') return;
      this.list = res.page.result;
      this.total = res.page.totalCount;
    }
  }
};

</script>
