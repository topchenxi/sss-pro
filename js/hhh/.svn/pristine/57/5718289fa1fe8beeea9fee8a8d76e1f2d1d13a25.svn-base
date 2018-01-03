<template>
  <div class="sales-list">
    <div class="y_tab tab-wrap">
    </div>
    <fliter :category="{name: 'sales', index: tabIndex }" :params="filters" @getParams="search"/>
    <div class="y_table">
      <div class="y_table_wrap">
       <el-table
         :data="result"
         :resizable="false"
         :height="height"
         @selection-change="handleSelectionChange"
       >
          <el-table-column
           align="center"
           type="selection"
           min-width="50">
         </el-table-column>
         <el-table-column prop="serviceNumber" align="center" label="订单号" min-width='140'>
         </el-table-column>
         <el-table-column inline-template align="center" width="180" label="发布时间">
           <div>{{row.createTime | convertDate}}</div>
         </el-table-column>
         <el-table-column inline-template align="center" label="订单总金额" width="120">
           <div>¥{{row.saleMoney}}元</div>
         </el-table-column>
         <el-table-column prop="sellerCompany" align="center" width="100" label="供应商">
         </el-table-column>
         <el-table-column inline-template align="center" label="订单类型" width="100">
           <div>
             <template v-if="row.type == '1'">服务单</template>
             <template v-if="row.type == '2'">贸易单</template>
           </div>
         </el-table-column>
         <el-table-column inline-template align="center" width="100" label="有无实版">
           <div>
             <template v-if="row.haveRealVersion == '1'">有</template>
             <template v-if="row.haveRealVersion == '0'">无</template>
           </div>
         </el-table-column>
         <el-table-column prop="productNumber" align="center" width="100" label="货号">
         </el-table-column>
         <el-table-column prop="colorListStr" align="center" width="100" label="色号">
         </el-table-column>
         <el-table-column inline-template align="center" width="100" label="订货数量">
           <span>{{row.totalColorNumber}}{{row.quantityUnit}}</span>
         </el-table-column>
         <el-table-column prop="taxPoint" align="center" width="100" label="税点">
         </el-table-column>
         <el-table-column prop="statusDesc" align="center" label="订单状态" width="100">
         </el-table-column>
       </el-table>
     </div>
     <div class="bottom">
       <el-button type="primary" style='float: left; margin-left: 20px;' :disabled='!selectRow.length' @click.native="printOrder">打印销售单</el-button>
       <pagination 
         :page="pagation.pageNumber"
         :total="pagation.totalCount"
         :pagesize="pagation.pageSize"
         :render="reqList"
         :options="filters"
       />
     </div>
    </div>
  </div>
</template>

<script>
import Fliter from 'components/filter'
import Pagination from 'components/pagination'
import Api from 'api/reposity'

import {
  request,
  setCache,
  formatTimeString
} from 'utils/tool'
export default {
  components: {
    Fliter,
    Pagination
  },
  data () {
    return {
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1,
      },
      filters: {
        pageSize: 20,
        pageNumber: 1
      },
      height: 600,
      result: [],
      selectRow: [],
      clothLoneIdList: [],
      checked: false,
      _time: 0
    }
  },
  filters: {
    convertDate (val) {
      return Number(val) != 0 ? formatTimeString(val) : '--'
    }
  },
  mounted () {
    this.countH()
    window.addEventListener('resize', this.countH)
    this.reqList()
  },
  updated () {
  },
  methods: {
    handleSelectionChange (val, idnex) {
      this.selectRow = val
    },
    search (params) {
      this.filters.pageNumber = '1'
      this.filters = Object.assign(this.filters, params)
      this.reqList()
    },
    reqList (req) {
      this.$store.dispatch('changeload', true)
      const reqs = {}
      for (const key of Object.keys(this.filters)) {
        if (this.filters[key]) {
          reqs[key] = this.filters[key]
        }
      }
      request({
        url: Api.searchOrderForXiaoShouDan,
        data: {
          param: JSON.stringify(reqs)
        }
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          if (res.page) {
            this.convertData(res.page)
          } else {
            this.result = []
          }
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }
      })
    },
    convertData (page) {
      // this.pagation.pageNumber = page.pageNumber
      // this.pagation.pageSize = page.pageSize
      this.pagation.totalCount = page.totalCount
      // this.filters.pageSize = page.pageSize
      // this.filters.pageNumber = page.pageNumber
      page.result.map((item) => {
        item.quantityUnit = item.provideColorList.length > 0 ? item.provideColorList[0].quantityUnit : ''
        let totalColorNumber = 0
        let colorList = []
        item.provideColorList.map((val) => {
          totalColorNumber = totalColorNumber + Number(val.quantity)
          colorList.push(val.color)
        })
        if (colorList.length) {
          item.colorListStr = colorList.join(',')
        }
        item.totalColorNumber = totalColorNumber
      })
      this.result = page.result
    },
    countH () {
      this.height = String(document.documentElement.clientHeight - 200)
    },
    printOrder() {
      const that = this
      setCache({
        type: 'sessionStorage',
        dataType: 'json',
        value: that.selectRow,
        key: 'forPrintOrderList',
      })
      that.$router.push({ name: 'printSalesOrder' })
    }
  },
  watch: {
    // 'clothLoneIdList': {
    //   handler: function (val, oldVal) {
    //     if (this.clothLoneIdList.length === this.checkboxData.length) {
    //       this.checked = true
    //     } else {
    //       this.checked = false
    //     }
    //     console.log('this.clothLoneIdList', this.clothLoneIdList)
    //   },
    //   deep: true
    // }
  },
  computed: {
  },
  destroyed () {
    window.removeEventListener('resize', this.countH)
  }
}
</script>
<style lang="scss">
.sales-list {
  .y_table {
    clear: both;
  }
  .y_table_wrap {
     td.is-center {
        text-align: center;
        border-right: 1px solid #ddd;
     }
     td {
       text-overflow: initial;
     }
     th.is-center {
       text-align: center;
     }
     .el-table td .cell {
        padding: 5px 0 0;
        line-height: 1.5;
        word-break: break-word;
     }
   }
   .bottom {
     text-align: right;
     background: #fff;
     padding: 10px;
     overflow: hidden;
   }
   .operate-btn {
     text-align: left;
     padding-left: 10px;
     .o-btn {
       width: 80px;
       margin-right: 5px;
       margin-bottom: 5px;
     }
   }
}
.common-pop {
  min-width: 500px;
}
.take-good {
  max-height: 450px;
  min-width: 460px;
  overflow-y: auto;
  .t-item {
    position: relative;
    margin-bottom: 8px;
  }
  .t-item-l {
    display: inline-block;
    width: 100px;
    text-align: right;
    padding-right: 10px;
  }
  .t-item-r {
    display: inline-block;
    min-width: 320px;
    .r-line {
      padding-bottom: 5px;
    }
  }
}
.send-good {
  max-height: 450px;
  overflow-y: auto;
}
</style>
