<template>
  <section v-loading.fullscreen.lock="pageLoading" element-loading-text="拼命加载中...">
    <HeadFilters v-on:getParams="getFilter" :params="requestParams">
      <template slot="headFilterSlot" scope="scope">
        <el-col :span="4" style="min-width: 320px">
          <p>&nbsp</p>
          <el-button type="primary" :disabled="(batchPayYanzhenList.length + batchPayBaitiaoList.length) < 2" @click.native="showRepaymentDialog">批量还款</el-button>
          <el-button type="primary" :disabled="(batchPayYanzhenList.length + batchPayBaitiaoList.length) < 2" @click.native="showAdvaceDialog">批量提前还款</el-button>
          <el-button type="primary" @click="exportHandle(scope.scope)">导出</el-button>
        </el-col>
      </template>
    </HeadFilters>
    <Tabs></Tabs>
    <div class="repayment-total">
      <span>还款总金额：
        <strong>{{totalNeedRepaymentMoney | formatMoney}}元</strong>
      </span>
      <span>支用额度：
        <strong>{{totalUsedMoney | formatMoney}}元</strong>
      </span>
      <span>保理费&利息：
        <strong>{{totalFactoringMoney | formatMoney}}元</strong>
      </span>
      <span>滞纳金：
        <strong>{{totalLateFeesMoney |formatMoney}}元</strong>
      </span>
    </div>
    <div class="">
      <el-table class="fixed-table" :data="tableData" :height="tableHeight" @selection-change="handleSelectionChange" ref="multipleTable" border>
        <el-table-column type="selection" min-width="50" fixed="left" :selectable="selectable">
        </el-table-column>
        <el-table-column prop="createTime" label="进入待还款时间" min-width="180" algin="center" :formatter="formatTime">
        </el-table-column>
        <el-table-column prop="loanTime" label="放款日期" min-width="150" algin="center" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="expectedSoouyaRepaymentTime" label="到期还款日" min-width="150" algin="center" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="serviceNumber" label="订单号" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="outReposityNumber" label="出仓单号" min-width="150" align="center">
        </el-table-column>
        <!-- 待定 -->
        <el-table-column prop="usedMoney" label="支用额度" min-width="120" align="center" :formatter="formatMoney">
        </el-table-column>
        <el-table-column prop="factoringMoney" label="预计保理费&利息/元" min-width="160" align="center" :formatter="formatMoney">
        </el-table-column>
        <el-table-column prop="lateFeesMoney" label="应还滞纳金/元" min-width="120" align="center" :formatter="formatMoney">
        </el-table-column>
        <el-table-column prop="needRepaymentMoney" label="应还款/元" min-width="100" align="center" :formatter="formatMoney">
        </el-table-column>
        <el-table-column label="还款对象" min-width="100">
          <template scope="scope">
            <span v-if="scope.row.creditType == 2">徙木金融</span>
            <span v-if="scope.row.creditType == 4">雁阵金融</span>
          </template>
        </el-table-column>
        <el-table-column prop="buyerCompany" label="采购商" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="buyerNumber" label="采购商ID" align="center" min-width="120">
        </el-table-column>
        <el-table-column label="销售员" align="center" min-width="120">
          <template scope="scope">
            {{scope.row.followerName}}/{{scope.row.followerTel}}
          </template>
        </el-table-column>
        <el-table-column label="徙木/雁阵放款" align="center" min-width="140">
          <template scope="scope">
            <template v-if="scope.row.loanStatus">是</template>
            <template v-else>否</template>
          </template>
        </el-table-column>
        <el-table-column label="收回客户欠款" align="center" min-width="120">
          <template scope="scope">
            <template v-if="scope.row.payStatus">是</template>
            <template v-else>否</template>
          </template>
        </el-table-column>
        <el-table-column label="还款状态" align="center" min-width="100">
          <template scope="scope">
            <template v-if="scope.row.repaymentStatus == 2">
              <span class="forgive-color">
                已还款</span>
            </template>
            <template v-if="scope.row.repaymentStatus == 1">
              <span class="forgive-color">已提交</span>
            </template>
            <template v-if="scope.row.repaymentStatus == 0">
              <span class="forgive-color">待还款</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180" fixed="right" align="left">
          <template scope="scope">
            <el-button type="primary" size="mini" @click.native="showRepaymentDialog(scope.row)" :disabled="!scope.row.loanStatus">确认还款</el-button>
            <el-button v-if="scope.row.creditType == 2" type="primary" size="mini" @click.native="showAdvaceDialog(scope.row)" :disabled="!scope.row.isAdvance">提前还款</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-content">
        <Pagination :pageSize="pagination.pageSize" :page="pagination.pageNumber" :total="pagination.totalCount" :options="requestParams" :render="getData"></Pagination>
      </div>
    </div>
    <!-- 确认还款 -->
    <el-dialog size="tiny" :title="reqPayParams.reqList.length === 1 ? '确认还款' : '批量还款'" v-model="repayDialogVisible">
      <p class="tip-msg">一旦确认提交，将不可修改</p>
      <el-form label-width="120" label-position="right">
        <el-form-item label="还款日期：" required>
          <el-date-picker v-model="reqPayParams.financeRepaymentTime" @change="handleTimeChange" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
        </el-form-item>
        <el-form-item label="支用额度：">
          <span class="red-color">{{reqPayParams.totalUsedMoney | formateNumber}}元</span>
        </el-form-item>
        <el-form-item label="保理费/利息：">
          <el-input style="width:250px" @focus="showEditMoneyDialog" v-model="reqPayParams.factoringMoney"></el-input>&nbsp;元
        </el-form-item>
        <el-form-item label="滞纳金：">
          <el-input style="width:250px" @focus="showEditMoneyDialog" v-model="reqPayParams.lateFeesMoney"></el-input>&nbsp;元
        </el-form-item>
        <el-form-item label="应还款：">
          <span class="red-color">{{reqPayParams.totalNeedPayMoney | formateNumber}}元</span>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" :autosize="{minRows:6,maxRows:6}" resize="none" v-model="reqPayParams.financeRepaymentRemark"></el-input>
          <p v-if="reqPayParams.financeRepaymentRemark" class="remark-font">{{reqPayParams.financeRepaymentRemark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <footer>
        <el-button @click.native="repayDialogVisible = false" size="small">取消</el-button>
        <el-button :disabled="checkOut()" @click.native="confirmRepayment" type="primary" size="small">确认</el-button>
      </footer>
    </el-dialog>
    <el-dialog :title="reqPayParams.reqList.length > 1 ? '批量修改滞纳金/保理费' : '修改滞纳金/保理费'" v-model="editDialogVisible">
      <el-table :data="dialogTableData" border height="500" style="width:100%">
        <el-table-column label="出仓单号" prop="outReposityNumber"></el-table-column>
        <el-table-column label="订单号" prop="serviceNumber"></el-table-column>
        <el-table-column label="采购商" prop="buyerCompany"></el-table-column>
        <el-table-column label="保理费&利息">
          <template scope="scope">
            <el-input :disabled="scope.row.creditType == 4" v-model="scope.row.factoringMoney"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="滞纳金">
          <template scope="scope">
            <el-input min :disabled="scope.row.creditType == 4" v-model="scope.row.lateFeesMoney"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <footer>
        <el-button size="small" @click.native="editDialogVisible = false">取消</el-button>
        <el-button size="small" @click.native="confirmEditMoney" type="primary">确定</el-button>
      </footer>
    </el-dialog>
    <!-- 提前还款 -->
    <el-dialog size="tiny" :title="reqAdvanceParams.reqList.length === 1 ? '提前还款' : '批量提前还款'" v-model="advanceDialogVisible">
      <p class="tip-msg">一旦确认提交，将不可修改</p>
      <el-form label-width="120" label-position="right">
        <el-form-item label="还款日期：" required>
          <el-date-picker v-model="reqAdvanceParams.financeRepaymentTime" @change="handleAdvanceTimeChange" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
        </el-form-item>
        <el-form-item label="支用额度：">
          <span class="red-color">{{reqAdvanceParams.totalUsedMoney}}元</span>
        </el-form-item>
        <el-form-item label="保理费/利息：">
          <el-input style="width:250px" @focus="showAdvanceEditMoneyDialog" v-model="reqAdvanceParams.totalFactoringMoney"></el-input>&nbsp;元
        </el-form-item>
        <el-form-item label="滞纳金：">
          <el-input style="width:250px" @focus="showAdvanceEditMoneyDialog" v-model="reqAdvanceParams.totalLateFeesMoney"></el-input>&nbsp;元
        </el-form-item>
        <el-form-item label="应还款：">
          <span class="red-color">{{reqAdvanceParams.totalNeedPayMoney}}元</span>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" :autosize="{minRows:6,maxRows:6}" resize="none" v-model="reqAdvanceParams.financeRepaymentRemark"></el-input>
          <p v-if="reqAdvanceParams.financeRepaymentRemark" class="remark-font">{{reqAdvanceParams.financeRepaymentRemark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <footer>
        <el-button @click.native="advanceDialogVisible = false" size="small">取消</el-button>
        <el-button :disabled="checkOut1()" @click.native="confirmAdvance" type="primary" size="small">确认</el-button>
      </footer>
    </el-dialog>
    <el-dialog :title="reqAdvanceParams.reqList.length > 1 ? '批量修改滞纳金/保理费' : '修改滞纳金/保理费'" v-model="advanceEditDialogVisible">
      <el-table :data="advanceEditData" border height="500" style="width:100%">
        <el-table-column label="出仓单号" prop="outReposityNumber"></el-table-column>
        <el-table-column label="订单号" prop="serviceNumber"></el-table-column>
        <el-table-column label="采购商" prop="buyerCompany"></el-table-column>
        <el-table-column label="保理费&利息">
          <template scope="scope">
            <el-input v-model="scope.row.factoringMoney"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="滞纳金">
          <template scope="scope">
            <el-input min v-model="scope.row.lateFeesMoney"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="徙木计算的保理费">
          <template scope="scope">
            <span :class="Math.abs(Number(scope.row.reInte)-Number(scope.row.factoringMoney)) > 0.02 ? 'red-color': ''">{{scope.row.reInte}}</span>
          </template>
        </el-table-column>
      </el-table>
      <footer style="margin-top: 20px;">
        <el-button size="small" @click.native="advanceEditDialogVisible = false">取消</el-button>
        <el-button size="small" @click.native="confirmAdvanceEditMoney" type="primary">确定</el-button>
      </footer>
    </el-dialog>
    <el-dialog title="提示" v-model="msgDialogVisible" size="tiny">
      <div class="warn-msg" style="white-space: pre;">{{warnMsg}}</div>
      <footer style="margin-top: 20px">
        <el-button type="primary" size="small" @click.native="msgDialogVisible = false">确定</el-button>
      </footer>
    </el-dialog>
  </section>
</template>
<script>
import HeadFilters from 'components/headFilter/HeadFilter'
import Tabs from 'components/repaymentTabs.vue'
import Pagination from 'components/pagination'
import { newRequest } from 'common/utils'
export default {
  components: {
    HeadFilters,
    Tabs,
    Pagination
  },
  data() {
    return {
      requestParams: {
        pageSize: 20,
        pageNumber: 1
      },
      totalUsedMoney: 0,
      totalFactoringMoney: 0,
      totalLateFeesMoney: 0,
      totalNeedRepaymentMoney: 0,
      tableHeight: 500,
      pageLoading: false,
      tableData: [],
      selectData: [],
      pagination: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 20
      },
      batchPayYanzhenList: [],
      batchPayBaitiaoList: [],
      dialogTableData: [],
      repayDialogVisible: false,
      editDialogVisible: false,
      advanceDialogVisible: false,
      advanceEditDialogVisible: false,
      reqPayParams: {
        reqList: [],
        financeRepaymentTime: '',
        financeRepaymentRemark: '',
        factoringMoney: '',
        lateFeesMoney: '',
        totalUsedMoney: '',
        totalNeedPayMoney: '',
        loanTime: '',
      },
      reqAdvanceParams: {
        reqList: [],
        financeRepaymentTime: '',
        financeRepaymentRemark: '',
        totalFactoringMoney: '',
        totalLateFeesMoney: '',
        totalUsedMoney: '',
        totalNeedPayMoney: '',
        loanTime: '',
      },
      advanceEditData: [],
      warnMsg: '',
      msgDialogVisible: false,
      pickerOptions0: {
        disabledDate(time) {
          return Date.now() < Date.parse(new Date(time))
        }
      },
    }
  },
  mounted() {
    this.tableHeight = String(document.body.clientHeight - 402);
    this.getData()
  },
  methods: {
    // 提前还款
    confirmAdvance() {
      this.reqAdvanceParams.reqList.forEach(item => {
        item.financeRepaymentTime = new Date(this.reqAdvanceParams.financeRepaymentTime).getTime()
        item.financeRepaymentRemark = this.reqAdvanceParams.financeRepaymentRemark
        item.totalRepay = item.tmpTotalRepay;
        delete item.tmpTotalRepay;
      })
      newRequest({
        url: '/redwood/repayment/preRepay',
        data: {
          list: this.reqAdvanceParams.reqList,
        },
        method: 'post',
        contentType: 'application/json'
      }).then(res => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.advanceDialogVisible = false
          this.getData()
        } else {
          this.advanceDialogVisible = false
          this.warnMsg = res.msg;
          this.msgDialogVisible = true
        }
      })
    },
    showAdvaceDialog(item = {}) {
      this.reqAdvanceParams.financeRepaymentTime = ''
      this.reqAdvanceParams.financeRepaymentRemark = ''
      this.reqAdvanceParams.reqList = []
      if (item.id) {
        let obj = {
          id: item.id,
          usedMoney: item.usedMoney ? Number(item.usedMoney) : 0,
          expectedSoouyaRepaymentTime: item.expectedSoouyaRepaymentTime ? item.expectedSoouyaRepaymentTime : 0,
          creditType: item.creditType,
          financeRepaymentRemark: '',
          financeRepaymentTime: '',
          factoringMoney: item.factoringMoney ? Number(item.factoringMoney) : 0,
          lateFeesMoney: item.lateFeesMoney ? Number(item.lateFeesMoney) : 0,
          loanTime: item.loanTime,
          outReposityNumber: item.outReposityNumber,
          serviceNumber: item.serviceNumber,
          buyerCompany: item.buyerCompany,
          totalRepay: 0,
          reInte: 0,
          repaymentStatus: item.repaymentStatus,
        }
        this.reqAdvanceParams.reqList.push(obj)
        this.getXimuMoney()
      } else {
        if (this.batchPayYanzhenList.length > 0) {
          for (let i = 0, len = this.batchPayYanzhenList.length; i < len; i++) {
            let item = this.batchPayYanzhenList[i];
            // console.log(item.outReposityNumber, item.creditType, this.isAdvance(item));
            if (item.creditType == 4) {
              this.$message.error('只能选择徙木金融订单');
              return;
            }
          }
          this.warnMsg = '只能选择徙木金融订单'
          this.msgDialogVisible = true
        } else {
          console.log(this.batchPayBaitiaoList);
          for (let i = 0, len = this.batchPayBaitiaoList.length; i < len; i++) {
            let item = this.batchPayBaitiaoList[i];
            // console.log(item.outReposityNumber, item.isAdvance);
            if (!item.isAdvance) {
              this.$message.error('只能选择允许提前还款的订单');
              return;
            }
          }
          this.batchPayBaitiaoList.map(obj => {
            this.reqAdvanceParams.reqList.push(obj)
          })
          this.getXimuMoney()
        }
      }
    },
    handleAdvanceTimeChange(val) {
      const cTime = new Date(val).getTime()
      const cY = new Date(cTime).getFullYear()
      const cM = new Date(cTime).getMonth() + 1
      const cD = new Date(cTime).getDate()
      const cT = new Date(`${cY}/${cM}/${cD} 0:0:0`).getTime()
      this.reqAdvanceParams.reqList.forEach(item => {
        const wTime = new Date(item.loanTime).getTime()
        const wY = new Date(wTime).getFullYear()
        const wM = new Date(wTime).getMonth() + 1
        const wD = new Date(wTime).getDate()
        const wT = new Date(`${wY}/${wM}/${wD} 0:0:0`).getTime()
        let subT = (cT - wT) / 24 / 3600 / 1000
        if (subT < 0) {
          subT = 0
        }
        if (subT >= 0) {
          item.factoringMoney = Number(item.usedMoney) * subT * 0.18 / 360
        }
      })
      this.calAdvanceMoney()
    },
    confirmAdvanceEditMoney() {
      this.reqAdvanceParams.reqList = JSON.parse(JSON.stringify(this.advanceEditData))
      this.calAdvanceMoney()
      this.advanceEditDialogVisible = false
    },
    showAdvanceEditMoneyDialog() {
      this.advanceEditData = JSON.parse(JSON.stringify(this.reqAdvanceParams.reqList))
      this.advanceEditDialogVisible = true
    },
    getXimuMoney() {
      let str = ''
      this.reqAdvanceParams.reqList.map(item => {
        str += item.id + ','
      })
      newRequest({
        url: '/redwood/repayment/listPreRepay',
        data: {
          ids: str
        },
        method: 'get'
      }).then(res => {
        console.log(res.result, this.reqAdvanceParams.reqList);
        // 暂定
        if (res.success == 1) {
          this.reqAdvanceParams.reqList.forEach(item => {
            res.result.map(obj => {
              this.$set(item, 'tmpTotalRepay', obj.totalRepay);
              if (obj.id == item.id) {
                item.reInte = obj.reInte;
              }
            })
          })
          this.calAdvanceMoney()
          this.advanceDialogVisible = true
        } else {
          // this.$message.error(res.msg)
          this.warnMsg = res.msg
          this.msgDialogVisible = true
        }
      })
    },
    calAdvanceMoney() {
      this.reqAdvanceParams.totalFactoringMoney = 0
      this.reqAdvanceParams.totalLateFeesMoney = 0
      this.reqAdvanceParams.totalUsedMoney = 0
      this.reqAdvanceParams.totalNeedPayMoney = 0
      this.reqAdvanceParams.reqList.map(item => {
        this.reqAdvanceParams.totalLateFeesMoney += Number(item.lateFeesMoney)
        this.reqAdvanceParams.totalFactoringMoney += Number(item.factoringMoney)
        this.reqAdvanceParams.totalUsedMoney += Number(item.usedMoney)
        item.totalRepay = Number(item.lateFeesMoney) + Number(item.factoringMoney) + Number(item.usedMoney)
        this.reqAdvanceParams.totalNeedPayMoney += Number(item.totalRepay)
        item.lateFeesMoney = Number(item.lateFeesMoney).toFixed(2)
        item.factoringMoney = Number(item.factoringMoney).toFixed(2)
        item.usedMoney = Number(item.usedMoney).toFixed(2)
        item.totalRepay = Number(item.totalRepay).toFixed(2)
      })
      this.reqAdvanceParams.totalFactoringMoney = Number(this.reqAdvanceParams.totalFactoringMoney).toFixed(2)
      this.reqAdvanceParams.totalLateFeesMoney = Number(this.reqAdvanceParams.totalLateFeesMoney).toFixed(2)
      this.reqAdvanceParams.totalUsedMoney = Number(this.reqAdvanceParams.totalUsedMoney).toFixed(2)
      this.reqAdvanceParams.totalNeedPayMoney = Number(this.reqAdvanceParams.totalNeedPayMoney).toFixed(2)
    },
    confirmRepayment() {
      this.reqPayParams.reqList.map(item => {
        item.financeRepaymentTime = new Date(this.reqPayParams.financeRepaymentTime).getTime()
        item.financeRepaymentRemark = this.reqPayParams.financeRepaymentRemark
      })
      newRequest({
        method: 'post',
        contentType: 'application/json',
        data: {
          list: this.reqPayParams.reqList,
        },
        url: '/redwood/repayment/batch'
      }).then(res => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.repayDialogVisible = false
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleTimeChange(val) {
      if (val) {
        // 选择时间处理
        const cT = new Date(val).getTime()
        const cY = new Date(cT).getFullYear()
        const cM = new Date(cT).getMonth() + 1
        const cD = new Date(cT).getDate()
        const cTime = new Date(cY + '-' + cM + '-' + cD + ' ' + 0 + ':' + 0 + ':' + 0).getTime()
        this.reqPayParams.reqList.map(item => {
          console.log(item, 'item')
          if (item.creditType == 2) {
            // 放款时间处理
            // item.loanTime = 1511712000000
            const wT = new Date(item.loanTime).getTime()
            const wY = new Date(wT).getFullYear()
            const wM = new Date(wT).getMonth() + 1
            const wD = new Date(wT).getDate()
            const wTime = new Date(wY + '-' + wM + '-' + wD + ' ' + 0 + ':' + 0 + ':' + 0).getTime()
            // 到期还款日处理
            const eT = new Date(item.expectedSoouyaRepaymentTime).getTime()
            const eY = new Date(eT).getFullYear()
            const eM = new Date(eT).getMonth() + 1
            const eD = new Date(eT).getDate()
            console.log(cTime, eTime, wTime)
            const eTime = new Date(eY + '-' + eM + '-' + eD + ' ' + 0 + ':' + 0 + ':' + 0).getTime()
            const lSubT = parseInt((cTime - eTime) / 3600 / 24 / 1000)
            let fSubT = parseInt((cTime - wTime) / 3600 / 24 / 1000)
            console.log(lSubT, 'lsubt', fSubT, 'fsubt')
            if (lSubT > 0) {
              fSubT = parseInt((eTime - wTime) / 3600 / 24 / 1000)
            }
            if (fSubT > 0) {
              item.factoringMoney = Number(item.usedMoney) * fSubT * 0.18 / 360
            } else {
              item.factoringMoney = 0
            }
            if (lSubT > 0) {
              item.lateFeesMoney = Number(item.usedMoney) * (lSubT) * 0.18 / 360 * 1.5
            } else {
              item.lateFeesMoney = 0
            }
          }
        })
        this.calTotalMoney()
      }
    },
    confirmEditMoney() {
      this.reqPayParams.reqList = this.dialogTableData.concat()
      this.calTotalMoney()
      this.editDialogVisible = false
    },
    showEditMoneyDialog() {
      this.dialogTableData = this.reqPayParams.reqList.concat()
      this.editDialogVisible = true
    },
    // 点击确认还款或批量还款时进行的数据预处理
    showRepaymentDialog(item = {}) {
      // 当单条数据进行还款时的操作
      this.reqPayParams.financeRepaymentTime = ''
      this.reqPayParams.financeRepaymentRemark = ''
      this.reqPayParams.reqList = []
      this.pageLoading = true
      if (item && item.id) {
        console.log(item)
        let obj = {
          id: item.id,
          usedMoney: item.usedMoney ? Number(item.usedMoney) : 0,
          expectedSoouyaRepaymentTime: item.expectedSoouyaRepaymentTime ? item.expectedSoouyaRepaymentTime : 0,
          creditType: item.creditType,
          financeRepaymentRemark: '',
          financeRepaymentTime: '',
          factoringMoney: item.factoringMoney ? Number(item.factoringMoney) : 0,
          lateFeesMoney: item.lateFeesMoney ? Number(item.lateFeesMoney) : 0,
          loanTime: item.loanTime,
          outReposityNumber: item.outReposityNumber,
          serviceNumber: item.serviceNumber,
          buyerCompany: item.buyerCompany,
          repaymentStatus: item.repaymentStatus,
        }
        this.reqPayParams.reqList.push(obj)
        if (obj.creditType == 4) {
          newRequest({
            url: '/redwood/repayment/listFactoringAndLateFeesMoney',
            data: {
              list: this.reqPayParams.reqList
            },
            contentType: 'application/json',
            method: 'post'
          }).then(res => {
            if (res.success == 1) {
              res.result.map(item => {
                item.factoringMoney = item.yanzhenFactoringMoney
                item.lateFeesMoney = item.yanzhenLateFeesMoney
              })
              this.reqPayParams.reqList = res.result
              this.calTotalMoney()
              this.repayDialogVisible = true
            } else {
              this.$message.error(res.msg)
            }
            this.pageLoading = false
          })
        } else {
          this.calTotalMoney()
          this.repayDialogVisible = true
          this.pageLoading = false
        }
      } else {
        // 批量还款进行的操作
        this.reqPayParams.reqList = []
        this.batchPayBaitiaoList.map(obj => {
          this.reqPayParams.reqList.push(obj)
        })
        // 如果存在还款对象中存在雁阵金融需要访问后端取数据
        if (this.batchPayYanzhenList && this.batchPayYanzhenList.length) {
          newRequest({
            url: '/redwood/repayment/listFactoringAndLateFeesMoney',
            data: {
              list: this.batchPayYanzhenList
            },
            contentType: 'application/json',
            method: 'post'
          }).then(res => {
            if (res.success == 1) {
              res.result.map(item => {
                item.factoringMoney = item.yanzhenFactoringMoney
                item.lateFeesMoney = item.yanzhenLateFeesMoney
              })
              this.batchPayYanzhenList = res.result
              this.batchPayYanzhenList.map(obj => {
                this.reqPayParams.reqList.push(obj)
              })
              this.calTotalMoney()
              this.repayDialogVisible = true
            } else {
              this.$message.error(res.msg)
            }
            this.pageLoading = false
          })
        } else {
          this.calTotalMoney()
          this.repayDialogVisible = true
          this.pageLoading = false
        }
      }
    },
    calTotalMoney() {
      if (this.reqPayParams.reqList && this.reqPayParams.reqList.length) {
        this.reqPayParams.factoringMoney = 0
        this.reqPayParams.lateFeesMoney = 0
        this.reqPayParams.totalUsedMoney = 0
        this.reqPayParams.totalNeedPayMoney = 0
        this.reqPayParams.reqList.map(item => {
          this.reqPayParams.totalUsedMoney += Number(item.usedMoney)
          this.reqPayParams.factoringMoney += Number(item.factoringMoney)
          this.reqPayParams.lateFeesMoney += Number(item.lateFeesMoney)
          item.factoringMoney = Number(item.factoringMoney).toFixed(2)
          item.lateFeesMoney = Number(item.lateFeesMoney).toFixed(2)
        })
        this.reqPayParams.totalUsedMoney = Number(this.reqPayParams.totalUsedMoney).toFixed(2)
        this.reqPayParams.totalNeedPayMoney = Number(this.reqPayParams.totalUsedMoney) + Number(this.reqPayParams.factoringMoney) + Number(this.reqPayParams.lateFeesMoney)
        this.reqPayParams.totalNeedPayMoney = Number(this.reqPayParams.totalNeedPayMoney).toFixed(2)
        this.reqPayParams.lateFeesMoney = Number(this.reqPayParams.lateFeesMoney).toFixed(2)
        this.reqPayParams.factoringMoney = Number(this.reqPayParams.factoringMoney).toFixed(2)
      }
    },
    // 当选择多条单
    handleSelectionChange(selection) {
      this.batchPayYanzhenList = []
      this.batchPayBaitiaoList = []
      selection.map(item => {
        let obj = {
          id: item.id,
          usedMoney: item.usedMoney ? Number(item.usedMoney) : 0,
          expectedSoouyaRepaymentTime: item.expectedSoouyaRepaymentTime ? item.expectedSoouyaRepaymentTime : 0,
          creditType: item.creditType,
          financeRepaymentRemark: '',
          financeRepaymentTime: '',
          factoringMoney: item.factoringMoney ? Number(item.factoringMoney) : 0,
          lateFeesMoney: item.lateFeesMoney ? Number(item.lateFeesMoney) : 0,
          loanTime: item.loanTime,
          isAdvance: item.isAdvance,
          outReposityNumber: item.outReposityNumber,
          serviceNumber: item.serviceNumber,
          buyerCompany: item.buyerCompany,
          repaymentStatus: item.repaymentStatus,
          totalRepay: 0,
          reInte: 0,
        }
        if (obj.creditType == 4) {
          this.batchPayYanzhenList.push(obj)
        } else {
          this.batchPayBaitiaoList.push(obj)
        }
      })
    },
    isAdvance(item) {
      const cTime = new Date().getTime()
      const cY = new Date(cTime).getFullYear()
      const cM = new Date(cTime).getMonth() + 1
      const cD = new Date(cTime).getDate()
      const cT = new Date(`${cY}/${cM}/${cD} 0:0:0`).getTime()
      const eTime = new Date(item.expectedSoouyaRepaymentTime).getTime()
      const eY = new Date(eTime).getFullYear()
      const eM = new Date(eTime).getMonth() + 1
      const eD = new Date(eTime).getDate()
      const eT = new Date(`${eY}/${eM}/${eD} 0:0:0`).getTime()
      if (cT >= eT) {
        return false && item.loanStatus
      } else {
        return true && item.loanStatus
      }
    },
    checkOut() {
      let bool = true
      if (this.reqPayParams.financeRepaymentTime && this.reqPayParams.financeRepaymentRemark.length < 501) {
        bool = false
      }
      return bool
    },
    checkOut1() {
      let bool = true
      if (this.reqAdvanceParams.financeRepaymentTime && this.reqAdvanceParams.financeRepaymentRemark.length < 501 && this.reqAdvanceParams.financeRepaymentTime) {
        bool = false
      }
      return bool
    },
    getFilter(params) {
      this.requestParams = Object.assign({
        pageNumber: 1,
        pageSize: 20,
      }, params)
      if (!params.totalMoney) {
        delete this.requestParams.totalMoney
      }
      if (isNaN(params.createTimeBegin)) {
        delete this.requestParams.createTimeBegin
      }
      if (isNaN(params.createTimeEnd)) {
        delete this.requestParams.createTimeEnd
      }
      if (params.createTimeBegin) {
        this.requestParams.createTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      if (params.createTimeEnd) {
        this.requestParams.createTimeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete params.totalMoney
      if (this.requestParams.orderNumber) {
        this.requestParams.serviceNumber = this.requestParams.orderNumber
      } else {
        this.requestParams.serviceNumber = ''
      }
      if (this.requestParams.salesName) {
        this.requestParams.followerName = this.requestParams.salesName
      }
      if (this.requestParams.customerCompany) {
        this.requestParams.buyerCompany = this.requestParams.customerCompany
      } else {
        this.requestParams.buyerCompany = ''
      }
      this.getData()
    },
    selectable(row) {
      if (row.loanStatus) {
        return true
      } else {
        return false
      }
    },
    search() {
      if (this.requestParams.createTimeBegin != '' && this.requestParams.createTimeEnd != '') {
        if (this.requestParams.createTimeBegin instanceof Date) {
          var timeBegin = Date.parse(this.requestParams.createTimeBegin)
          this.requestParams.createTimeBegin = timeBegin
        }
        if (this.requestParams.createTimeEnd instanceof Date) {
          var timeEnd = Date.parse(this.requestParams.createTimeEnd)
          this.requestParams.createTimeEnd = timeEnd
        }
        this.getData()
        // console.log(this.requestParams.createTimeBegin)
        // console.log(this.requestParams.createTimeEnd)
      } else if (this.requestParams.createTimeBegin != '' && this.requestParams.createTimeEnd == '' ||
        this.requestParams.createTimeBegin == '' && this.requestParams.createTimeEnd != '') {
        this.$message('请把时间区间填写完整')
      } else {
        this.getData()
      }
    },
    exportHandle(params) {
      this.pageLoading = true
      this.pageLoading = true
      params = JSON.parse(JSON.stringify(params))
      let keys = Object.keys(params)
      keys.map(key => {
        if (!params[key]) {
          delete params[key]
        }
      })
      this.requestParams = Object.assign({
        pageNumber: 1,
        pageSize: 20,
      }, params)
      if (!params.totalMoney) {
        delete this.requestParams.totalMoney
      }
      if (params.createTimeBegin) {
        this.requestParams.createTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      if (params.createTimeEnd) {
        this.requestParams.createTimeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete params.totalMoney
      if (this.requestParams.orderNumber) {
        this.requestParams.serviceNumber = this.requestParams.orderNumber
      } else {
        this.requestParams.serviceNumber = ''
      }
      if (this.requestParams.salesName) {
        this.requestParams.followerName = this.requestParams.salesName
      }
      if (this.requestParams.customerCompany) {
        this.requestParams.buyerCompany = this.requestParams.customerCompany
      } else {
        this.requestParams.buyerCompany = ''
      }
      newRequest({
        url: '/redwood/repayment/exportTo',
        method: 'get',
        data: this.requestParams
      }).then((response) => {
        this.pageLoading = false
        if (response.success == '1') {
          window.open('http://www.soouya.com/' + response.obj)
        } else {
          this.$message.error(response.msg)
        }
        this.pageLoading = false
      })
    },
    getData(params = {}) {
      this.requestParams = Object.assign(this.requestParams, params)
      this.pageLoading = true
      newRequest({
        url: '/redwood/repayment/listTo',
        method: 'get',
        data: this.requestParams
      }).then((response) => {
        // console.log(response)
        if (response.success == '1') {
          response.page.result.forEach((item) => {
            item.isEdit = false
          })
          this.pagination.pageNumber = response.page.pageNumber
          this.pagination.pageSize = response.page.pageSize
          this.pagination.totalCount = response.page.totalCount
          this.tableData = response.page.result
          this.totalUsedMoney = response.totalUsedMoney
          this.totalFactoringMoney = response.totalFactoringMoney
          this.totalLateFeesMoney = response.totalLateFeesMoney
          this.totalNeedRepaymentMoney = response.totalNeedRepaymentMoney
          this.tableData.forEach(item => {
            this.$set(item, 'isAdvance', this.isAdvance(item));
          })
        } else {
          this.$message.error(response.msg);
        }
        this.pageLoading = false
      })
    },
    moneyToFixed(data) {
      if (data) {
        var fixedData = Number((Math.round(data * 100) / 100).toFixed(2))
        return fixedData
      } else {
        return Number('0.00')
      }
    },
    dateFormat(row, column) {
      let date = new Date(row[column.property])
      // console.log(date)
      if (row[column.property]) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
      } else {
        return '--'
      }
      return y + '-' + m + '-' + d
    },
    formatMoney(row, column) {
      let val = row[column.property]
      return val === null ? '--' : (parseFloat(val).toFixed(2))
    },
  }
}

</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 10px;
}

.split-text {
  line-height: 35px;
}

.c-date-start {
  display: inline-block;
  vertical-align: middle;
  .el-date-editor__editor {
    border-radius: 0 4px 4px 0 !important;
  }
}

.c-date-end {
  vertical-align: middle;
  .el-date-editor__editor {
    border-radius: 4px 0 0 4px !important;
  }
}

.repayment-total {
  padding-left: 15px;
  margin: 10px 0px;
  span {
    margin-right: 80px;
  }
  strong {
    color: #f00;
  }
}

.confirmDialog {
  text-align: left;
}

// .el-icon-warning{
//   width: 55px;
//   height: 55px;
// }
span>strong {
  color: #f00;
}

.positionBtn {
  margin-left: 38%;
}

.setBox {
  margin-top: 15px;
  margin-bottom: 15px;
}

</style>
