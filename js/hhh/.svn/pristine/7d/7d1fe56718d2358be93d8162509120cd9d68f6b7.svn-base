<template>
  <div class="deliver-list">
    <el-dialog
      title="请选择需退换货订单"
      v-model="$store.state.b.popLoad"
      custom-class="pop-table-wrap"
      :lock-scroll="true"
      :close-on-click-modal="false"
      @close="close"
      >
       <div class="y_table">
         <fliter :category="{name: 'addTicket', index: 0 }" :params="filters" @getParams="search"/>
         <div>
           <div class="y_table_wrap">
            <el-table
              :data="result"
              :resizable="false"
              width="800"
              height="500"
            >
              <el-table-column prop="serviceNumber"  align="center" label="订单号">
              </el-table-column>
              <el-table-column prop="createTime"  align="center" width="100" label="订单时间">
              </el-table-column>

              <el-table-column prop="buyerCompany"  align="center" label="采购商" width="120">
              </el-table-column>
              <el-table-column prop="sellerCompany" align="center" width="120" label="供应商">
              </el-table-column>
              <el-table-column inline-template align="center" width="100" label="采购总数">
                <div>{{row.quantity}}{{row.quantityUnit}}</div>
              </el-table-column>
              <el-table-column inline-template align="center" width="120" label="原订单总金额">
                <div>￥{{Number(row.total).toFixed(2)}}</div>
              </el-table-column>
              <el-table-column inline-template align="center" label="操作" >
                <div class="operate-btn">
                   <el-button class="o-btn" :disabled="row.canSelect == 0"  size="small" type="primary" @click.native="goDetail(row)">选择</el-button>
                </div>
              </el-table-column>

            </el-table>
          </div>
          <div class="bottom">
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
    </el-dialog>
  </div>
</template>

<script>
import Fliter from 'components/filter'
import Pagination from 'components/pagination'
import {
  request,
  // setCache,
  formatTimeString
} from 'utils/tool'
import Api from 'api/orderprocess'
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
      dialogTableVisible: false,
      filters: {
        pageSize: 20,
        pageNumber: 1
      },
      height: 500,
      result: []
    }
  },
  mounted () {
    this.reqList()
  },
  methods: {
    close () {
      this.$store.dispatch('changePopLoad', false)
    },
    search (params) {
      this.filters.pageNumber = '1'
      this.filters = Object.assign(this.filters, params)
      this.reqList()
    },
    reqList (req = {}) {
      this.$store.dispatch('changeload', true)
      this.filters = Object.assign({}, this.filters, req)
      const reqs = {}
      for (const key of Object.keys(this.filters)) {
        if (this.filters[key]) {
          reqs[key] = this.filters[key]
        }
      }
      reqs.tag = this.tabIndex
      request({
        url: Api.getOrderListForReplaceReturn,
        method: 'get',
        data: reqs
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          console.log('res', res)
          if (res.page) {
            this.convertData(res.page)
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
      this.pagation.pageNumber = page.pageNumber
      this.pagation.pageSize = page.pageSize
      this.pagation.totalCount = page.totalCount
      this.filters.pageSize = page.pageSize
      this.filters.pageNumber = page.pageNumber
      page.result.map((item) => {
        item.createTime = formatTimeString(item.createTime)
      })
      this.result = page.result
    },
    goDetail (row) {
      this.$store.dispatch('changePopLoad', false)
      const obj = {name: 'addGoodTicket', query: { id: row.orderNumber, type: 3 }}
      this.$router.push(obj)
      this.$emit('warn')
      // location.href = '/index/addTicket?id=' + row.id
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
  }
  .y_table_wrap {
     td.is-center {
        text-align: center;
        border-right: 1px solid #e0e6ed;
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
