<template>
  <section v-loading.fullscreen.lock="pageLoading" element-loading-text="拼命加载中">
   <Tabs></Tabs>
    <FormFilters :config="formConfig">
      <template slot="manipulate" scope="form">
        <el-form-item>
          <el-button type="primary" @click="search(form.scope.requestParams)">搜索</el-button>
          <el-button type="primary" @click="showExportDialog(form.scope.requestParams)">导出</el-button>
        </el-form-item>
        <el-form-item class="totalChaMoney" label="差额合计:">
          <strong>{{totalChaMoney}}</strong>元</el-form-item>
      </template>
    </FormFilters>
    <template v-show="tableData.length">
      <el-table :data="tableData" :height="tableHeight" border>
        <el-table-column prop="serviceNumber" label="订单号" align="center">
        </el-table-column>
        <el-table-column prop="payedTime" label="付款时间" align="center">
        </el-table-column>
        <el-table-column prop="buyerNumber" label="采购商ID" align="center">
        </el-table-column>
        <el-table-column prop="buyerCompany" label="采购商名称" align="center">
        </el-table-column>
         <el-table-column prop="hasOpenedBaitiaoDescr" label="白条客户" align="center">
        </el-table-column>
        <el-table-column prop="sellerNumber" label="供应商ID" align="center">
        </el-table-column>
        <el-table-column prop="shopCompany" label="供应商名称" align="center">
        </el-table-column>
        <el-table-column prop="totalSaleMoney" label="销售合计(元)" align="center">
        </el-table-column> 
        <el-table-column prop="follower" label="跟单员" align="center">
        </el-table-column>
        <!-- <el-table-column prop="followerAdmin" label="对应主管" align="center">
        </el-table-column> -->
        <template v-for="index in 6">
          <el-table-column :label="'对账时间' + index" align="center">
            <template scope="scope">
              {{scope.row.reconciliationList.length > index-1 ? scope.row.reconciliationList[index-1].reconciliationTime : ''}}
            </template>
          </el-table-column>
          <el-table-column :label="'到账时间' + index" align="center">
            <template scope="scope">
              {{scope.row.reconciliationList.length > index-1 ? scope.row.reconciliationList[index-1].incomeTime : ''}}
            </template>
          </el-table-column>
          <el-table-column :label="'金额'+index+'（元）'" align="center">
            <template scope="scope">
              {{scope.row.reconciliationList.length > index-1 ? scope.row.reconciliationList[index-1].money : ''}}
            </template>
          </el-table-column>
        </template>
        <el-table-column label="退换货差异" align="center" fixed="right">
          <template scope="scope">
            <template v-if="scope.row.isEdit">
              <el-input v-model.number="scope.row.thCha" @keyup.native.enter="editDifference(scope.row)"></el-input>
            </template>
            <template v-else>
              <div @click="scope.row.isEdit = !scope.row.isEdit">
                {{scope.row.thCha}}
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="totalMoney" label="累计金额（元）" align="center" fixed="right">
        </el-table-column>
        <el-table-column prop="cha" label="差额" align="center" fixed="right">
        </el-table-column>
        <el-table-column prop="statusDescr" label="状态" align="center" fixed="right">
        </el-table-column>
        <el-table-column label="备注" align="center" fixed="right" >
          <template scope="scope">
            <template v-if="scope.row.financeRemark">
              <div @click="showRemarkDialog(scope.row)">{{scope.row.financeRemark}}</div>
            </template>
            <template v-else>
              <el-button type="text" @click.native="showRemarkDialog(scope.row)" size="mini">添加备注</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :page="pagination.pageNumber" :total="pagination.totalCount" :options="requestParams" :render="getData"></Pagination>
    </template>
    <ExportReportsDialog :config="exportReportsConfig"></ExportReportsDialog>
    <ReportsRemarkDialog :config="reportsRemarkConfig" @success="updateRemark"></ReportsRemarkDialog>
  </section>
</template>

