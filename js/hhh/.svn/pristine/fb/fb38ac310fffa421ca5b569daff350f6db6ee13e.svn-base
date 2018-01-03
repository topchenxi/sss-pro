<template>
  <div class="ksManage-list tab-wrap">
    <el-tabs v-model="tabIndex" type="card" @tab-click="handleTabClick" class="has-link tabs-container">
      <el-tab-pane v-for="(item, index) in tabsOptions" :name="item.name" :key="item.name">
        <a slot="label">
          <template v-if="index == 0">
            <p>{{handlingCount}}</p>
            <p>{{item.label}}</p>
          </template>
          <template v-if="index == 1">
            <p>{{handledCount}}</p>
            <p>{{item.label}}</p>
          </template>
        </a>
      </el-tab-pane>
    </el-tabs>
    <div class="oms-content">
      <div class="search-content">
        <div class="row">
          <div class="item w360">
            <el-input placeholder="扣数单号/出仓单号/订单号" v-model="filters.keyword"></el-input>
          </div>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
          <el-button type="warning" @click.native="openOrder" class="fr">＋新增扣数单</el-button>
          <el-button class="fr" type="primary" @click="print" :disabled="selected.length == 0">打印</el-button>
        </div>
      </div>
    </div>
    <div class="table-warp">
      <div class="table-content">
        <el-table :data="result" :resizable="false" v-if="result.length > 0" :height="height" @selection-change="selectedItem" border>
          <el-table-column type="selection" fixed="left">
          </el-table-column>
          <el-table-column label="处理时间" width="200px" v-if="filters.status == 2">
            <template scope="scope">
              <el-tooltip class="item" placement="top" v-if="filters.status == 2 && scope.row.exceptionMsg">
                <div slot="content">{{scope.row.exceptionMsg}}</div>
                <span class="exception"><i class="el-icon-warning"></i></span>
              </el-tooltip>
              <template v-if="scope.row.caiWuHandleTime">
                {{scope.row.caiWuHandleTime | formatTime }}
              </template>
              <template v-else>
                --
              </template>
            </template>
          </el-table-column>
          <el-table-column label="开单时间" width="200px" v-if="filters.status == 1">
            <template scope="scope">
              <el-tooltip class="item" placement="top" v-if="filters.status == 1 && scope.row.exceptionMsg">
                <div slot="content">{{scope.row.exceptionMsg}}</div>
                <span class="exception"><i class="el-icon-warning"/></span>
              </el-tooltip>
              {{scope.row.createTime | formatTime}}
            </template>
          </el-table-column>
          <el-table-column prop="number" label="扣数单号" width="140px">
          </el-table-column>
          <el-table-column prop="outReposityNumber" label="出仓单号" width="140px">
          </el-table-column>
          <el-table-column prop="serviceNumber" label="订单号" width="180px">
          </el-table-column>
          <el-table-column label="扣数类型" width="100px">
              <template scope="scope">
                  {{scope.row.type | typeFilter}}
                </template>
            </el-table-column>
          <el-table-column prop="customerCompany" label="采购商" min-width="100px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="shopCompany" label="供应商" min-width="100px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="发货数量" width="120px" show-overflow-tooltip>
            <template scope="scope">
              {{scope.row.sendQuantity | formatNumber}}{{scope.row.quantityUnit}}
            </template>
          </el-table-column>
          <el-table-column label="采购商扣数" width="120px" show-overflow-tooltip>
            <template scope="scope">
              {{scope.row.buyerKouShu | formatNumber}}{{scope.row.quantityUnit}}
            </template>
          </el-table-column>
          <el-table-column label="采购商扣数金额" min-width="160px">
            <template scope="scope">
              {{scope.row.kouShuMoney | formatNumber}}元
            </template>
          </el-table-column>
          <el-table-column label="供应商扣数" min-width="120px">
            <template scope="scope">
              {{scope.row.sellerKouShu | formatNumber}}{{scope.row.quantityUnit}}
            </template>
          </el-table-column>
          <el-table-column label="供应商扣数金额" min-width="160px">
            <template scope="scope">
              {{scope.row.tuiKuanMoney | formatNumber}}元
            </template>
          </el-table-column>
          <el-table-column prop="statusDesc" label="处理状态" min-width="120px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="300px" class="operate-btn">
            <template scope="scope">
                <el-button class="table-btn submit"  v-if="scope.row.status == 1" @click="edit(scope.row.id)" :disabled="scope.row.billId != ''">编辑</el-button>
              <el-button class="table-btn " v-if="scope.row.status == 1"  @click="cancelOrder(scope.row.id)" :disabled="scope.row.billId != ''">取消扣数</el-button>
              <router-link :to="{name: 'guiderKsDetail', query: {id: scope.row.id}}">
                <el-button class="table-btn">详情</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <div class="empty" v-else :style="{height: height + 'px'}">
        </div>
        <div class="pagination">
          <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="reqList" :options="filters" />
        </div>
      </div>
    </div>
    <chooseOrder v-if="$store.state.b.popLoad" @callbackFunction="inputNew" />
  </div>
