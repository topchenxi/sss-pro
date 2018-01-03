<template>
  <section v-loading.body="fullscreenLoading">
    <i class="el-icon-arrow-left goback-icon" @click="goBack">返回</i>
    <!-- <el-button @click.native="goBack" size="small" type="primary" style="float:right">返回</el-button> -->
    <!-- <h1 style="font-size: 25px;">操作记录</h1> -->
    <el-row class="title-content">
      <el-col :span="4">总余额：
        <span style="color:#f00">{{totalData.totalBalance | formateNumber}}元</span>
      </el-col>
      <el-col :span="4">总徙木额度：
        <span style="color:#f00">{{totalData.totalBaitiaoCreditLine | formateNumber}}元</span>
      </el-col>
      <el-col :span="4">总雁阵额度：
        <span style="color:#f00">{{totalData.totalYanzhenCreditLine | formateNumber}}元</span>
      </el-col>
      <el-col :span="4">总搜芽额度：
        <span style="color:#f00">{{totalData.totalCreditLine | formateNumber}}元</span>
      </el-col>
    </el-row>
    <el-row class="search-content" :gutter="20">
      <el-col :span="4">
        <p>费用类型</p>
        <el-select v-model="requestParams.type">
          <el-option label="全部" value=""></el-option>
          <el-option label="充值" value="1"></el-option>
          <el-option label="提现" value="2"></el-option>
          <el-option label="支出" value="3"></el-option>
          <el-option label="额度调整" value="4"></el-option>
          <el-option label="还款" value="5"></el-option>
          <el-option label="退款" value="6"></el-option>
          <el-option label="预扣" value="7"></el-option>
          <el-option label="预扣解除" value="8"></el-option>
          <el-option label="转入" value="9"></el-option>
          <el-option label="转出" value="10"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <p>金额</p>
        <el-input v-model="requestParams.deltaMoney"></el-input>
      </el-col>
      <el-col :span="8" class="timePicker-content">
        <p>时间</p>
        <el-date-picker  :default-value="defaultBegin" class='c-date-start' :editable="false" v-model="requestParams.createTimeBegin" type="datetime" disabledDate='disabledStartDate' placeholder="选择开始时间">
        </el-date-picker>
        <span class='split-text'>至</span>
        <el-date-picker  :default-value="defaultEnd" class='c-date-end' :editable="false" v-model="requestParams.createTimeEnd" type="datetime" disabledDate='disabledEndDate' placeholder="选择结束时间">
        </el-date-picker>
      </el-col>
      <el-col :span="4">
        <p>&nbsp</p>
        <el-button @click.native="getData" type="primary">搜索</el-button>
        <el-button @click.native="exportHandle" type="primary">导出</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" :height="tableHeight" border>
      <el-table-column label="序号" prop="index" width="60">
      </el-table-column>
      <el-table-column label="时间" prop="createTime" :formatter="formatTime"  width="160"></el-table-column>
      <el-table-column label="费用类型"  width="100">
        <template scope="scope">
          <template v-if="scope.row.type == 1">充值</template>
          <template v-if="scope.row.type == 2">提现</template>
          <template v-if="scope.row.type == 3">支出</template>
          <template v-if="scope.row.type == 4">额度调整</template>
          <template v-if="scope.row.type == 5">还款</template>
          <template v-if="scope.row.type == 6">退款</template>
          <template v-if="scope.row.type == 7">预扣</template>
          <template v-if="scope.row.type == 8">预扣解除</template>
          <template v-if="scope.row.type == 9">转入</template>
          <template v-if="scope.row.type == 10">转出</template>
        </template>
      </el-table-column>
      <el-table-column label="交易信息" prop="tradeInfo" width="160"></el-table-column>
      <el-table-column label="采购商" prop="" width="140">
        <template scope="scope">
          {{scope.row.customerCompany}}/{{scope.row.customerNumber}}
        </template>
      </el-table-column>
      <el-table-column label="金额/元" prop="">
        <template scope="scope">
          <template v-if="scope.row.deltaMoney < 0">
            <span style="color:#f00">{{(scope.row.deltaMoney).toFixed(2)}}</span>
          </template>
          <template v-else>
            {{scope.row.deltaMoney}}
          </template>
        </template>
      </el-table-column>
      <el-table-column label="可用余额/元" prop="availableBalance" :formatter="formatNumber"></el-table-column>
      <el-table-column label="可用搜芽额度/元" prop="remainLine" :formatter="formatNumber"></el-table-column>
      <el-table-column label="可用徙木额度/元" prop="baitiaoRemainLine" :formatter="formatNumber"></el-table-column>
      <el-table-column label="可用雁阵额度/元" prop="yanzhenRemainLine" :formatter="formatNumber"></el-table-column>
      <el-table-column label="经办人" prop="operator"></el-table-column>
      <el-table-column label="账户">
        <template scope="scope">
          <template v-if="scope.row.moneyType == 1">余额</template>
          <template v-if="scope.row.moneyType == 2">搜芽额度</template>
          <template v-if="scope.row.moneyType == 3">徙木额度</template>
          <template v-if="scope.row.moneyType == 4">雁阵额度</template>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template scope="scope">
          <template v-if="scope.row.remark">
            <el-tooltip class="item" effect="dark" :content="scope.row.remark" placement="top-start">
              <span style="color:#fff;background-color:#2FB468;padding:1px 5px;border-radius:2px;cursor:pointer" @click="showRemarkDialog(scope.row)">修改备注</span>
            </el-tooltip>
          </template>
          <template v-else>
            <el-button type="primary" size="mini" @click.native="showRemarkDialog(scope.row)">修改备注</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-content">
      <pagination :page="page.pageNumber" :total="page.totalCount" :render="getData" :options="requestParams"></pagination>
    </div>
    <!-- 修改备注dialog -->
    <el-dialog v-model="remarkDialogVisible" size="tiny" title="修改备注">
      <el-form>
        <el-form-item label="备注" style="text-align:right">
          <el-input v-model="reqRemarkParams.remark" :autosize="{minRows: 6, maxRows: 6}" resize="none" type="textarea"></el-input>
          <p v-if="reqRemarkParams.remark" class="remark-font">{{reqRemarkParams.remark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <footer>
        <el-button @click.native="remarkDialogVisible = false" size="small">取消</el-button>
        <el-button @click.native="confirmEditRemark" type="primary" size="small" :disabled="reqRemarkParams.remark > 500">确定</el-button>
      </footer>
    </el-dialog>
  </section>
</template>

<script>
import pagination from 'components/pagination'
import {
  newRequest
} from 'common/utils'
export default {
  components: {
    pagination,
  },
  data() {
    return {
      fullscreenLoading: false,
      remarkDialogVisible: false,
      totalData: {},
      tableData: [],
      tableHeight: 600,
      reqRemarkParams: {
        id: '',
        remark: '',
      },
      requestParams: {
        pageNumber: 1,
        pageSize: 20,
        type: '',
        createTimeBegin: '',
        createTimeEnd: '',
        deltaMoney: ''
      },
      page: {
        pageSize: 20,
        pageNumber: 1,
        totalCount: 20,
      },
      defaultBegin: new Date((new Date().getFullYear()) + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getDate())),
      defaultEnd: new Date((new Date().getFullYear()) + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getDate()) + ' ' + 23 + ':' + 59 + ':' + 59)
    }
  },
  mounted() {
    this.tableHeight = String(window.document.body.clientHeight - 310)
    this.getSumary()
  },
  methods: {
    getData() {
      if (this.requestParams.createTimeBegin) {
        this.requestParams.createTimeBegin = new Date(this.requestParams.createTimeBegin).getTime()
      }
      if (this.requestParams.createTimeEnd) {
        this.requestParams.createTimeEnd = new Date(this.requestParams.createTimeEnd).getTime()
      }
      newRequest({
        url: '/redwood/transactionrecord/list',
        data: this.requestParams,
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          let index = 1
          res.page.result.map(item => {
            item.index = index
            index += 1
          })
          this.tableData = res.page.result
          this.page = {
            pageSize: res.page.pageSize,
            pageNumber: res.page.pageNumber,
            totalCount: res.page.totalCount
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getSumary() {
      newRequest({
        url: '/redwood/account/CustomerAccount/getTotal',
        data: {},
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.totalData.totalBaitiaoCreditLine = res.totalBaitiaoCreditLine
          this.totalData.totalBalance = res.totalBalance
          this.totalData.totalCreditLine = res.totalCreditLine
          this.totalData.totalYanzhenCreditLine = res.totalYanzhenCreditLine
        }
        this.getData()
      })
    },
    confirmEditRemark() {
      newRequest({
        url: '/redwood/transactionrecord/updateRemark',
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
        this.getData()
      })
    },
    showRemarkDialog(item) {
      this.reqRemarkParams.id = item.id
      if (item.remark !== null) {
        this.reqRemarkParams.remark = item.remark
      } else {
        this.reqRemarkParams.remark = ''
      }
      this.remarkDialogVisible = true
    },
    exportHandle() {
      this.fullscreenLoading = true
      newRequest({
        url: '/redwood/transactionrecord/export',
        data: this.requestParams,
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          window.open('http://www.soouya.com' + res.obj)
        } else {
          this.$message.error(res.msg)
        }
        this.fullscreenLoading = false
      })
    },
    goBack() {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.title-content {
  margin-top: 12px;
  margin-bottom: 10px;
  border-bottom: 2px solid #bbb;
  .el-col {
    min-width: 250px;
    font-size: 15px;
    span {
      line-height: 30px;
    }
  }
}

.search-content {
  margin: 10px 10px;
  .el-col {
    > p {
      color: #aaa;
    }
  }
}

.timePicker-content {
  min-width: 500px;
  .split-text {
    line-height: 35px;
  }

  .c-date-start {
    min-width: 150px;
    max-width: 250px;
    display: inline-block;
    vertical-align: middle;
    .el-date-editor__editor {
      border-radius: 0 4px 4px 0 !important;
    }
  }

  .c-date-end {
    min-width: 150px;
    max-width: 250px;
    width: inherit;
    vertical-align: middle;
    .el-date-editor__editor {
      border-radius: 4px 0 0 4px !important;
    }
  }
}
</style>
