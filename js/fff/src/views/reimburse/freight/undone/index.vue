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
      <el-table-column prop="createTime" label="进入待报销时间" align="center" :formatter="formatTime" min-width="160">
      </el-table-column>
      <el-table-column prop="number" label="报销单号" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="outNumber" label="出仓单号" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="serviceNumber" label="订单号" align="center" min-width="200">
      </el-table-column>
      <el-table-column prop="baoxiaoMoney" label="报销金额/元" align="center" min-width="100">
        <template scope="scope">
          {{scope.row.baoxiaoMoney | formatMoney}}
        </template>
      </el-table-column>
      <el-table-column label="仓库员" align="center" min-width="140">
        <template scope="scope">
          {{scope.row.reposityName}}/{{scope.row.reposityTel}}
        </template>
      </el-table-column>
      <el-table-column label="采购员" align="center"  min-width="140">
        <template scope="scope">
          {{scope.row.guiderName}}/{{scope.row.guiderTel}}
        </template>
      </el-table-column>
      <el-table-column prop="buyerCompany" label="采购商" align="center" min-width="120">
      </el-table-column>
      <el-table-column prop="shopCompany" label="供应商" align="center" min-width="100">
      </el-table-column>
      <el-table-column label="物流凭据" align="center">
        <template scope="scope">
          <article class="media imgShow" v-if='scope.row.sendCertificate.length'>
            <a :href="'http://test.soouya.com'+ val " class="image media-left" v-lightbox="scope.row.sendCertificate" v-for="(val,index) in scope.row.sendCertificate" :key="index">
              <img :src="'http://test.soouya.com'+ val" width="40" height="40">
            </a>
          </article>
        </template>
      </el-table-column>
      <el-table-column prop="reposityRemark" label="仓库报销备注" align="center" min-width="120">
      </el-table-column>
      <el-table-column prop="status" label="报销状态" align="center" :formatter="formatReimburseStatus" min-width="100">
      </el-table-column>
      <el-table-column label="报销类型" align="center" min-width="80">
        <template scope="scope">运费</template>
      </el-table-column>
      <el-table-column prop="date" label="操作" align="center" fixed="right" min-width="100">
        <template scope="scope">
          <el-button size="mini" @click="showReimburseDialog([scope.row])" type="primary">报销</el-button>
          <router-link :to="'/reimburse/freight/details/undone?id=' + scope.row.id">
            <el-button size="mini" type="primary">详情</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-content">
    <Pagination :page="pagination.pageNumber" :total="pagination.totalCount" :options="requestParams" :render="getData"></Pagination>      
    </div>
    <ReimburseDialog :config="dialogConfig" v-on:success="getData"></ReimburseDialog>
    <Lightbox></Lightbox>
  </section>
</template>

<script>
import HeadFilters from 'components/headFilter/HeadFilter'
import reimburseApi from 'api/reimburse'
import Tabs from 'components/reimburseTabs.vue'
import FormFilters from 'components/filters.vue'
import Pagination from 'components/pagination'
import ReimburseDialog from 'components/reimburseDialog.vue'
import Lightbox from 'components/lightbox/lightbox'

export default {
  components: {
    HeadFilters,
    Tabs,
    FormFilters,
    Pagination,
    ReimburseDialog,
    Lightbox
  },
  data() {
    return {
      tableData: [],
      tableHeight: 600,
      dialogConfig: {
        isShow: false,
        ids: '',
        totalMoney: 0,
        type: 'freight'
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
      delete this.requestParams.createTimeBegin
      if (params.createTimeEnd) {
        this.requestParams.timeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete this.requestParams.createTimeEnd
      delete this.requestParams.totalMoney
      if (params.shopName) {
        this.requestParams.shopCompany = params.shopName
      } else {
        this.requestParams.shopCompany = ''
      }
      if (params.outReposityNumber) {
        this.requestParams.number = params.outReposityNumber
        delete this.requestParams.outReposityNumber
      } else {
        this.requestParams.number = ''
      }
      this.getData()
    },
    search(params) {
      Object.assign(this.requestParams, this.formatParamsTime(params, 'timeBegin', 'timeEnd'))
      this.getData()
    },
    getData(params = {}) {
      const data = Object.assign(this.requestParams, params)
      reimburseApi.getUndoneFreightList(data).then((response) => {
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
          totalMoney += Number(item.baoxiaoMoney)
        })
      } else {
        ids.push(data.id)
        totalMoney += Number(data.baoxiaoMoney)
      }
      this.dialogConfig = Object.assign(this.dialogConfig, {
        isShow: true,
        ids: ids,
        totalMoney: totalMoney
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
