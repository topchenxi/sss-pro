<template>
  <div class="jixao-manage" v-loading.body="fullscreenLoading">
    <h1 class="title" style="font-size: 25px; padding: 15px">大货报表</h1>
    <el-tabs v-model="activeName">
      <div>
        <span>
                      订单起始时间：
                      <el-date-picker v-model="needWatchParams.createTimeBegin" type="datetime" size="small" placeholder="开始时间"></el-date-picker>
                      至
                      <el-date-picker v-model="needWatchParams.createTimeEnd" type="datetime" size="small" placeholder="结束时间"></el-date-picker>
                    </span>
        <el-select v-model="needWatchParams.followerDeptId" placeholder="请选择跟单员所属部门" style="width: 150px">
          <el-option label="全部部门" value=""></el-option>
          <el-option v-for="dept in allDept" :label="dept.name" :value="dept.id"></el-option>
        </el-select>
        <el-select v-model="needWatchParams.followerId" placeholder="请选择跟单员" style="width: 150px">
          <el-option v-for="seed in allMember" :label="seed.realName" :value="seed.id"></el-option>
        </el-select>
        <el-select v-model="needWatchParams.salerId" placeholder="请选择销售员" style="width: 150px">
          <el-option v-for="seed in allSaler" :label="seed.realName" :value="seed.id"></el-option>
        </el-select>
        <el-select v-model="needWatchParams.statuses" placeholder="请选择订单状态" style="width: 150px">
          <el-option label="全部订单状态" value="10,300,303,305,311,312,316,328,326,335,338,339,346,347,351,352,310,388,100"></el-option>
          <el-option label="已完成" value="10"></el-option>
          <el-option label="进行中" value="300,303,305,311,312,316,328,326,335,338,339,346,347,351,352,310,388"></el-option>
          <el-option label="已取消" value="100"></el-option>
        </el-select>
        <span>
                      <el-input placeholder="订单号/采购商/供应商" v-model="key" style="width: 200px;" class='searchInput' size="small"></el-input>
                      <el-button-group style="float: right; position: relative; z-index: 1000;">
                        <el-button type="primary" @click.prevent="search">搜索</el-button>
                        <el-button type="primary" @click.native="exportExcel">导出excel</el-button>
                      </el-button-group>
                    </span>
      </div>
      <el-tab-pane label="大货订单明细" name="first">
        <div class="">
          <el-table class="fixed-table" :data="pageData.result" border :height="height">
            <el-table-column label="订单类型" min-width="100">
              <template scope="scope">
                {{scope.row.type === 1?'服务单':scope.row.type === 2?'贸易单':''}}
              </template>
            </el-table-column>
            <el-table-column label="货源" min-width="80">
              <template scope="scope">
                {{scope.row.productSource === 0?'现货':scope.row.productSource === 1?'订货':''}}
              </template>
            </el-table-column>
            <el-table-column property="serviceNumber" label="订单号" min-width="180"></el-table-column>
            <el-table-column property="createTime" label="订单发布时间" min-width="150" :formatter="formatTime"></el-table-column>
            <el-table-column property="statusDesc" label="订单状态" min-width="120"></el-table-column>
            <el-table-column property="customerCompany" label="采购商" min-width="130"></el-table-column>
            <el-table-column property="salerName" label="销售员" min-width="100"></el-table-column>
            <el-table-column property="followerName" label="跟单员" min-width="100"></el-table-column>
            <el-table-column property="buyerName" label="买货员" min-width="100"></el-table-column>
            <el-table-column label="采购数量" min-width="120">
              <template scope="scope">
                <span v-if="scope.row.num>0">
                                                        {{scope.row.num + '色/' + scope.row.quantity + scope.row.quantityUnit}}
                                                      </span>
              </template>
            </el-table-column>
            <el-table-column label="采购商税款" min-width="120">
              <template scope="scope">
                {{scope.row.taxMoney>0?(scope.row.taxMoney + '元(' + scope.row.taxPoint + '%)'):'' }}
              </template>
            </el-table-column>
            <el-table-column label="服务费" min-width="100">
              <template scope="scope">
                {{scope.row.serviceMoney>0?(scope.row.serviceMoney + '元'):''}}
              </template>
            </el-table-column>
            <el-table-column label="销售货款" min-width="100">
              <template scope="scope">
                {{scope.row.saleMoney>0?(scope.row.saleMoney + '元'):''}}
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="下载Excel" v-model="downExcel.isShow" size="tiny" :modal="false">
            <a :href="downExcel.path">
              <el-button @click="downExcel.isShow = false">下载</el-button>
            </a>
          </el-dialog>
        </div>
      </el-tab-pane>
      <div class="sy-pagination-wrap" ref="paginationWrap">
        <el-pagination @size-change="handleChangePagesize" @current-change="handleCurrentPageChange" :current-page="needWatchParams.pageNumber" :page-sizes="[20]" :page-size="needWatchParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageData.totalCount">
        </el-pagination>
      </div>
    </el-tabs>
  </div>
