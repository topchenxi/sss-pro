<template>
  <section>
    <HeadFilters v-on:getParams="getFilter" :params="requestParams">
      <template slot="headFilterSlot" scope="scope">
        <el-col :span="2">
          <p>&nbsp</p>
          <el-button type="primary" :disabled="selectData.length === 0" @click="showReimburseDialog(selectData)">批量报销</el-button>
        </el-col>
      </template>
    </HeadFilters>
    <Tabs></Tabs>
    <div class="reimburse-total">
      报销总金额：
      <strong>{{reimburseTotal | formatMoney}}元</strong>
    </div>
    <el-table :data="tableData" :height="tableHeight" @selection-change="handleSelectionChange" border>
      <el-table-column width="50" type="selection" align="center" fixed>
      </el-table-column>
      <el-table-column prop="createTime" label="进入待报销时间" align="center" :formatter="formatTime" min-width="100">
      </el-table-column>
      <el-table-column prop="number" label="报销单号" align="center" min-width="80">
      </el-table-column>
      <el-table-column prop="serviceNumber" label="订单号" align="center" min-width="120">
      </el-table-column>
      <el-table-column prop="madan" label="码单编号" align="center" min-width="80">
      </el-table-column>
      <el-table-column prop="baoxiaoMoney" label="报销金额/元" align="center" min-width="60">
        <template scope="scope">
          {{scope.row.baoxiaoMoney | formatMoney}}
        </template>
      </el-table-column>
      <el-table-column prop="costMoney" label="成本价/元" align="center" min-width="60">
        <template scope="scope">
          {{scope.row.costMoney | formatMoney}}
        </template>
      </el-table-column>
      <el-table-column prop="totalMoney" label="销售价/元" align="center" min-width="60">
        <template scope="scope">
          {{scope.row.totalMoney | formatMoney}}
        </template>
      </el-table-column>
      <el-table-column prop="shopCompany" label="供应商" align="center" min-width="80">
      </el-table-column>
      <el-table-column prop="buyerCompany" label="采购商" align="center"  min-width="80">
      </el-table-column>
      <el-table-column label="剪版员" align="center"  min-width="80">
        <template scope="scope">
          {{scope.row.cutterName}}/{{scope.row.cutterTel}}
        </template>
      </el-table-column>
      <el-table-column label="跟单员" align="center"  min-width="80">
        <template scope="scope">
          {{scope.row.followerName}}/{{scope.row.followerTel}}
        </template>
      </el-table-column>
      <el-table-column label="采购员" align="center"  min-width="80">
        <template scope="scope">
          {{scope.row.guiderName}}/{{scope.row.guiderTel}}
        </template>
      </el-table-column>
      <el-table-column label="报销类型" align="center"  min-width="60">
        <template scope="scope">剪版</template>
      </el-table-column>
      <el-table-column prop="date" label="操作" align="center" fixed="right"  min-width="80">
        <template scope="scope">
          <el-button size="mini" @click="showReimburseDialog([scope.row])" type="primary">报销</el-button>
          <router-link :to="'/reimburse/cut/details/undone?id=' + scope.row.id">
            <el-button size="mini" type="primary">详情</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-content">
    <Pagination :page="pagination.pageNumber" :total="pagination.totalCount" :options="requestParams" :render="getData"></Pagination>      
    </div>
    <ReimburseDialog :config="dialogConfig" v-on:success="getData"></ReimburseDialog>
  </section>
</template>

<script>
import HeadFilters from 'components/headFilter/HeadFilter'
import reimburseApi from 'api/reimburse'
import ReimburseDialog from 'components/reimburseDialog.vue'
import FormFilters from 'components/filters.vue'
import Tabs from 'components/reimburseTabs.vue'
import Pagination from 'components/pagination'

export default {
  components: {
    HeadFilters,
    ReimburseDialog,
    FormFilters,
    Tabs,
    Pagination
  },
  data() {
    return {
      tableData: [],
      dialogConfig: {
        isShow: false,
        ids: [],
        totalMoney: 0,
        type: 'cut'
      },
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
      tableHeight: 600,
      selectData: []
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
      delete params.createTimeBegin
      if (params.createTimeEnd) {
        this.requestParams.timeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete params.createTimeEnd
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
    search(params) {
      Object.assign(this.requestParams, this.formatParamsTime(params, 'timeBegin', 'timeEnd'))
      this.getData()
    },
    getData(params = {}) {
      const data = Object.assign(this.requestParams, params)
      reimburseApi.getUndoneCutList(data).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.pagination.pageNumber = response.page.pageNumber
          this.pagination.pageSize = response.page.pageSize
          this.pagination.totalCount = response.page.totalCount
          this.tableData = response.page.result
          this.reimburseTotal = response.total
        }
      })
    },
    showReimburseDialog(data) {
      let ids = []
      let totalMoney = 0;
      if (Array.isArray(data)) {
        data.forEach((item) => {
          ids.push(item.id)
          totalMoney += parseFloat(item.baoxiaoMoney)
        })
      } else {
        ids.push(data.id)
        totalMoney += parseFloat(data.baoxiaoMoney)
      }
      Object.assign(this.dialogConfig, {
        isShow: true,
        ids: ids,
        totalMoney: Math.round(totalMoney * 100) / 100
      })
    },
    handleSelectionChange(data) {
      this.selectData = data
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
