<template>
  <section v-loading="loading" element-loading-text="拼命加载中">
    <el-form :inline="true">
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-select v-model="requestData.category" placeholder="请选择">
              <el-option v-for="item in fitlersData" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="text-align:right">
          <el-form-item>
            <el-input placeholder="订单号/采购商" v-model="requestData.keyword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="requestList">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="sy-order-wrap" v-for="(order,orderIdx) in orderList">
      <template v-if="order.category === 'all-all'">
        <header>
          <span>大货单</span>
          <span>订单号：{{order.dhOrder.serviceNumber}}</span>
          <span>采购商：{{order.dhOrder.buyerCompany}}
            <template v-if="order.dhOrder.hasOpenedBaitiao">
              <el-tooltip class="item" effect="dark" content="已开通白条" placement="top-start">
                <img width="12px" height="12px" src="../../assets/credit.png"></img>
              </el-tooltip>
            </template>
          </span>
          <span>供应商：{{order.dhOrder.shopCompany}}</span>
          <span>订单总金额：&yen;{{order.dhOrder.saleMoney | formatMoney}}</span>
          <span>订单发布时间：{{order.dhOrder.createTime | formatTime}}</span>
          <span>已对账金额：
            <strong>{{order.dhOrder.totalMoney | formatMoney}}元</strong>
          </span>
        </header>
        <el-table :data="order.dhOrder.outReposityList">
          <el-table-column label="出仓单号" prop="outReposityNumber"></el-table-column>
          <el-table-column label="出仓销售货款">
            <template scope="scope">
              {{scope.row.saleMoney | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column label="应收出仓销售货款">
            <template scope="scope">
              {{scope.row.needSaleMoney | formatMoney}}
            </template>
          </el-table-column>
          <!--<el-table-column label="服务费" prop=""></el-table-column>-->
          <el-table-column label="运费">
            <template scope="scope">
              {{scope.row.freightMoney | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column label="已对账金额">
            <template scope="scope">
              {{scope.row.totalMoney | formatMoney}}
            </template>
          </el-table-column>
          <!--<el-table-column label="发布时间" prop=""></el-table-column>-->
          <el-table-column label="出仓时间" prop="outTime" :formatter="formatTime"></el-table-column>
          <el-table-column label="提交结算时间" prop="submitTime" :formatter="formatTime"></el-table-column>
          <el-table-column label="对账时间" prop="confirmTime" :formatter="formatTime"></el-table-column>
        </el-table>
      </template>
      <template v-if="order.category === 'jb-all'">
        <header>
          <span>剪版单</span>
          <span>订单号：{{order.cut.number}}</span>
          <span>采购商：{{order.cut.customerCompany}}</span>
          <span>供应商：{{order.cut.shopCompany}} </span>
          <span>订单总金额：{{order.cut.costMoney | formatMoney}}</span>
          <span>已提交对账金额：
            <strong>{{order.cut.totalMoney | formatMoney }}元</strong>
          </span>
        </header>
        <el-table :data="[1]">
          <el-table-column label="成本货款">
            <template scope="scope">
              {{order.cut.costMoney | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column label="服务费" prop="">
            <template scope="scope">
              {{order.cut.serviceMoney | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column label="税费" prop="">
            <template scope="scope">
              {{order.cut.taxMoney | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column label="运费" prop="">
            <template scope="scope">
              {{order.cut.freightMoney | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column label="总费用" prop="">
            <template scope="scope">
              {{order.cut.totalMoney | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column label="已对账金额" prop="">
            <template scope="scope">
              {{order.cut.totalMoney | formatMoney}}
            </template>
          </el-table-column>
          <!--<el-table-column label="发布时间" prop="">
                                        <template scope="scope">
                                          {{order.cut.}}
                                        </template>
                                      </el-table-column>-->
          <el-table-column label="提交结算时间" prop="">
            <template scope="scope">
              {{order.cut.submitTime | formatTime}}
            </template>
          </el-table-column>
          <el-table-column label="对账时间" prop="">
            <template scope="scope">
              {{order.cut.confirmTime | formatTime}}
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div style="margin-top:20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.pageNumber" :page-sizes="[5, 10, 20, 50]" :page-size="pagination.pageSize" layout="->,total, sizes, prev, pager, next, jumper" :total="pagination.totalCount">
      </el-pagination>
    </div>
  </section>
</template>
<script>
import { request } from 'utils/request'
export default {
  data() {
    return {
      requestData: {
        category: '',
        keyword: ''
      },
      orderList: [],
      pagination: {
        pageNumber: 1,
        pageSize: 5,
        totalCount: 1
      },
      fitlersData: [{
        label: '全部对账类型',
        value: ''
      }, {
        label: '只看大货单',
        value: 'all-all'
      }, {
        label: '只看剪版单',
        value: 'jb-all'
      }],
      loading: false
    }
  },
  mounted() {
    this.requestList()
  },
  filters: {
    formatMoney(val, column) {
      return val === null ? '--' : ('￥' + Number(val).toFixed(2))
    }
  },
  methods: {
    requestList() {
      this.loading = true
      request('/redwood/buyfollow/Order/listPayed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: Object.assign({}, this.requestData, {
          pageNumber: this.pagination.pageNumber,
          pageSize: this.pagination.pageSize
        })
      }).then(response => {
        this.loading = false
        this.$store.dispatch('changeload', false)
        if (response.success === '1') {
          Object.assign(this.pagination, {
            totalCount: response.page.totalCount
          })
          this.orderList = response.page.result
        } else {
          this.$message({
            type: 'error',
            message: response.msg,
            duration: 1200
          })
        }
      })
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.requestList()
    },
    handleCurrentChange(currentPage) {
      this.pagination.pageNumber = currentPage
      this.requestList()
    }
  }
}
</script>
<style lang="scss" scoped>
.sy-order-wrap {
  >header {
    margin: 20px 0;
    >span:not(:last-child) {
      border-right: 1px solid #666;
      padding-right: 10px;
      margin-right: 5px;
    }
  }
}
</style>
