<template>
  <div v-loading.body="fullscreenLoading">
    <Tabs></Tabs>
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" style="max-width:250px" class='fl' v-model="searchData.orderNumber">
          <template slot="prepend">订单号</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入内容" style="max-width:250px" class='fl' v-model="searchData.outReposityNumber">
          <template slot="prepend">出仓单号</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入内容" style="max-width:250px" class='fl' v-model="searchData.customerCompany">
          <template slot="prepend">欠款用户</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入内容" style="max-width:250px" class='fl' v-model="searchData.customerNumber">
          <template slot="prepend">用户ID</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" style="max-width:250px" class='fl' v-model="searchData.followerLike">
          <template slot="prepend">跟单员</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入内容" style="max-width:250px" class='fl' v-model="searchData.purchaserLike">
          <template slot="prepend">买货员</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <span class='el-input-group__prepend'>是否还款给徒木</span>
        <el-select v-model="searchData.hasPayedXimu" class='c-select funtype-select'>
          <el-option v-for="option in repaymentItems" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span class='el-input-group__prepend'>赊销类型</span>
        <el-select v-model="searchData.creditType" class='c-select funtype-select'>
          <el-option v-for="option in creditSaleItems" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span class='el-input-group__prepend'>财务收款账户</span>
        <el-select v-model="searchData.financeAccountId" class='c-select funtype-select'>
          <el-option v-for="option in collectAccounts" :label="option.bankName" :value="option.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="18">
        <el-input placeholder="请输入内容" style="max-width:250px" class='fl' v-model="searchData.expectedDebtMoney">
          <template slot="prepend">实收欠款金额</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row class='bottom-row'>
      <el-col :span="10">
        <span class='front-label'>进入待收欠款时间</span>
        <el-date-picker class='c-date-start' :editable="false" type="datetime" disabledDate='disabledStartDate' placeholder="选择开始时间" v-model="searchData.createTimeBegin">
        </el-date-picker>
        <span class='split-text'>至</span>
        <el-date-picker class='c-date-end' :editable="false" type="datetime" disabledDate='disabledEndDate' placeholder="选择结束时间" v-model="searchData.createTimeEnd">
        </el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click.prevent="search">搜索</el-button>
        <el-button type="primary" :disabled="multipleSelection.length < 2" @click.prevent="batchReminder">批量催缴</el-button>
        <el-button type="primary" @click="exportHandle">导出</el-button>
      </el-col>
    </el-row>
    <div class="msg_summary">
      <span>欠款总金额:
        <strong>{{totalExpectedDebtMoney}}元</strong>
      </span>
      <span>已用搜芽额度:
        <strong>{{totalUsedMoney}}元</strong>
      </span>
      <span>已用徙木额度:
        <strong>{{totalBaitiaoUsedMoney}}元</strong>
      </span>
      <span>滞纳金:
        <strong>{{totalExpectedLateFeesMoney}}元</strong>
      </span>
    </div>
    <el-table class="fixed-table" :data="list.length > 0 ? list : []" :height="height" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" min-width="50" fixed="left" :selectable="canSelect">
      </el-table-column>
      <el-table-column label="操作" width='300' fixed='right'>
        <template scope="scope">
          <template v-if="scope.row.category != 'jb-all'">
            <el-button size="mini" @click.native="singleReminder(scope.row)">确认催缴</el-button>
          </template>
          <template v-else>
            <el-button size="mini" @click.native="singleJbCall(scope.row)">确认催缴</el-button>
          </template>
          <!-- <el-button size="mini" :disabled="scope.row.payStatus != 1" @click="PayGroupSendbackIncome(scope.row.id)">打回跟单</el-button> -->
          <template v-if="scope.row.exceptionMsg">
            <el-tooltip :content="scope.row.exceptionMsg">
              <span style="border:1px solid #ccc; border-radius:5px; padding: 2px; cursor:pointer" @click="showYichangDialog(scope.row)">异常</span>
            </el-tooltip>
          </template>
          <template v-else>
            <span style="border:1px solid #ccc; border-radius:5px; padding: 2px; cursor:pointer" @click="showYichangDialog(scope.row)">异常</span>
          </template>
          <template v-if="scope.row.category != 'jb-all' && scope.row.category != 'shop-dh'">
            <router-link :to="{ path:'/finance/debt/debetDetail/' + scope.row.id }">
              <el-button size="mini">详情</el-button>
            </router-link>
          </template>
          <!--  <el-button size="mini" @click="jumpToPayDetail(scope.row.id, scope.row.type, scope.row.outReposityNumberList)">详情</el-button> -->
        </template>
      </el-table-column>
      <el-table-column label="进入待收欠款时间" width="160">
        <template scope="scope">
          {{scope.row.createTime ? scope.row.createTime : '--'}}
        </template>
      </el-table-column>
      <el-table-column prop="serviceNumber" label="订单编号" width="160"></el-table-column>
      <el-table-column label="出仓单号" width="160">
        <template scope="scope">
          <template v-if="scope.row.category == 'all-all' || scope.row.category == 'dh-zy'">
            <span>{{scope.row.outReposityNumber}}</span>
          </template>
          <template v-else>
            <span>--</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="已用搜芽额度/元" width="160">
        <template scope="scope">
          <template v-if="scope.row.category == 'all-all' || scope.row.category =='dh-zy'">
            {{scope.row.creditType === 1 ? scope.row.usedMoney : '--'}}
          </template>
          <template v-else>
            <span>--</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="已用徙木额度/元" width="160">
        <template scope="scope">
          <template v-if="scope.row.category == 'shop-dh' || scope.row.category == 'all-all' || scope.row.category == 'dh-zy'">
            {{scope.row.creditType === 2 ? scope.row.baitiaoUsedMoney : '--' }}
          </template>
          <template v-else>
            <span>--</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="应收滞纳金/元" width="160">
        <template scope="scope">
          <template v-if="scope.row.category == 'shop-dh' || scope.row.category == 'all-all' || scope.row.category == 'dh-zy'">
            {{scope.row.expectedLateFeesMoney === null ? '--' : scope.row.expectedLateFeesMoney}}
          </template>
          <template v-else>
            <span>--</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="应收欠款/元" width="160">
        <template scope="scope">
          {{scope.row.expectedDebtMoney === null ? '--' : scope.row.expectedDebtMoney}}
        </template>
      </el-table-column>
      <el-table-column label="赊销类型" width="160">
        <template scope="scope">
          <template v-if="scope.row.category != 'jb-all'">
            <template v-if="scope.row.creditType == '1'">
              <p>搜芽额度</p>
            </template>
            <template v-else>徙木额度</template>
          </template>
          <template v-else>--</template>
        </template>
      </el-table-column>
      <el-table-column label="欠款用户" prop="customerCompany" width="160"></el-table-column>
      <el-table-column label="欠款用户类型" width="160">
        <template scope="scope">
          <p>采购商</p>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" prop="customerNumber" width="160"></el-table-column>
      <el-table-column label="跟单员" width="160">
        <template scope="scope">
          {{scope.row.followerName}}/{{scope.row.followerTel}}
        </template>
      </el-table-column>
      <el-table-column label="买货员" prop="purchaserName" width="160"></el-table-column>
      <el-table-column label="财务收款账户" width="165">
        <template scope="scope">
          <template v-if="scope.row.category == 'all-all' || scope.row.category == 'dh-zy'">
            {{scope.row.financeBank}}<br>{{scope.row.financeAccount}}
          </template>
          <template v-else>
            <span>--</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="催缴状态" width="165">
        <template scope="scope">
          <p class="forgive-color">待催缴</p>
        </template>
      </el-table-column>
      <el-table-column label="是否还款给徙木" width="165">
        <template scope="scope">
          <template v-if="scope.row.category == 'all-all' || scope.row.category == 'dh-zy'">
            <template v-if="scope.row.hasPayedXimu == '1'">
              <p>是</p>
            </template>
            <template v-if="scope.row.hasPayedXimu == '0'">
              <p>否</p>
            </template>
            <template v-if="scope.row.hasPayedXimu == null">
              <p>--</p>
            </template>
          </template>
          <template v-else>
            <span>--</span>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!-- 若销账类型不一致 -->
    <el-dialog title="提示" v-model="multipleTypes.visible" :close-on-click-modal="true">
      <span style='padding: 20px 0; font-size: 20px'>{{multipleTypes.tips}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="multipleTypes.visible = false">取 消</el-button>
        <el-button type="primary" @click.native="multipleTypes.visible = false" :disabled="!form.date">确 定</el-button>
      </span>
    </el-dialog>
    <!--  一级弹框 -->
    <el-dialog :title="reminderTitle" v-model="reminderVisible" size="tiny">
      <el-form ref="form" :model="form" label-width="200px" :rules="rules">
        <el-form-item label="到账时间:" required prop="date">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="财务备注:" style="margin-bottom: 40px; " prop="remark">
          <limitInput :maxLength="500" :model="form.remark" type="textarea" v-on:update="updateRemark"></limitInput>
        </el-form-item>
        <el-form-item :label="model.limitType">
          <template scope="scope">
            {{model.limit | formateNumber}}元
          </template>
        </el-form-item>
        <el-form-item label="实收滞纳金">
          <el-input readonly="readonly" @click.native="getLateFees" v-model="model.lateFee" v-if="batchVisible"></el-input>
          <el-input v-model="model.lateFee" v-else @keyup.native="changesum(model.limit, model.lateFee, model.expectedDebtMoney)"></el-input>
        </el-form-item>
        <el-form-item label="实收欠款">
          <template scope="scope">
            {{model.expectedDebtMoney | formateNumber}}元
          </template>
        </el-form-item>
        <el-form-item label="可用余额抵扣">
          <template scope="scope">
            <span v-if='model.usedBalance > model.expectedDebtMoney'>{{model.expectedDebtMoney | formateNumber}}元</span>
            <span v-else>{{model.usedBalance | formateNumber}}元</span>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelReminder">取消</el-button>
          <router-link target="_blank" :to="{ path:'/finance/moneyManage/moneyManageDetail?id=' + model.id }" v-if="model.usedBalance < model.expectedDebtMoney">
            <el-button type="primary">预存</el-button>
          </router-link>
          <el-button type="primary" @click="saveReminder('form')" v-else>确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 二级弹框 -->
    <el-dialog title="批量修改滞纳金" v-model="lateFeeVisable" size="tiny">
      <el-table :data="lateFees" stripe style="width: 100%">
        <el-table-column prop="outReposityNumber" label="出仓单号" width="180">
        </el-table-column>
        <el-table-column prop="serviceNumber" label="订单号" width="180">
        </el-table-column>
        <el-table-column prop="customerCompany" label="采购商">
        </el-table-column>
        <el-table-column label="滞纳金/元">
          <template scope="scope">
            <el-input style="max-width:250px" v-model="scope.row.lateFee">
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="lateFeeVisable = false">取消</el-button>
      <el-button type="primary" @click="saveLateFees">确定</el-button>
      </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 异常dialog -->
    <el-dialog v-model="yichangDialogVisible" size="tiny" title="提示">
      <span>
        <i class="el-icon-warning"></i>欠款异常</span>
      </br>
      <el-form label-width="100px" label-position="right">
        <el-form-item label="异常备注">
          <el-input type="textarea" style="margin-top:12px; width:250px;" v-model="reqYichangParams.exceptionMsg"></el-input>
          </br>
          <span style="color:#f00; margin-top:220px;">{{reqYichangParams.exceptionMsg.length}}/500</span>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click.native="yichangDialogVisible = false, reqYichangParams.exceptionMsg = ''">取消</el-button>
          <!-- 点击事件待定 -->
          <el-button size="small" type="primary" style="width:100px;" :disabled="reqYichangParams.exceptionMsg.length > 500" @click.native="confirmYichang">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    </el-dialog>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.pageNumber" :page-sizes="[20, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.totalCount">
      </el-pagination>
    </div>
    <el-dialog v-model="jbDialogVisible" title="确认催缴" size="tiny">
      <p>
        <i class="el-icon-warning" style="color: #f00"></i>一旦确认提交,将不可修改。</p>
      <el-form label-width="100px" label-position="right" style="margin:auto;">
        <el-form-item label="到账日期：" required>
          <el-date-picker v-model="requestParams.reqTime" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
        </el-form-item>
        <el-form-item label="财务备注：">
          <el-input v-model="requestParams.reqRemark" style="width:200px;" placeholder="限制500字"></el-input>
        </el-form-item>
        <el-form-item label="实收欠款：">
          <span style="color:#f00">{{requestParams.totalMoney | formatMoney}}元</span>
        </el-form-item>
      </el-form>
      <footer>
        <el-button size="small" @click.native="jbDialogVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="handleJbCall">确定</el-button>
      </footer>
    </el-dialog>
  </div>
</template>
<script>
import pagination from 'components/pagination'
import HeadFilter from 'components/headFilter/HeadFilter'
import Tabs from 'components/debtTabs'
import Lightbox from 'components/lightbox/lightbox'
import limitInput from 'components/limitInput.vue'
import AccountApi from 'api/account'
import {
  newRequest,
  formatTimeString
} from 'common/utils'
export default {
  components: {
    pagination,
    Lightbox,
    HeadFilter,
    Tabs,
    limitInput
  },
  data() {
    const validateLength = (rule, value, callback) => {
      if (this.form.remark.length > 500) {
        return callback(new Error('备注不能超过500字'));
      } else {
        callback();
      }
    }
    return {
      jbDialogVisible: false,
      reqTime: '',
      requestParams: {
        reqTime: '',
        reqRemark: '',
        totalMoney: 0,
        list: [
          {
            id: '',
            receivedTime: '',
            financeRemark: '',
            lateFeesMoney: '',
          }
        ]
      },
      yichangDialogVisible: false,
      // 参数待定
      reqYichangParams: {
        id: '',
        exceptionMsg: '',
        _time: 0,
      },
      pickerOptions0: {
        disabledDate(time) {
          return Date.now() < time.getTime();
        }
      },
      height: '600',
      searchData: {
        orderNumber: null, // 订单号
        outReposityNumber: null, // 出仓单号
        customerCompany: null, // 欠款用户
        customerNumber: null, // 用户Id
        followerLike: null, // 跟单员
        purchaserLike: null, // 买货员
        hasPayedXimu: null, // 是否还款给徒木
        creditType: null, // 赊销类型
        financeAccountId: null, // 财务收款账户
        expectedDebtMoney: null, // 应收欠款金额
        createTimeBegin: null, // 开始时间
        createTimeEnd: null, // 结束时间
      },
      fullscreenLoading: false,
      creditSaleItems: [ // 赊销类型种类
        { label: '全部', value: '' },
        { label: '徙木额度', value: '2' },
        { label: '搜芽额度', value: '1' }],
      repaymentItems: [ // 还款给徒木
        { label: '全部', value: '' },
        { label: '是', value: '1' },
        { label: '否', value: '0' }],
      collectAccounts: [], // 所有财务收款的账户
      list: [], // 列表的所有数据
      param: {}, // 列表的所有数据
      totalExpectedDebtMoney: null, // 欠款总金额
      totalUsedMoney: null, // 已用搜芽额度
      totalBaitiaoUsedMoney: null, // 已用徙木额度
      totalExpectedLateFeesMoney: null, // 应收滞纳金总和
      multipleSelection: [], // 存储多选项的
      multipleTypes: { // 类型不一致的时候的弹窗
        visible: false,
        tips: ''
      },
      singleData: null, // 单条数据
      batchVisible: false, // 单条多条切换
      reminderVisible: false,
      reminderTitle: null, // 弹框的title
      url: '', // 导出链接
      model: { // 弹框的值
        limitType: null,
        limit: null,
        debtType: null,
        debt: null,
        balance: null,
        expectedDebtMoney: null,
        usedBalance: null,
        lateFee: null,
        id: null
      },
      lateFeeVisable: false,
      lateFees: [], // 滞纳金列表
      lateFees1: [], // 滞纳金列表副本修改数值后
      changeDate: false,
      pagination: {
        pageNumber: 1,
        totalCount: null,
        pageSize: 20,
      },
      form: { // 弹框
        date: '',
        remark: ''
      },
      rules: {
        remark: [
          { max: 500, validator: validateLength, trigger: 'blur' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.height = String(window.document.body.clientHeight - 420);
    this.reqList();
    this.getCollectionAccount();
    this.getSummary()
  },
  watch: {
    'form.date': function(newValue, oldValue) {
      if (!this.batchVisible) {
        let timeStr = new Date(this.singleData.expectedRepaymentTime).toLocaleString();
        timeStr = timeStr.substr(0, 10) + '00:00:00'
        this.singleData.expectedRepaymentTime = timeStr
        if (newValue.getTime() - Date.parse(this.singleData.expectedRepaymentTime) > 0) {
          this.singleData.time = (newValue.getTime() - Date.parse(this.singleData.expectedRepaymentTime)) / 86400000 + (1 - 0)
          if (this.singleData.creditType == '1') {
            this.model.lateFee = (this.singleData.usedMoney * 0.18 * 1.5 * this.singleData.time / 360).toFixed(2)
          } else {
            this.model.lateFee = (this.singleData.baitiaoUsedMoney * 0.18 * 1.5 * this.singleData.time / 360).toFixed(2)
          }
        } else {
          this.model.lateFee = 0;
        }
        this.model.expectedDebtMoney = Number(this.model.limit) + (Number(this.model.lateFee).toFixed(2) - 0)
      } else {
        if (newValue) {
          this.changeDate = true;
          this.getLateFees();
          this.saveLateFees();
        }
      }
    },
    url: function(newValue) {
      console.log(newValue)
    },
    reminderVisible: function(newValue) {
      if (!newValue) {
        this.form.date = null
        this.model.lateFee = null
      }
    }
  },
  filters: {
    formateNumber(val) {
      return Number(val).toFixed(2)
    }
  },
  methods: {
    confirmYichang() {
      newRequest({
        data: this.reqYichangParams,
        url: '/redwood/payDebt/updateExceptionMsg',
        method: 'post',
        contentType: 'application/json',
      }).then(res => {
        if (res.success == 1) {
          this.$message({
            type: 'success',
            message: res.msg,
          })
          this.yichangDialogVisible = false
          this.search()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    showYichangDialog(row) {
      this.reqYichangParams._time = Date.parse(new Date())
      this.reqYichangParams.exceptionMsg = ''
      if (row.exceptionMsg) {
        this.reqYichangParams.exceptionMsg = row.exceptionMsg
      }
      this.reqYichangParams.id = row.id
      this.yichangDialogVisible = true
    },
    canSelect(row, index) {
      return row.payStatus === 1
    },
    getCollectionAccount() {
      newRequest({
        url: AccountApi.FinanceAccount.list,
        method: 'post'
      }).then((res) => {
        if (res.success == '1') {
          this.collectAccounts = res.result
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    search() { // 点击搜索开始搜索
      this.param = {};
      for (let i in this.searchData) {
        if (this.searchData.hasOwnProperty(i) && this.searchData[i]) {
          this.param[i] = this.searchData[i];
        }
      }
      this.reqList();
      this.getSummary();
    },
    exportHandle() { // 导出
      for (let i in this.searchData) {
        if (this.searchData.hasOwnProperty(i) && this.searchData[i]) {
          this.param[i] = this.searchData[i];
        }
      }
      newRequest({
        url: AccountApi.PayDebt.exportTo,
        method: 'get',
        data: this.param
      }).then((res) => {
        if (res.success == '1') {
          window.open(`http://www.soouya.com${res.obj}`)
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    changesum() { // 滞纳金改变应收欠款也变化
      this.model.expectedDebtMoney = Number(this.model.limit) + Number(this.model.lateFee)
    },
    getSummary() { // 获取总金额等信息
      newRequest({
        url: AccountApi.PayDebt.getToSumary,
        method: 'get',
        data: this.param
      }).then((res) => {
        if (res.success == '1') {
          this.totalExpectedDebtMoney = res.obj.totalExpectedDebtMoney
          this.totalUsedMoney = res.obj.totalUsedMoney
          this.totalBaitiaoUsedMoney = res.obj.totalBaitiaoUsedMoney
          this.totalExpectedLateFeesMoney = res.obj.totalExpectedLateFeesMoney
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    batchReminder() { // 批量催缴按钮
      let singleUserArr = this.multipleSelection.map((item) => {
        return item.customerCompany
      })
      singleUserArr = Array.from(new Set(singleUserArr))
      let singleCreditType = this.multipleSelection.map((item) => {
        return item.creditType
      })
      singleCreditType = Array.from(new Set(singleCreditType))
      let singleCategory = this.multipleSelection.map((item) => {
        return item.category
      })
      singleCategory = Array.from(new Set(singleCategory))
      if (singleUserArr.length > 1) {
        this.multipleTypes.visible = true
        this.multipleTypes.tips = '请选择相同采购商'
      } else if (singleCategory.length > 1) {
        this.multipleTypes.visible = true
        this.multipleTypes.tips = '请选择相同订单类型'
      } else if (singleCreditType.length > 1) {
        this.multipleTypes.visible = true
        this.multipleTypes.tips = '请选择相同赊销类型'
      } else if (singleCategory[0] != 'jb-all') {
        this.reminderVisible = true;
        this.reminderTitle = '批量催缴'
        this.batchVisible = true;
        this.model.id = this.multipleSelection[0].customerId
        this.getBalance();
        if (singleCreditType[0] == '1') {
          this.model.limit = 0;
          this.multipleSelection.forEach((item) => {
            this.model.limit += item.usedMoney
          })
          this.model.limitType = '已用搜芽额度:'
        } else {
          this.model.limit = 0;
          this.multipleSelection.forEach((item) => {
            this.model.limit += item.baitiaoUsedMoney
          })
          this.model.limitType = '已用徙木额度:'
        }
        this.model.expectedDebtMoney = 0;
        this.multipleSelection.forEach((item) => {
          this.model.expectedDebtMoney += item.expectedDebtMoney
        })
      } else if (singleCategory[0] == 'jb-all') {
        console.log(this.multipleSelection)
        this.requestParams.totalMoney = 0
        this.requestParams.reqTime = ''
        this.requestParams.reqRemark = ''
        this.requestParams.list = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          let list = {
            id: this.multipleSelection[i].id,
            lateFeesMoney: this.multipleSelection[i].expectedDebtMoney
          }
          this.requestParams.totalMoney += this.multipleSelection[i].expectedDebtMoney
          this.requestParams.list.push(list)
        }
        this.jbDialogVisible = true
      }
    },
    singleReminder(data) { // 单条催缴
      this.singleData = data;
      this.reminderVisible = true;
      this.reminderTitle = '确认催缴'
      this.batchVisible = false;
      this.model.id = this.singleData.customerId
      this.model.expectedDebtMoney = this.singleData.expectedDebtMoney
      this.getBalance();
      if (this.singleData.creditType == 1) {
        this.model.limitType = '已用搜芽额度:'
        this.model.limit = this.singleData.usedMoney
      } else {
        this.model.limitType = '已用徙木额度:'
        this.model.limit = this.singleData.baitiaoUsedMoney
      }
      if (!this.batchVisible && this.form.date) {
        let timeStr = new Date(this.singleData.expectedRepaymentTime).toLocaleString();
        timeStr = timeStr.substr(0, 10) + '00:00:00'
        this.singleData.expectedRepaymentTime = timeStr
        if (this.form.date.getTime() - Date.parse(this.singleData.expectedRepaymentTime) > 0) {
          this.singleData.time = (this.form.date.getTime() - Date.parse(this.singleData.expectedRepaymentTime)) / 86400000 + (1 - 0)
          if (this.singleData.creditType == '1') {
            this.model.lateFee = (this.singleData.usedMoney * 0.18 * 1.5 * this.singleData.time / 360).toFixed(2)
          } else {
            this.model.lateFee = (this.singleData.baitiaoUsedMoney * 0.18 * 1.5 * this.singleData.time / 360).toFixed(2)
          }
        } else {
          this.model.lateFee = 0;
        }
        this.model.expectedDebtMoney = Number(this.model.limit) + (Number(this.model.lateFee).toFixed(2) - 0)
      } else {
        this.model.expectedDebtMoney = null
      }
    },
    singleJbCall(row) {
      this.requestParams.list = []
      let list = {
        id: row.id,
        lateFeesMoney: row.expectedDebtMoney
      }
      this.requestParams.list.push(list)
      this.requestParams.totalMoney = row.expectedDebtMoney
      this.jbDialogVisible = true
    },
    handleJbCall() { // 剪版批量催缴
      this.requestParams.reqTime = Date.parse(new Date(this.requestParams.reqTime))
      for (let i = 0; i < this.requestParams.list.length; i++) {
        this.requestParams.list[i].financeRemark = this.requestParams.reqRemark
        this.requestParams.list[i].receivedTime = this.requestParams.reqTime
      }
      console.log(this.requestParams)
      newRequest({
        url: '/redwood/payDebt/batchConfirmIncome',
        data: this.requestParams,
        contentType: 'application/json',
        method: 'post'
      }).then(res => {
        if (res.success == 1) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.jbDialogVisible = false
          this.reqList()
          this.getSummary()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    PayGroupSendbackIncome(id) { // 打回跟单
      this.$prompt('请描述异常问题（120个字以内）', '异常', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        newRequest({
          url: AccountApi.PayDebt.sendbackIncome,
          method: 'post',
          contentType: 'application/json',
          data: {
            id: id,
            exceptionMsg: value,
            _time: new Date().getTime()
          }
        }).then((res) => {
          if (res.success == '1') {
            this.reqList();
            this.getCollectionAccount();
            this.getSummary()
            // window.location.reload()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message.info('取消输入')
      });
    },
    cancelReminder() { // 取消保存编辑框的信息
      this.reminderVisible = false
      this.form.date = null
      this.model.lateFee = null
    },
    saveReminder(formName) { // 保存编辑弹框
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var arr = [];
          var obj = {};
          console.log(this.multipleSelection)
          if (this.multipleSelection.length > 1) {
            for (let i = 0; i < this.lateFees.length; i++) {
              obj = {}
              obj.id = this.lateFees[i].id
              obj.lateFeesMoney = this.lateFees[i].lateFee
              if (this.form.date) {
                obj.receivedTime = this.form.date.getTime()
                obj.financeRemark = this.form.remark
              }
              arr.push(obj)
            }
          } else {
            obj.id = this.singleData.id
            obj.lateFeesMoney = this.model.lateFee
            if (this.form.date) {
              obj.receivedTime = this.form.date.getTime()
              obj.financeRemark = this.form.remark
            }
            arr.push(obj)
          }
          newRequest({
            url: AccountApi.PayDebt.batchConfirmIncome,
            contentType: 'application/json',
            method: 'post',
            data: {
              list: arr
            }
          }).then((res) => {
            if (res.success == '1') {
              this.form.date = ''
              this.model.lateFee = '';
              this.reminderVisible = false
              this.reqList();
              this.getCollectionAccount();
              this.getSummary()
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updateRemark(val) { // 留言备注把备注组件的内容传递给当前页面
      this.form.remark = val;
    },
    handleSelectionChange(val) { // 列表前面的复选框
      this.multipleSelection = val;
    },
    reqList() { // 上来页面请求数据
      if (this.param.hasOwnProperty('createTimeBegin')) {
        this.param.createTimeBegin = this.param.createTimeBegin.getTime();
      }
      if (this.param.hasOwnProperty('createTimeEnd')) {
        this.param.createTimeEnd = this.param.createTimeEnd.getTime();
      }
      var param = Object.assign({}, this.pagination, this.param)
      newRequest({
        url: AccountApi.PayDebt.listTo,
        method: 'get',
        data: param
      }).then(data => {
        if (data.success === '1') {
          this.list = data.page.result;
          this.list = data.page.result.map((item) => {
            if (item.createTime) {
              item.createTime = formatTimeString(item.createTime)
            }
            return item
          })
          this.pagination.pageNumber = data.page.pageNumber;
          this.pagination.totalCount = data.page.totalCount;
          this.pagination.pageSize = data.page.pageSize;
        } else {
          this.$message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1500
          })
        }
      })
    },
    handleCurrentChange(val) { // 切换第几页
      this.pagination.pageNumber = val;
      this.reqList();
    },
    handleSizeChange(val) { // 切换每页几条数据
      this.pagination.pageSize = val
      this.reqList();
    },
    getLateFees() { // 获取批量处理滞纳金的列表信息
      if (!this.form.date) {
        this.$message.warning('请选择时间')
      } else {
        this.lateFeeVisable = true;
      }
      console.log(this.changeDate)
      if (this.changeDate) {
        this.lateFees = JSON.parse(JSON.stringify(this.multipleSelection))
        for (let i = 0; i < this.lateFees.length; i++) {
          let timeStr = new Date(this.lateFees[i].expectedRepaymentTime).toLocaleString();
          timeStr = timeStr.substr(0, 10) + '00:00:00'
          this.lateFees[i].expectedRepaymentTime = timeStr
          if (Date.parse(this.form.date) - Date.parse(this.lateFees[i].expectedRepaymentTime) > 0) {
            this.lateFees[i].time = (Date.parse(this.form.date) - Date.parse(this.lateFees[i].expectedRepaymentTime)) / 86400000
            if (this.model.limitType == '已用搜芽额度:') {
              let value = (this.lateFees[i].usedMoney * 0.18 * 1.5 * this.lateFees[i].time / 360).toFixed(2)
              this.$set(this.lateFees[i], 'lateFee', value);
            } else {
              let value = (this.lateFees[i].baitiaoUsedMoney * 0.18 * 1.5 * this.lateFees[i].time / 360).toFixed(2)
              this.$set(this.lateFees[i], 'lateFee', value);
            }
          } else {
            this.lateFees[i].time = 0
            if (this.model.limitType == '已用搜芽额度:') {
              this.lateFees[i].lateFee = 0
            } else {
              this.lateFees[i].lateFee = 0
            }
          }
        }
      } else {
        console.log(this.lateFees1)
        this.lateFees = this.lateFees1
        console.log(this.lateFees)
      }
    },
    saveLateFees() { // 保存批量处理的滞纳金
      this.lateFeeVisable = false;
      this.model.lateFee = 0;
      this.lateFees1 = JSON.parse(JSON.stringify(this.lateFees));
      this.changeDate = false;
      if (this.changeDate) {
        this.lateFees.forEach((item) => {
          this.model.lateFee += Number(item.lateFee)
        })
      } else {
        this.lateFees1.forEach((item) => {
          this.model.lateFee += Number(item.lateFee)
        })
      }
      console.log(this.model.lateFee)
      this.model.lateFee = this.model.lateFee.toFixed(2)
      console.log(this.model.lateFees)
      this.model.expectedDebtMoney = Number(this.model.limit) + Number(this.model.lateFee)
    },
    getBalance() { // 获取余额
      var id = null;
      if (this.multipleSelection.length > 1) {
        id = this.multipleSelection[0].customerId
      } else {
        id = this.singleData.customerId
      }
      newRequest({
        url: AccountApi.Account.getById,
        method: 'get',
        data: {
          id: id
        }
      }).then((res) => {
        if (res.success == '1') {
          this.model.usedBalance = res.obj.availableBalance;
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>
<style lang="scss">
.bottom-row {
  margin-bottom: 15px
}

.el-pagination {
  margin-top: 15px;
  float: right
}

.el-form-item__content {
  text-align: left
}

.el-col-6 {
  margin-bottom: 15px;
}

.msg_summary {
  margin-bottom: 15px;
  span {
    display: inline-block;
    margin-right: 5%;
    strong {
      color: #f00;
    }
  }
}

.page {
  position: fixed;
  right: 0;
  bottom: 10px
}
</style>

