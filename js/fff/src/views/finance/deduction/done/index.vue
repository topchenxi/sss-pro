<template>
    <section v-loading.fullscreen.lock="pageLoading" element-loading-text="拼命加载中...">
      <!-- <h1 class="title" style="font-size: 25px; padding: 15px">扣数单列表</h1> -->
      <HeadFilters v-on:getParams="getFilter" :params="requestParams">
        <template slot="headFilterSlot" scope="scope">
          <el-col :span="2">
            <p>&nbsp</p>
            <el-button type="primary" @click="exportList(scope.scope)">导出</el-button>
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
      <el-table :height="tableHeight" :data="tableData" border>
        <el-table-column align="center" label="处理时间" prop="caiWuHandleTime" :formatter="formatTime" min-width="180"></el-table-column>
        <el-table-column align="center" label="扣数单号" prop="number" min-width="140"></el-table-column>
        <el-table-column align="center" label="出仓单号" prop="outReposityNumber" min-width="140"></el-table-column>
        <el-table-column align="center" label="订单号" prop="serviceNumber" min-width="200"></el-table-column>
        <el-table-column align="center" label="扣数类型" prop="buyQuntity" min-width="100">
            <template scope="scope">
              {{scope.row.type | typeFilter}}
            </template>
          </el-table-column>
        <el-table-column align="center" label="采购商" prop="customerCompany" min-width="140"></el-table-column>
        <el-table-column align="center" label="供应商" prop="shopCompany" min-width="140"></el-table-column>
        <el-table-column align="center" label="发货数量" prop="sendQuantity" min-width="100">
          <template scope="scope">
            {{scope.row.sendQuantity | formatNumber}}{{scope.row.quantityUnit}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="采购商扣数" prop="buyerKouShu" min-width="100">
          <template scope="scope">
            {{scope.row.buyerKouShu | formatNumber}}{{scope.row.quantityUnit}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="供应商扣数" prop="sellerKouShu" min-width="100">
          <template scope="scope">
            {{scope.row.sellerKouShu | formatNumber}}{{scope.row.quantityUnit}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="采购商扣数金额(元）" min-width="160">
          <template scope="scope">
            <template v-if="scope.row.kouShuMoney">
              <span>{{scope.row.kouShuMoney | formatNumber}}</span>
            </template>
            <template v-if="!scope.row.kouShuMoney">
              <span>{{scope.row.kouShuMoney | formatNumber}}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" label="供应商扣数金额(元）" min-width="160">
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
        <el-table-column align="center" label="提交时间" prop="commitCaiWuTime" :formatter="formatTime" min-width="160"></el-table-column>
        <el-table-column align="center" label="财务备注" prop="" min-width="120" show-overflow-tooltip>
          <template scope="scope">
            <template v-if="!scope.row.isEdit">
              <div @click="scope.row.isEdit = true">&nbsp;{{scope.row.caiWuRemark}}</div>
            </template>
            <template v-else>
              <el-input @keyup.enter.native="confirmEditRemark(scope.row)" v-model="scope.row.caiWuRemark"></el-input>
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" label="处理方式" prop="buyQuntity" min-width="120">
            <template scope="scope">
              {{scope.row.handleWay | handleWayFilter}}
            </template>
          </el-table-column>
        <el-table-column align="center" label="处理状态" prop="status" min-width="100" show-overflow-tooltip>
          <template scope="scope">
            <template v-if="scope.row.status === 1">
              <span class="forgive-color">待处理</span>
            </template>
            <template v-if="scope.row.status === -1">
              <span class="forgive-color">已取消</span>
            </template>
            <template v-if="scope.row.status === 2">
              <span class="forgive-color">已完成</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="80" fixed="right">
          <template scope="scope">
            <router-link :to="`/finance/deduction/details/undone?id=${scope.row.id}&outReposityId=${scope.row.outReposityId}`">
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
  import Tabs from 'components/deductionTabs.vue'
  import Pagination from 'components/pagination'
  // import deductionApi from 'api/deduction'
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
          status: 2,
          type: '',
          handleWay: '',
          pageNumber: 1,
          pageSize: 20
        },
        pagination: {
          pageNumber: 1,
          pageSize: 20,
          totalCount: 20
        },
        pageLoading: false,
        tableHeight: 600,
        tableData: [],
        totalBuyKouShuMoney: 0,
        totalTuiKuanMoney: 0
      }
    },
    filters: {
      handleWayFilter(val) {
          switch (val) {
            case 1: return '退回账户余额';
            case 2: return '扣减账户余额';
            case 3: return '不退/减';
            default: return '其他';
          }
        },
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
      confirmEditRemark(item) {
        let obj = {
          id: item.id,
          caiWuRemark: item.caiWuRemark
        }
        newRequest({
          url: '/redwood/buttonNumberFinance/editCaiWuRemark',
          data: obj,
          method: 'post',
          contentType: 'application/json'
        }).then(res => {
          if (res.success == 1) {
            item.isEdit = false
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      getFilter(params) {
        this.requestParams = Object.assign({
          pageNumber: 1,
          pageSize: 20,
          queryType: 1,
          status: 2
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
      search(params) {
        Object.assign(this.requestParams, this.formatParamsTime(params, 'timeFrom', 'timeTo'))
        this.getData()
      },
      getData(params = {}) {
        this.pageLoading = true
        delete this.requestParams.totalMoney
        newRequest({
          url: '/redwood/buttonNumberFinance/list',
          data: this.requestParams,
          method: 'get'
        }).then(res => {
          this.getSumary()
          if (res.success == 1) {
            res.page.result.map(item => {
              item.isEdit = false
            })
            this.pagination.pageNumber = res.page.pageNumber
            this.pagination.pageSize = res.page.pageSize
            this.pagination.totalCount = res.page.totalCount
            this.tableData = res.page.result
            this.reimburseTotal = res.total
          } else {
            this.$message.error(res.msg)
          }
          this.pageLoading = false
        })
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
      exportList(params) {
        this.pageLoading = true
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
          status: 2
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
        newRequest({
          url: '/redwood/buttonNumberFinance/export',
          data: this.requestParams,
          method: 'get'
        }).then(res => {
          if (res.success == 1) {
            window.open('http://www.soouya.com' + res.obj)
          } else {
            this.$message.error(res.msg)
          }
          this.pageLoading = false
        })
      }
    }
  }
  </script>
  
  <style lang="scss">
  .count-money {
    margin: 10px 0px;
    strong {
      color: #f00;
    }
  }
  </style>
  