</template>
<script>
import Pagination from 'components/pagination'
import chooseOrder from './chooseOrder'
import {
  setCache,
  getCache,
  formatTimeString,
  newRequest
} from 'utils/tool'
import {
  request
} from 'utils/request'
import ksApi from 'api/ksApi'
export default {
  components: {
    Pagination,
    chooseOrder
  },
  filters: {
    formatNumber(val) {
      return Number(val).toFixed(2)
    },
    formatTime(val) {
      return formatTimeString(val)
    },
    checkSign(val) {
      return Number(val) > 0 ? '' : '-1'
    },
    typeFilter(val) {
        switch (val) {
          case 1: return '损耗';
          case 2: return '运费';
          case 3: return '售后退换货';
          default: return '其他';
        }
      }
  },
  data() {
    return {
      handlingCount: 0,
      handledCount: 0,
      tabsOptions: [{
          label: '处理中',
          name: '1',
        },
        {
          label: '已处理',
          name: '2',
        }
      ],
      filters: {
        keyword: '',
        status: 1,
        pageSize: 20,
        pageNumber: 1
      },
      pagation: {
        pageSize: 20,
        pageNumber: 1,
        totalCount: 0
      },
      height: 100,
      result: [],
      count: {
        1: 0,
        2: 0
      },
      woodFollowLeader: false,
      woodPurchaser: false,
      isNeedselection: false,
      selected: [],
      tabIndex: '1',
      selectIndex: -1
    }
  },

  mounted() {
    const loginInfo = getCache({ key: 'currentUser' }).loginInfo
    this.woodFollowLeader = loginInfo.woodFollowLeader
    this.woodPurchaser = loginInfo.woodPurchaser
    this.countH()
    window.addEventListener('resize', this.countH)
    this.reqList();
  },
  methods: {
    getCount() { /* 获取统计数 */
      newRequest({
        url: '/redwood/buttonNumber/getSumary',
        method: 'get'
      }).then(res => {
        if (res.success == '1') {
         this.handlingCount = res.result[0]
         this.handledCount = res.result[1]
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    reqList() { /* 获取列表 */
      if (this.tabIndex == 1) {
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
      this.height = String(document.documentElement.clientHeight - 280)
    },
    inputNew(param) {
      this.$router.push({ name: 'guiderInputKs', query: { outReposityId: param.outReposityId } })
    },
    openOrder() {
      this.$store.dispatch('changePopLoad', true)
    },
    edit(id) {
      this.$router.push({name: 'guiderInputKs', query: {id: id}})
    },
    cancelOrder(id) {
      this.$msgbox({
        title: '提示',
        message: '确认取消扣数',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (actiion, instance, done) => {
          if (actiion == 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            request(ksApi.cancelOrder, {
              data: {
                id: id
              },
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST'
            }).then(response => {
              instance.confirmButtonLoading = false
              instance.confirmButtonText = '确定'
              this.$message({
                type: response.success == 1 ? 'success' : 'error',
                message: response.msg,
                duration: 1000
              })
              done && done()
              if (response.success == '1') this.reqList()
            })
          } else {
            done()
          }
        }
      }).then(action => {})
    },
    selectedItem(val, index) {
      this.selected = []
      if (val.length > 0) {
        val.forEach(obj => {
          this.selected.push(obj)
        })
      }
    },
    search() {
      this.filters.pageNumber = 1
      this.reqList()
    },
    reset() {
      this.filters.keyword = '';
      this.filters.pageNumber = 1;
      this.reqList()
    },
    print() {
      if (this.selected.length > 1) {
        this.$alert('当前只支持单个打印')
        return false
      }
      setCache({
        key: 'ksPrintOrder',
        value: this.selected
      })
      this.$router.push({ name: 'printGuidKsOrder' })
    }
  }
}

</script>
<style lang="scss">
.exception {
  i {
    color: #F6A623;
    cursor: pointer;
    font-size: 18px;
    vertical-align: baseline;
    margin-right: 5px;
  }
}

</style>
