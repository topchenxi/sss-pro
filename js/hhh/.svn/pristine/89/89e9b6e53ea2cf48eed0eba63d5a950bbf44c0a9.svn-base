<template>
  <section v-loading="loading" element-loading-text="拼命加载中">
    <el-form :inline="true">
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-select v-model="requestData.salesId" placeholder="全部订单状态" style="width: 140px" @change="requestList">
              <el-option label="全部销售员" value=""></el-option>
              <el-option :label="item.realName" :value="item.id" v-for="item in sales"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="requestData.category" placeholder="请选择" @change="requestList">
              <el-option v-for="item in fitlersData" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="text-align:right">
          <el-form-item>
            <el-input placeholder="订单号/采购商" v-model="requestData.keyword" @keydown.enter.native="reqList"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="requestList">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="order-wrap" :style="{'max-height':`${height}px`}">
      <div class="sy-order-wrap" v-for="(order,orderIdx) in orderList" v-show="order.isShow">
        <template v-if="order.category === 'all-all'">
          <header>
            <span>大货单</span>
            <span>订单号：{{order.dhOrder.serviceNumber}}</span>
            <span>采购商：{{order.dhOrder.buyerCompany}}
              <template v-if="order.dhOrder.hasOpenedBaitiao">
                <el-tooltip class="item" effect="dark" content="已开通白条" placement="top-start">
                  <img width="12px" height="12px" src="~assets/credit.png"></img>
                </el-tooltip>
              </template>
            </span>
            <span>供应商：{{order.dhOrder.shopCompany}}</span>
            <span>订单总金额：{{order.dhOrder.saleMoney | formatMoney}}元</span>
            <span>订单发布时间：{{order.dhOrder.createTime | formatTime}}</span>
            <span>销售员：{{order.dhOrder.salesName}}</span>
            <span>已提交对账总金额：
              <strong>{{order.dhOrder.totalMoney | formatMoney}}元</strong>
            </span>
          </header>
          <el-table :data="order.dhOrder.outReposityList" border>
            <el-table-column label="出仓单号" prop="outReposityNumber" min-width="140px" align="center"></el-table-column>
            <el-table-column label="出仓销售货款" min-width="130px" align="center">
              <template scope="scope">
                {{scope.row.saleMoney | formatMoney}}
              </template>
            </el-table-column>
            <el-table-column label="应收出仓销售货款" min-width="150px" align="center">
              <template scope="scope">
                {{scope.row.needSaleMoney | formatMoney}}
              </template>
            </el-table-column>
            <el-table-column label="运费" min-width="80px" align="center">
              <template scope="scope">
                {{scope.row.freightMoney | formatMoney}}
              </template>
            </el-table-column>
            <el-table-column label="提交对账金额" min-width="130px" align="center">
              <template scope="scope">
                {{scope.row.totalMoney | formatMoney}}
              </template>
            </el-table-column>
            <el-table-column label="出仓时间" prop="outTime" min-width="180px" :formatter="formatTime" align="center"></el-table-column>
            <el-table-column label="提交结算时间" prop="submitTime" min-width="180px" :formatter="formatTime" align="center"></el-table-column>
            <el-table-column fixed="right" align="left" width="200">
              <template scope="scope">
                <router-link :to="{path: '/index/guider/outputMoney/guiderMoneyMangeDetail', query: {detailType: 'finshSubmit', id: scope.row.id} }">
                  <el-button class="o-btn" size="mini" type="primary">详情</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else-if="order.category === 'jb-all'" v-show="order.isShow">
          <header>
            <span>剪版单</span>
            <span>订单号：{{order.cut.number}}</span>
            <span>采购商：{{order.cut.customerCompany}}</span>
            <span>供应商：{{order.cut.shopCompany}} </span>
            <span>订单总金额：¥{{order.cut.costMoney | formatMoney}}</span>
            <span>订单发布时间：{{order.cut.createTime | formatTime}}</span>
            <span>销售员：{{order.cut.salesName}}</span>
            <span>已提交对账金额：
              <strong>{{order.cut.totalMoney | formatMoney}}元</strong>
            </span>
          </header>
          <el-table :data="[order.cut]">
            <el-table-column label="成本货款" align="center">
              <template scope="scope">
                {{scope.row.costMoney | formatMoney}}
              </template>
            </el-table-column>
            <el-table-column label="服务费" align="center">
              <template scope="scope">
                {{scope.row.serviceMoney | formatMoney}}
              </template>
            </el-table-column>
            <el-table-column label="税费" align="center">
              <template scope="scope">
                {{scope.row.taxMoney | formatMoney}}
              </template>
            </el-table-column>
            <el-table-column label="运费" align="center">
              <template scope="scope">
                {{scope.row.freightMoney | formatMoney}}
              </template>
            </el-table-column>
            <el-table-column label="总费用" align="center">
              <template scope="scope">
                {{scope.row.totalMoney | formatMoney}}
              </template>
            </el-table-column>
            <el-table-column label="提交对账金额" align="center">
              <template scope="scope">
                {{scope.row.totalMoney | formatMoney}}
              </template>
            </el-table-column>
            <el-table-column label="提交结算时间" align="center" prop="submitTime" :formatter="formatTime">
            </el-table-column>
            <el-table-column fixed="right" align="left" width="200">
              <template scope="scope">
                <router-link :to="{path: '/index/guider/cut/detail',query: {detailType: 'finshAccount', id: order.cut.id} }">
                  <el-button class="o-btn" size="mini" type="primary">详情</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
  </section>
</template>
<script>
import { newRequest } from 'utils/tool'
import { request } from 'utils/request'
export default {
  data() {
    return {
      requestData: {
        category: '',
        keyword: '',
        salesId: ''
      },
      sales: [],
      orderList: [],
      fitlersData: [{
        label: '全部对账类型',
        value: ''
      }, {
        label: '只看大货单',
        value: 'all-all'
      }, {
        label: '只看剪版单',
        value: 'jb-all'
      }],
      height: 600,
      loading: false
    }
  },
  filters: {
    formatMoney(val, column) {
      return (val === null || val < 0) ? '--' : ('￥' + Number(val).toFixed(2))
    }
  },
  mounted() {
    window.addEventListener('resize', this.countHeight)
    this.requestList()
    console.log(3)
    this.countHeight()
    this.getSales()
  },
  watch: {
    'requestData.category': function(val, oldVal) {
      if (val !== '') {
        this.orderList.forEach(item => {
          item.isShow = item.category === val
        })
      }
    }
  },
  methods: {
    getSales() {
      newRequest({
        url: '/crm/user/User/getSales',
        method: 'get',
      }).then((res) => {
        if (res.success == 1) {
          this.sales = res.list
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    requestList() {
      this.loading = true
      request('/redwood/buyfollow/Order/listSubmitList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: this.requestData
      }).then(response => {
        this.loading = false
        this.$store.dispatch('changeload', false)
        if (response.success === '1') {
          this.orderList = response.orderList.map(item => {
            item.isShow = true
            return item
          })
        } else {
          this.$message({
            type: 'error',
            message: response.msg,
            duration: 1200
          })
        }
      })
    },
    countHeight() {
      this.height = String(document.documentElement.clientHeight - 190)
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.countHeight)
  }
}

</script>
<style lang="scss" scoped>
.order-wrap {
  overflow-y: auto;
}

.sy-order-wrap {
  >header {
    margin: 20px 0;
    font-size: 14px;
    >span:not(:last-child) {
      border-right: 1px solid #666;
      padding-right: 10px;
      margin-right: 5px;
    }
  }
}

</style>
