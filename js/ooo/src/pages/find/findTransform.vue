<template>
  <section class="sy-page-wrap" v-loading.body.lock="fullscreenLoading" element-loading-text="拼命加载中">
    <div class="sy-tabs-wrap" ref="tabsWrap">
      <el-form :inline="true" ref="cutOrderSearch" :model="filters" v-if="orderList">
        <el-form-item>
          <el-input placeholder="找版订单号、采购商名称、供应商名称、找版员" size="small" v-model="filters.keyword" class="sy-cut-search">
          </el-input>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker v-model="filters.createTimeBegin" type="date" placeholder="选择日期时间" :picker-options="pickerOptions0">
          </el-date-picker>
          -
          <el-date-picker v-model="filters.createTimeEnd" type="date" placeholder="选择日期时间" :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" class="btn-search" @click="search">
            搜索
          </el-button>
          <el-button type="primariy" size="small" @click.native="resetForm('cutOrderSearch')" class="btn-search">
            重置
          </el-button>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" size="small" @click.native="exportExcel" class="btn-export">
            导出Excel
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="sy-table-wrap" ref="tableWrap">
      <el-table v-if="orderList" style="width: 100%" :height="height" border :resizable="false" :data="orderList">
        <el-table-column prop="serviceNumber" label="找版订单号" align="center" width="140">
        </el-table-column>
        <el-table-column prop="createTime" label="找版订单时间" align="center" width="170">
        </el-table-column>
        <el-table-column prop="customerNumber" align="center" label="采购商ID" width="120">
        </el-table-column>
        <el-table-column prop="customerCompany" align="center" label="采购商名称" width="100">
        </el-table-column>
        <el-table-column prop="sellerNumber" align="center" label="供应商ID" width="100">
        </el-table-column>
        <el-table-column prop="shopCompany" align="center" label="供应商名称" width="100">
        </el-table-column>
        <el-table-column prop="shopTel" align="center" label="供应商电话" width="100">
        </el-table-column>
        <el-table-column prop="shopFullAddr" align="center" label="供应商地址" width="180">
        </el-table-column>
        <el-table-column prop="productNumber" align="center" label="原货号" width="100">
        </el-table-column>
        <el-table-column prop="zyProductNumber" align="center" label="自营货号" width="100">
        </el-table-column>
        <el-table-column prop="changeCard" align="center" label="是否换卡头" width="110">
        </el-table-column>
        <el-table-column prop="cutNumber" align="center" label="剪版订单号" width="110">
        </el-table-column>
        <el-table-column prop="cutCreateTime" align="center" label="剪版订单时间" width="170">
        </el-table-column>
        <el-table-column prop="cutTotalMoney" align="center" label="订单金额（元）" width="110">
        </el-table-column>
        <el-table-column prop="bulkOrderNumber" align="center" label="大货订单号" width="110">
        </el-table-column>
        <el-table-column prop="bulkCreateTime" align="center" label="大货订单时间" width="170">
        </el-table-column>
        <el-table-column prop="bulkSaleMoney" align="center" label="销售总额（元）" width="110">
        </el-table-column>
        <el-table-column prop="salesName" align="center" label="销售员/跟单员" width="120">
        </el-table-column>
        <el-table-column prop="clothHunterName" align="center" label="找版员" width="80">
        </el-table-column>
        <el-table-column prop="category" align="center" label="订单来源" width="100">
        </el-table-column>
      </el-table>
    </div>
    <div class="sy-pagination-wrap" ref="paginationWrap">
      <el-pagination @size-change="handleChangePagesize" @current-change="handleCurrentPageChange" :current-page="pagation.pageNumber" :page-sizes="[10, 20, 30, 40,50,100]" :page-size="pagation.pageSize" layout="sizes, prev, pager, next, jumper" :total="pagation.totalCount">
      </el-pagination>
    </div>
    <el-dialog title="下载Excel" v-model="downExcel.isShow" size="tiny" :modal="false">
      <a :href="downExcel.path">
        <el-button @click="downExcel.isShow = false">下载</el-button>
      </a>
    </el-dialog>
  </section>