<script>
import Tabs from 'components/orderManageTabs'
import FormFilters from 'components/filters.vue'
import Pagination from 'components/pagination'
import reportsApi from 'api/reports'
import ExportReportsDialog from 'components/exportReportsDialog'
import ReportsRemarkDialog from 'components/reportsRemarkDialog'
export default {
  components: {
    Tabs,
    FormFilters,
    Pagination,
    ExportReportsDialog,
    ReportsRemarkDialog
  },
  data() {
    return {
      formConfig: [
        {
          label: '',
          type: 'input',
          key: 'keyword',
          placeholder: '订单号/采购商及ID/供应商及ID/跟单员'
        },
        {
          label: '',
          type: 'datePicker',
          key: 'time',
          placeholder: '付款时间'
        },
         {
          type: 'select',
          key: 'status',
          selectOptions: [
          {label: '状态', value: ''},
          {label: '未核销', value: 0},
          {label: '已核销', value: 1},
          ]
        }
      ],
      requestParams: {
        timeBegin: '',
        timeEnd: '',
        keyword: '',
        queryType: 1,
        toEmail: '',
        pageNumber: 1,
        pageSize: 20,
        status: ''
      },
      tableData: [],
      pagination: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 20
      },
      exportReportsConfig: {
        isShow: false,
      },
      reportsRemarkConfig: {
        isShow: false,
        orderNumber: ''
      },
      tableHeight: '600',
      pageLoading: false,
      totalChaMoney: 0
    }
  },
  mounted() {
    this.tableHeight = String(window.document.body.clientHeight - 250);
    this.getData()
  },
  methods: {
    search(requestParams) {
    var timeArr = requestParams.time
      if (timeArr[0]) {
        this.requestParams.timeBegin = timeArr[0].getTime();
      } else {
         this.requestParams.timeBegin = ''
      }
       if (timeArr[1]) {
        // this.requestParams.timeEnd = timeArr[1].getTime();
        this.requestParams.timeEnd = timeArr[1].getTime() + 1000 * 60 * 60 * 24
      } else {
        this.requestParams.timeEnd = '';
      }
      this.requestParams.keyword = requestParams.keyword
      this.requestParams.status = requestParams.status
      this.getData()
    },
    getData() {
      this.pageLoading = true
      console.log(this.requestParams)
      reportsApi.queryDahuoReports(this.requestParams).then((response) => {
        this.pageLoading = false
        if (this.requestIsSuccess(response)) {
          this.pagination.pageNumber = response.page.pageNumber
          this.pagination.pageSize = response.page.pageSize
          this.pagination.totalCount = response.page.totalCount
          this.totalChaMoney = response.totalChaMoney
          this.tableData = response.page.result.map((item) => {
            item.isEdit = false;
            return item
          })
        }
      })
    },
    editDifference(data) {
      let params = {
        orderNumber: data.orderNumber,
        thCha: data.thCha
      };
      reportsApi.editDifference(params).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.getData()
        }
      });
    },
    showExportDialog(requestParams) {
      const hasTime = Array.isArray(requestParams.time)
      requestParams.timeBegin = hasTime ? +new Date(requestParams.time[0]) : ''
      requestParams.timeEnd = hasTime ? +new Date(requestParams.time[1]) + 1000 * 60 * 60 * 24 : ''
      Object.assign(this.exportReportsConfig, {
        isShow: true,
        timeBegin: requestParams.timeBegin,
        timeEnd: requestParams.timeEnd,
        keyword: requestParams.keyword,
        status: requestParams.status,
      })
    },
    showRemarkDialog(data) {
      Object.assign(this.reportsRemarkConfig, {
        isShow: true,
        orderNumber: data.orderNumber,
        remark: data.financeRemark || ''
      })
    },
    updateRemark(data) {
      for (let item of this.tableData) {
        if (item.orderNumber === data.orderNumber) {
          item.financeRemark = data.remark;
          return false;
        }
      }
      // this.getData()
    },
  }
}
</script>

<style lang="scss">
.totalChaMoney {
  strong {
    color: #f00;
  }
}
</style>
