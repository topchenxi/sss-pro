<template>
   <div class="bill-wrap">
      <fliter :category="{name: 'bill', condition: 'bill'}" :params="filters" @getParams="search"/>
      <div class="y_table_wrap">
        <el-table
          :data="result"
          border
          style="width: 100%"
          :max-height="600"
          >
          <el-table-column label="账单号" min-width="120">
           <template scope="scope">
              <div><i v-if="scope.row.status == 1 || scope.row.status == 3" class="el-icon-warning" style="color: red; margin-right: 5px;"></i>{{scope.row.number}}</div>
           </template>
          </el-table-column>
          <el-table-column label="账单日" min-width="120">
           <template scope="scope">
               {{scope.row.billTime | convertDate}}
           </template>
          </el-table-column>
          <el-table-column prop="buyerNumber" label="采购商ID" min-width="120"></el-table-column>
          <el-table-column prop="buyerCompany" label="采购商公司名" min-width="120"></el-table-column>
          <el-table-column label="账单日期" min-width="120">
            <template scope="scope">
              {{scope.row.beginTime | convertDate}} - {{scope.row.endTime | convertDate}}
            </template>
          </el-table-column>
          <el-table-column label="结算方式" min-width="120">
            <template scope="scope">
              <template v-if="scope.row.billingCycle == 0">周结</template>
              <template v-if="scope.row.billingCycle == 1">半月结</template>
              <template v-if="scope.row.billingCycle == 2">月结</template>
            </template>
          </el-table-column>
          <el-table-column label="总计" min-width="120">
            <template scope="scope">
              ￥{{scope.row.totalMoney | formateMoney}}
            </template>
          </el-table-column>
          <el-table-column label="账单状态" min-width="120">
           <template scope="scope">
             <template v-if="scope.row.status == 1">未提交</template>
             <template v-if="scope.row.status == 2">审核中</template>
             <template v-if="scope.row.status == 3">审核不通过</template>
             <template v-if="scope.row.status == 4">已清偿</template>
           </template>
          </el-table-column>
          <el-table-column prop="followerName" label="跟单员" min-width="120"></el-table-column>
          <el-table-column label="操作" fixed="right" width="120">
            <template scope="scope">
              <router-link :to="{name: 'billDetailView', query: {id: scope.row.id} }">
                <el-button type="primary" size="small">详情</el-button>
              </router-link>
            </template>
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
</template>

<script>
import Fliter from 'components/filter'
import allApi from 'api/allApi'
import Pagination from 'components/pagination'
import {
  request,
  // extend,
  // setCache,
  formatTimeString
} from 'utils/tool'
export default {
  data() {
    return {
      filters: {
        createTimeBegin: '',
        createTimeEnd: '',
        keyword: '',
        pageNumber: 1,
        pageSize: 20
      },
      result: [],
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1,
      },
    };
  },
  components: {
    Fliter,
    Pagination
  },
  computed: {},
  mounted() {
    this.reqList()
  },
  filters: {
   convertDate (val) {
     return Number(val) != 0 ? formatTimeString(val) : '--'
   },
   formateMoney (val) {
     return Number(val).toFixed(2)
   }
  },
  methods: {
   reqList (req = {}) {
    this.$store.dispatch('changeload', true)
    const reqs = Object.assign({}, { _time: this._time }, this.filters)
    const options = {}
    for (const key of Object.keys(reqs)) {
      if (reqs[key]) {
        options[key] = reqs[key]
      }
    }
    request({
      url: allApi.Account_Bill.search,
      data: {
        param: JSON.stringify(options)
      }
    }, (res) => {
      this.$store.dispatch('changeload', false)
      if (res.success == 1) {
        this.result = res.page.result
        this.pagation.pageNumber = res.page.pageNumber
        this.pagation.pageSize = res.page.pageSize
        this.pagation.totalCount = res.page.totalCount
        this.filters.pageSize = res.page.pageSize
        this.filters.pageNumber = res.page.pageNumber
      } else {
        this.$message({
          type: 'error',
          message: res.msg,
          duration: 1000
        })
      }
    })
   },
   search (params) {
     this.filters = Object.assign(this.filters, params)
     this.reqList()
   },
  },

};
</script>

<style lang="scss" scoped>
 .bill-wrap {
  .bottom {
    text-align: right;
    background: #fff;
    padding: 10px;
  }
 }
</style>
