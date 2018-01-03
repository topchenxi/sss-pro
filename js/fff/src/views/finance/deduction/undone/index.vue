<template>
    <section v-loading.fullscreen.lock="pageLoading" element-loading-text="拼命加载中...">
      <HeadFilters v-on:getParams="getFilter" :params="requestParams">
        <template slot="headFilterSlot" scope="scope">
          <el-col :span="2">
            <p>&nbsp</p>
            <el-button type="primary" :disabled="selectData.length === 0" @click="showHandleDialog(selectData)">批量处理</el-button>
          </el-col>
        </template>
      </HeadFilters>
      <Tabs></Tabs>
      <div class="count-money">
        <span>客户扣数金额:
          <strong>{{totalBuyKouShuMoney | formatNumber}}元</strong>
        </span>
        <span>档口退款金额:
          <strong>{{totalTuiKuanMoney | formatNumber}}元</strong>
        </span>
      </div>
      <el-table :height="tableHeight" :data="tableData" border @selection-change="handleSelectionChange">
        <el-table-column width="50" type="selection" align="center" fixed :selectable="canSelect">
        </el-table-column>
        <el-table-column align="center" label="提交时间" prop="commitCaiWuTime" :formatter="formatTime" min-width="160"></el-table-column>
        <el-table-column align="center" label="扣数单号" prop="number" min-width="140"></el-table-column>
        <el-table-column align="center" label="出仓单号" prop="outReposityNumber" min-width="130"></el-table-column>
        <el-table-column align="center" label="订单号" prop="serviceNumber" min-width="200"></el-table-column>
        <el-table-column align="center" label="扣数类型" prop="buyQuntity" min-width="100">
          <template scope="scope">
            {{scope.row.type | typeFilter}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="采购商" prop="customerCompany" min-width="120"></el-table-column>
        <el-table-column align="center" label="供应商" prop="shopCompany" min-width="120"></el-table-column>
        <el-table-column align="center" label="发货数量" prop="sendQuantity" min-width="120">
          <template scope="scope">
            {{scope.row.sendQuantity | formatNumber}}{{scope.row.quantityUnit}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="采购商扣数" prop="buyerKouShu" min-width="120">
          <template scope="scope">
            {{scope.row.buyerKouShu | formatNumber}}{{scope.row.quantityUnit}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="供应商扣数" prop="sellerKouShu" min-width="120">
          <template scope="scope">
            {{scope.row.sellerKouShu | formatNumber}}{{scope.row.quantityUnit}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="采购商扣数金额(元)" min-width="160">
          <template scope="scope">
            <template v-if="scope.row.kouShuMoney">
              <span>{{scope.row.kouShuMoney | formatNumber}}</span>
            </template>
            <template v-if="!scope.row.kouShuMoney">
              <span>{{scope.row.kouShuMoney | formatNumber}}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" label="供应商扣数金额(元)" min-width="160">
          <template scope="scope">
            <template v-if="scope.row.tuiKuanMoney">
              <span>{{scope.row.tuiKuanMoney | formatNumber}}</span>
            </template>
            <template v-if="!scope.row.tuiKuanMoney">
              <span>{{scope.row.tuiKuanMoney | formatNumber}}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" label="跟单员" prop="" min-width="120">
          <template scope="scope">
            {{scope.row.followerName}}/{{scope.row.followerTel}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="买货员" prop="" min-width="120">
          <template scope="scope">
            {{scope.row.purchaserName}}/{{scope.row.purchaserTel}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="采购员" min-width="120">
          <template scope="scope">
            {{scope.row.guiderName}}/{{scope.row.guiderTel}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="处理状态" prop="status" min-width="100">
          <template scope="scope">
            <template v-if="scope.row.status === 1">
              <span class="forgive-color">待处理</span>
            </template>
            <template v-if="scope.row.status === -1">
              <span class="forgive-color">已取消</span>
            </template>
            <template v-if="scope.row.status === 2">
              <span class="forgive-color">已处理</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200" fixed="right">
          <template scope="scope">
            <el-button size="mini" @click="showHandleDialog(scope.row)" style="width:60px;margin:2px;" type="warning"  :disabled="scope.row.billId != ''">处理</el-button>
            <el-button size="mini" @click="showExceptionDialog(scope.row)" style="width:60px;margin:2px;" type="primary">异常</el-button>
            <template v-if="!scope.row.caiWuRemark">
              <span class="remark-btn" style="display:inline-block" @click="showRemarkDialog(scope.row)">备注</span>
            </template>
            <template v-else>
              <el-tooltip :content="scope.row.caiWuRemark">
                <span class="remark-btn" style="display:inline-block" @click="showRemarkDialog(scope.row)">备注</span>
              </el-tooltip>
            </template>
            <router-link :to="`/finance/deduction/details/undone?id=${scope.row.id}&outReposityId=${scope.row.outReposityId}`">
              <el-button size="mini" style="width:60px;margin:2px 2px 2px 4px;" type="primary">详情</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-content">
      <Pagination :page="pagination.pageNumber" :total="pagination.totalCount" :options="requestParams" :render="getData"></Pagination>      
      </div>
      <el-dialog title="备注" size="tiny" v-model="remarkDialogVisible">
        <el-form label-position="right">
          <p>备注：</p>
          <el-form-item>
            <el-input type="textarea" :autosize="{minRows: 6,maxRows:6}" resize="none" v-model="reqRemarkParams.caiWuRemark" placeholder="请添加备注内容"></el-input>
            <p v-if="reqRemarkParams.caiWuRemark" class="remark-font">{{reqRemarkParams.caiWuRemark.length}}/500</p>
            <p v-else class="remark-font">0/500</p>
          </el-form-item>
        </el-form>
        <footer>
          <el-button @click.native="reqRemarkParams.remark = '',remarkDialogVisible = false" size="small">取消</el-button>
          <el-button size="small" type="primary" style="width:100px;" :disabled="reqRemarkParams.caiWuRemark.length > 500" @click.native="confirmRemark">确认</el-button>
        </footer>
      </el-dialog>
      <DeductionExceptionDialog :config="exceptionDialogConfig" v-on:success="getData"></DeductionExceptionDialog>
      <DeductionHandleDialog :config="handleDialogConfig" v-on:success="getData"></DeductionHandleDialog>
    </section>
  </template>
  
  <script>
  import HeadFilters from 'components/headFilter/HeadFilter'
  import FormFilters from 'components/filters.vue'
  import Tabs from 'components/deductionTabs.vue'
  import DeductionExceptionDialog from 'components/deductionExceptionDialog'
  import DeductionHandleDialog from 'components/deductionHandleDialog'
  import Pagination from 'components/pagination'
  import {
    newRequest,
  } from 'common/utils'
  export default {
    components: {
      HeadFilters,
      FormFilters,
      Tabs,
      DeductionExceptionDialog,
      DeductionHandleDialog,
      Pagination
    },
    data() {
      return {
        // 参数待定
        reqRemarkParams: {
          id: '',
          caiWuRemark: '',
        },
        remarkDialogVisible: false,
        tableHeight: 600,
        testRemark: '44654656',
        tableData: [],
        requestParams: {
          orderNumber: '',
          number: '',
          shopCompany: '',
          customerCompany: '',
          kouShuMoney: '',
          tuiKuanMoney: '',
          timeFrom: '',
          timeTo: '',
          queryType: 1,
          guiderName: '',
          status: 1,
          type: '',
          pageNumber: 1,
          pageSize: 20
        },
        pagination: {
          pageNumber: 1,
          pageSize: 20,
          totalCount: 20
        },
        selectData: [],
        exceptionDialogConfig: {
          isShow: false,
          id: ''
        },
        handleDialogConfig: {
          isShow: false,
          idList: []
        },
        totalBuyKouShuMoney: 0,
        totalTuiKuanMoney: 0,
        pageLoading: false
      }
    },
    filters: {
      typeFilter(val) {
          switch (val) {
            case 1: return '损耗';
            case 2: return '运费';
            case 3: return '售后退换货';
            default: return '其他';
          }
        },
        formatNumber(val) {
          if (val != null) {
            return val.toFixed(2)
          }
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
          status: 1
        }, params)
        if (params.createTimeBegin) {
          this.requestParams.timeFrom = new Date(params.createTimeBegin).getTime()
        }
        delete this.requestParams.createTimeBegin
        if (params.createTimeEnd) {
          this.requestParams.timeTo = new Date(params.createTimeEnd).getTime()
        }
        if (params.shopName) {
          this.requestParams.shopCompany = params.shopName
        } else {
          this.requestParams.shopCompany = ''
        }
        if (params.kouShuMoney) {
          this.requestParams.kouShuMoney = Number(params.kouShuMoney)
        }
        delete this.requestParams.createTimeEnd
        delete params.totalMoney
        this.getData()
      },
      showRemarkDialog(row) {
        this.remarkDialogVisible = true
        this.reqRemarkParams.caiWuRemark = ''
        if (row.caiWuRemark) {
          this.reqRemarkParams.caiWuRemark = row.caiWuRemark
        }
        this.reqRemarkParams.id = row.id
        console.log(row, '5')
      },
      canSelect(row, index) {
        return row.billId === ''
      },
      confirmRemark() {
        newRequest({
          url: '/redwood/buttonNumberFinance/editCaiWuRemark',
          data: this.reqRemarkParams,
          method: 'post',
          contentType: 'application/json',
        }).then(res => {
          if (res.success == 1) {
            this.$message({
              type: 'success',
              message: res.msg,
            })
            this.search()
            this.remarkDialogVisible = false
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      search(params) {
        Object.assign(this.requestParams, this.formatParamsTime(params, 'timeFrom', 'timeTo'))
        this.getData()
      },
      getSumary() {
        newRequest({
          url: '/redwood/buttonNumberFinance/getSumary',
          data: this.requestParams,
          method: 'get'
        }).then(res => {
          if (res.success == 1) {
            this.totalBuyKouShuMoney = res.result[0]
            this.totalTuiKuanMoney = res.result[1]
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      getData(params = {}) {
        this.requestParams = Object.assign(this.requestParams, params)
        delete this.requestParams.totalMoney
        this.pageLoading = true
        newRequest({
          url: '/redwood/buttonNumberFinance/list',
          data: this.requestParams,
          method: 'get',
        }).then(res => {
          this.getSumary()
          if (res.success == 1) {
            this.pagination.pageNumber = res.page.pageNumber
            this.pagination.pageSize = res.page.pageSize
            this.pagination.totalCount = res.page.totalCount
            this.reimburseTotal = res.total
            this.tableData = res.page.result
          } else {
            this.$message.error(res.msg)
          }
          this.pageLoading = false
        })
      },
      showExceptionDialog(data) {
        Object.assign(this.exceptionDialogConfig, {
          isShow: true,
          id: data.id
        })
      },
      showHandleDialog(data) {
        let kouShuMoneyFlag = null; // 用于判断默认显示用的别的没用
        let list = [];
        let customerIds = [];
        let customerId = null
        let kouShuMoney = null
        if (Array.isArray(data)) {
          data.forEach((item) => {
            list.push({
              id: item.id,
              type: item.type,
            })
            customerIds.push(item.customerId)
          })
          kouShuMoney = data.reduce((prev, current, index, array) => {
            return prev + Math.abs(current.kouShuMoney)
          }, 0)
          customerId = customerIds[0]
        } else {
          list.push({
              id: data.id,
              type: data.type,
            })
          kouShuMoney = Math.abs(data.kouShuMoney)
          kouShuMoneyFlag = data.kouShuMoney
          customerId = data.customerId
        }
        if (Array.from(new Set(customerIds)).length > 1) {
          this.$message.warning('请选择同一个采购商')
          return false
        }
        Object.assign(this.handleDialogConfig, {
          isShow: true,
          customerId: customerId,
          kouShuMoney: kouShuMoney,
          kouShuMoneyFlag: kouShuMoneyFlag,
          list
        })
      },
      handleSelectionChange(data) {
        this.selectData = data
      }
    }
  }
  </script>
  
  <style lang="scss">
  .remark-btn {
    border: 1px solid #ccc;
    border-radius: 2px;
    cursor: pointer;
    padding: 1px 15px;
    margin-right: 1px;
    background-color: #2FB468;
    color: #fff;
    border-color: #2FB468;
  }
  
  .count-money {
    padding-left: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    strong {
      color: #f00;
    }
  }
  </style>
  