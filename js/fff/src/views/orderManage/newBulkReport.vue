<template>
  <section v-loading.body="fullscreenLoading">
    <FormFilters :config="formConfig" @select="handleStatusChange" class="filter-content"  @search="search">
      <template slot="manipulate" scope="form">
        <el-form-item>
          <p style="font-size:12px;color:#999;line-height:15px;">分账时间</p>
          <el-date-picker class='c-date-start' v-model="requestParams.transactionTimeBegin" @change="handleTimeChange" :picker-options="pickerOptions0" type="date" placeholder="选择开始时间">
          </el-date-picker>
          <span class='split-text'>至</span>
          <el-date-picker class='c-date-end' v-model="requestParams.transactionTimeEnd" @change="handleTimeChange" :picker-options="pickerOptions1" type="date" placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <p style="font-size:12px;color:#999;line-height:15px;">&nbsp;</p>
          <el-button type="primary" @click="search(form.scope.requestParams)">搜索</el-button>
          <el-button type="primary" @click="showExportDialog(form.scope.requestParams)" :disabled="canExport()">导出</el-button>
        </el-form-item>
      </template>
    </FormFilters>
    <Tabs></Tabs>
    <div style="padding: 10px 0px 10px 15px">
      <span>差额合计：
        <span style="color:#f00">{{totalChaMoney}}</span>元</span>
    </div>
    <el-table :height="tableHeight" border :data="tableData">
      <el-table-column label="订单号" prop="serviceNumber" min-width="200"></el-table-column>
      <el-table-column label="支付方式" prop="" min-width="120">
        <template scope="scope">
          <pre>&nbsp;{{scope.row.creditTypeString}}</pre>
        </template>
      </el-table-column>
      <el-table-column label="分账时间" prop="transactionTime" min-width="160"></el-table-column>
      <el-table-column label="采购商ID" prop="customerNumber" min-width="120"></el-table-column>
      <el-table-column label="采购商名称" prop="customerCompany" min-width="120"></el-table-column>
      <el-table-column label="金融客户" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.hasOpenedBaitiao ==1">
            <span class="icon-baitiao"></span>
          </template>
          <template v-else>
            <span class="icon-feibaitiao"></span>
          </template>
          <template v-if="scope.row.hasOpenedYanzhen == 1">
            <span class="icon-yanzhen"></span>
          </template>
          <template v-else>
            <span class="icon-feiyanzhen"></span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="供应商ID" prop="sellerNumber" min-width="120"></el-table-column>
      <el-table-column label="供应商名称" prop="shopCompany" min-width="120"></el-table-column>
      <el-table-column label="销售货款/元" prop="payMoney" :formatter="formatNumber" min-width="100"></el-table-column>
      <el-table-column label="支付累计/元" prop="outMoney" :formatter="formatNumber" min-width="100"></el-table-column>
      <el-table-column label="销售员" prop="salesName" min-width="120"></el-table-column>
      <el-table-column label="采购员" prop="guiderName" min-width="120"></el-table-column>
      <el-table-column label="支付金额/元" prop="" min-width="260">
        <template scope="scope">
          <pre>&nbsp;{{scope.row.outReposityString}}</pre>
        </template>
      </el-table-column>
      <el-table-column label="退补款金额/元" prop="" min-width="260">
        <template scope="scope">
          <pre>&nbsp;{{scope.row.returnReplaceString}}</pre>
        </template>
      </el-table-column>
      <el-table-column label="扣数金额/元" prop="buttonNumberString" min-width="200">
      <template scope="scope">
          <pre>&nbsp;{{scope.row.buttonNumberString}}</pre>
        </template></el-table-column>
      <el-table-column label="对账金额/元" prop="reconciliationString" min-width="400">
      <template scope="scope">
          <pre>&nbsp;{{scope.row.reconciliationString}}</pre>
        </template></el-table-column></el-table-column>
      <el-table-column label="对账累计/元" prop="incomeMoney" :formatter="formatNumber" min-width="100"></el-table-column>
      <el-table-column label="差异" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.isEdit">
            <el-input @keyup.enter.native="confirmEditThChaMoney(scope.row)" type="number" v-model="scope.row.thChaMoney"></el-input>
          </template>
          <template v-else>
            <div @click="scope.row.isEdit = true">
              {{Number(scope.row.thChaMoney).toFixed(2)}}
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="欠款差额/元" prop="chaMoney" :formatter="formatNumber" min-width="120"></el-table-column>
      <el-table-column label="状态" prop="" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.status == 0">
            <span class="forgive-color">未核销</span>
          </template>
          <template v-if="scope.row.status == 1">
            <span class="forgive-color">已核销</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="" min-width="80" fixed="right">
        <template scope="scope">
          <template v-if="scope.row.financeRemark">
            <el-tooltip class="item" effect="dark" :content="scope.row.financeRemark" placement="top-start">
              <span style="color:#fff;background-color:#2FB468;padding:3px 5px;border-radius:5px;cursor:pointer" @click="showRemarkDialog(scope.row)">备注</span>
            </el-tooltip>
          </template>
          <template v-else>
            <el-button type="primary" size="mini" @click.native="showRemarkDialog(scope.row)">备注</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-content">
      <pagination :page="page.pageNumber" :total="page.totalCount" :render="getData" :options="requestParams"></pagination>
    </div>
    <el-dialog size="tiny" title="修改备注" v-model="remarkDialogVisible">
      <el-form>
        <el-form-item label="备注" style="text-align:right">
          <el-input v-model="reqRemarkParams.financeRemark" type="textarea" :autosize="{minRows: 6, maxRows: 6}" resize="none"  @keyup.enter.native="confirmEditRemark"></el-input>
          <p v-if="reqRemarkParams.financeRemark" class="remark-font">{{reqRemarkParams.financeRemark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <footer>
        <el-button size="small" @click.native="remarkDialogVisible = false">取消</el-button>
        <el-button size="small" @click.native="confirmEditRemark" type="primary">确定</el-button>
      </footer>
    </el-dialog>
    <ExportReportsDialog :config="exportReportsConfig"></ExportReportsDialog>
  </section>
</template>

<script>
import Tabs from 'components/orderManageTabs'
import FormFilters from 'components/filters.vue'
import Pagination from 'components/pagination'
import ExportReportsDialog from 'components/exportReportsDialog'
import { newRequest } from 'common/utils'
export default {
  components: {
    Tabs,
    FormFilters,
    Pagination,
    ExportReportsDialog,
  },
  data() {
    return {
      reqTime: [],
      fullscreenLoading: false,
      totalChaMoney: '',
      tableData: [],
      tableHeight: 600,
      remarkDialogVisible: false,
      reqRemarkParams: {
        id: '',
        orderNumber: '',
        financeRemark: ''
      },
      exportReportsConfig: {
        isShow: false,
      },
      requestParams: {
        transactionTimeBegin: new Date().getTime() - 90 * 1000 * 3600 * 24,
        transactionTimeEnd: new Date().getTime(),
        queryType: 1,
        toEmail: '',
        pageNumber: 1,
        pageSize: 20,
        status: ''
      },
      page: {
        pageSize: 20,
        pageNumber: 1,
        totalCount: 20
      },
      formConfig: [
        {
          label: '',
          type: 'input',
          key: 'orderNumber',
          placeholder: '订单号'
        }, {
          label: '',
          type: 'input',
          key: 'customerCompany',
          placeholder: '采购商及ID'
        }, {
          label: '',
          type: 'input',
          key: 'shopCompany',
          placeholder: '供应商及ID'
        }, {
          label: '',
          type: 'input',
          key: 'salesName',
          placeholder: '销售员姓名'
        }, {
          label: '',
          type: 'input',
          key: 'guiderName',
          placeholder: '采购员姓名'
        }, {
          type: 'select',
          key: 'status',
          placeholder: '状态',
          selectOptions: [
            { label: '状态', value: '' },
            { label: '未核销', value: 0 },
            { label: '已核销', value: 1 },
          ]
        }
      ],
      pickerOptions0: {
        disabledDate(time) {
          return Date.now() < Date.parse(new Date(time))
        }
      },
      pickerOptions1: {
        disabledDate(time) {
          return Date.now() < Date.parse(new Date(time))
        }
      },
    }
  },
  mounted() {
    this.tableHeight = String(window.document.body.clientHeight - 394)
    this.getData()
  },
  methods: {
    getData() {
      this.fullscreenLoading = true
      newRequest({
        url: '/redwood/report/bulkToReceive/list',
        data: this.requestParams,
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          res.page.result.map(item => {
            item.isEdit = false
          })
          this.page.pageNumber = res.page.pageNumber
          this.page.pageSize = res.page.pageSize
          this.page.totalCount = res.page.totalCount
          this.tableData = res.page.result
        } else {
          this.$message.error(res.msg)
        }
        this.getSumary()
        this.fullscreenLoading = false
      })
    },
    getSumary() {
      newRequest({
        url: '/redwood/report/bulkToReceive/getSumary',
        data: this.requestParams,
        method: 'get',
      }).then(res => {
        if (res.success == 1) {
          this.totalChaMoney = res.obj
        }
      })
    },
    confirmEditThChaMoney(item) {
      this.fullscreenLoading = true
      let obj = {
        orderNumber: item.orderNumber,
        thChaMoney: item.thChaMoney
      }
      newRequest({
        url: '/redwood/buyfollow/Order/updateThCha',
        data: obj,
        method: 'post',
        contentType: 'application/json'
      }).then(res => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          item.isEdit = false
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
        this.fullscreenLoading = false
      })
    },
    confirmEditRemark() {
      this.fullscreenLoading = true
      newRequest({
        url: '/redwood/buyfollow/Order/updateRemark',
        data: this.reqRemarkParams,
        method: 'post',
        contentType: 'application/json'
      }).then(res => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.remarkDialogVisible = false
        } else {
          this.$message.error(res.msg)
        }
        this.fullscreenLoading = false
        this.getData()
      })
    },
    showRemarkDialog(item) {
      this.reqRemarkParams.id = item.id
      this.reqRemarkParams.orderNumber = item.orderNumber
      if (item.financeRemark) {
        this.reqRemarkParams.financeRemark = item.financeRemark
      } else {
        this.reqRemarkParams.financeRemark = ''
      }
      this.remarkDialogVisible = true
    },
    search(requestParams) {
      // var timeArr = requestParams.time
      if ((this.requestParams.status === 0 || this.requestParams.status === 1) && (!this.requestParams.transactionTimeBegin || !this.requestParams.transactionTimeEnd)) {
        this.$message('请选择时间范围，时间范围不能超过3个月')
      } else {
        if (this.requestParams.transactionTimeBegin) {
          this.requestParams.transactionTimeBegin = new Date(this.requestParams.transactionTimeBegin).getTime()
        } else {
          this.requestParams.transactionTimeBegin = ''
        }
        if (this.requestParams.transactionTimeEnd) {
          // this.requestParams.transactionTimeEnd = timeArr[1].getTime();
          this.requestParams.transactionTimeEnd = new Date(this.requestParams.transactionTimeEnd).getTime() + 1000 * 60 * 60 * 24
        } else {
          this.requestParams.transactionTimeEnd = '';
        }
        this.requestParams.orderNumber = requestParams.orderNumber
        this.requestParams.customerCompany = requestParams.customerCompany
        this.requestParams.shopCompany = requestParams.shopCompany
        this.requestParams.salesName = requestParams.salesName
        this.requestParams.guiderName = requestParams.guiderName
        this.requestParams.status = requestParams.status
        this.getData()
      }
    },
    showExportDialog(requestParams) {
      this.fullscreenLoading = true
      this.exportReportsConfig = Object.assign(this.exportReportsConfig, {
        isShow: true,
        status: requestParams.status,
        orderNumber: requestParams.orderNumber,
        customerCompany: requestParams.customerCompany,
        shopCompany: requestParams.shopCompany,
        salesName: requestParams.salesName,
        guiderName: requestParams.guiderName,
        transactionTimeBegin: this.requestParams.transactionTimeBegin ? new Date(this.requestParams.transactionTimeBegin).getTime() : '',
        transactionTimeEnd: this.requestParams.transactionTimeEnd ? new Date(this.requestParams.transactionTimeEnd).getTime() : ''
      })
      console.log(this.exportReportsConfig, 'this.exportReportsConfig')
      this.fullscreenLoading = false
    },
    canExport() {
      let bool = false
      if ((this.requestParams.status === 0 || this.requestParams.status === 1) && (!this.requestParams.transactionTimeBegin || !this.requestParams.transactionTimeEnd)) {
        bool = true
      }
      return bool
    },
    handleStatusChange(val) {
      this.requestParams.status = val
    },
    handleTimeChange() {
      const self = this
      if (self.requestParams.status === 0 || self.requestParams.status === 1) {
        if (self.requestParams.transactionTimeEnd) {
          self.pickerOptions0 = {
            disabledDate(time) {
              return (time.getTime() >= Date.parse(new Date(self.requestParams.transactionTimeEnd)) || time.getTime() <= Date.parse(new Date(self.requestParams.transactionTimeEnd)) - 93 * 3600 * 24 * 1000)
            }
          }
        }
        if (self.requestParams.transactionTimeBegin) {
          self.pickerOptions1 = {
            disabledDate(time) {
              return (time.getTime() >= Date.parse(new Date(self.requestParams.transactionTimeBegin)) + 93 * 3600 * 24 * 1000 || time.getTime() <= Date.parse(new Date(self.requestParams.transactionTimeBegin)))
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
pre {
  font-family: "Microsoft YaHei" !important;
  text-align: left;
}
.filter-content {
  .el-form {
    background-color: #fff;
    margin-bottom: 10px;
  }
  .el-form-item {
    margin-bottom: 10px;
    padding: 10px 0px;
  }
}

.totalChaMoney {
  strong {
    color: #f00;
  }
}
</style>
