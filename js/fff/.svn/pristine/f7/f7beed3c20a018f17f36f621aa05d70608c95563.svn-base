<template>
  <section v-loading.body="bodyLoading">
    <i class="el-icon-arrow-left goback-icon" @click="handleReturn">返回</i>
    <div class="company-msg">
      <span class="big-font">{{obj.customerCompany}}</span>
      <span>ID：{{obj.customerNumber}}</span>
      <div class="btn-group">
        <el-button v-if="checkStatus == 0" type="warning" @click.native="showCheckDialog">对账</el-button>
        <el-button v-if="checkStatus == 0" type="primary" @click.native="showThrowDialog">打回销售</el-button>
        <el-button type="primary" @click.native="exportHandle">导出</el-button>
        <router-link :to="{name: 'checkMingxiPrint',query: {id: this.id,checkStatus:checkStatus}}">
          <el-button type="primary">打印</el-button>
        </router-link>
      </div>
      <p class="border-bottom-solid"></p>
      <p class="forgive-color status-content" style="background-color:#f5fff9">
        <i class="el-icon-warning" style="margin-right:5px;"></i>
        {{obj.status == 0 ? '待对账' : '已对账'}}</p>
      <span class="bold-font">{{'对账单号：' + obj.number}}</span>
      <span class="left-margin25">提交日期：{{obj.createTime | formatTime}}</span>
      <span class="left-margin25">销售员：{{obj.salerName}}</span>
      <span class="left-margin25">采购员：{{obj.guiderName}}</span>
      <p>{{'销售备注：' + obj.remark}}</p>
      <p>客户转账金额：
        <span class="red-color">{{obj.payMoney | formateNumber}}</span>元</p>
      <span>客户转账凭据：
        <article class="media imgShow" v-if='obj.payCredentialUrls && obj.payCredentialUrls.length'>
          <a :href="'http://test.soouya.com'+ val" class="image media-left" v-lightbox="obj.payCredentialUrls" v-for="(val,index) in obj.payCredentialUrls" :key="index">
            <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
          </a>
        </article>
      </span>
      <p class="border-bottom-solid" style="margin-top: 15px;"></p>
      <p class="total-msg">
        <span v-if="!checkStatus" class="bold-font left-margin25" style="margin-right: 25px;">应收金额：
          <span class="red-color">{{(Number(obj.totalMoney) + Number(obj.lateFeesMoney)).toFixed(2)}}元</span>
        </span>
        <span v-if="checkStatus" class="bold-font left-margin25" style="margin-right: 25px;">实收金额：
          <span class="red-color">{{(Number(obj.totalMoney) + Number(obj.lateFeesMoney)).toFixed(2)}}元</span>
        </span>
        <span v-if="!checkStatus" class="left-margin25 c666">滞纳金：{{Number(obj.lateFeesMoney).toFixed(2)}}元</span>
        <span v-if="checkStatus" class="left-margin25 c666">实收滞纳金：{{Number(obj.lateFeesMoney).toFixed(2)}}元</span>
        <span class="left-margin25 c666">扣数款：{{Number(obj.kouShuMoney).toFixed(2)}}元</span>
        <span class="left-margin25 c666">支用额度：{{Number(Number(obj.totalMoney) - Number(obj.kouShuMoney)).toFixed(2)}}元</span>
      </p>
    </div>
    <div class="table-content" :style="'height:' + height + 'px' ">
      <table class="table-ele" border="1">
        <colgroup>
          <!-- 交易时间 -->
          <col width="180">
          <!-- 类型 -->
          <col width="80">
          <!-- 订单 -->
          <col width="240">
          <!-- 供应商 -->
          <col width="140">
          <!-- 出仓单号 -->
          <col width="180">
          <!-- 货号 -->
          <col width="120">
          <!-- 色号 -->
          <col width="120">
          <!-- 单价 -->
          <col width="120">
          <!-- 数量单位 -->
          <col width="120">
          <!-- 支用额度 -->
          <col width="120">
          <!-- 滞纳金 -->
          <col width="120">
          <!-- 订单欠款 -->
          <col width="120">
        </colgroup>
        <thead>
          <tr>
            <th>交易时间</th>
            <th>类型</th>
            <th>订单号</th>
            <th>供应商</th>
            <th>出仓单号</th>
            <th>货号</th>
            <th>色号</th>
            <th>单价(元)</th>
            <th>数量&单位</th>
            <th>支用额度/扣数款</th>
            <th>滞纳金</th>
            <th>订单欠款</th>
          </tr>
        </thead>
        <tbody>
          <!-- <template v-for="(outItem, outIndex) in obj.outRepos">
            <td :rowspan="outItem.bulk.colors.length + 1">{{outItem.reconciliationTime | formatTime}}</td>
            <td :rowspan="outItem.bulk.colors.length + 1">
              <template v-if="outItem.isOutRepo == 1">
                <span v-if="outItem.bulk.type  == 1">服务单</span>
                <span v-if="outItem.bulk.type  == 2">贸易单</span>
                <span v-if="outItem.bulk.type  == 3">采购单</span>
              </template>
              <template v-else>扣数单</template>
            </td>
            <td :rowspan="outItem.bulk.colors.length + 1">{{outItem.bulk.number}}</td>
            <td :rowspan="outItem.bulk.colors.length + 1">{{outItem.bulk.showShopCompany}}</td>
            <td :rowspan="outItem.bulk.colors.length + 1">{{outItem.number}}</td>
            <td :rowspan="outItem.bulk.colors.length + 1">{{outItem.bulk.productNumber}}</td>
            <tr v-for="(colorItem,colorIndex) in outItem.bulk.colors">
              <td>{{colorItem.color}}</td>
              <td>{{colorItem.salePrice | formateNumber}}{{colorItem.salePriceUnit}}</td>
              <td>{{colorItem.quantity | formateNumber}}{{colorItem.quantityUnit}}</td>
              <td :rowspan="outItem.bulk.colors.length + 1" v-if="colorIndex == 0">{{Number(outItem.totalMoney).toFixed(2)}}</td>
              <td :rowspan="outItem.bulk.colors.length + 1" v-if="colorIndex == 0">{{Number(outItem.lateFeesMoney).toFixed(2)}}</td>
              <td :rowspan="outItem.bulk.colors.length + 1" v-if="colorIndex == 0">{{(Number(outItem.totalMoney) + Number(outItem.lateFeesMoney)).toFixed(2)}}</td>
            </tr>
          </template>
          <template v-for="(cutItem, cutIndex) in obj.cuts">
            <template v-for="(proItem, proIndex) in cutItem.productNumbers">
              <td v-if="proIndex == 0" :rowspan="cutItem.rowLen" :key="cutItem.reconciliationTime">{{cutItem.reconciliationTime | formatTime}}</td>
              <td v-if="proIndex == 0" :rowspan="cutItem.rowLen">剪版</td>
              <td v-if="proIndex == 0" :rowspan="cutItem.rowLen">{{cutItem.number}}</td>
              <td v-if="proIndex == 0" :rowspan="cutItem.rowLen">{{cutItem.shopCompany}}</td>
              <td v-if="proIndex == 0" :rowspan="cutItem.rowLen">--</td>
              <td :rowspan="proItem.colors.length + 1">{{proItem.number}}</td>
              <tr v-for="(colorItem, colorIndex) in proItem.colors" :key="colorIndex">
                <td>{{colorItem.color}}</td>
                <td>{{colorItem.cutterPriceMoney}}{{colorItem.cutterPriceUnit}}</td>
                <td>{{colorItem.cutterQuantity}}{{colorItem.cutterQuantityUnit}}</td>
                <td :rowspan="cutItem.rowLen" v-if="colorIndex == 0 && proIndex == 0">{{Number(cutItem.totalMoney).toFixed(2)}}</td>
                <td :rowspan="cutItem.rowLen" v-if="colorIndex == 0 && proIndex == 0">--</td>
                <td :rowspan="cutItem.rowLen" v-if="colorIndex == 0 && proIndex == 0">{{Number(cutItem.totalMoney).toFixed(2)}}</td>
              </tr>
            </template>
          </template> -->
          <tr v-for="(outItem, outIndex) in obj.outRepos">
            <td class="left-align">{{outItem.reconciliationTime | formatTime}}</td>
            <td>
              <template v-if="outItem.isOutRepo == 1">
                <span v-if="outItem.bulk.type  == 1">服务单</span>
                <span v-if="outItem.bulk.type  == 2">贸易单</span>
                <span v-if="outItem.bulk.type  == 3">采购单</span>
              </template>
              <template v-else>扣数单</template>
            </td>
            <td class="left-align number-cc">
              <router-link v-if="outItem.isOutRepo == 1" :to="{name: 'checkAccountDetail', query: {id: outItem.id}}">
                <span>{{outItem.bulk.number}}</span>
              </router-link>
              <router-link v-if="outItem.isOutRepo == 0" :to="`/finance/deduction/details/undone?id=${outItem.id}&outReposityId=${outItem.orderNumber}`">
                <span>{{outItem.bulk.number}}</span>
              </router-link>
            </td>
            <td class="left-align">{{outItem.bulk.showShopCompany}}</td>
            <td class="left-align">{{outItem.number}}</td>
            <td class="left-align">{{outItem.bulk.productNumber}}</td>
            <td colspan="3" class="inner-table">
              <table>
                <tbody>
                  <tr v-for="(colorItem,colorIndex) in outItem.clothLones">
                    <td class="left-align">{{colorItem.color}}</td>
                    <td class="right-align">{{colorItem.salePrice | formateNumber}}</td>
                    <td class="right-align">{{colorItem.quantity | formateNumber}}{{colorItem.quantityUnit}}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td class="right-align">{{Number(outItem.totalMoney).toFixed(2)}}</td>
            <td class="right-align" v-if="outItem.isOutRepo == 1">{{Number(outItem.lateFeesMoney).toFixed(2)}}</td>
            <td class="right-align" v-if="outItem.isOutRepo != 1">--</td>
            <td class="right-align">{{(Number(outItem.totalMoney) + Number(outItem.lateFeesMoney)).toFixed(2)}}</td>
          </tr>
          <tr v-for="(cutItem, cutIndex) in obj.cuts">
            <td class="left-align">{{cutItem.reconciliationTime | formatTime}}</td>
            <td>剪版</td>
            <td class="left-align number-cc">
              <router-link :to="{name: 'checkAccountDetail', query: {id: cutItem.id}}">
                <span>{{cutItem.number}}</span>
              </router-link>
            </td>
            <td class="left-align">{{cutItem.shopCompany}}</td>
            <td class="left-align">--</td>
            <td colspan="4" class="inner-table">
              <table>
                <tbody>
                  <template v-for="(proItem, proIndex) in cutItem.productNumbers">
                    <tr v-for="(colorItem, colorIndex) in proItem.colors">
                      <td class="left-align" :rowspan="proItem.colors.length" v-if="colorIndex==0" :class="{'bdbn' : proItem.colors.length>1&&proIndex==cutItem.productNumbers.length-1}">
                        <span>{{proItem.number}}</span>
                      </td>
                      <td class="left-align">{{colorItem.color}}
                        <span class="red-color" v-if="!colorItem.status">(无货)</span>
                      </td>
                      <td class="right-align">{{colorItem.salePriceMoney | formateNumber}}</td>
                      <td class="right-align">{{colorItem.cutterQuantity}}{{colorItem.cutterQuantityUnit}}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </td>
            <td class="right-align">{{Number(cutItem.totalMoney).toFixed(2)}}</td>
            <td class="right-align">{{Number(cutItem.lateFeesMoney).toFixed(2)}}</td>
            <td class="right-align">{{Number(cutItem.totalMoney).toFixed(2)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 对账dialog -->
    <el-dialog size="tiny" title="对账" v-model="checkAccountDialogVisible">
      <p class="warn-msg">一旦确认提交，将不可修改。</p>
      <el-form label-width="120px" label-position="right">
        <el-form-item label="到账日期：" required>
          <el-date-picker class="width200" v-model="reqCheckParams.totalIncomeTime" @change="handleTimeChange" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
        </el-form-item>
        <el-form-item label="财务备注：">
          <el-input class="width200" v-model="reqCheckParams.totalFinanceRemark"></el-input>
        </el-form-item>
        <el-form-item label="支用额度：">
          <span class="red-color">{{reqCheckParams.totalNeedPayMoney}}元</span>
        </el-form-item>
        <el-form-item label="扣数金额：">
          <span class="red-color">{{reqCheckParams.totalKoushuMoney}}元</span>
        </el-form-item>
        <el-form-item label="实收滞纳金：">
          <el-input class="width200" @focus="showEditDialog" v-model="reqCheckParams.totalLateFeesMoney"></el-input>元
        </el-form-item>
        <el-form-item label="实收金额：">
          <el-input class="width200" @focus="showEditDialog" v-model="reqCheckParams.totalIncomeMoney"></el-input>
        </el-form-item>
        <el-form-item label="可用余额：">
          <span>{{reqCheckParams.availableBalance | formateNumber}}</span>
          <template v-if="reqCheckParams.availableBalance < reqCheckParams.totalIncomeMoney">
            <span class="red-color">(余额不足)</span>
          </template>
        </el-form-item>
      </el-form>
      <footer>
        <el-button size="small" @click.native="checkAccountDialogVisible = false">取消</el-button>
        <template v-if="reqCheckParams.availableBalance < reqCheckParams.totalIncomeMoney">
          <el-button size="small" type="primary" @click.native="toAdjust">预存</el-button>
        </template>
        <template v-else>
          <el-button size="small" type="primary" :disabled="!reqCheckParams.totalIncomeTime" @click.native="confirmCheckAccount">确定</el-button>
        </template>
      </footer>
    </el-dialog>
    <!-- 修改滞纳金dialog -->
    <el-dialog :title="reqCheckParams.list.length > 1 ? '批量修改滞纳金' : '修改滞纳金'" v-model="editDialogVisible">
      <el-table :data="lateDialogData" border height="450">
        <el-table-column label="订单号" prop="serviceNumber"></el-table-column>
        <el-table-column label="出仓单号" prop="outReposityNumber"></el-table-column>
        <el-table-column label="采购商" prop="customerCompany"></el-table-column>
        <el-table-column label="滞纳金/元">
          <template scope="scope">
            <el-input @change="handleLateChange(scope.row)" :disabled="scope.row.category=='buttonNumber'" min="0" v-model="scope.row.lateFeesMoney"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="实收款/元">
          <template scope="scope">
            <el-input min="0" v-model="scope.row.incomeMoney"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <footer style="margin-top: 25px;">
        <el-button @click.native="editDialogVisible = false">取消</el-button>
        <el-button @click.native="confirmEditMoney" type="primary">确认</el-button>
      </footer>
    </el-dialog>
    <!-- 打回销售dialog -->
    <el-dialog title="打回销售" v-model="throwSaleDialogVisible" size="tiny">
      <p class="warn-msg">确认是否打回销售</p>
      <el-form>
        <el-form-item label="备注：">
          <el-input type="textarea" :autosize="{minRows:6, maxRows:6}" v-model="billCancelRemark" resize="none"></el-input>
          <p v-if="billCancelRemark" class="remark-font">{{billCancelRemark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <footer style="margin-top:25px">
        <el-button size="small" @click.native="throwSaleDialogVisible = false">取消</el-button>
        <el-button size="small" @click.native="confirmThrowSale" type="primary">确认</el-button>
      </footer>
    </el-dialog>
    <Lightbox></Lightbox>
  </section>
</template>

<script>
// import pagination from 'components/pagination'
import Lightbox from 'components/lightbox/lightbox'
import {
  newRequest,
} from 'common/utils'
export default {
  components: {
    // pagination,
    Lightbox
  },
  data() {
    return {
      throwSaleDialogVisible: false,
      checkAccountDialogVisible: false,
      editDialogVisible: false,
      bodyLoading: false,
      billCancelRemark: '',
      checkStatus: 0,
      id: '',
      height: 600,
      obj: {},
      page: {
        pageSize: 20,
        pageNumber: 1,
        totalCount: 20,
      },
      reqCheckParams: {
        list: [],
        totalLateFeesMoney: '',
        totalNeedPayMoney: '',
        totalIncomeMoney: '',
        totalKoushuMoney: '',
        totalFinanceRemark: '',
        totalIncomeTime: '',
        availableBalance: '',
        type: 1,
      },
      lateDialogData: [],
      pickerOptions0: {
        disabledDate(time) {
          return Date.now() < Date.parse(new Date(time))
        }
      },
    }
  },
  mounted() {
    this.height = document.body.clientHeight - 395
    this.id = this.$route.query.id
    this.checkStatus = this.$route.query.checkStatus
    if (this.id) {
      this.getData()
    } else {
      this.$message.error('账单id不能为空')
    }
  },
  methods: {
    getData() {
      this.bodyLoading = true
      newRequest({
        method: 'get',
        url: `/redwood/bill/${this.id}`,
        data: {},
      }).then(res => {
        this.bodyLoading = false
        if (res.success == 1) {
          this.obj = res.obj
          if (this.obj.cuts) {
            this.obj.cuts.map(cut => {
              this.$set(cut, 'rowLen', 0)
              if (cut.productNumbers) {
                cut.productNumbers.map(item => {
                  cut.rowLen += item.colors.length + 1
                })
              }
            })
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    confirmCheckAccount() {
      this.reqCheckParams.list.forEach(item => {
        item.financeRemark = this.reqCheckParams.totalFinanceRemark
        item.incomeTime = new Date(this.reqCheckParams.totalIncomeTime).getTime()
      })
      newRequest({
        data: this.reqCheckParams,
        url: '/redwood/reconciliation/batchConfirmIncome',
        method: 'post',
        contentType: 'application/json'
      }).then(res => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.handleReturn()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    confirmEditMoney() {
      this.reqCheckParams.list = JSON.parse(JSON.stringify(this.lateDialogData))
      // console.log(this.reqCheckParams)
      this.calc(true)
      this.editDialogVisible = false
    },
    showCheckDialog() {
      this.bodyLoading = true
      this.reqCheckParams.list = []
      this.reqCheckParams.totalFinanceRemark = ''
      this.reqCheckParams.totalIncomeTime = ''
      if (this.obj.cuts && this.obj.cuts.length) {
        this.obj.cuts.map(item => {
          let obj = {
            billId: item.billId,
            businessId: item.id,
            incomeTime: '',
            financeRemark: '',
            lateFeesMoney: 0,
            totalMoney: item.totalMoney,
            customerCompany: item.customerCompany,
            incomeMoney: 0,
            category: 'cut',
            creditType: item.creditType,
            serviceNumber: item.number,
            outReposityNumber: '--',
            expectedRepaymentTime: item.expectedRepaymentTime
          }
          this.reqCheckParams.list.push(obj)
        })
      }
      this.obj.outRepos.map(item => {
        let obj = {
          billId: item.billId,
          businessId: item.id,
          incomeTime: '',
          financeRemark: '',
          lateFeesMoney: item.isOutRepo == 1 ? item.lateFeesMoney : 0,
          totalMoney: item.totalMoney,
          incomeMoney: 0,
          category: item.isOutRepo == 1 ? 'bulk' : 'buttonNumber',
          creditType: item.creditType,
          customerCompany: item.bulk.customerCompany,
          outReposityNumber: item.number,
          serviceNumber: item.bulk.number,
          expectedRepaymentTime: item.expectedRepaymentTime
        }
        this.reqCheckParams.list.push(obj)
      })
      this.calc()
      newRequest({
        url: '/redwood/account/CustomerAccount/getById',
        data: {
          id: this.obj.customerId
        },
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.reqCheckParams.availableBalance = res.obj.availableBalance
          this.bodyLoading = false
          this.checkAccountDialogVisible = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    showEditDialog() {
      this.calc(true)
      this.lateDialogData = JSON.parse(JSON.stringify(this.reqCheckParams.list))
      this.editDialogVisible = true
    },
    calc(isEdit = false) {
      this.reqCheckParams.totalLateFeesMoney = 0
      this.reqCheckParams.totalNeedPayMoney = 0
      this.reqCheckParams.totalKoushuMoney = 0
      this.reqCheckParams.totalIncomeMoney = 0
      this.reqCheckParams.list.forEach(item => {
        if (!isEdit) {
          console.log('ss')
          item.incomeMoney = Number(item.totalMoney) + Number(item.lateFeesMoney)
        }
        this.reqCheckParams.totalLateFeesMoney += Number(item.lateFeesMoney)
        this.reqCheckParams.totalNeedPayMoney += (item.category == 'bulk' || item.category == 'cut') ? Number(item.totalMoney) : 0
        this.reqCheckParams.totalKoushuMoney += item.category == 'buttonNumber' ? Number(item.totalMoney) : 0
        this.reqCheckParams.totalIncomeMoney += Number(item.incomeMoney)
        item.lateFeesMoney = Number(item.lateFeesMoney).toFixed(2)
        item.incomeMoney = Number(item.incomeMoney).toFixed(2)
        item.totalMoney = Number(item.totalMoney).toFixed(2)
      })
      this.reqCheckParams.totalIncomeMoney = Number(this.reqCheckParams.totalIncomeMoney).toFixed(2)
      this.reqCheckParams.totalLateFeesMoney = Number(this.reqCheckParams.totalLateFeesMoney).toFixed(2)
      this.reqCheckParams.totalKoushuMoney = Number(this.reqCheckParams.totalKoushuMoney).toFixed(2)
    },
    handleLateChange(item) {
      item.incomeMoney = Number(item.totalMoney) + (item.lateFeesMoney ? Number(item.lateFeesMoney) : 0)
      item.incomeMoney = Number(item.incomeMoney).toFixed(2)
    },
    handleTimeChange(val) {
      const cTime = new Date(val).getTime()
      const cY = new Date(cTime).getFullYear()
      const cM = new Date(cTime).getMonth() + 1
      const cD = new Date(cTime).getDate()
      const ct = new Date(cY + '/' + cM + '/' + cD + ' ' + 0 + ':' + 0 + ':' + 0).getTime()
      this.reqCheckParams.list.forEach(item => {
        if (item.category == 'cut') {
          item.lateFeesMoney = 0
        } else if (item.category == 'buttonNumber') {
          item.lateFeesMoney = 0
        } else if (item.category == 'bulk') {
          // test
          // item.expectedRepaymentTime = 1512057600000
          const eTime = new Date(item.expectedRepaymentTime).getTime()
          const eY = new Date(eTime).getFullYear()
          const eM = new Date(eTime).getMonth() + 1
          const eD = new Date(eTime).getDate()
          const et = new Date(eY + '/' + eM + '/' + eD + ' ' + 0 + ':' + 0 + ':' + 0).getTime()
          let subT = parseInt((ct - et) / 3600 / 1000 / 24)
          if (subT <= 0 || !val) {
            subT = 0
          }
          if ((item.creditType == 1 || item.creditType == 2) && subT > 0) {
            item.lateFeesMoney = Number(item.totalMoney) * 0.18 * 1.5 * (subT) / 360
          } else if (item.creditType == 4) {
            // 雁阵额度付款方式
            item.lateFeesMoney = Number(item.totalMoney) * 0.066 / 100 * subT
          } else {
            item.lateFeesMoney = 0
          }
        }
      })
      this.calc()
      console.log(this.reqCheckParams)
    },
    showThrowDialog() {
      this.billCancelRemark = ''
      this.throwSaleDialogVisible = true
    },
    confirmThrowSale() {
      this.bodyLoading = true
      newRequest({
        url: `/redwood/bill/${this.id}?billCancelRemark=${this.billCancelRemark}`,
        method: 'delete',
        data: {},
        contentType: 'application/json'
      }).then(res => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.bodyLoading = false
          this.handleReturn()
        } else {
          this.bodyLoading = false
          this.$message.error(res.msg)
        }
      })
    },
    exportHandle() {
      this.bodyLoading = true
      newRequest({
        url: '/redwood/bill',
        method: 'get',
        data: {
          id: this.id,
          export: 1,
          status: this.checkStatus,
        }
      }).then((response) => {
        this.bodyLoading = false
        if (response.success == '1') {
          window.open(response.obj)
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    toAdjust() { // 去调整额度
      this.checkAccountDialogVisible = false
      window.open(`/finance/moneyManage/moneyManageDetail?id=${this.obj.customerId}`)
    },
    handleReturn() {
      window.history.go(-1)
      if (sessionStorage.getItem('checkAccount')) { // 待对账的搜索条件
        let obj = JSON.parse(sessionStorage.getItem('checkAccount'))
        obj.flag = true // 设置flag值只有点击返回按钮返回才会有搜索的回显
        sessionStorage.setItem('checkAccount', JSON.stringify(obj))
      }
      if (sessionStorage.getItem('reconciliation')) { // 已对账的搜索条件
        let obj = JSON.parse(sessionStorage.getItem('reconciliation'))
        console.log(obj)
        obj.flag = true // 设置flag值只有点击返回按钮返回才会有搜索的回显
        sessionStorage.setItem('reconciliation', JSON.stringify(obj))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bdbn {
  border-bottom: none !important;
}

table {
  table-layout: fixed;
  border-spacing: 0;
  border-collapse: collapse;
  tr {
    td {
      word-break: break-word;
    }
  }
}

.inner-table {
  padding: 0px !important;
  table {
    width: 100%;
    min-height: 60px;
    tbody {
      tr {
        td {
          padding: 8px 5px;
          border-right: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          text-align: center;
          &:last-child {
            border-right: none;
          }
        }
        &:last-child {
          td {
            border-bottom: none;
          }
        }
      }
    }
  }
}
.company-msg {
  padding: 10px 15px 5px 15px;
  background-color: #fff;
  margin-top: 10px;
  .btn-group {
    float: right;
    clear: both;
    .el-button {
      margin-left: 25px;
      span {
        line-height: 10px;
        height: 10px;
      }
    }
  }
  span {
    line-height: 35px;
    height: 35px;
    display: inline-block;
  }
  p {
    line-height: 35px;
  }
  .total-msg {
    height: 35px;
    span {
      float: right;
    }
    .c666 {
      color: #666;
    }
  }
}
.big-font {
  font-size: 18px;
  font-weight: 600;
}
.border-bottom-solid {
  border-bottom: 1px #ddd solid;
}
.bold-font {
  font-weight: 600;
}
.left-margin25 {
  margin-left: 25px;
}
.imgShow {
  display: inline-block;
  a {
    margin-right: 5px;
  }
}
.table-content {
  overflow-y: auto;
  margin-top: 10px;
  background-color: #fff;
  .table-ele {
    border-collapse: collapse;
    border: none;
    th {
      padding: 8px 5px;
      text-align: center;
      background-color: #f9f9f9;
      border-color: #ddd;
    }
    td {
      word-break: break-all;
      border-color: #ddd;
      padding: 8px 5px;
      text-align: center;
    }
  }
}
.width200 {
  width: 200px;
}
.status-content {
  border: 1px solid #39ab65;
  margin-top: 8px;
  border-radius: 5px;
  padding-left: 15px;
}
.number-cc {
  span {
    color: #39ab65;
  }
  a {
    text-decoration: none;
  }
}
</style>
