<template>
  <div class="jixao-manage" v-loading.body="fullscreenLoading">
    <div class="oms-title-wrap">
      <h2>绩效管理</h2>
      <div class="right">
        <div class="btn-add" @click="exportExcel">
          <span class="icon-bill"></span> 导出Excel
        </div>
      </div>
    </div>
    <div class="containter">
      <el-tabs v-model="activeName" type="card" @tab-click="switchTab" class="tabs-containter">
        <el-tab-pane label="跟单绩效" name="first"></el-tab-pane>
        <el-tab-pane label="采购绩效" name="second"></el-tab-pane>
      </el-tabs>
      <JiXiaoFilter v-on:getParams="getFilter" :param="filters"></JiXiaoFilter>
      <div class="table-wrap">
        <div class="table-content" :style="{ height : windowHeight - 410 + 'px'}">
          <el-table v-if="activeName=='first'" class="fixed-table" :data="followerData.result" border :height="windowHeight-410">
            <el-table-column align="center" property="serviceNumber" label="订单号" min-width="170"></el-table-column>
            <el-table-column align="center" property="createTime" label="订单发布时间" min-width="170"></el-table-column>
            <el-table-column align="center" property="outReposityNumber" label="出仓单号" min-width="130"></el-table-column>
            <el-table-column align="center" property="outReposityCreateTime" label="出仓单时间" min-width="170"></el-table-column>
            <el-table-column align="center" property="followerName" label="跟单员" min-width="110"></el-table-column>
            <el-table-column align="center" property="purchaserName" label="买货员" min-width="130"></el-table-column>
            <el-table-column align="center" property="salesName" label="销售员" min-width="130"></el-table-column>
            <el-table-column align="center" property="buyerCompany" label="采购商" min-width="120"></el-table-column>
            <el-table-column align="center" property="shopCompany" label="供应商" min-width="120"></el-table-column>
            <el-table-column align="center" property="outRepositySaleMoney" label="出仓销售货款" min-width="160"></el-table-column>
            <el-table-column align="center" inline-template label="采购商税点" min-width="120">
              <span>{{row.taxPoint + '%'}}</span>
            </el-table-column>
            <el-table-column align="center" property="outReposityCostMoney" label="出仓成本货款（不含税)" min-width="220"></el-table-column>
            <el-table-column align="center" inline-template label="供应商税点" min-width="120">
              <span>{{(row.sellerTaxPoint ? row.sellerTaxPoint : 0 ) + '%'}}</span>
            </el-table-column>
            <el-table-column align="center" property="totalMoney" label="采购商对账金额" min-width="200"></el-table-column>
            <el-table-column align="center" property="incomeTime" label="达账时间" min-width="120"></el-table-column>
            <el-table-column align="center" property="outReposityOutTime" label="出仓时间" min-width="120"></el-table-column>
            <el-table-column align="center" property="reconciliationCreateTime" label="提交结算时间" min-width="160"></el-table-column>
            <el-table-column align="center" inline-template label="毛利系数" min-width="120">
              <span>{{(row.maoliPoint ? row.maoliPoint : 0 ) + '%'}}</span>
            </el-table-column>
            <el-table-column align="center" property="maoli" label="毛利" min-width="120"></el-table-column>
          </el-table>
          <table class="table" v-if="activeName=='second'">
            <thead>
              <tr>
                <th>买货员</th>
                <th>已询价订单</th>
                <th>已出仓订单数</th>
                <th>订单成本货款（不含税）</th>
                <th>订单成本货款（含税）</th>
                <th>开票业绩系数</th>
                <th>开票业绩</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in caiGouYuanData" :key="index">
                <!-- 买货员 -->
                <td>{{item.purchaserName}}</td>
                <!-- 已询价订单 -->
                <td>{{item.askPricedCount}}</td>
                <!-- 已出仓订单数 -->
                <td>{{item.coutReposityCount}}</td>
                <!-- 订单成本货款（不含税） -->
                <td>{{item.costMoneyOffTax}}</td>
                <!-- 订单成本货款（含税） -->
                <td>{{item.costMoney}}</td>
                <!-- 开票业绩系数 -->
                <td>
                  {{(item.invoiceAchievementsPoint ? item.invoiceAchievementsPoint : 0 ) + '%'}}
                </td>
                <!-- 开票业绩 -->
                <td>{{item.invoiceAchievements}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="page-wrap">
          <pagination :page="followerData.pageNumber" :total="followerData.totalCount" :render="pageChange" :options="filters"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import JiXiaoFilter from 'components/headFilter/report/JiXiaoFilter.vue'
import Pagination from 'components/pagination'
import {
  request,
  //    getCache,
  setCache,
  formatTimeString
  //    copy
} from 'common/utils'
import ReportApi from 'api/report'
import { Message } from 'element-ui'
export default {
  components: {
    Pagination,
    JiXiaoFilter
  },
  data() {
    return {
      fullscreenLoading: false,
      activeName: 'first',
      followerData: {},
      caiGouYuanData: [],
      searchVal: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      height: '600',
      filters: {
        createTimeBegin: new Date(new Date().toLocaleDateString()).getTime(),
        createTimeEnd: new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime()
      },
      currentTab: ''
    };
  },
  mounted() {
    if (!this.currentTab || this.currentTab === 1) {
      this.getFollowerList(1)
    } else {
      this.getCaiGouList(1)
    }
  },
  watch: {
    /**
     * 点击搜索或分页时，更改filters，并请求列表
     */
    filters: function(newValue, oldValue) {
      console.log(newValue.currentTab, oldValue.currentTab)
      if (!newValue.currentTab || newValue.currentTab === 1) {
        this.getFollowerList(1)
      } else {
        this.getCaiGouList(1)
      }
    }
  },
  methods: {
    formatTime(row, column) { // 格式化时间
      return formatTimeString(row.createTime)
    },
    switchTab(tabObj) {
      this.currentTab = (Number(tabObj.index) + 1)
      console.log('currentTab', this.currentTab)
      this.filters = {
        pageNumber: 1,
        currentTab: this.currentTab,
        pageSize: 10
      }
      setCache({
        key: 'checkAccountTabType',
        value: 1
      })
    },
    getDepartment(params) {
      console.log(params.departmentId)
      this.ruleForm.deptId = params.departmentId
    },
    /**
     * 获取筛选参数
     */
    getFilter(params) {
      this.filters = params;
      console.log(params)
      if (params.createTimeBegin) {
        this.filters.createTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      if (params.createTimeEnd) {
        this.filters.createTimeEnd = new Date(params.createTimeEnd).getTime()
      }
      this.filters = Object.assign({
        pageNumber: 1,
        pageSize: 10,
      }, this.filters)
    },
    pageChange() {
      this.filters = Object.assign({
        pageNumber: 1,
        pageSize: 10,
      }, this.filters)
      if (!this.currentTab || this.currentTab === 1) {
        this.getFollowerList(1)
      } else {
        this.getCaiGouList(1)
      }
    },
    getFollowerList(type) {
      const params = Object.assign({
        type: type,
        pageNumber: 1,
        pageSize: 10,
      }, this.filters)
      if (!params.createTimeBegin) {
        params.createTimeBegin = new Date('2017-03-21').getTime()
      }
      if (!params.createTimeEnd) {
        params.createTimeEnd = new Date(new Date().toLocaleDateString()).getTime()
      }
      this.fullscreenLoading = true;
      setCache({
        key: 'userListFilters',
        value: this.filters,
      });
      if (params.type === 2) {
        this.fullscreenLoading = false
        const url = `${ReportApi.JiXiao.listFollowerAchievements}?param=${JSON.stringify(params)}`
        window.open(url)
        return
      }
      request({
        url: ReportApi.JiXiao.listFollowerAchievements,
        method: 'post',
        data: {
          param: JSON.stringify(params)
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.followerData = data.page;
          this.followerData.total = data.total;
        } else {
          Message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    getCaiGouList(type) {
      const params = Object.assign({
        pageNumber: 1,
        pageSize: 10,
      }, this.filters)
      this.fullscreenLoading = true;
      var url = ReportApi.JiXiao.listPurchaserAchievements
      if (type === 2) {
        url = ReportApi.JiXiao.exportPurchaserAchievements
      }
      request({
        url: url,
        contentType: 'application/json',
        method: 'post',
        data: JSON.stringify(params)
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          if (data.obj) {
            window.open('http://www.soouya.com' + data.obj)
          } else {
            this.caiGouYuanData = data.result;
          }
        } else {
          Message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    exportExcel() {
      console.log('exportExcel', this.filters.currentTab)
      if (!this.filters.currentTab || this.filters.currentTab === 1) {
        this.getFollowerList(2)
      } else {
        this.getCaiGouList(2)
      }
    }
  }
};

</script>
