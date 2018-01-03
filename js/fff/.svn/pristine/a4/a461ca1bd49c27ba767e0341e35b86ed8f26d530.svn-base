<template>
  <section v-loading.fullscreen.lock="pageLoading" element-loading-text="拼命加载中">
    <FormFilters :config="formConfig" class="filter-content" @search="search">
      <template slot="manipulate" scope="form">
        <el-form-item>
          <p style="font-size:12px;color:#999;line-height:15px;">报销时间</p>
          <el-date-picker class='c-date-start' v-model="requestParams.createTimeBegin" type="date" placeholder="选择开始时间">
          </el-date-picker>
          <span class='split-text'>至</span>
          <el-date-picker class='c-date-end' v-model="requestParams.createTimeEnd" type="date" placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <p style="font-size:12px;color:#999;line-height:15px;">&nbsp;</p>
          <el-button type="primary" @click="search(form.scope.requestParams)">搜索</el-button>
          <el-button type="primary" @click="ExportHandle(form.scope.requestParams)">导出</el-button>
        </el-form-item>
      </template>
    </FormFilters>
    <Tabs></Tabs>
    <div style="padding: 10px 0px 10px 15px">
      <span>差额合计：
        <span style="color:#f00">{{totalChaMoney}}</span>元</span>
    </div>
    <template v-show="tableData.length > 0">
      <el-table :data="tableData" :height="tableHeight" border>
        <el-table-column prop="number" label="订单号" align="center" width="200">
        </el-table-column>
        <el-table-column prop="createTime" label="报销时间" align="center" width="160">
        </el-table-column>
        <el-table-column prop="reimburseMoney" label="报销金额" align="center" width="120">
        </el-table-column>
        <el-table-column prop="customerNumber" label="采购商ID" align="center" width="120">
        </el-table-column>
        <el-table-column prop="customerCompany" label="采购商名称" align="center" width="160">
        </el-table-column>
        <el-table-column prop="" label="金融客户" align="center" width="120">
          <template scope="scope">
            <template v-if="scope.row.hasOpenedBaitiao == 1">
              <span class="icon-baitiao"></span>
            </template>
            <template v-if="scope.row.hasOpenedBaitiao == 0">
              <span class="icon-feibaitiao"></span>
            </template>
            <template v-if="scope.row.hasOpenedYanzhen == 1">
              <span class="icon-yanzhen"></span>
            </template>
            <template v-if="scope.row.hasOpenedYanzhen == 0">
              <span class="icon-feiyanzhen"></span>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="sellerNumber" label="供应商ID" align="center" width="120">
        </el-table-column>
        <el-table-column prop="shopCompany" label="供应商名称" align="center" width="120">
        </el-table-column>
        <el-table-column prop="totalSaleMoney" label="销售合计" align="center" width="120">
        </el-table-column>
        <el-table-column prop="followerName" label="销售员" align="center" width="120">
        </el-table-column>
        <el-table-column prop="guiderName" label="采购员" align="center" width="120">
        </el-table-column>
        <el-table-column prop="" label="对账时间" align="center" width="160">
          <template scope="scope">
            <template v-if="!scope.row.reconciliationTime"></template>
            <template v-if="scope.row.reconciliationTime">{{scope.row.reconciliationTime | formatTime}}</template>
          </template>
        </el-table-column>
        <el-table-column prop="totalMoney" label="对账金额" align="center" width="120">
        </el-table-column>
        <el-table-column prop="" label="对账款项类型" align="center" width="140">
          <template scope="scope">
            <template v-if="scope.row.creditType == 1">搜芽额度</template>
            <template v-if="scope.row.creditType == 2">白条额度</template>
            <template v-if="scope.row.creditType == 3">余额</template>
          </template>
        </el-table-column>
        <el-table-column prop="" label="到账时间" align="center" width="120">
          <template scope="scope">
            <template v-if="scope.row.creditType == 3">--</template>
            <template v-else>{{scope.row.incomeTime}}</template>
          </template>
        </el-table-column>
        <el-table-column label="差异" align="center" fixed="right">
          <template scope="scope">
            <template v-if="scope.row.isEdit">
              <el-input v-model.number="scope.row.diffMoney" @keyup.native.enter="editDifference(scope.row)"></el-input>
            </template>
            <template v-else>
              <div @click="scope.row.isEdit = !scope.row.isEdit">
                {{scope.row.diffMoney}}
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="diff2Money" label="差额" align="center" fixed="right">
        </el-table-column>
        <el-table-column label="状态" align="center" fixed="right">
          <template scope="scope">
            <template v-if="!scope.row.status">
              <span class="forgive-color">未核销</span>
            </template>
            <template v-else>
              <span class="forgive-color">已核销</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" fixed="right">
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
      <div class="pagination-content">
        <Pagination :page="pagination.pageNumber" :total="pagination.totalCount" :options="requestParams" :render="getData"></Pagination>
      </div>
    </template>
    <el-dialog title="添加备注" v-model="reportsRemarkConfig.isShow" size="tiny">
      <el-form :rules="rules">
        <el-form-item prop="remark" class="nowrap">
          <el-input v-model="reportsRemarkConfig.remark" type="textarea" :autosize="{minRows: 6, maxRows: 6}" resize="none" @keyup.enter.native="save"></el-input>
          <p v-if="reportsRemarkConfig.remark" class="remark-font">{{reportsRemarkConfig.remark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
          <!-- <limitInput :maxLength="500" :model="reportsRemarkConfig.remark" type="textarea" v-on:update="updateRemark"></limitInput> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="reportsRemarkConfig.isShow = false">取消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import Tabs from 'components/orderManageTabs'
import FormFilters from 'components/filters.vue'
import Pagination from 'components/pagination'
import reportsApi from 'api/reports'
import limitInput from 'components/limitInput.vue'
import {
  formatTimeString,
} from 'common/utils'
export default {
  components: {
    Tabs,
    FormFilters,
    Pagination,
    limitInput
  },
  data() {
    const validateLength = (rule, value, callback) => {
      if (value.length > 500) {
        callback(new Error('备注不能超过500字'));
      } else {
        callback();
      }
    }
    return {
      formConfig: [
        {
          label: '',
          type: 'input',
          key: 'number',
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
          key: 'followerName',
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
      requestParams: {
        createTimeBegin: '',
        createTimeEnd: '',
        key: '',
        queryType: 1,
        toEmail: '',
        pageNumber: 1,
        pageSize: 20
      },
      tableData: [],
      pagination: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 20
      },
      reportsRemarkConfig: {
        isShow: false,
        remark: ''
      },
      editData: null,
      tableHeight: 600,
      pageLoading: false,
      totalChaMoney: 0,
      rules: {
        remark: [
          { validator: validateLength, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.tableHeight = String(window.document.body.clientHeight - 394);
    this.getData()
  },
  methods: {
    updateRemark(val) {
      this.reportsRemarkConfig.remark = val;
    },
    search(requestParams) {
      // var timeArr = requestParams.time
      if (this.requestParams.createTimeBegin) {
        this.requestParams.createTimeBegin = new Date(this.requestParams.createTimeBegin).getTime();
      } else {
        this.requestParams.createTimeBegin = ''
      }
      if (this.requestParams.createTimeEnd) {
        this.requestParams.createTimeEnd = new Date(this.requestParams.createTimeEnd).getTime() + 1000 * 60 * 60 * 24
      } else {
        this.requestParams.createTimeEnd = '';
      }
      this.requestParams.number = requestParams.number
      this.requestParams.customerCompany = requestParams.customerCompany
      this.requestParams.shopCompany = requestParams.shopCompany
      this.requestParams.followerName = requestParams.followerName
      this.requestParams.guiderName = requestParams.guiderName
      this.requestParams.status = requestParams.status
      this.getData()
    },
    getData() {
      this.pageLoading = true
      console.log(this.requestParams)
      reportsApi.queryJianbanReports(this.requestParams).then((response) => {
        this.pageLoading = false
        if (this.requestIsSuccess(response)) {
          console.log(response)
          this.pagination.pageNumber = response.page.pageNumber
          this.pagination.pageSize = response.page.pageSize
          this.pagination.totalCount = response.page.totalCount
          this.totalChaMoney = response.sum
          this.tableData = response.page.result.map((item) => {
            if (item.createTime) {
              item.createTime = formatTimeString(item.createTime)
            } else {
              item.createTime = ''
            }
            if (item.reconciliationTime) {
              item.reconciliationTime = formatTimeString(item.reconciliationTime)
            } else {
              item.reconciliationTime = ''
            }
            if (item.reconciliationTime) {
              item.reconciliationTime = formatTimeString(item.reconciliationTime)
            } else {
              item.reconciliationTime = ''
            }
            if (item.incomeTime) {
              item.incomeTime = formatTimeString(item.incomeTime).slice(0, 10)
            } else {
              item.incomeTime = ''
            }
            this.$set(item, 'isEdit', false);
            return item
          })
          console.log(this.tableData)
          console.log(this.tableData.length)
        }
      })
    },
    editDifference(data) {
      let params = {
        id: data.id,
        diffMoney: data.diffMoney
      };
      reportsApi.jianbanEdit(params).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.getData()
        }
      });
    },
    ExportHandle(requestParams) {
      this.pageLoading = true
      if (this.requestParams.createTimeBegin) {
        this.requestParams.createTimeBegin = new Date(this.requestParams.createTimeBegin).getTime();
      } else {
        this.requestParams.createTimeBegin = ''
      }
      if (this.requestParams.createTimeEnd) {
        this.requestParams.createTimeEnd = new Date(this.requestParams.createTimeEnd).getTime() + 1000 * 60 * 60 * 24
      } else {
        this.requestParams.createTimeEnd = '';
      }
      this.requestParams.number = requestParams.number
      this.requestParams.customerCompany = requestParams.customerCompany
      this.requestParams.shopCompany = requestParams.shopCompany
      this.requestParams.followerName = requestParams.followerName
      this.requestParams.guiderName = requestParams.guiderName
      this.requestParams.status = requestParams.status
      let params = JSON.parse(JSON.stringify(this.requestParams))
      params.export = 1
      // let params = {
      //   export: 1
      // }
      reportsApi.queryJianbanReports(params).then((response) => {
        if (this.requestIsSuccess(response)) {
          if (response.success == 1) {
            window.open(response.obj)
          } else {
            this.$message.error(response.msg);
          }
        }
        this.pageLoading = false
      })
    },
    showRemarkDialog(data) {
      this.editData = data
      this.reportsRemarkConfig.isShow = true;
      this.reportsRemarkConfig.remark = (!data.financeRemark) ? '' : data.financeRemark
    },
    save() {
      let params = {
        id: this.editData.id,
        financeRemark: this.reportsRemarkConfig.remark
      }
      reportsApi.jianbanEdit(params).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.reportsRemarkConfig.isShow = false;
          this.getData()
        }
      })
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

.filter-content {
  .el-form {
    background-color: #fff;
    margin-bottom: 10px;
  }
  .el-form-item {
    margin-bottom: 10px;
    padding: 10px 15px;
  }
}
</style>
