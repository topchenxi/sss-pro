<template>
    <div class="ksManage-list">
        <el-tabs type="card" v-model="tabIndex" @tab-click="handleTabClick">
            <el-tab-pane :label="tableLabel[0]" name="0" style="width:400px"></el-tab-pane>
            <el-tab-pane :label="tableLabel[1]" name="1"></el-tab-pane>
        <el-col style="width:300px;">
          <el-input placeholder="扣数单号/出仓单号/订单号" v-model="filters.keyword" size="small"></el-input>
        </el-col>
        <el-col style="width:400px;margin-left:10px;">
            <el-row>
              <el-button size="small" type="primary" class="btn-search" @click="search">搜索</el-button>
              <el-button size="small" type="default" class="btn-search" @click="reset">重置</el-button>
            </el-row>
        </el-col>
      </el-tabs>
      <div class="y_table">
        <div class="y_table_wrap">
          <el-table
              :data="result"
              :resizable="false"
              v-if="result.length > 0"
          >
              <el-table-column
                  label="处理时间"
                  v-if="this.filters.type == 2"
                  width="150px"
              >
              <template scope="scope">
                <el-tooltip class="item" placement="top" v-if="filters.type == 2 && scope.row.exceptionMsg">
                  <div slot="content">{{scope.row.exceptionMsg}}</div>
                  <el-button type="text" class="exception">！</el-button>
                </el-tooltip>
                <template v-if="scope.row.handleTime">
                  {{scope.row.handleTime | formatTime }}
                </template>
                <template v-else>
                  --
                </template>
              </template>
              </el-table-column>
              <el-table-column label="开单时间" width="150px">
                <template scope="scope">
                  <el-tooltip class="item" placement="top" v-if="filters.type == 1 && scope.row.exceptionMsg">
                    <div slot="content">{{scope.row.exceptionMsg}}</div>
                    <el-button type="text" class="exception">！</el-button>
                  </el-tooltip>
                  {{scope.row.createTime | formatTime}}
                </template>
              </el-table-column>
              <el-table-column
                  prop="number"
                  label="扣数单号">
              </el-table-column>
              <el-table-column
                  prop="outReposityNumber"
                  label="出仓单号">
              </el-table-column>
              <el-table-column
                  prop="serviceNumber"
                  label="订单号">
              </el-table-column>
              <el-table-column
                  prop="buyerCompany"
                  label="采购商">
              </el-table-column>
              <el-table-column
                  prop="sellerCompany"
                  label="供应商">
              </el-table-column>
              <el-table-column label="采购数量">
                <template scope="scope">
                  {{scope.row.caigouQuantity | formatNumber}}{{scope.row.caigouQuantityUnit}}
                </template>
              </el-table-column>
              <el-table-column label="发货数量">
                <template scope="scope">
                  {{scope.row.fahuoQuantity | formatNumber}}{{scope.row.fahuoQuantityUnit}}
                </template>
              </el-table-column>
              <el-table-column label="扣数">
                <template scope="scope">
                  {{scope.row.sellerKouShu | formatNumber}}{{scope.row.caigouQuantityUnit}}
                </template>
              </el-table-column>
              <el-table-column label="退款金额">
                <template scope="scope">
                  {{scope.row.tuiKuanMoney | formatNumber}}元
                </template>
              </el-table-column>
              <el-table-column
                  prop="statusDesc"
                  label="处理状态">
              </el-table-column>
              <el-table-column
                  label="操作">
                  <template scope="scope">
                    <el-button type="primary"  v-if="scope.row.status == 1" @click="edit(scope.row.id)" :disabled="scope.row.billId != ''">编辑</el-button>
                    <router-link :to="{name: 'purcherKsDetail', query: {'id': scope.row.id}}">
                      <el-button type="text">详情</el-button>
                    </router-link>
                  </template>
              </el-table-column>
          </el-table>
          <div class="result-none" v-else>
            暂无数据
          </div>
          <div class="bottom" v-if="result.length > 0">
              <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="reqList" :options="filters" />
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Pagination from 'components/pagination'
import {
  getCache,
  newRequest,
  formatTimeString,
} from 'utils/tool'
export default {
  components: {
    Pagination,
    // chooseOrder
  },
  filters: {
    formatNumber(val) {
      return Number(val).toFixed(2)
    },
    formatTime(val) {
      return formatTimeString(val)
    }
  },
  data() {
    return {
      filters: {
        keyword: '',
        pageSize: 20,
        pageNumber: 1,
        status: 1,
      },
      pagation: {
        pageSize: 20,
        pageNumber: 1,
        totalCount: 0
      },
      height: 800,
      result: [],
      tableLabel: {},
      count: {
        1: 0,
        2: 0
      },
      woodFollowLeader: false,
      woodPurchaser: false,
      isNeedselection: false,
      selected: [],
      tabIndex: '0'
    }
  },

  mounted() {
    const loginInfo = getCache({ key: 'currentUser' }).loginInfo
    this.woodFollowLeader = loginInfo.woodFollowLeader
    this.woodPurchaser = loginInfo.woodPurchaser
    this.countH()
    window.addEventListener('resize', this.countH)
    this.reqList()
  },
  methods: {
    getCount() { /* 获取统计数 */
      newRequest({
        url: '/redwood/buttonNumber/getSumary',
        method: 'get'
      }).then(res => {
        if (res.success == '1') {
          this.tableLabel[0] = `处理中(${res.result[0]})`
          this.tableLabel[1] = `已处理(${res.result[1]})`
          console.log(this.tableLabel[0])
          console.log(this.tableLabel)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    reqList() {
      console.log(this.tabIndex)
      if (this.tabIndex == 0) {
        this.filters.status = 1
      } else {
        this.filters.status = 2
      }
      this.getCount() // 获取列表的时候先获取上面的统计数
      newRequest({
        url: '/redwood/buttonNumber/list',
        data: this.filters,
        method: 'get'
      }).then(res => {
        this.$store.dispatch('changeload', false)
        if (res.success == '1') {
          this.pagation.pageNumber = res.page.pageNumber
          this.pagation.pageSize = res.page.pageSize
          this.pagation.totalCount = res.page.totalCount
          this.filters.pageSize = res.page.pageSize
          this.filters.pageNumber = res.page.pageNumber
          this.result = res.page.result
          this.result.forEach((list) => {
            list.statusDesc = list.status == 1 ? '待处理' : (list.status == 2 ? '已完成' : '已取消')
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleTabClick(tab, event) {
      this.filters.pageNumber = 1
      this.reqList()
    },
    countH() {
      this.height = String(document.documentElement.clientHeight - 230)
    },
    edit(id) {
      this.$router.push({name: 'inputPurcherKs', query: {id: id}})
    },
    openOrder() {
      this.$store.dispatch('changePopLoad', true);
    },
    search() {
      this.filters.pageNumber = 1
      this.reqList()
    },
    reset() {
      this.filters.keyword = '';
      this.filters.pageNumber = 1;
      this.reqList()
    }
  }
}
</script>

<style lang="scss">
.y_table {
  margin-top: 5px;
}
.y_table_wrap .el-table td .cell {
    padding: 0;
}
td {
    .color-item {
        span {
            border-left: 1px solid #bfbfbf;
            &:first-child {
                border-left: 0;
            }
        }
    }

    .exception,.exception:hover {
      font-size: 20px;
      color: red;
      padding: 0;
      margin: 0;
    }
}

.add-new {
  float: right;
  margin-right: 20px;
  cursor: pointer;
}

.ksManage-list {
    .y_table {
        clear: both;
    }

    .y_table_wrap {
        td.is-center {
            text-align: center;
            border-right: 1px solid #ddd;
        }
        th.is-center {
            text-align: center;
        }
        .combine {
            .cell {
                padding: 0;
                .t-title {
                    width: 300px;
                    float: left;
                    .t-item {
                        float: left;
                        width: 75px;
                    }
                    .t-item1 {
                        width: 60px;
                    }
                    .t-item2 {
                        width: 80px;
                    }
                    .t-item3 {
                        width: 80px;
                    }
                    .t-item3 {
                        width: 80px;
                    }
                }
            }
        }
        .el-upload-list {
            display: none;
        }
    }
    .bottom {
        text-align: right;
        background: #fff;
        padding: 10px;
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
    .line {
        border-bottom: 1px solid #ddd;
    }
    .btn-search {
      width: 80px;
      font-size: 12px;
    }
    .result-none {
      margin-top: 10px;
      border: 1px solid #999;
      text-align: center;
      height: 200px;
      line-height: 200px;
    }
}
</style>
