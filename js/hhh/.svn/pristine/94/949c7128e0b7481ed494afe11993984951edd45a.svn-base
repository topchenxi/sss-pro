<template>
  <section style="min-width:1300">
    <Tabs></Tabs>
    <!--参数名待修改  -->
    <div class="search-box">
      <el-input placeholder="订单号/采购商/供应商" v-model="requestParams.keyword" style="width:230px; margin-left:20px;" @keyup.enter.native="search"></el-input>
      <el-button type="primary" @click.native="search" style="margin-left:20px;">搜索</el-button>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border>
        <el-table-column prop="serviceNumber" align="left" label="订单号"></el-table-column>
        <el-table-column prop="createTime" align="left" label="申请退款时间" :formatter="formatTime"></el-table-column>
        <el-table-column prop="purcahserReviewTime" align="left" label="采购审核退款时间" :formatter="formatTime"></el-table-column>
        <el-table-column align="right" label="订单总金额" >
          <template scope="scope">
            <span>￥{{scope.row.saleMoney | formatMoney}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="customerCompany" align="left" label="采购商"></el-table-column>
        <el-table-column prop="shopCompany" align="left" label="供应商"></el-table-column>
        <el-table-column align="center" label="品类">
          <template scope="scope">
            <template v-if="scope.row.productType == 0">
              <span>花型</span>
            </template>
            <template v-if="scope.row.productType == 1">
              <span>面料</span>
            </template>
            <template v-if="scope.row.productType == 2">
              <span>辅料</span>
            </template>
            <template v-if="scope.row.productType == 3">
              <span>底布</span>
            </template>
            <template v-if="scope.row.productType == 4">
              <span>花布</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" label="货源">
          <template scope="scope">
            <template v-if="scope.row.productSource == 0">
              <span>现货</span>
            </template>
            <template v-if="scope.row.productSource == 1">
              <span>订货</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="采购数量" align="left">
          <template scope="scope">
            <span>{{scope.row.totalQuantity}}{{scope.row.quantityUnit}}/{{scope.row.colorCount}}色</span>
          </template>
        </el-table-column>
        <el-table-column label="供应商退款" align="right">
          <template scope="scope">
            <span>￥{{scope.row.sellerRefund | formatMoney}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" min-width="150px;">
          <template scope="scope">
            <template>
              <!--按钮事件  -->
              <router-link :to="{name: 'newDetail', query: {id:scope.row.id}}">
                <el-button size="mini" type="primary">详情</el-button>
              </router-link>
              <el-tooltip placement="top">
                <span slot="content">{{scope.row.reason}}</span>
                <span style="font-size:13px;color:#20A0FF;margin-left:6px;display:inline-block">查看退款原因</span>
              </el-tooltip>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
     <div class="page-box">
      <Pagination :pageSize="page.pageSize" :page="page.pageNumber" :total="page.totalCount" :options="requestParams" :render="search"></Pagination>
    </div>
  </section>
</template>

<script>
import Tabs from './Tab.vue'
// import config from '../data.json'
import Pagination from 'components/pagination.vue'
import { newRequest } from 'utils/tool'
export default {
  components: {
    Tabs,
    Pagination,
  },
  data() {
    return {
      requestParams: {
        keyword: '',
        orderStatus: 368,
        pageSize: 10,
        pageNumber: 1,
      },
      tableData: [],
      page: {
        pageSize: 10,
        pageNumber: 1,
        totalCount: 10,
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      newRequest({
        url: '/redwood/returnReplaceOnlyRefund/list',
        method: 'get',
        data: this.requestParams,
        contentType: 'application/json'
      }).then((res) => {
        if (res.success == 1) {
          this.tableData = res.page.result
          this.page.pageSize = res.page.pageSize
          this.page.pageNumber = res.page.pageNumber
          this.page.totalCount = res.page.totalCount
        } else {
          this.$message.error(res.msg)
        }
      })
      this.$store.dispatch('changeload', false)
    },
    search() {
      this.getData()
    }
  }
}
</script>

<style scoped>
.search-box {
  padding-bottom: 8px;
}

.table-box {
  margin-top: 8px;
}
.page-box {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  opacity: 1.0;
  z-index: 20;
}
</style>