</template>
<script>
import Pagination from 'components/pagination'
import {
  request,
  formatTimeString
} from 'common/utils'
import ReportApi from 'api/report'
import UserApi from 'api/user'
import { Message } from 'element-ui'
export default {
  components: {
    Pagination
  },
  data() {
    let createTimeEnd = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
    let createTimeBegin = new Date(new Date().toLocaleDateString()).getTime()
    return {
      fullscreenLoading: false,
      dialogFormVisible: false,
      activeName: 'first',
      pageData: {},
      allDept: [],
      allMember: [],
      allSaler: [],
      height: '600',
      key: '',
      export: 0,
      needWatchParams: {
        createTimeBegin: createTimeBegin,
        createTimeEnd: createTimeEnd,
        followerDeptId: '',
        followerId: '',
        salerId: '',
        statuses: '',
        pageSize: 20,
        pageNumber: 1
      },
      currentTab: '',
      downExcel: {
        isShow: false,
        path: ''
      }
    };
  },
  mounted() {
    this.getAllDept()
    this.getAllSaler()
    if (this.needWatchParams.followerDeptId) {
      this.getAllMember()
    }
    this.listReportBulk()
  },
  watch: {
    'needWatchParams.followerDeptId': function () {
      this.getAllMember()
    },
    needWatchParams: {
      handler: function (newValue, oldValue) {
        this.listReportBulk()
      },
      deep: true
    }
  },
  methods: {
    handleChangePagesize(size) {
      this.needWatchParams.pageSize = size
    },
    handleCurrentPageChange(currentPage) {
      this.needWatchParams.pageNumber = currentPage
    },
    formatTime(row, column) { // 格式化时间
      return formatTimeString(row.createTime)
    },
    listReportBulk() {
      var statuses = this.needWatchParams.statuses
      if (statuses == '') {
        statuses = '300,303,305,311,312,316,328,326,335,338,339,346,347,351,352,310,388'
      }
      var param = Object.assign({}, this.needWatchParams, {
        createTimeBegin: new Date(this.needWatchParams.createTimeBegin).getTime(),
        createTimeEnd: new Date(this.needWatchParams.createTimeEnd).getTime(),
        statuses: statuses,
        key: this.key,
        export: this.export
      })

      this.fullscreenLoading = true
      request({
        url: ReportApi.Report.listReportBulk,
        data: param
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success != '1') {
          Message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        } else {
          if (this.export == 0) {
            this.pageData = data.page
          } else {
            window.open(data.obj)
          }
        }
      })
    },
    getAllDept() {
      this.fullscreenLoading = true;
      request({
        url: UserApi.User.getDepartmentList,
        method: 'post',
        data: {
          param: JSON.stringify('')
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.allDept = data.list;
        } else {
          Message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    getAllMember() {
      const needWatchParams = {
        departmentId: this.needWatchParams.followerDeptId,
        pageNumber: 1,
        pageSize: 1000,
      }
      this.fullscreenLoading = true;
      request({
        url: UserApi.User.userList,
        method: 'post',
        data: {
          param: JSON.stringify(needWatchParams)
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.allMember = data.page.result;
          this.allMember.unshift({ id: '', realName: '全部组员' })
        } else {
          Message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    getAllSaler() {
      this.fullscreenLoading = true;
      request({
        url: ReportApi.JiXiao.listXiaoShou4OMS,
        method: 'post',
        data: {
          param: JSON.stringify('')
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.allSaler = data.result;
          this.allSaler.unshift({ id: '', realName: '全部销售员' })
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
      this.export = 1
      this.listReportBulk()
    },
    search() {
      this.export = 0
      this.listReportBulk()
    }
  }
};
</script>
