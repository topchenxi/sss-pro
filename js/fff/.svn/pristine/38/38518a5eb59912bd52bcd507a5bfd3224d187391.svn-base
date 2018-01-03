 <template>
<div v-loading.body="fullscreenLoading">
  <!-- <h1 class="title" style="font-size: 25px; padding: 15px">待对账</h1> -->
  <HeadFilter v-on:getParams="getFilter" :param="filters"></HeadFilter>
  <el-tabs type="border-card" style = "width: 100%;" class='check-account-tab'>
    <el-tab-pane label="待对账">
      <div class="">
        <el-table class="fixed-table" :data="payGroupList.page.result.length > 0 ? payGroupList.page.result : []" :height="height" border>
          <el-table-column label="操作" width='100' fixed='right'>
            <template scope="scope">
              <div>
                <el-button size="mini" @click="split(scope.row.id)">拆分</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column inline-template label="进入待对账日期" min-width='170'>
            <div class="">
              {{row.createTimeString}}
            </div>
          </el-table-column>
          <el-table-column inline-template label="订单号" min-width="230">
            <div>
              <el-dropdown  v-if="row.serviceNumberList && row.serviceNumberList.length > 1" trigger="hover">
                <span class="el-dropdown-link">
                  {{seleted(row.serviceNumberList)}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                   <el-dropdown-item v-for="item in row.serviceNumberList">{{item}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div v-else>
                <span v-for="item in row.serviceNumberList">{{item}}{{ row.a }}</span>
              </div>
            </div>
          </el-table-column>
          <el-table-column inline-template label="出仓单号" min-width="170">
            <div>
              <el-dropdown  v-if="row.outReposityNumberList && row.outReposityNumberList.length > 1" trigger="hover">
                <span class="el-dropdown-link">
                  {{seleted(row.outReposityNumberList)}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                   <el-dropdown-item v-for="item in row.outReposityNumberList">{{item}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div v-else>
                <span v-for="item in row.outReposityNumberList">{{item}}{{ row.a }}</span>
              </div>
            </div>
          </el-table-column>
          <el-table-column inline-template label="原订单销售货款/元" min-width='130'>
            <p>{{row.totalOrderSaleMoney | formateNumber}}</p>
          </el-table-column>
          <el-table-column inline-template label="采购商税款/元" min-width='130'>
            <p>{{row.totalTaxMoney | formateNumber}}</p>
          </el-table-column>
          <el-table-column inline-template label="服务费/元" min-width='120'>
            <p>{{row.totalServiceMoney | formateNumber}}</p>
          </el-table-column>
          <el-table-column inline-template label="出仓销售货款/元" min-width='120'>
            <p>{{row.totalSaleMoney | formateNumber}}</p>
          </el-table-column>
          <el-table-column inline-template label="应收出仓销售货款/元" min-width='140'>
            <p>{{row.totalNeedSaleMoney | formateNumber}}</p>
          </el-table-column>
          <el-table-column inline-template label="运费/元" min-width='120'>
            <p>{{row.totalFreightMoney | formateNumber}}</p>
          </el-table-column>
          <el-table-column inline-template label="应收款/元" min-width='100'>
            <p>{{row.totalMoney | formateNumber}}</p>
          </el-table-column>
          <el-table-column property="category" label="订单类型" min-width="100" :formatter="getCategoryStr" ></el-table-column>
          <el-table-column prop="buyerCompany" label="采购商" min-width='120'>
          </el-table-column>
          <el-table-column prop="buyerNumber" label="采购商ID" min-width='120'>
          </el-table-column>
          <el-table-column inline-template width='130' label="跟单员">
            <p>{{row.follower}}/{{row.followerTel}}</p>
          </el-table-column>
          <el-table-column inline-template width='130' label="买货员">
            <p>{{row.purchaser}}/{{row.purchaserTel}}</p>
          </el-table-column>
          <el-table-column inline-template label="财务收款账户" width='240'>
            <div>
              <p style="line-height: 18px">{{row.financeBank}}</p>
              <p style="line-height: 18px">{{row.financeAccount}}</p>
            </div>
          </el-table-column>
          <el-table-column inline-template label="对账状态" min-width='100'>
            <p>待对账</p>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-content">
        <pagination :page="payGroupList.page.pageNumber" :total="payGroupList.page.totalCount" :render="listPayGroup" :options="filters"></pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
    <!-- 实款对账 --大货 -->
  <lightbox></lightbox>
  <div class="loading" v-show="showLoading"></div>
</div>
</template>

<style lang="scss">
.loading{
  z-index: 9999;
position: fixed;
width: 100%;
height: 100%;
left: 0;
top: 0;
background: rgba(0, 0, 0, .5)
}
  .check-account-tab {
  .el-tabs__content {
    position: static
  }
  .el-table td .cell {
    padding: 5px;
  }
  .line{
    height: 1px;
    border-bottom: 1px solid dashed;
  }
  .red{
    color: red;
  }
  .fl{
    float:left;
  }
  .imglist{
    float: left;
    display: inline-block;
    width: 300px;
  }
}
</style>
<script>
import VueFlatpickr from 'vue-flatpickr/VueFlatpickr-en.vue'
import 'vue-flatpickr/assets/flatpickr.min.css'
import HeadFilter from 'components/headFilter/HeadFilter'
import pagination from 'components/pagination'
import Lightbox from 'components/lightbox/lightbox'
import _ from 'lodash'
import Account from 'api/account'
import {
  request,
  newRequest,
  formatTimeString,
  getCategoryStr,
  getCache,
  setCache
} from 'common/utils'
export default {
  components: {
    VueFlatpickr,
    HeadFilter,
    pagination,
    Lightbox
  },
  data() {
    const filters = getCache({
      key: 'checkAccountFilters',
    }) || {
      pageNumber: 1,
      pageSize: 20,
    };
    return {
      time: new Date().getTime(),
      msg: '待分账',
      height: '600',
      checkYuerDialogVisible: false,
      shikuanDialogVisible: false,
      qiankuanDialogVisible: false,
      checkYuerDialogJianban: false,
      shikuanDialogJianban: false,
      duizhangDialog: {
        row: {
          ids: [],
          category: [],
        }
      }, // 销账弹窗
      cannotduizhang: {
        visible: false,
        tips: ''
      },
      customerAccount: {},
      buyerPayedMoney: '', // 采购商付款金额
      buyerCertificateList: [], // 采购商付款金额
      content: '', // 跟单员结算备注
      id: '',
      receivedTime: '',
      daozhangriqi: '',
      fullscreenLoading: true,
      filters: filters,
      payGroupList: {
        total: 0,
        page: {
          result: []
        }
      },
      payDebtList: {
        total: 0,
        page: {
          result: []
        }
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() >= Date.now();
        }
      },
      showLoading: false
    }
  },
  created() {
    this.currentTab = getCache({
      key: 'checkAccountTabType',
    }) || 1
  },
  mounted () {
    const that = this
    this.height = String(window.document.body.clientHeight - 500);
    this.$nextTick(function () {
      const tabs = document.getElementsByClassName('el-tabs__item')
      tabs[that.currentTab - 1].click()
      that.listPayGroup()
    })
  },
  watch: {
    filters: function (newValue, oldVal) {
      this.fullscreenLoading = true
      if (this.currentTab == 1) {
        this.listPayGroup()
      } else {
        this.listPayDebt()
      }
    }
  },
  filters: {
    formateNumber (val) {
      return Number(val).toFixed(2)
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.duizhangDialog.row.ids = []
      this.duizhangDialog.row.buyerIds = []
      let buyerCompany = []
      this.duizhangDialog.row.category = []
      let categoryType = []
      this.duizhangDialog.row.totalMoney = 0
      this.duizhangDialog.row.buyerPayedMoney = 0
      for (let i = 0; i < val.length; i++) {
        this.duizhangDialog.row.totalMoney = Number(this.duizhangDialog.row.totalMoney) + Number(val[i].totalMoney)
        this.duizhangDialog.row.buyerPayedMoney = Number(this.duizhangDialog.row.buyerPayedMoney) + Number(val[i].buyerPayedMoney)
        this.duizhangDialog.row.ids.push(val[i].id)
        buyerCompany.push(val[i].buyerId)
        categoryType.push(val[i].category)
      }
      var items = new Set(buyerCompany)
      for (let item of items.values()) {
        this.duizhangDialog.row.buyerIds.push(item)
      }
      var list = new Set(categoryType)
      for (let item of list.values()) {
        this.duizhangDialog.row.category.push(item)
      }
      console.log('aa', this.duizhangDialog)
    },
    split(id) {
      newRequest({
        url: '/redwood/account/Reconciliation/chaifen',
        contentType: 'application/json',
        method: 'POST',
        data: {
          id: id
        }
      }).then(response => {
        if (response.success === '1') {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.listPayGroup()
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    getCategoryStr(row, column) { // 订单类型映射
      return getCategoryStr(row.category)
    },
    // jumpToPayDetail(id, type, outReposityNumberList) {
    //   setCache({
    //     key: 'checkAccountTabType',
    //     value: 1
    //   });
    //   this.$router.push(`/finance/checkAccount/detail?id=${id}&outNumber=${outReposityNumberList}`)
    // },
    jumpToDebtDetail(id) {
      setCache({
        key: 'checkAccountTabType',
        value: 2
      });
      this.$router.push(`/finance/checkAccount/debtDetail?id=${id}`)
    },
    switchTab(tabObj) {
      this.currentTab = (Number(tabObj.index) + 1)
      this.filters = {
        pageNumber: 1,
        currentTab: this.currentTab,
        pageSize: 20
      }
      this.height = this.currentTab == 1 ? String(window.document.body.clientHeight - 500) : String(window.document.body.clientHeight - 520);
      setCache({
        key: 'checkAccountTabType',
        value: 1
      })
    },
    getFilter(params) {
      this.filters = params
      this.filters.pageNumber = 1
    },
    seleted(list) {
      let seletedText = ''
      list.length && list.map((item, i) => {
        const index = item.indexOf(this.filters.orderNumber)
        if (index != -1) {
          seletedText = item
          return
        }
      })
      return seletedText || list[0]
    },
    listPayGroup () {
      const that = this
      that.fullscreenLoading = true
      if (that.filters && !that.filters.pageNumber) {
        that.filters.pageNumber = 1
      }
      if (that.filters && !that.filters.pageSize) {
        that.filters.pageSize = 20
      }
      that.filters._time = that.time;
      const param = _.clone(that.filters)
      delete param.currentTab
      request({
        url: '/redwood/account/Reconciliation/listOld',
        data: {
          param: JSON.stringify(param)
        },
        method: 'post'
      }).then(res => {
        that.fullscreenLoading = false
        if (res.success === '1') {
          setCache({
            key: 'checkAccountFilters',
            value: that.filters,
          });
          res.page.result = res.page.result || []
          res.page.result = res.page.result.map((item) => {
            switch (String(item.status)) {
              case '1':
                item.status = '待对账'
                break
              case '2':
                item.status = '已对账'
                break
            }
            switch (String(item.payWay)) {
              case 'alipay':
                item.payWay = '支付宝手机支付'
                break
              case 'tecent_wx':
                item.payWay = '微信支付'
                break
              case 'offline':
                item.payWay = '线下支付'
                break
            }
            switch (String(item.payType)) {
              case '0':
                item.payType = '欠款'
                break
              case '1':
                item.payType = '实款'
                break
            }
            item.createTimeString = formatTimeString(item.createTime)
            return item
          })
          that.payGroupList = res
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    listPayDebt () {
      const that = this
      if (this.filters && !this.filters.pageNumber) {
        this.filters.pageNumber = 1
      }
      if (this.filters && !this.filters.pageSize) {
        this.filters.pageSize = 20
      }
      this.filters._time = this.time;
      const param = _.clone(that.filters)
      delete param.currentTab
      request({
        url: Account.PayDebt.list,
        data: {
          param: JSON.stringify(param)
        },
        method: 'post'
      }).then(res => {
        that.fullscreenLoading = false
        if (res.success === '1') {
          // console.log('this.filters', this.filters)
          setCache({
            key: 'checkAccountFilters',
            value: this.filters,
          });
          res.page.result = res.page.result || []
          res.page.result = res.page.result.map((item) => {
            switch (String(item.payStatus)) {
              case '-1':
                item.status = '异常'
                break
              case '-2':
                item.status = '待付款'
                break
              case '1':
                item.status = '待对账'
                break
              case '2':
                item.status = '已对账'
                break
            }
            switch (String(item.payWay)) {
              case 'alipay':
                item.payWay = '支付宝手机支付'
                break
              case 'tecent_wx':
                item.payWay = '微信支付'
                break
              case 'offline':
                item.payWay = '线下支付'
                break
            }
            switch (String(item.payType)) {
              case '0':
                item.payType = '欠款'
                break
              case '1':
                item.payType = '实款'
                break
            }
            item.createTimeString = formatTimeString(item.createTime)
            return item
          })
          that.payDebtList = res
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    }
  }
}
</script>
