<template>
  <section  v-loading.body="fullscreenLoading">
    <HeadFilters v-on:getParams="getFilter" :params="requestParams">
      <template slot="headFilterSlot" scope="scope">
        <el-col :span="2">
          <p>&nbsp</p>
          <el-button type="primary" @click="exportData(scope.scope)">导出</el-button>
        </el-col>
      </template>
    </HeadFilters>
    <Tabs></Tabs>
    <div class="reimburse-total">
      已报销总金额：
      <strong>{{reimburseTotal | formatMoney}}元</strong>
    </div>
    <el-table :data="tableData" :height="tableHeight" border>
      <el-table-column prop="handlerTime" label="报销时间" align="center" :formatter="formatTime" min-width="160">
      </el-table-column>
      <el-table-column prop="number" label="报销单号" align="center" min-width="120">
      </el-table-column>
      <el-table-column prop="serviceNumber" label="订单号" align="center" min-width="180">
      </el-table-column>
      <el-table-column prop="madan" label="码单编号" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="baoxiaoMoney" label="报销金额/元" align="center" min-width="100">
        <template scope="scope">
          {{scope.row.baoxiaoMoney | formatMoney}}
        </template>
      </el-table-column>
      <el-table-column prop="costMoney" label="成本价/元" align="center" min-width="80">
        <template scope="scope">
          {{scope.row.costMoney | formatMoney}}
        </template>
      </el-table-column>
      <el-table-column prop="totalMoney" label="销售价/元" align="center" min-width="80">
        <template scope="scope">
          {{scope.row.totalMoney | formatMoney}}
        </template>
      </el-table-column>
      <el-table-column prop="shopCompany" label="供应商" align="center" min-width="120">
      </el-table-column>
      <el-table-column prop="buyerCompany" label="采购商" align="center" min-width="120">
      </el-table-column>
      <el-table-column label="剪版员" align="center" min-width="120">
        <template scope="scope">
          {{scope.row.cutterName}}/{{scope.row.cutterTel}}
        </template>
      </el-table-column>
      <el-table-column label="跟单员" align="center" min-width="120">
        <template scope="scope">
          {{scope.row.followerName}}/{{scope.row.followerTel}}
        </template>
      </el-table-column>
      <el-table-column label="采购员" align="center"  min-width="80">
        <template scope="scope">
          {{scope.row.guiderName}}/{{scope.row.guiderTel}}
        </template>
      </el-table-column>
      <el-table-column label="报销类型" align="center" min-width="80">
        <template scope="scope">剪版</template>
      </el-table-column>
      <el-table-column label="报销方式" align="center" min-width="80">
        <template scope="scope">
          {{scope.row.fukuanType === 1 ? '现金报销' : '线上转账'}}
        </template>
      </el-table-column>
      <el-table-column label="财务备注" align="center" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.editShow">
            <el-input v-model="scope.row.remark" autofocus="autofocus" style="width: 80px;" @keyup.enter.native="handleConfirmEditRemark(scope.row)"></el-input>
          </template>
          <template v-else>
            <div @click="scope.row.editShow = true">
              <span>{{scope.row.remark}}&nbsp</span>
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="操作" align="center" fixed="right">
        <template scope="scope">
          <router-link :to="'/reimburse/cut/details/done?id=' + scope.row.id">
            <el-button size="mini" type="primary">详情</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-content">
    <Pagination :page="pagination.pageNumber" :total="pagination.totalCount" :options="requestParams" :render="getData"></Pagination>      
    </div>
  </section>
</template>

