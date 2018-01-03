<template>
  <div class="sy-page-wrap" v-loading.body="fullscreenLoading">
    <Menu></Menu>
    <div style="padding-bottom:15px;">
      <span>
        <el-date-picker v-model="needWatchParams.createTimeBegin" type="datetime" size="tiny" placeholder="开始时间"></el-date-picker>
        至
        <el-date-picker v-model="needWatchParams.createTimeEnd" type="datetime" size="tiny" placeholder="结束时间"></el-date-picker>
      </span>
      <!--<el-select v-model="needWatchParams.followerDeptId" placeholder="请选择部门" style="width: 120px">
        <el-option label="请选择部门" value=""></el-option>
        <el-option v-for="dept in allDept" :label="dept.name" :value="dept.id" :key="dept.id"></el-option>
      </el-select>-->
      <el-select v-model="needWatchParams.followerId" placeholder="请选择跟单员" style="width: 130px">
        <el-option label="请选择跟单" value=""></el-option>        
        <el-option v-for="seed in allFollower" :label="seed.realName" :value="seed.id" :key="seed.id"></el-option>
      </el-select>
      <el-select v-model="needWatchParams.salerId" placeholder="请选择销售员" style="width: 130px">
        <el-option label="请选择销售员" value=""></el-option>        
        <el-option v-for="seed in allSaler" :label="seed.realName" :value="seed.id" :key="seed.id"></el-option>
      </el-select>
      <el-select v-model="needWatchParams.purchaserId" placeholder="请选择买货员" style="width: 130px">
        <el-option label="请选择买货员" value=""></el-option>        
        <el-option v-for="seed in allBuyer" :label="seed.realName" :value="seed.id" :key="seed.id"></el-option>
      </el-select>
      <el-select v-model="needWatchParams.guiderId" placeholder="请选择采购员" style="width: 130px">
        <el-option label="请选择采购员" value=""></el-option>        
        <el-option v-for="seed in allGuider" :label="seed.realName" :value="seed.id" :key="seed.id"></el-option>
      </el-select>
      <el-select v-model="needWatchParams.statuses" placeholder="全部订单状态" style="width: 120px">
        <el-option label="全部订单状态" value="10,300,303,304,305,312,316,328,326,335,339,346,347,351,352,310,388,100,366,368"></el-option>
        <el-option label="等待通知询价" value="300"></el-option>
        <el-option label="等待报价" value="304"></el-option>
        <el-option label="等待录入大货信息" value="305"></el-option>
        <el-option label="等待销售入仓" value="310"></el-option>
        <el-option label="履约中" value="388"></el-option>
        <el-option label="等待采购商支付订金" value="312"></el-option>
        <el-option label="等待采购商付款" value="316"></el-option>
        <el-option label="等待收付订金" value="326"></el-option>
        <el-option label="等待收付款" value="328"></el-option>
        <el-option label="等待录入尾款信息" value="335"></el-option>
        <el-option label="等待采购商支付尾款" value="339"></el-option>
        <el-option label="等待收付尾款" value="346"></el-option>
        <el-option label="等待指派提货" value="347"></el-option>
        <el-option label="等待确认提货时间" value="351"></el-option>
        <el-option label="等待确认供应商送货时间" value="352"></el-option>
        <el-option label="供应商退款申请中" value="366"></el-option>
        <el-option label="财务处理退款中" value="368"></el-option>                
        <el-option label="已完成" value="10"></el-option>
        <el-option label="已取消" value="100"></el-option>
      </el-select>
      <span>
        <el-input placeholder="订单号/采购商/供应商" v-model="key" style="width: 160px;" class='searchInput'></el-input>
        <el-button-group style="z-index: 1000;">
          <el-button type="primary" @click.prevent="search">搜索</el-button>
          <el-button type="primary" @click.native="exportExcel">导出excel</el-button>
        </el-button-group>                
      </span>
    </div>
    <div class="">
      <el-table class="fixed-table" :data="pageData.result" border :height="height" :resizable="false">
        <el-table-column :show-overflow-tooltip="true" aligh="left" label="大货类型" min-width="80">
          <template scope="scope">
            {{scope.row.type === 1?'服务单':scope.row.type === 2?'贸易单':'采购单'}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" aligh="left" label="货源" min-width="60">
          <template scope="scope">
            {{scope.row.productSource === 0?'现货':scope.row.productSource === 1?'订货':''}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" aligh="left" property="number" label="订单号" min-width="190"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" aligh="left" label="订单发布时间" min-width="160">
          <template scope="scope">{{scope.row.createTime | formatTime}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" aligh="left" property="statusDesc" label="订单状态" min-width="150"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" aligh="left" property="" label="采购商" min-width="150">
          <template scope="scope">
            <span v-if="scope.row.customerHasOpenedBaitiao == 1" class="icon-baitiao"></span>
            <span v-if="scope.row.customerHasOpenedBaitiao == 0" class="icon-feibaitiao"></span>
            <span v-if="scope.row.customerHasOpenedYanzhen == 1" class="icon-yanzhen"></span>
            <span v-if="scope.row.customerHasOpenedYanzhen == 0" class="icon-feiyanzhen"></span>
            {{scope.row.customerCompany}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" aligh="left" property="showShopCompany" label="供应商" min-width="150"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" aligh="left" property="salerName" label="销售员" min-width="100"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" aligh="left" label="跟单员" min-width="100">
          <template scope="scope">{{scope.row.type < 3 ? scope.row.followerName : '--'}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" aligh="left" property="purchaserName" label="买货员" min-width="100"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" aligh="left" property="guiderName" label="采购员" min-width="100"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" aligh="left" label="采购数量" min-width="110">
                <template scope="scope">{{scope.row.quantity}}{{scope.row.quantityUnit}}/{{scope.row.colorNumber}}色</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" aligh="right" label="采购商税款" min-width="120">
          <template scope="scope">
            {{scope.row.taxMoney>0?('￥' + scope.row.taxMoney + '(' + scope.row.taxPoint + '%)'):'' }}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" aligh="right" label="服务费" min-width="90">
          <template scope="scope">
            {{scope.row.serviceMoney>0?('￥' + scope.row.serviceMoney):''}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" aligh="right" label="销售货款" min-width="100">
          <template scope="scope">
            {{scope.row.saleMoney>0?('￥' + scope.row.saleMoney):''}}
          </template>
        </el-table-column>                
        <el-table-column :show-overflow-tooltip="true" aligh="left" align="center" label="操作" width="150" fixed="right">
          <template scope="scope">
            <div class="operate-btn">
              <el-button v-if="scope.row.type < 3" class="o-btn" size="small" type="primary" @click="showDetail(scope.row.id)">详情</el-button>
              <router-link :to="{name: 'bulkOrderDetail', query: { detailType: 'all', customerId: scope.row.customerId, orderNumber: scope.row.id}}" v-else>
                <el-button class="o-btn" size="small" type="primary">
                  详情
                </el-button>
              </router-link>
              <el-button v-if="(scope.row.status == 304 || scope.row.status == 305)  && (!woodFinance || woodAdmin)" class="o-btn" size="small" type="primary" @click="showAssignAskPriceDialog(scope.row)">指派询价</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="下载Excel" v-model="downExcel.isShow" size="tiny" :modal="false">
        <a :href="downExcel.path">
          <el-button @click="downExcel.isShow = false">下载</el-button>
        </a>
      </el-dialog>
    </div>

    <div class="sy-pagination-wrap" ref="paginationWrap">
      <el-pagination @size-change="handleChangePagesize" @current-change="handleCurrentPageChange" :current-page="needWatchParams.pageNumber" :page-sizes="[20]" :page-size="needWatchParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageData.totalCount">
      </el-pagination>
    </div>
    <el-dialog title="指派询价" v-model="assignAskPriceDialog.isShow" :modal="false" size="tiny">
      <div class="sy-update-buyer-wrap" style="padding:20px;">
        <div v-if="assignAskPriceDialog.waitUpdateData" style="width:100%;padding-left:40px;">
          <el-row>
            <el-col :span="5">订单号</el-col>
            <el-col :span="10">{{assignAskPriceDialog.waitUpdateData.number}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">采购商</el-col>
            <el-col :span="10">{{assignAskPriceDialog.waitUpdateData.customerCompany}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">供应商</el-col>
            <el-col :span="10">{{assignAskPriceDialog.waitUpdateData.showShopCompany}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">采购数量</el-col>
            <el-col :span="10">{{assignAskPriceDialog.waitUpdateData.num}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">订单总金额</el-col>
            <el-col :span="10" style="color:red;">￥{{assignAskPriceDialog.waitUpdateData.totalMoney == undefined?0:assignAskPriceDialog.waitUpdateData.totalMoney}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">当前状态</el-col>
            <el-col :span="10">{{assignAskPriceDialog.waitUpdateData.statusDesc}}</el-col>
          </el-row>
          <el-row v-if="assignAskPriceDialog.waitUpdateData.status == 305">
            <el-col :span="5">
              <font color="red">*</font>选择买货员</el-col>
            <el-select size="small" v-model="assignAskPriceDialog.currentId" placeholder="请选择">
              <el-option v-for="item in allBuyer" :label="item.realName" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-row>
          <el-row v-if="assignAskPriceDialog.waitUpdateData.status == 304">
            <el-col :span="5">
              <font color="red">*</font>选择采购员</el-col>
            <el-select size="small" v-model="assignAskPriceDialog.currentId" placeholder="请选择">
              <el-option v-for="item in allGuider" :label="item.realName" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-row>
        </div>
        <footer slot="footer">
          <el-button @click="assignAskPriceDialog.isShow = false">取 消</el-button>
          <el-button type="primary" @click="submitAssignAskPrice">确 定</el-button>
        </footer>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.sy-update-buyer-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  footer {
    margin-top: 20px;
  }
}

.el-col-5 {
  text-align: right;
  height: 30px;
  margin-right: 20px;
}
</style>
<script>
import Menu from './menu.vue'
import getCache from '@/utils/getCache'
import request from '@/utils/request'
import ReportApi from '@/api/report'
import UserApi from '@/api/user'
import { Message } from 'element-ui'
import mixinFilters from '@/mixin/filters'
import assignAskPrice from '@/api/bulk/assignAskPrice'
export default {
  components: {
    Menu
  },
  mixins: [mixinFilters],
  data() {
    let createTimeEnd = '' // new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
    let createTimeBegin = '' // new Date(new Date().toLocaleDateString()).getTime()
    const auth = JSON.parse(getCache({
      key: 'currentUser'
    }))
    return {
      isTest: location.href.indexOf('test') > 0 || location.href.indexOf('local') > 0,
      fullscreenLoading: false,
      dialogFormVisible: false,
      activeName: 'first',
      pageData: {},
      allDept: [],
      allFollower: [],
      allSaler: [],
      allBuyer: [],
      allGuider: [],
      height: 100,
      dom: {
        tabsHeight: 0,
        paginationHeight: 0
      },
      key: '',
      export: 0,
      needWatchParams: {
        createTimeBegin: createTimeBegin,
        createTimeEnd: createTimeEnd,
        // followerDeptId: '',
        followerId: '',
        purchaserId: '',
        salerId: '',
        guiderId: '',
        statuses: '',
        pageSize: 20,
        pageNumber: 1
      },
      currentTab: '',
      woodAdmin: auth.woodAdmin,
      woodFinance: auth.woodFinance,
      assignAskPriceDialog: {
        isShow: false,
        waitUpdateData: null,
        currentId: ''
      },
      downExcel: {
        isShow: false,
        path: ''
      }
    }
  },
  mounted() {
    this.getAllDept()
    this.getAllSaler()
    this.getAllGuider()
    // if (this.needWatchParams.followerDeptId) {
    this.getAllFollower()
    // }
    this.getAllBuyer()
    this.listReportBulk()
    window.addEventListener('resize', this.countHeight)
  },
  watch: {
    // 'needWatchParams.followerDeptId': function() {
    //   this.getAllFollower()
    // },
    needWatchParams: {
      handler: function(newValue, oldValue) {
        this.listReportBulk()
      },
      deep: true
    }
  },
  methods: {
    countHeight() {
      let windowHeiht = document.body.clientHeight
      let dom = this.dom
      dom.tabsHeight = this.dom.tabsHeight || 60
      dom.paginationHeight = dom.paginationHeight || parseFloat(getComputedStyle(this.$refs.paginationWrap, null).height)
      this.height = parseFloat(windowHeiht - dom.tabsHeight - dom.paginationHeight - 161) // 61=头部高度 + 10
    },
    handleChangePagesize(size) {
      this.needWatchParams.pageSize = size
    },
    handleCurrentPageChange(currentPage) {
      this.needWatchParams.pageNumber = currentPage
    },
    listReportBulk() {
      var statuses = this.needWatchParams.statuses
      if (statuses === '') {
        statuses = '10,300,303,304,305,311,312,316,328,326,335,338,339,346,347,351,352,310,388,100,366,368'
      }
      var param = Object.assign({}, this.needWatchParams, {
        createTimeBegin: this.needWatchParams.createTimeBegin ? new Date(this.needWatchParams.createTimeBegin).getTime() : '',
        createTimeEnd: this.needWatchParams.createTimeEnd ? new Date(this.needWatchParams.createTimeEnd).getTime() : '',
        statuses: statuses,
        key: this.key,
        export: this.export,
        _function: 'all',
        listAll: 1
      })

      if (param.createTimeBegin && param.createTimeEnd && param.createTimeBegin > param.createTimeEnd) {
        Message({
          message: '订单开始时间不能大于结束时间',
          type: 'error',
          duration: 1000
        })
        return
      }

      this.fullscreenLoading = true
      var url = ReportApi.Report.listReportBulk
      request(url, {
        method: 'GET',
        data: param
      }).then(data => {
        this.fullscreenLoading = false
        if (data.success !== '1') {
          Message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        } else {
          if (this.export !== 1) {
            this.pageData = data.page
            this.$nextTick(() => {
              this.countHeight()
            })
          } else {
            window.open(data.obj)
            this.export = 0
          }
        }
      })
    },
    getAllDept() {
      this.fullscreenLoading = true
      request(UserApi.User.getDepartmentList, {
        method: 'post',
        data: {
          param: JSON.stringify('')
        }
      }).then(data => {
        this.fullscreenLoading = false
        if (data.success === '1') {
          this.allDept = data.list
        } else {
          Message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    getAllFollower() {
      // var followerDeptId = this.needWatchParams.followerDeptId
      var code = 'woodFollowLeader'
      this.fullscreenLoading = true
      request('/crm/user/User/listRedSeedByCodes', {
        method: 'post',
        data: {
          param: JSON.stringify({ code: code })
        }
      }).then(data => {
        this.fullscreenLoading = false
        if (data.success === '1') {
          this.allFollower = data.list
          // this.allFollower.unshift({ id: '', realName: '全部组员' })
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
      this.fullscreenLoading = true
      const param = {
        status: 1
      }
      request(ReportApi.JiXiao.listXiaoShou4OMS, {
        method: 'post',
        data: {
          param: JSON.stringify(param)
        }
      }).then(data => {
        this.fullscreenLoading = false
        if (data.success === '1') {
          this.allSaler = data.result
          // this.allSaler.unshift({ id: '', realName: '全部销售员' })
        } else {
          Message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    getAllGuider() {
      var code = 'woodGuider,woodGuiderLeader'
      this.fullscreenLoading = true
      request('/crm/user/User/listRedSeedByCodes', {
        method: 'post',
        data: {
          param: JSON.stringify({ code: code })
        }
      }).then(data => {
        this.fullscreenLoading = false
        if (data.success === '1') {
          this.allGuider = data.list
        } else {
          this.$message.error('系统异常')
        }
      })
    },
    getAllBuyer() {
      this.fullscreenLoading = true
      const param = {
        status: 1
      }
      request(ReportApi.JiXiao.listPurchaser4OMS, {
        method: 'post',
        data: {
          param: JSON.stringify(param)
        }
      }).then(data => {
        this.fullscreenLoading = false
        if (data.success === '1') {
          this.allBuyer = data.result
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
      this.listReportBulk()
    },
    showDetail(id) {
      if (id.indexOf('RC') >= 0) {
        id = id.replace('RC', '')
        id = id.substring(0, id.length - 2)
      }
      let domain = 'http://hongshan.soouya.com'
      if (this.isTest) {
        domain = 'http://testhongshan.soouya.com'
      }
      window.open(domain + '/index/orderDetail?noBar=1&orderNumber=' + id, '_blank')
    },
    showAssignAskPriceDialog(orderData) {
      console.log(orderData)
      this.assignAskPriceDialog.waitUpdateData = orderData
      this.assignAskPriceDialog.isShow = true
      if (orderData.type === 3) {
        this.assignAskPriceDialog.currentId = orderData.guiderId
      } else {
        this.assignAskPriceDialog.currentId = orderData.purchaserId
      }
    },
    submitAssignAskPrice() {
      let od = this.assignAskPriceDialog.waitUpdateData
      let param = {}
      param.orderNumber = od.id
      if (od.type === 3) {
        param.guiderId = this.assignAskPriceDialog.currentId
      } else {
        param.id = this.assignAskPriceDialog.currentId
      }
      param._time = new Date().getTime()
      assignAskPrice(param)
        .then(response => {
          if (response.success === '1') {
            this.$message.success(response.msg)
            this.assignAskPriceDialog.isShow = false
            this.listReportBulk()
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.operate-btn button {
  float: left
}
</style>
