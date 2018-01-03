<template>
  <div>
    <el-dialog title="选择需要扣数订单" v-model="$store.state.b.popLoad" :lock-scroll="true" :close-on-click-modal="false" size="small">
      <div class="oms-content">
        <div class="search-content m0">
          <div class="item w360">
            <el-input v-model="filters.key" placeholder="出仓订单号/订单号/采购商/供应商"></el-input>
          </div>
          <button class="btn" @click="search">搜索</button>
          <button class="btn" @click="filters.keyword=''">重置</button>
        </div>
        <div class="main-wrap bsn m0">
          <div class="main-content style-1">
            <div class="table-wrap mt0" v-if="orderList.length">
              <table class="table">
                <colgroup>
                </colgroup>
                <thead>
                  <tr>
                    <th>出仓单号</th>
                    <th>订单号</th>
                    <th>采购商</th>
                    <th>供应商</th>
                    <th>发货数量</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in orderList" :key="index">
                    <td>{{item.outReposityNumber}}</td>
                    <td>{{item.serviceNumber}}</td>
                    <td>{{item.customerCompany}}</td>
                    <td>{{item.shopCompany}}</td>
                    <td>{{item.quantity | formatNumber}}{{item.quantityUnit}}</td>
                    <td>
                      <el-button class="table-btn" @click="choose(item)" :disabled="item.isCanKouShu == -1">选择</el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="empty" v-if="!orderList.length"></div>
          </div>
          <div class="page-wrap">
            <pagination :page="pagation.pageNumber" :total="pagation.totalCounts" :pagesize="pagation.pageSize" :render="reqList" :options="filters">
            </pagination>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ksApi from 'api/ksApi'
import Fliter from 'components/filter'
import Pagination from 'components/pagination'
import {
  request
} from 'utils/request'
export default {
  components: {
    Fliter,
    Pagination
  },
  data() {
    return {
      orderId: '',
      orderList: [],
      filters: {
        key: '',
        pageSize: 10,
        pageNumber: 1,
      },
      pagation: {
        pageSize: 20,
        pageNumber: 1,
        totalCounts: 1
      }
    }
  },
  filters: {
    formatNumber(val) {
      return val ? Number(val).toFixed(2) : '0.00'
    }
  },
  mounted() {
    console.log('进来')
    this.reqList();
  },
  methods: {
    reqList() {
      this.$store.dispatch('changeload', true)
      request(ksApi.outReposity, {
        data: this.filters,
        method: 'GET'
      }).then(response => {
        this.$store.dispatch('changeload', false)
        if (response.success == '1') {
          this.convertData(response)
        } else {
          this.$message.error(response.msg)
          this.orderList = []
        }
      })
    },
    convertData(res) {
      this.pagation.pageNumber = res.page.pageNumber
      this.pagation.totalCounts = res.page.totalCount
      this.pagation.pageSize = res.page.pageSize
      this.filters.pageNumber = res.page.pageNumber
      this.filters.pageSize = res.page.pageSize

      if (res.page.result.length > 0) {
        this.orderList = res.page.result
      } else {
        this.orderList = []
      }
    },
    search() {
      this.filters.pageNumber = 1
      this.reqList()
    },
    choose(row) {
      if (row.isCanKouShu == -1) {
        this.$alert('财务尚未完成对账，不能申请扣数')
        return false
      }
      this.$store.dispatch('changePopLoad', false)
      this.$emit('callbackFunction', row)
    }
  }
}

</script>
