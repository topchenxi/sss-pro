<template>
  <section v-loading.body="fullScreenLoading">
    <div class="search-content">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input @keyup.enter.native="getData" v-model="reqParams.key" placeholder="订单号/供应商名称/采购商名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click.native="getData">搜索</el-button>
          <el-button @click.native="reset">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <Tab></Tab>
    <div class="el-bulkTable-content">
      <el-table :data="tableData" :height="tableHeight" border>
        <el-table-column label="大货类型" prop="" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">服务单</span>
            <span v-if="scope.row.type == 2">贸易单</span>
            <span v-if="scope.row.type == 3">采购单</span>
          </template>
        </el-table-column>
        <el-table-column label="订单号" prop="number" width="200" align="left"></el-table-column>
        <el-table-column label="订单总金额" prop="saleMoney" width="120" align="right" :formatter="formatNumber"></el-table-column>
        <el-table-column label="申请退款时间  " prop="createTime" width="160" align="left" :formatter="formatTime"></el-table-column>
        <el-table-column label="金融客户" prop="" width="100">
          <template slot-scope="scope">
            <span class="icon-baitiao" v-if="scope.row.customerHasOpenedBaitiao == 1"></span>
            <span class="icon-feibaitiao" v-if="scope.row.customerHasOpenedBaitiao == 0"></span>
            <span class="icon-yanzhen" v-if="scope.row.customerHasOpenedYanzhen == 1"></span>
            <span class="icon-feiyanzhen" v-if="scope.row.customerHasOpenedYanzhen == 0"></span>
          </template>
        </el-table-column>
        <el-table-column label="采购商名称" prop="customerCompany" width="180" align="left"></el-table-column>
        <el-table-column label="供应商名称" prop="showShopCompany" width="160" align="left"></el-table-column>
        <el-table-column label="品类" prop="" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.category == 1">面料</span>
            <span v-if="scope.row.category != 1">辅料</span>
          </template>
        </el-table-column>
        <el-table-column label="货源" prop="" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.productSource == 0">现货</span>
            <span v-if="scope.row.productSource == 1">订货</span>
          </template>
        </el-table-column>
        <el-table-column label="采购数量" prop="" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.quantity | formatNumber}}{{scope.row.quantityUnit}}/{{scope.row.colorNumber}}色</span>
          </template>
        </el-table-column>
        <el-table-column label="供应商退款金额" prop="refundMoney" width="120" align="right" :formatter="formatNumber"></el-table-column>
        <el-table-column label="跟单员" prop="" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.type < 3">{{scope.row.followerName}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="买货员" prop="purchaserName" width="120" align="left"></el-table-column>
        <el-table-column label="销售员" prop="salerName" width="120" align="left"></el-table-column>
        <el-table-column label="采购员" prop="guiderName" width="120" align="left"></el-table-column>
        <el-table-column label="操作" prop="" width="150" align="left" fixed="right">
          <template slot-scope="scope">
           <!--  <router-link :to="{name: 'bulkDetail', query: {id: scope.row.id, customerId: scope.row.customerId}}">
              <el-button class="width50" type="primary" size="mini">详情</el-button>
            </router-link> -->
            <a :href="formatHongshanUrl(`/guider/allAllDetail?id=${scope.row.id}`)" target="_blank">
              <el-button class="width50" type="primary" size="mini">详情</el-button>
            </a>
            <el-tooltip class="item" effect="dark" :content="scope.row.refundRemark" placement="top">
              <el-button type="primary" size="mini">查看原因</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-content">
      <pagination :page="page.pageNumber" :total="page.totalCount" :render="getData" :options="reqParams"></pagination>
    </div>
  </section>
</template>

<script>
import getCache from '@/utils/getCache'
import Tab from '../tab.vue'
import pagination from '@/components/pagination'
import request from '@/utils/request'
export default {
  components: {
    Tab,
    pagination,
  },
  data() {
    const auth = JSON.parse(getCache({
      key: 'currentUser'
    }))
    return {
      fullScreenLoading: false,
      tableData: [],
      tableHeight: 600,
      woodAdmin: auth.woodAdmin,
      woodFinance: auth.woodFinance,
      reqParams: {
        key: '',
        pageSize: 20,
        pageNumber: 1,
        _function: 'refund',
        listAll: 1,
      },
      page: {
        pageSize: 20,
        pageNumber: 1,
        totalCount: 20,
      }
    }
  },
  mounted() {
    this.tableHeight = document.body.clientHeight - 250
    this.getData()
  },
  methods: {
    getData() {
      this.fullScreenLoading = true
      request('/redwood/bulk', {
        data: this.reqParams,
        method: 'GET',
      }).then(res => {
        if (res.success == 1) {
          this.tableData = res.page.result
          this.page.pageSize = res.page.pageSize
          this.page.pageNumber = res.page.pageNumber
          this.page.totalCount = res.page.totalCount
        } else {
          this.$message.error(res.msg)
        }
        this.fullScreenLoading = false
      })
    },
    reset() {
      this.reqParams.key = ''
      this.getData()
    }
  }
}
</script>

<style lang="scss">

</style>
