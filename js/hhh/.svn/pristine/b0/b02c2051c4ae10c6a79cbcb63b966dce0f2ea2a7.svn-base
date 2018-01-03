<template>
  <div>
    <el-dialog
    title="选择需要扣数订单"
    v-model="$store.state.b.popLoad"
    :lock-scroll="true"
    :close-on-click-modal="false"
    size="small"
    >
    <el-input  placeholder="出仓订单号/订单号/采购商/供应商" v-model="filters.key" style="width:240px;" size="small" class='fl'>
    </el-input>
    <div style="text-align: center;margin-top: 10px;">
      <el-button type="primary" style="width: 20%;" size="small" @click.native="search" class="btn-search">搜索(enter)</el-button>
      <el-button type="primariy" size="small" @click.native="reset" class="btn-search">重置</el-button>
    </div>
      <div class="y_table">
        <div class="y_table_wrap">
          <el-table
              :data="orderList"
              style="width: 100%"
              height="520"
              v-if="orderList.length > 0"
              >
              <el-table-column
                  prop="outReposityNumber"
                  label="出仓单号">
              </el-table-column>
              <el-table-column
                  prop="serviceNumber"
                  label="订单号">
              </el-table-column>
              <el-table-column
                  prop="customerCompany"
                  label="采购商">
              </el-table-column>
              <el-table-column
                  prop="shopCompany"
                  label="供应商">
              </el-table-column>
              <el-table-column label="发货数量">
                <template scope="scope">
                  {{scope.row.quantity | formatNumber}}{{scope.row.quantityUnit}}
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button type="text" @click="choose(scope.row)" :disabled="scope.row.isCanKouShu == -1">选择</el-button>
                </template>
              </el-table-column>
          </el-table>
          <div v-if="orderList.length == 0" class="result-none">
            暂无数据
          </div>
        </div>
        <div class="bottom">
          <pagination
            :page="pagation.pageNumber"
            :total="pagation.totalCounts"
            :pagesize="pagation.pageSize"
            :render="reqList"
            :options="filters"
          >
          </pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ksApi from 'api/ksApi'
import Pagination from 'components/pagination'
import {
  newRequest
} from 'utils/tool'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      orderId: '',
      orderList: [],
      filters: {
        key: '',
        pageSize: 20,
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
    this.reqList();
  },
  methods: {
    reqList(params) {
      if (params) {
        this.filters.keyword = params.keyword
      }
      newRequest({
        url: ksApi.outReposity,
        data: this.filters,
        method: 'get'
      }).then(response => {
        console.log(response)
        if (response.success == '1') {
          this.convertData(response)
        } else {
          this.$message({
            type: 'error',
            message: response.msg,
            duration: 1000
          })
          this.orderList = []
        }
      })
    },
    convertData(res) {
      this.pagation.pageNumber = res.page.pageNumber
      this.pagation.totalCounts = res.page.totalCount
      this.pagation.pageSize = res.page.pageSize
      console.log(this.pagation)
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
    reset() {
      this.filters.pageNumber = 1
      this.filters.key = ''
      this.reqList()
    },
    choose(row) {
      if (row.isCanKouShu == -1) {
        this.$alert('财务尚未完成对账，不能申请扣数')
        return false
      }
      this.$store.dispatch('changePopLoad', false)
      console.log(row)
      this.$emit('callbackFunction', row)
    }
  }
}
</script>
<style lang="scss">
.pop-table-wrap {
  min-width: 800px;
  z-index: 999;
  .y_table {
    clear: both;
    min-width: 640px;

    .green {
      color: green;
    }
  }
  .y_table_wrap {
     td.is-center {
        text-align: center;
        border-right: 1px solid #ddd;
     }
     th.is-center {
       text-align: center;
     }
     .el-table td .cell {
        padding: 5px 0 0;
        line-height: 1.5;
        display: inline-block;
     }
     position: relative;
   }
   .bottom {
     text-align: right;
     background: #fff;
     padding: 10px;
   }
   .operate-btn {
     text-align: center;
     .o-btn {
       width: 60px;
       margin-right: 5px;
       margin-bottom: 5px;
     }
   }

}

</style>
