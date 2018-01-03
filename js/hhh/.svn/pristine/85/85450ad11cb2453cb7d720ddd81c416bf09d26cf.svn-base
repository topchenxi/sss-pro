<template>
  <section>
    <el-form :inline="true">
      <el-row>
        <el-col style="display:none">
          <el-form-item>
            <el-select v-model="requestData.status" placeholder="请选择">
              <el-option v-for="item in orderStautsArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item>
            <el-input v-model="requestData.keyword" name="keyword" placeholder="订单号/采购商/供应商"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="getData">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData">
      <el-table-column prop="serviceNumber" label="订单号"></el-table-column>
      <el-table-column prop="createTime" label="申请退款时间" :formatter="formatTime"></el-table-column>
      <el-table-column prop="saleMoney" label="订单总金额"></el-table-column>
      <el-table-column prop="buyerCompany" label="采购商"></el-table-column>
      <el-table-column prop="shopCompany" label="供应商"></el-table-column>
      <el-table-column prop="" label="品类">
        <template scope="scope">
          <template v-if="scope.row.productType == 0">花型</template>
          <template v-if="scope.row.productType == 1">面料</template>
          <template v-if="scope.row.productType == 2">辅料</template>
          <template v-if="scope.row.productType == 3">底布</template>
          <template v-if="scope.row.productType == 4">花布</template>
        </template>
      </el-table-column>
      <el-table-column prop="" label="货源">
        <template scope="scope">
          {{scope.row.productSource == 1 ? '订货' : '现货'}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="采购数量">
        <template scope="scope">
          {{scope.row.quantity}}{{scope.row.quantityUnit}}/{{scope.row.colorCount || 0}}色
        </template>
      </el-table-column>
      <el-table-column prop="sellerRefund" label="供应商退款金额"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <router-link :to="{name: 'orderDetail', query: { id: scope.row.reposityNumber, pathIndex: 2, orderNumber: scope.row.orderNumber}}">
            <el-button class="o-btn" size="small" type="primary">详情</el-button>
          </router-link>
          <el-tooltip class="item" effect="dark" :content="scope.row.reason" placement="top">
            <el-button type="text" size="mini">退款原因</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { request } from 'utils/request'

export default {
  data() {
    let routeQuery = this.$route.query
    return {
      requestData: {
        pageSize: 20,
        pageNumber: 1,
        keyword: routeQuery.keyword,
        status: '',
      },
      orderStautsArr: [{
        label: '全部订单状态',
        value: ''
      }, {
        label: '等待通知询价',
        value: '300'
      }, {
        label: '等待录入大货信息',
        value: '305'
      }],
      tableData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      request('/redwood/buyfollow/Refund/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: this.requestData
      }).then((response) => {
        this.$store.dispatch('changeload', false)
        if (response.success == '1') {
          this.tableData = response.page.result
        }
      })
    }
  }
}
</script>

<style>

</style>