</template>
<script>
import getCache from '@/utils/getCache'
import request from '@/utils/request'
import mixinFilters from '@/mixin/filters'
export default {
  name: 'findOrderList',
  data() {
    // let listStatus = this.$route.query.status || '-1'
    const auth = JSON.parse(getCache({
      key: 'currentUser'
    }))
    var endTime = new Date().toISOString().substr(0, 10)
    var beginTime = new Date(+new Date(endTime) - 1000 * 60 * 60 * 24 * 184).toISOString().substr(0, 10)
    var that = this
    return {
       pickerOptions0: {
          disabledDate(time) {
            if (that.filters.createTimeEnd) {
               if (time.getTime() > +new Date(that.filters.createTimeEnd)) {
                return true
              }
              if (time.getTime() - (+new Date(that.filters.createTimeEnd) - 1000 * 60 * 60 * 24 * 185) < 0) {
                return true
              } else {
                return time.getTime() > Date.now();
              }
            } else {
                 return time.getTime() > Date.now();
            }
          }
        },
        pickerOptions1: {
            disabledDate(time) {
            if (that.filters.createTimeBegin) {
              if (time.getTime() > Date.now()) {
                return true
              }
              if (time.getTime() - (+new Date(that.filters.createTimeBegin) + 1000 * 60 * 60 * 24 * 185) > 0) {
                return true
              } else {
                return +new Date(that.filters.createTimeBegin) > time.getTime();
              }
            } else {
                 return time.getTime() > Date.now();
            }
          }
          },
      orderList: null,
      access: null,
      activeStatus: 0,
      filters: {
        pageSize: 20,
        pageNumber: 1,
        keyword: '',
        createTimeBegin: beginTime,
        createTimeEnd: endTime
      },
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1
      },
      height: 200,
      fullscreenLoading: false,
      selectionOrder: [],
      woodFollowAdmin: auth.woodFollowAdmin,
      woodFollowTeamLeader: auth.woodFollowTeamLeader,
      woodCutClothLeader: auth.woodCutClothLeader,
      woodFinance: auth.woodFinance,
      woodAdmin: auth.woodAdmin,
      dom: {
        tabsHeight: 0,
        paginationHeight: 0
      },
      updateCutter: {
        isShow: false,
        cutterList: null,
        currentCutter: '',
        waitUpdateData: null
      },
      downExcel: {
        isShow: false,
        path: ''
      }
    }
  },
  mixins: [mixinFilters],
  mounted() {
    this.getTransformList()
    window.addEventListener('resize', this.countHeight)
  },
  computed: {
    hasStatus210() {
      return this.woodFinance || this.woodAdmin || this.woodCutClothLeader
    },
    hasStatus211() {
      return this.woodFinance || this.woodAdmin || this.woodCutClothLeader
    },
    hasStatus220() {
      return this.woodFollowAdmin || this.woodFollowTeamLeader || this.woodFinance || this.woodAdmin
    },
    hasStatus221() {
      return this.woodFollowAdmin || this.woodFollowTeamLeader || this.woodFinance || this.woodAdmin
    },
    hasStatus222() {
      return this.woodFollowAdmin || this.woodFollowTeamLeader || this.woodFinance || this.woodAdmin
    },
    hasStatus223() {
      return this.woodFollowAdmin || this.woodFollowTeamLeader || this.woodFinance || this.woodAdmin
    },
    hasStatus230() {
      return this.woodFollowAdmin || this.woodFollowTeamLeader || this.woodFinance || this.woodAdmin
    },
    canDownExcel() {
      return !(this.selectionOrder.length > 0 || (this.filters.createTimeBegin && this.filters.createTimeEnd))
    }
  },
  methods: {
    countHeight() {
      let windowHeiht = document.body.clientHeight
      let dom = this.dom
      dom.tabsHeight = this.dom.tabsHeight || parseFloat(getComputedStyle(this.$refs.tabsWrap, null).height)
      dom.paginationHeight = dom.paginationHeight || parseFloat(getComputedStyle(this.$refs.paginationWrap, null).height)
      this.height = parseFloat(windowHeiht - dom.tabsHeight - dom.paginationHeight - 61) // 61=头部高度 + 10
    },
    search() {
        this.filters.pageNumber = 1
        this.getTransformList()
    },
    getTransformList() {
      if (!this.filters.createTimeBegin || !this.filters.createTimeEnd) {
        this.$message.error('必须选择时间范围')
        return false
      }
      this.fullscreenLoading = true
      if (this.filters.createTimeBegin) {
        this.filters.createTimeBegin = +new Date(this.filters.createTimeBegin)
      }
      if (this.filters.createTimeEnd) {
        this.filters.createTimeEnd = +new Date(this.filters.createTimeEnd)
      }
      request('/redwood/report/findTransform/list', {
        method: 'GET',
        data: this.filters
      }).then((response) => {
        this.fullscreenLoading = false
        if (response.success === '1') {
          this.fullscreenLoading = false
          if (response.page) {
            convertData.call(this, response.page)
            this.$nextTick(() => {
              this.countHeight()
            })
          }
        } else {
          this.fullscreenLoading = false
          this.$message.error(response.msg)
        }
      })
      function convertData(page) {
        this.pagation.pageNumber = page.pageNumber
        this.pagation.pageSize = page.pageSize
        this.pagation.totalCount = page.totalCount
        this.filters.pageSize = page.pageSize
        this.filters.pageNumber = page.pageNumber
        this.orderList = page.result
      }
    },
    handleChangePagesize(size) {
      this.filters.pageSize = size
      this.getTransformList()
    },
    handleCurrentPageChange(currentPage) {
      this.filters.pageNumber = currentPage
      this.getTransformList()
    },
    resetForm(formName) {
      Object.assign(this.filters, {
        keyword: '',
        createTimeBegin: '',
        createTimeEnd: ''
      })
    },
    exportExcel() {
      let params = JSON.parse(JSON.stringify(this.filters))
        if (!params.createTimeBegin || !params.createTimeEnd) {
        this.$message.error('必须选择时间范围')
        return false
      }
      if (params.createTimeBegin) {
        params.createTimeBegin = +new Date(params.createTimeBegin)
      }
      if (params.createTimeEnd) {
        params.createTimeEnd = +new Date(params.createTimeEnd) + 86399000
      }
      this.fullscreenLoading = true
      request('/redwood/report/findTransform/export', {
        method: 'GET',
        data: params
      }).then((response) => {
        this.fullscreenLoading = false
        if (response.success === '1') {
          window.open('http://www.soouya.com' + response.obj)
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    getCutListParams() {
      let filters = this.filters
      let params = {}
      for (const key of Object.keys(filters)) {
        if (String(filters[key]) && key !== 'status' || (key === 'status' && filters[key] !== '-1')) {
          params[key] = key === 'key' ? filters[key] : +filters[key]
        }
      }
      return params
    }
  }
}
</script>
<style lang="scss" scoped>
.product-wrap {
  display: table;
  border: 0;
  border-collapse: collapse;
  width: 100%;
  height: 100%;
}

th.product-column {
  .color-item {
    border-top: 0;
  }
}

.item-table {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.exception {
  // color: #f00;
}

.product-item {
  display: table-row;
  &:not(:first-child) {
    border-top: 1px solid #dfe6ec;
  }
  >div {
    display: table-cell;
    &:nth-child(1) {
      width: 150px;
      vertical-align: middle;
      border-left: 0;
    }
    &:nth-child(2) {
      width: 100px;
      vertical-align: middle;
      border-left: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;
    }
    &:nth-child(3) {
      width: 80px;
      vertical-align: middle;
      border-left: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;
    }
    &:nth-child(4) {
      width: 120px;
      vertical-align: middle;
      border-right: 0;
    }
    &:nth-child(5) {
      width: 50px;
      vertical-align: middle;
      border-right: 0;
    }
    &:nth-child(6) {
      width: 50px;
      vertical-align: middle;
      border-right: 0;
    }
    &:nth-child(7) {
      width: 80px;
      vertical-align: middle;
      border-right: 0;
    }
    &:nth-child(8) {
      width: 70px;
      vertical-align: middle;
      border-right: 0;
    }
    &:nth-child(9) {
      width: 80px;
      vertical-align: middle;
      border-right: 0;
    }
    &:nth-child(10) {
      width: 100px;
      vertical-align: middle;
      border-right: 0;
    }
    &:nth-child(11) {
      width: 70px;
      vertical-align: middle;
      border-right: 0;
    }
    &:nth-child(12) {
      width: 70px;
      vertical-align: middle;
      border-right: 0;
    }
    &:nth-child(13) {
      width: 500px;
    }
    &:nth-child(14) {
      width: 70px;
      vertical-align: middle;
      border-right: 0;
    }
    &:nth-child(15) {
      width: 80px;
      vertical-align: middle;
      border-right: 0;
    }
    &:nth-child(16) {
      width: 150px;
      vertical-align: middle;
      border-right: 0;
    }
  }
}

.color-item {
  display: flex;
  &:not(:first-child) {
    border-top: 1px solid #dfe6ec;
  }
  span {
    width: 25%;
    text-align: center;
    padding: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px
  }
}

.sy-cutter-change {
  li {
    white-space: nowrap;
    margin: 10px 0;
    span {
      color: #20a0ff;
    }
  }
}
</style>
<style lang="scss" scoped>
.sy-cut-search {
  width: 380px;
}

.sy-page-wrap {
  font-size: 14px;
}

.el-table {
  .cell {
    padding: 0 5px;
  }
}

.sy-page-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sy-table-wrap {
  flex: 1;
}

.sy-pagination-wrap {
  flex: 0 0 50px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
}

.btn-export {
  position: absolute;
  right: 0;
  top: .3em;
}

.sy-update-cutter-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  footer {
    margin-top: 20px;
  }
}

.sy-current-cutter {
  color: #f00;
}
</style>
