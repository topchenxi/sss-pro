<template>
  <section v-loading.body="fullScreenLoading">
    <el-row class="search-content" :gutter="20">
      <el-col :span="6">
        <el-input @keyup.enter.native="getData" class="same-height" placeholder="订单号/采购商名称/供应商名称/找版员" v-model="reqParams.keyword">
        </el-input>
      </el-col>
      <el-col :span="8" class="time-minWidth">
        <el-date-picker v-model="reqParams.createTimeBegin" type="date" placeholder="选择日期时间">
        </el-date-picker>
        -
        <el-date-picker v-model="reqParams.createTimeEnd" type="date" placeholder="选择日期时间">
        </el-date-picker>
      </el-col>
      <el-col :span="5" >
        <el-button type="primary"  @click.native="getData">搜索</el-button>
        <el-button type="" @click.native="reset">重置</el-button>
        <el-button type="primary"  @click.native="exportExcel">导出excel</el-button>
      </el-col>
    </el-row>
    <div class="el-findTable-content">
      <el-table border :data="tableData" :height="tableHeight">
        <el-table-column label="找版订单号" prop="serviceNumber" width="180" align="left"></el-table-column>
        <el-table-column label="找版订单时间" prop="createTime" width="160" align="left"></el-table-column>
        <el-table-column label="采购商ID" prop="customerNumber" width="120" align="left"></el-table-column>
        <el-table-column label="采购商名称" prop="customerCompany" width="160" align="left"></el-table-column>
        <el-table-column label="供应商ID" prop="sellerNumber" width="120" align="left"></el-table-column>
        <el-table-column label="供应商名称" prop="shopCompany" width="160" align="left"></el-table-column>
        <el-table-column label="供应商电话" prop="shopTel" width="120" align="left"></el-table-column>
        <el-table-column label="供应商地址" prop="shopFullAddr" width="160" align="left"></el-table-column>
        <el-table-column label="原货号" prop="productNumber" width="120" align="left"></el-table-column>
        <el-table-column label="自营货号" prop="zyProductNumber" width="140" align="left"></el-table-column>
        <el-table-column label="是否换卡头" prop="changeCard" width="100"></el-table-column>
        <el-table-column label="剪版订单号" prop="cutNumber" width="180" align="left"></el-table-column>
        <el-table-column label="剪版订单时间" prop="cutCreateTime" width="160" align="left"></el-table-column>
        <el-table-column label="订单金额(元)" prop="cutTotalMoney" width="120" align="right"></el-table-column>
        <el-table-column label="大货订单号" prop="bulkOrderNumber" width="180" align="left"></el-table-column>
        <el-table-column label="大货订单时间" prop="bulkCreateTime" width="160" align="left"></el-table-column>
        <el-table-column label="销售总额(元)" prop="bulkSaleMoney" width="120" align="right"></el-table-column>
        <el-table-column prop="maoliPoint" align="center" label="毛利率（%）" width="110"></el-table-column>
        <el-table-column label="销售员/跟单员" prop="salesName" width="120" align="left"></el-table-column>
        <el-table-column label="找版员" prop="clothHunterName" width="120" align="left"></el-table-column>
        <el-table-column label="订单来源" prop="category" width="120"></el-table-column>
      </el-table>
    </div>
    <div class="page-content">
      <pagination :page="page.pageNumber" :total="page.totalCount" :render="getData" :options="reqParams"></pagination>
    </div>
  </section>
</template>

<script>
import pagination from '@/components/pagination'
import request from '@/utils/request'
export default {
  components: {
    pagination
  },
  data() {
    return {

      tableHeight: 600,
      fullScreenLoading: true,
      tableData: [],
      reqParams: {
        keyword: '',
        pageNumber: 1,
        pageSize: 20,
        createTimeBegin: new Date().getTime() - 90 * 3600 * 24 * 1000,
        createTimeEnd: new Date().getTime()
      },
      page: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 20,
      }
    }
  },
  mounted() {
    this.tableHeight = document.body.clientHeight - 180
    this.getData()
  },
  methods: {
    getData() {
      if (this.reqParams.createTimeBegin) {
        const ctb = new Date(this.reqParams.createTimeBegin).getTime()
        const cyb = new Date(ctb).getFullYear()
        const cmb = new Date(ctb).getMonth() + 1
        const cdb = new Date(ctb).getDate()
        const cTimeb = cyb + '/' + cmb + '/' + cdb
        this.reqParams.createTimeBegin = new Date(cTimeb).getTime()
      }
      if (this.reqParams.createTimeEnd) {
        const cte = new Date(this.reqParams.createTimeEnd).getTime()
        const cye = new Date(cte).getFullYear()
        const cme = new Date(cte).getMonth() + 1
        const cde = new Date(cte).getDate()
        const cTime = cye + '/' + cme + '/' + cde
        this.reqParams.createTimeEnd = new Date(cTime).getTime() + (24 * 3600 - 1) * 1000
      }
      request('/redwood/report/findTransform/list', {
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
      this.reqParams = {
        keyword: '',
        pageNumber: 1,
        pageSize: 20,
        createTimeBegin: new Date().getTime() - 90 * 3600 * 24 * 1000,
        createTimeEnd: new Date().getTime()
      }
      this.getData()
    },
    exportExcel() {
      this.fullScreenLoading = true
      if (this.reqParams.createTimeBegin) {
        const ctb = new Date(this.reqParams.createTimeBegin).getTime()
        const cyb = new Date(ctb).getFullYear()
        const cmb = new Date(ctb).getMonth() + 1
        const cdb = new Date(ctb).getDate()
        const cTimeb = cyb + '/' + cmb + '/' + cdb
        this.reqParams.createTimeBegin = new Date(cTimeb).getTime()
      }
      if (this.reqParams.createTimeEnd) {
        const cte = new Date(this.reqParams.createTimeEnd).getTime()
        const cye = new Date(cte).getFullYear()
        const cme = new Date(cte).getMonth() + 1
        const cde = new Date(cte).getDate()
        const cTime = cye + '/' + cme + '/' + cde
        this.reqParams.createTimeEnd = new Date(cTime).getTime() + (24 * 3600 - 1) * 1000
      }
      request('/redwood/report/findTransform/export', {
        data: this.reqParams,
        method: 'GET'
      }).then(res => {
        if (res.success == 1) {
          window.open(`http://www.soouya.com${res.obj}`)
        } else {
          this.$message.error(res.msg)
        }
        this.fullScreenLoading = false
      })
    }
  }
}
</script>

<style>

</style>
