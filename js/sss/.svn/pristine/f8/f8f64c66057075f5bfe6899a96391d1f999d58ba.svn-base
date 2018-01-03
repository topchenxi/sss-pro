 <template>
<div v-loading.body="fullscreenLoading">
  <h1 class="title" style="font-size: 25px; padding: 15px">待对账</h1>
  <HeadFilter v-on:getParams="getFilter" :param="filters"></HeadFilter>
  <el-tabs type="border-card"  @tab-click="switchTab" style = "width: 100%;" class='check-account-tab'>
    <el-tab-pane label="待对账">
      <div>
        待对账总金额：
        <span style="color: red">{{payGroupList.total ? Number(payGroupList.total).toFixed(2) : ''}}</span>元
      </div>
      <br/>
      <el-table
        class="fixed-table"
        :data="payGroupList.page.result.length > 0 ? payGroupList.page.result : []"
        :height="height"
        border
      >
        <el-table-column inline-template label="操作" width='180' fixed='right'>
          <div>
            <div v-if="row.status != -2 && row.status != -1">
              <el-button size="mini" @click="PayGroupConfirmIncome(row)">对账</el-button>
              <el-button size="mini" @click="PayGroupSendbackIncome(row.id)">异常</el-button>
              <el-button size="mini" @click="jumpToPayDetail(row.id, row.type)">明细</el-button>
            </div>
            <div v-else>
              <span style="color: #999;">对账</span>
              <span style="color: #999;">异常</span>
              <el-button size="mini" @click="jumpToPayDetail(row.id, row.type)">明细</el-button>
            </div>
          </div>
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
        <el-table-column inline-template label="总销售货款/元" min-width='170'>
          <p>{{row.totalSaleMoney.toFixed(2)}}</p>
        </el-table-column>
        <el-table-column inline-template label="总采购商税款/元" min-width='150'>
          <p>{{row.totalTaxMoney.toFixed(2)}}</p>
        </el-table-column>
        <el-table-column inline-template label="总服务费/元" min-width='120'>
          <p>{{row.totalServiceMoney.toFixed(2)}}</p>
        </el-table-column>
        <el-table-column inline-template label="应收款/元" min-width='100'>
          <p>{{row.totalMoney.toFixed(2)}}</p>
        </el-table-column>
        <el-table-column prop="buyerCompany" show-overflow-tooltip label="采购商">
        </el-table-column>
        <el-table-column prop="buyerNumber" show-overflow-tooltip label="采购商ID" min-width='120'>
        </el-table-column>
        <el-table-column inline-template width='80' show-overflow-tooltip label="跟单员">
          <p>{{row.follower}}/{{row.followerTel}}</p>
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
      <div class="page">
        <pagination :page="payGroupList.page.pageNumber" :total="payGroupList.page.totalCount" :render="listPayGroup" :options="filters"></pagination>
      </div>
    </el-tab-pane>

    <el-tab-pane label="待收欠款">
      <div>
        待收欠款：
        <span style="color: red">{{payDebtList.total ? payDebtList.total.toFixed(2) : ''}}</span>元
      </div>
      <br/>
      <el-table
        class="fixed-table"
        :data="payDebtList.page.result"
        :height="height"
        border
      >
        <el-table-column inline-template label="操作" width='180' fixed="right">
          <div>
            <div v-if="row.payStatus == 1">
              <el-button size="mini" @click="PayDebtConfirmIncome(row)">对账</el-button>
              <el-button size="mini" @click="PayDebtSendbackIncome(row.id)">异常</el-button>
              <el-button size="mini" @click="jumpToDebtDetail(row.id)">明细</el-button>
              <el-button size='mini' @click.prevent="toPrint(row.orderNumber)">打印</el-button>
            </div>
            <div v-else>
              <span style="color: #999;">对账</span>
              <span style="color: #999;">异常</span>
              <el-button size="mini" @click="jumpToDebtDetail(row.id)">明细</el-button>
            </div>
          </div>
        </el-table-column>
        <el-table-column inline-template label="进入待收欠款日期" width='150'>
          <!-- <div><p>{{ row.createTimeString.split(' ')[0] }}</p><p>{{ row.createTimeString.split(' ')[1] }}</p></div> -->
          <div><p>{{ row.createTimeString }}</p></div>
        </el-table-column>
        <el-table-column prop="serviceNumber" label="订单号" width="200">
        </el-table-column>
        <el-table-column prop="outReposityNumber" label="出仓单号" width="120">
        </el-table-column>
        <el-table-column inline-template label="已使用可用余额/元" width="120">
          <span>{{Number(row.availableYet).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="已使用可用授信额度/元" width="140">
          <span>{{Number(row.creditLineYet).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="应收欠款/元" width="140">
          <span>{{Number(row.totalMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column prop='user' label="欠款用户" width="140" show-overflow-tooltip>
        </el-table-column>
        <el-table-column inline-template min-width="140" label="欠款用户类型" >
         <p>{{row.userType == 1 ? '采购商' : '供应商'}}</p>
       </el-table-column>
        <el-table-column prop='userNumber' label="用户ID" width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column inline-template label="跟单员" show-overflow-tooltip min-width="100">
          <div>{{row.follower}}/{{row.followerTel}}</div>
        </el-table-column>
        <el-table-column inline-template label="财务收款账户" min-width='180'>
          <div style="text-align: center">
            <p style="line-height: 18px">{{row.financeBank}}</p>
            <p style="line-height: 18px">{{row.financeAccount}}</p>
          </div>
        </el-table-column>
          <el-table-column prop="billingCycle" label="采购商结算周期" min-width='250'>
          </el-table-column>
        <el-table-column inline-template label="对账状态" min-width="120">
          <p>待对账</p>
        </el-table-column>
      </el-table>
      <div class="page">
        <pagination :page="payDebtList.page.pageNumber" :total="payDebtList.page.totalCount" :render="listPayDebt" :options="filters"></pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
  <!-- 检测可用余额是否够用 -->
  <el-dialog title="提示" v-model="checkYuerDialogVisible" size="tiny">
    <span style='padding: 10px 0; font-size: 16px'>客户可用总额不足！请确认是否需要预存或调整授信额度。</span>
    <div style='font-size: 16px; text-align: left; padding-left: 20px'>
      <div style='margin-top: 20px;'>可用总额：{{Number(customerAccount.available).toFixed(2)}} 元</div>
      <div style='margin-top: 20px; border-top: 1px dashed #999; padding-top: 20px'>采购商付款金额：{{buyerPayedMoney && Number(buyerPayedMoney).toFixed(2)}} 元</div>
      <div style='margin-top: 20px;'>
        采购商付款凭据:
        <article class="media" v-if='buyerCertificateList && buyerCertificateList.length'>
          <a :href="'http://www.soouya.com'+val.imgUrl" class="image media-left is-64x64"
            v-lightbox="buyerCertificateList"
            v-for="val in buyerCertificateList"
            >
            <img :src="'http://www.soouya.com'+val.imgUrl+'@200h_200w_1e'" alt="Image" width="60" height="60">
          </a>
        </article>
      </div>
      <div style='margin-top: 20px; font-size: 16px;'>
        结算备注: {{content}}
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="checkYuerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="toAdjust">去调整</el-button>
    </span>
  </el-dialog>
    <!-- 实款对账 -->
  <el-dialog title="提示" v-model="shikuanDialogVisible" size="tiny">
    <span style='padding: 10px 0; font-size: 16px'>一旦确认提交，将不可修改。</span>
    <template v-if='customerAccount.totalMoney <= customerAccount.available && customerAccount.availableBalance < customerAccount.totalMoney'>
      <div style='margin-top: 20px; font-size: 16px; color: red'>应收款：{{Number(customerAccount.totalMoney).toFixed(2)}} 元</div>
      <div style='margin-top: 20px; font-size: 16px'>可用余额抵扣：{{Number(customerAccount.availableBalance).toFixed(2)}} 元</div>
      <div style='margin-top: 20px; font-size: 16px'>可用信用额度抵扣：{{Number(customerAccount.totalMoney - customerAccount.availableBalance).toFixed(2)}}元</div>
    </template>
    <template v-if='customerAccount.availableBalance >= customerAccount.totalMoney'>
      <div style='margin-top: 20px; font-size: 16px; color: red'>应收款：{{Number(customerAccount.totalMoney).toFixed(2)}} 元</div>
      <div style='margin-top: 20px; font-size: 16px'>可用余额抵扣：{{Number(customerAccount.totalMoney).toFixed(2)}} 元</div>
      <div style='margin-top: 20px; font-size: 16px'>可用信用额度抵扣：0.00 元</div>
    </template>
    <span slot="footer" class="dialog-footer">
      <el-button @click="shikuanDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="doPayGroup">确定</el-button>
    </span>
  </el-dialog>
  <!-- 欠款对账 -->
  <el-dialog title="提示" v-model="qiankuanDialogVisible" size="tiny">
    <span style='padding: 10px 0; font-size: 16px'>一旦确认提交，将不可修改。</span>
    <div style='margin-top: 20px; font-size: 16px; color: red'>应收欠款：{{Number(customerAccount.totalMoney).toFixed(2)}} 元</div>
    <div style='margin-top: 20px; font-size: 16px'>可用余额抵扣：{{Number(customerAccount.keYongYueDikou).toFixed(2)}} 元</div>
    <div class="line"></div>
    <div style='margin-top: 20px; font-size: 16px; color: red'>实际应收：{{Number(customerAccount.totalMoney - customerAccount.keYongYueDikou).toFixed(2)}} 元</div>
    <div style='margin-top: 20px; font-size: 16px'>
      <span class='red'>*</span>实际进账： <el-input placeholder="请输入内容" v-model="realMoney" style="width: 200px;">
      </el-input>
    </div>
    <div style='margin-top: 20px; font-size: 16px'>
      <span class='red'>*</span>进账时间：<el-date-picker
        class='c-date-start'
        :editable="false"
        v-model="receivedTime"
        type="datetime"
        placeholder="选择开始时间">
      </el-date-picker>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="qiankuanDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="doPayDebt" :disabled='(!receivedTime || !realMoney) || (realMoney < (customerAccount.totalMoney - customerAccount.availableBalance))'>确定</el-button>
    </span>
  </el-dialog>
  <lightbox></lightbox>
</div>
</template>

<style lang="scss">
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
  formatTimeString,
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
      customerAccount: {},
      buyerPayedMoney: '', // 采购商付款金额
      buyerCertificateList: [], // 采购商付款金额
      content: '', // 跟单员结算备注
      id: '',
      realMoney: '',
      receivedTime: '',
      // tableWdith: '100%',
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
      }
    }
  },
  created() {
    // this.defaultTabKey = this.$route.query.type
    this.currentTab = getCache({
      key: 'checkAccountTabType',
    }) || 1
  },
  mounted () {
    const that = this
    this.height = String(document.documentElement.clientHeight - 500);
    this.$nextTick(function () {
      const tabs = document.getElementsByClassName('el-tabs__item')
      tabs[that.currentTab - 1].click()
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
  methods: {
    PayGroupConfirmIncome (row) { // 实款-确认对账
      const that = this
      this.time = new Date().getTime();
      this.id = row.id
      that.getCustomerInfo(row)
    },
    doPayGroup() { // 确定对账按钮
      const that = this
      request({
        url: Account.Reconciliation.confirmIncome,
        data: {
          param: JSON.stringify({
            id: that.id,
            _time: that.time
          })
        },
        method: 'post'
      }).then(res => {
        that.fullscreenLoading = false
        that.shikuanDialogVisible = false
        if (res.success == '1') {
          that.$message({
            type: 'success',
            message: '操作成功!'
          })
          if (that.customerAccount.totalMoney < that.customerAccount.available && that.customerAccount.availableBalance < that.customerAccount.totalMoney) {
            // 产生欠款  直接切换到 欠款tab
            setCache({
              key: 'checkAccountTabType',
              value: 2
            })
            location.reload()
          } else {
            that.$router.push('/finance/reconciliation')
          }
        } else {
          res.msg && this.$message({
            type: 'info',
            message: res.msg
          })
        }
      })
    },
    PayGroupSendbackIncome (id) { // 实款-对账异常
      const that = this
      const _time = new Date().getTime()
      this.$prompt('请描述异常问题（120个字以内）', '异常', {
        inputPattern: /^\S{0,120}$/,
        inputErrorMessage: '格式不正确'
      }).then(data => {
        that.fullscreenLoading = true
        request({
          url: Account.Reconciliation.sendbackIncome,
          data: {
            param: JSON.stringify({
              id: id,
              remark: data.value || '',
              _time: _time
            })
          },
          method: 'post'
        }).then(res => {
          that.fullscreenLoading = false
          if (res.success == '1') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            setCache({
              key: 'checkAccountTabType',
              value: 1
            })
            location.reload()
            // location.href = '/finance/checkAccount?type=1'
          } else {
            res.msg && this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    toAdjust() { // 去调整额度
      this.checkYuerDialogVisible = false
      window.open(`/finance/moneyManage/moneyManageDetail?id=${this.customerAccount.id}`)
    },
    toPrint(orderNumber) { // 去打印
      window.open(`/common/printDetail/${orderNumber}`)
    },
    getCustomerInfo(row) {
      const that = this
      that.fullscreenLoading = true
      request({ // 获取当前采购商的账户信息
        url: Account.Account.getById,
        method: 'post',
        data: {
          param: JSON.stringify({id: row.buyerId || row.userId})
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          that.customerAccount = data.obj
          that.customerAccount.totalMoney = row.totalMoney
          that.customerAccount.keYongYueDikou = row.totalMoney < that.customerAccount.availableBalance ? row.totalMoney : that.customerAccount.availableBalance
          if (data.obj.available < row.totalMoney && that.currentTab == 1) {
            that.checkYuerDialogVisible = true
            that.buyerPayedMoney = row.buyerPayedMoney
            that.buyerCertificateList = row.buyerCertificateList
            that.content = row.content
          } else {
            that.currentTab == 1 ? that.shikuanDialogVisible = true : that.qiankuanDialogVisible = true
          }
        } else {
          this.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    PayDebtConfirmIncome (row) { // 欠款-确认对账
      const that = this
      this.time = new Date().getTime();
      this.id = row.id
      that.getCustomerInfo(row)
    },
    doPayDebt() {
      const that = this
      that.fullscreenLoading = true
      const param = JSON.stringify({
        id: this.id,
        available: that.customerAccount.keYongYueDikou,
        realTotalMoney: that.customerAccount.totalMoney - that.customerAccount.keYongYueDikou,
        realMoney: that.realMoney,
        receivedTime: new Date(that.receivedTime).getTime(),
        _time: that.time
      })
      request({
        url: Account.PayDebt.confirmIncome,
        data: {
          param,
        },
        method: 'post'
      }).then(res => {
        that.fullscreenLoading = false
        that.qiankuanDialogVisible = false
        if (res.success == '1') {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          setCache({
            key: 'reconciliationTabkey',
            value: 2
          })
          that.$router.push('/finance/reconciliation')
        } else {
          res.msg && this.$message({
            type: 'info',
            message: res.msg
          })
        }
      })
    },
    PayDebtSendbackIncome (id) { // 欠款-对账异常
      const that = this
      this.time = new Date().getTime();
      this.$prompt('请描述异常问题（120个字以内）', '异常', {
        inputPattern: /^\S{0,120}$/,
        inputErrorMessage: '格式不正确'
      }).then(data => {
        that.fullscreenLoading = true
        request({
          url: Account.PayDebt.sendbackIncome,
          data: {
            param: JSON.stringify({
              id: id,
              exceptionMsg: data.value || '',
              _time: this.time
            })
          },
          method: 'post'
        }).then(res => {
          that.fullscreenLoading = false
          if (res.success == '1') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            setCache({
              key: 'checkAccountTabType',
              value: 2
            })
            location.reload()
          } else {
            res.msg && this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
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
    jumpToPayDetail(id, type) {
      setCache({
        key: 'checkAccountTabType',
        value: 1
      });
      this.$router.push(`/finance/checkAccount/detail?id=${id}`)
    },
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
      setCache({
        key: 'checkAccountTabType',
        value: 1
      })
    },
    getFilter(params) {
      this.filters = params
      console.log('params', params)
      this.filters.pageNumber = 1
    },
    listPayGroup () {
      const that = this
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
        url: Account.Reconciliation.list,
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