<script>
import HeadFilters from 'components/headFilter/HeadFilter'
import FormFilters from 'components/filters.vue'
import Tabs from 'components/reimburseTabs.vue'
import Pagination from 'components/pagination'
import reimburseApi from 'api/reimburse'
import { newRequest } from 'common/utils'
export default {
  components: {
    HeadFilters,
    FormFilters,
    Tabs,
    Pagination
  },
  data() {
    return {
      fullscreenLoading: false,
      reqRemarkParams: {
        id: '',
        remark: '',
      },
      tableData: [],
      pagination: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 20
      },
      requestParams: {
        orderNumber: '',
        madan: '',
        sellerCompany: '',
        buyerCompany: '',
        cutterName: '',
        followerName: '',
        baoxiaoMoney: '',
        timeBegin: '',
        timeEnd: '',
        queryType: 1,
        toEmail: '',
        pageNumber: 1,
        pageSize: 20,
      },
      reimburseTotal: 0,
      tableHeight: 600
    }
  },
  mounted() {
    this.tableHeight = String(document.body.clientHeight - 402);
    this.getData()
  },
  methods: {
    getFilter(params) {
      this.requestParams = Object.assign({
        pageNumber: 1,
        pageSize: 20,
        queryType: 1,
      }, params)
      if (params.createTimeBegin) {
        this.requestParams.timeBegin = new Date(params.createTimeBegin).getTime()
      }
      delete this.requestParams.createTimeBegin
      if (params.createTimeEnd) {
        this.requestParams.timeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete this.requestParams.createTimeEnd
      delete params.totalMoney
      if (params.shopName) {
        this.requestParams.shopCompany = params.shopName
      } else {
        this.requestParams.shopCompany = ''
      }
      if (params.follower) {
        this.requestParams.followerName = params.follower
      } else {
        this.requestParams.followerName = ''
      }
      this.getData()
    },
    handleConfirmEditRemark(row) {
      console.log(row)
      this.reqRemarkParams.id = row.id
      this.reqRemarkParams.remark = row.remark
      newRequest({
        url: '/redwood/account/ChargeOffRecords/updateRemark',
        data: this.reqRemarkParams,
        contentType: 'application/json',
        method: 'post'
      }).then(res => {
        if (res.success == 1) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          row.editShow = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    search(params) {
      Object.assign(this.requestParams, this.formatParamsTime(params, 'timeBegin', 'timeEnd'))
      this.getData()
    },
    getData(params = {}) {
      const data = Object.assign(this.requestParams, params)
      reimburseApi.getDoneCutList(data).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.pagination.pageNumber = response.page.pageNumber
          this.pagination.pageSize = response.page.pageSize
          this.pagination.totalCount = response.page.totalCount
          response.page.result.forEach(item => {
            item.editShow = false
          })
          this.tableData = response.page.result
          this.reimburseTotal = response.total
        }
      })
    },
    exportData(params) {
      this.fullscreenLoading = true
      params = JSON.parse(JSON.stringify(params))
      let keys = Object.keys(params)
      keys.map(key => {
        if (!params[key]) {
          delete params[key]
        }
      })
      this.requestParams = Object.assign({
        pageNumber: 1,
        pageSize: 20,
        queryType: 2,
      }, params)
      if (params.createTimeBegin) {
        this.requestParams.timeBegin = new Date(params.createTimeBegin).getTime()
      }
      delete this.requestParams.createTimeBegin
      if (params.createTimeEnd) {
        this.requestParams.timeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete this.requestParams.createTimeEnd
      delete params.totalMoney
      if (params.shopName) {
        this.requestParams.shopCompany = params.shopName
      } else {
        this.requestParams.shopCompany = ''
      }
      if (params.follower) {
        this.requestParams.followerName = params.follower
      } else {
        this.requestParams.followerName = ''
      }
      // params = Object.assign({}, this.formatParamsTime(this.requestParams, 'timeBegin', 'timeEnd'), { queryType: 2 })
      this.fullscreenLoading = false
      reimburseApi.exportCut(this.requestParams)
    }
  }
}
</script>

<style lang="scss" scoped>
.reimburse-total {
  margin: 5px 0 15px;
  strong {
    color: #f00;
  }
}
</style>
