<template>
  <section>
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
      <el-table-column prop="handlerTime" label="报销时间" align="center" :formatter="formatTime" width="160">
      </el-table-column>
      <el-table-column prop="number" label="报销单号" align="center" width="140">
      </el-table-column>
      <el-table-column prop="outNumber" label="出仓单号" align="center" width="140">
      </el-table-column>
      <el-table-column prop="serviceNumber" label="订单号" align="center" width="200">
      </el-table-column>
      <el-table-column prop="baoxiaoMoney" label="报销金额/元" align="center" width="160">
        <template scope="scope">
          {{scope.row.baoxiaoMoney | formatMoney}}
        </template>
      </el-table-column>
      <el-table-column label="仓库员" align="center" width="140">
        <template scope="scope">
          {{scope.row.reposityName}}/{{scope.row.reposityTel}}
        </template>
      </el-table-column>
      <el-table-column label="采购员" align="center" width="140">
        <template scope="scope">
          {{scope.row.guiderName}}/{{scope.row.guiderTel}}
        </template>
      </el-table-column>
      <el-table-column prop="buyerCompany" label="采购商" align="center" width="160">
      </el-table-column>
      <el-table-column prop="shopCompany" label="供应商" align="center" width="160">
      </el-table-column>
      <el-table-column label="报销类型" align="center" width="120">
        <template scope="scope">运费</template>
      </el-table-column>
      <el-table-column prop="fukuanType" label="报销方式" align="center" :formatter="formatReimburseFukuanType"  width="120">
      </el-table-column>
      <el-table-column prop="status" label="报销状态" align="center" :formatter="formatReimburseStatus"  width="120">
      </el-table-column>
      <el-table-column label="物流凭据" align="center">
        <template scope="scope">
          <article class="media imgShow" v-if='scope.row.sendCertificate.length'>
            <a :href="'http://test.soouya.com'+ val " class="image media-left" v-lightbox="scope.row.sendCertificate" v-for="(val,index) in scope.row.sendCertificate" :key="index">
              <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" width="40" height="40">
            </a>
          </article>
        </template>
      </el-table-column>
      <el-table-column prop="reposityRemark" label="仓库报销备注" align="center" show-overflow-tooltip  width="160">
      </el-table-column>
      <el-table-column label="财务备注" align="center" width="160" show-overflow-tooltip>
        <template scope="scope">
          <template v-if="scope.row.editShow">
            <el-input v-model="scope.row.remark" autofocus style="width: 80px;" @keyup.enter.native="handleConfirmEditRemark(scope.row)"></el-input>
          </template>
          <template v-else>
            <div @click="scope.row.editShow = true">
              <span>{{scope.row.remark}}&nbsp</span>
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="120">
        <template scope="scope">
          <router-link :to="'/reimburse/freight/details/done?id=' + scope.row.id">
            <el-button size="mini" type="primary">详情</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <Lightbox></Lightbox>
    <div class="pagination-content">
    <Pagination :page="pagination.pageNumber" :total="pagination.totalCount" :options="requestParams" :render="getData"></Pagination>      
    </div>
  </section>
</template>

<script>
import HeadFilters from 'components/headFilter/HeadFilter'
import reimburseApi from 'api/reimburse'
import Tabs from 'components/reimburseTabs.vue'
import FormFilters from 'components/filters.vue'
import Pagination from 'components/pagination'
import Lightbox from 'components/lightbox/lightbox'
import { newRequest } from 'common/utils'

export default {
  components: {
    HeadFilters,
    Tabs,
    FormFilters,
    Pagination,
    Lightbox
  },
  data() {
    return {
      reqRemarkParams: {
        id: '',
        remark: '',
      },
      tableData: [],
      tableHeight: 600,
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
      reimburseTotal: 0
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
      reimburseApi.getDoneFreightList(data).then((response) => {
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
      delete params.createTimeBegin
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
      // params = Object.assign({}, this.formatParamsTime(this.requestParams, 'timeBegin', 'timeEnd'), { queryType: 2 })
      reimburseApi.exportFreight(this.requestParams)
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
